import streamlit as st
from supabase import create_client
import random
import time

# --- 1. SETUP & CONFIG ---
st.set_page_config(page_title="Vocab cho cổ", layout="centered")

# --- 2. THEME SETTINGS ---
with st.sidebar:
    st.title("Cài đặt")
    dark_mode = st.toggle("Dark mode", value=True)

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

st.markdown(f"""
<style>
    .stApp {{ background-color: {theme['bg_color']}; color: {theme['text_main']}; }}
    header[data-testid="stHeader"] {{ background-color: {theme['bg_color']}; }}
    .stTextInput > div > div > input {{ color: {theme['text_main']}; background-color: {theme['input_bg']}; }}
    .stRadio label, .stTabs [data-baseweb="tab"] {{ color: {theme['text_main']} !important; }}
    
    .stButton>button {{
        width: 100%; border-radius: 50px; height: 50px; font-weight: 700; font-size: 20px;
        color: {theme['button_text']} !important; background-color: {theme['input_bg']} !important;
        border: 1px solid {theme['border']} !important; box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        transition: all 0.2s;
    }}
    .stButton>button:hover {{ transform: scale(1.02); border-color: {theme['highlight']} !important; color: {theme['highlight']} !important; }}
    
    /* Style riêng cho nút nhỏ trong sidebar */
    div[data-testid="stSidebar"] .stButton>button {{
        height: auto !important;
        font-size: 14px !important;
        padding: 5px 10px !important;
        border-radius: 8px !important;
    }}

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
    
    .label {{ font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: {theme['text_sub']}; margin: 20px 0 10px; font-weight: 600; }}
    .term {{ font-size: 50px !important; font-weight: 900; color: {theme['highlight']}; margin-bottom: 20px; line-height: 1.2; }}
    .meaning {{ font-size: 24px !important; font-weight: 500; color: {theme['text_main']}; margin-bottom: 15px; line-height: 1.4; }}
    .vietnamese {{ font-size: 30px !important; font-weight: bold; color: #ff6b6b; margin-bottom: 25px; }}
    .example {{ font-size: 20px !important; font-style: italic; color: {theme['text_sub']}; line-height: 1.5; }}
    .masked-word {{ font-family: monospace; font-size: 35px; letter-spacing: 5px; font-weight: bold; color: {theme['text_main']}; margin: 20px 0; background: {theme['input_bg']}; padding: 15px; border-radius: 12px; }}
    
    .success-msg {{ color: #28a745; font-weight: bold; font-size: 24px; padding: 15px; }}
    .error-msg {{ color: #dc3545; font-weight: bold; font-size: 24px; padding: 15px; }}
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
def load_learning_vocab(unit_filter=None):
    """Chỉ tải những từ CHƯA thuộc (is_known = False)"""
    if not supabase: return []
    
    # Lọc is_known = False
    query = supabase.table("vocabulary").select("*").eq("is_known", False)
    
    if unit_filter and unit_filter != "All":
        query = query.eq("unit", unit_filter)
        
    response = query.execute()
    return response.data

def get_known_vocab_grouped():
    """Lấy danh sách từ ĐÃ thuộc (is_known = True) và nhóm theo Unit"""
    if not supabase: return {}
    
    response = supabase.table("vocabulary").select("*").eq("is_known", True).order('unit').execute()
    data = response.data
    
    # Nhóm data theo Unit
    grouped = {}
    for item in data:
        u = item.get('unit', 'Unknown Unit')
        if u not in grouped:
            grouped[u] = []
        grouped[u].append(item)
    return grouped

def mark_as_known_db(term_id):
    """Cập nhật trạng thái đã thuộc (TRUE) lên database"""
    if supabase:
        supabase.table("vocabulary").update({"is_known": True}).eq("id", term_id).execute()

def mark_as_unknown_db(term_id):
    """Cập nhật trạng thái chưa thuộc (FALSE) - Học lại"""
    if supabase:
        supabase.table("vocabulary").update({"is_known": False}).eq("id", term_id).execute()

def reset_unit_db(unit_name):
    """Reset toàn bộ Unit về chưa thuộc"""
    if supabase:
        supabase.table("vocabulary").update({"is_known": False}).eq("unit", unit_name).execute()

def normalize(text):
    return " ".join(text.strip().lower().split())

def create_masked_term(term):
    chars = list(term)
    indices = [i for i, c in enumerate(chars) if c != ' ']
    num_to_mask = int(len(term) * 0.45)
    # Đảm bảo mask ít nhất 1 ký tự nếu từ ngắn
    if num_to_mask == 0 and len(indices) > 0: num_to_mask = 1
    
    mask_indices = random.sample(indices, min(num_to_mask, len(indices)))
    masked_chars = ['_' if i in mask_indices else c for i, c in enumerate(chars)]
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
    # Load lại list từ vựng mới nhất (đã trừ những từ vừa mark known)
    if not st.session_state.vocab_list: 
        st.session_state.current_card = None
        return

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
    wrongs = random.sample(others, min(3, len(others))) if len(others) >= 3 else others
    options = [correct] + wrongs
    random.shuffle(options)
    st.session_state.qz_options = options
    st.session_state.qz_feedback = None
    st.session_state.qz_answered = False

# --- 8. SIDEBAR CONTROL ---
with st.sidebar:
    unit_labels = {
        "All": "Tất cả (All Units)",
        "Unit 1": "Unit 1", "Unit 2": "Unit 2", "Unit 3": "Unit 3", 
        "Unit 4": "Unit 4", "Unit 5": "Unit 5", "Unit 6": "Unit 6",
        "Unit 7": "Unit 7", "Unit 8": "Unit 8", "Unit 9": "Unit 9", "Unit 10": "Unit 10",
    }
    
    # === [FIX LOGIC] KIỂM TRA CHUYỂN BÀI ===
    # 1. Lưu bài đã chọn vào biến selected_unit
    selected_unit = st.selectbox("Chọn bài để học:", list(unit_labels.keys()), format_func=lambda x: unit_labels.get(x, x))
    
    # 2. Kiểm tra nếu chưa có tracking_unit thì tạo mới
    if 'tracking_unit' not in st.session_state:
        st.session_state.tracking_unit = selected_unit

    # 3. Nếu bài chọn (selected_unit) KHÁC với bài đang nhớ (tracking_unit) -> RESET để load lại
    if st.session_state.tracking_unit != selected_unit:
        st.session_state.vocab_list = None       # Xóa danh sách cũ
        st.session_state.current_card = None     # Xóa thẻ cũ
        st.session_state.tracking_unit = selected_unit # Cập nhật bài mới
        st.rerun() # Chạy lại app ngay lập tức
    
    if st.button("🔄 Tải lại dữ liệu"):
        st.cache_data.clear()
        st.session_state.vocab_list = None
        st.rerun()
        
    st.markdown("---")
    
    # === QUẢN LÝ TỪ ĐÃ THUỘC (THEO UNIT) ===
    st.markdown("### 🏆 Đã thuộc")
    known_grouped = get_known_vocab_grouped()
    
    if not known_grouped:
        st.caption("Chưa có từ nào đã thuộc.")
    else:
        for u_name, words in known_grouped.items():
            # Dùng Expander để gom nhóm
            with st.expander(f"{u_name} ({len(words)} từ)"):
                # Nút Reset All cho Unit
                if st.button(f"Reset {u_name}", key=f"rst_u_{u_name}", type="primary"):
                    reset_unit_db(u_name)
                    st.toast(f"Đã reset {u_name}. Vào 'Chọn bài' để học lại.", icon="✅")
                    
                    # Nếu đang học bài này hoặc "All" thì phải load lại list
                    if selected_unit == u_name or selected_unit == "All":
                        st.session_state.vocab_list = None
                        
                    time.sleep(0.5)
                    st.rerun()
                
                st.markdown("---")
                # List từng từ
                for w in words:
                    c1, c2 = st.columns([2, 1])
                    with c1:
                        st.markdown(f"**{w['term']}**")
                        st.caption(w['vietnamese'])
                    with c2:
                        if st.button("Xóa", key=f"rst_w_{w['id']}"):
                            mark_as_unknown_db(w['id'])
                            st.toast(f"Đã đưa '{w['term']}' về danh sách học.")
                            
                            # Nếu đang học bài có chứa từ này -> Reset list để nó hiện ra
                            if selected_unit == w.get('unit') or selected_unit == "All":
                                st.session_state.vocab_list = None
                                
                            time.sleep(0.5)
                            st.rerun()
                    st.markdown("---")


# Load Data logic (Fetch list chưa thuộc dựa trên selected_unit)
if st.session_state.vocab_list is None:
    data = load_learning_vocab(selected_unit) # Sử dụng selected_unit đã lấy ở trên
    st.session_state.vocab_list = data
    if data:
        next_card() # Khởi tạo thẻ đầu tiên
    else:
        st.session_state.current_card = None

# --- 9. GIAO DIỆN CHÍNH ---
st.title("Business English")

if not st.session_state.vocab_list or st.session_state.current_card is None:
    st.balloons()
    st.success("CHÚC MỪNG! BẠN ĐÃ THUỘC HẾT CÁC TỪ TRONG BÀI NÀY!")
    st.info("Kiểm tra Sidebar (menu trái) để xem danh sách từ đã thuộc hoặc Reset nếu muốn học lại.")
    # Dừng app tại đây để không render lỗi
    st.stop()

card = st.session_state.current_card

tab1, tab2, tab3, tab4 = st.tabs(["Flashcard", "Missing", "Typing", "Quiz"])

# === TAB 1: FLASHCARD ===
# === TAB 1: FLASHCARD ===
with tab1:
    with st.container():
        # Lấy thông tin Unit, nếu không có thì để rỗng
        unit_name = card.get('unit', '')

        if not st.session_state.flip:
            # --- MẶT TRƯỚC ---
            st.markdown(f"""
            <div class="flashcard">
                <div style="color: {theme['highlight']}; font-size: 16px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">
                {unit_name}
                </div>
                
                <div class="label">TERM</div>
                <div class="term">{card['term']}</div>
                <div style="margin-top:40px; color:{theme['text_sub']}; font-size:12px;">(Bấm 'Lật thẻ' để xem nghĩa)</div>
            </div>
            """, unsafe_allow_html=True)
        else:import streamlit as st
from supabase import create_client
import random
import time

# --- 1. SETUP & CONFIG ---
st.set_page_config(page_title="Vocab cho cổ", layout="centered")

# --- 2. THEME SETTINGS ---
with st.sidebar:
    st.title("Cài đặt")
    dark_mode = st.toggle("Dark mode", value=True)

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

st.markdown(f"""
<style>
    .stApp {{ background-color: {theme['bg_color']}; color: {theme['text_main']}; }}
    header[data-testid="stHeader"] {{ background-color: {theme['bg_color']}; }}
    .stTextInput > div > div > input {{ color: {theme['text_main']}; background-color: {theme['input_bg']}; }}
    .stRadio label, .stTabs [data-baseweb="tab"] {{ color: {theme['text_main']} !important; }}
    
    .stButton>button {{
        width: 100%; border-radius: 50px; height: 50px; font-weight: 700; font-size: 20px;
        color: {theme['button_text']} !important; background-color: {theme['input_bg']} !important;
        border: 1px solid {theme['border']} !important; box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        transition: all 0.2s;
    }}
    .stButton>button:hover {{ transform: scale(1.02); border-color: {theme['highlight']} !important; color: {theme['highlight']} !important; }}
    
    /* Style riêng cho nút nhỏ trong sidebar */
    div[data-testid="stSidebar"] .stButton>button {{
        height: auto !important;
        font-size: 14px !important;
        padding: 5px 10px !important;
        border-radius: 8px !important;
    }}

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
    
    .label {{ font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: {theme['text_sub']}; margin: 20px 0 10px; font-weight: 600; }}
    .term {{ font-size: 50px !important; font-weight: 900; color: {theme['highlight']}; margin-bottom: 20px; line-height: 1.2; }}
    .meaning {{ font-size: 24px !important; font-weight: 500; color: {theme['text_main']}; margin-bottom: 15px; line-height: 1.4; }}
    .vietnamese {{ font-size: 30px !important; font-weight: bold; color: #ff6b6b; margin-bottom: 25px; }}
    .example {{ font-size: 20px !important; font-style: italic; color: {theme['text_sub']}; line-height: 1.5; }}
    .masked-word {{ font-family: monospace; font-size: 35px; letter-spacing: 5px; font-weight: bold; color: {theme['text_main']}; margin: 20px 0; background: {theme['input_bg']}; padding: 15px; border-radius: 12px; }}
    
    .success-msg {{ color: #28a745; font-weight: bold; font-size: 24px; padding: 15px; }}
    .error-msg {{ color: #dc3545; font-weight: bold; font-size: 24px; padding: 15px; }}
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
def load_learning_vocab(unit_filter=None):
    """Chỉ tải những từ CHƯA thuộc (is_known = False)"""
    if not supabase: return []
    
    # Lọc is_known = False
    query = supabase.table("vocabulary").select("*").eq("is_known", False)
    
    if unit_filter and unit_filter != "All":
        query = query.eq("unit", unit_filter)
        
    response = query.execute()
    return response.data

def get_known_vocab_grouped():
    """Lấy danh sách từ ĐÃ thuộc (is_known = True) và nhóm theo Unit"""
    if not supabase: return {}
    
    response = supabase.table("vocabulary").select("*").eq("is_known", True).order('unit').execute()
    data = response.data
    
    # Nhóm data theo Unit
    grouped = {}
    for item in data:
        u = item.get('unit', 'Unknown Unit')
        if u not in grouped:
            grouped[u] = []
        grouped[u].append(item)
    return grouped

def mark_as_known_db(term_id):
    """Cập nhật trạng thái đã thuộc (TRUE) lên database"""
    if supabase:
        supabase.table("vocabulary").update({"is_known": True}).eq("id", term_id).execute()

def mark_as_unknown_db(term_id):
    """Cập nhật trạng thái chưa thuộc (FALSE) - Học lại"""
    if supabase:
        supabase.table("vocabulary").update({"is_known": False}).eq("id", term_id).execute()

def reset_unit_db(unit_name):
    """Reset toàn bộ Unit về chưa thuộc"""
    if supabase:
        supabase.table("vocabulary").update({"is_known": False}).eq("unit", unit_name).execute()

def normalize(text):
    return " ".join(text.strip().lower().split())

def create_masked_term(term):
    chars = list(term)
    indices = [i for i, c in enumerate(chars) if c != ' ']
    num_to_mask = int(len(term) * 0.45)
    # Đảm bảo mask ít nhất 1 ký tự nếu từ ngắn
    if num_to_mask == 0 and len(indices) > 0: num_to_mask = 1
    
    mask_indices = random.sample(indices, min(num_to_mask, len(indices)))
    masked_chars = ['_' if i in mask_indices else c for i, c in enumerate(chars)]
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
    # Load lại list từ vựng mới nhất (đã trừ những từ vừa mark known)
    if not st.session_state.vocab_list: 
        st.session_state.current_card = None
        return

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
    wrongs = random.sample(others, min(3, len(others))) if len(others) >= 3 else others
    options = [correct] + wrongs
    random.shuffle(options)
    st.session_state.qz_options = options
    st.session_state.qz_feedback = None
    st.session_state.qz_answered = False

# --- 8. SIDEBAR CONTROL ---
with st.sidebar:
    unit_labels = {
        "All": "Tất cả (All Units)",
        "Unit 1": "Unit 1", "Unit 5": "Unit 5", "Unit 6": "Unit 6",
        "Unit 2": "Unit 2", "Unit 3": "Unit 3", "Unit 4": "Unit 4",
        "Unit 7": "Unit 7", "Unit 8": "Unit 8", "Unit 9": "Unit 9", "Unit 10": "Unit 10",
    }
    
    # === [FIX LOGIC] KIỂM TRA CHUYỂN BÀI ===
    selected_unit = st.selectbox("Chọn bài để học:", list(unit_labels.keys()), format_func=lambda x: unit_labels.get(x, x))
    
    if 'tracking_unit' not in st.session_state:
        st.session_state.tracking_unit = selected_unit

    if st.session_state.tracking_unit != selected_unit:
        st.session_state.vocab_list = None       
        st.session_state.current_card = None     
        st.session_state.tracking_unit = selected_unit 
        st.rerun() 
    
    if st.button("🔄 Tải lại dữ liệu"):
        st.cache_data.clear()
        st.session_state.vocab_list = None
        st.rerun()
        
    st.markdown("---")
    
    # === QUẢN LÝ TỪ ĐÃ THUỘC (THEO UNIT) ===
    st.markdown("### 🏆 Đã thuộc")
    known_grouped = get_known_vocab_grouped()
    
    if not known_grouped:
        st.caption("Chưa có từ nào đã thuộc.")
    else:
        for u_name, words in known_grouped.items():
            with st.expander(f"{u_name} ({len(words)} từ)"):
                if st.button(f"Reset {u_name}", key=f"rst_u_{u_name}", type="primary"):
                    reset_unit_db(u_name)
                    st.toast(f"Đã reset {u_name}. Vào 'Chọn bài' để học lại.", icon="✅")
                    if selected_unit == u_name or selected_unit == "All":
                        st.session_state.vocab_list = None
                    time.sleep(0.5)
                    st.rerun()
                
                st.markdown("---")
                for w in words:
                    c1, c2 = st.columns([2, 1])
                    with c1:
                        st.markdown(f"**{w['term']}**")
                        st.caption(w['vietnamese'])
                    with c2:
                        if st.button("Xóa", key=f"rst_w_{w['id']}"):
                            mark_as_unknown_db(w['id'])
                            st.toast(f"Đã đưa '{w['term']}' về danh sách học.")
                            if selected_unit == w.get('unit') or selected_unit == "All":
                                st.session_state.vocab_list = None
                            time.sleep(0.5)
                            st.rerun()
                    st.markdown("---")

# Load Data logic
if st.session_state.vocab_list is None:
    data = load_learning_vocab(selected_unit)
    st.session_state.vocab_list = data
    if data:
        next_card()
    else:
        st.session_state.current_card = None

# --- 9. GIAO DIỆN CHÍNH ---
st.title("Business English")

if not st.session_state.vocab_list or st.session_state.current_card is None:
    st.balloons()
    st.success("CHÚC MỪNG! BẠN ĐÃ THUỘC HẾT CÁC TỪ TRONG BÀI NÀY!")
    st.info("Kiểm tra Sidebar (menu trái) để xem danh sách từ đã thuộc hoặc Reset nếu muốn học lại.")
    st.stop()

card = st.session_state.current_card

tab1, tab2, tab3, tab4 = st.tabs(["Flashcard", "Missing", "Typing", "Quiz"])

# === TAB 1: FLASHCARD (UPDATED WITH UNIT NAME) ===
with tab1:
    with st.container():
        # Lấy thông tin Unit
        unit_name = card.get('unit', '')

        if not st.session_state.flip:
            st.markdown(f"""
            <div class="flashcard">
                <div style="color: {theme['highlight']}; font-size: 16px; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 1px;">
                📚 {unit_name}
                </div>
                
                <div class="label">TERM</div>
                <div class="term">{card['term']}</div>
                <div style="margin-top:40px; color:{theme['text_sub']}; font-size:12px;">(Bấm 'Lật thẻ' để xem nghĩa)</div>
            </div>
            """, unsafe_allow_html=True)
        else:
            st.markdown(f"""
            <div class="flashcard">
                <div style="color: {theme['highlight']}; font-size: 16px; font-weight: bold; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">
                📚 {unit_name}
                </div>

                <div class="label">DEFINITION</div>
                <div class="meaning">{card['meaning']}</div>
                <div class="label">VIETNAMESE</div>
                <div class="vietnamese">{card['vietnamese']}</div>
                <div class="label">EXAMPLE</div>
                <div class="example">"{card['example']}"</div>
            </div>
            """, unsafe_allow_html=True)
            
    c1, c2, c3 = st.columns([1, 1, 1])
    
    if c1.button("Lật thẻ", use_container_width=True):
        st.session_state.flip = not st.session_state.flip
        st.rerun()
        
    if c2.button("Đã thuộc", use_container_width=True):
        mark_as_known_db(card['id'])
        st.toast(f"Đã thuộc: {card['term']}!", icon="🎉")
        st.session_state.vocab_list = [v for v in st.session_state.vocab_list if v['id'] != card['id']]
        next_card()
        st.rerun()
        
    if c3.button("Next", type="primary", use_container_width=True):
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
        color = "success-msg" if "Giỏi" in st.session_state.ms_feedback else "error-msg"
        st.markdown(f'<div class="{color}">{st.session_state.ms_feedback}</div>', unsafe_allow_html=True)

    col1, col2, col3 = st.columns(3)
    if col1.button("Check", key="ms_chk"):
        if normalize(user_inp) == normalize(card['term']):
            st.session_state.ms_feedback = "Phương Thảo giỏi quá à"
            st.balloons()
        else:
            st.session_state.ms_feedback = "Thiếu dame ời bà!"
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
        st.info(f"Gợi ý: {card['example']}")

    if st.session_state.ty_feedback:
        color = "success-msg" if "Chuẩn" in st.session_state.ty_feedback else "error-msg"
        st.markdown(f'<div class="{color}">{st.session_state.ty_feedback}</div>', unsafe_allow_html=True)
        
    t1, t2 = st.columns(2)
    if t1.button("Submit", key="ty_sub", type="primary"):
        if normalize(u_type) == normalize(card['term']):
            st.session_state.ty_feedback = "Giỏi v học chi nữa"
            st.balloons()
        else:
            st.session_state.ty_mistakes += 1
            st.session_state.ty_feedback = "Cố learn thêm nha!"
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
    
    ans = st.radio("Choose answer:", st.session_state.qz_options, format_func=lambda x: x['meaning'], key=f"qz_rad_{st.session_state.ty_key_counter}")
    
    q1, q2 = st.columns(2)
    if q1.button("Confirm", disabled=st.session_state.qz_answered):
        if ans:
            st.session_state.qz_answered = True
            if ans['term'] == card['term']:
                st.session_state.qz_feedback = "correct"
                st.balloons()
            else:
                st.session_state.qz_feedback = "wrong"
            st.rerun()
            
    if st.session_state.qz_answered:
        if st.session_state.qz_feedback == "correct": st.success("Ăn tết mà học giỏi he")
        else: st.error(f"Nope, its mean is: {card['meaning']}")
        if q2.button("Next Question ->"):
            next_card()
            st.rerun()
            # --- MẶT SAU ---
            st.markdown(f"""
            <div class="flashcard">
                <div style="color: {theme['highlight']}; font-size: 16px; font-weight: bold; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">
                {unit_name}
                </div>

                <div class="label">DEFINITION</div>
                <div class="meaning">{card['meaning']}</div>
                <div class="label">VIETNAMESE</div>
                <div class="vietnamese">{card['vietnamese']}</div>
                <div class="label">EXAMPLE</div>
                <div class="example">"{card['example']}"</div>
            </div>
            """, unsafe_allow_html=True)
            
    c1, c2, c3 = st.columns([1, 1, 1])
    
    if c1.button("Lật thẻ", use_container_width=True):
        st.session_state.flip = not st.session_state.flip
        st.rerun()
        
    # Nút Đã thuộc
    if c2.button("Đã thuộc", use_container_width=True):
        mark_as_known_db(card['id'])
        st.toast(f"Đã thuộc: {card['term']}!", icon="🎉")
        st.session_state.vocab_list = [v for v in st.session_state.vocab_list if v['id'] != card['id']]
        next_card()
        st.rerun()
        
    if c3.button("Next", type="primary", use_container_width=True):
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
        color = "success-msg" if "Giỏi" in st.session_state.ms_feedback else "error-msg"
        st.markdown(f'<div class="{color}">{st.session_state.ms_feedback}</div>', unsafe_allow_html=True)

    col1, col2, col3 = st.columns(3)
    if col1.button("Check", key="ms_chk"):
        if normalize(user_inp) == normalize(card['term']):
            st.session_state.ms_feedback = "Phương Thảo giỏi quá à"
            st.balloons()
        else:
            st.session_state.ms_feedback = "Thiếu dame ời bà!"
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
        st.info(f"Gợi ý: {card['example']}")

    if st.session_state.ty_feedback:
        color = "success-msg" if "Chuẩn" in st.session_state.ty_feedback else "error-msg"
        st.markdown(f'<div class="{color}">{st.session_state.ty_feedback}</div>', unsafe_allow_html=True)
        
    t1, t2 = st.columns(2)
    if t1.button("Submit", key="ty_sub", type="primary"):
        if normalize(u_type) == normalize(card['term']):
            st.session_state.ty_feedback = "Giỏi v học chi nữa"
            st.balloons()
        else:
            st.session_state.ty_mistakes += 1
            st.session_state.ty_feedback = "Cố learn thêm nha!"
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
    
    # Key động để reset radio khi đổi thẻ
    ans = st.radio("Choose answer:", st.session_state.qz_options, format_func=lambda x: x['meaning'], key=f"qz_rad_{st.session_state.ty_key_counter}")
    
    q1, q2 = st.columns(2)
    if q1.button("Confirm", disabled=st.session_state.qz_answered):
        if ans:
            st.session_state.qz_answered = True
            if ans['term'] == card['term']:
                st.session_state.qz_feedback = "correct"
                st.balloons()
            else:
                st.session_state.qz_feedback = "wrong"
            st.rerun()
            
    if st.session_state.qz_answered:
        if st.session_state.qz_feedback == "correct": st.success("Ăn tết mà học giỏi he")
        else: st.error(f"Nope, its mean is: {card['meaning']}")
        if q2.button("Next Question ->"):
            next_card()
            st.rerun()