import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Briefcase, Map, Scale, Building2, Shield, Flag,
  ChevronDown, ChevronUp, Globe
} from 'lucide-react';
import { realityCards } from '../data/content';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Briefcase, Map, Scale, Building2, Shield, Flag,
};

const COLOR_MAP: Record<string, { border: string; bg: string; text: string; badge: string; glow: string }> = {
  red:    { border: 'border-red-400/30',    bg: 'bg-red-400/8',    text: 'text-red-300',    badge: 'bg-red-400/20 text-red-300',    glow: 'hover:shadow-[0_4px_24px_rgba(239,68,68,0.2)]' },
  yellow: { border: 'border-amber-400/30',  bg: 'bg-amber-400/8',  text: 'text-amber-300',  badge: 'bg-amber-400/20 text-amber-300',  glow: 'hover:shadow-[0_4px_24px_rgba(245,158,11,0.2)]' },
  blue:   { border: 'border-blue-400/30',   bg: 'bg-blue-400/8',   text: 'text-blue-300',   badge: 'bg-blue-400/20 text-blue-300',   glow: 'hover:shadow-[0_4px_24px_rgba(59,130,246,0.2)]' },
  purple: { border: 'border-purple-400/30', bg: 'bg-purple-400/8', text: 'text-purple-300', badge: 'bg-purple-400/20 text-purple-300', glow: 'hover:shadow-[0_4px_24px_rgba(168,85,247,0.2)]' },
  green:  { border: 'border-green-400/30',  bg: 'bg-green-400/8',  text: 'text-green-300',  badge: 'bg-green-400/20 text-green-300',  glow: 'hover:shadow-[0_4px_24px_rgba(34,197,94,0.2)]' },
  gold:   { border: 'border-amber-400/40',  bg: 'bg-amber-400/12', text: 'text-amber-300',  badge: 'bg-amber-400/25 text-amber-300',  glow: 'hover:shadow-[0_4px_24px_rgba(245,158,11,0.3)]' },
};

function RealityCard({ card, index }: { card: typeof realityCards[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const c = COLOR_MAP[card.color] ?? COLOR_MAP.blue;
  const Icon = ICON_MAP[card.icon] ?? Globe;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`glass rounded-2xl border ${c.border} transition-all duration-300 cursor-pointer ${c.glow} overflow-hidden`}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      onClick={() => setExpanded(e => !e)}
    >
      <div className="p-5">
        {/* Icon + category */}
        <div className="flex items-start justify-between mb-3">
          <div className={`w-11 h-11 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
            <Icon size={20} className={c.text} />
          </div>
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${c.badge}`}>
            {card.category === 'conflict' ? '⚡ Xung đột' : '🏛️ Thiết chế'}
          </span>
        </div>

        {/* Title & short desc */}
        <h3 className={`text-base font-bold mb-1 ${c.text}`}>{card.title}</h3>
        <p className="text-slate-400 text-xs leading-relaxed">{card.shortDesc}</p>

        {/* Expand toggle */}
        <div className={`mt-3 flex items-center gap-1 text-xs font-medium transition-colors ${expanded ? c.text : 'text-slate-500 hover:text-slate-300'}`}>
          {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          {expanded ? 'Thu gọn' : 'Xem chi tiết'}
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className={`px-5 pb-5 pt-0 border-t ${c.border}`}>
              <p className="text-slate-300 text-xs leading-relaxed mt-4 mb-4">{card.detail}</p>
              <div className={`rounded-xl ${c.bg} border ${c.border} px-4 py-3`}>
                <p className="text-xs leading-relaxed">
                  <span className={`font-bold ${c.text}`}>🔗 Lenin: </span>
                  <span className="text-slate-300">{card.leninLink}</span>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function RealityConnection() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section id="reality" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#080d1a] via-slate-900 to-[#080d1a] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_70%_50%,rgba(245,158,11,0.04),transparent)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 text-xs font-medium mb-6">
            <Globe size={12} />
            Người trình bày: Phát
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 mb-4">
            Liên hệ{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Thực tiễn
            </span>
          </h2>
          <div className="section-divider" />
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Lý luận của Lenin vẫn còn sức sống trong xã hội Việt Nam hiện đại.
            Nhấn vào từng thẻ để khám phá.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {realityCards.map((card, i) => (
            <RealityCard key={card.id} card={card} index={i} />
          ))}
        </div>

        {/* Takeaway */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl bg-gradient-to-r from-amber-400/10 via-amber-400/15 to-amber-400/10 border border-amber-400/30 p-6 sm:p-8 text-center"
        >
          <p className="text-slate-100 text-base sm:text-lg font-medium leading-relaxed max-w-3xl mx-auto">
            <span className="text-amber-400 font-bold">Kết luận thực tiễn: </span>
            Những mâu thuẫn lợi ích giữa người lao động và người sử dụng lao động, giữa các nhóm xã hội về đất đai, kinh tế — vẫn tồn tại ngày nay.
            Nhà nước Việt Nam hiện đại tiếp tục đóng vai trò thiết chế điều chỉnh mâu thuẫn này — đúng như Lenin đã dự báo.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
