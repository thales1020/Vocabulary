import streamlit as st
from supabase import create_client, Client
import random

# --- 1. SETUP & CONFIG ---
st.set_page_config(page_title="Vocab cho cổ", page_icon="🌸", layout="centered")

# CSS: Copy màu sắc và style từ file HTML gốc để tạo cảm giác quen thuộc
# CSS: Đã điều chỉnh cỡ chữ TO HƠN
st.markdown("""
    <style>
    /* Biến màu sắc */
    :root {
        --primary: #4e54c8;
        --secondary: #8f94fb;
        --success: #28a745;
        --error: #dc3545;
    }
    
    .stButton>button {
        width: 100%;
        border-radius: 50px;
        height: 50px; /* Nút to hơn chút */
        font-weight: 700;
        font-size: 20px; /* Chữ trong nút to lên */
        border: none;
        box-shadow: 0 4px 10px rgba(78, 84, 200, 0.3);
        transition: transform 0.2s;
    }
    .stButton>button:hover {
        transform: scale(1.02);
    }
    
    /* Card Style */
    .flashcard {
        background-color: white;
        padding: 40px; /* Padding rộng hơn */
        border-radius: 20px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        text-align: center;
        border: 2px solid #f0f2f6;
        min-height: 450px; /* Thẻ cao hơn */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    /* --- PHẦN CHỈNH CỠ CHỮ --- */
    .label { 
        font-size: 14px; 
        text-transform: uppercase; 
        letter-spacing: 2px; 
        color: #aaa; 
        margin-bottom: 10px; 
        margin-top: 20px; 
        font-weight: 600;
    }
    
    .term { 
        font-size: 60px !important; /* Term siêu to */
        font-weight: 900; 
        color: #4e54c8; 
        margin-bottom: 20px;
        line-height: 1.2;
    }
    
    .meaning { 
        font-size: 28px !important; /* Nghĩa tiếng Anh to */
        font-weight: 500; 
        color: #333; 
        margin-bottom: 15px;
        line-height: 1.4;
    }
    
    .vietnamese { 
        font-size: 35px !important; /* Nghĩa Tiếng Việt nổi bật */
        font-weight: bold; 
        color: #ff6b6b; 
        margin-bottom: 25px;
    }
    
    .example { 
        font-size: 22px !important; /* Ví dụ dễ đọc */
        font-style: italic; 
        color: #555;
        line-height: 1.5;
    }
    
    /* Masked Word Style */
    .masked-word {
        font-family: 'Courier New', monospace;
        font-size: 40px; /* Chữ điền từ cũng to lên */
        letter-spacing: 8px;
        font-weight: bold;
        color: #333;
        margin: 30px 0;
        background: #f8f9fa;
        padding: 20px;
        border-radius: 12px;
    }

    /* Feedback */
    .success-msg { color: #28a745; font-weight: bold; font-size: 24px; padding: 15px;}
    .error-msg { color: #dc3545; font-weight: bold; font-size: 24px; padding: 15px;}
    .hint-box { background: #fff3cd; color: #856404; padding: 15px; border-radius: 8px; margin-top: 15px; font-size: 18px;}
    </style>
""", unsafe_allow_html=True)

# --- 2. SUPABASE CONNECTION ---
@st.cache_resource
def init_connection():
    try:
        url = st.secrets["SUPABASE_URL"]
        key = st.secrets["SUPABASE_KEY"]
        return create_client(url, key)
    except:
        return None

supabase = init_connection()

# --- 3. DATA & LOGIC FUNCTIONS ---
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

# Logic tạo từ bị đục lỗ (giống JS: 45% ký tự)
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
    return masked_chars, mask_indices # Trả về mảng ký tự và danh sách vị trí bị ẩn

# --- 4. SESSION STATE INIT ---
# Khởi tạo các biến để lưu trạng thái game
keys_to_init = [
    'vocab_list', 'current_card', 'flip', 
    'ms_masked', 'ms_indices', 'ms_feedback', 'ms_key_counter', # State cho tab Missing
    'ty_mistakes', 'ty_feedback', 'ty_key_counter', # State cho tab Typing
    'qz_options', 'qz_feedback', 'qz_answered' # State cho tab Quiz
]
for key in keys_to_init:
    if key not in st.session_state:
        if 'counter' in key: st.session_state[key] = 0
        elif 'indices' in key: st.session_state[key] = []
        elif 'flip' in key: st.session_state[key] = False
        else: st.session_state[key] = None

# --- 5. CONTROLLER ---
def next_card():
    if not st.session_state.vocab_list: return
    
    # Pick random card
    new_card = random.choice(st.session_state.vocab_list)
    st.session_state.current_card = new_card
    
    # Reset Flashcard
    st.session_state.flip = False
    
    # Reset Missing Tab Logic
    masked_chars, hidden_indices = create_masked_term(new_card['term'])
    st.session_state.ms_masked = masked_chars
    st.session_state.ms_indices = hidden_indices
    st.session_state.ms_feedback = None
    st.session_state.ms_key_counter += 1 # Trick để xóa ô input
    
    # Reset Typing Tab Logic
    st.session_state.ty_mistakes = 0
    st.session_state.ty_feedback = None
    st.session_state.ty_key_counter += 1 # Trick để xóa ô input
    
    # Reset Quiz Tab Logic
    correct = new_card
    others = [v for v in st.session_state.vocab_list if v['term'] != correct['term']]
    wrongs = random.sample(others, min(3, len(others)))
    options = [correct] + wrongs
    random.shuffle(options)
    st.session_state.qz_options = options
    st.session_state.qz_feedback = None
    st.session_state.qz_answered = False

# Load Data lần đầu
with st.sidebar:
    st.title("Cài đặt")
    unit = st.selectbox("Chọn bài học:", ["All", "Unit 2", "Unit 3"])
    if st.button("Tải lại dữ liệu"):
        st.cache_data.clear()
        st.rerun()

data = load_vocab(unit)
if data:
    if st.session_state.vocab_list != data: # Nếu đổi unit hoặc data mới
        st.session_state.vocab_list = data
        next_card() # Init card đầu tiên
else:
    st.error("Chưa kết nối được Supabase hoặc không có dữ liệu!")
    st.stop()

card = st.session_state.current_card

# --- 6. GIAO DIỆN CHÍNH (UI) ---
st.title("Business English")

# Tạo Tabs
tab1, tab2, tab3, tab4 = st.tabs(["Flashcard", "Missing", "Typing", "Quiz"])

# === TAB 1: FLASHCARD ===
# === TAB 1: FLASHCARD ===
with tab1:
    # Container mô phỏng thẻ
    with st.container():
        if not st.session_state.flip:
            # MẶT TRƯỚC
            st.markdown(f"""
            <div class="flashcard">
                <div class="label">TERM</div>
                <div class="term">{card['term']}</div>
                <div style="margin-top:40px; color:#999; font-size:12px;">(Bấm 'Lật thẻ' để xem nghĩa)</div>
            </div>
            """, unsafe_allow_html=True)  # <--- QUAN TRỌNG: Phải có dòng này
        else:
            # MẶT SAU
            st.markdown(f"""
            <div class="flashcard">
                <div class="label">DEFINITION (EN)</div>
                <div class="meaning">{card['meaning']}</div>
                
                <div class="label">VIETNAMESE</div>
                <div class="vietnamese">{card['vietnamese']}</div>
                
                <div class="label">EXAMPLE</div>
                <div class="example">"{card['example']}"</div>
            </div>
            """, unsafe_allow_html=True) # <--- QUAN TRỌNG: Phải có dòng này
            
    col1, col2 = st.columns(2)
    if col1.button("🔄 Lật thẻ", use_container_width=True):
        st.session_state.flip = not st.session_state.flip
        st.rerun()
    if col2.button("➡️ Từ tiếp theo", type="primary", use_container_width=True):
        next_card()
        st.rerun()
# === TAB 2: MISSING LETTERS (Logic giống HTML) ===
with tab2:
    st.markdown(f"""
    <div class="card">
        <div class="label">DEFINITION</div>
        <div style="font-weight:500; margin-bottom:5px;">{card['meaning']}</div>
        <div style="font-style:italic; color:#666; margin-bottom:15px;">({card['vietnamese']})</div>
        <div class="label">FILL IN THE BLANKS</div>
        <div class="masked-word">{''.join(st.session_state.ms_masked)}</div>
    </div>
    """, unsafe_allow_html=True)
    
    # Input field với dynamic key để auto-clear
    user_inp = st.text_input("Gõ từ đầy đủ:", key=f"ms_in_{st.session_state.ms_key_counter}")
    
    # Feedback Area
    if st.session_state.ms_feedback:
        if "CORRECT" in st.session_state.ms_feedback:
            st.markdown(f'<div class="success-msg">{st.session_state.ms_feedback}</div>', unsafe_allow_html=True)
        else:
            st.markdown(f'<div class="error-msg">{st.session_state.ms_feedback}</div>', unsafe_allow_html=True)

    c1, c2, c3 = st.columns(3)
    
    # Nút Check
    if c1.button("Check", key="btn_ms_check"):
        if normalize(user_inp) == normalize(card['term']):
            st.session_state.ms_feedback = "Phương Thảo giỏi quá à"
            st.balloons()
        else:
            st.session_state.ms_feedback = "Thiếu dame ời bà!"
        st.rerun()
        
    # Nút Hint (+1 char) - Logic quan trọng
    if c2.button("Hint (+1 char)", key="btn_ms_hint"):
        # Tìm các index còn đang là '_'
        current_hidden = [i for i, char in enumerate(st.session_state.ms_masked) if char == '_']
        if current_hidden:
            # Lấy ngẫu nhiên 1 vị trí để mở
            idx_to_reveal = random.choice(current_hidden)
            st.session_state.ms_masked[idx_to_reveal] = card['term'][idx_to_reveal]
            st.rerun()
            
    # Nút Skip
    if c3.button("Skip", key="btn_ms_skip"):
        next_card()
        st.rerun()

# === TAB 3: HARDCORE TYPING (Logic giống HTML) ===
with tab3:
    # UI: VN to, EN nhỏ
    st.markdown(f"""
    <div class="card">
        <div class="label">MEANING</div>
        <div class="vietnamese">{card['vietnamese']}</div>
        <div style="font-size:14px; color:#555; margin-bottom:20px;">{card['meaning']}</div>
    </div>
    """, unsafe_allow_html=True)
    
    user_type = st.text_input("Nhập chính xác từ tiếng Anh:", key=f"ty_in_{st.session_state.ty_key_counter}")
    
    # Logic Sai 3 lần hiện gợi ý Context
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
            st.session_state.ty_feedback = "🎉 EXCELLENT!"
            st.balloons()
        else:
            st.session_state.ty_mistakes += 1
            st.session_state.ty_feedback = "⚠️ Incorrect. Try again."
        st.rerun()
        
    if tc2.button("Skip Word", key="btn_ty_skip"):
        next_card()
        st.rerun()

# === TAB 4: QUIZ ===
with tab4:
    st.markdown(f"""
    <div style="margin-bottom: 20px;">
        <div class="label">QUESTION</div>
        <div style="font-size: 18px; font-weight: bold;">What is the meaning of "<span style="color:#4e54c8">{card['term']}</span>"?</div>
        <div style="font-size: 14px; color: #666; font-style:italic;">(Vietnamese: {card['vietnamese']})</div>
    </div>
    """, unsafe_allow_html=True)
    
    # Hiển thị Options
    # Dùng radio nhưng custom lại label để hiển thị full text
    answer = st.radio(
        "Choose the correct answer:",
        st.session_state.qz_options,
        format_func=lambda x: x['meaning'],
        key=f"qz_rad_{st.session_state.ty_key_counter}", # Reset khi next card
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