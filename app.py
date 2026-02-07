import streamlit as st
from supabase import create_client, Client
import random

# --- 1. SETUP & CONFIG ---
st.set_page_config(page_title="Business English App", page_icon="🎓", layout="centered")

# CSS để làm đẹp giao diện (tương tự file HTML cũ)
st.markdown("""
    <style>
    .stButton>button {
        width: 100%;
        border-radius: 20px;
        height: 50px;
        font-weight: bold;
    }
    .flashcard {
        background-color: white;
        padding: 40px;
        border-radius: 15px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        text-align: center;
        border: 2px solid #f0f2f6;
        min-height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .term { font-size: 32px; font-weight: bold; color: #4e54c8; margin-bottom: 20px;}
    .meaning { font-size: 20px; margin-bottom: 10px; color: #333;}
    .vietnamese { font-size: 24px; font-weight: bold; color: #ff6b6b; margin-bottom: 15px;}
    .example { font-size: 16px; font-style: italic; color: #666;}
    .correct { color: #28a745; font-weight: bold; font-size: 18px; }
    .wrong { color: #dc3545; font-weight: bold; font-size: 18px; }
    </style>
""", unsafe_allow_html=True)

# --- 2. SUPABASE CONNECTION ---
@st.cache_resource
def init_connection():
    url = st.secrets["SUPABASE_URL"]
    key = st.secrets["SUPABASE_KEY"]
    return create_client(url, key)

supabase = init_connection()

# --- 3. DATA LOADING ---
@st.cache_data(ttl=600) # Cache 10 phút để đỡ tốn quota
def load_vocab(unit_filter=None):
    query = supabase.table("vocabulary").select("*")
    if unit_filter and unit_filter != "All":
        query = query.eq("unit", unit_filter)
    response = query.execute()
    return response.data

# --- 4. SESSION STATE MANAGEMENT ---
if 'vocab_list' not in st.session_state:
    st.session_state.vocab_list = []
if 'current_card' not in st.session_state:
    st.session_state.current_card = None
if 'flip_state' not in st.session_state:
    st.session_state.flip_state = False
if 'quiz_options' not in st.session_state:
    st.session_state.quiz_options = []

# --- 5. SIDEBAR ---
with st.sidebar:
    st.title("⚙️ Settings")
    selected_unit = st.selectbox("Select Unit:", ["All", "Unit 2", "Unit 3"])
    if st.button("Reload Data"):
        st.cache_data.clear()
        st.experimental_rerun()

# Load data based on selection
data = load_vocab(selected_unit)
if not st.session_state.vocab_list or len(st.session_state.vocab_list) != len(data):
    st.session_state.vocab_list = data
    random.shuffle(st.session_state.vocab_list)

# --- 6. HELPER FUNCTIONS ---
def get_random_card():
    if not st.session_state.vocab_list:
        return None
    return random.choice(st.session_state.vocab_list)

def next_card():
    st.session_state.current_card = get_random_card()
    st.session_state.flip_state = False
    # Reset Quiz State
    if st.session_state.current_card:
        correct = st.session_state.current_card
        wrongs = random.sample([v for v in st.session_state.vocab_list if v['id'] != correct['id']], 3)
        options = [correct] + wrongs
        random.shuffle(options)
        st.session_state.quiz_options = options

# Init first card
if st.session_state.current_card is None and st.session_state.vocab_list:
    next_card()

current = st.session_state.current_card

# --- 7. MAIN UI ---
st.title("📚 Business English Master")

if not current:
    st.error("No data found! Check Database connection.")
    st.stop()

tab1, tab2, tab3 = st.tabs(["🎴 Flashcard", "✍️ Typing", "❓ Quiz"])

# === TAB 1: FLASHCARD ===
with tab1:
    col1, col2, col3 = st.columns([1, 6, 1])
    with col2:
        # Card Container
        with st.container():
            if not st.session_state.flip_state:
                # FRONT
                st.markdown(f"""
                <div class="flashcard">
                    <div style="color: #aaa; text-transform: uppercase; font-size: 12px; margin-bottom: 10px;">TERM</div>
                    <div class="term">{current['term']}</div>
                    <div style="margin-top: 30px; font-size: 12px; color: #999;">(Tap 'Flip' to see meaning)</div>
                </div>
                """, unsafe_allow_html=True)
            else:
                # BACK
                st.markdown(f"""
                <div class="flashcard">
                    <div style="color: #aaa; text-transform: uppercase; font-size: 12px;">DEFINITION</div>
                    <div class="meaning">{current['meaning']}</div>
                    <div class="vietnamese">{current['vietnamese']}</div>
                    <div style="color: #aaa; text-transform: uppercase; font-size: 12px; margin-top: 15px;">EXAMPLE</div>
                    <div class="example">"{current['example']}"</div>
                </div>
                """, unsafe_allow_html=True)

        # Buttons
        b_col1, b_col2 = st.columns(2)
        with b_col1:
            if st.button("🔄 Flip Card", use_container_width=True):
                st.session_state.flip_state = not st.session_state.flip_state
                st.rerun()
        with b_col2:
            if st.button("⏭️ Next Random", type="primary", use_container_width=True):
                next_card()
                st.rerun()

# === TAB 2: TYPING ===
with tab2:
    st.subheader("Type the correct term")
    st.write(f"**Meaning:** {current['meaning']}")
    st.write(f"**Vietnamese:** {current['vietnamese']}")
    
    user_input = st.text_input("Enter term:", key="typing_input")
    
    if st.button("Check Answer"):
        if user_input.strip().lower() == current['term'].lower():
            st.markdown('<p class="correct">✅ CORRECT! Excellent!</p>', unsafe_allow_html=True)
            st.balloons()
        else:
            st.markdown(f'<p class="wrong">❌ Incorrect. The answer is: <b>{current["term"]}</b></p>', unsafe_allow_html=True)

    if st.button("Skip / Next Word"):
        next_card()
        st.rerun()

# === TAB 3: QUIZ ===
with tab3:
    st.subheader(f"What is the meaning of '{current['term']}'?")
    
    # Radio needs a unique key based on the current card ID to reset properly
    choice = st.radio(
        "Select the correct definition:", 
        options=[o['meaning'] for o in st.session_state.quiz_options],
        key=f"quiz_{current['id']}" 
    )
    
    if st.button("Submit Answer"):
        if choice == current['meaning']:
            st.success("🎉 Correct! You nailed it!")
            st.markdown(f"**Vietnamese:** {current['vietnamese']}")
        else:
            st.error("💥 Wrong answer!")
            st.info(f"Correct meaning: {current['meaning']}")
            
    if st.button("Next Question"):
        next_card()
        st.rerun()