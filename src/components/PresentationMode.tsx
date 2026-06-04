import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mic, Clock, MessageSquare, Layers } from 'lucide-react';
import { presenterData } from '../data/content';

const ACCENT_MAP: Record<string, { border: string; bg: string; text: string; dot: string }> = {
  long:  { border: 'border-amber-400/35',  bg: 'bg-amber-400/8',  text: 'text-amber-300',  dot: 'bg-amber-400' },
  duy:   { border: 'border-blue-400/35',   bg: 'bg-blue-400/8',   text: 'text-blue-300',   dot: 'bg-blue-400' },
  son:   { border: 'border-green-400/35',  bg: 'bg-green-400/8',  text: 'text-green-300',  dot: 'bg-green-400' },
  sang:  { border: 'border-violet-400/35', bg: 'bg-violet-400/8', text: 'text-violet-300', dot: 'bg-violet-400' },
  phat:  { border: 'border-red-400/35',    bg: 'bg-red-400/8',    text: 'text-red-300',    dot: 'bg-red-400' },
  quy:   { border: 'border-teal-400/35',   bg: 'bg-teal-400/8',   text: 'text-teal-300',   dot: 'bg-teal-400' },
};

function PresenterCard({ presenter, index }: { presenter: typeof presenterData[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const c = ACCENT_MAP[presenter.id] ?? ACCENT_MAP.long;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`glass rounded-2xl border ${c.border} p-5 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]`}
    >
      {/* Avatar */}
      <div className={`w-14 h-14 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center mb-4 text-2xl font-black ${c.text}`}>
        {presenter.name[0]}
      </div>

      {/* Name & section */}
      <h3 className={`text-base font-bold ${c.text} mb-0.5`}>{presenter.name}</h3>
      <p className="text-slate-400 text-xs mb-3">{presenter.role}</p>

      {/* Section badge */}
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${c.bg} border ${c.border} text-xs font-medium ${c.text} mb-4`}>
        <Layers size={10} />
        {presenter.section}
      </div>

      {/* Talking points */}
      <div className="space-y-1.5 mb-4">
        {presenter.talkingPoints.map((point, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-1.5 shrink-0`} />
            <p className="text-slate-400 text-xs leading-relaxed">{point}</p>
          </div>
        ))}
      </div>

      {/* Time estimate */}
      <div className="flex items-center gap-1.5 text-slate-500 text-xs border-t border-white/5 pt-3">
        <Clock size={11} />
        <span>{presenter.timeEstimate}</span>
      </div>
    </motion.div>
  );
}

export default function PresentationModeSection() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section id="presenters" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#080d1a] via-slate-900 to-[#080d1a] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-400/10 border border-slate-400/25 text-slate-300 text-xs font-medium mb-6">
            <Mic size={12} />
            Nhóm trình bày
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 mb-4">
            Thành viên{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Nhóm
            </span>
          </h2>
          <div className="section-divider" />
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            6 thành viên — 6 phần trình bày — 1 thông điệp trung tâm.
          </p>

          {/* Info bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {[
              { icon: Mic,          label: '6 người trình bày' },
              { icon: Clock,        label: '≈ 25–30 phút' },
              { icon: MessageSquare, label: 'MLN111 — FPT University' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-full border border-white/8 text-xs text-slate-400">
                <Icon size={11} className="text-amber-400" />
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Presenter grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {presenterData.map((p, i) => (
            <PresenterCard key={p.id} presenter={p} index={i} />
          ))}
        </div>

        {/* Flow diagram */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 glass rounded-2xl border border-white/8 p-6"
        >
          <p className="text-slate-400 text-xs uppercase tracking-wider text-center mb-5">Thứ tự trình bày</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {presenterData.map((p, i) => {
              const c = ACCENT_MAP[p.id];
              return (
                <div key={p.id} className="flex items-center gap-2">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${c.bg} border ${c.border}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
                    <span className={`text-xs font-medium ${c.text}`}>{p.name}</span>
                  </div>
                  {i < presenterData.length - 1 && (
                    <span className="text-slate-600 text-xs">→</span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
