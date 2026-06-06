/**
 * content.ts — Central data store for ĐẠI VIỆT KÝ SỰ
 * All presentation content is defined here as typed arrays.
 * MLN111 — FPT University
 *
 * NOTE: All content is purely theoretical / educational.
 * The historical story is a fictional simulation set in medieval feudal society.
 * No references to modern Vietnam or any specific contemporary state.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TimelineStep {
  id: string;
  step: number;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  example: string;
  keyMessage: string;
}

export interface Character {
  id: string;
  emoji: string;
  name: string;
  role: string;
  position: string;
  classInterest: string;
  color: string;
}

export interface StoryScene {
  id: string;
  scene: number;
  title: string;
  description: string;
  theoryNote: string;
  characterIds: string[];
  icon: string;
}

export interface DecisionOption {
  id: string;
  label: string;
  consequence: string;
  theoryLink: string;
  color: 'blue' | 'red' | 'yellow';
}

export interface StateItem {
  icon: string;
  label: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Presenter {
  id: string;
  name: string;
  section: string;
  role: string;
  talkingPoints: string[];
  timeEstimate: string;
}

// ─── TIMELINE DATA (Lenin Theory) ─────────────────────────────────────────────

export const timelineData: TimelineStep[] = [
  {
    id: 'ts-1',
    step: 1,
    icon: 'Users',
    title: 'Xã hội nguyên thủy',
    subtitle: 'Primitive Society',
    description:
      'Con người sống chung, cùng lao động và chia sẻ tài sản. Chưa có sự phân hóa giàu nghèo, chưa có giai cấp, chưa cần Nhà nước để duy trì trật tự.',
    example:
      'Các cộng đồng bộ lạc nguyên thủy — sở hữu chung, không có người thống trị.',
    keyMessage: 'Không có giai cấp → Không cần Nhà nước.',
  },
  {
    id: 'ts-2',
    step: 2,
    icon: 'Coins',
    title: 'Xuất hiện tư hữu',
    subtitle: 'Private Property Emerges',
    description:
      'Công cụ sản xuất phát triển, năng suất tăng. Một số người tích lũy của cải dư thừa. Tài sản bắt đầu thuộc về cá nhân thay vì cộng đồng.',
    example:
      'Trong xã hội nông nghiệp phong kiến: ruộng đất, gia súc, công cụ trở thành tài sản riêng.',
    keyMessage: 'Tư hữu là hạt giống của bất bình đẳng.',
  },
  {
    id: 'ts-3',
    step: 3,
    icon: 'TrendingUp',
    title: 'Xuất hiện giai cấp',
    subtitle: 'Classes Form',
    description:
      'Xã hội phân hóa rõ rệt: kẻ có nhiều đất đai, tài sản — người không có gì. Người giàu ngày càng giàu, người nghèo ngày càng phụ thuộc.',
    example:
      'Xã hội phong kiến phân chia thành: địa chủ sở hữu ruộng đất và nông dân lao động phụ thuộc.',
    keyMessage: 'Giai cấp có lợi ích đối lập nhau về kinh tế.',
  },
  {
    id: 'ts-4',
    step: 4,
    icon: 'Swords',
    title: 'Mâu thuẫn lợi ích',
    subtitle: 'Class Conflicts Appear',
    description:
      'Địa chủ muốn giữ và mở rộng đất. Nông dân muốn sống đủ ăn và được công bằng. Lợi ích đối kháng nhau — mâu thuẫn bắt đầu nảy sinh.',
    example:
      'Nông dân không nộp đủ tô thuế bị địa chủ đuổi khỏi ruộng — xung đột lợi ích bùng phát.',
    keyMessage: 'Lợi ích đối lập → Xung đột không tránh khỏi.',
  },
  {
    id: 'ts-5',
    step: 5,
    icon: 'AlertTriangle',
    title: 'Mâu thuẫn không thể điều hòa',
    subtitle: 'Irreconcilable Antagonisms',
    description:
      'Mâu thuẫn leo thang đến mức không thể tự giải quyết. Không có cơ chế trung gian nào đủ mạnh để ngăn xung đột bùng nổ.',
    example:
      'Các cuộc khởi nghĩa nông dân trong lịch sử phong kiến thế giới — biểu hiện của mâu thuẫn không thể hòa giải.',
    keyMessage: 'Mâu thuẫn không thể tự hòa giải → cần cơ chế cưỡng chế.',
  },
  {
    id: 'ts-6',
    step: 6,
    icon: 'Building2',
    title: 'Nhà nước ra đời',
    subtitle: 'The State Appears',
    description:
      'Giai cấp thống trị tạo ra bộ máy Nhà nước: luật pháp, quân đội, quan lại. Nhà nước duy trì trật tự theo cách có lợi cho giai cấp đang nắm quyền.',
    example:
      'Bộ máy quan lại phong kiến trong mô phỏng Đại Việt: quan tri huyện thực thi luật pháp của giai cấp thống trị.',
    keyMessage:
      '"Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được." — Lenin',
  },
];

// ─── CHARACTER DATA ───────────────────────────────────────────────────────────

export const characterData: Character[] = [
  {
    id: 'farmer',
    emoji: '🧑‍🌾',
    name: 'Nông dân Văn',
    role: 'Người lao động',
    position: 'Giai cấp bị bóc lột',
    classInterest: 'Giữ ruộng đất, có đủ lương thực để sống',
    color: 'blue',
  },
  {
    id: 'landlord',
    emoji: '👨‍💼',
    name: 'Địa chủ Nguyễn',
    role: 'Người sở hữu đất đai',
    position: 'Giai cấp thống trị',
    classInterest: 'Mở rộng ruộng đất, tối đa hóa tô thuế',
    color: 'yellow',
  },
  {
    id: 'official',
    emoji: '⚖️',
    name: 'Quan tri huyện Lê',
    role: 'Đại diện Nhà nước',
    position: 'Công cụ quyền lực',
    classInterest: 'Duy trì trật tự và bảo vệ lợi ích giai cấp thống trị',
    color: 'red',
  },
];

// ─── STORY SCENES ─────────────────────────────────────────────────────────────

export const storyScenes: StoryScene[] = [
  {
    id: 'scene-1',
    scene: 1,
    icon: 'CloudRain',
    title: 'Nông dân mất ruộng',
    description:
      'Thiên tai liên tiếp, mùa màng thất bát. Gia đình nông dân Văn không nộp đủ tô thuế. Địa chủ Nguyễn yêu cầu trả nợ bằng đất.',
    theoryNote: 'Bất bình đẳng tài sản → quan hệ bóc lột hình thành.',
    characterIds: ['farmer', 'landlord'],
  },
  {
    id: 'scene-2',
    scene: 2,
    icon: 'Home',
    title: 'Địa chủ chiếm đất',
    description:
      'Địa chủ Nguyễn dùng gia nhân cưỡng chiếm ruộng. Nông dân Văn không có sức mạnh để chống lại. Gia đình lâm vào cảnh khốn cùng.',
    theoryNote: 'Giai cấp có tài sản sử dụng quyền lực kinh tế để áp bức.',
    characterIds: ['farmer', 'landlord'],
  },
  {
    id: 'scene-3',
    scene: 3,
    icon: 'FileText',
    title: 'Dân khiếu kiện',
    description:
      'Tuyệt vọng, nông dân Văn đến dinh quan huyện khiếu kiện. Địa chủ Nguyễn cũng có mặt với tài liệu và quan hệ quyền lực.',
    theoryNote: 'Mâu thuẫn giai cấp bùng phát, cần cơ chế giải quyết.',
    characterIds: ['farmer', 'landlord', 'official'],
  },
  {
    id: 'scene-4',
    scene: 4,
    icon: 'Scale',
    title: 'Xung đột leo thang',
    description:
      'Quan tri huyện Lê xét xử theo luật phong kiến — luật do giai cấp thống trị đặt ra. Kết quả thiên vị địa chủ. Mâu thuẫn không được giải quyết tận gốc.',
    theoryNote: 'Nhà nước dùng luật pháp để duy trì lợi ích giai cấp thống trị.',
    characterIds: ['farmer', 'landlord', 'official'],
  },
];

// ─── DECISION SIMULATOR OPTIONS ───────────────────────────────────────────────

export const decisionOptions: DecisionOption[] = [
  {
    id: 'protect-farmer',
    label: 'A. Bảo vệ nông dân',
    consequence:
      'Địa chủ phẫn nộ, liên kết với tầng lớp quý tộc chống lại quyết định. Trật tự xã hội vẫn bất ổn vì gốc rễ mâu thuẫn chưa được xử lý.',
    theoryLink:
      'Nhà nước không thể bảo vệ triệt để giai cấp bị áp bức mà không xung đột với giai cấp thống trị.',
    color: 'blue',
  },
  {
    id: 'protect-landlord',
    label: 'B. Bảo vệ địa chủ',
    consequence:
      'Nông dân phẫn nộ, mâu thuẫn tích tụ. Có thể dẫn đến bạo loạn, khởi nghĩa. Nhà nước bộc lộ bản chất công cụ của giai cấp thống trị.',
    theoryLink:
      'Nhà nước phong kiến đại diện cho lợi ích của địa chủ — đây chính là bản chất giai cấp của Nhà nước.',
    color: 'red',
  },
  {
    id: 'no-intervene',
    label: 'C. Không can thiệp',
    consequence:
      'Mâu thuẫn tự leo thang, xã hội rơi vào hỗn loạn. Điều này chứng minh sự cần thiết của Nhà nước khi mâu thuẫn giai cấp tồn tại.',
    theoryLink:
      'Khi Nhà nước không can thiệp, mâu thuẫn không thể tự điều hòa — chứng minh lý luận của Lenin.',
    color: 'yellow',
  },
];

// ─── STATE ON/OFF DATA ────────────────────────────────────────────────────────

export const stateOnItems: StateItem[] = [
  { icon: 'Scale',     label: 'Pháp luật',            description: 'Quy tắc ràng buộc chung do Nhà nước ban hành' },
  { icon: 'Building2', label: 'Cơ quan xét xử',       description: 'Giải quyết tranh chấp một cách có hệ thống' },
  { icon: 'Shield',    label: 'Lực lượng cưỡng chế',  description: 'Thực thi quyền lực Nhà nước trong xã hội' },
  { icon: 'Users',     label: 'Thiết chế quản lý',    description: 'Tổ chức và điều phối các quan hệ xã hội' },
];

export const stateOffItems: StateItem[] = [
  { icon: 'Swords',      label: 'Tranh chấp bạo lực', description: 'Xung đột giải quyết bằng sức mạnh tự phát' },
  { icon: 'Flame',       label: 'Hỗn loạn',           description: 'Không có trật tự hay chuẩn mực chung' },
  { icon: 'AlertCircle', label: 'Xung đột gia tăng',  description: 'Mâu thuẫn leo thang không có cơ chế kiểm soát' },
  { icon: 'X',           label: 'Bất ổn xã hội',      description: 'Cuộc sống trong bất an thường trực' },
];

// ─── QUIZ DATA ────────────────────────────────────────────────────────────────

export const quizData: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Theo Lenin, Nhà nước xuất hiện vì lý do gì?',
    options: [
      'Do sự phát triển của công cụ lao động',
      'Vì mâu thuẫn giai cấp không thể điều hòa được',
      'Do ý chí của người lãnh đạo tài năng',
      'Vì nhu cầu tổ chức sản xuất chung',
    ],
    correctIndex: 1,
    explanation:
      'Lenin khẳng định: "Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được." Nhà nước không xuất hiện ngẫu nhiên mà là kết quả tất yếu khi xung đột lợi ích giữa các giai cấp trở nên không thể giải quyết.',
  },
  {
    id: 'q2',
    question: 'Trong xã hội nguyên thủy, tại sao chưa có Nhà nước?',
    options: [
      'Vì con người còn sống trong hang động',
      'Vì chưa có chữ viết và pháp luật',
      'Vì chưa có giai cấp và mâu thuẫn giai cấp',
      'Vì dân số còn quá ít',
    ],
    correctIndex: 2,
    explanation:
      'Xã hội nguyên thủy chưa có tư hữu, chưa có giai cấp nên không có mâu thuẫn giai cấp. Không có mâu thuẫn giai cấp thì không cần Nhà nước để duy trì trật tự có lợi cho giai cấp này trước giai cấp kia.',
  },
  {
    id: 'q3',
    question: 'Mâu thuẫn giai cấp là gì?',
    options: [
      'Xung đột cá nhân giữa hai người có tính cách khác nhau',
      'Sự đối lập về lợi ích kinh tế và xã hội giữa các giai cấp',
      'Tranh chấp giữa các quốc gia về lãnh thổ',
      'Bất đồng về văn hóa và tôn giáo',
    ],
    correctIndex: 1,
    explanation:
      'Mâu thuẫn giai cấp là sự đối lập về lợi ích cơ bản giữa các giai cấp trong xã hội. Ví dụ trong mô phỏng Đại Việt: địa chủ muốn tối đa hóa tô thuế, nông dân muốn giữ đất và sống được — lợi ích này đối kháng nhau về bản chất.',
  },
  {
    id: 'q4',
    question: 'Trong câu chuyện Đại Việt, quan tri huyện đại diện cho điều gì?',
    options: [
      'Sự công bằng tuyệt đối của pháp luật',
      'Giai cấp nông dân đang đấu tranh cho quyền lợi',
      'Nhà nước là công cụ của giai cấp thống trị',
      'Sự phát triển văn minh của xã hội phong kiến',
    ],
    correctIndex: 2,
    explanation:
      'Quan tri huyện đại diện cho Nhà nước phong kiến — thực thi luật pháp do giai cấp thống trị tạo ra. Quyết định xét xử thường có lợi cho giai cấp thống trị, thể hiện bản chất giai cấp của Nhà nước theo phân tích của Lenin.',
  },
  {
    id: 'q5',
    question: 'Thông điệp trọng tâm của bài trình bày này là gì?',
    options: [
      'Nhà nước luôn bảo vệ quyền lợi bình đẳng của mọi công dân',
      'Nhà nước là sản phẩm của mâu thuẫn giai cấp không thể điều hòa',
      'Mâu thuẫn xã hội có thể tự giải quyết mà không cần Nhà nước',
      'Nhà nước chỉ cần thiết trong xã hội phong kiến cổ đại',
    ],
    correctIndex: 1,
    explanation:
      'Toàn bộ hành trình — từ lý luận Lenin, câu chuyện mô phỏng Đại Việt, đến các hoạt động tương tác — đều hướng đến một kết luận: Nhà nước không xuất hiện ngẫu nhiên, nó là sản phẩm tất yếu khi mâu thuẫn giai cấp trở nên không thể tự điều hòa.',
  },
];

// ─── PRESENTER DATA ───────────────────────────────────────────────────────────

export const presenterData: Presenter[] = [
  {
    id: 'long',
    name: 'Long',
    section: 'Giới thiệu',
    role: 'MC & Người dẫn chương trình',
    talkingPoints: [
      'Giới thiệu chủ đề: Nhà nước và mâu thuẫn giai cấp',
      'Nêu câu hỏi trung tâm của bài trình bày',
      'Trình bày nhận định của Lenin',
      'Giới thiệu cấu trúc website và hành trình tương tác',
    ],
    timeEstimate: '3–4 phút',
  },
  {
    id: 'duy',
    name: 'Duy',
    section: 'Lý luận Lenin',
    role: 'Chuyên gia lý luận',
    talkingPoints: [
      'Trình bày 6 bước hình thành Nhà nước theo Lenin',
      'Giải thích từng giai đoạn trong timeline',
      'Kết nối lý thuyết với ví dụ từ mô phỏng Đại Việt',
      'Nhấn mạnh tính tất yếu của sự ra đời Nhà nước',
    ],
    timeEstimate: '4–5 phút',
  },
  {
    id: 'son',
    name: 'Sơn',
    section: 'Câu chuyện Đại Việt',
    role: 'Người kể chuyện',
    talkingPoints: [
      'Giới thiệu 3 nhân vật: Nông dân, Địa chủ, Quan tri huyện',
      'Kể 4 cảnh truyện theo trình tự',
      'Phân tích mâu thuẫn giai cấp qua từng cảnh',
      'Kết nối câu chuyện mô phỏng với lý luận của Lenin',
    ],
    timeEstimate: '5–6 phút',
  },
  {
    id: 'sang',
    name: 'Sang',
    section: 'Tương tác',
    role: 'Người điều phối tương tác',
    talkingPoints: [
      'Điều hành Decision Simulator — hỏi ý kiến khán giả',
      'Phân tích 3 lựa chọn và hệ quả lý luận',
      'Thực hiện State ON/OFF Simulation',
      'Kết nối kết quả tương tác với lý luận Lenin',
    ],
    timeEstimate: '5–7 phút',
  },
  {
    id: 'phat',
    name: 'Phát',
    section: 'Quiz',
    role: 'Người tổ chức quiz',
    talkingPoints: [
      'Giới thiệu phần kiểm tra kiến thức',
      'Đọc câu hỏi và hướng dẫn khán giả trả lời',
      'Phân tích đáp án và giải thích lý luận',
      'Kết nối câu trả lời với nhận định của Lenin',
    ],
    timeEstimate: '4–5 phút',
  },
  {
    id: 'quy',
    name: 'Quý',
    section: 'Kết luận',
    role: 'Tổng kết & Hỏi đáp',
    talkingPoints: [
      'Tổng kết hành trình của bài trình bày',
      'Nhấn mạnh kết luận cuối cùng về Nhà nước',
      'Trình bày phụ lục minh bạch AI',
      'Mời câu hỏi và thảo luận từ giảng viên',
    ],
    timeEstimate: '4–5 phút',
  },
];
