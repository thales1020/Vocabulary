from hf_quiz import HF
from pool_new import QS as POOL

META = {
    'key': 'L01',
    'title': 'Đề luyện 01',
    'desc': '44 câu có sẵn từ quiz Hugging Face LLM Course (đã dịch) và 56 câu soạn mới theo CS231n, deeplearning.ai, d2l.ai, PyTorch, scikit-learn và syllabus IOAI.',
}

# Indices into pool_new.QS. A pool question may be used by one exam only.
POOL_IDX = [
    0, 1, 2, 4, 6, 8, 9, 10, 11, 13, 15, 16, 19,          # huấn luyện, tối ưu
    20, 21, 23, 24, 25, 26,                                # cấu trúc dự án ML
    28, 29, 30, 31, 32, 33, 36, 37, 38, 41, 43, 44, 47,    # CNN, transfer learning
    48, 49, 53, 54, 55, 56, 57, 58, 60, 61, 62, 63, 65, 66, 68, 69,  # học máy cổ điển
    90, 91, 92, 94,                                        # thị giác máy tính
    95, 96, 98, 99,                                        # mô hình sinh, tự giám sát
]

QS = HF + [POOL[i] for i in POOL_IDX]
