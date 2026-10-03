// 100 câu VOAI 2025 – Vòng sơ loại (Mã đề 006). Đáp án do Claude tự giải, không phải đáp án chính thức.
window.QUIZ = [
 {
  "id": 1,
  "q": "Trong mạng nơ-ron, chuẩn hóa lô (Batch Normalization) thường được đặt ở đâu?",
  "options": [
   "Trước hàm kích hoạt ReLU và sau lớp tuyến tính (Linear)",
   "Sau ReLU",
   "Sau lớp bỏ ngẫu nhiên (dropout)",
   "Trước lớp đầu vào (input layer)"
  ],
  "answer": 0,
  "explain": "BatchNorm thường đặt ngay sau lớp tuyến tính/tích chập và trước hàm kích hoạt (Linear → BN → ReLU), như thiết kế gốc của Ioffe & Szegedy. Chuẩn hóa đầu vào của ReLU giúp phân phối ổn định, tránh nhiều nơ-ron \"chết\"."
 },
 {
  "id": 2,
  "q": "Thành phần nào sau đây là một tham số có thể học trong một lớp tích chập ?",
  "options": [
   "Kích thước của dữ liệu đầu vào",
   "Các giá trị trong bộ lọc",
   "Kích thước bước nhảy",
   "Kích thước padding"
  ],
  "answer": 1,
  "explain": "Tham số học được của lớp tích chập là các trọng số trong bộ lọc (kernel) và bias. Kích thước đầu vào, stride và padding là siêu tham số do người thiết kế chọn, không được cập nhật bằng gradient."
 },
 {
  "id": 3,
  "q": "Nếu mất mát (loss) không giảm sau 5 vòng lặp (epoch) đầu tiên dù tỷ lệ học là 0.001, bạn nên làm gì đầu tiên?",
  "options": [
   "Dừng lại và chọn mô hình khác",
   "Kiểm tra lại quy trình dữ liệu (data pipeline), tăng cường dữ liệu (augmentation) và bộ tối ưu",
   "Tăng tỷ lệ học lên 0.1",
   "Tăng số lớp của mô hình"
  ],
  "answer": 1,
  "explain": "Loss không giảm với lr = 0.001 (vốn hợp lý) thường do lỗi ở dữ liệu: nhãn lệch, chưa chuẩn hóa, augmentation quá mạnh, hoặc quên <code>optimizer.step()</code>/<code>zero_grad()</code>. Cần kiểm tra pipeline trước. Tăng lr lên 0.1 dễ làm phân kỳ; đổi mô hình hay thêm lớp là quá sớm."
 },
 {
  "id": 4,
  "q": "Hạn chế lớn nhất khi tinh chỉnh (fine-tune) toàn bộ mô hình GPT là gì?",
  "options": [
   "Không dùng được tiếng Việt",
   "Cần tài nguyên tính toán rất lớn",
   "Không dùng được API",
   "Không sinh được ảnh"
  ],
  "answer": 1,
  "explain": "Fine-tune toàn bộ GPT nghĩa là cập nhật hàng tỷ tham số, tốn rất nhiều bộ nhớ GPU, thời gian và chi phí. Vì vậy người ta hay dùng PEFT như LoRA hoặc adapter. Các phương án còn lại đều sai về thực tế."
 },
 {
  "id": 5,
  "q": "Khi muốn trích xuất đặc trưng (features) từ ResNet50, bạn nên làm gì?",
  "options": [
   "Sử dụng bộ tối ưu Adam",
   "Sử dụng đầu ra từ lớp gần cuối (ví dụ: avgpool, penultimate, …)",
   "Thêm nhiều lớp bỏ ngẫu nhiên (dropout)",
   "Thêm lớp kết nối đầy đủ siêu tốc (fully connected) mới"
  ],
  "answer": 1,
  "explain": "Để trích xuất đặc trưng, ta lấy đầu ra của lớp gần cuối (avgpool, vector 2048 chiều với ResNet50), bỏ lớp phân loại fc. Bộ tối ưu, dropout hay thêm lớp FC không liên quan tới việc trích xuất."
 },
 {
  "id": 6,
  "q": "Giả sử bạn đang xây dựng một mô hình phân loại cảm xúc văn bản (positive/negative) bằng cách sử dụng biểu diễn Bag-of-Words (BoW) và PyTorch (phiên bản ≥ 1.6). Dưới đây là đoạn mã tiền xử lý đã được thực hiện:<figure><img src=\"img/q06.png\" alt=\"Đoạn mã tiền xử lý BoW\" loading=\"lazy\"></figure>Phương án nào sau đây là phần mã đúng để huấn luyện mô hình phân loại nhị phân đơn giản với biểu diễn BoW, một tầng tuyến tính và hàm loss phù hợp?",
  "options": [
   "<figure><img src=\"img/q06a.png\" alt=\"Phương án A\" loading=\"lazy\"></figure>",
   "<figure><img src=\"img/q06b.png\" alt=\"Phương án B\" loading=\"lazy\"></figure>",
   "<figure><img src=\"img/q06c.png\" alt=\"Phương án C\" loading=\"lazy\"></figure>",
   "<figure><img src=\"img/q06d.png\" alt=\"Phương án D\" loading=\"lazy\"></figure>"
  ],
  "answer": 0,
  "explain": "Phân loại nhị phân với một tầng tuyến tính chuẩn nhất là: 1 đầu ra (logit) + <code>BCEWithLogitsLoss</code> (đã gồm sigmoid), <code>squeeze()</code> để khớp shape (N,), và nhãn ép sang <code>float</code>.<br>B sai: <code>NLLLoss</code> cần log-xác suất (thiếu <code>log_softmax</code>), lại có 2 tầng chứ không phải một. D sai: MSE không phù hợp cho phân loại, và shape (N,1) với (N,) bị lệch, nhãn kiểu long. C chạy được (2 logit + CrossEntropy) nhưng A là cách chuẩn cho bài toán nhị phân với một đầu ra."
 },
 {
  "id": 7,
  "q": "Điều nào sau đây là ĐÚNG khi so sánh SVM (support vector machine) với k-NN?",
  "options": [
   "Cả hai phương pháp chỉ được sử dụng cho các bài toán phân loại (không phải hồi quy)",
   "Huấn luyện SVM có thể tốn kém về mặt tính toán, đặc biệt đối với các bộ dữ liệu lớn, trong khi huấn luyện k-NN không liên quan đến quy trình huấn luyện rõ ràng",
   "SVM luôn tốt hơn k-NN trên mọi tập dữ liệu",
   "Dự đoán của cả hai phương pháp đều chậm vì cả hai đều cần xử lý tất cả các mẫu dữ liệu huấn luyện để dự đoán mẫu dữ liệu mới"
  ],
  "answer": 1,
  "explain": "SVM giải bài toán tối ưu bậc hai, chi phí huấn luyện tăng nhanh theo số mẫu (khoảng O(n²) đến O(n³)). k-NN là \"lazy learner\": chỉ lưu dữ liệu, không có pha huấn luyện thật sự. A sai vì cả hai đều làm được hồi quy (SVR, k-NN regression). C sai vì không có mô hình luôn tốt hơn. D sai vì SVM chỉ dùng các support vector khi dự đoán."
 },
 {
  "id": 8,
  "q": "Đối với SVM (support vector machine) phi tuyến, để dự đoán, đáp án nào đúng.",
  "options": [
   "Cần sử dụng cùng hàm chuyển đổi tương tự với giai đoạn huấn luyện",
   "Sử dụng một hàm chuyển đổi khác với giai đoạn huấn luyện",
   "SVM phi tuyến luôn tốt hơn SVM tuyến tính trong mọi tập dữ liệu",
   "Không cần hàm chuyển đổi"
  ],
  "answer": 0,
  "explain": "SVM phi tuyến dùng một kernel/phép biến đổi φ cố định. Khi dự đoán phải dùng đúng kernel đó (cùng tham số, ví dụ γ của RBF) để tính f(x) = Σ αᵢyᵢK(xᵢ, x) + b. Dùng hàm khác sẽ sai không gian đặc trưng."
 },
 {
  "id": 9,
  "q": "Khi sử dụng torchvision.models.resnet18(pretrained=True) trong PyTorch, mục đích chính là gì?",
  "options": [
   "Huấn luyện mô hình từ đầu",
   "Tăng kích thước lô (batch size)",
   "Thử nghiệm mô hình mới",
   "Sử dụng trọng số huấn luyện trước (pre-trained weights) trên ImageNet để trích xuất đặc trưng"
  ],
  "answer": 3,
  "explain": "<code>pretrained=True</code> tải trọng số đã huấn luyện trên ImageNet để dùng lại (transfer learning, trích xuất đặc trưng hoặc fine-tune) thay vì huấn luyện từ đầu."
 },
 {
  "id": 10,
  "q": "Thuật toán <b>Non-Maximum Suppression (NMS)</b> lọc bỏ các hộp bao (bounding box) dư thừa cho cùng một đối tượng:<ol><li>Sắp xếp các hộp trong tập P theo điểm tin cậy giảm dần.</li><li>Chọn hộp H có điểm tin cậy cao nhất, chuyển H vào danh sách kết quả K và loại khỏi P.</li><li>Tính IoU = <span class=\"frac\"><span>Diện tích vùng giao của 2 hộp</span><span>Diện tích vùng hợp của 2 hộp</span></span> giữa H và mọi hộp còn lại trong P; hộp nào có IoU lớn hơn ngưỡng IoU_threshold thì bị loại khỏi P.</li><li>Lặp lại từ bước 2 cho đến khi P rỗng. K chứa các hộp được giữ lại.</li></ol>Áp dụng NMS với ngưỡng IoU_threshold = 0.40, giả sử tất cả các hộp cùng một lớp và đã sắp theo độ tin cậy:<div class=\"tbl\"><table><tr><th>ID</th><th>Toạ độ (x<sub>1</sub>, y<sub>1</sub>, x<sub>2</sub>, y<sub>2</sub>) (pixel)</th><th>Độ tin cậy</th></tr><tr><td>B<sub>1</sub></td><td>(0, 0, 100, 100)</td><td>0.95</td></tr><tr><td>B<sub>2</sub></td><td>(10, 10, 90, 90)</td><td>0.90</td></tr><tr><td>B<sub>3</sub></td><td>(105, 105, 200, 200)</td><td>0.85</td></tr></table></div>Những hộp nào sẽ được giữ lại?",
  "options": [
   "B<sub>1</sub> và B<sub>2</sub>",
   "Chỉ B<sub>1</sub>",
   "B<sub>1</sub> và B<sub>3</sub>",
   "B<sub>2</sub> và B<sub>3</sub>"
  ],
  "answer": 2,
  "explain": "Chọn B<sub>1</sub> (0.95) trước.<br>• IoU(B<sub>1</sub>, B<sub>2</sub>): giao = 80 × 80 = 6400; hợp = 10000 + 6400 − 6400 = 10000 → IoU = 0.64 &gt; 0.40 nên loại B<sub>2</sub>.<br>• IoU(B<sub>1</sub>, B<sub>3</sub>): B<sub>3</sub> bắt đầu từ 105 &gt; 100 nên không giao, IoU = 0 → giữ.<br>Tiếp theo chọn B<sub>3</sub>, P rỗng. Kết quả: B<sub>1</sub> và B<sub>3</sub>."
 },
 {
  "id": 11,
  "q": "Trong Pandas, phương thức nào dùng để lấy 5 dòng đầu tiên của DataFrame?",
  "options": [
   "df.head()",
   "df.take(5)",
   "df.top()",
   "df.first(5)"
  ],
  "answer": 0,
  "explain": "<code>df.head()</code> mặc định trả về 5 dòng đầu. <code>df.take</code> cần danh sách chỉ số, <code>df.top()</code> không tồn tại, <code>df.first()</code> nhận khoảng thời gian (ví dụ \"5D\") trên index thời gian."
 },
 {
  "id": 12,
  "q": "Thuật toán học máy nào sau đây là phổ biến và hiệu quả, dựa trên ý tưởng bagging?",
  "options": [
   "XGBoost",
   "Hồi quy tuyến tính (Linear Regression)",
   "Cây quyết định (Decision Tree)",
   "Rừng ngẫu nhiên (Random Forest)"
  ],
  "answer": 3,
  "explain": "Random Forest = bagging (bootstrap aggregating) các cây quyết định, cộng thêm chọn ngẫu nhiên tập con đặc trưng ở mỗi lần tách. XGBoost thuộc họ boosting, không phải bagging."
 },
 {
  "id": 13,
  "q": "Kỹ thuật nào sau đây được sử dụng để giảm ảnh hưởng của nhiễu và ngoại lệ trong tập dữ liệu?",
  "options": [
   "Phân tích thành phần chính (Principal Component Analysis - PCA)",
   "Chính quy hóa (Regularization)",
   "Xác thực chéo (Cross-validation)",
   "Trích xuất đặc trưng (Feature extraction)"
  ],
  "answer": 1,
  "explain": "Chính quy hóa (L1/L2…) phạt trọng số lớn, ngăn mô hình \"học thuộc\" nhiễu và ngoại lệ, từ đó giảm ảnh hưởng của chúng. Cross-validation chỉ để đánh giá; PCA và trích xuất đặc trưng chủ yếu nhằm giảm chiều."
 },
 {
  "id": 14,
  "q": "Trong xử lý ngôn ngữ tự nhiên, đâu là thứ tự đúng của các bước xử lý cơ bản sau đây?<ol><li>Tách từ (Tokenization)</li><li>Chuẩn hóa văn bản (Normalization)</li><li>Rút gọn từ (Stemming)</li><li>Gán nhãn từ loại (Part-of-speech tagging)</li></ol>",
  "options": [
   "2 → 1 → 4 → 3",
   "2 → 1 → 3 → 4",
   "1 → 3 → 2 → 4",
   "1 → 2 → 4 → 3"
  ],
  "answer": 1,
  "explain": "Thứ tự thường được dạy: chuẩn hóa văn bản thô (chữ thường, bỏ ký tự đặc biệt) → tách từ → rút gọn từ (stemming) → gán nhãn từ loại.<br><i>Lưu ý:</i> trong thực tế nhiều pipeline gán POS trước khi stemming vì POS tagger cần dạng từ đầy đủ. Đây là đáp án tham khảo theo cách trình bày phổ biến trong giáo trình."
 },
 {
  "id": 15,
  "q": "Tại sao learning rate thích ứng lại hữu ích trong thực tế?",
  "options": [
   "Làm mô hình huấn luyện ngẫu nhiên hơn",
   "Tự động điều chỉnh tốc độ học theo tham số cụ thể",
   "Tránh tràn số",
   "Hạn chế overfitting"
  ],
  "answer": 1,
  "explain": "Adaptive learning rate (AdaGrad, RMSProp, Adam) điều chỉnh bước học riêng cho từng tham số dựa trên lịch sử gradient. Tham số có gradient lớn hoặc thường xuyên thì bước nhỏ lại, tham số thưa thì bước lớn hơn, giúp hội tụ ổn định mà ít phải dò lr."
 },
 {
  "id": 16,
  "q": "An là một học sinh giỏi toán. Khi biết rằng các mô hình ngôn ngữ lớn (LLM) có thể giải được những bài toán phức tạp, An đã thử nghiệm nhưng kết quả không như mong đợi. Tuy nhiên, sau khi tìm hiểu và áp dụng kỹ thuật Chain-of-Thought, An nhận thấy mô hình bắt đầu giải đúng nhiều bài toán hơn. Vậy, kỹ thuật Chain-of-Thought là gì?",
  "options": [
   "Yêu cầu mô hình trả lời càng ngắn gọn càng tốt để tiết kiệm tài nguyên",
   "Huấn luyện mô hình dự đoán từ tiếp theo bằng dữ liệu song ngữ",
   "Yêu cầu mô hình sinh câu hỏi thay vì câu trả lời",
   "Thúc đẩy mô hình giải bài toán bằng cách liệt kê từng bước suy luận trung gian"
  ],
  "answer": 3,
  "explain": "Chain-of-Thought prompting yêu cầu mô hình trình bày từng bước suy luận trung gian (\"Let's think step by step\") trước khi đưa ra đáp án, nhờ đó cải thiện mạnh các bài toán nhiều bước như toán học."
 },
 {
  "id": 17,
  "q": "Trọng số các thuộc tính trong k-NN được được thực hiện bằng:",
  "options": [
   "Cập nhật giá trị thuộc tính của mẫu dữ liệu theo các trọng số khác nhau",
   "Thuộc tính quan trọng hơn được thêm vào bởi trọng số lớn hơn",
   "Điều chỉnh phép tính khoảng cách bằng cách nhân từng thuộc tính với trọng số",
   "Một ma trận trọng số được sử dụng để tính toán các hàng xóm"
  ],
  "answer": 2,
  "explain": "k-NN có trọng số thuộc tính dùng khoảng cách có trọng số, ví dụ d(x, y) = √(Σ wⱼ (xⱼ − yⱼ)²). Mỗi thuộc tính được nhân với trọng số trong phép tính khoảng cách, dữ liệu gốc giữ nguyên."
 },
 {
  "id": 18,
  "q": "Chúng ta muốn phân 7 điểm dữ liệu vào trong 3 cụm sử dụng thuật toán K-means (với khoảng cách Euclid). Giả sử rằng sau vòng lặp đầu tiên, các cụm C1, C2 và C3 chứa các điểm dữ liệu sau (trong không gian 2 chiều): C1 chứa 2 điểm dữ liệu: (0,6), (6,0); C2 chứa 3 điểm dữ liệu: (2,2), (4,4), (6,6); C3 chứa 2 điểm dữ liệu: (5,5), (7,7). Tâm của 3 cụm sẽ là?",
  "options": [
   "C1: (0,0), C2: (48,48), C3: (35,35)",
   "C1: (3,3), C2: (4,4), C3: (6,6)",
   "C1: (6,6), C2: (12,12), C3: (12,12)",
   "C1: (3,3), C2: (6,6), C3: (12,12)"
  ],
  "answer": 1,
  "explain": "Tâm cụm là trung bình các điểm trong cụm:<br>• C1: ((0+6)/2, (6+0)/2) = (3, 3)<br>• C2: ((2+4+6)/3, (2+4+6)/3) = (4, 4)<br>• C3: ((5+7)/2, (5+7)/2) = (6, 6)"
 },
 {
  "id": 19,
  "q": "GloVe là một phương pháp nhúng từ (word embedding). Phát biểu nào sau đây mô tả đúng cách mà nhúng từ GloVe được tạo ra?",
  "options": [
   "Được tạo ra trong quá trình dịch máy",
   "Sử dụng cơ chế chú ý (attention) để tạo vector",
   "Được huấn luyện từ ma trận đồng xuất hiện (co-occurrence matrix) toàn cục",
   "Một dạng vector gồm các số 0 và một số 1 (one-hot vector)"
  ],
  "answer": 2,
  "explain": "GloVe (Global Vectors) phân rã ma trận đồng xuất hiện toàn cục của toàn bộ corpus, học vector sao cho tích vô hướng xấp xỉ log tần suất đồng xuất hiện. Khác với Word2Vec vốn học từ cửa sổ ngữ cảnh cục bộ."
 },
 {
  "id": 20,
  "q": "Mô hình BERT nhận đầu vào là gì?",
  "options": [
   "Vector ID, mặt nạ chú ý (attention mask), ID loại token",
   "Chỉ văn bản thô (raw text)",
   "Cặp câu với nhúng (embedding)",
   "Từ rời rạc"
  ],
  "answer": 0,
  "explain": "BERT nhận các tensor số: <code>input_ids</code> (ID token theo WordPiece), <code>attention_mask</code> (phân biệt token thật và padding) và <code>token_type_ids</code> (phân biệt câu A/B). Văn bản thô phải qua tokenizer trước."
 },
 {
  "id": 21,
  "q": "Nếu muốn sử dụng GPT để sinh câu trả lời dựa trên một đoạn văn, mô hình nào phù hợp nhất?",
  "options": [
   "BERT",
   "GPT-2",
   "GPT-Neo",
   "GPT-3.5 hoặc GPT-4 với gợi ý phù hợp"
  ],
  "answer": 3,
  "explain": "Sinh câu trả lời dựa trên đoạn văn (đọc hiểu, RAG) cần mô hình sinh mạnh và đã được instruction-tune. GPT-3.5/GPT-4 kèm prompt chứa đoạn văn là phù hợp nhất. BERT là encoder, không sinh văn bản; GPT-2 và GPT-Neo yếu hơn và chưa được tinh chỉnh theo chỉ dẫn."
 },
 {
  "id": 22,
  "q": "Nếu thêm bỏ ngẫu nhiên (dropout) vào mô hình nhưng độ chính xác kiểm tra (validation accuracy) giảm mạnh, bạn nên thử gì đầu tiên?",
  "options": [
   "Dùng bộ tối ưu khác",
   "Giảm xác suất bỏ ngẫu nhiên xuống nhỏ hơn",
   "Tắt bỏ ngẫu nhiên",
   "Tăng xác suất bỏ ngẫu nhiên lên 0.8"
  ],
  "answer": 1,
  "explain": "Validation accuracy giảm mạnh sau khi thêm dropout thường do tỉ lệ dropout quá cao, mô hình bị underfit. Bước đầu hợp lý là giảm p (ví dụ 0.5 xuống 0.2–0.3) thay vì tắt hẳn hay đổi optimizer."
 },
 {
  "id": 23,
  "q": "Trong bài toán phân loại văn bản, nếu mô hình học tốt các từ khóa rõ ràng nhưng không hiểu ngữ cảnh, phương pháp nào giúp cải thiện khả năng hiểu ngữ cảnh?",
  "options": [
   "Giảm số chiều nhúng (embedding)",
   "Dùng mô hình dựa trên chú ý (attention-based) như BERT",
   "Chuyển sang dùng TF-IDF",
   "Bỏ nhúng (embedding), dùng vector gồm các số 0 và một số 1 (one-hot vector)"
  ],
  "answer": 1,
  "explain": "Mô hình attention như BERT tạo biểu diễn ngữ cảnh: nghĩa của mỗi từ phụ thuộc vào các từ xung quanh (self-attention hai chiều). TF-IDF, one-hot hay giảm chiều embedding đều làm mất thông tin ngữ cảnh."
 },
 {
  "id": 24,
  "q": "Giả sử bạn sử dụng phương pháp 1-láng giềng gần nhất (1-NN) để dự đoán nhãn lớp cho dữ liệu <i>x</i>, dựa trên tập huấn luyện <i>D</i> và thước đo khoảng cách <i>d</i>. 1-NN sẽ đưa ra dự đoán nào cho <i>x</i>?",
  "options": [
   "<i>y</i>* trong đó (<i>a</i>*, <i>y</i>*) = <i>arg</i> min<sub>(a,y)∈D</sub> <i>d</i>(<i>x</i>, <i>y</i>)",
   "<i>y</i>* trong đó (<i>a</i>*, <i>y</i>*) = <i>arg</i> min<sub>(a,y)∈D</sub> <i>d</i>(<i>x</i>, <i>a</i>)",
   "<i>a</i>* trong đó (<i>a</i>*, <i>y</i>*) = <i>arg</i> min<sub>(a,y)∈D</sub> <i>d</i>(<i>x</i>, <i>a</i>)",
   "<i>y</i>* trong đó (<i>a</i>*, <i>y</i>*) = min<sub>(a,y)∈D</sub> <i>d</i>(<i>x</i>, <i>a</i>)"
  ],
  "answer": 1,
  "explain": "1-NN tìm mẫu (a*, y*) trong D có đặc trưng a gần x nhất, tức là arg min theo d(x, a), rồi trả về nhãn y*. A sai vì so khoảng cách với nhãn y; C trả về đặc trưng a* chứ không phải nhãn; D dùng min (trả về giá trị khoảng cách) thay vì arg min."
 },
 {
  "id": 25,
  "q": "Xét tập huấn luyện gồm 8 mẫu dưới đây. Mỗi mẫu được mô tả bằng 3 đặc trưng số (F1, F2, F3) và thuộc về một trong ba lớp.<div class=\"tbl\"><table><tr><th>ID</th><th>F1</th><th>F2</th><th>F3</th><th>Lớp</th></tr><tr><td>S1</td><td>2</td><td>2</td><td>0</td><td>Đỏ</td></tr><tr><td>S2</td><td>1</td><td>3</td><td>1</td><td>Đỏ</td></tr><tr><td>S3</td><td>0</td><td>2</td><td>2</td><td>Đỏ</td></tr><tr><td>S4</td><td>8</td><td>7</td><td>7</td><td>Xanh dương</td></tr><tr><td>S5</td><td>9</td><td>6</td><td>6</td><td>Xanh dương</td></tr><tr><td>S6</td><td>7</td><td>7</td><td>8</td><td>Xanh dương</td></tr><tr><td>S7</td><td>5</td><td>2</td><td>5</td><td>Xanh lá</td></tr><tr><td>S8</td><td>6</td><td>1</td><td>4</td><td>Xanh lá</td></tr></table></div>Sử dụng k-NN với khoảng cách Euclid và k = 3, lớp nào sẽ được dự đoán cho điểm truy vấn Q = (6, 2, 6)?",
  "options": [
   "Xanh dương",
   "Đỏ",
   "Xanh lá",
   "Hòa thuật toán không thể quyết định"
  ],
  "answer": 2,
  "explain": "Bình phương khoảng cách Euclid tới Q = (6,2,6):<br>S1: 52, S2: 51, S3: 52, S4: 30, S5: 25, S6: 30, <b>S7: 2</b>, <b>S8: 5</b>.<br>Ba láng giềng gần nhất: S7 (Xanh lá), S8 (Xanh lá), S5 (Xanh dương). Bỏ phiếu 2–1 nên dự đoán Xanh lá."
 },
 {
  "id": 26,
  "q": "Hình dưới đây biểu thị bản đồ đặc trưng (feature map) thu được sau khi áp dụng một bộ lọc Conv2D lên ảnh đầu vào kích thước 128 × 128.<figure><img src=\"img/q26.png\" alt=\"Bản đồ đặc trưng có các vệt sáng ngang và dọc\" loading=\"lazy\"></figure>Hãy cho biết bộ lọc này đang phát hiện đặc trưng gì nhất?",
  "options": [
   "Các mẫu bề mặt (texture patterns)",
   "Các đốm màu (color blobs)",
   "Các cạnh theo hướng kết hợp ngang và dọc (cross directional edges)",
   "cạnh theo hướng ngang (horizontal edges)"
  ],
  "answer": 2,
  "explain": "Feature map có các vệt sáng chạy cả theo phương ngang lẫn phương dọc, giao nhau như lưới. Bộ lọc phản ứng với cạnh theo cả hai hướng, không chỉ hướng ngang. Không có đốm màu hay hoa văn bề mặt rõ rệt."
 },
 {
  "id": 27,
  "q": "Cho đoạn mã dưới đây, kích thước của <code>output_tensor</code> là bao nhiêu?<figure><img src=\"img/q27.png\" alt=\"Mã TensorFlow Conv2D\" loading=\"lazy\"></figure>",
  "options": [
   "(1, 16, 16, 32)",
   "(1, 16, 16, 3)",
   "(1, 14, 14, 32)",
   "(1, 32, 32, 32)"
  ],
  "answer": 0,
  "explain": "Với <code>padding='same'</code>, kích thước ra = ⌈32 / 2⌉ = 16 (không phụ thuộc kernel 5×5). Số kênh ra = filters = 32. TensorFlow dùng định dạng NHWC nên shape là (1, 16, 16, 32)."
 },
 {
  "id": 28,
  "q": "Mục đích chính của lấy mẫu phủ định (Negative Sampling) trong huấn luyện mô hình vectơ từ là gì?",
  "options": [
   "Tăng số lượng tham số của mô hình.",
   "Giúp mô hình sinh ra văn bản dài hơn và tự nhiên hơn.",
   "Giúp cải thiện độ chính xác mô hình.",
   "Giảm chi phí tính toán khi huấn luyện trên tập từ vựng lớn."
  ],
  "answer": 3,
  "explain": "Softmax đầy đủ trên toàn bộ từ vựng (hàng trăm nghìn từ) rất tốn kém. Negative Sampling chỉ cập nhật cặp dương và vài mẫu âm (5–20 từ), biến bài toán thành nhiều bài phân loại nhị phân nhỏ, giảm mạnh chi phí tính toán."
 },
 {
  "id": 29,
  "q": "Khi sử dụng bộ tối ưu Adam, nếu mất mát huấn luyện (training loss) ngừng giảm sớm (plateau), bạn nên thử gì tiếp theo?",
  "options": [
   "Đặt lại toàn bộ mô hình",
   "Tăng kích thước lô (batch size)",
   "Bỏ chuẩn hóa lô (BatchNorm)",
   "Giảm tỷ lệ học (learning rate) hoặc thử lại với SGD"
  ],
  "answer": 3,
  "explain": "Loss chững lại (plateau) với Adam thường do lr hiện tại quá lớn để vào sâu cực tiểu. Giảm lr (ReduceLROnPlateau, cosine decay) hoặc chuyển sang SGD + momentum, vốn thường hội tụ tốt hơn ở giai đoạn cuối."
 },
 {
  "id": 30,
  "q": "Học tự giám sát (self-supervised learning) thường sử dụng phương pháp nào?",
  "options": [
   "Đầu phân loại (classification head)",
   "Phân cụm (clustering)",
   "Tăng cường dữ liệu (augmentation) và mất mát đối lập (contrastive loss)",
   "Gắn nhãn thủ công"
  ],
  "answer": 2,
  "explain": "Self-supervised learning tự tạo tín hiệu giám sát từ dữ liệu không nhãn. Cách tiếp cận tiêu biểu (SimCLR, MoCo) là tạo nhiều view bằng augmentation rồi dùng contrastive loss kéo các view của cùng ảnh lại gần nhau. Gắn nhãn thủ công là học có giám sát."
 },
 {
  "id": 31,
  "q": "Chuẩn hóa rất quan trọng đối với k-NN vì",
  "options": [
   "Giúp tránh được vấn đề một thuộc tính có thể đóng vai trò quyết định, lấn át các thuộc tính khác.",
   "Nó biến đổi các giá trị thuộc tính thành phạm vi [0, 1] để dễ dàng tính toán.",
   "Nó cho phép so sánh và phân tích có ý nghĩa giữa các biến.",
   "Nó cần thiết để tính toán khoảng cách giữa các mẫu dữ liệu."
  ],
  "answer": 0,
  "explain": "k-NN dựa vào khoảng cách. Thuộc tính có thang đo lớn (thu nhập hàng triệu) sẽ áp đảo thuộc tính thang nhỏ (tuổi), khiến khoảng cách gần như chỉ phụ thuộc một thuộc tính. Chuẩn hóa đưa các thuộc tính về cùng thang đo."
 },
 {
  "id": 32,
  "q": "Cho bản đồ đặc trưng sau. Giá trị ở vị trí (0,0) của bản đồ đặc trưng đầu ra sau khi áp dụng lớp gộp trung bình (Average Pooling) với kích thước cửa sổ 3 × 3 và bước nhảy 2 là:<pre>[[10,  20,  30,  40],\n [50,  60,  70,  80],\n [90,  100, 110, 120],\n [130, 140, 150, 160]]</pre>",
  "options": [
   "55",
   "70",
   "60",
   "50"
  ],
  "answer": 2,
  "explain": "Cửa sổ 3×3 tại (0,0) gồm: 10, 20, 30, 50, 60, 70, 90, 100, 110.<br>Tổng = 540, trung bình = 540 / 9 = <b>60</b>."
 },
 {
  "id": 33,
  "q": "Chương trình sau thực hiện:<ul><li>Tải ResNet-50 pre-trained trên ImageNet.</li><li>Đóng băng toàn bộ các layer convolution.</li><li>Lấy output của lớp avgpool (shape (2048,1,1)) và flatten thành vector 2048.</li></ul><figure><img src=\"img/q33.png\" alt=\"Mã PyTorch ResNet-50\" loading=\"lazy\"></figure>Bạn thiếu dòng nào dưới đây để trả về véc-tơ đặc trưng (feature vector)?",
  "options": [
   "features = model(x)",
   "features = model.layer4(x)",
   "features = model.avgpool(x)",
   "features = x"
  ],
  "answer": 0,
  "explain": "Vì <code>model.fc</code> đã thay bằng <code>Identity()</code>, gọi <code>model(x)</code> chạy toàn bộ mạng tới avgpool, flatten rồi đi qua Identity, cho ra vector shape (1, 2048). B và C áp từng lớp riêng lẻ lên ảnh thô (sai số kênh), D chỉ trả lại ảnh đầu vào."
 },
 {
  "id": 34,
  "q": "Bạn muốn sử dụng một mô hình Mạng Nơ-ron Tích chập (CNN) cho nhiệm vụ phân tích ảnh viễn thám (ảnh chụp từ vệ tinh, máy bay). Bạn có hai lựa chọn:<ul><li><b>Huấn luyện từ đầu:</b> xây dựng và huấn luyện một CNN hoàn toàn mới chỉ với bộ dữ liệu ảnh viễn thám (kích thước trung bình).</li><li><b>Tinh chỉnh (Fine-tuning):</b> lấy một CNN đã huấn luyện trước trên tập ảnh tự nhiên lớn (ví dụ ImageNet) và tinh chỉnh cho bộ dữ liệu viễn thám.</li></ul>So với việc huấn luyện từ đầu, tinh chỉnh mang lại nhiều lợi ích. Tuy nhiên, điều nào dưới đây <b>KHÔNG</b> phải là một ưu điểm điển hình của việc tinh chỉnh trong tình huống này?",
  "options": [
   "Giảm nguy cơ quá khớp (overfitting) vì có ít tham số cần cập nhật",
   "Khắc phục được hoàn toàn được vấn đề về sự khác biệt giữa đặc điểm ảnh tự nhiên và ảnh viễn thám.",
   "Mô hình hội tụ nhanh hơn do kế thừa trọng số đặc trưng cơ bản",
   "Tận dụng đặc trưng cấp thấp tổng quát"
  ],
  "answer": 1,
  "explain": "Fine-tune giúp hội tụ nhanh, tận dụng đặc trưng cấp thấp (cạnh, góc, texture) và giảm overfit. Nhưng nó không khắc phục <i>hoàn toàn</i> được khác biệt miền (domain gap) giữa ảnh tự nhiên và ảnh viễn thám (góc nhìn từ trên xuống, đa phổ, tỉ lệ khác). Chữ \"hoàn toàn\" khiến B sai."
 },
 {
  "id": 35,
  "q": "Một bộ lọc hình vuông, mỗi cạnh dài <i>k</i> ô vuông, được dùng để quét qua một bức ảnh có chiều ngang <i>m</i> ô và chiều dọc <i>n</i> ô (<i>m</i>, <i>n</i> &gt; <i>k</i>). Mỗi lần quét, bộ lọc dịch chuyển 2 ô theo cả chiều ngang lẫn chiều dọc, không thêm lớp đệm (padding). Bản đồ đặc trưng đầu ra có kích thước bao nhiêu ô chiều ngang và bao nhiêu ô chiều dọc?",
  "options": [
   "(<span class=\"frac\"><span><i>m</i></span><span>2</span></span>, <span class=\"frac\"><span><i>n</i></span><span>2</span></span>)",
   "(⌊<span class=\"frac\"><span><i>m</i> − <i>k</i></span><span>2</span></span>⌋ + 1, ⌊<span class=\"frac\"><span><i>n</i> − <i>k</i></span><span>2</span></span>⌋ + 1)",
   "(<span class=\"frac\"><span><i>m</i> − <i>k</i></span><span>2</span></span> + <i>k</i>, <span class=\"frac\"><span><i>n</i> − <i>k</i></span><span>2</span></span> + <i>k</i>)",
   "(<span class=\"frac\"><span><i>m</i> − <i>k</i> + 1</span><span>2</span></span>, <span class=\"frac\"><span><i>n</i> − <i>k</i> + 1</span><span>2</span></span>)"
  ],
  "answer": 1,
  "explain": "Công thức kích thước đầu ra: ⌊(W − K + 2P) / S⌋ + 1. Với P = 0, S = 2: ngang ⌊(m − k)/2⌋ + 1, dọc ⌊(n − k)/2⌋ + 1."
 },
 {
  "id": 36,
  "q": "Khi dùng ViT để phân loại ảnh, lớp cuối cùng thường là gì?",
  "options": [
   "Khối chú ý (attention block)",
   "Bỏ ngẫu nhiên (dropout)",
   "Lớp kết nối đầy đủ (fully connected) và hàm Softmax",
   "LSTM"
  ],
  "answer": 2,
  "explain": "ViT lấy embedding của token [CLS] sau các khối Transformer, đưa qua MLP head (lớp fully connected) rồi softmax để ra xác suất các lớp."
 },
 {
  "id": 37,
  "q": "Dựa trên tập dữ liệu trong Bảng 1 dưới đây để xây dựng cây quyết định, hãy tính xấp xỉ entropy <i>H</i>(<i>Passed</i>). Cây quyết định này dự đoán liệu sinh viên có qua môn hay không (T là có, F là không), dựa trên điểm CGPA (H: cao, M: trung bình, L: thấp) và việc có ôn tập hay không (T hoặc F).<div class=\"tbl\"><table><tr><th>CGPA</th><th>Ôn tập</th><th>Qua môn</th></tr><tr><td>H</td><td>F</td><td>T</td></tr><tr><td>H</td><td>T</td><td>T</td></tr><tr><td>M</td><td>F</td><td>F</td></tr><tr><td>M</td><td>T</td><td>T</td></tr><tr><td>L</td><td>F</td><td>F</td></tr><tr><td>L</td><td>T</td><td>T</td></tr></table></div>",
  "options": [
   "0.66",
   "1.92",
   "0.92",
   "1.32"
  ],
  "answer": 2,
  "explain": "Cột \"Qua môn\": 4 T và 2 F trên 6 mẫu.<br>H = −(4/6)·log₂(4/6) − (2/6)·log₂(2/6) ≈ 0.667 × 0.585 + 0.333 × 1.585 ≈ 0.390 + 0.528 = <b>0.918 ≈ 0.92</b>."
 },
 {
  "id": 38,
  "q": "Một bức ảnh thuộc vào một trong hai lớp: 'chó' hoặc 'mèo'. Nhãn thực tế (ground truth label) của ảnh này được biểu diễn dưới dạng one-hot encoding là [0, 1], trong đó vị trí thứ nhất tương ứng với lớp 'chó' và vị trí thứ hai tương ứng với lớp 'mèo'. Mô hình của chúng ta đã dự đoán xác suất cho ảnh này là [0.3, 0.7], nghĩa là xác suất dự đoán là 0.3 cho lớp 'chó' và 0.7 cho lớp 'mèo'. Hãy tính giá trị của hàm mất mát cross-entropy cho dự đoán này, sử dụng logarit tự nhiên (ln). Công thức hàm mất mát như sau:<p class=\"formula\"><i>L</i> = − Σ<sub><i>i</i></sub> <i>y<sub>i</sub></i> · ln(<i>p<sub>i</sub></i>)</p>",
  "options": [
   "0.105",
   "0.247",
   "0.357",
   "0.713"
  ],
  "answer": 2,
  "explain": "Với nhãn one-hot [0, 1], chỉ còn số hạng của lớp \"mèo\":<br>L = −(0·ln 0.3 + 1·ln 0.7) = −ln 0.7 ≈ <b>0.357</b>."
 },
 {
  "id": 39,
  "q": "Khi tinh chỉnh (fine-tune) ResNet34, nếu suy luận (inference) chậm, bạn nên thử gì để tăng tốc độ?",
  "options": [
   "Chuyển sang dùng mô hình nhỏ hơn như MobileNet",
   "Thêm lớp bỏ ngẫu nhiên (dropout) vào suy luận",
   "Tăng số vòng lặp (epoch)",
   "Giảm số lớp (class)"
  ],
  "answer": 0,
  "explain": "Tốc độ suy luận phụ thuộc kích thước và FLOPs của mô hình. MobileNet (depthwise separable conv) nhẹ hơn ResNet34 nhiều. Dropout không dùng khi suy luận, epoch chỉ ảnh hưởng huấn luyện, giảm số lớp gần như không đổi chi phí."
 },
 {
  "id": 40,
  "q": "Khi huấn luyện mạng nơ-ron đa tầng (MLP) bằng phương pháp tối ưu hóa theo lô nhỏ (mini-batch SGD), bạn cần làm gì sau mỗi vòng lặp (epoch) để đảm bảo mô hình học hiệu quả và tránh thiên lệch?",
  "options": [
   "Xáo trộn dữ liệu (shuffle) huấn luyện",
   "Sử dụng toàn bộ dữ liệu (full-batch) để cập nhật trọng số",
   "Đặt lại trọng số về giá trị ban đầu",
   "Chuyển sang sử dụng bộ tối ưu Adam"
  ],
  "answer": 0,
  "explain": "Xáo trộn dữ liệu mỗi epoch giúp các mini-batch khác nhau giữa các epoch, tránh mô hình học theo thứ tự dữ liệu và làm gradient ít bị thiên lệch hơn."
 },
 {
  "id": 41,
  "q": "Với Lấy mẫu phủ định (Negative Sampling) , các mẫu sẽ được chọn như thế nào?",
  "options": [
   "Là các từ có độ tương đồng ngữ nghĩa cao với từ mục tiêu.",
   "Là các từ gần nhất với từ ngữ cảnh trong văn bản.",
   "Là các từ có nhãn đúng trong tập huấn luyện.",
   "Được chọn ngẫu nhiên từ toàn bộ từ vựng, thường theo một phân phối cố định."
  ],
  "answer": 3,
  "explain": "Mẫu âm được lấy ngẫu nhiên từ từ vựng theo phân phối unigram mũ 3/4 (P(w) ∝ f(w)^0.75) trong Word2Vec, không phải các từ tương đồng hay gần ngữ cảnh."
 },
 {
  "id": 42,
  "q": "Cho trước tập dữ liệu không có nhãn gồm N điểm dữ liệu {<i>x</i><sub>1</sub>, <i>x</i><sub>2</sub>, …, <i>x<sub>N</sub></i>}. Chúng ta chạy K-means với 50 lần khởi tạo ngẫu nhiên tâm cụm khác nhau (luôn với cùng số lượng tâm cụm K) và thu được 50 bộ tâm cụm khác nhau. Đâu là cách được gợi ý cho việc chọn 1 kết quả từ 50 kết quả trên để sử dụng?",
  "options": [
   "Chọn kết quả mà <span class=\"frac\"><span>1</span><span>N</span></span> Σ<sub>i=1</sub><sup>N</sup> ‖<i>x<sub>i</sub></i> − <i>m</i><sub><i>z<sub>i</sub></i></sub>‖² đạt giá trị nhỏ nhất trong 50 lần, với <i>m</i><sub><i>z<sub>i</sub></i></sub> là tâm cụm mà <i>x<sub>i</sub></i> được gán vào.",
   "Chọn lần chạy thứ mấy cũng có thể tốt",
   "Luôn chọn lần cuối cùng (thứ 50), vì lần này có khả năng đã hội tụ thành một giải pháp tốt",
   "Chỉ có cách duy nhất để chọn là yêu cầu dữ liệu phải có nhãn <i>y<sub>i</sub></i>"
  ],
  "answer": 0,
  "explain": "Chọn lần chạy có hàm mục tiêu K-means (inertia, tổng bình phương khoảng cách tới tâm cụm, trung bình theo N) nhỏ nhất. K-means chỉ hội tụ tới cực tiểu địa phương nên chạy nhiều lần rồi chọn nghiệm tốt nhất (như <code>n_init</code> trong scikit-learn). Không cần nhãn."
 },
 {
  "id": 43,
  "q": "Sử dụng mô hình ResNet-18 (khoảng 11.7 triệu tham số) đã tiền huấn luyện trên ImageNet. Khi tinh chỉnh, bạn đóng băng toàn bộ phần thân (backbone), chỉ mở băng một khối duy nhất là BasicBlock thứ hai trong layer4, gọi tắt là \"block 4-2\". Khối này gồm hai lớp tích chập 3 × 3:<p class=\"formula\">Conv<sub>1</sub>: 512 → 512 (3×3, s=1) &nbsp;&nbsp; Conv<sub>2</sub>: 512 → 512 (3×3, s=1)</p><ul><li>Không tính tham số bias; bỏ qua FLOPs của BatchNorm, ReLU và kết nối tắt.</li><li>FLOPs ≈ 2 × MACs (một phép nhân và một phép cộng).</li><li>Với ảnh gốc 224 × 224, tensor đi vào \"block 4-2\" có kích thước (Batch=1, Channels=512, Height=7, Width=7).</li></ul>Đâu là đáp án đúng cho tổng số tham số có thể huấn luyện trong \"block 4-2\" và tổng FLOPs để thực thi riêng khối này với đầu vào (1, 512, 7, 7)?",
  "options": [
   "11.7M; 1.8GFLOPs",
   "4.7M; 0.46GFLOPs",
   "0.50M; 0.05GFLOPs",
   "8.4M; 0.82GFLOPs"
  ],
  "answer": 1,
  "explain": "<b>Tham số:</b> mỗi conv 3×3×512×512 = 2,359,296; hai conv ≈ 4,718,592 ≈ <b>4.7M</b>.<br><b>FLOPs:</b> MACs mỗi conv = 2,359,296 × 7 × 7 ≈ 115.6M; hai conv ≈ 231.2M MACs. FLOPs ≈ 2 × 231.2M ≈ <b>0.46 GFLOPs</b>."
 },
 {
  "id": 44,
  "q": "Tỷ lệ học thích ứng (adaptive learning rate) như AdaGrad, RMSProp, Adam giúp gì cho mô hình?",
  "options": [
   "Giảm kích thước mô hình",
   "Tăng kích thước lô (batch size)",
   "Giảm số vòng lặp (epoch) cần thiết",
   "Tự động điều chỉnh tốc độ học cho từng tham số"
  ],
  "answer": 3,
  "explain": "Đặc điểm chung của AdaGrad, RMSProp và Adam là tự điều chỉnh learning rate riêng cho từng tham số dựa trên độ lớn gradient trong quá khứ."
 },
 {
  "id": 45,
  "q": "Trong tối ưu hóa theo lô nhỏ (mini-batch SGD), nếu kích thước lô (batch size) quá nhỏ, hệ quả thường gặp là gì?",
  "options": [
   "Giảm thời gian huấn luyện",
   "Gradient quá nhiễu, gây dao động",
   "Độ chính xác tăng nhanh",
   "Không ảnh hưởng"
  ],
  "answer": 1,
  "explain": "Batch quá nhỏ cho ước lượng gradient phương sai lớn (nhiễu), khiến quá trình tối ưu dao động mạnh. Một chút nhiễu có thể giúp tổng quát hóa, nhưng quá nhỏ thì khó hội tụ và chạy chậm vì không tận dụng được GPU."
 },
 {
  "id": 46,
  "q": "Những chiến lược nào có thể giúp giảm vấn đề quá khớp (overfitting) trong cây quyết định?<ol type=\"i\"><li>Giới hạn độ sâu tối đa của cây</li><li>Áp đặt số lượng mẫu tối thiểu tại các nút lá</li><li>Cắt tỉa cây (pruning)</li><li>Đảm bảo mỗi nút lá chứa duy nhất một lớp</li></ol>",
  "options": [
   "Không có lựa chọn nào đúng",
   "Tất cả",
   "(i), (ii) và (iii)",
   "(i), (iii), (iv)"
  ],
  "answer": 2,
  "explain": "(i) giới hạn độ sâu, (ii) số mẫu tối thiểu ở lá và (iii) cắt tỉa đều hạn chế độ phức tạp của cây. (iv) ép mỗi lá chỉ còn một lớp (lá thuần khiết hoàn toàn) chính là nguyên nhân gây overfitting."
 },
 {
  "id": 47,
  "q": "Một nơ-ron có 3 đầu vào với trọng số lần lượt là 1, 4 và 3, không có bias. Hàm truyền là hàm tuyến tính với hằng số tỷ lệ bằng 3. Các đầu vào lần lượt là 4, 8 và 5. Đầu ra sẽ là bao nhiêu?",
  "options": [
   "162",
   "153",
   "139",
   "160"
  ],
  "answer": 1,
  "explain": "Tổng có trọng số: 1·4 + 4·8 + 3·5 = 4 + 32 + 15 = 51.<br>Hàm truyền tuyến tính hệ số 3: 3 × 51 = <b>153</b>."
 },
 {
  "id": 48,
  "q": "Gradient của hàm số 2<i>x</i>² − 3<i>y</i>² + 4<i>y</i> − 10 tại điểm (0, 0) là gì?",
  "options": [
   "1i + 10j",
   "2i - 3j",
   "-3i + 4j",
   "0i + 4j"
  ],
  "answer": 3,
  "explain": "∂f/∂x = 4x, ∂f/∂y = −6y + 4.<br>Tại (0, 0): ∇f = (0, 4) = 0i + 4j."
 },
 {
  "id": 49,
  "q": "Khi huấn luyện mô hình phân loại nhiều lớp với tập dữ liệu mất cân bằng về nhãn lớp, nếu lớp hiếm (ít dữ liệu huấn luyện) gần như không được dự đoán, cách xử lý phù hợp là gì?",
  "options": [
   "Giảm số vòng lặp (epoch)",
   "Xóa lớp hiếm khỏi dữ liệu",
   "Tăng bỏ ngẫu nhiên (dropout)",
   "Sử dụng hàm mất mát có trọng số"
  ],
  "answer": 3,
  "explain": "Dùng loss có trọng số (class weights, ví dụ trọng số tỉ lệ nghịch với tần suất lớp, hoặc focal loss) để phạt nặng hơn khi dự đoán sai lớp hiếm. Có thể kết hợp oversampling. Xóa lớp hiếm là bỏ qua bài toán."
 },
 {
  "id": 50,
  "q": "Khi tinh chỉnh (fine-tune) MobileNetV2 trên tập dữ liệu nhỏ, bước đầu tiên bạn nên làm là gì để tối ưu hóa hiệu suất?",
  "options": [
   "Tăng số lớp",
   "Thay toàn bộ mô hình",
   "Đóng băng (freeze) các lớp đầu tiên",
   "Tăng tỷ lệ học (learning rate)"
  ],
  "answer": 2,
  "explain": "Với dữ liệu nhỏ, đóng băng các lớp đầu (vốn học đặc trưng tổng quát: cạnh, màu) và chỉ huấn luyện các lớp cuối/đầu phân loại. Cách này giảm số tham số cần học và tránh overfit. Tăng lr dễ phá hỏng trọng số pretrained."
 },
 {
  "id": 51,
  "q": "Khi huấn luyện bằng PyTorch, nếu GPU bị đầy bộ nhớ (Out-of-Memory - OOM), bạn nên thử gì đầu tiên?",
  "options": [
   "Chuyển sang dùng CPU",
   "Thêm bỏ ngẫu nhiên (dropout)",
   "Dùng mô hình lớn hơn",
   "Giảm kích thước lô (batch size) hoặc dùng tích lũy gradient (gradient accumulation)"
  ],
  "answer": 3,
  "explain": "OOM chủ yếu do activation tỉ lệ với batch size. Giảm batch size là bước đầu; gradient accumulation giữ batch hiệu dụng lớn. Có thể kết hợp mixed precision (AMP). Chuyển sang CPU quá chậm, mô hình lớn hơn càng tốn bộ nhớ."
 },
 {
  "id": 52,
  "q": "Phương pháp nào sau đây KHÔNG thuộc nhóm học có giám sát?",
  "options": [
   "Cây quyết định",
   "Hồi quy tuyến tính với Ridge",
   "Naive Bayes",
   "K-means"
  ],
  "answer": 3,
  "explain": "K-means là phân cụm, thuộc học không giám sát (không dùng nhãn). Cây quyết định, Ridge regression và Naive Bayes đều học từ dữ liệu có nhãn."
 },
 {
  "id": 53,
  "q": "Phát biểu nào sau đây là đúng về giải thuật học láng giềng gần nhất?",
  "options": [
   "Chỉ được sử dụng cho bài toán hồi quy",
   "Thuộc lớp bài toán học tham số",
   "Chỉ được sử dụng cho bài toán phân loại",
   "Được sử dụng cho cả bài toán phân loại và bài toán hồi quy"
  ],
  "answer": 3,
  "explain": "k-NN dùng được cho cả phân loại (bỏ phiếu đa số) và hồi quy (trung bình giá trị láng giềng). Đây là phương pháp phi tham số (non-parametric) nên B sai."
 },
 {
  "id": 54,
  "q": "Mục đích chính của việc tăng cường dữ liệu trong huấn luyện mô hình học máy/học sâu là gì?",
  "options": [
   "Tăng tốc độ huấn luyện mô hình",
   "Giảm số lượng tham số của mô hình",
   "Giảm kích thước vật lý của tập dữ liệu gốc",
   "Cải thiện khả năng tổng quát hóa của mô hình"
  ],
  "answer": 3,
  "explain": "Data augmentation tạo biến thể hợp lý của dữ liệu (xoay, lật, cắt, đổi màu…) để mô hình học đặc trưng bất biến, giảm overfit và tổng quát hóa tốt hơn. Nó thường làm huấn luyện lâu hơn chứ không nhanh hơn."
 },
 {
  "id": 55,
  "q": "Khi sử dụng BertTokenizer từ Hugging Face, điều nào sau đây đúng?",
  "options": [
   "Bộ mã hóa không hỗ trợ lô (batch)",
   "tokenizer.encode_plus() trả về input_ids, attention_mask",
   "BERT chỉ dùng cho tiếng Anh",
   "Bộ mã hóa (tokenizer) không cần đệm (padding)"
  ],
  "answer": 1,
  "explain": "<code>encode_plus()</code> trả về dict gồm <code>input_ids</code>, <code>attention_mask</code> (và <code>token_type_ids</code>). Tokenizer hỗ trợ batch và padding; có BERT đa ngôn ngữ (mBERT) và PhoBERT cho tiếng Việt."
 },
 {
  "id": 56,
  "q": "Dưới đây là một số lựa chọn để có thể thực hiện khi huấn luyện mạng nơ-ron. Đâu là trường hợp sẽ khiến mạng của bạn KHÓ đạt được độ chính xác cao trong tương lai?",
  "options": [
   "Đảo ngẫu nhiên lại dữ liệu khi bắt đầu mỗi epoch",
   "Khởi tạo tất cả bộ tham số bằng 0",
   "Sử dụng momentum",
   "Sử dụng Dropout"
  ],
  "answer": 1,
  "explain": "Khởi tạo mọi trọng số bằng 0 gây vấn đề đối xứng: mọi nơ-ron trong cùng lớp nhận cùng gradient và mãi giống nhau, mạng không học được đặc trưng đa dạng. Shuffle, momentum và dropout đều có lợi."
 },
 {
  "id": 57,
  "q": "Trong mô hình SSD, hộp neo (anchor boxes) có vai trò gì?",
  "options": [
   "Định nghĩa trước các tỷ lệ và kích thước hộp",
   "Làm nhẹ mô hình",
   "Làm tăng số lớp",
   "Tăng độ phân giải ảnh"
  ],
  "answer": 0,
  "explain": "Anchor (default) boxes trong SSD là các hộp định nghĩa sẵn với nhiều tỉ lệ khung (aspect ratio) và kích thước ở mỗi vị trí trên nhiều feature map. Mô hình dự đoán độ lệch so với anchor và lớp của đối tượng."
 },
 {
  "id": 58,
  "q": "Quan sát hai ma trận nhầm lẫn (Confusion Matrix) dưới đây, nhận định nào sau đây là chính xác nhất?<figure><img src=\"img/q58.png\" alt=\"Ma trận nhầm lẫn tập Train và Test\" loading=\"lazy\"></figure>",
  "options": [
   "Mô hình có dấu hiệu quá khớp (Overfiting)",
   "Mô hình có dấu hiệu kém khớp (Underfitting).",
   "Độ chính xác trên tập kiểm thử và huấn luyện là gần như tương đương nhau.",
   "Sai số chỉ do phân bố lớp khác nhau giữa hai tập."
  ],
  "answer": 0,
  "explain": "Độ chính xác tập Train: (450+430+460+470) / 1864 ≈ 97%.<br>Độ chính xác tập Test: (80+70+65+70) / 400 ≈ 71%.<br>Khoảng cách lớn (≈26 điểm) giữa train và test là dấu hiệu quá khớp. Underfitting sẽ cho kết quả kém trên cả hai tập."
 },
 {
  "id": 59,
  "q": "Entropy cao có nghĩa là các phần phân chia trong thuật toán cây quyết định ID3 thì",
  "options": [
   "Thuần khiết (Pure): Các điểm dữ liệu ở mỗi nhánh của cây quyết định tập trung đa số vào một lớp",
   "Không có ý nghĩa gì",
   "Không thuần khiết (Not pure): Các điểm dữ liệu ở mỗi nhánh của cây quyết định phân bố tương đối đều vào các lớp",
   "Có thể suy ra độ đo F1-score cao"
  ],
  "answer": 2,
  "explain": "Entropy cao nghĩa là dữ liệu trong nút phân bố đều giữa các lớp (không thuần khiết). ID3 chọn thuộc tính có information gain lớn nhất, tức là giảm entropy nhiều nhất."
 },
 {
  "id": 60,
  "q": "Mục đích của việc thêm nhiễu Gaussian vào dữ liệu đầu vào khi huấn luyện là gì?",
  "options": [
   "Giảm số lớp cần thiết",
   "Tăng tính ổn định và khả năng chống nhiễu",
   "Giảm thời gian huấn luyện",
   "Tăng độ chính xác"
  ],
  "answer": 1,
  "explain": "Thêm nhiễu Gaussian vào đầu vào là một dạng regularization/augmentation, giúp mô hình bền vững với nhiễu và nhiễu loạn nhỏ, tổng quát hóa tốt hơn."
 },
 {
  "id": 61,
  "q": "Khi huấn luyện mạng GAN, nếu bộ tạo (generator) tạo ra ảnh toàn màu xám, nguyên nhân có thể là gì?",
  "options": [
   "Mất mát (loss) quá nhỏ",
   "Tỷ lệ học (learning rate) quá nhỏ",
   "Kích thước lô (batch size) quá lớn",
   "Mất cân bằng giữa bộ phân biệt (discriminator) và bộ tạo (generator)"
  ],
  "answer": 3,
  "explain": "Ảnh toàn màu xám (đồng nhất) là dấu hiệu GAN huấn luyện mất cân bằng: discriminator quá mạnh làm gradient cho generator biến mất, hoặc xảy ra mode collapse. Generator rơi vào nghiệm \"trung bình\" và tạo ảnh xám."
 },
 {
  "id": 62,
  "q": "Trong bài toán phân loại văn bản, nếu mô hình học tốt các từ khóa rõ ràng nhưng không hiểu ngữ cảnh, phương pháp nào giúp cải thiện khả năng hiểu ngữ cảnh?",
  "options": [
   "Dùng mô hình dựa trên chú ý (attention-based) như BERT",
   "Bỏ nhúng (embedding), dùng vector gồm các số 0 và một số 1 (one-hot vector)",
   "Chuyển sang dùng TF-IDF",
   "Giảm số chiều nhúng (embedding)"
  ],
  "answer": 0,
  "explain": "Giống câu 23 (thứ tự phương án bị đảo): mô hình attention-based như BERT tạo biểu diễn phụ thuộc ngữ cảnh, giúp hiểu nghĩa của từ trong câu."
 },
 {
  "id": 63,
  "q": "Nếu mô hình bị học quá mức (overfitting), phương pháp nào nên thử đầu tiên để giảm hiện tượng này?",
  "options": [
   "Tăng số vòng lặp (epoch)",
   "Thêm bỏ ngẫu nhiên (dropout) hoặc tăng suy giảm trọng số (weight decay)",
   "Tăng tỷ lệ học (learning rate)",
   "Giảm kích thước lô (batch size)"
  ],
  "answer": 1,
  "explain": "Biện pháp đầu tiên cho overfitting là regularization: thêm dropout hoặc tăng weight decay (L2). Tăng epoch làm overfit nặng hơn; tăng lr hay đổi batch size không giải quyết trực tiếp."
 },
 {
  "id": 64,
  "q": "Khi huấn luyện, nếu độ chính xác huấn luyện (training accuracy) tăng đều nhưng độ chính xác kiểm tra (validation accuracy) dao động mạnh và không cải thiện, nguyên nhân có thể là gì?",
  "options": [
   "Học quá mức (overfitting) hoặc dữ liệu kiểm tra chưa được xáo trộn kỹ",
   "Không sử dụng bỏ ngẫu nhiên (dropout)",
   "Mô hình quá nhỏ",
   "Số vòng lặp (epoch) quá ít"
  ],
  "answer": 0,
  "explain": "Train accuracy tăng đều trong khi validation dao động và không cải thiện là dấu hiệu overfitting. Ngoài ra tập validation nhỏ hoặc chia không đều/không xáo trộn cũng làm chỉ số dao động mạnh."
 },
 {
  "id": 65,
  "q": "Mục tiêu chính khi tinh chỉnh (fine-tune) mô hình BERT cho bài toán phân loại văn bản là gì?",
  "options": [
   "Tạo nhúng (embedding)",
   "Thay lớp cuối bằng một lớp phân loại",
   "Dùng mô hình sinh",
   "Tạo một bộ mã hóa (tokenizer) mới"
  ],
  "answer": 1,
  "explain": "Fine-tune BERT cho phân loại: thêm lớp phân loại (Linear trên token [CLS]) thay cho đầu pretraining (MLM/NSP), rồi huấn luyện toàn bộ hoặc một phần mạng trên dữ liệu có nhãn."
 },
 {
  "id": 66,
  "q": "Nếu tỷ lệ học (learning rate) quá cao, điều gì có thể xảy ra trong quá trình huấn luyện?",
  "options": [
   "Mô hình dao động và không hội tụ",
   "Tăng khả năng regularization",
   "Hàm mất mát giảm đều đặn",
   "Mô hình hội tụ nhanh hơn"
  ],
  "answer": 0,
  "explain": "Learning rate quá lớn làm các bước cập nhật vượt qua cực tiểu, loss dao động hoặc phân kỳ (có thể thành NaN), mô hình không hội tụ."
 },
 {
  "id": 67,
  "q": "Sự khác biệt giữa tập kiểm tra (test set) và tập xác thực (validation set) là gì?",
  "options": [
   "Tập xác thực là không cần thiết trong học máy.",
   "Tập xác thực dùng để điều chỉnh siêu tham số, còn tập kiểm tra dùng để đánh giá hiệu suất của mô hình.",
   "Tập xác thực và tập kiểm tra là một.",
   "Tập xác thực dùng để đánh giá hiệu suất mô hình trong quá trình huấn luyện, trong khi tập kiểm tra dùng để đánh giá sau khi huấn luyện."
  ],
  "answer": 1,
  "explain": "Validation set dùng để chọn siêu tham số và mô hình (early stopping, tuning). Test set chỉ dùng một lần cuối để đánh giá khách quan hiệu suất trên dữ liệu chưa thấy. D mô tả gần đúng nhưng B nêu đúng vai trò cốt lõi của hai tập."
 },
 {
  "id": 68,
  "q": "Xét một Random Forest gồm <i>K</i> cây cho nhiệm vụ hồi quy. Mỗi cây quyết định <i>i</i> biểu diễn một hàm <i>T<sub>i</sub></i>(<i>x</i>) của đầu vào <i>x</i>. Random Forest này biểu diễn hàm nào sau đây?",
  "options": [
   "<i>y</i>(<i>x</i>) = Σ<sub>i=1</sub><sup>K</sup> <i>T<sub>i</sub></i>(<i>x</i>)",
   "<i>y</i>(<i>x</i>) = max<sub>i∈1,…,K</sub> <i>T<sub>i</sub></i>(<i>x</i>)",
   "<i>y</i>(<i>x</i>) = Σ<sub>i=1</sub><sup>K</sup> <i>T<sub>i</sub></i>(<span class=\"frac\"><span><i>x</i></span><span><i>K</i></span></span>)",
   "<i>y</i>(<i>x</i>) = <span class=\"frac\"><span>1</span><span><i>K</i></span></span> Σ<sub>i=1</sub><sup>K</sup> <i>T<sub>i</sub></i>(<i>x</i>)"
  ],
  "answer": 3,
  "explain": "Random Forest hồi quy lấy trung bình dự đoán của K cây: y(x) = (1/K) Σ Tᵢ(x). Với phân loại thì bỏ phiếu đa số."
 },
 {
  "id": 69,
  "q": "Để tải nhúng từ (embedding) Word2Vec đã được huấn luyện trước trong thư viện gensim, bạn sử dụng lệnh nào?",
  "options": [
   "gensim.models.load(&quot;word2vec&quot;)",
   "import word2vec.load_model(path)",
   "KeyedVectors.load_word2vec_format(path)",
   "spacy.load_word2vec(path)"
  ],
  "answer": 2,
  "explain": "Trong gensim: <code>from gensim.models import KeyedVectors</code> rồi <code>KeyedVectors.load_word2vec_format(path, binary=True)</code> để tải vector Word2Vec định dạng gốc (ví dụ GoogleNews-vectors)."
 },
 {
  "id": 70,
  "q": "Khi sử dụng câu lệnh nn.CrossEntropyLoss trong PyTorch, bạn nên đưa gì vào đối số đầu tiên?",
  "options": [
   "Logits do lớp cuối cùng của mạng tạo ra",
   "Vector gồm các số 0 và một số 1 (one-hot vector) biểu diễn các lớp mục tiêu",
   "Xác suất thu được sau khi áp dụng softmax lên đầu ra của mạng",
   "Log-xác suất sau khi áp dụng log_softmax lên đầu ra của mạng"
  ],
  "answer": 0,
  "explain": "<code>nn.CrossEntropyLoss</code> đã gộp <code>LogSoftmax</code> và <code>NLLLoss</code>, nên đầu vào thứ nhất phải là logits thô. Đưa xác suất sau softmax vào sẽ bị softmax hai lần. Đối số thứ hai thường là chỉ số lớp."
 },
 {
  "id": 71,
  "q": "Trong huấn luyện, nếu mất mát huấn luyện (training loss) giảm nhưng mất mát kiểm tra (validation loss) tăng, điều này cho thấy gì?",
  "options": [
   "Mô hình đang học quá mức (overfitting)",
   "Mô hình đang hội tụ",
   "Cần tăng tỷ lệ học (learning rate)",
   "Mô hình học chưa đủ (underfitting)"
  ],
  "answer": 0,
  "explain": "Training loss giảm nhưng validation loss tăng là định nghĩa kinh điển của overfitting: mô hình học thuộc dữ liệu huấn luyện. Đây là lúc nên dùng early stopping."
 },
 {
  "id": 72,
  "q": "Trong các bài toán phân đoạn ảnh (image segmentation), một thách thức phổ biến là sự mất cân bằng nghiêm trọng giữa các lớp. Ví dụ, diện tích của đối tượng cần phân đoạn (lớp tiền cảnh - foreground) có thể rất nhỏ so với phần còn lại của ảnh (lớp hậu cảnh - background). Khi gặp tình huống mất cân bằng lớp như vậy, hàm mất mát (loss function) nào trong số các lựa chọn dưới đây thường được xem là hiệu quả hơn và được ưu tiên sử dụng thay cho hàm Cross-Entropy (CE) tiêu chuẩn?",
  "options": [
   "Mean Squared Error (MSE)",
   "Hinge Loss",
   "L<sub>1</sub> Loss",
   "Dice Loss hoặc Focal Loss"
  ],
  "answer": 3,
  "explain": "Dice loss tối ưu trực tiếp độ chồng lấn vùng nên ít bị ảnh hưởng bởi số pixel nền. Focal loss giảm trọng số các pixel dễ (đa số là nền) và tập trung vào pixel khó. Cả hai phù hợp cho foreground nhỏ."
 },
 {
  "id": 73,
  "q": "Mạng nơ-ron ResNet sử dụng một kỹ thuật quan trọng gọi là kết nối tắt (skip connection) để giải quyết hiện tượng biến mất đạo hàm (Vanishing Gradient)trong quá trình huấn luyện. Dựa trên đoạn mã của khối identity_block dưới đây, hãy liệt kê các thành phần chính của khối theo đúng thứ tự xuất hiện và chỉ ra dòng mã thực hiện phép kết nối tắt.<figure><img src=\"img/q73.png\" alt=\"Mã identity_block của ResNet\" loading=\"lazy\"></figure>",
  "options": [
   "Ba cặp Conv2D–BatchNorm–ReLU; kết nối tắt ở dòng ở dòng 8",
   "Hai cặp Conv2D–BatchNorm–ReLU; kết nối tắt nằm trong BatchNorm ở dòng 11, 15, 19",
   "Ba cặp Conv2D–BatchNorm–ReLU; Không có cơ chế kết nối tắt ở dòng",
   "Ba cặp Conv2D–BatchNorm–ReLU; kết nối tắt ở dòng 21"
  ],
  "answer": 3,
  "explain": "Khối gồm ba cụm Conv2D → BatchNorm (→ ReLU): 1×1, f×f, 1×1. Dòng 8 chỉ <i>lưu</i> X_shortcut; phép kết nối tắt thực sự là <code>Add()([X_shortcut, X])</code> ở dòng 21, sau đó mới ReLU."
 },
 {
  "id": 74,
  "q": "Trong mô hình Transformer, cơ chế chú ý (attention) giúp mô hình làm gì?",
  "options": [
   "Tự động sinh từ tiếp theo",
   "Tập trung vào phần quan trọng của câu khi tính toán",
   "Xác định vị trí từ trong câu",
   "Chuẩn hóa đầu vào"
  ],
  "answer": 1,
  "explain": "Attention tính trọng số mức độ liên quan giữa các token, giúp mô hình tập trung vào những phần quan trọng của chuỗi khi tạo biểu diễn cho mỗi token. Vị trí từ do positional encoding đảm nhiệm."
 },
 {
  "id": 75,
  "q": "Trong kiến trúc phân đoạn ảnh dạng encoder-decoder như U-Net, các \"kết nối tắt\" (skip connections) kết hợp đặc trưng từ bộ mã hóa (encoder path) với đặc trưng tương ứng ở bộ giải mã (decoder path) sau khi phóng đại (upsampling), giúp giữ lại chi tiết không gian độ phân giải cao.<br><br>Bạn có hai tensor:<ul><li><code>encoder_output</code>: đặc trưng từ lớp tương ứng ở bộ mã hóa.</li><li><code>decoder_input</code>: đầu vào lớp hiện tại ở bộ giải mã, đã được upsample để cùng chiều cao (H) và chiều rộng (W) với <code>encoder_output</code>.</li></ul><figure><img src=\"img/q75.png\" alt=\"Mã ghép đặc trưng U-Net\" loading=\"lazy\"></figure>Thao tác <code>some_concatenation_operation</code> và tham số <code>axis</code> phù hợp nhất để thực hiện kết nối tắt kiểu U-Net là gì?",
  "options": [
   "Phép nối (Concatenation) và axis dọc theo chiều batch",
   "Phép nối (Concatenation) và axis dọc theo chiều kênh (channel dimension)",
   "Phép cộng element-wise và axis không quan trọng",
   "Phép nhân element-wise và axis không quan trọng"
  ],
  "answer": 1,
  "explain": "U-Net nối (concatenate) đặc trưng encoder và decoder theo chiều kênh: <code>axis=-1</code> (TF/Keras, NHWC) hoặc <code>dim=1</code> (PyTorch, NCHW). Kết quả có C1 + C2 kênh. Phép cộng element-wise là kiểu skip của ResNet và đòi hỏi số kênh bằng nhau."
 },
 {
  "id": 76,
  "q": "Mô hình ngôn ngữ lớn (Large Language Model - LLM) là gì?",
  "options": [
   "Một công cụ tìm kiếm dựa trên quy tắc",
   "Một mô hình học sâu được huấn luyện trên lượng lớn dữ liệu văn bản để dự đoán từ tiếp theo trong một chuỗi",
   "Một hệ thống học tăng cường chuyên cho bài toán xử lý ngôn ngữ",
   "Một cơ sở dữ liệu ngữ nghĩa với các quan hệ giữa từ"
  ],
  "answer": 1,
  "explain": "LLM là mô hình học sâu (thường là Transformer) với hàng tỷ tham số, được huấn luyện trên lượng văn bản khổng lồ với mục tiêu dự đoán token tiếp theo."
 },
 {
  "id": 77,
  "q": "Stable Diffusion thuộc loại mô hình nào trong các lựa chọn sau?",
  "options": [
   "Bộ chuyển đổi (Transformer)",
   "Mô hình khuếch tán (Diffusion Model)",
   "GAN",
   "Bộ mã hóa tự động (autoencoder)"
  ],
  "answer": 1,
  "explain": "Stable Diffusion là Latent Diffusion Model: khử nhiễu dần trong không gian latent của một VAE, dùng U-Net và điều kiện văn bản từ CLIP. Nó có chứa autoencoder và transformer nhưng bản chất là mô hình khuếch tán."
 },
 {
  "id": 78,
  "q": "Để áp dụng kỹ thuật dừng sớm (Early Stopping) trong huấn luyện, bạn cần theo dõi chỉ số nào để quyết định dừng huấn luyện?",
  "options": [
   "Mất mát kiểm tra (validation loss) hoặc độ chính xác kiểm tra (validation accuracy)",
   "Tỷ lệ học (learning rate)",
   "Số vòng lặp (epoch count)",
   "Mất mát huấn luyện (training loss)"
  ],
  "answer": 0,
  "explain": "Early stopping theo dõi chỉ số trên tập validation (val loss hoặc val accuracy) và dừng khi không cải thiện sau một số epoch (patience). Training loss gần như luôn giảm nên không dùng được."
 },
 {
  "id": 79,
  "q": "Lệnh nào dùng để chuyển mô hình sang GPU?",
  "options": [
   "model.gpu()",
   "model.to(&#x27;cuda&#x27;)",
   "model.cuda.enable()",
   "model.device(&#x27;GPU&#x27;)"
  ],
  "answer": 1,
  "explain": "<code>model.to('cuda')</code> (hoặc <code>model.cuda()</code>) chuyển tham số mô hình lên GPU. Các lệnh còn lại không tồn tại trong PyTorch."
 },
 {
  "id": 80,
  "q": "Hàm chi phí sử dụng MSE (mean squared error) từ dữ liệu sau là bao nhiêu?<div class=\"tbl\"><table><tr><td>Giá trị kỳ vọng</td><td>15</td><td>17</td><td>10</td><td>26</td><td>14</td><td>12</td><td>11</td><td>13</td></tr><tr><td>Giá trị thực tế</td><td>12</td><td>19</td><td>15</td><td>24</td><td>13</td><td>14</td><td>8</td><td>11</td></tr></table></div>",
  "options": [
   "8.5",
   "6.5",
   "5.5",
   "7.5"
  ],
  "answer": 3,
  "explain": "Sai số: 3, −2, −5, 2, 1, −2, 3, 2.<br>Bình phương: 9, 4, 25, 4, 1, 4, 9, 4 → tổng = 60.<br>MSE = 60 / 8 = <b>7.5</b>."
 },
 {
  "id": 81,
  "q": "Thư viện LangChain được sử dụng để làm gì?",
  "options": [
   "Phân tích âm thanh",
   "Dịch máy",
   "Sinh văn bản ngẫu nhiên",
   "Kết nối và xây dựng quy trình cho tác nhân ngôn ngữ lớn (LLM agent pipeline)"
  ],
  "answer": 3,
  "explain": "LangChain là framework xây dựng ứng dụng LLM: nối prompt, mô hình, công cụ, bộ nhớ, retriever (RAG) thành chuỗi (chain) và agent."
 },
 {
  "id": 82,
  "q": "Trong mô hình hồi quy logistic sử dụng scikit-learn, thuộc tính nào chứa trọng số đã học của mô hình?",
  "options": [
   "model.weights",
   "model.intercept",
   "model.coefficients",
   "model.coef"
  ],
  "answer": 3,
  "explain": "Trọng số đã học nằm trong thuộc tính <code>coef_</code> (đề ghi <code>model.coef</code>); <code>intercept_</code> là hệ số chặn. Đáp án gần đúng nhất là D."
 },
 {
  "id": 83,
  "q": "Bạn phát triển hệ thống phân tích ảnh vệ tinh để xác định các loại cây trồng. Sau khi trích xuất đặc trưng từ ảnh đa phổ, bạn chạy K-means với K = 3 và thu được ba cụm C<sub>1</sub>, C<sub>2</sub>, C<sub>3</sub>. Để đánh giá chất lượng phân cụm, bạn dùng Silhouette Coefficient:<p class=\"formula\"><i>s</i>(<i>i</i>) = <span class=\"frac\"><span><i>b</i>(<i>i</i>) − <i>a</i>(<i>i</i>)</span><span>max(<i>a</i>(<i>i</i>), <i>b</i>(<i>i</i>))</span></span></p>trong đó <i>a</i>(<i>i</i>) là khoảng cách trung bình từ điểm <i>i</i> đến các điểm khác trong cùng cụm, <i>b</i>(<i>i</i>) là khoảng cách trung bình nhỏ nhất từ <i>i</i> đến các điểm của một cụm khác. Với một pixel <i>p</i> thuộc C<sub>1</sub>:<ul><li><i>a</i>(<i>p</i>) = 0.35</li><li><i>d</i>(<i>p</i>, C<sub>2</sub>) = 0.60</li><li><i>d</i>(<i>p</i>, C<sub>3</sub>) = 0.45</li></ul>Hãy tính Silhouette Coefficient <i>s</i>(<i>p</i>).",
  "options": [
   "0.0",
   "0.222",
   "0.125",
   "0.308"
  ],
  "answer": 1,
  "explain": "b(p) = min(0.60, 0.45) = 0.45 (cụm C<sub>3</sub> gần nhất); a(p) = 0.35.<br>s(p) = (0.45 − 0.35) / max(0.35, 0.45) = 0.10 / 0.45 ≈ <b>0.222</b>."
 },
 {
  "id": 84,
  "q": "Nếu khởi tạo trọng số (weight initialization) không phù hợp, hiện tượng nào có thể xảy ra trong quá trình huấn luyện?",
  "options": [
   "Mô hình học nhanh hơn",
   "Không ảnh hưởng vì bộ tối ưu sẽ điều chỉnh",
   "Học quá mức nhẹ (overfitting)",
   "Gradient biến mất (vanishing) hoặc nổ (exploding)"
  ],
  "answer": 3,
  "explain": "Khởi tạo không phù hợp (quá lớn hoặc quá nhỏ) khiến tín hiệu và gradient bị nhân lên hoặc co lại theo cấp số qua các lớp, gây exploding hoặc vanishing gradient. Vì vậy người ta dùng Xavier/He initialization."
 },
 {
  "id": 85,
  "q": "Để đánh giá mô hình phân loại ảnh với các lớp không cân bằng, chỉ số nào nên dùng thay vì chỉ độ chính xác (accuracy)?",
  "options": [
   "AUC (Area Under the Curve)",
   "Điểm F1 trung bình (Macro F1-score)",
   "RMSE (Root mean square error)",
   "Độ chính xác cao nhất (Top-1 accuracy)"
  ],
  "answer": 1,
  "explain": "Với lớp mất cân bằng, accuracy bị lớp đa số chi phối. Macro F1 tính F1 cho từng lớp rồi lấy trung bình đều, nên lớp hiếm có trọng lượng ngang lớp lớn. RMSE dành cho hồi quy; Top-1 accuracy vẫn là accuracy."
 },
 {
  "id": 86,
  "q": "Sau khi huấn luyện mô hình phân loại với độ chính xác 90%, khách hàng muốn triển khai thực tế. Việc cần làm tiếp theo là gì?",
  "options": [
   "Nén ảnh đầu vào",
   "Chuyển mô hình sang TensorRT/ONNX để triển khai (deploy)",
   "Tăng thêm số vòng lặp (epoch) để đạt 95%",
   "Thay mô hình sang BERT"
  ],
  "answer": 1,
  "explain": "Bước tiếp theo khi đưa vào thực tế là tối ưu và đóng gói mô hình cho môi trường triển khai: xuất ONNX, tăng tốc bằng TensorRT, rồi serving. Các phương án khác không thuộc khâu triển khai."
 },
 {
  "id": 87,
  "q": "Khi xử lý dữ liệu ảnh, nếu một số ảnh bị hỏng (không mở được), cách tốt nhất để xử lý khi huấn luyện là gì?",
  "options": [
   "Tăng kích thước lô (batch size) để bù lại",
   "Bỏ qua toàn bộ thư mục chứa ảnh đó",
   "Bắt lỗi khi tải ảnh và bỏ qua ảnh bị hỏng",
   "Dừng toàn bộ huấn luyện"
  ],
  "answer": 2,
  "explain": "Bọc việc đọc ảnh trong try/except (trong Dataset hoặc collate_fn), ghi log và bỏ qua ảnh hỏng. Dữ liệu tốt còn lại không bị mất và quá trình huấn luyện không bị dừng."
 },
 {
  "id": 88,
  "q": "Trong PyTorch, để thêm lớp bỏ ngẫu nhiên (dropout) với xác suất 0.5 vào mạng nơ-ron, bạn sử dụng lệnh nào?",
  "options": [
   "F.dropout(0.5)",
   "nn.dropout(0.5)",
   "nn.Dropout(p=0.5)",
   "nn.Dropout2d(0.5)"
  ],
  "answer": 2,
  "explain": "<code>nn.Dropout(p=0.5)</code> là module dropout chuẩn để thêm vào mạng. <code>F.dropout</code> là hàm, cần tensor đầu vào; <code>nn.dropout</code> không tồn tại; <code>Dropout2d</code> bỏ cả kênh, dùng cho feature map tích chập."
 },
 {
  "id": 89,
  "q": "Hãy xem xét một công cụ phát hiện các gói tin chứa mối đe dọa trong trường hợp chỉ có một số lượng nhỏ gói là mối đe dọa. Yêu cầu là công cụ cần phát hiện các gói đe dọa mà không bỏ sót gói nào. Đâu là độ đo quan trọng nhất để đánh giá công cụ?",
  "options": [
   "Accuracy",
   "F1",
   "Recall",
   "Precision"
  ],
  "answer": 2,
  "explain": "Yêu cầu không bỏ sót gói đe dọa nào nghĩa là cần giảm tối đa False Negative. Recall = TP / (TP + FN) đo đúng điều đó. Accuracy vô nghĩa khi dữ liệu mất cân bằng."
 },
 {
  "id": 90,
  "q": "Phương pháp nào dưới đây mà việc chuẩn hóa các thuộc tính dữ liệu đầu vào không ảnh hưởng đến kết quả dự đoán?",
  "options": [
   "Mạng nơ-ron (Neural Networks)",
   "Cây quyết định",
   "Soft-margin SVM",
   "k-NN"
  ],
  "answer": 1,
  "explain": "Cây quyết định tách theo ngưỡng trên từng thuộc tính riêng lẻ. Phép chuẩn hóa đơn điệu (min-max, z-score) giữ nguyên thứ tự giá trị nên cây tạo ra cùng các phép tách và cùng dự đoán. Mạng nơ-ron, SVM và k-NN đều nhạy với thang đo."
 },
 {
  "id": 91,
  "q": "Mục tiêu huấn luyện của mô hình CBOW (Continuous Bag-of-Words) là gì?",
  "options": [
   "Sử dụng toàn bộ văn bản để dự đoán một từ bất kỳ",
   "Sử dụng vị trí của từ trong câu để dự đoán nghĩa của câu",
   "Sử dụng các từ xung quanh để dự đoán từ trung tâm",
   "Sử dụng từ trung tâm để dự đoán các từ xung quanh"
  ],
  "answer": 2,
  "explain": "CBOW lấy các từ ngữ cảnh xung quanh (trung bình embedding) để dự đoán từ ở giữa. Skip-gram làm ngược lại: dùng từ trung tâm dự đoán các từ xung quanh (phương án D)."
 },
 {
  "id": 92,
  "q": "Mục tiêu chính của phương pháp học tương phản (contrastive learning) trong lĩnh vực học tự giám sát (self-supervised learning) là gì?",
  "options": [
   "Tối thiểu hoá khoảng cách Euclidean giữa mọi cặp ảnh trong batch",
   "Khôi phục ảnh gốc từ ảnh đã bị thêm nhiễu Gaussian",
   "Đưa các ảnh được biến đổi từ cùng một ảnh gốc thông qua các phép biến đổi cơ bản tới gần nhau, đẩy các mẫu lấy từ các ảnh khác nhau xa nhau trên không gian biểu diễn (embedding space)",
   "Tối ưu hoá hàm cross-entropy có nhãn đầy đủ"
  ],
  "answer": 2,
  "explain": "Contrastive learning kéo các view tăng cường của cùng một ảnh (cặp dương) lại gần nhau và đẩy view của các ảnh khác (cặp âm) ra xa trong không gian embedding, ví dụ với InfoNCE loss."
 },
 {
  "id": 93,
  "q": "Điểm khác biệt chính giữa Stochastic Gradient Descent (SGD) và Mini-Batch Gradient Descent là gì?",
  "options": [
   "SGD luôn hội tụ nhanh hơn",
   "Mini-Batch Gradient Descent là một thuật toán hoàn toàn khác",
   "SGD không dùng được trong mạng nơ-ron",
   "SGD cập nhật tham số sau mỗi mẫu dữ liệu, Mini-Batch thì sau một nhóm mẫu"
  ],
  "answer": 3,
  "explain": "SGD (thuần) cập nhật tham số sau mỗi mẫu; Mini-batch GD cập nhật sau mỗi nhóm nhỏ (ví dụ 32 mẫu). Mini-batch là phương án trung gian giữa SGD và Batch GD, không phải thuật toán hoàn toàn khác."
 },
 {
  "id": 94,
  "q": "Giả sử các từ được biểu diễn bởi các vector 4 chiều:<pre>w1 = [0.8, 0.6, 0.0, 0.2]\nw2 = [0.9, 0.5, 0.1, 0.3]\nw3 = [1.0, 0.1, 0.0, 0.0]\nw4 = [0.0, 0.1, 0.9, 0.3]</pre>Hãy tính độ tương đồng cosine giữa w1 và các từ còn lại, sau đó chọn từ gần nhất với w1. Công thức: <span class=\"formula-inline\">cos(A, B) = <span class=\"frac\"><span>A · B</span><span>|A| × |B|</span></span></span>, với A · B là tích vô hướng, |A| là độ dài vector A.",
  "options": [
   "Có nhiều hơn một từ gần nhất với w1",
   "w3",
   "w4",
   "w2"
  ],
  "answer": 3,
  "explain": "|w1| = √1.04 ≈ 1.020<br>• cos(w1, w2) = 1.08 / (1.020 × 1.077) ≈ <b>0.983</b><br>• cos(w1, w3) = 0.86 / (1.020 × 1.005) ≈ 0.839<br>• cos(w1, w4) = 0.12 / (1.020 × 0.954) ≈ 0.123<br>w2 gần w1 nhất."
 },
 {
  "id": 95,
  "q": "Mạng GAN bao gồm hai mạng chính nào?",
  "options": [
   "Bộ phát hiện (Detector) và Bộ phân đoạn (Segmentor)",
   "Bộ chuyển đổi (Transformer) và Cơ chế chú ý (Attention)",
   "Bộ mã hóa (Encoder) và Bộ giải mã (Decoder)",
   "Bộ tạo (Generator) và Bộ phân biệt (Discriminator)"
  ],
  "answer": 3,
  "explain": "GAN gồm Generator (sinh dữ liệu giả từ nhiễu) và Discriminator (phân biệt thật và giả), huấn luyện đối kháng theo trò chơi minimax."
 },
 {
  "id": 96,
  "q": "Quá khớp (Overfitting) có thể do",
  "options": [
   "Lựa chọn mô hình không phù hợp",
   "Độ phức tạp của bài toán học",
   "Một lỗi nào đó trong quá trình huấn luyện",
   "Nhiễu trong dữ liệu"
  ],
  "answer": 3,
  "explain": "Theo giáo trình học máy kinh điển, overfitting xảy ra khi mô hình khớp cả nhiễu trong dữ liệu huấn luyện (hoặc tập huấn luyện quá nhỏ, không đại diện). Mô hình quá phức tạp so với dữ liệu cũng góp phần, nhưng đáp án được kỳ vọng ở đây là nhiễu trong dữ liệu."
 },
 {
  "id": 97,
  "q": "Khi huấn luyện bộ mã hóa tự động (autoencoder), nếu ảnh đầu ra bị mờ, nguyên nhân có thể là gì?",
  "options": [
   "Bỏ ngẫu nhiên (dropout) quá thấp",
   "Bộ tối ưu sai",
   "Lớp ẩn quá nhỏ hoặc chính quy hóa (regularization) quá mạnh",
   "Kích thước lô (batch size) lớn"
  ],
  "answer": 2,
  "explain": "Ảnh tái tạo mờ khi bottleneck quá hẹp (mất chi tiết tần số cao) hoặc regularization quá mạnh (ví dụ hệ số KL lớn trong VAE). Loss MSE/L2 cũng có xu hướng cho kết quả trung bình hóa, gây mờ."
 },
 {
  "id": 98,
  "q": "Mô hình DALL·E có khả năng đặc biệt nào?",
  "options": [
   "Phân đoạn vật thể",
   "Sinh ảnh từ mô tả văn bản",
   "Nén ảnh thành vector",
   "Sinh mô tả từ ảnh"
  ],
  "answer": 1,
  "explain": "DALL·E (OpenAI) là mô hình text-to-image: sinh ảnh từ mô tả văn bản."
 },
 {
  "id": 99,
  "q": "Trong xử lý ngôn ngữ tự nhiên (NLP), mục đích chính của việc loại bỏ từ dừng (stopword) khỏi văn bản là gì?",
  "options": [
   "Để giảm số lượng từ trong tập huấn luyện",
   "Để tạo ra các câu hoàn chỉnh và rõ nghĩa hơn",
   "Để làm giảm độ phức tạp và tập trung vào các từ mang nội dung quan trọng",
   "Để giữ lại tất cả các từ giúp cải thiện độ chính xác"
  ],
  "answer": 2,
  "explain": "Stopword (\"là\", \"và\", \"của\", \"the\", \"a\"…) xuất hiện dày đặc nhưng ít mang nội dung. Loại bỏ chúng giảm nhiễu, giảm chiều đặc trưng và giúp mô hình tập trung vào từ mang ý nghĩa. A chỉ là hệ quả, không phải mục đích chính."
 },
 {
  "id": 100,
  "q": "Cho các tham số của mô hình SVM đã huấn luyện: vector trọng số <i>w</i> = [2, −3], độ lệch <i>b</i> = 1, và bảng dữ liệu dưới đây. Dự đoán cho chỉ số 0 là gì?<div class=\"tbl\"><table><tr><th>Chỉ số</th><th>X1</th><th>X2</th></tr><tr><td>0</td><td>1</td><td>2</td></tr><tr><td>1</td><td>-1</td><td>-1</td></tr><tr><td>2</td><td>-1</td><td>2</td></tr><tr><td>3</td><td>4</td><td>5</td></tr></table></div>",
  "options": [
   "không xác định được",
   "không phân loại",
   "+1",
   "−1"
  ],
  "answer": 3,
  "explain": "f(x) = w·x + b = 2·1 + (−3)·2 + 1 = 2 − 6 + 1 = −3 &lt; 0, nên dự đoán lớp <b>−1</b>."
 }
];
