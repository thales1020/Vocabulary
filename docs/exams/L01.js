// Đề luyện 01 – sinh bởi tools/build_exams.py, không sửa tay.
window.EXAMS = window.EXAMS || {};
window.EXAMS["L01"] = {
 "title": "Đề luyện 01",
 "desc": "44 câu có sẵn từ quiz Hugging Face LLM Course (đã dịch) và 56 câu soạn mới theo CS231n, deeplearning.ai, d2l.ai, PyTorch, scikit-learn và syllabus IOAI.",
 "questions": [
  {
   "id": 1,
   "q": "Phát biểu nào đúng về kiểm tra gradient (gradient checking)?",
   "options": [
    "Hoạt động tốt kể cả khi đang bật dropout",
    "Dùng sai phân một phía f(θ+ε) − f(θ) cho kết quả chính xác hơn sai phân hai phía",
    "Nên chạy ở mọi bước huấn luyện để đảm bảo gradient đúng",
    "Chỉ dùng khi gỡ lỗi, không bật trong lúc huấn luyện, và nên tắt dropout khi kiểm tra"
   ],
   "answer": 3,
   "explain": "Gradient checking so sánh gradient từ backprop với xấp xỉ số [J(θ+ε) − J(θ−ε)] / 2ε. Phép này rất chậm nên chỉ dùng để gỡ lỗi. Dropout làm hàm mất mát thay đổi ngẫu nhiên nên phải tắt khi kiểm tra. Sai phân hai phía chính xác hơn sai phân một phía.",
   "source": "Câu soạn mới theo: deeplearning.ai – Improving Deep Neural Networks"
  },
  {
   "id": 2,
   "q": "Cách dùng <code>StandardScaler</code> nào đúng để tránh rò rỉ dữ liệu?",
   "options": [
    "fit trên toàn bộ dữ liệu rồi mới chia train/test",
    "fit_transform trên tập test, transform trên tập train",
    "fit riêng trên tập test",
    "fit trên tập huấn luyện, rồi transform cả tập huấn luyện và tập test"
   ],
   "answer": 3,
   "explain": "Thống kê chuẩn hóa (μ, σ) chỉ được học từ dữ liệu huấn luyện. Dùng thông tin của tập test khi fit là rò rỉ dữ liệu, làm điểm đánh giá đẹp hơn thực tế.",
   "source": "Câu soạn mới theo: scikit-learn User Guide"
  },
  {
   "id": 3,
   "q": "Yêu cầu sản phẩm: tối đa hóa độ chính xác với điều kiện thời gian chạy không quá 100 ms. Nên chọn bộ phân loại nào?<div class=\"tbl\"><table><tr><th>Bộ phân loại</th><th>Độ chính xác</th><th>Thời gian chạy</th></tr><tr><td>P</td><td>90%</td><td>80 ms</td></tr><tr><td>Q</td><td>92%</td><td>95 ms</td></tr><tr><td>R</td><td>95%</td><td>1500 ms</td></tr><tr><td>S</td><td>88%</td><td>20 ms</td></tr></table></div>",
   "options": [
    "P",
    "Q",
    "R",
    "S"
   ],
   "answer": 1,
   "explain": "Thời gian chạy là chỉ số thỏa mãn (satisficing): chỉ cần ≤ 100 ms. Độ chính xác là chỉ số tối ưu (optimizing). Trong các bộ đạt điều kiện (P, Q, S), Q có độ chính xác cao nhất. R chính xác nhất nhưng vi phạm điều kiện thời gian.",
   "source": "Câu soạn mới theo: deeplearning.ai – Structuring Machine Learning Projects"
  },
  {
   "id": 4,
   "q": "Phân tích lỗi (error analysis) theo cách khuyên dùng gồm bước nào?",
   "options": [
    "Chỉ nhìn vào đường cong mất mát",
    "Huấn luyện lại mô hình với seed khác",
    "Xóa toàn bộ mẫu bị sai khỏi tập dev",
    "Lấy khoảng 100 mẫu dev bị dự đoán sai, xem thủ công và đếm tỉ lệ từng loại lỗi"
   ],
   "answer": 3,
   "explain": "Đếm tỉ lệ các nhóm lỗi (ảnh mờ, nhãn sai, chó bị nhận nhầm là mèo…) cho biết mức cải thiện tối đa nếu sửa từng nhóm, nhờ đó ưu tiên đúng việc cần làm.",
   "source": "Câu soạn mới theo: deeplearning.ai – Structuring Machine Learning Projects"
  },
  {
   "id": 5,
   "q": "Đặt <code>fp16=True</code> trong <code>TrainingArguments</code> có tác dụng gì?",
   "options": [
    "Dùng 16 GPU để huấn luyện phân tán",
    "Huấn luyện đúng 16 epoch",
    "Dùng số nguyên 16-bit",
    "Huấn luyện mixed precision với số thực dấu phẩy động 16-bit, nhanh hơn và tốn ít bộ nhớ hơn"
   ],
   "answer": 3,
   "explain": "Mixed precision tính phần lớn phép toán bằng float16 và giữ một bản trọng số float32 để cập nhật ổn định, nhờ đó tăng tốc trên GPU hỗ trợ và giảm bộ nhớ.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 3, mục 3, câu 3"
  },
  {
   "id": 6,
   "q": "Vì sao đường cong accuracy thường có dạng \"bậc thang\" thay vì tăng mượt như đường mất mát?",
   "options": [
    "Batch size quá nhỏ",
    "Accuracy là chỉ số rời rạc, chỉ thay đổi khi dự đoán vượt qua ngưỡng quyết định",
    "Có lỗi trong cách tính accuracy",
    "Mô hình không học hiệu quả"
   ],
   "answer": 1,
   "explain": "Mất mát thay đổi liên tục theo độ tự tin của mô hình. Accuracy chỉ đếm đúng/sai, nên mô hình tự tin hơn một chút mà chưa đổi dự đoán thì accuracy không đổi. Dạng bậc thang là bình thường.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 3, mục 5, câu 2"
  },
  {
   "id": 7,
   "q": "Vì sao đoạn mã sau báo lỗi?<pre>from transformers import pipeline\n\nclassifier = pipeline(\"zero-shot-classification\")\nresult = classifier(\"This is a course about the Transformers library\")</pre>",
   "options": [
    "Pipeline này cần được cung cấp danh sách nhãn để phân loại (candidate_labels)",
    "Pipeline này cần nhiều câu chứ không phải một câu",
    "Pipeline này chỉ hoạt động với tiếng Anh viết hoa",
    "Câu đầu vào quá ngắn"
   ],
   "answer": 0,
   "explain": "Zero-shot classification phân loại văn bản vào các nhãn do người dùng đưa ra mà không cần huấn luyện thêm, nên phải truyền candidate_labels=[...]. Pipeline vẫn nhận được một câu đơn lẻ.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 1, câu 4"
  },
  {
   "id": 8,
   "q": "Một mô hình nhận dạng ảnh có sai số huấn luyện 1% và sai số trên tập dev 11%, trong khi sai số của con người gần 0%. Vấn đề chính của mô hình là gì?",
   "options": [
    "Độ lệch cao (high bias)",
    "Cả độ lệch và phương sai đều thấp",
    "Tập dev bị gán nhãn sai hoàn toàn",
    "Phương sai cao (high variance)"
   ],
   "answer": 3,
   "explain": "Sai số huấn luyện thấp (1%) nhưng sai số dev cao hơn nhiều (11%) cho thấy mô hình khớp tốt dữ liệu huấn luyện mà không tổng quát hóa được, tức là phương sai cao. Hướng xử lý: thêm dữ liệu, chính quy hóa, dropout.",
   "source": "Câu soạn mới theo: deeplearning.ai – Improving Deep Neural Networks"
  },
  {
   "id": 9,
   "q": "Ở cách \"ConvNet as fixed feature extractor\" trong tutorial PyTorch, những tham số nào được tối ưu?",
   "options": [
    "Chỉ tham số của lớp fully connected cuối mới thay vào",
    "Không có tham số nào được tối ưu",
    "Toàn bộ tham số của mạng",
    "Chỉ các lớp tích chập đầu tiên"
   ],
   "answer": 0,
   "explain": "Ta đặt requires_grad = False cho toàn bộ mạng pretrained rồi thay lớp fc bằng lớp mới (mặc định requires_grad = True). Optimizer chỉ nhận model.fc.parameters(). Huấn luyện nhanh vì không cần gradient cho phần lớn mạng.",
   "source": "Câu soạn mới theo: PyTorch – Transfer Learning for Computer Vision tutorial"
  },
  {
   "id": 10,
   "q": "Vì sao nên dùng padding động (dynamic padding) thay vì đệm mọi chuỗi tới độ dài tối đa của cả bộ dữ liệu?",
   "options": [
    "Vì padding động làm tăng độ chính xác",
    "Giảm tính toán thừa vì chỉ đệm tới độ dài lớn nhất trong từng batch",
    "Vì kiến trúc mô hình bắt buộc padding động",
    "Vì DataCollatorWithPadding không hỗ trợ padding cố định"
   ],
   "answer": 1,
   "explain": "Đệm tới độ dài dài nhất của cả bộ dữ liệu làm hầu hết batch chứa rất nhiều token đệm vô ích. Padding động (ví dụ với DataCollatorWithPadding) chỉ đệm tới câu dài nhất trong batch. Chiến lược padding không trực tiếp ảnh hưởng độ chính xác.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 3, mục 2, câu 2"
  },
  {
   "id": 11,
   "q": "Checkpoint <code>roberta-large-mnli</code> trên Hugging Face Hub thực hiện tác vụ nào?",
   "options": [
    "Nhận dạng giọng nói",
    "Sinh văn bản",
    "Tóm tắt văn bản",
    "Phân loại văn bản (suy luận ngôn ngữ tự nhiên: hai câu mâu thuẫn, trung lập hay kéo theo)"
   ],
   "answer": 3,
   "explain": "MNLI là bộ dữ liệu suy luận ngôn ngữ tự nhiên (natural language inference). Mô hình nhận một cặp câu và phân vào ba nhãn contradiction, neutral, entailment, nên đây là bài toán phân loại văn bản.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 1, câu 1"
  },
  {
   "id": 12,
   "q": "Khi gộp các chuỗi có độ dài khác nhau vào cùng một batch, cần lưu ý những kỹ thuật nào?",
   "options": [
    "Cắt bớt (truncation)",
    "Đệm (padding)",
    "Mặt nạ attention (attention mask)",
    "Cả ba kỹ thuật trên"
   ],
   "answer": 3,
   "explain": "Truncation và padding đưa các chuỗi về cùng độ dài để tạo tensor hình chữ nhật. Attention mask báo cho mô hình bỏ qua token đệm, nếu không kết quả sẽ bị sai lệch.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 2, câu 6"
  },
  {
   "id": 13,
   "q": "Muốn dùng ResNet-18 pretrained cho bài toán 2 lớp, dòng lệnh nào thay đúng lớp phân loại cuối?",
   "options": [
    "<code>model.fc = nn.Linear(model.fc.in_features, 2)</code>",
    "<code>model.avgpool = nn.Linear(512, 2)</code>",
    "<code>model.fc = nn.Linear(2, model.fc.out_features)</code>",
    "<code>model.conv1 = nn.Conv2d(2, 64, 7)</code>"
   ],
   "answer": 0,
   "explain": "Lớp fc của ResNet-18 nhận vector 512 chiều (in_features) và xuất 1000 lớp ImageNet. Ta giữ in_features và đổi số đầu ra thành 2.",
   "source": "Câu soạn mới theo: PyTorch – Transfer Learning for Computer Vision tutorial"
  },
  {
   "id": 14,
   "q": "Để sinh văn bản hoàn thành một prompt, nên dùng loại mô hình nào?",
   "options": [
    "Mô hình sequence-to-sequence",
    "Mô hình decoder",
    "Mô hình phân cụm K-means",
    "Mô hình encoder"
   ],
   "answer": 1,
   "explain": "Mô hình decoder (như GPT) được huấn luyện dự đoán token tiếp theo nên rất hợp với việc sinh tiếp từ một prompt. Encoder tạo biểu diễn cho cả câu, hợp với phân loại. Seq2seq hợp với việc sinh câu dựa trên một câu đầu vào (dịch, tóm tắt).",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 1, câu 8"
  },
  {
   "id": 15,
   "q": "Phát biểu nào đúng về thuật toán tokenization BPE?",
   "options": [
    "Gộp cặp token tối đa hóa điểm số ưu tiên cặp phổ biến gồm các phần ít phổ biến",
    "Bắt đầu với từ vựng lớn rồi loại dần token",
    "Bắt đầu với từ vựng nhỏ và học các quy tắc gộp, mỗi lần gộp cặp token xuất hiện thường xuyên nhất",
    "Tách từ bằng cách tìm từ con dài nhất từ đầu từ có trong từ vựng"
   ],
   "answer": 2,
   "explain": "BPE gộp theo tần suất. Khi mã hóa, nó tách từ thành ký tự rồi áp lần lượt các quy tắc gộp đã học. Loại dần token từ từ vựng lớn là cách của Unigram; dùng điểm số và tìm từ con dài nhất là cách của WordPiece.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 6, câu 8"
  },
  {
   "id": 16,
   "q": "Learning rate được giảm theo công thức α = α<sub>0</sub> / (1 + decay_rate × epoch). Với α<sub>0</sub> = 0.2 và decay_rate = 1, learning rate ở epoch 3 là bao nhiêu?",
   "options": [
    "0.1",
    "0.0667",
    "0.05",
    "0.04"
   ],
   "answer": 2,
   "explain": "α = 0.2 / (1 + 1 × 3) = 0.2 / 4 = 0.05.",
   "source": "Câu soạn mới theo: deeplearning.ai – Improving Deep Neural Networks"
  },
  {
   "id": 17,
   "q": "Lúc suy luận (test) với từng ảnh riêng lẻ, lớp Batch Normalization dùng trung bình và phương sai nào?",
   "options": [
    "Trung bình và phương sai của chính ảnh đang suy luận",
    "Ước lượng trung bình trượt của μ và σ² tích lũy trong quá trình huấn luyện",
    "Trung bình và phương sai của batch test đầu tiên",
    "Luôn dùng μ = 0 và σ² = 1"
   ],
   "answer": 1,
   "explain": "Khi suy luận có thể chỉ có một mẫu nên không tính được thống kê batch. BatchNorm lưu running_mean và running_var (trung bình trượt mũ) trong lúc huấn luyện và dùng chúng khi ở chế độ eval.",
   "source": "Câu soạn mới theo: deeplearning.ai – Improving Deep Neural Networks"
  },
  {
   "id": 18,
   "q": "Trong bài toán masked language modeling, nhãn (labels) là gì?",
   "options": [
    "Một số token trong hai câu bị che, nhãn là hai câu có giống nhau không",
    "Một số token bị che, nhãn là token gốc dịch sang trái một vị trí",
    "Một số token bị che, nhãn là câu tích cực hay tiêu cực",
    "Một số token đầu vào bị che ngẫu nhiên, và nhãn là các token gốc của đầu vào"
   ],
   "answer": 3,
   "explain": "Mô hình phải khôi phục token gốc ở các vị trí bị che. Dịch nhãn sang trái một vị trí ứng với dự đoán từ tiếp theo (causal language modeling). Hai phương án còn lại là phân loại chuỗi.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 7, câu 5"
  },
  {
   "id": 19,
   "q": "Dữ liệu huấn luyện là ảnh từ web, còn tập dev là ảnh chụp từ điện thoại người dùng. Kết quả: sai số train 1%, train-dev 1.5%, dev 10%. Vấn đề chính là gì?",
   "options": [
    "Lệch phân phối dữ liệu (data mismatch)",
    "Phương sai cao",
    "Độ lệch cao",
    "Tập dev quá lớn"
   ],
   "answer": 0,
   "explain": "Tập train-dev cùng phân phối với tập huấn luyện nhưng mô hình chưa thấy. Sai số train-dev gần bằng train (1.5% so với 1%) nên phương sai không lớn. Bước nhảy từ 1.5% lên 10% đến từ khác biệt giữa ảnh web và ảnh điện thoại.",
   "source": "Câu soạn mới theo: deeplearning.ai – Structuring Machine Learning Projects"
  },
  {
   "id": 20,
   "q": "Hàm mất mát của Variational Autoencoder (VAE) gồm hai thành phần nào?",
   "options": [
    "Cross-entropy phân loại và L1 trên trọng số",
    "Chỉ sai số tái tạo",
    "Sai số tái tạo và độ phân kỳ KL giữa phân phối ẩn q(z|x) và phân phối tiên nghiệm p(z)",
    "Mất mát đối kháng và mất mát chu trình"
   ],
   "answer": 2,
   "explain": "Sai số tái tạo buộc giải mã ra ảnh giống đầu vào. Số hạng KL kéo phân phối ẩn về gần N(0, I) để không gian ẩn liên tục, từ đó lấy mẫu sinh dữ liệu mới được.",
   "source": "Câu soạn mới theo: IOAI Syllabus (Computer Vision, Generative, Self-supervised)"
  },
  {
   "id": 21,
   "q": "Trung bình trượt mũ được tính theo v<sub>t</sub> = β·v<sub>t−1</sub> + (1 − β)·θ<sub>t</sub> với v<sub>0</sub> = 0, β = 0.9. Nếu θ<sub>1</sub> = 10 thì giá trị sau hiệu chỉnh độ lệch (bias correction) v<sub>1</sub>/(1 − β<sup>1</sup>) bằng bao nhiêu?",
   "options": [
    "1",
    "9",
    "10",
    "0.1"
   ],
   "answer": 2,
   "explain": "v<sub>1</sub> = 0.9·0 + 0.1·10 = 1. Do khởi tạo bằng 0 nên giá trị bị kéo về 0 ở các bước đầu. Hiệu chỉnh: 1 / (1 − 0.9) = 10, đúng bằng θ<sub>1</sub>.",
   "source": "Câu soạn mới theo: deeplearning.ai – Improving Deep Neural Networks"
  },
  {
   "id": 22,
   "q": "Câu lệnh <code>PCA(n_components=0.95)</code> trong scikit-learn có nghĩa là gì?",
   "options": [
    "Loại 95% số đặc trưng",
    "Giữ số thành phần chính tối thiểu sao cho tổng phương sai được giải thích đạt ít nhất 95%",
    "Giữ đúng 95 thành phần chính",
    "Chỉ dùng 95% số mẫu"
   ],
   "answer": 1,
   "explain": "Khi n_components là số thực trong (0, 1), PCA tự chọn số thành phần dựa trên explained_variance_ratio_ tích lũy.",
   "source": "Câu soạn mới theo: scikit-learn User Guide"
  },
  {
   "id": 23,
   "q": "Thiên lệch (bias) quan sát được ở một mô hình có thể đến từ đâu?",
   "options": [
    "Mô hình được fine-tune từ một mô hình pretrained và thừa hưởng thiên lệch của nó",
    "Dữ liệu huấn luyện bị thiên lệch",
    "Chỉ số mà mô hình tối ưu bị thiên lệch",
    "Tất cả các nguồn trên"
   ],
   "answer": 3,
   "explain": "Cả ba đều là nguồn thiên lệch. Học chuyển giao giữ lại thiên lệch của mô hình gốc; dữ liệu thiên lệch là nguồn dễ thấy nhất; và mô hình sẽ tối ưu \"mù quáng\" theo chỉ số được chọn.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 1, câu 11"
  },
  {
   "id": 24,
   "q": "Một điểm có khoảng cách trung bình tới các điểm cùng cụm a = 0.2 và tới cụm gần nhất khác b = 0.5. Hệ số silhouette của điểm là bao nhiêu?",
   "options": [
    "0.3",
    "0.4",
    "0.6",
    "2.5"
   ],
   "answer": 2,
   "explain": "s = (b − a) / max(a, b) = (0.5 − 0.2)/0.5 = 0.6. Silhouette nằm trong [−1, 1]; gần 1 nghĩa là điểm nằm gọn trong cụm của nó.",
   "source": "Câu soạn mới theo: scikit-learn User Guide"
  },
  {
   "id": 25,
   "q": "Vì sao chính quy hóa L2 còn được gọi là \"weight decay\"?",
   "options": [
    "Vì learning rate giảm dần theo thời gian",
    "Vì trọng số giảm dần về 0 sau mỗi epoch bất kể gradient",
    "Vì nó loại bỏ hẳn các trọng số nhỏ khỏi mạng",
    "Vì mỗi bước cập nhật nhân trọng số với một hệ số nhỏ hơn 1 trước khi trừ gradient"
   ],
   "answer": 3,
   "explain": "Với hàm mất mát có thêm (λ/2m)‖w‖², bước cập nhật là w ← (1 − αλ/m)·w − α·∂J/∂w. Hệ số (1 − αλ/m) &lt; 1 làm trọng số \"co lại\" một chút ở mỗi bước, nên gọi là weight decay.",
   "source": "Câu soạn mới theo: deeplearning.ai – Improving Deep Neural Networks"
  },
  {
   "id": 26,
   "q": "Với bộ dữ liệu khoảng 1 triệu mẫu trong thời kỳ deep learning, cách chia nào hợp lý?",
   "options": [
    "98% huấn luyện, 1% dev, 1% test",
    "60% huấn luyện, 20% dev, 20% test",
    "10% huấn luyện, 45% dev, 45% test",
    "50% huấn luyện, 50% test"
   ],
   "answer": 0,
   "explain": "Khi dữ liệu rất lớn, 1% (10.000 mẫu) đã đủ để đánh giá tin cậy. Dồn phần lớn cho huấn luyện có lợi hơn. Tỉ lệ 60/20/20 phù hợp với dữ liệu nhỏ, vài nghìn mẫu.",
   "source": "Câu soạn mới theo: deeplearning.ai – Structuring Machine Learning Projects"
  },
  {
   "id": 27,
   "q": "Vì sao pretrain mô hình ngôn ngữ trên lượng văn bản khổng lồ lại dễ thực hiện?",
   "options": [
    "Vì trên internet có rất nhiều văn bản",
    "Vì mục tiêu pretraining không cần con người gán nhãn dữ liệu",
    "Vì mô hình ngôn ngữ không cần hàm mất mát",
    "Vì thư viện Transformers chỉ cần vài dòng code"
   ],
   "answer": 1,
   "explain": "Mô hình hóa ngôn ngữ là bài toán tự giám sát, nhãn lấy từ chính văn bản, nên mở rộng quy mô dữ liệu không tốn công gán nhãn. Internet có nhiều văn bản là đúng, nhưng nếu phải gán nhãn tay thì vẫn không thể dùng hết.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 7, câu 11"
  },
  {
   "id": 28,
   "q": "Một nút của cây quyết định chứa 3 mẫu lớp X và 1 mẫu lớp Y. Chỉ số Gini của nút là bao nhiêu?",
   "options": [
    "0.250",
    "0.375",
    "0.500",
    "0.811"
   ],
   "answer": 1,
   "explain": "Gini = 1 − Σp² = 1 − (0.75² + 0.25²) = 1 − (0.5625 + 0.0625) = 0.375. Giá trị 0.811 là entropy của cùng nút.",
   "source": "Câu soạn mới theo: scikit-learn User Guide"
  },
  {
   "id": 29,
   "q": "Sai số huấn luyện là 15%, sai số dev là 16%, còn sai số Bayes ước lượng khoảng 0.5%. Hành động nào nên ưu tiên?",
   "options": [
    "Tăng hệ số chính quy hóa L2",
    "Tăng tỉ lệ dropout",
    "Thu thập thêm dữ liệu huấn luyện",
    "Dùng mạng lớn hơn hoặc huấn luyện lâu hơn"
   ],
   "answer": 3,
   "explain": "Khoảng cách tới sai số Bayes (15% so với 0.5%) rất lớn, trong khi khoảng cách train–dev chỉ 1%. Đây là độ lệch cao (underfitting), nên cần tăng năng lực mô hình hoặc huấn luyện lâu hơn. Thêm dữ liệu hay tăng chính quy hóa chỉ giúp giảm phương sai.",
   "source": "Câu soạn mới theo: deeplearning.ai – Improving Deep Neural Networks"
  },
  {
   "id": 30,
   "q": "Trong Random Forest, việc chỉ xét một tập con ngẫu nhiên các đặc trưng ở mỗi lần tách (max_features) nhằm mục đích gì?",
   "options": [
    "Giảm tương quan giữa các cây để việc lấy trung bình giảm phương sai hiệu quả hơn",
    "Biến Random Forest thành thuật toán boosting",
    "Giảm số cây cần dùng xuống còn một",
    "Làm mỗi cây chính xác hơn"
   ],
   "answer": 0,
   "explain": "Nếu một đặc trưng rất mạnh, mọi cây đều tách theo nó và trở nên giống nhau. Lấy trung bình các cây tương quan mạnh giảm phương sai rất ít. Chọn ngẫu nhiên đặc trưng làm các cây khác nhau hơn.",
   "source": "Câu soạn mới theo: scikit-learn User Guide"
  },
  {
   "id": 31,
   "q": "Một lớp tích chập có 10 bộ lọc kích thước 5 × 5, nhận đầu vào 3 kênh, mỗi bộ lọc có một bias. Lớp có bao nhiêu tham số?",
   "options": [
    "750",
    "760",
    "250",
    "780"
   ],
   "answer": 1,
   "explain": "Mỗi bộ lọc có 5 × 5 × 3 = 75 trọng số cộng 1 bias, tức 76 tham số. Với 10 bộ lọc: 76 × 10 = 760. Số tham số không phụ thuộc kích thước ảnh đầu vào.",
   "source": "Câu soạn mới theo: Stanford CS231n – CNNs for Visual Recognition"
  },
  {
   "id": 32,
   "q": "Khi đường cong học dao động thất thường, mạnh, cách xử lý hợp lý nhất là gì?",
   "options": [
    "Dừng huấn luyện ngay vì mô hình sẽ không cải thiện",
    "Tăng learning rate để hội tụ nhanh hơn",
    "Giảm learning rate và có thể tăng batch size",
    "Chuyển sang kiến trúc hoàn toàn khác"
   ],
   "answer": 2,
   "explain": "Learning rate thấp hơn cho bước cập nhật nhỏ hơn; batch lớn hơn cho gradient ít nhiễu hơn. Cả hai làm quá trình huấn luyện ổn định. Tăng learning rate sẽ làm dao động mạnh hơn.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 3, mục 5, câu 3"
  },
  {
   "id": 33,
   "q": "Tham số <code>stratify=y</code> trong <code>train_test_split</code> có tác dụng gì?",
   "options": [
    "Giữ tỉ lệ các lớp trong tập train và test giống với dữ liệu gốc",
    "Loại bỏ các lớp hiếm",
    "Xáo trộn dữ liệu theo thời gian",
    "Chuẩn hóa nhãn y về [0, 1]"
   ],
   "answer": 0,
   "explain": "Phân tầng (stratified split) đặc biệt quan trọng với dữ liệu mất cân bằng: nếu không, tập test có thể thiếu hẳn lớp hiếm.",
   "source": "Câu soạn mới theo: scikit-learn User Guide"
  },
  {
   "id": 34,
   "q": "Nút cha có 4 mẫu dương và 4 mẫu âm (entropy = 1). Một phép tách chia thành hai nút con (3 dương, 1 âm) và (1 dương, 3 âm). Information gain gần đúng bằng bao nhiêu?",
   "options": [
    "0.189",
    "0.311",
    "0.500",
    "0.811"
   ],
   "answer": 0,
   "explain": "Mỗi nút con có entropy H(0.75, 0.25) = −0.75·log₂0.75 − 0.25·log₂0.25 ≈ 0.811. Hai nút con có cùng kích thước nên entropy có trọng số là 0.811. IG = 1 − 0.811 ≈ 0.189.",
   "source": "Câu soạn mới theo: scikit-learn User Guide"
  },
  {
   "id": 35,
   "q": "Sai số của con người là 0.5%, sai số huấn luyện 5%, sai số dev 6%. Nên tập trung vào điều gì?",
   "options": [
    "Thu thập thêm dữ liệu dev",
    "Giảm độ lệch tránh được (avoidable bias)",
    "Giảm phương sai",
    "Mô hình đã đạt mức con người, không cần cải thiện"
   ],
   "answer": 1,
   "explain": "Avoidable bias = 5% − 0.5% = 4.5%, còn phương sai = 6% − 5% = 1%. Độ lệch lớn hơn nhiều nên cần mô hình mạnh hơn, huấn luyện lâu hơn hoặc tối ưu tốt hơn.",
   "source": "Câu soạn mới theo: deeplearning.ai – Structuring Machine Learning Projects"
  },
  {
   "id": 36,
   "q": "Áp dụng softmax lên logits của mô hình phân loại chuỗi nhằm mục đích gì?",
   "options": [
    "Giảm số chiều của logits",
    "Loại bỏ lớp có logit âm",
    "Làm logits \"mềm\" hơn để kết quả đáng tin hơn",
    "Đưa các giá trị về khoảng [0, 1] với tổng bằng 1, để có thể hiểu như xác suất"
   ],
   "answer": 3,
   "explain": "Logits có thể là số bất kỳ. Softmax chặn giá trị trong [0, 1] và chuẩn hóa tổng bằng 1, nhờ đó diễn giải được như phân phối xác suất. Nó không làm dự đoán đáng tin hơn.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 2, câu 7"
  },
  {
   "id": 37,
   "q": "Với SVM kernel RBF, khi tăng gamma rất lớn thì mô hình có xu hướng gì?",
   "options": [
    "Biên quyết định gần như tuyến tính",
    "Mô hình luôn underfit",
    "Mỗi điểm huấn luyện chỉ ảnh hưởng một vùng rất nhỏ, biên quyết định phức tạp và dễ overfit",
    "Mô hình bỏ qua toàn bộ support vector"
   ],
   "answer": 2,
   "explain": "gamma quyết định bán kính ảnh hưởng của mỗi mẫu: K(x, x′) = exp(−γ‖x − x′‖²). γ lớn khiến kernel giảm rất nhanh nên biên quyết định bám sát từng điểm. γ nhỏ cho biên mượt, gần tuyến tính.",
   "source": "Câu soạn mới theo: scikit-learn User Guide"
  },
  {
   "id": 38,
   "q": "Áp global average pooling lên bản đồ đặc trưng kích thước 7 × 7 × 512 cho đầu ra kích thước bao nhiêu?",
   "options": [
    "512",
    "7 × 7",
    "25088",
    "49"
   ],
   "answer": 0,
   "explain": "Global average pooling lấy trung bình mỗi kênh trên toàn bộ 7 × 7 vị trí, nên mỗi kênh còn một số và thu được vector 512 chiều. Flatten trực tiếp thì sẽ được 7 × 7 × 512 = 25088.",
   "source": "Câu soạn mới theo: Dive into Deep Learning (d2l.ai)"
  },
  {
   "id": 39,
   "q": "Khi dùng mô hình pretrained trên ImageNet, vì sao phải chuẩn hóa ảnh với mean [0.485, 0.456, 0.406] và std [0.229, 0.224, 0.225]?",
   "options": [
    "Để tăng độ phân giải ảnh",
    "Vì PyTorch bắt buộc mọi mô hình dùng giá trị này",
    "Để đầu vào có cùng phân phối với dữ liệu mô hình đã được huấn luyện",
    "Để ảnh chuyển sang thang xám"
   ],
   "answer": 2,
   "explain": "Đây là trung bình và độ lệch chuẩn theo từng kênh RGB của ImageNet. Trọng số pretrained đã quen với đầu vào được chuẩn hóa như vậy; đổi cách chuẩn hóa làm đặc trưng bị lệch và giảm độ chính xác.",
   "source": "Câu soạn mới theo: PyTorch – Transfer Learning for Computer Vision tutorial"
  },
  {
   "id": 40,
   "q": "Dấu hiệu nào cho thấy mô hình có thể đang underfitting?",
   "options": [
    "Đường cong học rất mượt, không dao động",
    "Hiệu suất trên cả tập huấn luyện và tập validation đều kém và sớm chững lại",
    "Mất mát validation giảm nhanh hơn mất mát huấn luyện",
    "Accuracy huấn luyện cao hơn nhiều so với validation"
   ],
   "answer": 1,
   "explain": "Underfitting xảy ra khi mô hình không đủ năng lực học quy luật nên kém trên cả hai tập. Train tốt mà validation kém là overfitting.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 3, mục 5, câu 5"
  },
  {
   "id": 41,
   "q": "Thứ tự đúng của pipeline mô hình ngôn ngữ là gì?",
   "options": [
    "Tokenizer chuyển văn bản thành ID, mô hình xử lý ID và đưa ra dự đoán, rồi tokenizer có thể chuyển dự đoán ngược lại thành văn bản",
    "Mô hình chạy trước, tokenizer chạy song song không phụ thuộc",
    "Tokenizer chuyển văn bản thành ID, mô hình trả về văn bản ngay",
    "Mô hình đọc văn bản trực tiếp và đưa ra dự đoán, tokenizer chuyển dự đoán thành văn bản"
   ],
   "answer": 0,
   "explain": "Mô hình không hiểu văn bản thô, nó chỉ nhận các ID số. Đầu ra của mô hình cũng là số (logits), nên cần tokenizer giải mã nếu muốn có văn bản.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 2, câu 1"
  },
  {
   "id": 42,
   "q": "Trong khối residual của ResNet, khi số kênh của nhánh chính khác số kênh của đầu vào x thì làm thế nào để cộng được?",
   "options": [
    "Cộng x vào sau lớp fully connected cuối",
    "Nhân x với 0",
    "Bỏ kết nối tắt ở khối đó",
    "Đưa x qua tích chập 1 × 1 (có thể với stride) để khớp kích thước trước khi cộng"
   ],
   "answer": 3,
   "explain": "Phép cộng F(x) + x yêu cầu cùng shape. Khi số kênh hoặc kích thước không gian thay đổi, ResNet dùng nhánh chiếu (projection shortcut) là tích chập 1 × 1 để khớp shape.",
   "source": "Câu soạn mới theo: Dive into Deep Learning (d2l.ai)"
  },
  {
   "id": 43,
   "q": "Trong tutorial transfer learning của PyTorch, phép biến đổi dữ liệu nào chỉ nên áp cho tập huấn luyện mà không áp cho tập validation?",
   "options": [
    "RandomResizedCrop và RandomHorizontalFlip",
    "Normalize với mean/std của ImageNet",
    "ToTensor",
    "Resize và CenterCrop"
   ],
   "answer": 0,
   "explain": "Các phép ngẫu nhiên là augmentation, chỉ dùng khi huấn luyện để tăng đa dạng dữ liệu. Tập validation cần biến đổi tất định (Resize, CenterCrop, ToTensor, Normalize) để kết quả đánh giá ổn định.",
   "source": "Câu soạn mới theo: PyTorch – Transfer Learning for Computer Vision tutorial"
  },
  {
   "id": 44,
   "q": "Lợi ích chính của việc chuẩn hóa đầu vào (trừ trung bình, chia độ lệch chuẩn) khi huấn luyện mạng nơ-ron là gì?",
   "options": [
    "Thay thế được chính quy hóa",
    "Mặt hàm mất mát cân đối hơn nên có thể dùng learning rate lớn hơn và hội tụ nhanh hơn",
    "Giảm số lớp ẩn cần thiết",
    "Tự động loại bỏ ngoại lệ"
   ],
   "answer": 1,
   "explain": "Khi các đặc trưng có thang đo rất khác nhau, đường đồng mức của hàm mất mát bị kéo dài, gradient descent phải đi zíc zắc với bước nhỏ. Chuẩn hóa làm đường đồng mức tròn hơn nên tối ưu nhanh và ổn định hơn.",
   "source": "Câu soạn mới theo: deeplearning.ai – Improving Deep Neural Networks"
  },
  {
   "id": 45,
   "q": "Benchmark nào đánh giá kiến thức của mô hình ngôn ngữ trên 57 lĩnh vực khác nhau?",
   "options": [
    "GSM8K",
    "BBH (Big Bench Hard)",
    "ImageNet",
    "MMLU"
   ],
   "answer": 3,
   "explain": "MMLU (Massive Multitask Language Understanding) gồm câu hỏi trắc nghiệm ở 57 lĩnh vực, từ khoa học tới nhân văn. GSM8K tập trung vào toán tiểu học có lời văn, BBH tập trung vào các tác vụ suy luận khó.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 11, mục 5, câu 2"
  },
  {
   "id": 46,
   "q": "Trong gradient descent với momentum, nếu β = 0.9 thì trung bình trượt mũ (exponentially weighted average) xấp xỉ lấy trung bình của khoảng bao nhiêu gradient gần nhất?",
   "options": [
    "9",
    "90",
    "10",
    "100"
   ],
   "answer": 2,
   "explain": "Trung bình trượt mũ với hệ số β xấp xỉ trung bình của 1/(1 − β) giá trị gần nhất. Với β = 0.9 thì 1/0.1 = 10 bước.",
   "source": "Câu soạn mới theo: deeplearning.ai – Improving Deep Neural Networks"
  },
  {
   "id": 47,
   "q": "<code>AutoModel</code> là gì?",
   "options": [
    "Mô hình tự chọn siêu tham số tốt nhất",
    "Mô hình tự phát hiện ngôn ngữ đầu vào để tải trọng số phù hợp",
    "Đối tượng tự trả về đúng kiến trúc dựa trên checkpoint được chỉ định",
    "Mô hình tự động huấn luyện trên dữ liệu của bạn"
   ],
   "answer": 2,
   "explain": "AutoModel.from_pretrained(checkpoint) đọc file cấu hình của checkpoint để biết kiến trúc (BERT, GPT-2…) rồi tạo đúng lớp mô hình. Huấn luyện tự động là sản phẩm AutoTrain, không phải AutoModel.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 2, câu 5"
  },
  {
   "id": 48,
   "q": "Trong pipeline của tokenizer, bước \"chuẩn hóa\" (normalization) là gì?",
   "options": [
    "Đưa embedding về trung bình 0 và độ lệch chuẩn 1",
    "Các bước làm sạch văn bản ở giai đoạn đầu, như bỏ dấu, bỏ khoảng trắng thừa, chuyển chữ thường",
    "Kỹ thuật tăng cường dữ liệu bằng cách bỏ từ hiếm",
    "Bước hậu xử lý thêm các token đặc biệt"
   ],
   "answer": 1,
   "explain": "Normalization là bước đầu tiên của tokenizer. Thêm token đặc biệt là bước post-processing. Đưa giá trị về trung bình 0, độ lệch chuẩn 1 là nghĩa của \"chuẩn hóa\" trong thị giác máy tính, không phải trong tokenizer.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 6, câu 6"
  },
  {
   "id": 49,
   "q": "Khác biệt chính giữa bộ tối ưu Adam và AdamW là gì?",
   "options": [
    "AdamW tách riêng weight decay khỏi bước cập nhật dựa trên gradient (decoupled weight decay)",
    "AdamW dùng lịch learning rate khác",
    "AdamW chỉ dùng được cho Transformer",
    "AdamW tốn ít bộ nhớ hơn Adam"
   ],
   "answer": 0,
   "explain": "Trong Adam, chính quy hóa L2 được cộng vào gradient rồi bị chia cho căn bậc hai của moment bậc hai, nên tác dụng không đều. AdamW trừ weight decay trực tiếp vào trọng số, cho chính quy hóa tốt hơn. Bộ nhớ hai thuật toán gần như nhau.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 3, mục 4, câu 1"
  },
  {
   "id": 50,
   "q": "Tích lũy gradient (gradient accumulation) là gì và bật thế nào trong Trainer?",
   "options": [
    "Lưu gradient xuống đĩa, bật bằng <code>save_gradients=True</code>",
    "Chống tràn gradient, bật bằng <code>gradient_clipping=True</code>",
    "Tăng tốc tính gradient, tự bật khi dùng fp16",
    "Cộng dồn gradient qua nhiều batch rồi mới cập nhật trọng số, bật bằng <code>gradient_accumulation_steps</code>"
   ],
   "answer": 3,
   "explain": "Tích lũy gradient mô phỏng batch lớn khi bộ nhớ chỉ đủ cho batch nhỏ. Ví dụ batch 8 với gradient_accumulation_steps=4 tương đương batch hiệu dụng 32. Chống tràn gradient là gradient clipping, một kỹ thuật khác.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 3, mục 3, câu 6"
  },
  {
   "id": 51,
   "q": "Phát biểu nào đúng về thuật toán DBSCAN?",
   "options": [
    "Chỉ tìm được cụm hình cầu",
    "Tìm được cụm có hình dạng bất kỳ và gán nhãn −1 cho điểm nhiễu",
    "Mọi điểm đều bắt buộc thuộc một cụm",
    "Cần biết trước số cụm K"
   ],
   "answer": 1,
   "explain": "DBSCAN dựa trên mật độ với hai tham số eps (bán kính lân cận) và min_samples. Cụm là vùng điểm dày đặc nối với nhau; điểm không thuộc vùng dày nào là nhiễu với nhãn −1.",
   "source": "Câu soạn mới theo: scikit-learn User Guide"
  },
  {
   "id": 52,
   "q": "Trong một vòng lặp huấn luyện, thứ tự thao tác nào đúng?",
   "options": [
    "Forward → xóa gradient → backward → optimizer step",
    "Backward → forward → optimizer step → xóa gradient",
    "Forward → backward → optimizer step → scheduler step → xóa gradient",
    "Xóa gradient → forward → optimizer step → backward"
   ],
   "answer": 2,
   "explain": "Tính mất mát (forward), tính gradient (backward), cập nhật tham số (optimizer.step), cập nhật learning rate (scheduler.step), rồi xóa gradient (zero_grad) để không cộng dồn sang bước sau. Xóa gradient giữa forward và backward sẽ không xóa gì cả, còn đặt trước optimizer.step thì làm mất gradient vừa tính.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 3, mục 4, câu 2"
  },
  {
   "id": 53,
   "q": "Pipeline <code>question-answering</code> xử lý ngữ cảnh dài thế nào?",
   "options": [
    "Cắt bỏ phần vượt quá độ dài tối đa của mô hình",
    "Chia thành nhiều đoạn rồi lấy trung bình kết quả",
    "Chia thành nhiều đoạn không chồng lấn để tiết kiệm tính toán",
    "Chia ngữ cảnh thành nhiều đoạn có phần chồng lấn, rồi chọn câu trả lời có điểm cao nhất trong các đoạn"
   ],
   "answer": 3,
   "explain": "Lấy trung bình không hợp lý vì nhiều đoạn không chứa câu trả lời. Phần chồng lấn tránh trường hợp câu trả lời bị cắt đôi ở ranh giới hai đoạn.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 6, câu 5"
  },
  {
   "id": 54,
   "q": "Với kernel 7 × 7 và stride 1, cần padding bao nhiêu ở mỗi phía để kích thước đầu ra bằng đầu vào (\"same\")?",
   "options": [
    "1",
    "2",
    "3",
    "7"
   ],
   "answer": 2,
   "explain": "Để giữ nguyên kích thước với stride 1: p = (k − 1)/2 = (7 − 1)/2 = 3.",
   "source": "Câu soạn mới theo: Stanford CS231n – CNNs for Visual Recognition"
  },
  {
   "id": 55,
   "q": "Đầu vào kích thước 63 × 63 × 16 đi qua lớp tích chập có 32 bộ lọc 7 × 7, stride 2, không padding. Kích thước đầu ra là bao nhiêu?",
   "options": [
    "28 × 28 × 32",
    "29 × 29 × 32",
    "29 × 29 × 16",
    "57 × 57 × 32"
   ],
   "answer": 1,
   "explain": "Kích thước không gian = ⌊(63 − 7)/2⌋ + 1 = 28 + 1 = 29. Số kênh đầu ra bằng số bộ lọc, 32. Kết quả: 29 × 29 × 32.",
   "source": "Câu soạn mới theo: Stanford CS231n – CNNs for Visual Recognition"
  },
  {
   "id": 56,
   "q": "Trong SimCLR, cặp mẫu dương (positive pair) được tạo ra thế nào, và vì sao batch lớn có lợi?",
   "options": [
    "Hai phép tăng cường khác nhau của cùng một ảnh; batch lớn cung cấp nhiều mẫu âm hơn cho contrastive loss",
    "Hai ảnh khác nhau cùng nhãn; batch lớn giảm bộ nhớ",
    "Hai ảnh ngẫu nhiên bất kỳ; batch lớn không có tác dụng",
    "Một ảnh và nhãn của nó; batch lớn làm mô hình nhỏ hơn"
   ],
   "answer": 0,
   "explain": "SimCLR không dùng nhãn. Mỗi ảnh tạo hai view bằng crop, đổi màu, làm mờ… Hai view đó là cặp dương; các view của mọi ảnh khác trong batch là mẫu âm. Nhiều mẫu âm hơn giúp biểu diễn học được tốt hơn.",
   "source": "Câu soạn mới theo: IOAI Syllabus (Computer Vision, Generative, Self-supervised)"
  },
  {
   "id": 57,
   "q": "ROC AUC bằng 0.5 nói lên điều gì về bộ phân loại nhị phân?",
   "options": [
    "Bộ phân loại hoàn hảo",
    "Độ chính xác đúng bằng 50%",
    "Khả năng xếp hạng không tốt hơn đoán ngẫu nhiên",
    "Bộ phân loại luôn đoán sai"
   ],
   "answer": 2,
   "explain": "AUC là xác suất một mẫu dương ngẫu nhiên được chấm điểm cao hơn một mẫu âm ngẫu nhiên. 0.5 tương đương tung đồng xu, 1.0 là hoàn hảo. AUC không đồng nghĩa với accuracy.",
   "source": "Câu soạn mới theo: scikit-learn User Guide"
  },
  {
   "id": 58,
   "q": "Lợi ích chính của RLHF (học tăng cường từ phản hồi của con người) khi huấn luyện mô hình ngôn ngữ là gì?",
   "options": [
    "Thay thế hoàn toàn giai đoạn pretraining",
    "Giúp mô hình phù hợp hơn với sở thích và giá trị của con người",
    "Giúp mô hình sinh văn bản nhanh hơn",
    "Giảm bộ nhớ mô hình sử dụng"
   ],
   "answer": 1,
   "explain": "RLHF dùng phản hồi của con người (thường qua một reward model học từ các so sánh) để hướng mô hình tới câu trả lời hữu ích, vô hại và trung thực hơn. Nó không nhằm cải thiện tốc độ hay bộ nhớ.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 12, mục 2, câu 2"
  },
  {
   "id": 59,
   "q": "Tính IoU giữa hai hộp có tọa độ (x<sub>1</sub>, y<sub>1</sub>, x<sub>2</sub>, y<sub>2</sub>) là (0, 0, 4, 4) và (2, 2, 6, 6).",
   "options": [
    "0.143",
    "0.250",
    "0.333",
    "0.500"
   ],
   "answer": 0,
   "explain": "Vùng giao từ (2, 2) đến (4, 4), diện tích 2 × 2 = 4. Mỗi hộp có diện tích 16. Hợp = 16 + 16 − 4 = 28. IoU = 4/28 ≈ 0.143.",
   "source": "Câu soạn mới theo: IOAI Syllabus (Computer Vision, Generative, Self-supervised)"
  },
  {
   "id": 60,
   "q": "Muốn lấy mẫu learning rate α trong khoảng [10<sup>−4</sup>, 1] cho hợp lý, nên làm thế nào?",
   "options": [
    "Lấy r ngẫu nhiên đều trong [−4, 0] rồi đặt α = 10<sup>r</sup>",
    "Chỉ thử hai giá trị 10<sup>−4</sup> và 1",
    "Lấy α ngẫu nhiên đều trong [0.0001, 1]",
    "Lấy α = 10<sup>−4</sup> × r với r đều trong [0, 1]"
   ],
   "answer": 0,
   "explain": "Lấy đều trên thang tuyến tính sẽ dồn khoảng 90% mẫu vào [0.1, 1]. Lấy mẫu trên thang log chia đều cho mỗi bậc độ lớn (10<sup>−4</sup>…10<sup>−3</sup>, 10<sup>−3</sup>…10<sup>−2</sup>, …).",
   "source": "Câu soạn mới theo: deeplearning.ai – Improving Deep Neural Networks"
  },
  {
   "id": 61,
   "q": "Khi nào nên huấn luyện một tokenizer mới?",
   "options": [
    "Khi dữ liệu khác dữ liệu của mô hình pretrained nhưng bạn muốn fine-tune mô hình pretrained đó",
    "Khi dữ liệu giống dữ liệu của mô hình pretrained và bạn muốn pretrain mô hình mới",
    "Khi dữ liệu giống dữ liệu của mô hình pretrained và bạn muốn fine-tune mô hình đó",
    "Khi dữ liệu khác với dữ liệu của mô hình pretrained hiện có và bạn muốn pretrain một mô hình mới"
   ],
   "answer": 3,
   "explain": "Fine-tune một mô hình pretrained luôn phải dùng đúng tokenizer của nó. Khi pretrain mô hình mới trên dữ liệu giống dữ liệu cũ thì dùng lại tokenizer cũ là đủ. Chỉ khi pretrain trên miền dữ liệu khác (ngôn ngữ khác, mã nguồn…) thì tokenizer mới mới có lợi.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 6, câu 1"
  },
  {
   "id": 62,
   "q": "Một bộ phân loại softmax 10 lớp được khởi tạo với trọng số rất nhỏ. Giá trị mất mát cross-entropy ban đầu hợp lý nhất là bao nhiêu?",
   "options": [
    "≈ 0",
    "≈ 1",
    "≈ 2.30",
    "≈ 10"
   ],
   "answer": 2,
   "explain": "Trọng số nhỏ làm mọi lớp có xác suất gần bằng nhau, 1/10. Mất mát = −ln(1/10) = ln 10 ≈ 2.30. Nếu mất mát ban đầu khác xa giá trị này thì có thể đã cài đặt sai.",
   "source": "Câu soạn mới theo: Stanford CS231n – CNNs for Visual Recognition"
  },
  {
   "id": 63,
   "q": "Vì sao cho mô hình overfit một batch thường là kỹ thuật gỡ lỗi tốt?",
   "options": [
    "Không phải kỹ thuật tốt, vì overfitting luôn xấu",
    "Nó làm mô hình tổng quát hóa tốt hơn",
    "Nó kiểm tra nhanh mô hình có khả năng đưa mất mát về gần 0 hay không",
    "Nó kiểm tra shape của đầu vào và nhãn có đúng không"
   ],
   "answer": 2,
   "explain": "Với một batch nhỏ (chỉ vài mẫu), mô hình cài đặt đúng phải học thuộc được. Nếu mất mát không giảm thì có lỗi trong dữ liệu, hàm mất mát hay vòng lặp huấn luyện. Shape sai thì đã không chạy được ngay từ đầu.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 8, câu 7"
  },
  {
   "id": 64,
   "q": "Phát biểu nào đúng về thuật toán tokenization Unigram?",
   "options": [
    "Bắt đầu với từ vựng lớn và loại dần token sao cho mất mát trên toàn bộ corpus tăng ít nhất",
    "Tách từ thành ký tự rồi áp quy tắc gộp",
    "Bắt đầu với từ vựng nhỏ và học quy tắc gộp",
    "Giữ lại các từ con xuất hiện nhiều nhất"
   ],
   "answer": 0,
   "explain": "Unigram điều chỉnh từ vựng bằng cách tối thiểu hóa mất mát tính trên toàn corpus. Khi mã hóa, nó chọn cách tách có xác suất cao nhất theo mô hình. Học quy tắc gộp từ từ vựng nhỏ là cách của BPE và WordPiece.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 6, câu 10"
  },
  {
   "id": 65,
   "q": "Hiện tượng \"mode collapse\" trong GAN là gì?",
   "options": [
    "Discriminator không còn tham số",
    "Mất mát của generator luôn bằng 0",
    "Ảnh sinh ra có độ phân giải quá cao",
    "Generator chỉ sinh ra một vài kiểu mẫu rất giống nhau, bỏ qua sự đa dạng của dữ liệu thật"
   ],
   "answer": 3,
   "explain": "Generator tìm được vài mẫu đánh lừa được discriminator nên cứ sinh lặp lại chúng. Ví dụ huấn luyện trên chữ số 0–9 mà chỉ sinh ra chữ số 1.",
   "source": "Câu soạn mới theo: IOAI Syllabus (Computer Vision, Generative, Self-supervised)"
  },
  {
   "id": 66,
   "q": "Quá trình \"thuận\" (forward process) của mô hình khuếch tán (diffusion model) là gì?",
   "options": [
    "Sinh ảnh từ nhiễu trong một bước",
    "Thêm dần nhiễu Gaussian vào dữ liệu qua nhiều bước cho đến khi gần như là nhiễu thuần",
    "Nén ảnh thành vector ẩn bằng encoder",
    "Cho generator và discriminator đối kháng"
   ],
   "answer": 1,
   "explain": "Quá trình thuận cố định, không cần học. Mô hình học quá trình ngược: dự đoán nhiễu đã thêm ở từng bước để khử nhiễu dần, nhờ đó sinh ảnh mới từ nhiễu ngẫu nhiên.",
   "source": "Câu soạn mới theo: IOAI Syllabus (Computer Vision, Generative, Self-supervised)"
  },
  {
   "id": 67,
   "q": "Một bộ phân loại có TP = 40, FP = 10, FN = 20. Precision và recall lần lượt là bao nhiêu?",
   "options": [
    "0.8 và 0.667",
    "0.667 và 0.8",
    "0.8 và 0.8",
    "0.5 và 0.667"
   ],
   "answer": 0,
   "explain": "Precision = TP/(TP + FP) = 40/50 = 0.8. Recall = TP/(TP + FN) = 40/60 ≈ 0.667.",
   "source": "Câu soạn mới theo: scikit-learn User Guide"
  },
  {
   "id": 68,
   "q": "Vấn đề gì nảy sinh khi tokenize các từ trong bài toán phân loại token (token classification) và muốn gán nhãn cho token?",
   "options": [
    "Tokenizer làm mất toàn bộ dấu câu",
    "Tokenizer thêm token đặc biệt mà không có cách nào xử lý",
    "Một từ có thể sinh ra nhiều token nên số token nhiều hơn số nhãn, cần căn chỉnh nhãn với token",
    "Token thêm vào không có nhãn nên không có vấn đề gì"
   ],
   "answer": 2,
   "explain": "Nhãn ban đầu gán theo từ. Sau khi tách subword, một từ như \"Brooklyn\" có thể thành nhiều token, nên phải căn chỉnh lại. Token đặc biệt được gán nhãn −100 để bị bỏ qua khi tính mất mát.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 7, câu 3"
  },
  {
   "id": 69,
   "q": "\"Học chuyển giao\" (transfer learning) có nghĩa là gì?",
   "options": [
    "Huấn luyện mô hình thứ hai trên đúng bộ dữ liệu của mô hình thứ nhất",
    "Chuyển kiến thức của mô hình pretrained sang mô hình mới bằng cách khởi tạo mô hình mới bằng trọng số của mô hình pretrained",
    "Chép dữ liệu huấn luyện của mô hình cũ sang mô hình mới",
    "Xây mô hình thứ hai có cùng kiến trúc với mô hình thứ nhất nhưng khởi tạo ngẫu nhiên"
   ],
   "answer": 1,
   "explain": "Khi mô hình thứ hai được huấn luyện cho tác vụ mới, nó kế thừa kiến thức qua trọng số của mô hình thứ nhất. Chỉ dùng chung kiến trúc thì không chuyển được kiến thức nào.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 1, câu 5"
  },
  {
   "id": 70,
   "q": "Để tóm tắt văn bản, nên dùng loại mô hình nào?",
   "options": [
    "Mô hình decoder",
    "Mô hình hồi quy tuyến tính",
    "Mô hình encoder",
    "Mô hình sequence-to-sequence"
   ],
   "answer": 3,
   "explain": "Seq2seq (encoder-decoder) đọc toàn bộ văn bản bằng encoder rồi sinh bản tóm tắt bằng decoder. Đây là lựa chọn được khóa học khuyên dùng cho tóm tắt.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 1, câu 9"
  },
  {
   "id": 71,
   "q": "Mục đích của khởi tạo k-means++ là gì?",
   "options": [
    "Chọn các tâm ban đầu nằm xa nhau, giúp hội tụ nhanh hơn và ít rơi vào nghiệm kém",
    "Bảo đảm tìm được cực tiểu toàn cục",
    "Cho phép K-means dùng dữ liệu có nhãn",
    "Tự động chọn số cụm K"
   ],
   "answer": 0,
   "explain": "k-means++ chọn tâm đầu tiên ngẫu nhiên, các tâm tiếp theo được chọn với xác suất tỉ lệ với bình phương khoảng cách tới tâm gần nhất đã chọn. Nó không bảo đảm nghiệm tối ưu toàn cục, nên scikit-learn vẫn chạy nhiều lần (n_init).",
   "source": "Câu soạn mới theo: scikit-learn User Guide"
  },
  {
   "id": 72,
   "q": "Khác biệt chính giữa bộ phát hiện một giai đoạn (như YOLO, SSD) và hai giai đoạn (như Faster R-CNN) là gì?",
   "options": [
    "Hai giai đoạn sinh vùng đề xuất (region proposals) trước rồi mới phân loại và tinh chỉnh; một giai đoạn dự đoán hộp và lớp trực tiếp trong một lần chạy",
    "Một giai đoạn luôn chính xác hơn",
    "Hai giai đoạn không dùng CNN",
    "Một giai đoạn chỉ phát hiện được một vật thể mỗi ảnh"
   ],
   "answer": 0,
   "explain": "Faster R-CNN dùng mạng đề xuất vùng (RPN) rồi phân loại từng vùng, thường chính xác hơn nhưng chậm hơn. YOLO và SSD dự đoán dày đặc trên lưới hoặc anchor nên nhanh, phù hợp thời gian thực.",
   "source": "Câu soạn mới theo: Stanford CS231n – CNNs for Visual Recognition"
  },
  {
   "id": 73,
   "q": "Chỉ số mAP (mean Average Precision) trong phát hiện vật thể được tính thế nào?",
   "options": [
    "Lấy accuracy trên toàn bộ ảnh",
    "Đếm số hộp dự đoán đúng chia cho số ảnh",
    "Tính Average Precision (diện tích dưới đường precision–recall) cho từng lớp ở một ngưỡng IoU, rồi lấy trung bình các lớp",
    "Lấy trung bình IoU của mọi hộp dự đoán"
   ],
   "answer": 2,
   "explain": "Một dự đoán được coi là đúng khi IoU với hộp thật vượt ngưỡng (ví dụ 0.5). AP tổng hợp precision ở các mức recall. COCO còn lấy trung bình mAP qua nhiều ngưỡng IoU từ 0.5 đến 0.95.",
   "source": "Câu soạn mới theo: IOAI Syllabus (Computer Vision, Generative, Self-supervised)"
  },
  {
   "id": 74,
   "q": "Cần thay \"...\" bằng chuỗi nào trong đoạn mã sau?<pre>from transformers import pipeline\n\nfiller = pipeline(\"fill-mask\", model=\"bert-base-cased\")\nresult = filler(\"...\")</pre>",
   "options": [
    "<code>This &lt;mask&gt; has been waiting for you.</code>",
    "<code>This man has been waiting for you.</code>",
    "<code>This [PAD] has been waiting for you.</code>",
    "<code>This [MASK] has been waiting for you.</code>"
   ],
   "answer": 3,
   "explain": "Pipeline fill-mask cần một token che trong câu. Token che của bert-base-cased là [MASK]; &lt;mask&gt; là token che của RoBERTa. Câu không có token che thì không có gì để điền.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 1, câu 3"
  },
  {
   "id": 75,
   "q": "Biến <code>result</code> trong đoạn mã sau chứa gì?<pre>from transformers import AutoTokenizer\n\ntokenizer = AutoTokenizer.from_pretrained(\"bert-base-cased\")\nresult = tokenizer.tokenize(\"Hello!\")</pre>",
   "options": [
    "Một chuỗi chứa tất cả token nối lại",
    "Danh sách các chuỗi, mỗi chuỗi là một token",
    "Một tensor PyTorch",
    "Danh sách các ID"
   ],
   "answer": 1,
   "explain": "tokenize() chỉ tách văn bản thành token dạng chuỗi, ví dụ [\"Hello\", \"!\"]. Muốn có ID cần gọi convert_tokens_to_ids() hoặc gọi trực tiếp tokenizer(...).",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 2, câu 9"
  },
  {
   "id": 76,
   "q": "Phát biểu nào đúng về thuật toán tokenization WordPiece?",
   "options": [
    "Bắt đầu với từ vựng lớn rồi loại dần token",
    "Tìm cách tách có xác suất cao nhất theo mô hình",
    "Khi mã hóa, tìm từ con dài nhất từ đầu từ có trong từ vựng rồi lặp lại với phần còn lại",
    "Gộp cặp token xuất hiện thường xuyên nhất"
   ],
   "answer": 2,
   "explain": "WordPiece học quy tắc gộp theo điểm số ưu tiên cặp phổ biến nhưng gồm các phần riêng lẻ ít phổ biến, và mã hóa theo kiểu tìm từ con dài nhất. Gộp theo tần suất là BPE; tìm cách tách xác suất cao nhất là Unigram.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 6, câu 9"
  },
  {
   "id": 77,
   "q": "Xếp chồng ba lớp tích chập 3 × 3 (stride 1) có vùng tiếp nhận (receptive field) bằng một lớp 7 × 7. Lợi ích của cách xếp chồng là gì?",
   "options": [
    "Ít tham số hơn và có thêm phi tuyến giữa các lớp",
    "Nhiều tham số hơn nên biểu diễn mạnh hơn",
    "Không cần hàm kích hoạt",
    "Đầu ra có độ phân giải cao hơn"
   ],
   "answer": 0,
   "explain": "Với C kênh vào và ra, ba lớp 3 × 3 cần 3 × 9C² = 27C² tham số, còn một lớp 7 × 7 cần 49C². Ngoài ra có ba lần ReLU thay vì một nên mạng biểu diễn được hàm phức tạp hơn. Đây là ý tưởng của VGG.",
   "source": "Câu soạn mới theo: Stanford CS231n – CNNs for Visual Recognition"
  },
  {
   "id": 78,
   "q": "Tác dụng chính của tích chập 1 × 1 trong các mạng như GoogLeNet hay ResNet là gì?",
   "options": [
    "Phát hiện cạnh theo phương ngang",
    "Tăng kích thước không gian của ảnh",
    "Thay thế hoàn toàn lớp pooling",
    "Thay đổi số kênh (ví dụ giảm số kênh) với chi phí tính toán thấp"
   ],
   "answer": 3,
   "explain": "Tích chập 1 × 1 là một lớp fully connected áp tại từng điểm ảnh, trộn thông tin giữa các kênh. Nó thường dùng làm \"bottleneck\" giảm số kênh trước tích chập 3 × 3 hoặc 5 × 5 đắt tiền.",
   "source": "Câu soạn mới theo: Dive into Deep Learning (d2l.ai)"
  },
  {
   "id": 79,
   "q": "Cách tốt nhất để gỡ lỗi một lỗi CUDA khó hiểu là gì?",
   "options": [
    "Đăng thông báo lỗi lên diễn đàn",
    "Chạy lại cùng đoạn mã trên CPU để nhận thông báo lỗi rõ ràng hơn",
    "Đọc traceback để tìm nơi gây lỗi",
    "Khởi động lại kernel Jupyter"
   ],
   "answer": 1,
   "explain": "Phần lớn thao tác CUDA chạy bất đồng bộ nên lỗi thường không được báo tại đúng dòng gây ra, và thông báo lỗi CUDA rất ít thông tin. Trên CPU, lỗi (ví dụ chỉ số nhãn vượt số lớp) được báo rõ tại đúng chỗ. Giảm batch size chỉ hữu ích với lỗi hết bộ nhớ.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 8, câu 5"
  },
  {
   "id": 80,
   "q": "Gọi <code>model.eval()</code> trước khi đánh giá có tác dụng gì?",
   "options": [
    "Bật tính gradient cho các chỉ số đánh giá",
    "Tự động tính các chỉ số đánh giá",
    "Thay đổi hành vi của các lớp như dropout và batch normalization sang chế độ suy luận",
    "Đóng băng tham số để không thể cập nhật"
   ],
   "answer": 2,
   "explain": "Ở chế độ eval, dropout bị tắt và batch norm dùng thống kê tích lũy thay cho thống kê của batch hiện tại. Đóng băng tham số là đặt requires_grad=False; muốn tắt gradient khi đánh giá thì dùng torch.no_grad().",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 3, mục 4, câu 5"
  },
  {
   "id": 81,
   "q": "Câu nào mô tả đúng nhất ba khái niệm \"mô hình\" (model), \"kiến trúc\" (architecture) và \"trọng số\" (weights)?",
   "options": [
    "Kiến trúc là chuỗi các hàm toán học tạo nên mô hình, còn trọng số là tham số của các hàm đó",
    "Kiến trúc là bản đồ để xây mô hình, trọng số là các thành phố trên bản đồ",
    "Nếu mô hình là tòa nhà thì kiến trúc là bản thiết kế, trọng số là người sống trong tòa nhà",
    "Kiến trúc và trọng số là một"
   ],
   "answer": 0,
   "explain": "Cùng một kiến trúc (tập hàm toán học) có thể tạo ra nhiều mô hình khác nhau khi dùng các bộ tham số (trọng số) khác nhau, ví dụ cùng kiến trúc BERT nhưng checkpoint tiếng Anh và tiếng Việt.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 1, câu 7"
  },
  {
   "id": 82,
   "q": "Ma trận nhầm lẫn của một bộ phân loại nhị phân có TN = 50, FP = 10, FN = 5, TP = 35. Độ chính xác (accuracy) là bao nhiêu?",
   "options": [
    "78%",
    "80%",
    "85%",
    "87.5%"
   ],
   "answer": 2,
   "explain": "Accuracy = (TP + TN)/tổng = (35 + 50)/100 = 85%.",
   "source": "Câu soạn mới theo: scikit-learn User Guide"
  },
  {
   "id": 83,
   "q": "Trường <code>token_type_ids</code> trong đầu ra tokenizer của BERT biểu diễn điều gì?",
   "options": [
    "Vị trí của từng token trong chuỗi",
    "Mỗi token thuộc câu nào khi xử lý cặp câu",
    "ID trong từ vựng của từng token",
    "Mặt nạ attention của từng token"
   ],
   "answer": 1,
   "explain": "token_type_ids bằng 0 cho câu thứ nhất và 1 cho câu thứ hai. Vị trí do position embeddings đảm nhận, attention_mask là trường riêng, còn ID từ vựng là input_ids.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 3, mục 2, câu 3"
  },
  {
   "id": 84,
   "q": "Trong kỹ thuật \"inverted dropout\" với xác suất giữ lại keep_prob, vì sao các activation được chia cho keep_prob khi huấn luyện?",
   "options": [
    "Để tăng tốc độ tính toán trên GPU",
    "Để giảm số tham số của mạng",
    "Để các nơ-ron bị tắt có gradient bằng 0",
    "Để giữ nguyên giá trị kỳ vọng của activation, nhờ đó không phải điều chỉnh gì khi suy luận"
   ],
   "answer": 3,
   "explain": "Khi tắt ngẫu nhiên một phần nơ-ron, tổng activation giảm đi theo tỉ lệ keep_prob. Chia cho keep_prob bù lại phần này nên kỳ vọng không đổi. Nhờ vậy lúc suy luận chỉ cần tắt dropout, không phải nhân thêm hệ số.",
   "source": "Câu soạn mới theo: deeplearning.ai – Improving Deep Neural Networks"
  },
  {
   "id": 85,
   "q": "Phát biểu nào đúng về nhãn dữ liệu khi pretraining mô hình ngôn ngữ?",
   "options": [
    "Chỉ dùng được dữ liệu đã dịch sang nhiều ngôn ngữ",
    "Bắt buộc mọi câu phải được con người gán nhãn cảm xúc",
    "Cần nhãn từ loại cho từng từ",
    "Thường không cần nhãn do con người gán, vì nhãn được tạo tự động từ chính văn bản (tự giám sát)"
   ],
   "answer": 3,
   "explain": "Pretraining thường là tự giám sát (self-supervised): mô hình dự đoán từ tiếp theo hoặc điền từ bị che, nên nhãn lấy luôn từ văn bản đầu vào.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 1, câu 6"
  },
  {
   "id": 86,
   "q": "\"Head\" của mô hình (model head) là gì?",
   "options": [
    "Thành phần bổ sung, thường gồm một hoặc vài lớp, chuyển đầu ra của Transformer thành đầu ra theo tác vụ cụ thể",
    "Một thành phần trong mạng Transformer cơ sở chuyển tensor tới đúng lớp",
    "Lớp embedding đầu tiên của mô hình",
    "Tên gọi khác của cơ chế self-attention"
   ],
   "answer": 0,
   "explain": "Có nhiều loại head: language modeling head, question answering head, sequence classification head… Cùng một thân Transformer có thể gắn các head khác nhau. Self-attention có \"attention heads\" nhưng đó là khái niệm khác.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 2, câu 4"
  },
  {
   "id": 87,
   "q": "Một bộ phân loại có precision 0.9 và recall 0.6. Điểm F1 của nó là bao nhiêu?",
   "options": [
    "0.60",
    "0.72",
    "0.75",
    "0.80"
   ],
   "answer": 1,
   "explain": "F1 = 2PR / (P + R) = 2 × 0.9 × 0.6 / 1.5 = 1.08 / 1.5 = 0.72. F1 là trung bình điều hòa nên bị kéo về giá trị nhỏ hơn.",
   "source": "Câu soạn mới theo: deeplearning.ai – Structuring Machine Learning Projects"
  },
  {
   "id": 88,
   "q": "Đoạn mã sau trả về gì?<pre>from transformers import pipeline\n\nner = pipeline(\"ner\", aggregation_strategy=\"simple\")\nner(\"My name is Sylvain and I work at Hugging Face in Brooklyn.\")</pre>",
   "options": [
    "Một đoạn văn bản sinh tiếp câu đã cho",
    "Bản dịch của câu sang tiếng Pháp",
    "Các cụm từ chỉ người, tổ chức hoặc địa điểm trong câu",
    "Điểm phân loại câu với nhãn \"positive\" hoặc \"negative\""
   ],
   "answer": 2,
   "explain": "Pipeline \"ner\" (nhận dạng thực thể có tên) gán nhãn PER, ORG, LOC… cho từng token. Với aggregation_strategy=\"simple\", các token cùng một thực thể được gộp lại, ví dụ \"Hugging Face\" thành một thực thể ORG.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 1, câu 2"
  },
  {
   "id": 89,
   "q": "Đoạn mã sau có vấn đề gì?<pre>from transformers import AutoTokenizer, AutoModel\n\ntokenizer = AutoTokenizer.from_pretrained(\"bert-base-cased\")\nmodel = AutoModel.from_pretrained(\"gpt2\")\n\nencoded = tokenizer(\"Hey!\", return_tensors=\"pt\")\nresult = model(**encoded)</pre>",
   "options": [
    "Không có vấn đề gì",
    "Tokenizer và mô hình phải đến từ cùng một checkpoint",
    "Phải padding và truncation vì mọi đầu vào là batch",
    "Phải dùng return_tensors=\"np\" thay cho \"pt\""
   ],
   "answer": 1,
   "explain": "Tokenizer của BERT sinh ID theo từ vựng của BERT, còn GPT-2 có từ vựng khác. Mô hình nhận ID trỏ sai token nên kết quả vô nghĩa. Với một câu duy nhất thì padding hay truncation không cần thiết.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 2, câu 10"
  },
  {
   "id": 90,
   "q": "Với lớp dùng hàm kích hoạt ReLU, cách khởi tạo trọng số He chọn phương sai của trọng số bằng bao nhiêu (n là số đầu vào của lớp)?",
   "options": [
    "1 / (2n)",
    "n / 2",
    "1 / n",
    "2 / n"
   ],
   "answer": 3,
   "explain": "He initialization dùng Var(w) = 2/n, phù hợp với ReLU vì ReLU triệt tiêu khoảng một nửa tín hiệu. Xavier dùng 1/n (hoặc 2/(n_in + n_out)) cho tanh/sigmoid. Mục tiêu là giữ phương sai activation ổn định qua các lớp, tránh gradient biến mất hoặc bùng nổ.",
   "source": "Câu soạn mới theo: deeplearning.ai – Improving Deep Neural Networks"
  },
  {
   "id": 91,
   "q": "Khác biệt giữa macro-average và micro-average khi tính F1 cho bài toán nhiều lớp là gì?",
   "options": [
    "Macro chỉ dùng cho bài toán nhị phân",
    "Micro bỏ qua lớp hiếm hoàn toàn",
    "Macro tính F1 từng lớp rồi lấy trung bình đều; micro gộp TP, FP, FN của mọi lớp rồi mới tính",
    "Hai cách luôn cho cùng kết quả"
   ],
   "answer": 2,
   "explain": "Macro coi mọi lớp quan trọng như nhau nên phản ánh tốt hiệu suất trên lớp hiếm. Micro bị lớp đông mẫu chi phối; với phân loại đơn nhãn, micro-F1 bằng accuracy.",
   "source": "Câu soạn mới theo: scikit-learn User Guide"
  },
  {
   "id": 92,
   "q": "Lớp max pooling 2 × 2, stride 2 có bao nhiêu tham số học được?",
   "options": [
    "0",
    "4",
    "1",
    "2"
   ],
   "answer": 0,
   "explain": "Pooling chỉ áp phép toán cố định (lấy max hoặc trung bình) nên không có tham số học. Kích thước cửa sổ và stride là siêu tham số.",
   "source": "Câu soạn mới theo: Stanford CS231n – CNNs for Visual Recognition"
  },
  {
   "id": 93,
   "q": "Để phân loại văn bản đầu vào theo các nhãn cho trước, nên dùng loại mô hình nào?",
   "options": [
    "Mô hình encoder",
    "Mô hình khuếch tán",
    "Mô hình decoder",
    "Mô hình sequence-to-sequence"
   ],
   "answer": 0,
   "explain": "Encoder (như BERT) tạo biểu diễn của toàn bộ câu, có ngữ cảnh hai chiều, rất phù hợp để gắn thêm đầu phân loại.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 1, câu 10"
  },
  {
   "id": 94,
   "q": "Gradient Boosting xây dựng tập hợp cây theo cách nào?",
   "options": [
    "Song song và độc lập trên các mẫu bootstrap",
    "Tuần tự: mỗi cây mới học phần sai số (gradient âm của hàm mất mát) mà các cây trước để lại",
    "Một cây duy nhất rất sâu",
    "Ngẫu nhiên hóa toàn bộ ngưỡng tách"
   ],
   "answer": 1,
   "explain": "Boosting cộng dần các mô hình yếu, mỗi mô hình sửa lỗi của tổng hiện tại. Bagging/Random Forest thì huấn luyện các cây độc lập rồi lấy trung bình.",
   "source": "Câu soạn mới theo: scikit-learn User Guide"
  },
  {
   "id": 95,
   "q": "Tích chập depthwise separable (như trong MobileNet) với 64 kênh vào, 64 kênh ra, kernel 3 × 3 cần bao nhiêu trọng số (bỏ qua bias)? Tích chập thường cần 36 864.",
   "options": [
    "576",
    "4 096",
    "4 672",
    "36 864"
   ],
   "answer": 2,
   "explain": "Depthwise: mỗi kênh một bộ lọc 3 × 3, tức 3 × 3 × 64 = 576. Pointwise 1 × 1 trộn kênh: 64 × 64 = 4 096. Tổng 4 672, ít hơn khoảng 8 lần so với tích chập thường (3 × 3 × 64 × 64 = 36 864).",
   "source": "Câu soạn mới theo: Dive into Deep Learning (d2l.ai)"
  },
  {
   "id": 96,
   "q": "Phương pháp nào sau đây KHÔNG phải là tokenization theo từ con (subword)?",
   "options": [
    "Tokenization theo ký tự (character-based)",
    "WordPiece",
    "BPE",
    "Unigram"
   ],
   "answer": 0,
   "explain": "WordPiece, BPE và Unigram đều là thuật toán subword. Tokenization theo ký tự tách mọi ký tự riêng, còn tách theo khoảng trắng và dấu câu là tokenization theo từ.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 2, câu 3"
  },
  {
   "id": 97,
   "q": "Mặt nạ dự đoán A có 40 pixel, mặt nạ thật B có 50 pixel, phần giao có 30 pixel. Hệ số Dice bằng bao nhiêu?",
   "options": [
    "0.500",
    "0.600",
    "0.667",
    "0.750"
   ],
   "answer": 2,
   "explain": "Dice = 2|A ∩ B| / (|A| + |B|) = 2 × 30 / (40 + 50) = 60/90 ≈ 0.667. Dice loss = 1 − Dice.",
   "source": "Câu soạn mới theo: IOAI Syllabus (Computer Vision, Generative, Self-supervised)"
  },
  {
   "id": 98,
   "q": "Mục đích của <code>torch.no_grad()</code> khi đánh giá là gì?",
   "options": [
    "Bật chế độ đánh giá cho mô hình",
    "Ngăn mô hình đưa ra dự đoán",
    "Tiết kiệm bộ nhớ và tăng tốc nhờ tắt việc theo dõi gradient",
    "Đảm bảo kết quả giống nhau giữa các lần chạy"
   ],
   "answer": 2,
   "explain": "Khi đánh giá không cần gradient, nên không cần lưu đồ thị tính toán. Chế độ đánh giá do model.eval() bật; tính tái lập kết quả do đặt seed.",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 3, mục 4, câu 6"
  },
  {
   "id": 99,
   "q": "Trong <code>LogisticRegression</code> của scikit-learn, giảm tham số C có tác dụng gì?",
   "options": [
    "Tăng số vòng lặp tối đa",
    "Đổi sang hồi quy tuyến tính",
    "Giảm mức chính quy hóa",
    "Tăng mức chính quy hóa"
   ],
   "answer": 3,
   "explain": "C là nghịch đảo của cường độ chính quy hóa (C = 1/λ). C nhỏ phạt trọng số mạnh hơn, mô hình đơn giản hơn.",
   "source": "Câu soạn mới theo: scikit-learn User Guide"
  },
  {
   "id": 100,
   "q": "Tensor đầu ra của mô hình Transformer cơ sở (không có head) có bao nhiêu chiều, và đó là những chiều nào?",
   "options": [
    "2 chiều: độ dài chuỗi và hidden size",
    "3 chiều: batch size, độ dài chuỗi và hidden size",
    "1 chiều: hidden size",
    "2 chiều: độ dài chuỗi và batch size"
   ],
   "answer": 1,
   "explain": "Mô hình luôn xử lý theo batch (kể cả batch 1), mỗi token có một vector ẩn. Ví dụ BERT-base cho shape (batch, seq_len, 768).",
   "source": "Câu có sẵn, đã dịch: Hugging Face LLM Course · Chương 2, câu 2"
  }
 ]
};
