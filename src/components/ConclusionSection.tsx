import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { RotateCcw, ArrowUp, CheckCircle } from 'lucide-react';

// Gold particles for conclusion
function GoldParticlesBg() {
  const pts = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 3 + 1.5,
    dur: Math.random() * 10 + 12,
    delay: Math.random() * 6,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pts.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-400"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, opacity: 0.15 }}
          animate={{ y: [0, -60, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

const keyLearnings = [
  'Mâu thuẫn giai cấp xuất hiện tất yếu khi có tư hữu và phân hóa xã hội.',
  'Mâu thuẫn giai cấp không thể tự điều hòa — đây là tiền đề trực tiếp của Nhà nước.',
  'Nhà nước không trung lập: nó đại diện cho lợi ích của giai cấp thống trị.',
  'Câu chuyện Đại Việt và thực tiễn Việt Nam hiện đại đều minh họa lý luận Lenin.',
  'Lenin đúng: Nhà nước là sản phẩm và biểu hiện của mâu thuẫn giai cấp không thể điều hòa.',
];

export default function ConclusionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Small delay then reset page (reload keeps SPA state clean)
    setTimeout(() => window.location.reload(), 600);
  };

  return (
    <section id="conclusion" className="relative min-h-screen flex items-center py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245,158,11,0.08) 0%, rgba(2,6,23,1) 70%)' }}
      />
      <div className="absolute inset-0 bg-[#020617]/60 pointer-events-none" />
      <GoldParticlesBg />

      {/* Cinematic grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(0deg, #F59E0B 1px, transparent 1px), linear-gradient(90deg, #F59E0B 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

      <div ref={ref} className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">

        {/* Presenter badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 text-xs font-medium mb-10"
        >
          Người trình bày: Quý — Kết luận
        </motion.div>

        {/* Main quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="mb-12"
        >
          <div className="relative inline-block">
            {/* Decorative quote marks */}
            <span className="absolute -top-6 -left-4 text-6xl text-amber-400/20 font-serif leading-none select-none">"</span>
            <span className="absolute -bottom-10 -right-4 text-6xl text-amber-400/20 font-serif leading-none select-none">"</span>

            <h2
              className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight max-w-3xl mx-auto"
              style={{
                background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp không thể điều hòa được.
            </h2>
          </div>
          <p className="text-amber-400/60 text-sm mt-6 font-medium tracking-wide">— V. I. Lenin, Nhà nước và Cách mạng (1917)</p>
        </motion.div>

        {/* Summary paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-12"
        >
          Thông qua câu chuyện Đại Việt, các mô phỏng tương tác và các ví dụ thực tiễn, chúng ta đã hiểu rằng{' '}
          <span className="text-amber-400 font-semibold">Nhà nước không xuất hiện ngẫu nhiên</span>.
          Nhà nước là kết quả tất yếu của sự phát triển xã hội khi những mâu thuẫn giai cấp trở nên{' '}
          <span className="text-red-400 font-semibold">không thể tự điều hòa</span>.
        </motion.p>

        {/* Key learnings */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="glass rounded-2xl border border-amber-400/20 p-6 sm:p-8 mb-10 text-left max-w-2xl mx-auto"
        >
          <p className="text-amber-400 text-sm font-bold uppercase tracking-wider mb-5 text-center">
            5 điều cần nhớ
          </p>
          <div className="space-y-3">
            {keyLearnings.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle size={14} className="text-amber-400 mt-0.5 shrink-0" />
                <p className="text-slate-300 text-sm leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={handleRestart}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-8 py-3.5 glass border border-white/15 text-slate-300 font-medium rounded-xl text-sm hover:border-amber-400/30 hover:text-amber-400 transition-all duration-200"
          >
            <RotateCcw size={14} /> Làm lại trải nghiệm
          </motion.button>
          <motion.button
            onClick={() => scrollTo('hero')}
            whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(245,158,11,0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-400 text-slate-900 font-bold rounded-xl text-sm transition-all duration-200 shadow-lg"
          >
            <ArrowUp size={14} /> Quay về đầu trang
          </motion.button>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-14 text-slate-600 text-xs"
        >
          MLN111 — Triết học Mác-Lênin · FPT University · {new Date().getFullYear()}
        </motion.p>
      </div>
    </section>
  );
}
