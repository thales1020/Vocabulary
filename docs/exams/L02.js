// Đề luyện 02 – sinh bởi tools/build_exams.py, không sửa tay.
window.EXAMS = window.EXAMS || {};
window.EXAMS["L02"] = {
 "title": "Đề luyện 02",
 "desc": "Ghép 4 đề có sẵn: IOAI Philippines 2026 chung kết (30 câu) và bán kết (20 câu), bộ Test03 (20 câu), Olympic AI Hungary 2026 vòng 1 (30 câu chọn nhiều đáp án). Đã dịch sang tiếng Việt, giữ thứ tự câu; phương án của câu một đáp án được xáo lại vì đề gốc dồn phần lớn đáp án vào B.",
 "questions": [
  {
   "id": 1,
   "q": "[Ánh xạ đặc trưng] Tập dữ liệu 2 chiều không tách được bằng một đường thẳng: lớp 0 gồm các điểm nằm trong đường tròn bán kính 2 tâm (0, 0), lớp 1 gồm các điểm nằm ngoài đường tròn đó. Phép biến đổi đặc trưng ϕ(x<sub>1</sub>, x<sub>2</sub>) nào làm tập dữ liệu <b>tách được tuyến tính</b>?",
   "options": [
    "ϕ = [x<sub>1</sub>², x<sub>2</sub>²]",
    "ϕ = [sin(x<sub>1</sub>), cos(x<sub>2</sub>)]",
    "ϕ = [x<sub>1</sub>, x<sub>2</sub>, x<sub>1</sub> + x<sub>2</sub>]",
    "ϕ = [x<sub>1</sub>, x<sub>2</sub>, x<sub>1</sub>x<sub>2</sub>]"
   ],
   "answer": 0,
   "explain": "Biên giữa hai lớp là đường tròn x<sub>1</sub>² + x<sub>2</sub>² = 4. Với đặc trưng z<sub>1</sub> = x<sub>1</sub>², z<sub>2</sub> = x<sub>2</sub>², biên trở thành đường thẳng z<sub>1</sub> + z<sub>2</sub> = 4, nên hai lớp tách được tuyến tính. Thêm x<sub>1</sub> + x<sub>2</sub> hay x<sub>1</sub>x<sub>2</sub> không tạo ra được bình phương khoảng cách tới tâm.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 1, câu 1"
  },
  {
   "id": 2,
   "q": "[Tối ưu] Khi huấn luyện, bạn tới một điểm có gradient đúng bằng 0 (∇L = 0). Ma trận Hessian (đạo hàm bậc hai) tại đó có trị riêng λ<sub>1</sub> = 5 và λ<sub>2</sub> = −3. Về mặt hình học, đây là điểm gì?",
   "options": [
    "Cực tiểu địa phương",
    "Cực tiểu toàn cục",
    "Cực đại địa phương",
    "Điểm yên ngựa (saddle point)"
   ],
   "answer": 3,
   "explain": "Trị riêng dương nghĩa là hàm cong lên theo hướng đó, trị riêng âm nghĩa là cong xuống. Một dương một âm thì điểm vừa là cực tiểu theo một hướng vừa là cực đại theo hướng kia, tức điểm yên ngựa. Cực tiểu cần mọi trị riêng dương, cực đại cần mọi trị riêng âm.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 1, câu 2"
  },
  {
   "id": 3,
   "q": "[Hình học của chính quy hóa] Vì sao chính quy hóa L1 (Lasso) thường cho nghiệm thưa (nhiều trọng số đúng bằng 0), còn L2 (Ridge) thì không?",
   "options": [
    "L1 tạo mặt mất mát lồi, còn L2 thì không lồi",
    "Đạo hàm của L1 không xác định tại 0, buộc bộ tối ưu dừng ở đó",
    "Quả cầu đơn vị của L1 có hình \"kim cương\", chạm các đường đồng mức của hàm mất mát tại các trục",
    "L1 thêm nhiễu vào gradient nên loại bỏ các trọng số nhỏ"
   ],
   "answer": 2,
   "explain": "Nghiệm có ràng buộc là điểm đầu tiên đường đồng mức của hàm mất mát chạm vào miền ràng buộc. Miền L1 (|w<sub>1</sub>| + |w<sub>2</sub>| ≤ t) có các đỉnh nằm trên trục, nên điểm chạm thường là đỉnh, nơi một số trọng số bằng 0. Miền L2 là hình tròn trơn nên điểm chạm hầu như không nằm đúng trên trục. Cả L1 và L2 đều lồi.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 1, câu 3"
  },
  {
   "id": 4,
   "q": "[Thống kê] Bạn dùng ước lượng hợp lý cực đại (MLE) để ước lượng phương sai σ² của phân phối Gauss bằng công thức σ̂² = <span class=\"frac\"><span>1</span><span>N</span></span> Σ(x<sub>i</sub> − μ)². Ước lượng này có <b>không chệch</b> (unbiased) không?",
   "options": [
    "Không, nó ước lượng cao phương sai (bị chệch)",
    "Tùy thuộc vào giá trị trung bình",
    "Có, nó hội tụ về phương sai thật",
    "Không, nó ước lượng thấp phương sai (bị chệch)"
   ],
   "answer": 3,
   "explain": "Trong MLE, μ được thay bằng trung bình mẫu x̄. Khi đó kỳ vọng của ước lượng là <span class=\"frac\"><span>N − 1</span><span>N</span></span>σ² &lt; σ², tức ước lượng thấp. Đó là lý do phương sai mẫu không chệch chia cho N − 1 (hiệu chỉnh Bessel). Ước lượng vẫn hội tụ về σ² khi N → ∞ (nhất quán) nhưng vẫn bị chệch với mọi N hữu hạn.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 1, câu 4"
  },
  {
   "id": 5,
   "q": "[SVM] Dữ liệu 1 chiều có support vector dương tại x = 6 và support vector âm tại x = 2. Huấn luyện SVM lề cứng (hard-margin) thì biên quyết định nằm ở đâu và độ rộng lề là bao nhiêu?",
   "options": [
    "Biên: 4, lề: 2",
    "Biên: 5, lề: 1",
    "Biên: 4, lề: 4",
    "Biên: 3, lề: 1"
   ],
   "answer": 2,
   "explain": "Biên quyết định nằm chính giữa hai support vector: (2 + 6)/2 = 4. Lề của SVM là khoảng cách giữa hai siêu phẳng đi qua các support vector, bằng 2/‖w‖ = 6 − 2 = 4. <i>Lưu ý:</i> nếu hiểu \"lề\" là khoảng cách từ biên tới điểm gần nhất thì giá trị là 2. Đề gốc không ghi đáp án; mình chọn theo định nghĩa 2/‖w‖ thường dùng trong SVM.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 1, câu 5"
  },
  {
   "id": 6,
   "q": "[PCA] Bạn chạy PCA trên tập dữ liệu X kích thước (100, 2). Ma trận hiệp phương sai Σ có trị riêng λ<sub>1</sub> = 50 và λ<sub>2</sub> = 0.001. Điều này cho biết gì về dữ liệu?",
   "options": [
    "Dữ liệu gần như nằm trên một đường thẳng, có thể nén xuống 1 chiều mà hầu như không mất thông tin",
    "Dữ liệu có 100 chiều nhưng được chiếu xuống 2 chiều",
    "Dữ liệu phân bố đều trong một hình tròn",
    "Đặc trưng x<sub>1</sub> quan trọng gấp 500 lần x<sub>2</sub>"
   ],
   "answer": 0,
   "explain": "Trị riêng là phương sai theo các thành phần chính. Thành phần đầu giữ 50/(50 + 0.001) ≈ 99.998% phương sai, thành phần thứ hai gần như bằng 0, nên các điểm nằm sát một đường thẳng. Thành phần chính là tổ hợp của x<sub>1</sub> và x<sub>2</sub>, nên không thể nói x<sub>1</sub> quan trọng hơn x<sub>2</sub>.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 1, câu 6"
  },
  {
   "id": 7,
   "q": "[Gradient descent] Hàm mất mát L(w) = w². Trọng số hiện tại w = 3, learning rate = 0.1. Sau một bước gradient descent, w bằng bao nhiêu?",
   "options": [
    "2.4",
    "2.7",
    "0.6",
    "3.6"
   ],
   "answer": 0,
   "explain": "dL/dw = 2w = 6. w ← w − η·dL/dw = 3 − 0.1 × 6 = 2.4.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 1, câu 7"
  },
  {
   "id": 8,
   "q": "[Naive Bayes] Giả định toán học cụ thể nào làm Naive Bayes trở nên \"ngây thơ\" (naive)?",
   "options": [
    "Giả định xác suất tiên nghiệm của các lớp là đều nhau",
    "Giả định các lớp tách được tuyến tính",
    "Giả định dữ liệu có phân phối Gauss",
    "Giả định mọi đặc trưng độc lập có điều kiện với nhau khi biết nhãn lớp"
   ],
   "answer": 3,
   "explain": "Nhờ giả định độc lập có điều kiện, P(x<sub>1</sub>, …, x<sub>n</sub> | y) = Π P(x<sub>i</sub> | y). Phân phối Gauss chỉ là giả định của biến thể Gaussian Naive Bayes, không phải điều làm nó \"ngây thơ\".",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 1, câu 8"
  },
  {
   "id": 9,
   "q": "[K-Means] Bạn chạy K-Means với K = 3. Đại lượng nào chắc chắn giảm (hoặc giữ nguyên) sau mỗi vòng lặp?",
   "options": [
    "Silhouette score",
    "Khoảng cách giữa các tâm cụm",
    "Tổng bình phương khoảng cách trong cụm (inertia)",
    "Độ chính xác so với nhãn thật"
   ],
   "answer": 2,
   "explain": "Mỗi vòng lặp gồm hai bước: gán điểm vào tâm gần nhất, rồi đặt tâm bằng trung bình của cụm. Cả hai bước đều không làm tăng inertia, nên inertia giảm đơn điệu và thuật toán hội tụ. Silhouette hay khoảng cách giữa các tâm không có bảo đảm này.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 1, câu 9"
  },
  {
   "id": 10,
   "q": "[Cây quyết định] Bạn tách một nút gồm 10 mẫu dương và 10 mẫu âm. Phép tách nào cho information gain cao nhất?",
   "options": [
    "Trái: [6 dương, 4 âm], phải: [4 dương, 6 âm]",
    "Trái: [10 dương, 0 âm], phải: [0 dương, 10 âm]",
    "Trái: [5 dương, 5 âm], phải: [5 dương, 5 âm]",
    "Trái: [9 dương, 1 âm], phải: [1 dương, 9 âm]"
   ],
   "answer": 1,
   "explain": "Nút cha có entropy 1. Phép tách tạo hai nút con thuần khiết (entropy 0) nên information gain = 1, mức lớn nhất có thể. Phép tách 9/1 cho IG ≈ 1 − 0.469 = 0.531; phép tách 6/4 cho IG ≈ 0.029; phép tách 5/5 cho IG = 0.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 1, câu 10"
  },
  {
   "id": 11,
   "q": "[Phá vỡ đối xứng] Bạn khởi tạo mạng nơ-ron 2 lớp với mọi trọng số = 0 và mọi bias = 0, dùng hàm kích hoạt ReLU, rồi chạy một lượt forward và một lượt backward. Điều gì xảy ra với các trọng số?",
   "options": [
    "Chúng giữ nguyên đúng bằng 0 (mạng \"chết\")",
    "Chúng được cập nhật, nhưng mọi nơ-ron trong lớp học cùng một đặc trưng",
    "Chúng được cập nhật bình thường",
    "Bias được cập nhật nhưng trọng số thì không"
   ],
   "answer": 0,
   "explain": "Lớp ẩn cho z = 0 nên h = ReLU(0) = 0. Gradient của trọng số lớp ra là δ·h = 0. Gradient truyền về lớp ẩn phải nhân với trọng số lớp ra (đều bằng 0) và ReLU′(0) = 0, nên gradient của trọng số lớp ẩn cũng bằng 0. Chỉ bias của lớp ra có thể thay đổi, và vì h luôn bằng 0 nên các trọng số giữ nguyên 0 mãi. Phương án \"mọi nơ-ron học cùng một đặc trưng\" đúng khi khởi tạo bằng một hằng số khác 0. Đề gốc không ghi đáp án.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 2, câu 11"
  },
  {
   "id": 12,
   "q": "[Tính toán CNN] Đầu vào là ảnh 32 × 32 × 3. Lớp tích chập có 10 bộ lọc 5 × 5, stride 1, padding 0. Kích thước khối đầu ra là bao nhiêu?",
   "options": [
    "14 × 14 × 10",
    "28 × 28 × 10",
    "32 × 32 × 10",
    "28 × 28 × 3"
   ],
   "answer": 1,
   "explain": "(32 − 5)/1 + 1 = 28. Số kênh ra bằng số bộ lọc, 10. Kết quả: 28 × 28 × 10.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 2, câu 12"
  },
  {
   "id": 13,
   "q": "[Tham số] Bản đồ đặc trưng có kích thước 64 × 64 × 256. Bạn áp tích chập 1 × 1 với 64 bộ lọc. Lớp này có bao nhiêu tham số (không tính bias)?",
   "options": [
    "256 × 64",
    "1 × 1 × 64",
    "64 × 64 × 64",
    "1 × 1 × 256 × 64"
   ],
   "answer": 3,
   "explain": "Mỗi bộ lọc 1 × 1 phủ toàn bộ 256 kênh vào nên có 1 × 1 × 256 trọng số. Với 64 bộ lọc: 1 × 1 × 256 × 64 = 16 384. Phương án 256 × 64 có cùng giá trị, nhưng 1 × 1 × 256 × 64 thể hiện đúng cấu trúc kernel (k × k × C<sub>in</sub> × C<sub>out</sub>) mà đề muốn hỏi. Kích thước không gian 64 × 64 không ảnh hưởng số tham số.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 2, câu 13"
  },
  {
   "id": 14,
   "q": "[Vùng tiếp nhận] Xếp chồng hai lớp tích chập 3 × 3 (stride 1). Vùng tiếp nhận hiệu dụng (receptive field) của một điểm ở đầu ra cuối, tính trên ảnh đầu vào, là bao nhiêu?",
   "options": [
    "3 × 3",
    "5 × 5",
    "6 × 6",
    "7 × 7"
   ],
   "answer": 1,
   "explain": "Mỗi lớp 3 × 3 với stride 1 mở rộng vùng tiếp nhận thêm 2: 3 → 3 + 2 = 5. Vậy hai lớp cho 5 × 5, ba lớp cho 7 × 7. <i>Lưu ý:</i> trong file gốc phương án D bị lỗi hiển thị (chỉ còn dấu \"×\"); mình điền là 7 × 7.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 2, câu 14"
  },
  {
   "id": 15,
   "q": "[Lan truyền ngược] Vì sao các nhà nghiên cứu chuyển từ hàm kích hoạt Sigmoid sang ReLU cho mạng sâu?",
   "options": [
    "Sigmoid không đối xứng quanh 0",
    "ReLU khả vi ở mọi điểm",
    "Đạo hàm của Sigmoid luôn ≤ 0.25, khiến gradient biến mất khi nhân qua nhiều lớp",
    "ReLU ngăn được hiện tượng gradient bùng nổ"
   ],
   "answer": 2,
   "explain": "σ′(x) = σ(x)(1 − σ(x)) ≤ 0.25. Qua 10 lớp, gradient có thể nhỏ đi tới 0.25<sup>10</sup> ≈ 10<sup>−6</sup> lần. ReLU có đạo hàm bằng 1 ở miền dương nên gradient không bị co lại. ReLU không khả vi tại 0 và không ngăn được gradient bùng nổ. Sigmoid không đối xứng quanh 0 là một nhược điểm có thật, nhưng không phải lý do chính.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 2, câu 15"
  },
  {
   "id": 16,
   "q": "[Batch Normalization] Batch Normalization hoạt động khác thế nào khi suy luận (test) so với khi huấn luyện?",
   "options": [
    "Dùng trung bình và phương sai của batch test hiện tại",
    "Dùng \"running mean\" và \"running variance\" cố định đã tích lũy trong lúc huấn luyện",
    "Chuẩn hóa theo trung bình của từng mẫu (Instance Norm)",
    "Tắt hoàn toàn"
   ],
   "answer": 1,
   "explain": "Khi huấn luyện, BatchNorm dùng thống kê của mini-batch và cập nhật trung bình trượt. Khi suy luận, nó dùng các trung bình trượt cố định để đầu ra của một mẫu không phụ thuộc các mẫu khác trong batch. Lớp này vẫn hoạt động (vẫn chuẩn hóa và áp γ, β).",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 2, câu 16"
  },
  {
   "id": 17,
   "q": "[Kiến trúc] Về mặt toán học, khối ResNet y = F(x) + x cho phép gradient làm gì trong lan truyền ngược?",
   "options": [
    "Buộc gradient phải đi qua F(x)",
    "Đóng vai trò chính quy hóa, buộc trọng số nhỏ",
    "Cho gradient đi vòng qua F(x) và chảy thẳng về lớp trước",
    "Bình phương gradient để nó không biến mất"
   ],
   "answer": 2,
   "explain": "∂y/∂x = ∂F/∂x + I. Số hạng đơn vị I tạo một \"đường cao tốc\" để gradient chảy thẳng về các lớp trước mà không bị co lại qua F, nhờ đó huấn luyện được mạng rất sâu.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 2, câu 17"
  },
  {
   "id": 18,
   "q": "[Độ phức tạp] Nếu tăng gấp đôi độ dài chuỗi đầu vào của Transformer từ N = 512 lên N = 1024, bộ nhớ cho ma trận attention thay đổi thế nào?",
   "options": [
    "Không đổi",
    "Tăng gấp đôi (2 lần)",
    "Tăng thêm N",
    "Tăng gấp bốn (4 lần)"
   ],
   "answer": 3,
   "explain": "Ma trận attention có kích thước N × N. Nhân đôi N làm số phần tử tăng 2² = 4 lần. Đây là lý do self-attention chuẩn có độ phức tạp bậc hai theo độ dài chuỗi.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 2, câu 18"
  },
  {
   "id": 19,
   "q": "[Chính quy hóa] Bạn huấn luyện với dropout p = 0.5. Nếu đầu ra của một nơ-ron khi huấn luyện là x, khi suy luận cần làm gì với trọng số để giữ nguyên độ lớn kỳ vọng? (Giả sử cài đặt chuẩn.)",
   "options": [
    "Không làm gì",
    "Nhân trọng số với 2",
    "Nhân trọng số với 0.5",
    "Đặt trọng số bằng 0"
   ],
   "answer": 0,
   "explain": "Cài đặt chuẩn hiện nay (PyTorch, TensorFlow) là inverted dropout: khi huấn luyện, các nơ-ron được giữ lại được chia cho (1 − p), nên khi suy luận không cần chỉnh gì. Với dropout \"kiểu gốc\" không chia khi huấn luyện, ta mới phải nhân trọng số với 0.5 khi suy luận. Đề gốc không ghi đáp án; mình chọn theo cách cài đặt phổ biến.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 2, câu 19"
  },
  {
   "id": 20,
   "q": "[Pooling] Max pooling mang lại tính chất cụ thể nào cho CNN?",
   "options": [
    "Bất biến với phép xoay",
    "Bất biến với tỉ lệ",
    "Bất biến với phép tịnh tiến nhỏ",
    "Bất biến với màu sắc"
   ],
   "answer": 2,
   "explain": "Giá trị lớn nhất của một cửa sổ không đổi khi đặc trưng dịch chuyển một chút bên trong cửa sổ, nên max pooling cho bất biến cục bộ với phép tịnh tiến nhỏ. Nó không đem lại bất biến với phép xoay hay thay đổi tỉ lệ.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 2, câu 20"
  },
  {
   "id": 21,
   "q": "[Toán lấy mẫu] Một LLM cho logits = [1.0, 3.0] cho hai token (\"Cat\", \"Dog\"). Bạn áp dụng lấy mẫu với temperature T = 0.5. Phân phối xác suất sau softmax thay đổi thế nào?",
   "options": [
    "Thứ tự đảo ngược, \"Cat\" thành token có khả năng cao nhất",
    "Xác suất của \"Dog\" giảm",
    "Các xác suất gần đều hơn (50/50)",
    "Xác suất của \"Dog\" (logit lớn hơn) tăng mạnh, mô hình tự tin hơn"
   ],
   "answer": 3,
   "explain": "Chia logits cho T = 0.5 được [2, 6]. Không có temperature: P(Dog) = 1/(1 + e<sup>−2</sup>) ≈ 0.881. Với T = 0.5: P(Dog) = 1/(1 + e<sup>−4</sup>) ≈ 0.982. T &lt; 1 làm phân phối nhọn hơn; thứ tự các token không đổi.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 3, câu 21"
  },
  {
   "id": 22,
   "q": "[Cơ chế Transformer] Vì sao Transformer phải cộng \"positional encoding\" vào embedding đầu vào?",
   "options": [
    "Vì embedding quá nhỏ để biểu diễn nghĩa",
    "Vì self-attention bất biến với hoán vị: không có positional encoding, \"The dog bit the man\" và \"The man bit the dog\" được xử lý như nhau",
    "Để mô hình không overfit theo độ dài câu cụ thể",
    "Vì gradient sẽ biến mất nếu thiếu nó"
   ],
   "answer": 1,
   "explain": "Self-attention tính trên tập token như một tập hợp không có thứ tự. Positional encoding (sin/cos hoặc học được) gắn thông tin vị trí vào từng token để mô hình phân biệt được thứ tự từ.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 3, câu 22"
  },
  {
   "id": 23,
   "q": "[Huấn luyện LLM] Pretraining LLM trên bộ \"Pile\" dạy nó dự đoán token tiếp theo. Giai đoạn huấn luyện cụ thể nào dạy nó làm theo yêu cầu của người dùng như \"Tóm tắt văn bản này\"?",
   "options": [
    "Fine-tune có giám sát (SFT) / instruction tuning",
    "Học tương phản (contrastive learning)",
    "Học tăng cường từ phản hồi của con người (RLHF)",
    "Masked language modeling"
   ],
   "answer": 0,
   "explain": "SFT huấn luyện mô hình trên các cặp (chỉ dẫn, câu trả lời mẫu) nên mô hình học làm theo chỉ dẫn. RLHF thường đến sau SFT, nhằm tinh chỉnh câu trả lời theo sở thích của con người.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 3, câu 23"
  },
  {
   "id": 24,
   "q": "[RLHF] Trong RLHF, nếu tối ưu LLM theo một reward model đã học quá nhiều bước mà không có chính quy hóa, LLM bắt đầu sinh nội dung vô nghĩa nhưng được chấm điểm cao. Đây là ví dụ của hiện tượng gì?",
   "options": [
    "Định luật Goodhart (reward hacking)",
    "Gradient biến mất",
    "Mode collapse",
    "Quên thảm họa (catastrophic forgetting)"
   ],
   "answer": 0,
   "explain": "Định luật Goodhart: khi một thước đo trở thành mục tiêu, nó không còn là thước đo tốt. Reward model chỉ xấp xỉ sở thích của con người, và LLM khai thác các lỗ hổng của nó. Vì vậy RLHF thường thêm phạt KL để giữ mô hình gần mô hình ban đầu.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 3, câu 24"
  },
  {
   "id": 25,
   "q": "[Tấn công đối kháng] Tấn công \"hộp trắng\" (white box) như FGSM khiến bộ phân loại ảnh nhận nhầm gấu trúc thành vượn. Nhiễu được tạo ra thế nào?",
   "options": [
    "Đổi ngẫu nhiên các pixel cho tới khi lớp dự đoán thay đổi",
    "Tính gradient của hàm mất mát theo <b>ảnh đầu vào</b> rồi bước theo chiều tăng của gradient (tối đa hóa mất mát)",
    "Đảo ngược lớp softmax",
    "Tính gradient của hàm mất mát theo trọng số rồi bước theo chiều giảm"
   ],
   "answer": 1,
   "explain": "FGSM: x′ = x + ε·sign(∇<sub>x</sub>L(θ, x, y)). Trọng số giữ nguyên; ta thay đổi ảnh một lượng rất nhỏ theo hướng làm mất mát tăng nhanh nhất. \"Hộp trắng\" nghĩa là kẻ tấn công biết mô hình nên tính được gradient.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 3, câu 25"
  },
  {
   "id": 26,
   "q": "[Mô hình khuếch tán] Trong DDPM, giới hạn của quá trình thuận q(x<sub>t</sub> | x<sub>0</sub>) khi t → ∞ là gì?",
   "options": [
    "Ảnh trở thành toàn 0 (màu đen)",
    "Ảnh trở thành bản tái tạo hoàn hảo của đầu vào",
    "Ảnh trở thành một vector ẩn có số chiều nhỏ",
    "Ảnh trở thành nhiễu Gauss đẳng hướng thuần, phân phối N(0, I)"
   ],
   "answer": 3,
   "explain": "Mỗi bước thuận co tín hiệu lại theo hệ số √(1 − β<sub>t</sub>) và thêm nhiễu Gauss. Sau rất nhiều bước, thông tin về x<sub>0</sub> biến mất và phân phối hội tụ về N(0, I). Quá trình ngược học cách khử nhiễu từ đó để sinh ảnh.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 3, câu 26"
  },
  {
   "id": 27,
   "q": "[Tokenization] Thuật toán BPE quyết định gộp các ký tự nào thành một token (ví dụ gộp \"t\" và \"h\" thành \"th\") như thế nào?",
   "options": [
    "Gộp ngẫu nhiên để tăng đa dạng",
    "Dùng một mạng nơ-ron pretrained để tìm ý nghĩa",
    "Gộp cặp token xuất hiện nhiều nhất trong corpus",
    "Gộp theo quy tắc ngữ pháp tiếng Anh"
   ],
   "answer": 2,
   "explain": "BPE bắt đầu từ ký tự, lặp lại việc đếm các cặp token liền kề và gộp cặp phổ biến nhất thành token mới, cho tới khi đủ kích thước từ vựng.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 3, câu 27"
  },
  {
   "id": 28,
   "q": "[RAG] Bạn xây hệ thống RAG. Bộ truy xuất (retriever) tìm được các tài liệu liên quan. Bộ sinh (LLM) làm gì với chúng?",
   "options": [
    "Đưa tài liệu vào ngữ cảnh (trong prompt) rồi trả lời câu hỏi của người dùng",
    "Huấn luyện lại trọng số trên các tài liệu đó một epoch",
    "Nén tài liệu vào cơ sở dữ liệu vector",
    "Tính cosine similarity giữa tài liệu và trọng số"
   ],
   "answer": 0,
   "explain": "RAG không thay đổi trọng số. Tài liệu truy xuất được ghép vào prompt để LLM trả lời dựa trên đó. Việc tính độ tương đồng và lưu vector là phần của bộ truy xuất.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 3, câu 28"
  },
  {
   "id": 29,
   "q": "[Công bằng] Chỉ số A: mô hình duyệt khoản vay cho 50% nam và 50% nữ. Chỉ số B: mô hình duyệt cho 80% nam <b>đủ điều kiện</b> và 80% nữ <b>đủ điều kiện</b>. Chỉ số nào ứng với Equalized Odds?",
   "options": [
    "Chỉ số A",
    "Chỉ số B",
    "Cả hai",
    "Không chỉ số nào"
   ],
   "answer": 1,
   "explain": "Chỉ số A là demographic parity: tỉ lệ được duyệt bằng nhau, không quan tâm ai đủ điều kiện. Equalized Odds yêu cầu tỉ lệ dương tính thật (và cả tỉ lệ dương tính giả) bằng nhau giữa các nhóm khi xét theo nhãn thật. Chỉ số B so sánh tỉ lệ dương tính thật nên gần nhất với Equalized Odds. Nói chặt hơn, chỉ bằng TPR là \"equal opportunity\", Equalized Odds cần thêm FPR bằng nhau.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 3, câu 29"
  },
  {
   "id": 30,
   "q": "[RNN và Transformer] Vì sao Transformer huấn luyện nhanh hơn nhiều so với RNN/LSTM trên dữ liệu lớn?",
   "options": [
    "RNN không chạy được trên GPU",
    "Transformer có ít tham số hơn",
    "RNN phải xử lý tuần tự (bước t phụ thuộc bước t − 1), còn Transformer xử lý cả chuỗi song song",
    "Transformer không dùng lan truyền ngược"
   ],
   "answer": 2,
   "explain": "Trạng thái ẩn h<sub>t</sub> của RNN cần h<sub>t−1</sub>, nên các bước thời gian không tính song song được. Self-attention tính mọi vị trí cùng lúc bằng phép nhân ma trận, tận dụng tốt GPU.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Finals, Theory & Technical Concepts (Test01) · Phần 3, câu 30"
  },
  {
   "id": 31,
   "q": "[Xử lý dữ liệu, nhiễu cảm biến] Cột relative_humidity_2m của một tập dữ liệu thời tiết có vài giá trị 999%. Theo thực hành xử lý dữ liệu chuẩn cho mô hình chuỗi, bước đầu tiên phù hợp nhất là gì?",
   "options": [
    "Thay bằng trung bình của cả cột",
    "Cắt giá trị về tối đa 100% hoặc thay bằng NaN để điền khuyết sau",
    "Bỏ cả cột độ ẩm để tránh thiên lệch",
    "Giữ nguyên để mô hình học lỗi cảm biến"
   ],
   "answer": 1,
   "explain": "Độ ẩm tương đối không thể vượt 100%, nên 999% là giá trị lỗi (mã thiếu dữ liệu hoặc lỗi cảm biến). Đánh dấu là thiếu rồi điền khuyết (ví dụ nội suy theo thời gian) giữ được cột. Điền ngay bằng trung bình cả cột thì trung bình đã bị 999 kéo lệch.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 1, câu 3"
  },
  {
   "id": 32,
   "q": "[Kỹ thuật đặc trưng, thời gian tuần hoàn] Khi mô hình hóa lượng mưa theo mùa, vì sao biểu diễn \"ngày trong năm\" bằng hai đặc trưng sin_year và cos_year tốt hơn về mặt toán học so với một số nguyên 1–365?",
   "options": [
    "Giảm dung lượng bộ nhớ của tập dữ liệu",
    "Cho phép mô hình bỏ qua năm nhuận",
    "Là bước bắt buộc với mô hình Gradient Boosting",
    "Tránh việc mô hình coi 31/12 và 1/1 là hai giá trị cách xa nhau"
   ],
   "answer": 3,
   "explain": "Với số nguyên, ngày 365 và ngày 1 cách nhau 364 đơn vị dù chỉ cách một ngày. Ánh xạ lên đường tròn (sin(2πd/365), cos(2πd/365)) làm hai ngày này nằm cạnh nhau. Cần cả sin và cos vì chỉ dùng sin thì hai ngày khác nhau có thể cùng giá trị.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 1, câu 4"
  },
  {
   "id": 33,
   "q": "[Kỹ thuật đặc trưng, biến đại diện] Khi không có nhãn lượng mưa tương lai, một học sinh dùng soil_moisture_0_to_7cm làm đặc trưng chính. Vì sao đây được xem là \"biến đại diện mạnh\" (strong proxy) cho lượng mưa trong mô hình thời tiết?",
   "options": [
    "Đây là biến duy nhất dùng đơn vị hệ mét",
    "Độ ẩm đất phản ứng ngay với mưa, ghi lại \"dấu vết vật lý\" của một trận mưa",
    "Độ ẩm đất là chỉ báo sớm gây ra mưa",
    "Nó ít nhiễu hơn nhiệt độ"
   ],
   "answer": 1,
   "explain": "Mưa làm lớp đất mặt (0–7 cm) ẩm lên gần như ngay lập tức, nên biến này phản ánh trực tiếp việc vừa có mưa. Nó là hệ quả của mưa chứ không phải nguyên nhân.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 1, câu 5"
  },
  {
   "id": 34,
   "q": "[Học có giám sát, chính quy hóa] Phát biểu nào mô tả đúng khác biệt giữa chính quy hóa L1 (Lasso) và L2 (Ridge)?",
   "options": [
    "L1 thường xử lý dữ liệu phương sai cao tốt hơn",
    "L2 chỉ dùng cho phân loại, không dùng cho hồi quy",
    "L1 có thể đưa hệ số về đúng 0, tức là thực hiện chọn đặc trưng",
    "L2 luôn cho mô hình đơn giản, dễ giải thích hơn"
   ],
   "answer": 2,
   "explain": "Phạt |w| của L1 có đạo hàm không đổi ở gần 0, đủ để đẩy hẳn các hệ số nhỏ về 0, nên L1 tạo mô hình thưa. L2 chỉ thu nhỏ hệ số về gần 0. Cả hai đều dùng được cho hồi quy và phân loại.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 1, câu 6"
  },
  {
   "id": 35,
   "q": "[Học không giám sát, K-Means] Khi dùng K-Means để xác định các vùng khí hậu ở Philippines, \"phương pháp khuỷu tay\" (Elbow Method) thường được dùng để làm gì?",
   "options": [
    "Tìm số cụm K tại đó mức tăng phương sai được giải thích bắt đầu chững lại",
    "Loại bỏ ngoại lệ khỏi tập huấn luyện",
    "Trực quan hóa các cụm trong không gian 2 chiều bằng t-SNE",
    "Xác định learning rate tối ưu cho các tâm cụm"
   ],
   "answer": 0,
   "explain": "Vẽ inertia (hoặc tỉ lệ phương sai được giải thích) theo K. Đường cong có \"khuỷu\" ở chỗ tăng K thêm chỉ cải thiện rất ít; K tại đó là lựa chọn hợp lý. K-Means không có learning rate.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 1, câu 7"
  },
  {
   "id": 36,
   "q": "[Lan truyền ngược] Nguyên lý toán học cơ bản cho phép tính gradient từ lớp đầu ra ngược về lớp đầu vào là gì?",
   "options": [
    "Suy luận Bayes",
    "Định lý giới hạn trung tâm",
    "Luật số lớn",
    "Quy tắc dây chuyền (chain rule) của giải tích"
   ],
   "answer": 3,
   "explain": "Mạng nơ-ron là hàm hợp của nhiều lớp. Quy tắc dây chuyền cho phép nhân các đạo hàm cục bộ từ đầu ra ngược về từng lớp; backpropagation là cách tính hiệu quả quy tắc này.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 2, câu 8"
  },
  {
   "id": 37,
   "q": "[Hàm kích hoạt] Trong MLP sâu, vì sao ReLU thường được ưu tiên hơn Sigmoid?",
   "options": [
    "ReLU tốn tính toán hơn nhưng chính xác hơn",
    "ReLU giúp giảm hiện tượng gradient biến mất ở các lớp sâu",
    "ReLU bảo đảm đầu ra luôn nằm trong [0, 1]",
    "Sigmoid chỉ dùng được ở lớp đầu ra cuối cùng"
   ],
   "answer": 1,
   "explain": "Đạo hàm ReLU bằng 1 khi đầu vào dương nên gradient không bị co lại qua nhiều lớp, còn đạo hàm sigmoid ≤ 0.25. ReLU cũng rẻ hơn để tính và không bị chặn trên.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 2, câu 9"
  },
  {
   "id": 38,
   "q": "[Chính quy hóa, dropout] Khi huấn luyện mạng nơ-ron, dropout ngăn overfitting chủ yếu bằng cơ chế nào?",
   "options": [
    "Thêm vào hàm mất mát một khoản phạt theo độ lớn trọng số",
    "Tăng số mẫu huấn luyện bằng tăng cường dữ liệu",
    "Tắt ngẫu nhiên các nơ-ron, buộc mạng học biểu diễn dư thừa",
    "Tự giảm learning rate khi validation loss chững lại"
   ],
   "answer": 2,
   "explain": "Vì một nơ-ron có thể bị tắt bất kỳ lúc nào, mạng không thể dựa vào vài nơ-ron cụ thể và phải phân tán thông tin. Dropout cũng giống huấn luyện một tập hợp nhiều mạng con. Phạt độ lớn trọng số là L1/L2.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 2, câu 10"
  },
  {
   "id": 39,
   "q": "[Cơ chế attention] Scaled dot-product attention trong Transformer dựa trên ba thành phần chính nào?",
   "options": [
    "Kernel, stride và padding",
    "Đầu vào, trạng thái ẩn và đầu ra",
    "Encoder, decoder và embedding",
    "Query, key và value"
   ],
   "answer": 3,
   "explain": "Attention(Q, K, V) = softmax(QKᵀ/√d<sub>k</sub>)·V. Query so khớp với key để tính trọng số, rồi lấy tổng có trọng số của value.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 2, câu 11"
  },
  {
   "id": 40,
   "q": "[Fine-tune mô hình] Ưu điểm chính của Parameter-Efficient Fine-Tuning (PEFT) so với fine-tune toàn bộ LLM là gì?",
   "options": [
    "Chỉ cần cập nhật một phần rất nhỏ trọng số, tiết kiệm đáng kể tính toán",
    "Cho phép mô hình vượt quá cửa sổ ngữ cảnh ban đầu",
    "Là cách duy nhất để dùng mô hình cho thị giác máy tính",
    "Không cần dữ liệu có nhãn"
   ],
   "answer": 0,
   "explain": "Các phương pháp như LoRA hay adapter đóng băng mô hình gốc và chỉ huấn luyện vài triệu tham số thêm vào, giảm mạnh bộ nhớ GPU và dung lượng lưu trữ. PEFT vẫn cần dữ liệu huấn luyện.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 2, câu 12"
  },
  {
   "id": 41,
   "q": "[CV, các lớp CNN] Mục đích chính của lớp pooling (ví dụ max pooling) trong mạng CNN là gì?",
   "options": [
    "Phát hiện các cạnh và kết cấu cụ thể trong ảnh",
    "Giảm kích thước không gian của bản đồ đặc trưng, từ đó giảm tham số và tính toán",
    "Tăng số kênh của bản đồ đặc trưng",
    "Áp hàm kích hoạt phi tuyến lên các pixel"
   ],
   "answer": 1,
   "explain": "Pooling 2 × 2, stride 2 giảm chiều cao và chiều rộng đi một nửa, nên các lớp sau ít tính toán hơn và có vùng tiếp nhận rộng hơn. Pooling không đổi số kênh và không có tham số học; phát hiện cạnh là việc của lớp tích chập.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 3, câu 13"
  },
  {
   "id": 42,
   "q": "[CV, phát hiện vật thể] Kiến trúc nào được thiết kế riêng cho phát hiện vật thể thời gian thực, một lượt chạy?",
   "options": [
    "YOLO (You Only Look Once)",
    "U-Net",
    "BERT",
    "ResNet"
   ],
   "answer": 0,
   "explain": "YOLO chia ảnh thành lưới và dự đoán hộp bao cùng lớp trong một lượt forward. ResNet là backbone phân loại, BERT là mô hình ngôn ngữ, U-Net dùng cho phân đoạn.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 3, câu 14"
  },
  {
   "id": 43,
   "q": "[CV, phân đoạn] Trong hệ thống giám sát thời tiết, kiến trúc nào phù hợp nhất để tạo mặt nạ, khoanh đúng vùng ảnh vệ tinh bị áp thấp nhiệt đới bao phủ?",
   "options": [
    "VGG-16",
    "Hồi quy logistic",
    "K-Nearest Neighbors",
    "U-Net"
   ],
   "answer": 3,
   "explain": "Khoanh vùng tới từng pixel là bài toán phân đoạn ảnh. U-Net có encoder-decoder với skip connection, cho mặt nạ đầu ra cùng kích thước ảnh. VGG-16 là mạng phân loại, chỉ cho một nhãn cho cả ảnh.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 3, câu 15"
  },
  {
   "id": 44,
   "q": "[NLP, Transformer] Trong NLP, cơ chế self-attention cho phép mô hình làm gì?",
   "options": [
    "Dịch văn bản mà không cần decoder",
    "Ghi nhớ toàn bộ từ vựng huấn luyện",
    "Xét từng từ trong chuỗi trong quan hệ với mọi từ khác để nắm bắt ngữ cảnh",
    "Tự sửa lỗi ngữ pháp trong đầu vào"
   ],
   "answer": 2,
   "explain": "Mỗi token tính trọng số chú ý tới mọi token khác, nên biểu diễn của nó chứa thông tin ngữ cảnh. Ví dụ \"bank\" gần \"river\" sẽ có biểu diễn khác \"bank\" gần \"money\".",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 3, câu 16"
  },
  {
   "id": 45,
   "q": "[NLP, BERT] Mục tiêu huấn luyện nào là thành phần cốt lõi của mô hình BERT nguyên bản?",
   "options": [
    "Dự đoán câu tiếp theo (Next Sentence Prediction, NSP)",
    "Phân cụm K-Means các vector từ",
    "Học tăng cường từ phản hồi của con người",
    "Sinh văn bản từ ảnh"
   ],
   "answer": 0,
   "explain": "BERT nguyên bản được pretrain với hai mục tiêu: masked language modeling và next sentence prediction. Các mô hình sau như RoBERTa đã bỏ NSP. Phương án MLM không có trong câu này.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 3, câu 17"
  },
  {
   "id": 46,
   "q": "[Chỉ số đánh giá] Nếu mô hình dự đoán lượng mưa theo milimét, vì sao có thể chọn MAE thay vì RMSE làm chỉ số chính?",
   "options": [
    "MAE luôn cho giá trị nhỏ hơn RMSE",
    "MAE dễ tính tay hơn",
    "MAE ít nhạy với các giá trị ngoại lai cực lớn (những trận bão lớn) hơn RMSE",
    "RMSE chỉ dùng cho bài toán phân loại"
   ],
   "answer": 2,
   "explain": "RMSE bình phương sai số trước khi lấy trung bình nên một sai số lớn bị phạt rất nặng; MAE phạt tuyến tính. Đúng là MAE ≤ RMSE luôn đúng về mặt toán học, nhưng đó không phải lý do để chọn chỉ số. RMSE dùng cho hồi quy.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 4, câu 18"
  },
  {
   "id": 47,
   "q": "[Đánh giá mô hình] Một học sinh báo cáo MAE huấn luyện là 0.02 nhưng MAE validation là 0.25. Chẩn đoán khả năng cao nhất là gì?",
   "options": [
    "Learning rate quá thấp",
    "Underfitting (mô hình quá đơn giản)",
    "Tập dữ liệu quá lớn",
    "Overfitting (mô hình đã học thuộc dữ liệu huấn luyện)"
   ],
   "answer": 3,
   "explain": "Sai số trên tập huấn luyện rất thấp mà trên validation cao hơn hơn 10 lần là dấu hiệu điển hình của overfitting. Underfitting thì sai số cao trên cả hai tập.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 4, câu 19"
  },
  {
   "id": 48,
   "q": "[Xử lý dữ liệu, chuẩn hóa thang đo] Khi các đặc trưng có thang đo rất khác nhau (áp suất theo hPa, nhiệt độ theo °C), vì sao RobustScaler thường được ưu tiên hơn StandardScaler?",
   "options": [
    "Nó tự xử lý giá trị NaN",
    "Nó dùng trung vị và khoảng tứ phân vị nên ít bị ảnh hưởng bởi các giá trị cảm biến ngoại lai",
    "Nó đưa dữ liệu về đúng khoảng 0 tới 1",
    "Nó là bộ chuẩn hóa duy nhất tương thích với XGBoost"
   ],
   "answer": 1,
   "explain": "RobustScaler tính (x − trung vị)/IQR. Trung vị và IQR gần như không đổi khi có vài giá trị cực đoan, còn trung bình và độ lệch chuẩn bị kéo lệch mạnh. Đưa về [0, 1] là việc của MinMaxScaler.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 4, câu 20"
  },
  {
   "id": 49,
   "q": "[Bộ tối ưu] Adam được dùng rộng rãi vì kết hợp ưu điểm của hai ý tưởng nào?",
   "options": [
    "Dropout và dừng sớm",
    "Momentum và learning rate thích ứng (RMSProp)",
    "Bagging và boosting",
    "Chính quy hóa L1 và L2"
   ],
   "answer": 1,
   "explain": "Adam lưu trung bình trượt của gradient (moment bậc một, như momentum) và của bình phương gradient (moment bậc hai, như RMSProp), kèm hiệu chỉnh độ lệch cho các bước đầu.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 4, câu 21"
  },
  {
   "id": 50,
   "q": "[Lập trình] Trong Python (Pandas), lệnh nào dùng để đếm số giá trị thiếu ở mỗi cột của một tập dữ liệu thời tiết?",
   "options": [
    "<code>df.isnull().sum()</code>",
    "<code>df.dropna()</code>",
    "<code>df.describe()</code>",
    "<code>df.groupby('city_name').count()</code>"
   ],
   "answer": 0,
   "explain": "isnull() trả về DataFrame True/False đánh dấu ô thiếu; sum() cộng theo từng cột vì True được tính là 1. dropna() xóa dòng thiếu chứ không đếm.",
   "source": "Câu có sẵn, đã dịch: IOAI Philippines 2026 – National Semi-Finals, Theory Assessment (Test02) · Phần 4, câu 22"
  },
  {
   "id": 51,
   "q": "Thuật toán nào sau đây là ví dụ của học không giám sát?",
   "options": [
    "Cây quyết định",
    "Hồi quy logistic",
    "Support Vector Machine",
    "Phân tích thành phần chính (PCA)"
   ],
   "answer": 3,
   "explain": "PCA chỉ dùng dữ liệu đầu vào X, không cần nhãn, để tìm các hướng có phương sai lớn nhất. SVM, hồi quy logistic và cây quyết định là các mô hình học có giám sát.",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 1"
  },
  {
   "id": 52,
   "q": "Trong các phương pháp ensemble, \"bagging\" thường được dùng để làm gì?",
   "options": [
    "Tăng khả năng diễn giải",
    "Giảm độ lệch",
    "Giảm phương sai",
    "Tối ưu hàm mất mát"
   ],
   "answer": 2,
   "explain": "Bagging huấn luyện nhiều mô hình trên các mẫu bootstrap rồi lấy trung bình. Trung bình của các mô hình ít tương quan có phương sai nhỏ hơn, còn độ lệch gần như giữ nguyên. Boosting mới là phương pháp chủ yếu giảm độ lệch.",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 2"
  },
  {
   "id": 53,
   "q": "Tính chất nào phân biệt rõ nhất một bài toán học tăng cường?",
   "options": [
    "Giả định các điểm dữ liệu độc lập với nhau",
    "Dùng các kỹ thuật phân cụm không giám sát",
    "Có dữ liệu huấn luyện được gán nhãn",
    "Học từ phần thưởng và hình phạt khi tương tác với môi trường"
   ],
   "answer": 3,
   "explain": "Trong học tăng cường, tác tử chọn hành động, nhận phần thưởng và trạng thái mới từ môi trường, rồi học chính sách tối đa hóa tổng phần thưởng. Dữ liệu có tính tuần tự và phụ thuộc vào hành động, không độc lập.",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 3"
  },
  {
   "id": 54,
   "q": "Dấu hiệu nào cho thấy mô hình đang underfitting?",
   "options": [
    "Sai số huấn luyện cao và sai số validation cao",
    "Sai số huấn luyện cao và sai số validation thấp",
    "Sai số huấn luyện thấp và sai số validation cao",
    "Sai số huấn luyện thấp và sai số validation thấp"
   ],
   "answer": 0,
   "explain": "Underfitting nghĩa là mô hình quá đơn giản, không học được ngay cả dữ liệu huấn luyện, nên cả hai sai số đều cao. Huấn luyện thấp mà validation cao là overfitting.",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 4"
  },
  {
   "id": 55,
   "q": "Trong ensemble learning, giả định cốt lõi của boosting là gì?",
   "options": [
    "Mọi mô hình trong ensemble phải độc lập với nhau",
    "Có thể kết hợp tuần tự các mô hình yếu để tạo thành một mô hình mạnh",
    "Dữ liệu phải chia thành các tập con rời nhau",
    "Boosting chỉ hiệu quả với học không giám sát"
   ],
   "answer": 1,
   "explain": "Mỗi mô hình yếu mới tập trung vào các mẫu mà các mô hình trước làm sai (AdaBoost tăng trọng số mẫu sai, Gradient Boosting khớp phần dư). Các mô hình phụ thuộc nhau chứ không độc lập.",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 5"
  },
  {
   "id": 56,
   "q": "Bộ tối ưu nào là mở rộng của stochastic gradient descent và điều chỉnh learning rate dựa trên các gradient trong quá khứ?",
   "options": [
    "SGD",
    "Adagrad",
    "Adam",
    "RMSProp"
   ],
   "answer": 2,
   "explain": "Đáp án theo đề là Adam. Adam kết hợp momentum với learning rate thích ứng theo trung bình bình phương gradient. <i>Lưu ý:</i> RMSProp và Adagrad cũng điều chỉnh learning rate theo gradient quá khứ, nên câu hỏi gốc chưa thật chặt chẽ; Adam là phương án đầy đủ nhất.",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 6"
  },
  {
   "id": 57,
   "q": "Vấn đề \"gradient biến mất\" (vanishing gradient) thường ảnh hưởng tới điều gì?",
   "options": [
    "Kích thước tập huấn luyện",
    "Hiệu suất của mạng nơ-ron nông",
    "Số chiều của dữ liệu đầu vào",
    "Việc huấn luyện mạng nơ-ron sâu"
   ],
   "answer": 3,
   "explain": "Gradient được nhân qua từng lớp khi lan truyền ngược. Mạng càng sâu, tích các hệ số nhỏ hơn 1 càng làm gradient ở các lớp đầu tiến về 0, khiến chúng gần như không học được.",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 7"
  },
  {
   "id": 58,
   "q": "Mô tả nào đúng nhất về \"dừng sớm\" (early stopping) trong deep learning?",
   "options": [
    "Phương pháp chính quy hóa, dừng huấn luyện khi hiệu suất trên tập validation không còn cải thiện",
    "Kỹ thuật tăng tốc huấn luyện bằng cách bỏ qua các lớp không cần thiết",
    "Chiến lược huấn luyện ít epoch hơn để có kết quả nhanh",
    "Phương pháp giảm learning rate trong quá trình huấn luyện"
   ],
   "answer": 0,
   "explain": "Early stopping theo dõi validation loss (hoặc accuracy), dừng khi chỉ số không cải thiện sau một số epoch (patience) và thường khôi phục trọng số tốt nhất. Nó hạn chế overfitting nên được xem là một dạng chính quy hóa.",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 8"
  },
  {
   "id": 59,
   "q": "Vì sao kết nối phần dư (residual connection) rất quan trọng trong mạng nơ-ron rất sâu?",
   "options": [
    "Chúng bảo đảm đầu ra của mạng luôn bị chặn",
    "Chúng ngăn gradient trở nên quá lớn",
    "Chúng giảm gradient biến mất bằng cách cho gradient chảy qua các lớp",
    "Chúng giảm tổng số tham số của mạng"
   ],
   "answer": 2,
   "explain": "Với y = F(x) + x, gradient luôn có thành phần đi thẳng qua phép cộng, không bị nhân với đạo hàm của F. Nhờ vậy ResNet huấn luyện được hơn 100 lớp. Skip connection không làm giảm số tham số.",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 9"
  },
  {
   "id": 60,
   "q": "\"Lịch learning rate\" (learning rate schedule) trong huấn luyện mô hình deep learning nghĩa là gì?",
   "options": [
    "Khởi động lại quá trình huấn luyện sau những khoảng cố định",
    "Giảm learning rate theo một quy tắc định trước hoặc theo chỉ số hiệu suất",
    "Tăng dần năng lực mô hình trong lúc huấn luyện",
    "Điều chỉnh batch size động trong lúc huấn luyện"
   ],
   "answer": 1,
   "explain": "Ví dụ: step decay (giảm 10 lần sau mỗi 30 epoch), cosine annealing, hoặc ReduceLROnPlateau (giảm khi validation loss chững lại). Nhiều lịch có thêm giai đoạn warmup tăng dần lr lúc đầu.",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 10"
  },
  {
   "id": 61,
   "q": "Chức năng chính của các lớp pooling trong CNN là gì?",
   "options": [
    "Chuẩn hóa các bản đồ đặc trưng",
    "Học đặc trưng từ dữ liệu",
    "Thêm tính phi tuyến cho mô hình",
    "Giảm kích thước không gian của các bản đồ đặc trưng"
   ],
   "answer": 3,
   "explain": "Pooling lấy max hoặc trung bình trên từng cửa sổ, nên chiều cao và chiều rộng nhỏ đi. Nó không có tham số nên không \"học\" đặc trưng; việc học là của lớp tích chập.",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 11"
  },
  {
   "id": 62,
   "q": "Trong phát hiện vật thể, thuật toán nào kết hợp đề xuất vùng và phân loại trong một bước?",
   "options": [
    "SVM",
    "YOLO (You Only Look Once)",
    "Fast R-CNN",
    "R-CNN"
   ],
   "answer": 1,
   "explain": "YOLO là bộ phát hiện một giai đoạn: dự đoán đồng thời hộp bao và lớp trên lưới. Họ R-CNN là hai giai đoạn: đề xuất vùng trước (Selective Search hoặc RPN) rồi mới phân loại.",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 12"
  },
  {
   "id": 63,
   "q": "Trong Faster R-CNN, vai trò của Region Proposal Network (RPN) là gì?",
   "options": [
    "Sinh anchor box cho phát hiện vật thể",
    "Phân loại các vùng là vật thể hay nền",
    "Đề xuất các vùng ứng viên có thể chứa vật thể trên bản đồ đặc trưng",
    "Tinh chỉnh tọa độ hộp bao cho đầu ra cuối"
   ],
   "answer": 2,
   "explain": "RPN trượt trên bản đồ đặc trưng, với mỗi anchor nó dự đoán điểm \"có vật thể\" và độ lệch hộp, rồi chọn ra các vùng đề xuất. Anchor được định nghĩa sẵn, không do RPN sinh ra; phân loại lớp cụ thể và tinh chỉnh cuối do head thứ hai đảm nhận.",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 13"
  },
  {
   "id": 64,
   "q": "Ưu điểm chính của tích chập depthwise separable trong CNN là gì?",
   "options": [
    "Giảm số tham số và chi phí tính toán",
    "Tăng khả năng chống overfitting",
    "Tăng độ phân giải không gian của bản đồ đặc trưng",
    "Tăng khả năng diễn giải của lớp tích chập"
   ],
   "answer": 0,
   "explain": "Tách tích chập thành depthwise (mỗi kênh một bộ lọc k × k) và pointwise (1 × 1 trộn kênh). Chi phí giảm khoảng 1/C<sub>out</sub> + 1/k² lần, tức 8–9 lần với kernel 3 × 3. Đây là nền tảng của MobileNet.",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 14"
  },
  {
   "id": 65,
   "q": "Kỹ thuật nào thường dùng cho phân đoạn thực thể (instance segmentation) trong thị giác máy tính?",
   "options": [
    "Mask R-CNN",
    "ResNet",
    "U-Net",
    "YOLO"
   ],
   "answer": 0,
   "explain": "Mask R-CNN mở rộng Faster R-CNN với một nhánh dự đoán mặt nạ cho từng vật thể được phát hiện, nên tách riêng được từng thực thể. U-Net thường dùng cho phân đoạn ngữ nghĩa.",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 15"
  },
  {
   "id": 66,
   "q": "Vai trò chính của cơ chế attention trong mô hình Transformer là gì?",
   "options": [
    "Giảm overfitting trên tập dữ liệu lớn",
    "Tiền xử lý văn bản trước khi tạo embedding",
    "Cho phép mô hình tập trung vào các phần liên quan của chuỗi đầu vào",
    "Nén văn bản thành vector có độ dài cố định"
   ],
   "answer": 2,
   "explain": "Attention gán trọng số cho từng vị trí của chuỗi theo mức liên quan với vị trí đang xét. Nén thành một vector cố định là hạn chế của encoder-decoder RNN cũ mà attention khắc phục.",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 16"
  },
  {
   "id": 67,
   "q": "Mô hình pretrained nào thường được dùng cho học chuyển giao trong NLP?",
   "options": [
    "ResNet",
    "BERT",
    "LeNet",
    "AlexNet"
   ],
   "answer": 1,
   "explain": "BERT được pretrain trên lượng văn bản lớn rồi fine-tune cho phân loại, NER, hỏi đáp… ResNet, AlexNet và LeNet là các CNN cho ảnh.",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 17"
  },
  {
   "id": 68,
   "q": "\"Beam search\" tối ưu điều gì trong các mô hình NLP?",
   "options": [
    "Việc khởi tạo trọng số",
    "Việc chọn siêu tham số",
    "Tốc độ huấn luyện mô hình",
    "Quá trình giải mã, bằng cách xét đồng thời nhiều chuỗi đầu ra"
   ],
   "answer": 3,
   "explain": "Ở mỗi bước, beam search giữ k chuỗi ứng viên có xác suất cao nhất (k là beam width) thay vì chỉ chọn token tốt nhất như greedy decoding, nhờ đó thường tìm được chuỗi tổng thể có xác suất cao hơn.",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 18"
  },
  {
   "id": 69,
   "q": "Mục đích của token \"CLS\" trong BERT là gì?",
   "options": [
    "Đánh dấu đầu mỗi câu trong chuỗi",
    "Cải thiện cơ chế attention khi huấn luyện",
    "Biểu diễn gộp của toàn bộ đầu vào, dùng cho các tác vụ phân loại",
    "Làm dấu ngăn cách giữa các câu đầu vào"
   ],
   "answer": 2,
   "explain": "[CLS] đặt ở đầu chuỗi; vector ẩn cuối cùng của nó tổng hợp thông tin cả chuỗi qua self-attention và được đưa vào lớp phân loại. Ngăn cách các câu là việc của [SEP].",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 19"
  },
  {
   "id": 70,
   "q": "Trong các mô hình GPT, mục đích chính của mặt nạ nhân quả (causal masking) là gì?",
   "options": [
    "Bảo đảm mọi từ trong chuỗi được đối xử như nhau",
    "Ngăn mô hình chú ý tới các token tương lai trong chuỗi",
    "Ưu tiên các từ hiếm khi huấn luyện",
    "Tăng hiệu quả huấn luyện bằng cách rút ngắn chuỗi"
   ],
   "answer": 1,
   "explain": "Mặt nạ đặt điểm attention tới các vị trí j &gt; i bằng −∞ trước softmax, nên token i chỉ thấy các token trước nó. Điều này khớp với cách sinh văn bản từng token và cho phép huấn luyện song song mọi vị trí.",
   "source": "Câu có sẵn, đã dịch: Bộ 20 câu trắc nghiệm Test03 (không ghi nguồn, có kèm đáp án) · câu 20"
  },
  {
   "id": 71,
   "q": "Chọn đúng những phát biểu đúng:",
   "options": [
    "Hồi quy là một bài toán học có giám sát.",
    "Mục tiêu của bài toán giảm chiều là chia dữ liệu thành nhiều nhóm sao cho các điểm giống nhau nhất nằm cùng nhóm.",
    "Mục tiêu của hồi quy là xếp các điểm dữ liệu vào nhiều hạng mục.",
    "Phân cụm là một bài toán học không giám sát.",
    "Không có phát biểu nào khác là đúng.",
    "Mục tiêu của phân cụm là chia dữ liệu thành nhiều nhóm sao cho các điểm giống nhau nhất nằm cùng nhóm.",
    "Mục tiêu của phân loại là xếp các điểm dữ liệu vào nhiều hạng mục."
   ],
   "answer": [
    0,
    3,
    5,
    6
   ],
   "explain": "Hồi quy (dự đoán giá trị số) và phân loại (dự đoán hạng mục) là học có giám sát. Phân cụm là học không giám sát và mục tiêu đúng là gom các điểm giống nhau. Phát biểu về giảm chiều thật ra mô tả phân cụm; giảm chiều là biểu diễn dữ liệu bằng ít biến hơn. Phát biểu về hồi quy thật ra mô tả phân loại.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 1",
   "multi": true
  },
  {
   "id": 72,
   "q": "Chọn đúng những phát biểu đúng:",
   "options": [
    "Vai trò của hàm giả thuyết (hypothesis function) là mô tả bằng một con số sai số giữa nhãn dự đoán và nhãn thật.",
    "Khi làm việc với mạng nơ-ron, đầu vào của mạng nơ-ron cũng là đầu vào của hàm giả thuyết.",
    "Khi huấn luyện mạng nơ-ron, ta muốn tối thiểu hóa giá trị của hàm giả thuyết.",
    "Khi huấn luyện mạng nơ-ron, mục tiêu là tìm các nhãn thật trong tập dữ liệu sao cho chúng gần nhất với nhãn dự đoán.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    1
   ],
   "explain": "Mạng nơ-ron chính là hàm giả thuyết h(x): nhận đầu vào x và cho dự đoán, nên phát biểu thứ hai đúng. Mô tả sai số bằng một con số là vai trò của hàm mất mát, và ta tối thiểu hóa hàm mất mát chứ không phải hàm giả thuyết. Nhãn thật là cố định; ta chỉnh tham số để dự đoán gần nhãn thật, không phải ngược lại.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 2",
   "multi": true
  },
  {
   "id": 73,
   "q": "Chọn đúng những phát biểu đúng:",
   "options": [
    "Giá trị (đầu ra) của hàm mất mát có thể là một số vô hướng.",
    "Giá trị (đầu ra) của hàm mất mát có thể là một vector.",
    "Giá trị (đầu ra) của hàm giả thuyết có thể là một số vô hướng.",
    "Giá trị (đầu ra) của hàm giả thuyết có thể là một vector.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    2,
    3
   ],
   "explain": "Hàm mất mát tóm tắt sai số bằng một con số, nên đầu ra là số vô hướng; cần một số duy nhất để so sánh và tối thiểu hóa. Hàm giả thuyết có thể cho một số (hồi quy một biến) hoặc một vector (ví dụ xác suất của nhiều lớp). Đề gốc không kèm đáp án; mình giải theo định nghĩa trong chương trình của đề.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 3",
   "multi": true
  },
  {
   "id": 74,
   "q": "Các phát biểu dưới đây nói về hai phương pháp chuẩn hóa thang đo đã học. Khoảng (range) của một biến là hiệu giữa giá trị lớn nhất và nhỏ nhất. Chọn đúng những phát biểu đúng:",
   "options": [
    "Khi chuẩn hóa (standardisation), ta trừ độ lệch chuẩn khỏi các giá trị của biến rồi chia cho trung bình.",
    "Khi chuẩn hóa (standardisation), ta trừ trung bình khỏi các giá trị của biến rồi chia cho độ lệch chuẩn.",
    "Khi co giãn min-max về [0, 1], ta chia các giá trị cho giá trị nhỏ nhất rồi trừ đi khoảng của biến.",
    "Khi co giãn min-max về [0, 1], ta trừ giá trị nhỏ nhất khỏi các giá trị rồi chia cho khoảng của biến.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    1,
    3
   ],
   "explain": "Standardisation: z = (x − μ)/σ. Min-max: x′ = (x − min)/(max − min). Hai phát biểu còn lại đảo thứ tự các phép toán.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 4",
   "multi": true
  },
  {
   "id": 75,
   "q": "Có tập dữ liệu 150 căn hộ, mỗi căn có 5 thuộc tính và giá. Ta muốn huấn luyện mô hình dùng 5 thuộc tính này để dự đoán giá, và chuẩn hóa thang đo các biến đầu vào trước. Chọn đúng những phát biểu đúng:",
   "options": [
    "Để co giãn min-max tập dữ liệu này, cần tính tổng cộng 1 giá trị nhỏ nhất và 1 giá trị lớn nhất.",
    "Để co giãn min-max tập dữ liệu này, cần tính tổng cộng 5 giá trị nhỏ nhất và 5 giá trị lớn nhất.",
    "Để chuẩn hóa (standardisation) tập dữ liệu này, cần tính tổng cộng 150 trung bình và 150 độ lệch chuẩn.",
    "Nếu thêm một điểm ngoại lai vào tập dữ liệu, điểm đó được dự đoán sẽ ảnh hưởng tới kết quả co giãn min-max mạnh hơn tới kết quả standardisation.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    1,
    3
   ],
   "explain": "Chuẩn hóa được tính riêng cho từng biến (cột), nên cần 5 min và 5 max, hoặc 5 trung bình và 5 độ lệch chuẩn, không phải 150. Một ngoại lai trở thành min hoặc max mới sẽ ép mọi giá trị khác vào một khoảng rất hẹp, còn trung bình và độ lệch chuẩn bị ảnh hưởng ít hơn. Đề gốc không kèm đáp án.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 5",
   "multi": true
  },
  {
   "id": 76,
   "q": "Xét hàm giả thuyết của một lớp fully connected: h(x) = g(Wx + b), với g là hàm ReLU. Gọi x ∈ ℝ<sup>q</sup> là đầu vào của lớp và r là số nơ-ron trong lớp. Chọn đúng những phát biểu đúng:",
   "options": [
    "W là ma trận kích thước r × q.",
    "W là ma trận kích thước q × r.",
    "b là vector kích thước q.",
    "b là vector kích thước r.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    3
   ],
   "explain": "Wx phải cho vector r chiều (một giá trị cho mỗi nơ-ron) từ x có q chiều, nên W có r hàng và q cột. Bias được cộng vào từng nơ-ron nên b có r phần tử.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 6",
   "multi": true
  },
  {
   "id": 77,
   "q": "Xét lớp fully connected có hàm giả thuyết h(x) = g(Wx + b), với g là hàm kích hoạt và x ∈ ℝ<sup>n</sup>. Đầu ra h(x) là một vector. Chọn đúng những phát biểu đúng:",
   "options": [
    "Nếu dùng hàm sigmoid (đường logistic), đầu ra của lớp chỉ chứa các giá trị trong khoảng 0 tới 1.",
    "Nếu dùng hàm softmax, đầu ra của lớp chỉ chứa các giá trị trong khoảng 0 tới 1.",
    "Nếu dùng hàm ReLU, đầu ra của lớp chỉ chứa các giá trị trong khoảng 0 tới 1.",
    "Nếu dùng hàm sigmoid, tổng các phần tử của vector đầu ra bằng 1.",
    "Nếu dùng hàm softmax, tổng các phần tử của vector đầu ra bằng 1.",
    "Nếu dùng hàm ReLU, tổng các phần tử của vector đầu ra bằng 1.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    1,
    4
   ],
   "explain": "Sigmoid áp riêng cho từng phần tử, cho giá trị trong (0, 1) nhưng tổng không bị ràng buộc. Softmax cho các giá trị trong (0, 1) có tổng bằng 1. ReLU cho giá trị trong [0, +∞), không bị chặn trên.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 7",
   "multi": true
  },
  {
   "id": 78,
   "q": "Ta muốn dự đoán giá căn hộ ở Budapest bằng mô hình học máy dựa trên ba thông tin: diện tích sàn, khoảng cách tới trung tâm và số tầng. Tập huấn luyện có 300 căn hộ. Chọn đúng những phát biểu đúng:",
   "options": [
    "Hồi quy tuyến tính phù hợp với bài toán này hơn hồi quy logistic.",
    "Hồi quy logistic phù hợp với bài toán này hơn hồi quy tuyến tính.",
    "Đây là bài toán hồi quy.",
    "Đây là bài toán phân loại.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    2
   ],
   "explain": "Giá là một số liên tục nên đây là bài toán hồi quy, và hồi quy tuyến tính phù hợp. Hồi quy logistic, dù có tên \"hồi quy\", là mô hình phân loại.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 8",
   "multi": true
  },
  {
   "id": 79,
   "q": "Ta muốn dự đoán giá căn hộ ở Budapest bằng mô hình hồi quy tuyến tính đơn giản dựa trên hai thông tin: diện tích sàn và khoảng cách tới trung tâm. Tập huấn luyện có 300 căn hộ. Chọn đúng những phát biểu đúng:",
   "options": [
    "Hàm giả thuyết là một đường thẳng.",
    "Hàm giả thuyết là một đường sigmoid.",
    "Mô hình có 300 tham số.",
    "Mô hình có 301 tham số.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    4
   ],
   "explain": "Với hai biến đầu vào, h(x) = θ<sub>0</sub> + θ<sub>1</sub>x<sub>1</sub> + θ<sub>2</sub>x<sub>2</sub> là một mặt phẳng trong không gian 3 chiều, không phải đường thẳng. Mô hình có 3 tham số; số tham số không phụ thuộc số mẫu. Vì vậy không phát biểu nào khác đúng. Đề gốc không kèm đáp án.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 9",
   "multi": true
  },
  {
   "id": 80,
   "q": "Ta giải bài toán phân loại nhị phân bằng một MLP hai lớp. Có 10 biến đầu vào, lớp thứ nhất có 5 nơ-ron. Hàm mất mát là BCE (binary cross-entropy). Chọn đúng những phát biểu đúng:",
   "options": [
    "Mạng có tổng cộng 61 tham số. (5 × 10 + 5 + 1 × 5 + 1 = 61)",
    "Mạng có tổng cộng 67 tham số. (5 × 10 + 5 + 2 × 5 + 2 = 67)",
    "Mạng có tổng cộng 70 tham số. (5 × 10 + 10 + 1 × 5 + 5 = 70)",
    "Mạng có tổng cộng 75 tham số. (5 × 10 + 10 + 2 × 5 + 5 = 75)",
    "Lớp thứ hai chỉ có một nơ-ron.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    4
   ],
   "explain": "Với BCE, lớp ra chỉ cần một nơ-ron sigmoid cho xác suất lớp dương. Lớp 1: 5 × 10 trọng số + 5 bias = 55. Lớp 2: 1 × 5 trọng số + 1 bias = 6. Tổng 61. Số bias bằng số nơ-ron của lớp, không bằng số đầu vào.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 10",
   "multi": true
  },
  {
   "id": 81,
   "q": "Chọn đúng những phát biểu đúng:",
   "options": [
    "Kỹ thuật dừng sớm (early stopping) dừng huấn luyện khi validation loss rõ ràng không còn cải thiện.",
    "Cộng tổng các tham số vào hàm mất mát (với hệ số phù hợp) được dự đoán sẽ giảm overfitting.",
    "Cộng tổng bình phương các tham số vào hàm mất mát (với hệ số phù hợp) được dự đoán sẽ giảm overfitting.",
    "Tăng số tham số của mô hình thường giảm overfitting.",
    "Tăng kích thước tập huấn luyện thường giảm overfitting.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    2,
    4
   ],
   "explain": "Tổng bình phương tham số là chính quy hóa L2. \"Tổng các tham số\" (không lấy trị tuyệt đối) không phải chính quy hóa: tham số âm làm tổng giảm, nên tối thiểu hóa nó chỉ đẩy tham số về âm vô cùng. L1 dùng tổng trị tuyệt đối. Thêm tham số làm mô hình phức tạp hơn, dễ overfit hơn; thêm dữ liệu giúp giảm overfitting.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 11",
   "multi": true
  },
  {
   "id": 82,
   "q": "Chọn đúng những phát biểu đúng:",
   "options": [
    "Một nơ-ron nhân tạo không có hàm kích hoạt tương đương với hồi quy tuyến tính nhiều biến.",
    "Biên quyết định là tập hợp các điểm dữ liệu mà mô hình phân loại đúng.",
    "Biên quyết định của một nơ-ron có hàm kích hoạt sigmoid có dạng đường sigmoid.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0
   ],
   "explain": "Không có hàm kích hoạt, nơ-ron tính w·x + b, chính là hồi quy tuyến tính. Biên quyết định là tập các điểm mà mô hình ở ranh giới giữa hai lớp (ví dụ xác suất đúng bằng 0.5), không liên quan đúng hay sai. Với nơ-ron sigmoid, biên là siêu phẳng w·x + b = 0.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 12",
   "multi": true
  },
  {
   "id": 83,
   "q": "Chọn đúng những phát biểu đúng:",
   "options": [
    "Một nơ-ron nhân tạo không có hàm kích hoạt tương đương với hồi quy logistic nhiều biến.",
    "Một nơ-ron nhân tạo có hàm kích hoạt sigmoid không phải là một hàm tuyến tính.",
    "Một nơ-ron nhân tạo có hàm kích hoạt sigmoid không thể tạo biên quyết định phi tuyến.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    1,
    2
   ],
   "explain": "Hồi quy logistic chính là nơ-ron có sigmoid; không có kích hoạt là hồi quy tuyến tính. Hàm σ(w·x + b) là phi tuyến theo x, nhưng biên quyết định σ(w·x + b) = 0.5 tương đương w·x + b = 0, vẫn là siêu phẳng tuyến tính.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 13",
   "multi": true
  },
  {
   "id": 84,
   "q": "Chọn đúng những phát biểu đúng:",
   "options": [
    "Một nơ-ron nhân tạo không có hàm kích hoạt tương đương với hồi quy tuyến tính nhiều biến.",
    "Một nơ-ron nhân tạo không có hàm kích hoạt tương đương với hồi quy logistic nhiều biến.",
    "Biên quyết định là tập hợp các điểm dữ liệu mà mô hình phân loại đúng.",
    "Biên quyết định của một nơ-ron có hàm kích hoạt sigmoid có dạng đường sigmoid.",
    "Một nơ-ron nhân tạo có hàm kích hoạt sigmoid không phải là một hàm tuyến tính.",
    "Một nơ-ron nhân tạo có hàm kích hoạt sigmoid không thể tạo biên quyết định phi tuyến.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    4,
    5
   ],
   "explain": "Câu này gộp hai câu trước. Đúng: nơ-ron không kích hoạt là hồi quy tuyến tính; nơ-ron sigmoid là hàm phi tuyến; nhưng biên quyết định của nó vẫn là siêu phẳng tuyến tính.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 14",
   "multi": true
  },
  {
   "id": 85,
   "q": "Ta dự đoán giá căn hộ ở Budapest bằng hồi quy tuyến tính dựa trên ba thông tin: diện tích sàn, khoảng cách tới trung tâm, số tầng. Hàm giả thuyết h(X) = Xθ dự đoán giá của mọi căn hộ cùng lúc ở dạng vector hóa, tham số nằm trong vector θ. Ta viết hàm giả thuyết cho tập 200 căn hộ. Chọn đúng những phát biểu đúng:",
   "options": [
    "X là ma trận kích thước 201 × 3.",
    "X là ma trận kích thước 200 × 4.",
    "Mô hình có 603 tham số (3 × 201).",
    "Mô hình có 800 tham số (4 × 200).",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    1
   ],
   "explain": "Mỗi hàng của X là một căn hộ (200 hàng), mỗi cột là một đặc trưng, cộng thêm một cột toàn số 1 cho hệ số chặn: 3 + 1 = 4 cột. θ có 4 phần tử, tức mô hình có 4 tham số, không phụ thuộc số căn hộ.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 15",
   "multi": true
  },
  {
   "id": 86,
   "q": "Ta muốn tăng cường dữ liệu cho bài toán phân loại ảnh chó/mèo. Chọn đúng những phát biểu đúng:",
   "options": [
    "Lật ngang nhìn chung là phép biến đổi chấp nhận được (nhãn của ảnh lật không đổi).",
    "Không dùng được phép lật ngang vì nó làm thay đổi nội dung ảnh.",
    "Xoay nhẹ (ví dụ ±15°) nhìn chung là phép biến đổi chấp nhận được.",
    "Cắt ngẫu nhiên (random crop) nhìn chung là phép biến đổi chấp nhận được.",
    "Đổi chỗ kênh màu đỏ và xanh lam là phép biến đổi được khuyên dùng để cải thiện hiệu suất.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    2,
    3
   ],
   "explain": "Con chó soi gương vẫn là con chó, xoay nhẹ hay cắt một phần ảnh cũng không đổi nhãn. Đổi kênh đỏ và xanh lam tạo ra màu lông không có thật, không phải phép biến đổi được khuyên dùng.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 16",
   "multi": true
  },
  {
   "id": 87,
   "q": "Ta muốn tăng cường dữ liệu cho tập MNIST chữ số viết tay. Chọn đúng những phát biểu đúng:",
   "options": [
    "Lật ngang nhìn chung là phép biến đổi chấp nhận được (ví dụ số 6 bị lật vẫn được phân loại đúng là 6).",
    "Xoay nhẹ (ví dụ ±10°) nhìn chung là phép biến đổi chấp nhận được.",
    "Xoay 180° là phép biến đổi chấp nhận được (nhãn không đổi).",
    "Dịch chuyển ngẫu nhiên một chút nhìn chung là phép biến đổi chấp nhận được.",
    "Tăng cường dữ liệu chỉ thực hiện trên tập huấn luyện, không thực hiện trên tập test.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    1,
    3,
    4
   ],
   "explain": "Chữ số có hướng: số 6 lật ngang không còn là chữ viết hợp lệ, số 6 xoay 180° thành số 9. Xoay nhẹ và dịch nhẹ mô phỏng sự khác nhau tự nhiên của nét viết. Tập test phải giữ nguyên để đánh giá trên dữ liệu thật.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 17",
   "multi": true
  },
  {
   "id": 88,
   "q": "Về hai phương thức <code>train()</code> và <code>eval()</code> của lớp <code>torch.nn.Module</code> trong PyTorch. Chọn đúng những phát biểu đúng:",
   "options": [
    "<code>train()</code> đưa mạng vào chế độ huấn luyện, khi đó dropout và batch normalization hoạt động theo kiểu lúc huấn luyện.",
    "<code>eval()</code> đưa mạng vào chế độ đánh giá, khi đó dropout bị tắt và batch normalization dùng trung bình và độ lệch chuẩn tích lũy (running).",
    "<code>train()</code> bắt đầu quá trình huấn luyện (tính gradient và cập nhật tham số).",
    "<code>eval()</code> tắt việc tính gradient (autograd).",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    1
   ],
   "explain": "train() và eval() chỉ đặt cờ chế độ cho các lớp. Việc tính gradient và cập nhật tham số do loss.backward() và optimizer.step() làm. Tắt autograd cần torch.no_grad().",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 18",
   "multi": true
  },
  {
   "id": 89,
   "q": "Một lớp tích chập nhận ảnh 3 kênh (RGB), dùng 16 bộ lọc kích thước 5 × 5 (stride 1, có bias). Chọn đúng những phát biểu đúng:",
   "options": [
    "Lớp có tổng cộng 1216 tham số. (16 × (5 × 5 × 3) + 16 = 1216)",
    "Lớp có tổng cộng 400 tham số. (16 × 5 × 5 = 400)",
    "Lớp có tổng cộng 1200 tham số. (16 × 5 × 5 × 3 = 1200)",
    "Đầu ra của lớp có 16 kênh (bản đồ nhiệt).",
    "Đầu ra của lớp có 3 kênh (bản đồ nhiệt).",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    3
   ],
   "explain": "Mỗi bộ lọc phủ cả 3 kênh vào: 5 × 5 × 3 = 75 trọng số cộng 1 bias. 16 bộ lọc: 16 × 76 = 1216. Mỗi bộ lọc sinh một kênh ra, nên đầu ra có 16 kênh.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 19",
   "multi": true
  },
  {
   "id": 90,
   "q": "Một lớp tích chập nhận ảnh 1 kênh (ảnh xám), dùng 32 bộ lọc kích thước 3 × 3 (stride 1, có bias). Chọn đúng những phát biểu đúng:",
   "options": [
    "Lớp có tổng cộng 320 tham số. (32 × (3 × 3 × 1) + 32 = 320)",
    "Lớp có tổng cộng 9 tham số. (3 × 3 = 9)",
    "Lớp có tổng cộng 288 tham số. (32 × 3 × 3 = 288)",
    "Đầu ra của lớp có 32 kênh (bản đồ nhiệt).",
    "Đầu ra của lớp có 1 kênh (bản đồ nhiệt).",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    3
   ],
   "explain": "32 bộ lọc, mỗi bộ 3 × 3 × 1 = 9 trọng số cộng 1 bias, nên 32 × 10 = 320 tham số. Đầu ra có 32 kênh, mỗi bộ lọc một kênh.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 20",
   "multi": true
  },
  {
   "id": 91,
   "q": "Tensor đầu vào có kích thước không gian 4 × 4, qua lớp max pooling với khối 2 × 2 và stride = 2. Chọn đúng những phát biểu đúng:",
   "options": [
    "Kích thước không gian của đầu ra là 2 × 2.",
    "Kích thước không gian của đầu ra là 3 × 3.",
    "Lớp pooling có tham số học được.",
    "Lớp pooling giảm độ phân giải không gian và giúp mạng chịu được các dịch chuyển nhỏ.",
    "Dùng max pooling thay vì average pooling, ta lấy đặc trưng mạnh nhất (lớn nhất) của mỗi khối.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    3,
    4
   ],
   "explain": "(4 − 2)/2 + 1 = 2, nên đầu ra 2 × 2. Pooling là phép toán cố định, không có tham số học. Nó giảm độ phân giải và cho tính bất biến cục bộ với dịch chuyển nhỏ; max pooling giữ phản hồi mạnh nhất của mỗi khối.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 21",
   "multi": true
  },
  {
   "id": 92,
   "q": "Về hai tính chất đồng biến tịnh tiến (translation equivariance) và bất biến tịnh tiến (translation invariance). Chọn đúng những phát biểu đúng:",
   "options": [
    "Lớp tích chập có tính đồng biến tịnh tiến: nếu đầu vào bị dịch chuyển thì đầu ra cũng dịch chuyển tương ứng.",
    "Lớp tích chập có tính bất biến tịnh tiến: nếu đầu vào bị dịch chuyển thì đầu ra hoàn toàn không đổi.",
    "Các lớp pooling (đặc biệt là global pooling) góp phần tạo tính bất biến tịnh tiến.",
    "Bất biến tịnh tiến và đồng biến tịnh tiến là hai tính chất tương đương.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    2
   ],
   "explain": "Tích chập dùng cùng bộ lọc ở mọi vị trí nên đầu ra dịch theo đầu vào (đồng biến). Bất biến nghĩa là đầu ra không đổi; global pooling gộp toàn bộ không gian nên gần như không đổi khi đặc trưng di chuyển. Hai tính chất khác nhau.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 22",
   "multi": true
  },
  {
   "id": 93,
   "q": "Về batch normalization. Chọn đúng những phát biểu đúng:",
   "options": [
    "Batch normalization chuẩn hóa activation của lớp bằng trung bình và độ lệch chuẩn trong mini-batch, rồi tinh chỉnh bằng phép co giãn (γ) và dịch chuyển (β) học được.",
    "Batch normalization có đúng 2 tham số học được mỗi lớp (một số γ và một số β).",
    "Khi suy luận (test), batch normalization dùng trung bình và độ lệch chuẩn tích lũy trong lúc huấn luyện, không dùng thống kê của batch hiện tại.",
    "Batch normalization giảm bớt vấn đề gradient không ổn định.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    2,
    3
   ],
   "explain": "γ và β là vector, mỗi kênh (hoặc mỗi đặc trưng) có một cặp riêng, nên số tham số là 2 × số kênh chứ không phải 2. Các phát biểu còn lại mô tả đúng cách BatchNorm hoạt động và tác dụng làm ổn định gradient.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 23",
   "multi": true
  },
  {
   "id": 94,
   "q": "Cho khối residual y = F(x) + x, với F là một biến đổi phi tuyến (ví dụ vài lớp tích chập hoặc fully connected). Chọn đúng những phát biểu đúng:",
   "options": [
    "Kết nối residual giúp huấn luyện được mạng sâu hơn nhờ giảm vấn đề gradient không ổn định.",
    "Để phép cộng có nghĩa, nếu số chiều của F(x) và x khác nhau thì dùng một phép chiếu tuyến tính để khớp lại.",
    "Mạng residual chỉ hoạt động với các lớp fully connected.",
    "Kết nối tắt (skip connection) là số hạng +x trong công thức.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    1,
    3
   ],
   "explain": "ResNet nổi tiếng nhất chính là mạng tích chập, nên phát biểu \"chỉ hoạt động với fully connected\" sai. Khi số chiều khác nhau, ResNet dùng phép chiếu (tích chập 1 × 1) trên nhánh tắt.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 24",
   "multi": true
  },
  {
   "id": 95,
   "q": "Về vấn đề gradient không ổn định. Chọn đúng những phát biểu đúng:",
   "options": [
    "Hiện tượng kết hợp giữa \"gradient biến mất\" và \"gradient bùng nổ\" được gọi là \"vấn đề gradient không ổn định\".",
    "Hàm sigmoid góp phần gây gradient biến mất vì đạo hàm của nó tối đa là 0.25 và gần 0 ở các vùng phẳng.",
    "Hàm ReLU không bao giờ gặp vấn đề gradient biến mất.",
    "Batch normalization và kết nối residual là các công cụ thường dùng để giảm gradient không ổn định.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    1,
    3
   ],
   "explain": "ReLU có đạo hàm 0 ở miền âm. Nơ-ron có đầu vào luôn âm sẽ \"chết\" và không nhận gradient, nên nói ReLU không bao giờ bị gradient biến mất là sai, dù ReLU giảm vấn đề này nhiều so với sigmoid.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 25",
   "multi": true
  },
  {
   "id": 96,
   "q": "Về học chuyển giao (transfer learning). Chọn đúng những phát biểu đúng:",
   "options": [
    "Học chuyển giao dùng một mạng đã pretrain trên tập dữ liệu lớn làm điểm khởi đầu cho tác vụ mới, thường có tập dữ liệu nhỏ hơn.",
    "Học chuyển giao được dự đoán hữu ích nhất khi tác vụ pretrain và tác vụ đích giống nhau.",
    "Mục tiêu của học chuyển giao là huấn luyện lại hoàn toàn mạng pretrained cho tác vụ mới, bắt đầu từ tham số khởi tạo ngẫu nhiên.",
    "Đóng băng trọng số giữ nguyên tham số của một số lớp của mạng pretrained trong quá trình huấn luyện.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    1,
    3
   ],
   "explain": "Khởi tạo ngẫu nhiên lại là bỏ hết kiến thức đã học, trái với ý tưởng học chuyển giao. Ta giữ trọng số pretrained, có thể đóng băng một phần và fine-tune phần còn lại.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 26",
   "multi": true
  },
  {
   "id": 97,
   "q": "Các bài toán dùng RNN được chia theo quan hệ giữa độ dài chuỗi vào và chuỗi ra: N→1, 1→N, N→N, M→N (M ≠ N). Chọn đúng những phát biểu đúng:",
   "options": [
    "Bộ phân loại cảm xúc văn bản (một câu → một nhãn cảm xúc) là bài toán dạng N→1.",
    "Dịch máy là bài toán dạng M→N (đầu vào và đầu ra có độ dài khác nhau).",
    "Dự báo thời tiết (dữ liệu 24 giờ trước → nhiệt độ giờ tới) là bài toán dạng M→N.",
    "Sinh chú thích ảnh (ảnh → câu) là bài toán dạng 1→N.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    1,
    3
   ],
   "explain": "Dự báo thời tiết ở đây nhận một chuỗi 24 bước và cho ra một giá trị, nên là N→1 chứ không phải M→N. Các phát biểu còn lại phân loại đúng.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 27",
   "multi": true
  },
  {
   "id": 98,
   "q": "Về kiến trúc LSTM và GRU so với RNN thuần (vanilla RNN). Chọn đúng những phát biểu đúng:",
   "options": [
    "LSTM và GRU xử lý phụ thuộc xa tốt hơn RNN thuần.",
    "LSTM/GRU dùng cơ chế cổng để chọn lọc giữ lại hoặc quên thông tin quá khứ.",
    "Số tham số của LSTM và GRU bằng số tham số của RNN thuần có cùng kích thước trạng thái ẩn.",
    "LSTM/GRU giảm bớt vấn đề gradient biến mất, vốn khiến RNN thuần khó huấn luyện trên chuỗi dài.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    1,
    3
   ],
   "explain": "Mỗi cổng có ma trận trọng số riêng: LSTM có 4 khối (3 cổng + ứng viên ô nhớ), GRU có 3, nên số tham số gấp khoảng 4 và 3 lần RNN thuần cùng kích thước ẩn.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 28",
   "multi": true
  },
  {
   "id": 99,
   "q": "Trong một lớp self-attention một tầng, một head, đầu vào là chuỗi dài N, mỗi phần tử là vector d chiều. Chọn đúng những phát biểu đúng:",
   "options": [
    "Số điểm attention (attention score) là N × N.",
    "Hệ số co giãn √d<sub>k</sub> xuất hiện trước softmax để tích vô hướng không quá lớn và không làm softmax bão hòa.",
    "Giống RNN thuần, lớp self-attention phải tính tuần tự: đầu ra thứ i chỉ tính được sau khi đã tính đầu ra thứ i − 1.",
    "Các tham số học được của lớp self-attention là các ma trận chiếu Q, K, V.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    1,
    3
   ],
   "explain": "Mỗi cặp vị trí có một điểm nên có N × N điểm. Mọi đầu ra được tính song song bằng phép nhân ma trận, đó là ưu điểm lớn so với RNN. Các tham số là W<sub>Q</sub>, W<sub>K</sub>, W<sub>V</sub> (thường thêm ma trận chiếu đầu ra).",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 29",
   "multi": true
  },
  {
   "id": 100,
   "q": "Ta huấn luyện một autoencoder để nén ảnh chữ số viết tay 28 × 28 (MNIST). Đầu vào và đầu ra của mạng đều là vector 784 phần tử. Chọn đúng những phát biểu đúng:",
   "options": [
    "Hàm mất mát thường dùng là sai số bình phương trung bình (MSE) giữa đầu vào và đầu ra tái tạo.",
    "Nhãn (nhãn thật) của mạng là lớp của chữ số (0–9).",
    "Biểu diễn nén nằm ở nút thắt cổ chai (bottleneck) số chiều thấp giữa phần encoder và decoder.",
    "Để tránh ánh xạ đồng nhất tầm thường, ta chọn số chiều lớp ẩn nhỏ hơn số chiều đầu vào.",
    "Nếu giá trị mất mát bằng 0 (đo bằng MSE) thì mạng đã tái tạo chính xác ảnh gốc.",
    "Không có phát biểu nào khác là đúng."
   ],
   "answer": [
    0,
    2,
    3,
    4
   ],
   "explain": "Autoencoder tự giám sát: \"nhãn\" chính là ảnh đầu vào, không dùng lớp chữ số. MSE bằng 0 nghĩa là mọi pixel tái tạo bằng pixel gốc.",
   "source": "Câu có sẵn, đã dịch: Magyar MI Diákolimpia 2026 – National Selection Round 1, bản dịch tiếng Anh của SOTA AI Community, CC BY-NC-SA 4.0 (Test04) · câu 30",
   "multi": true
  }
 ]
};
