import streamlit as st
from supabase import create_client, Client
import random

# --- 1. SETUP & CONFIG ---
st.set_page_config(page_title="Vocab cho cổ", page_icon="🌸", layout="centered")

# --- 2. THEME SETTINGS (CHẾ ĐỘ BAN ĐÊM) ---
with st.sidebar:
    st.title("Cài đặt")
    # Nút gạt chế độ tối
    dark_mode = st.toggle("🌙 Dark mode")

# Định nghĩa bảng màu (Theme)
if dark_mode:
    theme = {
        "bg_color": "#0E1117",      # Màu nền TOÀN BỘ WEB (Đen sâu)
        "card_bg": "#1E1E1E",       # Màu nền thẻ (Xám đen)
        "text_main": "#FFFFFF",     # Chữ chính (Trắng)
        "text_sub": "#B0B0B0",      # Chữ phụ (Xám sáng)
        "input_bg": "#262730",      # Nền ô nhập liệu / Nền nút
        "border": "#444444",        # Viền thẻ
        "shadow": "rgba(0,0,0,0.5)",# Bóng đổ đậm
        "button_text": "#FFFFFF"    # Màu chữ trên nút
    }
else:
    theme = {
        "bg_color": "#ffffff",      # Màu nền TOÀN BỘ WEB (Trắng)
        "card_bg": "#ffffff",       # Màu nền thẻ (Trắng)
        "text_main": "#333333",     # Chữ chính (Đen)
        "text_sub": "#555555",      # Chữ phụ (Xám)
        "input_bg": "#f8f9fa",      # Nền ô nhập liệu / Nền nút
        "border": "#f0f2f6",        # Viền thẻ
        "shadow": "rgba(0,0,0,0.1)",# Bóng đổ nhẹ
        "button_text": "#333333"    # Màu chữ trên nút
    }

# --- 3. CSS ĐỘNG (ĐÃ FIX LỖI MẤT CHỮ) ---
st.markdown(f"""
<style>
    /* 1. ĐỔI MÀU NỀN TOÀN BỘ WEB */
    .stApp {{
        background-color: {theme['bg_color']};
        color: {theme['text_main']};
    }}
    
    header[data-testid="stHeader"] {{
        background-color: {theme['bg_color']};
    }}

    /* 2. CẤU HÌNH INPUT & RADIO BUTTON */
    .stTextInput > div > div > input {{
        color: {theme['text_main']};
        background-color: {theme['input_bg']};
    }}
    .stRadio label {{
        color: {theme['text_main']} !important;
    }}
    .stTabs [data-baseweb="tab"] {{
        color: {theme['text_main']};
    }}

    /* 3. STYLE CHO NÚT BẤM (BUTTON) - ĐÃ FIX */
    .stButton>button {{
        width: 100%;
        border-radius: 50px;
        height: 50px;
        font-weight: 700;
        font-size: 20px;
        
        /* FIX: Gán màu động từ theme */
        color: {theme['button_text']} !important; 
        background-color: {theme['input_bg']} !important; 
        border: 1px solid {theme['border']} !important;
        
        box-shadow: 0 4px 10px rgba(78, 84, 200, 0.3);
        transition: all 0.2s;
    }}
    
    .stButton>button:hover {{
        transform: scale(1.02);
        border-color: #4e54c8 !important;
        color: #4e54c8 !important; /* Khi di chuột vào sẽ sáng màu lên */
    }}
    
    /* Card Style */
    .flashcard {{
        background-color: {theme['card_bg']};
        color: {theme['text_main']};
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 8px 30px {theme['shadow']};
        text-align: center;
        border: 2px solid {theme['border']};
        min-height: 450px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }}
    
    .card {{
        background-color: {theme['card_bg']};
        color: {theme['text_main']};
        padding: 30px;
        border-radius: 20px;
        border: 2px solid {theme['border']};
        box-shadow: 0 4px 15px {theme['shadow']};
        margin-bottom: 20px;
        text-align: center;
    }}

    /* Typography */
    .label {{ 
        font-size: 14px; 
        text-transform: uppercase; 
        letter-spacing: 2px; 
        color: {theme['text_sub']}; 
        margin-bottom: 10px; 
        margin-top: 20px; 
        font-weight: 600;
    }}
    
    .term {{ 
        font-size: 60px !important;
        font-weight: 900; 
        color: #4e54c8; 
        margin-bottom: 20px;
        line-height: 1.2;
        text-shadow: 1px 1px 2px {theme['shadow']};
    }}
    
    .meaning {{ 
        font-size: 28px !important;
        font-weight: 500; 
        color: {theme['text_main']}; 
        margin-bottom: 15px;
        line-height: 1.4;
    }}
    
    .vietnamese {{ 
        font-size: 35px !important;
        font-weight: bold; 
        color: #ff6b6b; 
        margin-bottom: 25px;
    }}
    
    .example {{ 
        font-size: 22px !important;
        font-style: italic; 
        color: {theme['text_sub']};
        line-height: 1.5;
    }}
    
    /* Masked Word Style */
    .masked-word {{
        font-family: 'Courier New', monospace;
        font-size: 40px;
        letter-spacing: 8px;
        font-weight: bold;
        color: {theme['text_main']};
        margin: 30px 0;
        background: {theme['input_bg']};
        padding: 20px;
        border-radius: 12px;
        border: 1px solid {theme['border']};
    }}

    /* Feedback */
    .success-msg {{ color: #28a745; font-weight: bold; font-size: 24px; padding: 15px; text-shadow: 0 0 10px rgba(40, 167, 69, 0.2); }}
    .error-msg {{ color: #dc3545; font-weight: bold; font-size: 24px; padding: 15px; text-shadow: 0 0 10px rgba(220, 53, 69, 0.2); }}
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

# --- 5. DATA & LOGIC FUNCTIONS ---
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
    
    masked_chars = []
    for i, c in enumerate(chars):
        if i in mask_indices:
            masked_chars.append('_')
        else:
            masked_chars.append(c)
    return masked_chars, mask_indices

# --- 6. SESSION STATE INIT ---
keys_to_init = [
    'vocab_list', 'current_card', 'flip', 
    'ms_masked', 'ms_indices', 'ms_feedback', 'ms_key_counter', 
    'ty_mistakes', 'ty_feedback', 'ty_key_counter', 
    'qz_options', 'qz_feedback', 'qz_answered'
]
for key in keys_to_init:
    if key not in st.session_state:
        if 'counter' in key: st.session_state[key] = 0
        elif 'indices' in key: st.session_state[key] = []
        elif 'flip' in key: st.session_state[key] = False
        else: st.session_state[key] = None

# --- 7. CONTROLLER ---
def next_card():
    if not st.session_state.vocab_list: return
    new_card = random.choice(st.session_state.vocab_list)
    st.session_state.current_card = new_card
    st.session_state.flip = False
    
    masked_chars, hidden_indices = create_masked_term(new_card['term'])
    st.session_state.ms_masked = masked_chars
    st.session_state.ms_indices = hidden_indices
    st.session_state.ms_feedback = None
    st.session_state.ms_key_counter += 1
    
    st.session_state.ty_mistakes = 0
    st.session_state.ty_feedback = None
    st.session_state.ty_key_counter += 1
    
    correct = new_card
    others = [v for v in st.session_state.vocab_list if v['term'] != correct['term']]
    wrongs = random.sample(others, min(3, len(others)))
    options = [correct] + wrongs
    random.shuffle(options)
    st.session_state.qz_options = options
    st.session_state.qz_feedback = None
    st.session_state.qz_answered = False

# Load Data & Sidebar
with st.sidebar:
    unit_labels = {
        "All": "Tất cả các từ (All Units)",
        "Unit 1": "Unit 1 - Terms",
        "Unit 2": "Unit 2 - Business Terms",
        "Unit 3": "Unit 3 - Business Terms",
        "Unit 4": "Unit 4 - Business Terms",
        "Unit 5": "Unit 5 - Terms",
        "Unit 6": "Unit 6 - Terms",
        "Unit 7": "Unit 7 - Business Terms",
        "Unit 8": "Unit 8 - Business Terms",
        "Unit 9": "Unit 9 - Business Terms",
        "Unit 10": "Unit 10 - Business Terms",
    }
    
    unit = st.selectbox(
        "Choose unit:",
        options=list(unit_labels.keys()), 
        format_func=lambda x: unit_labels.get(x, x)
    )
    
    if st.button("Reload data"):
        st.cache_data.clear()
        st.rerun()
    
    st.markdown("---")
    st.caption(f"Now is on: **{unit_labels.get(unit, unit)}**")

data = load_vocab(unit)
if data:
    if st.session_state.vocab_list != data:
        st.session_state.vocab_list = data
        next_card()
        st.session_state.ms_key_counter += 1
        st.session_state.ty_key_counter += 1
else:
    st.error("Chưa kết nối được dữ liệu!")
    st.stop()

card = st.session_state.current_card

# --- 8. GIAO DIỆN CHÍNH (UI) ---
st.title("Business English")

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
    <div class="label">DEFINITION (EN)</div>
    <div class="meaning">{card['meaning']}</div>
    <div class="label">VIETNAMESE</div>
    <div class="vietnamese">{card['vietnamese']}</div>
    <div class="label">EXAMPLE</div>
    <div class="example">"{card['example']}"</div>
</div>
""", unsafe_allow_html=True)
            
    col1, col2 = st.columns(2)
    if col1.button(" Flip", use_container_width=True):
        st.session_state.flip = not st.session_state.flip
        st.rerun()
    if col2.button("Next", type="primary", use_container_width=True):
        next_card()
        st.rerun()

# === TAB 2: MISSING LETTERS ===
with tab2:
    st.markdown(f"""
<div class="card">
    <div class="label">DEFINITION</div>
    <div class="meaning" style="font-size: 24px !important;">{card['meaning']}</div>
    <div class="example">({card['vietnamese']})</div>
    <div class="label">FILL IN THE BLANKS</div>
    <div class="masked-word">{''.join(st.session_state.ms_masked)}</div>
</div>
""", unsafe_allow_html=True)
    
    user_inp = st.text_input("Gõ từ đầy đủ:", key=f"ms_in_{st.session_state.ms_key_counter}")
    
    if st.session_state.ms_feedback:
        if "Phương Thảo" in st.session_state.ms_feedback:
            st.markdown(f'<div class="success-msg">{st.session_state.ms_feedback}</div>', unsafe_allow_html=True)
        else:
            st.markdown(f'<div class="error-msg">{st.session_state.ms_feedback}</div>', unsafe_allow_html=True)

    c1, c2, c3 = st.columns(3)
    if c1.button("Check", key="btn_ms_check"):
        if normalize(user_inp) == normalize(card['term']):
            st.session_state.ms_feedback = "Phương Thảo giỏi quá à"
            st.balloons()
        else:
            st.session_state.ms_feedback = "Thiếu dame ời bà!"
        st.rerun()
        
    if c2.button("Hint (+1 char)", key="btn_ms_hint"):
        current_hidden = [i for i, char in enumerate(st.session_state.ms_masked) if char == '_']
        if current_hidden:
            idx_to_reveal = random.choice(current_hidden)
            st.session_state.ms_masked[idx_to_reveal] = card['term'][idx_to_reveal]
            st.rerun()
            
    if c3.button("Skip", key="btn_ms_skip"):
        next_card()
        st.rerun()

# === TAB 3: TYPING ===
with tab3:
    st.markdown(f"""
<div class="card">
    <div class="label">MEANING</div>
    <div class="vietnamese">{card['vietnamese']}</div>
    <div class="meaning" style="font-size: 20px !important;">{card['meaning']}</div>
</div>
""", unsafe_allow_html=True)
    
    user_type = st.text_input("Nhập chính xác từ tiếng Anh:", key=f"ty_in_{st.session_state.ty_key_counter}")
    
    if st.session_state.ty_mistakes >= 3:
        st.markdown(f"""
<div class="hint-box">
    <strong>💡 Context Hint:</strong> {card['example']}
</div>
""", unsafe_allow_html=True)
        
    if st.session_state.ty_feedback:
        color = "success-msg" if "EXCELLENT" in st.session_state.ty_feedback else "error-msg"
        st.markdown(f'<div class="{color}">{st.session_state.ty_feedback}</div>', unsafe_allow_html=True)

    tc1, tc2 = st.columns(2)
    if tc1.button("Submit", key="btn_ty_submit", type="primary"):
        if normalize(user_type) == normalize(card['term']):
            st.session_state.ty_feedback = "Giỏi v học chi nữa"
            st.balloons()
        else:
            st.session_state.ty_mistakes += 1
            st.session_state.ty_feedback = "Cố learn-.-"
        st.rerun()
        
    if tc2.button("Skip Word", key="btn_ty_skip"):
        next_card()
        st.rerun()

# === TAB 4: QUIZ ===
with tab4:
    st.markdown(f"""
<div class="card" style="margin-bottom: 20px;">
    <div class="label">QUESTION</div>
    <div style="font-size: 22px; font-weight: bold; color: {theme['text_main']};">What is the meaning of "<span style="color:#4e54c8">{card['term']}</span>"?</div>
    <div style="font-size: 16px; color: {theme['text_sub']}; font-style:italic;">(Vietnamese: {card['vietnamese']})</div>
</div>
""", unsafe_allow_html=True)
    
    answer = st.radio(
        "Choose the correct answer:",
        st.session_state.qz_options,
        format_func=lambda x: x['meaning'],
        key=f"qz_rad_{st.session_state.ty_key_counter}",
        index=None
    )
    
    if st.button("Confirm Answer", key="btn_qz_confirm", disabled=st.session_state.qz_answered):
        if answer:
            st.session_state.qz_answered = True
            if answer['term'] == card['term']:
                st.session_state.qz_feedback = "correct"
                st.balloons()
            else:
                st.session_state.qz_feedback = "wrong"
            st.rerun()

    if st.session_state.qz_answered:
        if st.session_state.qz_feedback == "correct":
             st.success("Ăn tết hông làm bà mai một he.")
        else:
             st.error(f"Nope, its mean is: {card['meaning']}")
        
        if st.button("Câu tiếp theo ->"):
            next_card()
            st.rerun()