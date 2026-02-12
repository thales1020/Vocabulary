import streamlit as st
from supabase import create_client, Client
import random

# --- 1. SETUP & CONFIG ---
st.set_page_config(page_title="Vocab cho cổ", page_icon="🌸", layout="centered")

# --- 2. THEME SETTINGS (CHẾ ĐỘ BAN ĐÊM) ---
with st.sidebar:
    st.title("Cài đặt")
    dark_mode = st.toggle("🌙 Dark mode")

# Định nghĩa bảng màu (Theme)
if dark_mode:
    theme = {
        "bg_color": "#0E1117", "card_bg": "#1E1E1E", "text_main": "#FFFFFF",
        "text_sub": "#B0B0B0", "input_bg": "#262730", "border": "#444444",
        "shadow": "rgba(0,0,0,0.5)", "button_text": "#FFFFFF", "highlight": "#4e54c8"
    }
else:
    theme = {
        "bg_color": "#ffffff", "card_bg": "#ffffff", "text_main": "#333333",
        "text_sub": "#555555", "input_bg": "#f8f9fa", "border": "#f0f2f6",
        "shadow": "rgba(0,0,0,0.1)", "button_text": "#333333", "highlight": "#4e54c8"
    }

# --- 3. CSS ĐỘNG ---
st.markdown(f"""
<style>
    .stApp {{ background-color: {theme['bg_color']}; color: {theme['text_main']}; }}
    header[data-testid="stHeader"] {{ background-color: {theme['bg_color']}; }}
    .stTextInput > div > div > input {{ color: {theme['text_main']}; background-color: {theme['input_bg']}; }}
    .stRadio label, .stTabs [data-baseweb="tab"] {{ color: {theme['text_main']} !important; }}
    
    /* Button Style */
    .stButton>button {{
        width: 100%; border-radius: 50px; height: 50px; font-weight: 700; font-size: 20px;
        color: {theme['button_text']} !important; background-color: {theme['input_bg']} !important;
        border: 1px solid {theme['border']} !important; box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        transition: all 0.2s;
    }}
    .stButton>button:hover {{ transform: scale(1.02); border-color: {theme['highlight']} !important; color: {theme['highlight']} !important; }}
    
    /* Card Styles */
    .flashcard {{
        background-color: {theme['card_bg']}; color: {theme['text_main']}; padding: 40px;
        border-radius: 20px; box-shadow: 0 8px 30px {theme['shadow']}; text-align: center;
        border: 2px solid {theme['border']}; min-height: 450px;
        display: flex; flex-direction: column; justify-content: center; align-items: center;
    }}
    .card {{
        background-color: {theme['card_bg']}; color: {theme['text_main']}; padding: 30px;
        border-radius: 20px; border: 2px solid {theme['border']};
        box-shadow: 0 4px 15px {theme['shadow']}; margin-bottom: 20px; text-align: center;
    }}
    
    /* Typography */
    .label {{ font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: {theme['text_sub']}; margin: 20px 0 10px; font-weight: 600; }}
    .term {{ font-size: 50px !important; font-weight: 900; color: {theme['highlight']}; margin-bottom: 20px; line-height: 1.2; }}
    .meaning {{ font-size: 24px !important; font-weight: 500; color: {theme['text_main']}; margin-bottom: 15px; line-height: 1.4; }}
    .vietnamese {{ font-size: 30px !important; font-weight: bold; color: #ff6b6b; margin-bottom: 25px; }}
    .example {{ font-size: 20px !important; font-style: italic; color: {theme['text_sub']}; line-height: 1.5; }}
    .masked-word {{ font-family: monospace; font-size: 35px; letter-spacing: 5px; font-weight: bold; color: {theme['text_main']}; margin: 20px 0; background: {theme['input_bg']}; padding: 15px; border-radius: 12px; }}
    
    /* Feedback */
    .success-msg {{ color: #28a745; font-weight: bold; font-size: 24px; padding: 15px; }}
    .error-msg {{ color: #dc3545; font-weight: bold; font-size: 24px; padding: 15px; }}
    .hint-box {{ background: #fff3cd; color: #856404; padding: 15px; border-radius: 8px; margin-top: 15px; font-size: 18px; }}
</style>
""", unsafe_allow_html=True)

# --- 4. SUPABASE CONNECTION ---
@st.cache_resource
def init_connection():
    try:
        url = st.secrets["SUPABASE_URL"]
        key = st.secrets["SUPABASE_KEY"]
        return create_client(url, key)
    except:
        return None

supabase = init_connection()

# --- 5. DATA FUNCTIONS ---
@st.cache_data(ttl=600)
def load_vocab(unit_filter=None):
    if not supabase: return []
    query = supabase.table("vocabulary").select("*")
    if unit_filter and unit_filter != "All":
        query = query.eq("unit", unit_filter)
    response = query.execute()
    return response.data

def normalize(text):
    return " ".join(text.strip().lower().split())

def create_masked_term(term):
    chars = list(term)
    indices = [i for i, c in enumerate(chars) if c != ' ']
    num_to_mask = int(len(term) * 0.45)
    mask_indices = random.sample(indices, min(num_to_mask, len(indices)))
    masked_chars = ['_' if i in mask_indices else c for i, c in enumerate(chars)]
    return masked_chars, mask_indices

# --- 6. SESSION STATE INIT ---
# Thêm 'known_words' vào session state
keys_to_init = [
    'vocab_list', 'current_card', 'flip', 'known_words',
    'ms_masked', 'ms_indices', 'ms_feedback', 'ms_key_counter', 
    'ty_mistakes', 'ty_feedback', 'ty_key_counter', 
    'qz_options', 'qz_feedback', 'qz_answered'
]
for key in keys_to_init:
    if key not in st.session_state:
        if 'counter' in key: st.session_state[key] = 0
        elif 'indices' in key: st.session_state[key] = []
        elif 'flip' in key: st.session_state[key] = False
        elif 'known_words' in key: st.session_state[key] = set() # Dùng set để lưu các từ đã thuộc
        else: st.session_state[key] = None

# --- 7. CONTROLLER (LOGIC LỌC TỪ) ---
def next_card():
    if not st.session_state.vocab_list: return
    
    # LỌC: Chỉ lấy những từ CHƯA thuộc
    learning_pool = [
        v for v in st.session_state.vocab_list 
        if v['term'] not in st.session_state.known_words
    ]
    
    if not learning_pool:
        st.session_state.current_card = None # Hết từ để học
        return

    new_card = random.choice(learning_pool)
    st.session_state.current_card = new_card
    st.session_state.flip = False
    
    # Reset Missing Game
    masked_chars, hidden_indices = create_masked_term(new_card['term'])
    st.session_state.ms_masked = masked_chars
    st.session_state.ms_indices = hidden_indices
    st.session_state.ms_feedback = None
    st.session_state.ms_key_counter += 1
    
    # Reset Typing Game
    st.session_state.ty_mistakes = 0
    st.session_state.ty_feedback = None
    st.session_state.ty_key_counter += 1
    
    # Reset Quiz Game
    correct = new_card
    # Lấy đáp án sai từ toàn bộ list (kể cả từ đã thuộc cũng có thể làm đáp án sai)
    others = [v for v in st.session_state.vocab_list if v['term'] != correct['term']]
    wrongs = random.sample(others, min(3, len(others)))
    options = [correct] + wrongs
    random.shuffle(options)
    st.session_state.qz_options = options
    st.session_state.qz_feedback = None
    st.session_state.qz_answered = False

# --- 8. SIDEBAR CONTROL ---
with st.sidebar:
    unit_labels = {
        "All": "Tất cả các từ (All Units)",
        "Unit 1": "Unit 1 - Terms",
        "Unit 5": "Unit 5 - Terms",
        "Unit 6": "Unit 6 - Terms",
        "Unit 2": "Unit 2 - Business Terms",
        "Unit 3": "Unit 3 - Business Terms",
        "Unit 4": "Unit 4 - Business Terms",
        "Unit 7": "Unit 7 - Business Terms",
        "Unit 8": "Unit 8 - Business Terms",
        "Unit 9": "Unit 9 - Business Terms",
        "Unit 10": "Unit 10 - Business Terms",
    }
    
    unit = st.selectbox("Choose unit:", list(unit_labels.keys()), format_func=lambda x: unit_labels.get(x, x))
    
    col_a, col_b = st.columns(2)
    if col_a.button("Reload"):
        st.cache_data.clear()
        st.rerun()
    if col_b.button("Reset All"): # Reset lại trạng thái đã thuộc
        st.session_state.known_words = set()
        st.rerun()
        
    st.markdown("---")
    
    # === QUẢN LÝ TỪ ĐÃ THUỘC ===
    num_known = len(st.session_state.known_words)
    total_vocab = len(st.session_state.vocab_list) if st.session_state.vocab_list else 0
    
    st.write(f"📊 **Tiến độ: {num_known}/{total_vocab}**")
    progress = num_known / total_vocab if total_vocab > 0 else 0
    st.progress(progress)
    
    with st.expander("Xem từ đã thuộc"):
        if not st.session_state.known_words:
            st.caption("Chưa có từ nào.")
        else:
            for term in list(st.session_state.known_words):
                c1, c2 = st.columns([0.8, 0.2])
                c1.write(f"✅ {term}")
                if c2.button("✖", key=f"remove_{term}", help="Học lại từ này"):
                    st.session_state.known_words.remove(term)
                    st.rerun()

# Load Data logic
data = load_vocab(unit)
if data:
    if st.session_state.vocab_list != data:
        st.session_state.vocab_list = data
        st.session_state.known_words = set() # Reset known words khi đổi Unit (tuỳ chọn)
        next_card()
else:
    st.error("Chưa kết nối dữ liệu!")
    st.stop()

# --- 9. GIAO DIỆN CHÍNH ---
st.title("Business English")

# Kiểm tra xem còn từ để học không
if st.session_state.current_card is None:
    st.balloons()
    st.success("🎉 CHÚC MỪNG! BÀ ĐÃ HỌC HẾT TỪ VỰNG TRONG UNIT NÀY RỒI!")
    if st.button("Học lại từ đầu"):
        st.session_state.known_words = set()
        next_card()
        st.rerun()
    st.stop()

card = st.session_state.current_card
tab1, tab2, tab3, tab4 = st.tabs(["Flashcard", "Missing", "Typing", "Quiz"])

# === TAB 1: FLASHCARD ===
with tab1:
    with st.container():
        if not st.session_state.flip:
            st.markdown(f"""
            <div class="flashcard">
                <div class="label">TERM</div>
                <div class="term">{card['term']}</div>
                <div style="margin-top:40px; color:{theme['text_sub']}; font-size:12px;">(Bấm 'Lật thẻ' để xem nghĩa)</div>
            </div>
            """, unsafe_allow_html=True)
        else:
            st.markdown(f"""
            <div class="flashcard">
                <div class="label">DEFINITION</div>
                <div class="meaning">{card['meaning']}</div>
                <div class="label">VIETNAMESE</div>
                <div class="vietnamese">{card['vietnamese']}</div>
                <div class="label">EXAMPLE</div>
                <div class="example">"{card['example']}"</div>
            </div>
            """, unsafe_allow_html=True)
            
    c1, c2, c3 = st.columns([1, 1, 1])
    
    # Nút Lật thẻ
    if c1.button("🔄 Flip", use_container_width=True):
        st.session_state.flip = not st.session_state.flip
        st.rerun()
        
    # Nút Đã thuộc (Mới)
    if c2.button("✅ Đã thuộc", use_container_width=True):
        st.session_state.known_words.add(card['term'])
        st.toast(f"Đã đánh dấu thuộc: {card['term']}")
        next_card()
        st.rerun()
        
    # Nút Next (Chưa thuộc, để sau)
    if c3.button("➡ Next", type="primary", use_container_width=True):
        next_card()
        st.rerun()

# === TAB 2: MISSING LETTERS ===
with tab2:
    st.markdown(f"""
    <div class="card">
        <div class="label">DEFINITION</div>
        <div class="meaning" style="font-size: 24px !important;">{card['meaning']}</div>
        <div class="masked-word">{''.join(st.session_state.ms_masked)}</div>
    </div>
    """, unsafe_allow_html=True)
    
    user_inp = st.text_input("Gõ từ đầy đủ:", key=f"ms_{st.session_state.ms_key_counter}")
    
    if st.session_state.ms_feedback:
        if "Giỏi" in st.session_state.ms_feedback:
            st.markdown(f'<div class="success-msg">{st.session_state.ms_feedback}</div>', unsafe_allow_html=True)
        else:
            st.markdown(f'<div class="error-msg">{st.session_state.ms_feedback}</div>', unsafe_allow_html=True)

    col1, col2, col3 = st.columns(3)
    if col1.button("Check", key="ms_chk"):
        if normalize(user_inp) == normalize(card['term']):
            st.session_state.ms_feedback = "Giỏi quá!"
            st.balloons()
        else:
            st.session_state.ms_feedback = "Sai rồi!"
        st.rerun()
    if col2.button("Hint", key="ms_hnt"):
        h_idx = [i for i, c in enumerate(st.session_state.ms_masked) if c == '_']
        if h_idx:
            idx = random.choice(h_idx)
            st.session_state.ms_masked[idx] = card['term'][idx]
            st.rerun()
    if col3.button("Skip", key="ms_skp"):
        next_card()
        st.rerun()

# === TAB 3: TYPING ===
with tab3:
    st.markdown(f"""
    <div class="card">
        <div class="label">VIETNAMESE</div>
        <div class="vietnamese">{card['vietnamese']}</div>
    </div>
    """, unsafe_allow_html=True)
    
    u_type = st.text_input("Nhập từ tiếng Anh:", key=f"ty_{st.session_state.ty_key_counter}")
    
    if st.session_state.ty_mistakes >= 3:
        st.info(f"💡 Gợi ý: {card['example']}")

    if st.session_state.ty_feedback:
         # Check if feedback implies success
        color = "success-msg" if "Chuẩn" in st.session_state.ty_feedback else "error-msg"
        st.markdown(f'<div class="{color}">{st.session_state.ty_feedback}</div>', unsafe_allow_html=True)
        
    t1, t2 = st.columns(2)
    if t1.button("Submit", key="ty_sub", type="primary"):
        if normalize(u_type) == normalize(card['term']):
            st.session_state.ty_feedback = "Chuẩn không cần chỉnh!"
            st.balloons()
        else:
            st.session_state.ty_mistakes += 1
            st.session_state.ty_feedback = "Cố lên, sai rồi!"
        st.rerun()
    if t2.button("Skip Word", key="ty_skp"):
        next_card()
        st.rerun()

# === TAB 4: QUIZ ===
with tab4:
    st.markdown(f"""
    <div class="card">
        <div style="font-size: 22px; font-weight: bold;">What is the meaning of "<span style="color:#4e54c8">{card['term']}</span>"?</div>
    </div>
    """, unsafe_allow_html=True)
    
    ans = st.radio("Choose answer:", st.session_state.qz_options, format_func=lambda x: x['meaning'], key=f"qz_{st.session_state.ty_key_counter}")
    
    if st.button("Confirm", disabled=st.session_state.qz_answered):
        if ans:
            st.session_state.qz_answered = True
            if ans['term'] == card['term']:
                st.session_state.qz_feedback = "correct"
                st.balloons()
            else:
                st.session_state.qz_feedback = "wrong"
            st.rerun()
            
    if st.session_state.qz_answered:
        if st.session_state.qz_feedback == "correct": st.success("Chính xác!")
        else: st.error(f"Sai rồi! Đáp án là: {card['meaning']}")
        if st.button("Next Question ->"):
            next_card()
            st.rerun()