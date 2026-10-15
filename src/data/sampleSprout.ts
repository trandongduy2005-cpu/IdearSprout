import { SproutResult } from '../types';

export const SAMPLE_SPROUT: SproutResult = {
  id: 'sprout_sample_plantcare',
  createdAt: new Date().toISOString(),
  rawInput: 'Ứng dụng AI chụp ảnh lá cây cảnh nhận diện sâu bệnh và hướng dẫn chăm sóc bằng tiếng Việt',
  greeting: "Chào mừng bạn! Hãy cùng ươm mầm ý tưởng của bạn: Mầm Xanh AI (SproutMate)",
  userName: undefined,
  userEmail: undefined,
  authProvider: undefined,
  languageDetected: 'Vietnamese',
  productName: 'Mầm Xanh AI (SproutMate)',
  tagline: 'Bác sĩ cây cảnh bỏ túi – Nuôi dưỡng không gian xanh bằng thị giác AI thông minh',
  overview: {
    originalIdeaSummary: 'Ứng dụng di động sử dụng thị giác máy tính và AI để phân tích tình trạng sức khỏe của cây cảnh qua một tấm ảnh, đồng thời cá nhân hóa lịch tưới nước và dinh dưỡng bằng tiếng Việt.',
    coreValueProposition: 'Biến mọi người yêu cây thành chuyên gia làm vườn mà không cần kinh nghiệm nông nghiệp; chẩn đoán chính xác sâu bệnh trong 3 giây và gửi thông báo lịch chăm sóc theo khí hậu từng vùng miền Việt Nam.',
  },
  analysis: {
    targetAudience: [
      {
        segment: 'Người trẻ làm việc văn phòng (Gen Z & Millennials)',
        description: 'Thích trồng cây xanh mini trên bàn làm việc hoặc ban công chung cư nhưng thường xuyên quên tưới nước hoặc tưới quá nhiều.',
        personaQuote: 'Mình rất thích mua cây về trang trí phòng nhưng sau 2 tuần cây thường vàng lá mà không biết tại sao.',
      },
      {
        segment: 'Người yêu cây cảnh trung niên & cao tuổi',
        description: 'Chăm sóc nhiều loại cây phong thủy, hoa lan hoặc kiểng lá cần hướng dẫn kỹ thuật rõ ràng bằng tiếng Việt dễ hiểu.',
        personaQuote: 'Cần một ứng dụng dễ nhìn chữ to, bấm chụp một cái là biết cây đang thiếu phân hay bị rầy.',
      },
      {
        segment: 'Chủ tiệm bán hoa & cây kiểng nhỏ',
        description: 'Muốn cung cấp dịch vụ hậu mãi tự động kèm mã QR chăm sóc cây cho khách mua cây tại vườn.',
        personaQuote: 'Khách hay hỏi sau khi mua về chăm ra sao, có app gửi kèm thì uy tín hơn hẳn.',
      },
    ],
    problemSolved: '70% cây cảnh nội thất bị chết do tưới sai cách hoặc phát hiện nấm bệnh quá trễ. Thông tin trên mạng thường chung chung hoặc bằng tiếng nước ngoài không sát với khí hậu nhiệt đới gió mùa tại Việt Nam.',
    keyFeatures: [
      {
        name: 'AI Scan & Chẩn đoán Bệnh Lá Cây',
        description: 'Nhận diện hơn 250 bệnh nấm, rầy, đốm lá và thiếu chất dinh dưỡng chỉ bằng 1 bức ảnh chụp.',
        priority: 'Must Have',
      },
      {
        name: 'Lịch Tưới Thông Minh Theo Thời Tiết Cục Bộ',
        description: 'Tự động điều chỉnh tần suất tưới nước dựa trên nhiệt độ và độ ẩm thực tế tại địa phương (Hà Nội, Sài Gòn, Đà Lạt).',
        priority: 'Must Have',
      },
      {
        name: 'Cộng Đồng "Bác Sĩ Cây" & Trợ Lý Giọng Nói',
        description: 'Trò chuyện hỏi đáp bằng giọng nói tự nhiên, kết nối chuyên gia nông học khi gặp ca bệnh hiếm.',
        priority: 'Core',
      },
      {
        name: 'Bản Đồ Nắng Ban Công (Light Meter AI)',
        description: 'Sử dụng cảm biến camera để đo cường độ ánh sáng trong phòng và gợi ý vị trí đặt cây phù hợp.',
        priority: 'Differentiator',
      },
    ],
    challengesAndSolutions: [
      {
        challenge: 'Độ chính xác nhận diện bệnh lá trong điều kiện ánh sáng yếu hoặc camera mờ.',
        solution: 'Tích hợp hướng dẫn căn chỉnh khung hình trực quan (Live Framing) và thuật toán tăng cường độ tương phản trước khi AI phân tích.',
      },
      {
        challenge: 'Sự khác biệt lớn về khí hậu khô hanh miền Bắc vs mùa mưa miền Nam.',
        solution: 'Định vị GPS nhẹ để đồng bộ dữ liệu trạm khí tượng thủy văn, tự động chuyển đổi công thức chăm sóc cây theo mùa.',
      },
    ],
  },
  conceptDraft: {
    suggestedNames: [
      {
        name: 'Mầm Xanh AI',
        tagline: 'Chữa lành không gian sống, mỗi chiếc lá đều khỏe mạnh',
        vibe: 'Gần gũi, ấm áp, đậm chất Việt Nam',
      },
      {
        name: 'PlantPulse VN',
        tagline: 'Nhịp đập sinh học cho khu vườn ban công của bạn',
        vibe: 'Hiện đại, công nghệ cao, nhịp sống đô thị',
      },
      {
        name: 'Bác Sĩ Lá (LeafDoc)',
        tagline: 'Bắt bệnh cây trong 3 giây, xanh mướt quanh năm',
        vibe: 'Rõ ràng, trực diện, cam kết hiệu quả',
      },
    ],
    userJourney: [
      {
        step: 1,
        phase: 'Step 1 (Input)',
        title: 'Chụp Ảnh Lá Cây Đang Gặp Vấn Đề',
        description: 'Người dùng mở app, hướng camera vào chiếc lá đang bị úa vàng hoặc có đốm trắng.',
        userAction: 'Bấm nút chụp ảnh hoặc chọn ảnh từ thư viện',
        systemReaction: 'AI quét cấu trúc gân lá, phân tích độ ẩm sắc tố và khoanh vùng bệnh lý',
      },
      {
        step: 2,
        phase: 'Step 2 (Core Action)',
        title: 'Xem Báo Cáo Sức Khỏe & Kê Đơn Tự Nhiên',
        description: 'Ứng dụng hiển thị tên bệnh, nguyên nhân chính và giải pháp xử lý bằng mẹo hữu cơ hoặc thuốc sinh học.',
        userAction: 'Lựa chọn phương án chữa trị tại nhà (nước tỏi ớt, đổi đất hoặc bón phân vi sinh)',
        systemReaction: 'Hệ thống thiết lập chu kỳ theo dõi 7 ngày và kích hoạt thông báo nhắc nhở',
      },
      {
        step: 3,
        phase: 'Step 3 (Value Outcome)',
        title: 'Cây Hồi Sinh & Lưu Hồ Sơ Vườn Nhà',
        description: 'Sau 1 tuần, người dùng chụp lại chiếc lá đã xanh tốt trở lại, nhận huy hiệu "Bàn Tay Xanh" và tự tin nhân giống cây mới.',
        userAction: 'Xác nhận cây đã bình phục và chia sẻ thành quả lên trang cá nhân',
        systemReaction: 'Cập nhật chỉ số sức khỏe của toàn bộ khu vườn và lưu lại lịch sử chăm sóc',
      },
    ],
    recommendedTechStack: [
      {
        category: 'Frontend Client',
        recommendation: 'React Native / Flutter + Tailwind Mobile',
        rationale: 'Hỗ trợ camera mượt mà trên cả iOS và Android, hiệu năng render 60fps khi xem mô hình 3D cây.',
      },
      {
        category: 'AI & Vision Engine',
        recommendation: 'Google Gemini 3.8 Flash Vision + Custom PlantNet weights',
        rationale: 'Khả năng hiểu ngữ cảnh hình ảnh thực tế siêu tốc, nhận diện tổn thương lá và trả về hướng dẫn chi tiết tiếng Việt.',
      },
      {
        category: 'Backend & Database',
        recommendation: 'Node.js Express + PostgreSQL / Cloud SQL',
        rationale: 'Lưu trữ hồ sơ cây trồng, lịch sử tưới tiêu và tọa độ trạm thời tiết dễ dàng mở rộng.',
      },
      {
        category: 'Weather & Push Notifications',
        recommendation: 'OpenWeatherMap API + Firebase Cloud Messaging',
        rationale: 'Cập nhật cảnh báo sương muối, nắng gắt hoặc mưa bão cục bộ để nhắc người dùng chuyển cây vào nhà.',
      },
    ],
    executionSteps: [
      {
        phase: 'Sprint 1 (Tuần 1-2)',
        task: 'Xây dựng MVP nhận diện ảnh và chuẩn hóa bộ dữ liệu 50 loài cây cảnh phổ biến nhất tại Việt Nam (kim tiền, trầu bà, lưỡi hổ, sen đá).',
        timeframe: '14 ngày',
      },
      {
        phase: 'Sprint 2 (Tuần 3-4)',
        task: 'Triển khai tính năng nhắc lịch tưới tiêu cá nhân hóa và tích hợp trợ lý chat hỏi đáp chăm sóc cây.',
        timeframe: '14 ngày',
      },
      {
        phase: 'Sprint 3 (Tuần 5-6)',
        task: 'Thử nghiệm closed-beta với 100 người yêu cây và liên kết với 5 shop kiểng lá tại Hà Nội và TP.HCM.',
        timeframe: '14 ngày',
      },
    ],
  },
  videoConcept: {
    conceptTitle: 'Tia Sáng Xanh Trên Ban Công Thành Phố',
    aspectRatio: '16:9',
    cameraStyle: 'Cinematic warm morning sun, shallow depth of field, macro botanical close-ups',
    cinematicScenarioScript: [
      {
        timeframe: '00:00 - 00:08',
        scene: 'Buổi sáng mệt mỏi tại căn hộ chung cư',
        action: 'Một nhân viên trẻ bước ra ban công cầm cốc cà phê, phát hiện chậu cây lưỡi hổ yêu quý bị vàng lá rũ xuống trong tuyệt vọng.',
        visualCue: 'Ánh nắng bình minh vàng cam rọi qua cửa kính, góc quay cận cảnh chiếc lá héo úa với hạt bụi li ti.',
        audioOrVoiceover: 'Bạn từng yêu một mầm cây xanh, nhưng lại lo sợ không thể giữ nó sống sót?',
      },
      {
        timeframe: '00:08 - 00:18',
        scene: 'Khoảnh khắc mở app và quét ảnh thông minh',
        action: 'Nhân vật rút điện thoại mở IdeaSprout Mầm Xanh, hướng camera quét nhẹ. Vòng hào quang xanh lục xuất hiện quanh chiếc lá và hiển thị chẩn đoán ngay tức khắc.',
        visualCue: 'Hiệu ứng AR holographic nhẹ nhàng bám theo viền lá, hiển thị biểu tượng giọt nước và icon dinh dưỡng.',
        audioOrVoiceover: 'Trong 3 giây, Mầm Xanh AI thấu hiểu từng tế bào lá cây của bạn.',
      },
      {
        timeframe: '00:18 - 00:30',
        scene: 'Khu vườn ban công tràn ngập sức sống',
        action: 'Chuyển cảnh sau 2 tuần: nhân vật mỉm cười xịt nước mát lạnh lên những chiếc lá xanh mướt căng bóng. Căn phòng bừng sáng sinh khí thiên nhiên.',
        visualCue: 'Góc máy lướt chậm (slow dolly), những giọt nước đọng trên ngọn lá lấp lánh phản chiếu nụ cười hạnh phúc.',
        audioOrVoiceover: 'Nuôi dưỡng ý tưởng, chăm sóc cuộc sống. Mầm Xanh AI – Để sự sống luôn đâm chồi.',
      },
    ],
    videoGenerationPrompt: 'Cinematic 8k commercial video. Morning golden hour soft sunlight entering a modern minimalist urban balcony apartment in Saigon. A stylish 25-year-old Vietnamese professional holds a sleek smartphone, scanning a potted Monstera plant. Soft green luminous AR contour lines gently scan across the plant leaves. Macro close-up on fresh morning dew on vibrant green botanical leaves. Shallow depth of field, 35mm anamorphic lens, warm Kodachrome color grade, gentle atmospheric dust motes, peaceful uplifting mood, photorealistic texture.',
  },
  formattedMarkdown: `Greeting: "Chào mừng bạn! Hãy cùng ươm mầm ý tưởng của bạn: Mầm Xanh AI (SproutMate)"

---
## 1. 🌿 Idea Overview (Tổng quan Ý tưởng)
- **Original Idea Summary:** Ứng dụng di động sử dụng thị giác máy tính và AI để phân tích tình trạng sức khỏe của cây cảnh qua một tấm ảnh, đồng thời cá nhân hóa lịch tưới nước và dinh dưỡng bằng tiếng Việt.
- **Core Value Proposition:** Biến mọi người yêu cây thành chuyên gia làm vườn mà không cần kinh nghiệm nông nghiệp; chẩn đoán chính xác sâu bệnh trong 3 giây và gửi thông báo lịch chăm sóc theo khí hậu từng vùng miền Việt Nam.

## 2. 🚀 Idea Expansion & Analysis (Mở rộng & Phân tích)
- **Target Audience (Khách hàng mục tiêu):**
  - *Người trẻ làm việc văn phòng (Gen Z & Millennials):* Thích trồng cây xanh mini trên bàn làm việc hoặc ban công chung cư nhưng thường xuyên quên tưới nước hoặc tưới quá nhiều.
  - *Người yêu cây cảnh trung niên & cao tuổi:* Chăm sóc nhiều loại cây phong thủy, hoa lan hoặc kiểng lá cần hướng dẫn kỹ thuật rõ ràng bằng tiếng Việt dễ hiểu.
  - *Chủ tiệm bán hoa & cây kiểng nhỏ:* Muốn cung cấp dịch vụ hậu mãi tự động kèm mã QR chăm sóc cây cho khách mua cây tại vườn.
- **Problem Solved (Vấn đề giải quyết):** 70% cây cảnh nội thất bị chết do tưới sai cách hoặc phát hiện nấm bệnh quá trễ. Thông tin trên mạng thường chung chung hoặc bằng tiếng nước ngoài không sát với khí hậu nhiệt đới gió mùa tại Việt Nam.
- **Key Features (Tính năng cốt lõi):**
  1. *AI Scan & Chẩn đoán Bệnh Lá Cây:* Nhận diện hơn 250 bệnh nấm, rầy, đốm lá và thiếu chất dinh dưỡng chỉ bằng 1 bức ảnh chụp.
  2. *Lịch Tưới Thông Minh Theo Thời Tiết Cục Bộ:* Tự động điều chỉnh tần suất tưới nước dựa trên nhiệt độ và độ ẩm thực tế tại địa phương.
  3. *Cộng Đồng "Bác Sĩ Cây" & Trợ Lý Giọng Nói:* Trò chuyện hỏi đáp bằng giọng nói tự nhiên, kết nối chuyên gia nông học khi gặp ca bệnh hiếm.
  4. *Bản Đồ Nắng Ban Công (Light Meter AI):* Sử dụng cảm biến camera để đo cường độ ánh sáng trong phòng và gợi ý vị trí đặt cây phù hợp.
- **Potential Challenges & Solutions:**
  - *Thách thức 1:* Độ chính xác nhận diện bệnh lá trong điều kiện ánh sáng yếu hoặc camera mờ.
  - *Giải pháp:* Tích hợp hướng dẫn căn chỉnh khung hình trực quan (Live Framing) và thuật toán tăng cường độ tương phản trước khi AI phân tích.
  - *Thách thức 2:* Sự khác biệt lớn về khí hậu khô hanh miền Bắc vs mùa mưa miền Nam.
  - *Giải pháp:* Định vị GPS nhẹ để đồng bộ dữ liệu trạm khí tượng thủy văn, tự động chuyển đổi công thức chăm sóc cây theo mùa.

## 3. 📋 Product Concept Draft (Bản phác thảo Sản phẩm)
- **Suggested App/Product Name Ideas:**
  1. **Mầm Xanh AI** - "Chữa lành không gian sống, mỗi chiếc lá đều khỏe mạnh"
  2. **PlantPulse VN** - "Nhịp đập sinh học cho khu vườn ban công của bạn"
  3. **Bác Sĩ Lá (LeafDoc)** - "Bắt bệnh cây trong 3 giây, xanh mướt quanh năm"
- **User Journey Blueprint:**
  - *Step 1 (Input):* Người dùng chụp ảnh lá cây đang bị ố vàng hoặc rũ xuống. AI quét cấu trúc gân lá và độ bão hòa diệp lục.
  - *Step 2 (Core Action):* Ứng dụng đưa ra chẩn đoán chính xác nguyên nhân (nhiễm nấm/úng nước) và đề xuất phương án xử lý tự nhiên.
  - *Step 3 (Value Outcome):* Sau 7 ngày, chiếc lá xanh tươi trở lại. Người dùng chụp ảnh xác nhận và tự hào lưu vào vườn sinh thái của mình.
- **Recommended Tech Stack / Execution Steps:**
  - *Frontend:* React Native / Flutter + Tailwind
  - *AI & Vision Engine:* Google Gemini 3.8 Flash Vision + Fine-tuned botanical classifier
  - *Backend & DB:* Node.js Express + Cloud SQL
  - *Weather integration:* OpenWeatherMap API + Firebase Push Notifications

## 4. 🎬 Premium Feature: Real-World Video Concept (Phân cảnh Video Minh họa)
- **Concept Title:** Tia Sáng Xanh Trên Ban Công Thành Phố
- **Cinematic Scenario Script (15-30s):**
  - *00:00 - 00:08 (Cảnh 1):* Người trẻ thức dậy mệt mỏi ở chung cư, nhìn thấy chậu cây yêu quý bị vàng lá úa rũ trong ánh sáng mai.
  - *00:08 - 00:18 (Cảnh 2):* Mở app quét camera; đường viền AR ánh xanh rọi quanh phiến lá, chẩn đoán hiển thị trong tích tắc: "Thiếu sắt & thừa nước".
  - *00:18 - 00:30 (Cảnh 3):* Hai tuần sau, ban công phủ màu xanh mướt mát lành, sương mai đọng trên phiến lá căng tràn sức sống.
- **Video Generation Prompt:**
  \`\`\`
  Cinematic 8k commercial video. Morning golden hour soft sunlight entering a modern minimalist urban balcony apartment in Saigon. A stylish 25-year-old Vietnamese professional holds a sleek smartphone, scanning a potted Monstera plant. Soft green luminous AR contour lines gently scan across the plant leaves. Macro close-up on fresh morning dew on vibrant green botanical leaves. Shallow depth of field, 35mm anamorphic lens, warm Kodachrome color grade, gentle atmospheric dust motes, peaceful uplifting mood, photorealistic texture.
  \`\`\`
`,
};
