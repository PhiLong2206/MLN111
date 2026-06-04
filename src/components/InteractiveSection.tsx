import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';
import DecisionSimulator from './DecisionSimulator';
import StateToggleSimulation from './StateToggleSimulation';

export default function InteractiveSection() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section id="interactive" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-[#0a0a1a] to-slate-900 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_20%,rgba(139,92,246,0.06),transparent)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">

        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-400/10 border border-violet-400/25 text-violet-300 text-xs font-medium mb-6">
            <Gamepad2 size={12} />
            Người trình bày: Sang
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 mb-4">
            Trải nghiệm{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Tương tác
            </span>
          </h2>
          <div className="section-divider" />
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Tham gia vào câu chuyện để cảm nhận tại sao mâu thuẫn giai cấp không thể tự giải quyết.
          </p>
        </motion.div>

        {/* Decision Simulator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass rounded-3xl p-6 sm:p-10 border border-white/8 mb-10"
        >
          <DecisionSimulator />
        </motion.div>

        {/* State Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="glass rounded-3xl p-6 sm:p-10 border border-white/8"
        >
          <StateToggleSimulation />
        </motion.div>
      </div>
    </section>
  );
}
