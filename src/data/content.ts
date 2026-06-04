/**
 * content.ts — Central data store for ĐẠI VIỆT KÝ SỰ
 * All presentation content is defined here as typed arrays.
 * MLN111 — FPT University
 */

// ─── Types ──────────────────────────────────────────────────────────────────

export interface TimelineStep {
  id: string;
  step: number;
  icon: string;          // Lucide icon name
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
  color: string;        // Tailwind accent color key
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

export interface RealityCard {
  id: string;
  icon: string;
  title: string;
  category: 'conflict' | 'institution';
  shortDesc: string;
  detail: string;
  leninLink: string;
  color: string;
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

// ─── TIMELINE DATA (Lenin Theory) ───────────────────────────────────────────

export const timelineData: TimelineStep[] = [
  {
    id: 'ts-1',
    step: 1,
    icon: 'Users',
    title: 'Xã hội nguyên thủy',
    subtitle: 'Primitive Society',
    description:
      'Con người sống chung, cùng lao động và chia sẻ tài sản. Chưa có sự phân hóa giàu nghèo, chưa có giai cấp, chưa cần Nhà nước để duy trì trật tự.',
    example: 'Các bộ lạc Việt cổ thời kỳ đồ đá sống cộng đồng.',
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
    example: 'Thời Văn Lang – Âu Lạc: xuất hiện sở hữu ruộng đất cá nhân.',
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
      'Triều đình phong kiến Việt Nam: địa chủ sở hữu ruộng, nông dân canh thuê.',
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
    example: 'Nông dân Đại Việt không nộp đủ tô thuế bị đuổi khỏi ruộng.',
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
      'Nông dân khởi nghĩa chống áp bức: Lý Bí, Đinh Bộ Lĩnh, phong trào Tây Sơn…',
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
    example: 'Bộ máy quan lại phong kiến Việt Nam — Lục bộ, quan tri huyện.',
    keyMessage:
      '"Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được." — Lenin',
  },
];

// ─── CHARACTER DATA ──────────────────────────────────────────────────────────

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
    classInterest: 'Duy trì trật tự và bảo vệ lợi ích triều đình',
    color: 'red',
  },
];

// ─── STORY SCENES ────────────────────────────────────────────────────────────

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

// ─── DECISION SIMULATOR OPTIONS ──────────────────────────────────────────────

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

// ─── STATE ON/OFF DATA ───────────────────────────────────────────────────────

export const stateOnItems: StateItem[] = [
  { icon: 'Scale',     label: 'Pháp luật',        description: 'Quy định rõ ràng về quyền và nghĩa vụ' },
  { icon: 'Building2', label: 'Tòa án',           description: 'Giải quyết tranh chấp một cách có hệ thống' },
  { icon: 'Shield',    label: 'Lực lượng thực thi', description: 'Đảm bảo luật pháp được tuân thủ' },
  { icon: 'Users',     label: 'Quản lý xã hội',   description: 'Tổ chức và điều phối các hoạt động xã hội' },
];

export const stateOffItems: StateItem[] = [
  { icon: 'Swords',        label: 'Tranh chấp bạo lực',  description: 'Xung đột giải quyết bằng sức mạnh' },
  { icon: 'Flame',         label: 'Hỗn loạn',            description: 'Không có trật tự, chuẩn mực chung' },
  { icon: 'AlertCircle',   label: 'Xung đột gia tăng',   description: 'Mâu thuẫn leo thang không kiểm soát' },
  { icon: 'X',             label: 'Bất ổn xã hội',       description: 'Cuộc sống trong bất an thường trực' },
];

// ─── REALITY DASHBOARD CARDS ─────────────────────────────────────────────────

export const realityCards: RealityCard[] = [
  {
    id: 'labor',
    icon: 'Briefcase',
    title: 'Tranh chấp lao động',
    category: 'conflict',
    shortDesc: 'Mâu thuẫn giữa người lao động và người sử dụng lao động',
    detail:
      'Đình công đòi tăng lương, tranh chấp hợp đồng lao động, vấn đề bảo hiểm xã hội — phản ánh mâu thuẫn giai cấp trong nền kinh tế thị trường.',
    leninLink:
      'Mâu thuẫn giữa người lao động (giai cấp vô sản) và chủ tư bản vẫn tồn tại — Nhà nước can thiệp qua Bộ luật Lao động.',
    color: 'red',
  },
  {
    id: 'land',
    icon: 'Map',
    title: 'Tranh chấp đất đai',
    category: 'conflict',
    shortDesc: 'Xung đột về quyền sử dụng đất và lợi ích kinh tế',
    detail:
      'Tranh chấp đất nông nghiệp, giải phóng mặt bằng cho dự án, tranh chấp thừa kế — xung đột về tài sản vẫn là nguồn mâu thuẫn lớn trong xã hội.',
    leninLink:
      'Tương tự mâu thuẫn giữa nông dân và địa chủ trong câu chuyện Đại Việt — nhưng trong bối cảnh hiện đại.',
    color: 'yellow',
  },
  {
    id: 'law',
    icon: 'Scale',
    title: 'Pháp luật',
    category: 'institution',
    shortDesc: 'Công cụ điều chỉnh hành vi xã hội của Nhà nước',
    detail:
      'Bộ luật Lao động, Luật Đất đai, Bộ luật Dân sự — Nhà nước dùng pháp luật để điều chỉnh mâu thuẫn lợi ích giữa các nhóm xã hội.',
    leninLink:
      'Pháp luật là biểu hiện ý chí của giai cấp thống trị được nâng lên thành luật — Engels.',
    color: 'blue',
  },
  {
    id: 'court',
    icon: 'Building2',
    title: 'Tòa án',
    category: 'institution',
    shortDesc: 'Thiết chế giải quyết tranh chấp của Nhà nước',
    detail:
      'Tòa án Nhân dân Việt Nam xét xử tranh chấp lao động, dân sự, hình sự — là cơ chế chính thức để giải quyết mâu thuẫn xã hội.',
    leninLink:
      'Tòa án là thiết chế Nhà nước xuất hiện trực tiếp từ nhu cầu giải quyết mâu thuẫn giai cấp.',
    color: 'purple',
  },
  {
    id: 'police',
    icon: 'Shield',
    title: 'Công an',
    category: 'institution',
    shortDesc: 'Lực lượng bảo đảm trật tự xã hội của Nhà nước',
    detail:
      'Công an Nhân dân Việt Nam duy trì an ninh, trật tự, bảo vệ tài sản công dân — là "đội quân đặc biệt" mà Lenin đề cập.',
    leninLink:
      'Lenin: Nhà nước cần "đội quân đặc biệt" để thực thi quyền lực — đây chính là lực lượng công an, quân đội.',
    color: 'green',
  },
  {
    id: 'state-vn',
    icon: 'Flag',
    title: 'Nhà nước Việt Nam',
    category: 'institution',
    shortDesc: 'Bộ máy tổ chức chính trị tối cao quản lý xã hội',
    detail:
      'Nhà nước CHXHCN Việt Nam quản lý kinh tế, xã hội, an ninh quốc phòng — là minh chứng sống của lý luận Lenin về nguồn gốc và vai trò của Nhà nước.',
    leninLink:
      'Nhà nước hiện đại vẫn thực hiện chức năng quản lý mâu thuẫn giai cấp — chứng minh tính đúng đắn của lý luận Lenin.',
    color: 'gold',
  },
];

// ─── QUIZ DATA ───────────────────────────────────────────────────────────────

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
      'Mâu thuẫn giai cấp là sự đối lập về lợi ích cơ bản giữa các giai cấp trong xã hội. Ví dụ: địa chủ muốn tối đa hóa tô thuế, nông dân muốn giữ đất và sống được. Lợi ích này đối kháng nhau về bản chất.',
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
      'Quan tri huyện đại diện cho Nhà nước phong kiến — thực thi luật pháp do giai cấp thống trị (địa chủ, quý tộc) tạo ra. Quyết định xét xử thường có lợi cho giai cấp thống trị, thể hiện bản chất giai cấp của Nhà nước.',
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
      'Toàn bộ hành trình từ câu chuyện Đại Việt, timeline lý luận, đến các ví dụ thực tiễn đều hướng đến một kết luận: Nhà nước không xuất hiện ngẫu nhiên — nó là sản phẩm tất yếu khi mâu thuẫn giai cấp trở nên không thể tự điều hòa.',
  },
];

// ─── PRESENTER DATA ──────────────────────────────────────────────────────────

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
      'Kết nối lý thuyết với ví dụ lịch sử Việt Nam',
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
      'Kết nối câu chuyện với lý luận của Lenin',
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
      'Phân tích 3 lựa chọn và hệ quả',
      'Thực hiện State ON/OFF Simulation',
      'Kết nối kết quả tương tác với lý luận Lenin',
    ],
    timeEstimate: '5–7 phút',
  },
  {
    id: 'phat',
    name: 'Phát',
    section: 'Liên hệ thực tiễn',
    role: 'Phân tích thực tiễn',
    talkingPoints: [
      'Trình bày 6 ví dụ thực tiễn Việt Nam hiện đại',
      'Phân tích mâu thuẫn lao động và đất đai',
      'Kết nối các thiết chế Nhà nước với lý luận Lenin',
      'Chứng minh tính thời sự của nhận định Lenin',
    ],
    timeEstimate: '4–5 phút',
  },
  {
    id: 'quy',
    name: 'Quý',
    section: 'Quiz & Kết luận',
    role: 'Tổng kết & Hỏi đáp',
    talkingPoints: [
      'Tổ chức Quiz 5 câu hỏi với khán giả',
      'Tổng kết hành trình của bài trình bày',
      'Nhấn mạnh kết luận cuối cùng về Nhà nước',
      'Mời câu hỏi và thảo luận từ giảng viên',
    ],
    timeEstimate: '5–6 phút',
  },
];
