import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Bot, BookOpen, FileText, CheckCircle } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────
type TabId = 'cam-ket' | 'nhat-ky' | 'tai-lieu';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

// ─── Static data ─────────────────────────────────────────────────────────────
const TABS: Tab[] = [
  { id: 'cam-ket',  label: 'Cam kết',              icon: ShieldCheck },
  { id: 'nhat-ky',  label: 'Nhật ký AI',           icon: Bot },
  { id: 'tai-lieu', label: 'Tài liệu tham khảo',   icon: BookOpen },
];

const CAM_KET_ITEMS = [
  'Nhóm sử dụng AI như một công cụ hỗ trợ học tập và sáng tạo.',
  'AI không thay thế vai trò tư duy, kiểm chứng và chỉnh sửa của sinh viên.',
  'Nội dung cuối cùng được nhóm đối chiếu với giáo trình và điều chỉnh cho phù hợp với yêu cầu môn học.',
  'Nhóm chịu trách nhiệm về toàn bộ sản phẩm cuối cùng.',
];

interface AILogCard {
  tool: string;
  toolColor: string;
  purpose: string;
  aiResult: string;
  studentEdit: string;
}

const AI_LOG_CARDS: AILogCard[] = [
  {
    tool: 'ChatGPT / Gemini',
    toolColor: 'text-emerald-400',
    purpose:
      'Brainstorm ý tưởng, xây dựng flow thuyết trình, hỗ trợ diễn đạt nội dung.',
    aiResult:
      'Gợi ý cấu trúc video, website tương tác và cách liên hệ nhận định Lenin.',
    studentEdit:
      'Nhóm chọn lọc nội dung, sửa lại theo giáo trình MLN111 và yêu cầu của cô.',
  },
  {
    tool: 'Kiro',
    toolColor: 'text-amber-400',
    purpose:
      'Hỗ trợ tạo website thuyết trình bằng React, TypeScript, Tailwind CSS.',
    aiResult:
      'Sinh mã nguồn giao diện, component, animation và quiz tương tác.',
    studentEdit:
      'Nhóm kiểm tra giao diện, sửa lỗi runtime, điều chỉnh nội dung và phân chia phần thuyết trình.',
  },
  {
    tool: 'AI Image / Video Generator',
    toolColor: 'text-violet-400',
    purpose:
      'Hỗ trợ tạo hình ảnh, bối cảnh hoặc video minh họa.',
    aiResult:
      'Tạo chất liệu hình ảnh/video phục vụ câu chuyện Đại Việt.',
    studentEdit:
      'Nhóm biên tập lại nội dung, đảm bảo phù hợp với chủ đề và không làm sai lệch kiến thức.',
  },
];

const REFERENCES = [
  'Giáo trình Triết học Mác - Lênin.',
  'Nội dung Chương III về Nhà nước.',
  'Tác phẩm "Nhà nước và Cách mạng" của V. I. Lenin.',
  'Câu chuyện mô phỏng Đại Việt được xây dựng dựa trên lý luận về mâu thuẫn giai cấp trong xã hội phong kiến.',
];

// ─── Tab: Cam kết ─────────────────────────────────────────────────────────────
function TabCamKet() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="space-y-4"
    >
      {/* Intro blurb */}
      <p className="text-slate-400 text-sm leading-relaxed mb-6">
        Nhóm cam kết sử dụng AI một cách{' '}
        <span className="text-amber-400 font-semibold">minh bạch</span>,{' '}
        <span className="text-amber-400 font-semibold">có trách nhiệm</span> và{' '}
        <span className="text-amber-400 font-semibold">liêm chính học thuật</span>.
      </p>

      {/* Commitment items */}
      {CAM_KET_ITEMS.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="flex items-start gap-3 glass rounded-xl p-4 border border-amber-400/15 hover:border-amber-400/30 transition-colors duration-200"
        >
          <CheckCircle
            size={16}
            className="text-amber-400 mt-0.5 shrink-0"
          />
          <p className="text-slate-200 text-sm leading-relaxed">{item}</p>
        </motion.div>
      ))}

      {/* Signature badge */}
      <div className="mt-6 rounded-xl bg-amber-400/8 border border-amber-400/20 px-5 py-3 flex items-center gap-3">
        <ShieldCheck size={18} className="text-amber-400 shrink-0" />
        <p className="text-amber-300 text-xs font-medium leading-relaxed">
          Cam kết này được đưa ra bởi toàn bộ nhóm — MLN111, FPT University.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Tab: Nhật ký AI ──────────────────────────────────────────────────────────
function TabNhatKyAI() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
    >
      {/* Column headers (desktop) */}
      <div className="hidden sm:grid grid-cols-3 gap-4 mb-3 px-1">
        {['Mục đích', 'Kết quả AI', 'Sinh viên chỉnh sửa'].map(col => (
          <p key={col} className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {col}
          </p>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-5">
        {AI_LOG_CARDS.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="glass rounded-2xl border border-white/8 overflow-hidden hover:border-amber-400/20 transition-colors duration-200"
          >
            {/* Tool badge row */}
            <div className="flex items-center gap-2 px-4 pt-4 pb-2 border-b border-white/5">
              <Bot size={14} className="text-slate-400" />
              <span className={`text-xs font-bold ${card.toolColor}`}>{card.tool}</span>
            </div>

            {/* Three-column body */}
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
              {/* Mục đích */}
              <div className="p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 sm:hidden">
                  Mục đích
                </p>
                <p className="text-slate-300 text-xs leading-relaxed">{card.purpose}</p>
              </div>

              {/* Kết quả AI */}
              <div className="p-4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 sm:hidden">
                  Kết quả AI
                </p>
                <p className="text-slate-300 text-xs leading-relaxed">{card.aiResult}</p>
              </div>

              {/* Sinh viên chỉnh sửa */}
              <div className="p-4 bg-amber-400/4">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 sm:hidden">
                  Sinh viên chỉnh sửa
                </p>
                <p className="text-amber-200/80 text-xs leading-relaxed">{card.studentEdit}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Tab: Tài liệu tham khảo ─────────────────────────────────────────────────
function TabTaiLieu() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35 }}
      className="space-y-3"
    >
      <p className="text-slate-400 text-sm leading-relaxed mb-6">
        Toàn bộ nội dung lý luận được đối chiếu với các tài liệu học thuật chính thức.
      </p>

      {REFERENCES.map((ref, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="flex items-start gap-3 glass rounded-xl p-4 border border-white/8 hover:border-blue-400/25 transition-colors duration-200"
        >
          <FileText size={14} className="text-blue-400 mt-0.5 shrink-0" />
          <p className="text-slate-200 text-sm leading-relaxed">[{i + 1}] {ref}</p>
        </motion.div>
      ))}

      {/* Note */}
      <div className="mt-6 rounded-xl bg-blue-400/8 border border-blue-400/20 px-5 py-3 flex items-start gap-3">
        <BookOpen size={15} className="text-blue-400 mt-0.5 shrink-0" />
        <p className="text-blue-200/80 text-xs leading-relaxed">
          Toàn bộ nội dung lý luận trong website được đối chiếu với giáo trình và tác phẩm
          gốc của Lenin, trình bày theo hướng phân tích học thuật, không sao chép từ AI.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AITransparencySection() {
  const [activeTab, setActiveTab] = useState<TabId>('cam-ket');
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="ai-transparency"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#080d1a] via-slate-900 to-[#080d1a] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,rgba(245,158,11,0.04),transparent)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 text-xs font-medium mb-6">
            <ShieldCheck size={12} />
            Phụ lục học thuật
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-slate-100 mb-3">
            Phụ Lục Học Thuật &amp;{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Minh Bạch AI
            </span>
          </h2>

          {/* Divider */}
          <div className="section-divider mb-5" />

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Ứng dụng AI có trách nhiệm · Minh bạch · Sáng tạo · Liêm chính học thuật
          </p>
        </motion.div>

        {/* ── Main card ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass rounded-3xl border border-amber-400/20 overflow-hidden shadow-[0_0_60px_rgba(245,158,11,0.08)]"
        >
          {/* Tab bar */}
          <div className="flex border-b border-white/8 bg-slate-900/50">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-semibold transition-all duration-200 border-b-2 ${
                    isActive
                      ? 'border-amber-400 text-amber-400 bg-amber-400/8'
                      : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/4'
                  }`}
                >
                  <Icon size={13} />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {/* Mobile: show only icon on tiny screens */}
                  <span className="sm:hidden">
                    {tab.id === 'cam-ket' ? 'Cam kết' : tab.id === 'nhat-ky' ? 'Nhật ký' : 'Tài liệu'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <div className="p-5 sm:p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'cam-ket'  && <TabCamKet  key="cam-ket" />}
              {activeTab === 'nhat-ky'  && <TabNhatKyAI key="nhat-ky" />}
              {activeTab === 'tai-lieu' && <TabTaiLieu  key="tai-lieu" />}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Bottom note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-slate-600 text-xs mt-6 leading-relaxed max-w-2xl mx-auto"
        >
          Phụ lục này được thêm vào nhằm minh bạch hóa quá trình sử dụng AI và thể hiện
          trách nhiệm học thuật của nhóm.
        </motion.p>
      </div>
    </section>
  );
}
