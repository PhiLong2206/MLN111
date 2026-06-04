import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Users, Coins, TrendingUp, Swords, AlertTriangle, Building2,
  Lightbulb, BookOpen
} from 'lucide-react';
import { timelineData } from '../data/content';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Users, Coins, TrendingUp, Swords, AlertTriangle, Building2,
};

function TimelineCard({ step, index }: { step: typeof timelineData[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;
  const Icon = ICON_MAP[step.icon] ?? Lightbulb;
  const isLast = index === timelineData.length - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: 'easeOut', delay: index * 0.1 }}
      className={`flex items-center gap-4 sm:gap-8 ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'} flex-row`}
    >
      {/* Card */}
      <div className={`flex-1 ${isLeft ? 'sm:text-right' : 'sm:text-left'} text-left`}>
        <div
          className={`glass rounded-2xl p-5 border transition-all duration-300 group cursor-default hover:border-amber-400/30 ${
            isLast
              ? 'border-amber-400/40 shadow-[0_0_30px_rgba(245,158,11,0.2)]'
              : 'border-white/8 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)]'
          }`}
        >
          {/* Step badge */}
          <div className={`flex items-center gap-2 mb-3 ${isLeft ? 'sm:justify-end' : 'sm:justify-start'} justify-start`}>
            <span className="text-xs text-amber-400/60 font-medium tracking-widest uppercase">Bước {step.step}</span>
          </div>

          <h3 className="text-lg font-bold text-slate-100 mb-1 group-hover:text-amber-400 transition-colors">
            {step.title}
          </h3>
          <p className="text-amber-400/60 text-xs italic mb-3">{step.subtitle}</p>
          <p className="text-slate-300 text-sm leading-relaxed mb-3">{step.description}</p>

          {/* Example */}
          <div className="rounded-lg bg-slate-800/60 px-3 py-2 border border-white/5">
            <span className="text-amber-400/70 text-xs font-medium">Ví dụ: </span>
            <span className="text-slate-400 text-xs">{step.example}</span>
          </div>

          {/* Key message */}
          {isLast ? (
            <div className="mt-3 rounded-lg bg-amber-400/10 border border-amber-400/30 px-3 py-2">
              <p className="text-amber-300 text-xs font-medium leading-relaxed">{step.keyMessage}</p>
            </div>
          ) : (
            <div className="mt-3 flex items-start gap-1.5">
              <Lightbulb size={12} className="text-amber-400/60 mt-0.5 shrink-0" />
              <p className="text-slate-400 text-xs italic">{step.keyMessage}</p>
            </div>
          )}
        </div>
      </div>

      {/* Center icon */}
      <div className="relative flex-shrink-0">
        <motion.div
          animate={inView ? { scale: [0.8, 1.1, 1], rotate: [0, 10, 0] } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          className={`w-12 h-12 rounded-full flex items-center justify-center z-10 relative transition-all duration-300 ${
            isLast
              ? 'bg-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.6)]'
              : 'bg-slate-800 border-2 border-amber-400/40 group-hover:border-amber-400/70'
          }`}
        >
          <Icon
            size={20}
            className={isLast ? 'text-slate-900' : 'text-amber-400'}
          />
        </motion.div>

        {/* Step number */}
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-slate-700 border border-amber-400/40 flex items-center justify-center">
          <span className="text-amber-400 text-[9px] font-bold">{step.step}</span>
        </div>
      </div>

      {/* Empty space for alternating layout */}
      <div className="flex-1 hidden sm:block" />
    </motion.div>
  );
}

export default function TheoryTimeline() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="theory" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#080d1a] to-slate-900 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(245,158,11,0.04),transparent)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 text-xs font-medium mb-6">
            <BookOpen size={12} />
            Người trình bày: Duy
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 mb-4">
            Cơ sở lý luận{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Lenin
            </span>
          </h2>
          <div className="section-divider" />
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Vì sao mâu thuẫn giai cấp tất yếu dẫn đến sự ra đời của Nhà nước?
            Hãy theo dõi 6 bước tiến hóa xã hội.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px sm:-translate-x-px">
            <motion.div
              className="timeline-line w-full h-full"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </div>

          <div className="relative flex flex-col gap-10">
            {timelineData.map((step, i) => (
              <TimelineCard key={step.id} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* Key takeaway box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 rounded-2xl bg-gradient-to-r from-amber-400/10 via-amber-400/15 to-amber-400/10 border border-amber-400/30 p-6 sm:p-8 text-center shadow-[0_0_40px_rgba(245,158,11,0.15)]"
        >
          <div className="text-amber-400 text-2xl mb-3">💡</div>
          <p className="text-slate-100 text-base sm:text-lg font-medium leading-relaxed max-w-3xl mx-auto">
            <span className="text-amber-400 font-bold">Kết luận lý luận: </span>
            Mâu thuẫn giai cấp là điều kiện cần và đủ để Nhà nước xuất hiện.
            Không có mâu thuẫn giai cấp → không có Nhà nước.
            Khi mâu thuẫn không thể tự điều hòa → Nhà nước tất yếu ra đời.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
