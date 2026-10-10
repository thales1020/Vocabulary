// Đề tự luận dạng "đưa ra chiến thuật". Soạn mới theo nội dung của Machine Learning Yearning,
// deeplearning.ai – Structuring ML Projects, A Recipe for Training Neural Networks (Karpathy),
// Google Deep Learning Tuning Playbook, Google Rules of ML, CS231n và các bài giải Kaggle.
// Mỗi tiêu chí có điểm; tổng mỗi đề là 10.
window.ESSAYS = [
{
  id: 'mua',
  title: 'Dự báo mưa từ dữ liệu trạm quan trắc',
  minutes: 25,
  scenario: `<p>Một tỉnh ven biển giao cho bạn xây mô hình dự báo <b>lượng mưa (mm) trong 6 giờ tới</b> cho 40 trạm quan trắc tự động. Bạn có dữ liệu theo giờ trong 5 năm: nhiệt độ, độ ẩm, áp suất, tốc độ gió, độ ẩm đất, lượng mưa đã đo.</p>
<p>Khi xem qua dữ liệu, bạn thấy: một số trạm có độ ẩm 999%, có những đoạn mất dữ liệu kéo dài vài ngày khi trạm hỏng, và phần lớn các giờ không mưa nhưng thỉnh thoảng có bão với lượng mưa rất lớn.</p>`,
  tasks: ['Bạn xử lý dữ liệu như thế nào trước khi huấn luyện?', 'Bạn chia dữ liệu train/validation/test ra sao, và vì sao?', 'Bạn chọn chỉ số đánh giá nào? Lập luận về các trận bão.', 'Bạn sẽ xây mô hình theo thứ tự nào, bắt đầu từ đâu?'],
  rubric: [
    { pts: 2, text: 'Xử lý giá trị phi vật lý (999%) như dữ liệu thiếu, không điền bằng trung bình cả cột ngay; xử lý đoạn mất dữ liệu (nội suy ngắn, cờ đánh dấu thiếu, hoặc loại khoảng dài).' },
    { pts: 2, text: 'Chia theo thời gian (train là quá khứ, validation/test là các giai đoạn sau), không xáo trộn ngẫu nhiên; nhắc tới rò rỉ dữ liệu từ tương lai và thống kê chuẩn hóa chỉ tính trên tập train.' },
    { pts: 2, text: 'Đặc trưng phù hợp: giờ trong ngày và ngày trong năm mã hóa sin/cos, giá trị trễ (lag) và trung bình trượt, đặc trưng của trạm lân cận; không dùng biến chỉ có sau thời điểm dự báo.' },
    { pts: 2, text: 'Chọn chỉ số có lập luận: MAE hay RMSE tùy việc có muốn phạt nặng sai số trong bão; có thể tách đánh giá "có mưa hay không" (recall cho mưa lớn) và "lượng mưa bao nhiêu".' },
    { pts: 2, text: 'Có baseline đơn giản (lượng mưa giờ trước, trung bình theo mùa) trước mô hình phức tạp (gradient boosting, rồi mô hình chuỗi), và phân tích lỗi theo trạm, theo mùa.' },
  ],
  model: `<h4>1. Làm rõ bài toán</h4><p>Đầu ra là một số (mm) nên là bài toán hồi quy, nhưng phân phối lệch mạnh: phần lớn bằng 0. Người dùng quan tâm nhất là các trận mưa lớn (cảnh báo ngập), nên sai ở bão nguy hiểm hơn sai ở giờ khô.</p>
<h4>2. Dữ liệu</h4><p>Độ ẩm tương đối không thể vượt 100%, nên 999% là mã lỗi. Mình đánh dấu thành NaN chứ không cắt về 100% hay điền trung bình ngay, vì trung bình đã bị kéo lệch. Khoảng thiếu ngắn (vài giờ) nội suy theo thời gian; khoảng dài thì để trống, thêm cột cờ "đang thiếu" và không tạo mẫu huấn luyện ở đó. Thêm đặc trưng: sin/cos của giờ và ngày trong năm (để 23h gần 0h, 31/12 gần 1/1), lượng mưa và áp suất trễ 1, 3, 6, 12 giờ, mức giảm áp suất, độ ẩm đất, và các giá trị của trạm lân cận.</p>
<h4>3. Chia dữ liệu</h4><p>Chia theo thời gian, ví dụ 3.5 năm đầu để train, nửa năm tiếp để validation, năm cuối để test, có một khoảng đệm giữa các tập để đặc trưng trễ không lấn sang. Xáo trộn ngẫu nhiên sẽ cho mô hình "nhìn thấy tương lai" qua các giờ liền kề, khiến điểm đẹp giả. Mọi thống kê (chuẩn hóa, điền khuyết) chỉ tính trên tập train.</p>
<h4>4. Chỉ số đánh giá</h4><p>Chỉ số chính là RMSE, vì nó phạt nặng sai số lớn và mình muốn mô hình không bỏ qua bão. Báo cáo kèm MAE để biết sai số điển hình, và recall/precision cho sự kiện "mưa trên 50 mm trong 6 giờ", vì đó là thứ dùng để cảnh báo. Nếu mục tiêu chỉ là sai số trung bình hằng ngày thì MAE hợp hơn vì ít bị vài trận bão chi phối.</p>
<h4>5. Thứ tự xây mô hình</h4><p>Baseline 1: dự báo bằng lượng mưa 6 giờ trước. Baseline 2: trung bình theo trạm và tháng. Sau đó LightGBM trên đặc trưng dạng bảng, vì nhanh và mạnh với dữ liệu kiểu này. Chỉ thử LSTM/Transformer khi mô hình cây đã tốt và còn dư thời gian. Có thể tách hai bước: phân loại có mưa hay không, rồi hồi quy lượng mưa khi có mưa.</p>
<h4>6. Chẩn đoán và rủi ro</h4><p>Phân tích lỗi theo trạm, theo mùa và theo mức mưa: nếu sai số dồn vào bão, thử tăng trọng số cho mẫu mưa lớn. Theo dõi trạm mới lắp hoặc thay cảm biến vì phân phối sẽ đổi.</p>`,
  sources: ['IOAI Philippines 2026 bán kết (các câu về dữ liệu thời tiết)', 'Machine Learning Yearning – chọn tập dev/test', 'Google Rules of ML'],
},
{
  id: 'xquang',
  title: 'Phát hiện viêm phổi trên ảnh X-quang với ít dữ liệu',
  minutes: 25,
  scenario: `<p>Một bệnh viện có <b>2.400 ảnh X-quang ngực</b> của 900 bệnh nhân, đã được bác sĩ gán nhãn "viêm phổi" hoặc "bình thường". Chỉ khoảng <b>12%</b> số ảnh là viêm phổi. Mỗi bệnh nhân có thể có nhiều ảnh chụp ở các lần khám khác nhau.</p>
<p>Bệnh viện muốn công cụ hỗ trợ sàng lọc: những ca bị đánh dấu nghi ngờ sẽ được bác sĩ đọc lại trước.</p>`,
  tasks: ['Với lượng dữ liệu này, bạn chọn cách huấn luyện nào?', 'Bạn chia dữ liệu thế nào để kết quả đánh giá đáng tin?', 'Chọn chỉ số đánh giá và ngưỡng quyết định thế nào cho mục đích sàng lọc?', 'Tăng cường dữ liệu nào hợp lý và không hợp lý với ảnh X-quang?'],
  rubric: [
    { pts: 2, text: 'Dùng transfer learning từ mô hình pretrained (ImageNet hoặc tốt hơn là mô hình pretrained trên ảnh y tế), đóng băng phần đầu rồi fine-tune dần; giải thích vì sao không huấn luyện từ đầu.' },
    { pts: 2, text: 'Chia theo bệnh nhân (mọi ảnh của một người nằm cùng một tập), phân tầng theo nhãn; chỉ ra rò rỉ nếu chia theo ảnh.' },
    { pts: 2, text: 'Chỉ số phù hợp với mất cân bằng và sàng lọc: ưu tiên recall (độ nhạy), dùng ROC-AUC/PR-AUC; chọn ngưỡng trên tập validation để đạt độ nhạy mục tiêu, không dùng accuracy.' },
    { pts: 2, text: 'Augmentation hợp lý (xoay nhẹ, dịch, chỉnh độ sáng/tương phản nhẹ, crop nhẹ) và nêu được phép không hợp lý (lật ngang làm tim sang phải, xoay lớn, đổi màu).' },
    { pts: 2, text: 'Xử lý mất cân bằng (class weight hoặc oversampling) và kiểm tra lỗi: xem các ca bỏ sót cùng bác sĩ, kiểm tra mô hình có học "đường tắt" (chữ đánh dấu, loại máy chụp) không.' },
  ],
  model: `<h4>1. Làm rõ bài toán</h4><p>Đây là sàng lọc: bỏ sót ca bệnh (false negative) tệ hơn nhiều so với báo nhầm, vì ca báo nhầm chỉ tốn thêm thời gian bác sĩ đọc lại.</p>
<h4>2. Chia dữ liệu</h4><p>Chia theo bệnh nhân, không theo ảnh: nếu ảnh của cùng một người nằm ở cả train và test, mô hình có thể nhận ra người đó thay vì nhận ra bệnh, và điểm test bị đẹp giả. Dùng phân tầng để mỗi tập đều có khoảng 12% viêm phổi. Với 900 bệnh nhân, nên dùng 5-fold cross-validation theo nhóm bệnh nhân (GroupKFold) thay vì một lần chia, và giữ riêng một tập test chỉ dùng một lần ở cuối.</p>
<h4>3. Mô hình</h4><p>2.400 ảnh là quá ít để huấn luyện CNN từ đầu. Mình lấy ResNet hoặc EfficientNet pretrained, ưu tiên bản pretrained trên ảnh X-quang nếu có, thay lớp cuối bằng 1 đầu ra sigmoid. Giai đoạn 1: đóng băng backbone, chỉ huấn luyện lớp mới. Giai đoạn 2: mở băng các khối cuối và fine-tune với learning rate nhỏ. Chuẩn hóa ảnh đúng như lúc pretrain.</p>
<h4>4. Tăng cường dữ liệu</h4><p>Hợp lý: xoay ±10°, dịch và phóng nhẹ, chỉnh độ sáng và độ tương phản nhẹ để mô phỏng máy chụp khác nhau. Không hợp lý: lật ngang (tim nằm bên trái, lật làm ảnh sai giải phẫu), xoay lớn, đổi màu (ảnh xám), crop mạnh làm mất vùng phổi có tổn thương.</p>
<h4>5. Mất cân bằng và chỉ số</h4><p>Dùng trọng số lớp trong hàm mất mát hoặc lấy mẫu cân bằng. Accuracy vô nghĩa vì đoán "bình thường" hết đã đạt 88%. Mình báo cáo ROC-AUC và PR-AUC, rồi chọn ngưỡng trên tập validation sao cho độ nhạy đạt mục tiêu bệnh viện đặt ra, ví dụ ≥ 95%, và báo cáo độ đặc hiệu tương ứng.</p>
<h4>6. Chẩn đoán và rủi ro</h4><p>Cùng bác sĩ xem các ca bỏ sót và ca báo nhầm. Dùng Grad-CAM xem mô hình nhìn vào phổi hay vào chữ đánh dấu, loại máy chụp: đây là các "đường tắt" hay gặp với dữ liệu y tế. Trước khi dùng thật, kiểm tra trên ảnh từ bệnh viện hoặc máy chụp khác.</p>`,
  sources: ['PyTorch – Transfer Learning tutorial', 'Machine Learning Yearning – phân tích lỗi', 'CS231n – transfer learning, augmentation'],
},
{
  id: 'camxuc',
  title: 'Mô hình cảm xúc tốt trên dev nhưng kém khi triển khai',
  minutes: 20,
  scenario: `<p>Nhóm bạn fine-tune PhoBERT để phân loại bình luận tiếng Việt thành tích cực, trung tính, tiêu cực. Dữ liệu huấn luyện là <b>80.000 đánh giá sản phẩm</b> trên sàn thương mại điện tử. Trên tập dev tách từ cùng nguồn, mô hình đạt <b>F1 = 0.89</b>.</p>
<p>Sau khi đưa vào hệ thống theo dõi <b>bình luận mạng xã hội</b> của một nhãn hàng, nhóm kiểm tra tay 500 bình luận và chỉ thấy F1 khoảng <b>0.62</b>. Bình luận mạng xã hội có nhiều tiếng lóng, viết tắt, không dấu, biểu tượng cảm xúc và câu mỉa mai.</p>`,
  tasks: ['Chẩn đoán nguyên nhân. Làm sao chứng minh đó là nguyên nhân?', 'Bạn sẽ thu thập và dùng dữ liệu mới thế nào với ngân sách gán nhãn khoảng 3.000 bình luận?', 'Bạn tổ chức lại các tập train/dev/test ra sao?', 'Sau khi sửa, làm sao để không gặp lại vấn đề này?'],
  rubric: [
    { pts: 2, text: 'Xác định lệch phân phối dữ liệu (data mismatch) giữa đánh giá sản phẩm và bình luận mạng xã hội, chứ không kết luận vội là overfitting.' },
    { pts: 2, text: 'Đề xuất cách kiểm chứng: tập train-dev (cùng phân phối train) so với tập dev từ mạng xã hội; phân tích lỗi trên các mẫu sai, đếm theo nhóm (lóng, không dấu, mỉa mai, emoji).' },
    { pts: 2, text: 'Tập dev và test phải lấy từ dữ liệu mục tiêu (mạng xã hội); dùng phần lớn ngân sách gán nhãn cho dev/test đủ tin cậy, phần còn lại thêm vào train.' },
    { pts: 2, text: 'Biện pháp giảm lệch: thêm dữ liệu mạng xã hội có nhãn vào train (có thể tăng trọng số), tiền xử lý hoặc chuẩn hóa văn bản, tiếp tục pretrain trên văn bản mạng xã hội không nhãn (domain adaptation).' },
    { pts: 2, text: 'Theo dõi sau triển khai: lấy mẫu định kỳ để gán nhãn, giám sát phân phối đầu vào và đầu ra, kế hoạch huấn luyện lại.' },
  ],
  model: `<h4>1. Chẩn đoán</h4><p>Mô hình tốt trên dữ liệu cùng nguồn nhưng kém trên dữ liệu khác nguồn, nên nghi ngờ đầu tiên là <b>lệch phân phối</b> (data mismatch), chưa phải overfitting. Để kiểm chứng, mình tách thêm tập train-dev cùng nguồn với train và so ba con số: train, train-dev, dev mạng xã hội. Nếu train-dev gần train (khoảng 0.88) mà dev mạng xã hội 0.62 thì khoảng cách là do lệch phân phối. Sau đó phân tích lỗi khoảng 100–200 bình luận sai, đếm theo nhóm: không dấu, tiếng lóng, emoji, mỉa mai, nói về chủ đề không liên quan. Tỉ lệ từng nhóm cho biết nên sửa gì trước.</p>
<h4>2. Tổ chức lại dữ liệu</h4><p>Tập dev là mục tiêu cả nhóm tối ưu theo, nên dev và test phải là bình luận mạng xã hội. Với 3.000 nhãn: khoảng 1.000 cho dev, 1.000 cho test, 1.000 thêm vào train. Train vẫn giữ 80.000 đánh giá sản phẩm vì chúng vẫn dạy được nhiều về cảm xúc.</p>
<h4>3. Giảm lệch</h4><p>Thêm 1.000 bình luận mạng xã hội vào train và tăng trọng số cho chúng. Tiếp tục pretrain PhoBERT (masked language modeling) trên vài trăm nghìn bình luận mạng xã hội không nhãn. Thêm bước chuẩn hóa: khôi phục dấu, chuẩn hóa viết tắt phổ biến, giữ emoji vì emoji mang cảm xúc. Có thể tạo dữ liệu tổng hợp bằng cách bỏ dấu ngẫu nhiên một phần câu trong train. Mỉa mai khó nhất: nếu chiếm tỉ lệ nhỏ thì để sau.</p>
<h4>4. Tránh lặp lại</h4><p>Ngay từ đầu, dev/test phải lấy từ nơi mô hình sẽ được dùng. Sau triển khai, mỗi tháng lấy mẫu vài trăm bình luận để gán nhãn và đo lại F1; theo dõi phân phối nhãn dự đoán và độ dài, tỉ lệ không dấu của đầu vào để phát hiện thay đổi sớm.</p>`,
  sources: ['deeplearning.ai – Structuring ML Projects (data mismatch, train-dev set)', 'Machine Learning Yearning – khi dev/test khác phân phối train', 'Hugging Face LLM Course – domain adaptation'],
},
{
  id: 'debug',
  title: 'Mô hình không học: loss gần như không giảm',
  minutes: 20,
  scenario: `<p>Bạn viết một CNN phân loại 10 loại côn trùng từ 15.000 ảnh. Sau 20 epoch, training loss vẫn dao động quanh <b>2.30</b>, accuracy trên cả train và validation khoảng <b>10%</b>. Bạn dùng Adam với learning rate 0.01, batch size 64, có augmentation và dropout.</p>`,
  tasks: ['Con số 2.30 và 10% gợi ý điều gì?', 'Trình bày quy trình gỡ lỗi theo thứ tự, mỗi bước kiểm tra điều gì.', 'Khi mô hình đã học được, bạn đưa các thành phần phức tạp trở lại thế nào?'],
  rubric: [
    { pts: 2, text: 'Nhận ra 2.30 ≈ ln(10) và 10% là mức đoán ngẫu nhiên với 10 lớp: mô hình chưa học được gì, có thể do lỗi chứ không phải do mô hình yếu.' },
    { pts: 2, text: 'Kiểm tra dữ liệu trước: xem ảnh và nhãn sau khi qua pipeline, nhãn có khớp ảnh, có bị xáo lệch, chuẩn hóa đúng, augmentation không phá ảnh.' },
    { pts: 2, text: 'Đơn giản hóa và overfit một batch nhỏ: tắt augmentation và dropout, cho mô hình học thuộc vài chục ảnh; nếu không xuống gần 0 là lỗi cài đặt (loss, zero_grad, optimizer.step, model.train/eval, kích hoạt ở đầu ra).' },
    { pts: 2, text: 'Learning rate: 0.01 lớn với Adam; thử 1e-3, 3e-4 hoặc chạy tìm learning rate; kiểm tra gradient có chảy (không NaN, không bằng 0).' },
    { pts: 2, text: 'Thêm lại từng thành phần một (augmentation, dropout, mô hình lớn hơn), theo dõi loss sau mỗi thay đổi; dùng baseline đơn giản (mô hình pretrained) để so.' },
  ],
  model: `<h4>1. Đọc con số</h4><p>Với 10 lớp, dự đoán đều 1/10 cho loss = −ln(0.1) ≈ 2.30 và accuracy 10%. Mô hình đang ở đúng mức đoán mò sau 20 epoch, nghĩa là nó không học gì. Đây là dấu hiệu của lỗi (dữ liệu, cài đặt, learning rate) hơn là mô hình thiếu năng lực.</p>
<h4>2. Kiểm tra dữ liệu</h4><p>Lấy một batch ngay trước khi đưa vào mô hình, hiển thị ảnh cùng nhãn. Hay gặp: nhãn bị xáo không cùng thứ tự với ảnh, mọi nhãn bằng 0, ảnh toàn đen do chuẩn hóa hai lần, augmentation cắt mất con vật. Kiểm tra phân phối nhãn và kiểu dữ liệu của nhãn.</p>
<h4>3. Đơn giản hóa và overfit một batch</h4><p>Tắt augmentation và dropout, lấy khoảng 32 ảnh, huấn luyện nhiều vòng trên đúng batch đó. Mô hình cài đặt đúng phải đưa loss về gần 0. Nếu không, kiểm tra: lớp cuối có softmax trong khi dùng CrossEntropyLoss (bị softmax hai lần), quên optimizer.zero_grad() hoặc optimizer.step(), tham số không được đưa vào optimizer, ReLU ngay trước đầu ra, đóng băng nhầm toàn bộ mạng.</p>
<h4>4. Learning rate và gradient</h4><p>0.01 là lớn với Adam, có thể làm ReLU "chết" ngay từ đầu. Thử 1e-3 và 3e-4, hoặc chạy learning-rate range test. In độ lớn gradient từng lớp: bằng 0 hay NaN đều chỉ ra lỗi.</p>
<h4>5. Thêm dần độ phức tạp</h4><p>Khi đã overfit được batch nhỏ, huấn luyện trên toàn bộ dữ liệu không có chính quy hóa và xác nhận train loss giảm. Sau đó thêm augmentation, rồi dropout, từng thứ một, xem validation cải thiện hay không. Làm song song một baseline ResNet pretrained để biết mức độ chính xác cần đạt.</p>`,
  sources: ['Karpathy – A Recipe for Training Neural Networks', 'CS231n – babysitting the learning process', 'Hugging Face LLM Course – chương 8, gỡ lỗi huấn luyện'],
},
{
  id: 'gianlan',
  title: 'Phát hiện giao dịch gian lận',
  minutes: 25,
  scenario: `<p>Một ví điện tử có <b>3 triệu giao dịch</b> trong 12 tháng, trong đó <b>0.2%</b> bị xác nhận là gian lận. Mỗi giao dịch có số tiền, thời gian, thiết bị, vị trí, lịch sử tài khoản. Nhãn gian lận thường chỉ được xác nhận <b>sau vài tuần</b> khi khách khiếu nại.</p>
<p>Đội vận hành có thể kiểm tra tay tối đa <b>500 giao dịch mỗi ngày</b> trong khoảng 8.000 giao dịch/ngày. Một giao dịch gian lận trung bình gây thiệt hại 4 triệu đồng; chặn nhầm một giao dịch thật làm khách khó chịu.</p>`,
  tasks: ['Bạn đánh giá mô hình bằng chỉ số nào, gắn với ràng buộc 500 giao dịch/ngày ra sao?', 'Chia dữ liệu và xây đặc trưng thế nào để tránh rò rỉ?', 'Bạn xử lý mất cân bằng thế nào và chọn mô hình gì?', 'Sau khi triển khai cần theo dõi những gì?'],
  rubric: [
    { pts: 2, text: 'Không dùng accuracy; dùng PR-AUC hoặc precision/recall ở mức "top 500 mỗi ngày" (precision@k), hoặc chi phí kỳ vọng; ngưỡng chọn theo năng lực kiểm tra và chi phí.' },
    { pts: 2, text: 'Chia theo thời gian; đặc trưng chỉ dùng thông tin có trước thời điểm giao dịch; tính tới độ trễ của nhãn (các tháng gần nhất nhãn chưa đầy đủ).' },
    { pts: 2, text: 'Đặc trưng hành vi có ý nghĩa: số giao dịch trong 1 giờ qua, số tiền so với mức thường lệ, thiết bị hoặc vị trí mới, tài khoản mới tạo.' },
    { pts: 2, text: 'Xử lý mất cân bằng (trọng số lớp, lấy mẫu bớt lớp đa số nhưng hiệu chỉnh lại xác suất) và chọn baseline phù hợp dữ liệu bảng (gradient boosting, hồi quy logistic) có lập luận.' },
    { pts: 2, text: 'Theo dõi sau triển khai: kẻ gian thay đổi cách làm (concept drift), vòng phản hồi (giao dịch bị chặn không có nhãn), huấn luyện lại định kỳ, giữ một tỉ lệ nhỏ giao dịch ngẫu nhiên để kiểm tra.' },
  ],
  model: `<h4>1. Chỉ số gắn với vận hành</h4><p>Đoán "không gian lận" cho mọi giao dịch đã đạt 99.8% accuracy, nên accuracy vô dụng. Mỗi ngày chỉ kiểm tra được 500/8.000 giao dịch, nên câu hỏi thật là: trong 500 giao dịch mô hình xếp nghi ngờ nhất, có bao nhiêu gian lận (precision@500) và bắt được bao nhiêu phần trăm tổng số gian lận trong ngày (recall@500)? Để so mô hình nói chung, dùng PR-AUC. Có thể quy ra tiền: thiệt hại tránh được trừ chi phí chặn nhầm.</p>
<h4>2. Chia dữ liệu và rò rỉ</h4><p>Chia theo thời gian: 9 tháng đầu train, tháng 10 validation, tháng 11 test. Bỏ tháng cuối vì nhãn chưa được xác nhận đầy đủ, nếu dùng sẽ có nhiều gian lận bị gán nhầm là bình thường. Mọi đặc trưng chỉ dùng thông tin trước thời điểm giao dịch; ví dụ "tài khoản bị khóa sau đó" là rò rỉ nghiêm trọng.</p>
<h4>3. Đặc trưng</h4><p>Đặc trưng hành vi thường quan trọng hơn số tiền đơn thuần: số giao dịch trong 10 phút và 1 giờ qua, số tiền so với trung bình 30 ngày của tài khoản, thiết bị mới, vị trí cách xa lần trước, tài khoản tạo dưới 1 ngày, giao dịch giờ bất thường.</p>
<h4>4. Mô hình và mất cân bằng</h4><p>Baseline: hồi quy logistic. Mô hình chính: LightGBM/XGBoost, rất mạnh với dữ liệu bảng và đặc trưng tổng hợp. Mất cân bằng: dùng trọng số lớp, hoặc lấy mẫu bớt giao dịch bình thường để huấn luyện nhanh hơn rồi hiệu chỉnh xác suất. Vì chỉ dùng thứ hạng top 500 nên việc hiệu chỉnh xác suất ít quan trọng hơn chất lượng xếp hạng.</p>
<h4>5. Sau triển khai</h4><p>Kẻ gian thay đổi cách làm nên hiệu suất sẽ giảm dần; cần theo dõi precision@500 hằng tuần và huấn luyện lại định kỳ. Giao dịch bị chặn không có nhãn tự nhiên (vòng phản hồi), nên dành một phần nhỏ công suất kiểm tra ngẫu nhiên để có nhãn không thiên lệch.</p>`,
  sources: ['scikit-learn User Guide – chỉ số cho dữ liệu mất cân bằng', 'Google Rules of ML', 'Machine Learning Yearning – chọn chỉ số'],
},
{
  id: 'rag',
  title: 'Chatbot hỏi đáp quy chế trường bằng LLM',
  minutes: 20,
  scenario: `<p>Trường bạn muốn một chatbot trả lời câu hỏi của học sinh về quy chế: học bổng, kỷ luật, điểm rèn luyện, lịch thi. Tài liệu gồm khoảng <b>300 trang</b> văn bản, có bảng biểu, được cập nhật vài lần mỗi năm. Nhà trường lo nhất là chatbot <b>bịa ra quy định</b> không có thật.</p>`,
  tasks: ['Bạn chọn RAG hay fine-tune LLM? Lập luận.', 'Mô tả các thành phần chính của hệ thống và các quyết định thiết kế quan trọng.', 'Bạn đánh giá chatbot thế nào trước khi đưa vào dùng?', 'Làm sao giảm việc bịa câu trả lời?'],
  rubric: [
    { pts: 2, text: 'Chọn RAG có lập luận: tài liệu thay đổi, cần trích dẫn nguồn, dữ liệu ít; fine-tune không đảm bảo nhớ đúng và tốn công cập nhật.' },
    { pts: 2, text: 'Thiết kế truy xuất: chia đoạn hợp lý (theo điều khoản, có phần chồng lấn), xử lý bảng, embedding đa ngôn ngữ hoặc tiếng Việt, kết hợp tìm kiếm từ khóa, lấy top-k.' },
    { pts: 2, text: 'Đánh giá có hệ thống: bộ câu hỏi thật kèm đáp án và đoạn nguồn; đánh giá riêng phần truy xuất (đoạn đúng có nằm trong top-k) và phần trả lời (đúng, có dẫn nguồn).' },
    { pts: 2, text: 'Giảm bịa: prompt yêu cầu chỉ dựa vào tài liệu và nói "không tìm thấy", hiển thị trích dẫn, ngưỡng độ liên quan, chuyển cho người khi không chắc.' },
    { pts: 2, text: 'Vận hành: cập nhật chỉ mục khi tài liệu đổi, ghi log câu hỏi để bổ sung bộ đánh giá, lưu ý quyền riêng tư của học sinh.' },
  ],
  model: `<h4>1. RAG hay fine-tune</h4><p>Mình chọn RAG. Quy chế thay đổi vài lần mỗi năm: với RAG chỉ cần cập nhật kho tài liệu, còn fine-tune phải huấn luyện lại. Câu trả lời cần dẫn được điều khoản để học sinh kiểm tra. 300 trang cũng quá ít để fine-tune "nạp" kiến thức một cách đáng tin; fine-tune hợp hơn để dạy giọng văn hoặc định dạng.</p>
<h4>2. Thành phần</h4><p>(1) Tiền xử lý: tách tài liệu theo chương, điều, khoản thay vì cắt cứng theo số ký tự; mỗi đoạn khoảng 200–400 từ, chồng lấn một ít, kèm tiêu đề điều khoản. Bảng chuyển thành văn bản từng dòng để không mất ý nghĩa. (2) Truy xuất: embedding hỗ trợ tiếng Việt kết hợp tìm kiếm từ khóa (BM25), vì câu hỏi hay chứa thuật ngữ cụ thể như "điểm rèn luyện". Lấy top 5 đoạn. (3) Sinh: LLM nhận câu hỏi và các đoạn tìm được, trả lời kèm trích dẫn.</p>
<h4>3. Đánh giá</h4><p>Thu khoảng 150 câu hỏi thật của học sinh, nhờ giáo vụ ghi đáp án và điều khoản nguồn, kể cả một số câu mà tài liệu không có câu trả lời. Đánh giá riêng hai phần: truy xuất (đoạn đúng có trong top 5 không) và trả lời (đúng, đủ, có dẫn nguồn, biết từ chối khi tài liệu không có). Có thể dùng LLM để chấm sơ bộ, nhưng phải đối chiếu với người chấm trên một phần mẫu.</p>
<h4>4. Giảm bịa</h4><p>Prompt yêu cầu chỉ trả lời dựa trên đoạn được cung cấp, nếu không có thì nói không tìm thấy và chỉ phòng ban liên hệ. Luôn hiển thị trích dẫn. Nếu điểm liên quan của các đoạn đều thấp thì không gọi LLM sinh câu trả lời. Với câu hỏi nhạy cảm (kỷ luật, học bổng) thêm dòng nhắc liên hệ giáo vụ để xác nhận.</p>
<h4>5. Vận hành</h4><p>Khi quy chế đổi, cập nhật chỉ mục và chạy lại bộ đánh giá. Ghi log các câu chatbot không trả lời được để bổ sung tài liệu. Không lưu thông tin cá nhân của học sinh trong log.</p>`,
  sources: ['IOAI Philippines 2026 chung kết – câu về RAG', 'Hugging Face LLM Course – chương 11, đánh giá mô hình', 'Google Rules of ML'],
},
{
  id: 'tuning',
  title: 'Tinh chỉnh siêu tham số khi chỉ có 20 lượt chạy',
  minutes: 15,
  scenario: `<p>Bạn fine-tune một mô hình phân loại ảnh cho cuộc thi. Mỗi lượt huấn luyện mất khoảng 40 phút và bạn chỉ còn đủ GPU cho <b>khoảng 20 lượt chạy</b>. Có rất nhiều siêu tham số: learning rate, lịch learning rate, weight decay, batch size, số epoch, dropout, kiểu augmentation, kích thước ảnh.</p>`,
  tasks: ['Bạn ưu tiên tinh chỉnh siêu tham số nào và để mặc định những gì?', 'Bạn phân bổ 20 lượt chạy ra sao? Tìm theo lưới hay ngẫu nhiên?', 'Làm sao biết một thay đổi thật sự tốt hơn chứ không phải do may mắn?'],
  rubric: [
    { pts: 2, text: 'Ưu tiên learning rate (và lịch lr) vì ảnh hưởng lớn nhất; giữ nguyên các thứ ít quan trọng hoặc dùng giá trị mặc định đã được kiểm chứng (Adam β, ε).' },
    { pts: 2, text: 'Bắt đầu từ cấu hình baseline đã biết chạy được; thay đổi có mục tiêu, mỗi đợt chỉ khám phá vài siêu tham số.' },
    { pts: 2, text: 'Dùng random search (hoặc quasi-random) thay vì lưới; lấy mẫu learning rate và weight decay trên thang log.' },
    { pts: 2, text: 'Tiết kiệm lượt chạy: thử nhanh trên dữ liệu nhỏ hơn, ảnh nhỏ hơn hoặc ít epoch hơn, rồi chạy đầy đủ với vài cấu hình tốt nhất; theo dõi đường cong để dừng sớm lượt chạy kém.' },
    { pts: 2, text: 'So sánh trên validation, không dùng test; lưu ý nhiễu giữa các seed (chạy lại cấu hình tốt nhất với seed khác), ghi lại mọi lượt chạy.' },
  ],
  model: `<h4>1. Ưu tiên</h4><p>Learning rate gần như luôn là siêu tham số quan trọng nhất, sau đó là lịch learning rate và weight decay. Batch size chủ yếu quyết định theo bộ nhớ GPU và tốc độ, chọn một lần rồi cố định. Hệ số β của Adam và ε để mặc định. Augmentation và kích thước ảnh lấy theo cấu hình đã biết hoạt động tốt với mô hình pretrained này.</p>
<h4>2. Phân bổ 20 lượt</h4><p>Lượt 1: chạy baseline để có mốc so sánh. Lượt 2–9: random search learning rate trong khoảng [1e-5, 1e-3] trên thang log, kèm weight decay [1e-5, 1e-2] cũng trên thang log, với số epoch rút gọn (ví dụ 1/3) để mỗi lượt nhanh hơn. Lượt 10–14: quanh vùng tốt nhất, thử lịch cosine so với step, và một hai mức dropout. Lượt 15–20: chạy đầy đủ 2–3 cấu hình tốt nhất, mỗi cấu hình 2 seed. Random search tốt hơn lưới vì với cùng số lượt, mỗi lượt cho một giá trị learning rate mới, trong khi lưới lặp lại cùng vài giá trị.</p>
<h4>3. Tránh kết luận sai</h4><p>Chỉ so trên validation; test chỉ dùng một lần ở cuối. Chênh lệch nhỏ (ví dụ 0.2%) có thể chỉ là nhiễu do seed, nên chạy lại cấu hình tốt nhất với seed khác trước khi tin. Theo dõi đường cong loss để dừng sớm các lượt rõ ràng kém, tiết kiệm GPU cho lượt khác. Ghi lại mọi cấu hình và kết quả vào một bảng để không chạy trùng.</p>`,
  sources: ['Google – Deep Learning Tuning Playbook', 'deeplearning.ai – Improving Deep Neural Networks (tìm siêu tham số)'],
},
{
  id: 'congbang',
  title: 'Mô hình sàng lọc hồ sơ có nguy cơ thiên lệch',
  minutes: 20,
  scenario: `<p>Một công ty muốn dùng mô hình học máy để <b>sàng lọc hồ sơ xin việc</b>, huấn luyện trên dữ liệu tuyển dụng 10 năm qua (hồ sơ nào được nhận). Một kỹ sư phát hiện tỉ lệ ứng viên nữ được mô hình đề xuất thấp hơn rõ rệt so với nam, dù đã <b>bỏ cột giới tính</b> khỏi dữ liệu.</p>`,
  tasks: ['Giải thích vì sao bỏ cột giới tính vẫn không loại được thiên lệch.', 'Bạn đo mức độ công bằng của mô hình thế nào? Phân biệt các tiêu chí.', 'Đề xuất các biện pháp ở từng giai đoạn: dữ liệu, huấn luyện, sử dụng.'],
  rubric: [
    { pts: 2, text: 'Giải thích nhãn lịch sử phản ánh quyết định thiên lệch trong quá khứ, và biến đại diện (proxy) như tên trường, câu lạc bộ, khoảng trống trong sự nghiệp, cách dùng từ vẫn mang thông tin giới tính.' },
    { pts: 2, text: 'Đo theo nhóm: so sánh tỉ lệ được đề xuất (demographic parity) và tỉ lệ dương tính thật/giả giữa các nhóm khi cùng đủ điều kiện (equal opportunity, equalized odds); hiểu sự khác nhau và đánh đổi.' },
    { pts: 2, text: 'Biện pháp với dữ liệu: kiểm tra nhãn, tìm và xử lý biến đại diện, cân bằng lại hoặc gán trọng số mẫu, thu thập nhãn tốt hơn (đánh giá năng lực thay vì quyết định cũ).' },
    { pts: 2, text: 'Biện pháp khi huấn luyện và sau huấn luyện: ràng buộc công bằng, điều chỉnh ngưỡng theo nhóm có cân nhắc pháp lý, kiểm định độc lập.' },
    { pts: 2, text: 'Sử dụng có trách nhiệm: mô hình chỉ hỗ trợ, con người ra quyết định cuối; minh bạch với ứng viên; kiểm tra định kỳ; sẵn sàng không triển khai nếu không đạt.' },
  ],
  model: `<h4>1. Vì sao bỏ cột giới tính chưa đủ</h4><p>Nhãn "được nhận" là quyết định của con người trong 10 năm qua; nếu các quyết định đó thiên lệch thì mô hình học lại đúng sự thiên lệch đó. Ngoài ra nhiều đặc trưng khác là biến đại diện cho giới tính: trường nữ sinh, câu lạc bộ, khoảng nghỉ thai sản trong lý lịch, cách dùng từ trong thư xin việc. Mô hình dùng các biến này để tái tạo lại thông tin giới tính.</p>
<h4>2. Đo công bằng</h4><p>Cần giữ cột giới tính riêng để đánh giá, dù không đưa vào mô hình. Các tiêu chí: (a) demographic parity: tỉ lệ được đề xuất bằng nhau giữa các nhóm; (b) equal opportunity: trong số ứng viên thực sự phù hợp, tỉ lệ được đề xuất bằng nhau; (c) equalized odds: thêm điều kiện tỉ lệ đề xuất nhầm cũng bằng nhau. Các tiêu chí này thường không đạt được cùng lúc nên phải chọn tiêu chí phù hợp với bối cảnh và luật. Khó nhất là "thực sự phù hợp" cũng lấy từ nhãn lịch sử, nên cần nhãn tốt hơn.</p>
<h4>3. Biện pháp</h4><p><b>Dữ liệu:</b> xem lại cách tạo nhãn; nếu có thể, dùng kết quả làm việc thực tế hoặc bài đánh giá năng lực thay vì quyết định tuyển cũ; tìm biến đại diện bằng cách xem biến nào dự đoán được giới tính, rồi loại hoặc biến đổi; gán trọng số mẫu để cân bằng. <b>Huấn luyện:</b> thêm ràng buộc công bằng vào hàm mục tiêu, hoặc điều chỉnh ngưỡng sau huấn luyện, có tham vấn pháp lý. <b>Sử dụng:</b> mô hình chỉ xếp hạng để hỗ trợ, người tuyển dụng quyết định; thông báo cho ứng viên việc dùng AI; kiểm định chỉ số công bằng mỗi đợt tuyển. Nếu không đạt mức chấp nhận được, phương án đúng là không triển khai.</p>`,
  sources: ['IOAI Philippines 2026 chung kết – câu về Equalized Odds', 'Hugging Face LLM Course – chương 1, thiên lệch của mô hình', 'IOAI Syllabus – đạo đức AI'],
},
{
  id: 'kaggle',
  title: 'Chiến thuật cho một cuộc thi kiểu Kaggle',
  minutes: 20,
  scenario: `<p>Bạn tham gia vòng thực hành: phân loại ảnh lá cây thành 12 loại bệnh, có <b>8.000 ảnh train</b>, thời gian làm bài <b>3 ngày</b>. Bảng xếp hạng công khai (public leaderboard) chỉ tính trên <b>30%</b> tập test, thứ hạng cuối dùng 70% còn lại. Mỗi ngày được nộp tối đa 5 lần, và cuối cùng phải chọn 2 bài nộp để chấm.</p>`,
  tasks: ['Bạn xây cách đánh giá cục bộ (validation) thế nào và tin vào nó hay vào leaderboard?', 'Lập kế hoạch dùng 3 ngày.', 'Những kỹ thuật nào thường giúp tăng điểm ở cuối, và chọn 2 bài nộp cuối ra sao?'],
  rubric: [
    { pts: 2, text: 'Xây cross-validation phân tầng đáng tin, khớp cách chia của bài thi; kiểm tra tương quan giữa điểm CV và điểm public.' },
    { pts: 2, text: 'Ưu tiên CV hơn public leaderboard 30% vì dễ overfit leaderboard; không chỉnh mô hình theo từng biến động nhỏ của public.' },
    { pts: 2, text: 'Kế hoạch có thứ tự: khám phá dữ liệu và baseline nhanh (mô hình pretrained) ngày 1, cải tiến có kiểm soát ngày 2, ensemble và chốt ngày 3; quản lý thời gian huấn luyện.' },
    { pts: 2, text: 'Kỹ thuật tăng điểm hợp lý: augmentation phù hợp, ảnh lớn hơn, fine-tune backbone mạnh, test-time augmentation, ensemble các mô hình hoặc fold khác nhau.' },
    { pts: 2, text: 'Chọn 2 bài cuối có chiến lược: một bài có CV tốt nhất (ổn định), một bài ensemble đa dạng hoặc bài public tốt nhất; ghi lại mọi thí nghiệm.' },
  ],
  model: `<h4>1. Đánh giá cục bộ</h4><p>Public leaderboard chỉ dựa trên 30% test (khoảng vài trăm ảnh) nên rất nhiễu, và nộp nhiều lần dễ "học theo" leaderboard. Mình dùng 5-fold cross-validation phân tầng theo nhãn; nếu có ảnh của cùng một cây hoặc cùng buổi chụp thì chia theo nhóm. Sau vài lần nộp, kiểm tra điểm CV và điểm public có đi cùng chiều không. Nếu có, tin CV; nếu không, tìm lý do (phân phối test khác, rò rỉ trong CV).</p>
<h4>2. Kế hoạch</h4><p><b>Ngày 1:</b> xem ảnh, phân phối lớp, ảnh lỗi hoặc trùng; dựng pipeline CV và baseline (EfficientNet hoặc ConvNeXt pretrained, ảnh 384, augmentation cơ bản); nộp lần đầu để kiểm tra định dạng. <b>Ngày 2:</b> mỗi thay đổi chỉ một yếu tố và so bằng CV: kích thước ảnh, augmentation (lật, xoay, đổi màu nhẹ vì lá bệnh có màu đặc trưng), backbone khác, lịch learning rate. Phân tích ma trận nhầm lẫn để xem các bệnh nào hay bị lẫn. <b>Ngày 3:</b> huấn luyện đủ 5 fold cho 2–3 mô hình tốt nhất, thêm test-time augmentation, ensemble, chốt bài; không thử ý tưởng mới lớn vào lúc cuối.</p>
<h4>3. Tăng điểm và chọn bài cuối</h4><p>Ensemble các fold và các kiến trúc khác nhau thường tăng điểm ổn định nhất vì sai số của chúng ít tương quan. TTA (trung bình dự đoán trên ảnh gốc và ảnh lật) tăng thêm chút ít. Hai bài chọn cuối: bài 1 là ensemble có điểm CV tốt nhất; bài 2 là phương án khác biệt để phòng rủi ro, ví dụ ensemble đơn giản hơn hoặc bài có điểm public tốt nhất nếu nó cũng có CV tốt. Mọi thí nghiệm ghi vào bảng (cấu hình, CV, public) để quyết định có căn cứ.</p>`,
  sources: ['Các bài giải pháp top của Kaggle (mục Discussion)', 'Machine Learning Yearning – tập dev và chỉ số'],
},
{
  id: 'giaothong',
  title: 'Đếm xe thời gian thực trên camera giao thông',
  minutes: 20,
  scenario: `<p>Thành phố muốn đếm số xe máy, ô tô, xe buýt đi qua <b>200 nút giao</b> theo thời gian thực. Mô hình phải chạy trên <b>thiết bị biên</b> đặt cạnh camera (GPU nhỏ), xử lý ít nhất <b>15 khung hình/giây</b>. Ảnh có nhiều xe máy nhỏ và che khuất nhau, có cảnh ban đêm và trời mưa. Hiện có 5.000 ảnh đã gán hộp bao, chủ yếu chụp ban ngày.</p>`,
  tasks: ['Bạn đặt mục tiêu và chỉ số đánh giá thế nào khi có cả yêu cầu độ chính xác lẫn tốc độ?', 'Bạn chọn hướng mô hình nào và vì sao?', 'Bạn xử lý dữ liệu thiếu ban đêm và trời mưa ra sao?', 'Từ phát hiện từng khung hình đến "đếm xe" cần thêm gì?'],
  rubric: [
    { pts: 2, text: 'Dùng chỉ số tối ưu và chỉ số thỏa mãn: tối đa hóa mAP (hoặc sai số đếm) với điều kiện ≥ 15 khung hình/giây trên đúng thiết bị biên; đo tốc độ trên phần cứng thật.' },
    { pts: 2, text: 'Chọn bộ phát hiện một giai đoạn nhẹ (họ YOLO cỡ nhỏ, SSD-MobileNet), pretrained rồi fine-tune; tính tới vật nhỏ (độ phân giải đầu vào, anchor) và tối ưu triển khai (lượng tử hóa, TensorRT).' },
    { pts: 2, text: 'Dữ liệu ban đêm và mưa: đánh giá riêng theo điều kiện, thu thập và gán nhãn có chủ đích (ưu tiên từ chính các camera), augmentation mô phỏng độ sáng thấp, mưa, nhòe.' },
    { pts: 2, text: 'Đếm cần theo vết (tracking) giữa các khung hình để không đếm trùng, cùng vạch đếm hoặc vùng quan tâm; chỉnh ngưỡng tin cậy và NMS cho cảnh xe đông, che khuất.' },
    { pts: 2, text: 'Đánh giá đầu-cuối bằng sai số đếm so với đếm tay trên video mẫu ở nhiều nút giao; phân tích lỗi và theo dõi khi triển khai.' },
  ],
  model: `<h4>1. Mục tiêu và chỉ số</h4><p>Tốc độ là chỉ số thỏa mãn: ≥ 15 khung hình/giây đo trên đúng thiết bị biên, không đo trên GPU máy chủ. Trong các mô hình đạt tốc độ đó, tối ưu mAP@0.5 cho phát hiện, và quan trọng hơn là sai số đếm (ví dụ sai số tuyệt đối trung bình mỗi 15 phút) so với đếm tay, vì thành phố cần số đếm chứ không cần hộp bao.</p>
<h4>2. Mô hình</h4><p>Bộ phát hiện hai giai đoạn như Faster R-CNN quá chậm cho thiết bị biên. Mình chọn mô hình một giai đoạn cỡ nhỏ (họ YOLO bản nano/small), pretrained trên COCO rồi fine-tune trên 5.000 ảnh. Xe máy nhỏ nên không giảm độ phân giải đầu vào quá mức; có thể chỉ xử lý vùng đường quan tâm để tiết kiệm. Để đạt tốc độ: xuất sang TensorRT hoặc ONNX, lượng tử hóa FP16/INT8 và kiểm tra lại độ chính xác sau lượng tử hóa.</p>
<h4>3. Ban đêm và mưa</h4><p>Trước hết đánh giá riêng theo điều kiện (ngày, đêm, mưa) để biết mô hình kém đến đâu. Sau đó thu ảnh có chủ đích từ chính các camera vào ban đêm và lúc mưa, gán nhãn một vài nghìn ảnh; dữ liệu đúng phân phối triển khai đáng giá hơn nhiều so với ảnh mạng. Augmentation bổ sung: giảm độ sáng, nhiễu, nhòe chuyển động, vệt mưa, chói đèn pha. Có thể dùng mô hình lớn gán nhãn sơ bộ rồi người sửa để giảm công.</p>
<h4>4. Từ phát hiện đến đếm</h4><p>Phát hiện từng khung hình rồi cộng lại sẽ đếm trùng cùng một xe nhiều lần. Cần theo vết (ví dụ SORT/ByteTrack) để gán mã cho từng xe qua các khung, và chỉ đếm khi vết cắt qua một vạch đếm theo đúng hướng. Với cảnh xe máy dày đặc, ngưỡng NMS quá thấp sẽ gộp mất các xe cạnh nhau, nên chỉnh ngưỡng tin cậy và NMS trên video thực tế.</p>
<h4>5. Đánh giá và vận hành</h4><p>Lấy video mẫu ở 10–20 nút giao khác nhau, nhiều thời điểm, đếm tay và so. Phân tích lỗi theo loại xe và điều kiện. Khi triển khai, theo dõi các camera có số đếm bất thường (camera bị lệch, bẩn ống kính).</p>`,
  sources: ['deeplearning.ai – Structuring ML Projects (chỉ số tối ưu và chỉ số thỏa mãn)', 'CS231n – phát hiện vật thể', 'IOAI Syllabus – Computer Vision'],
},
];
