import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { RotateCcw, Zap } from 'lucide-react';
import { decisionOptions } from '../data/content';

const COLOR_STYLES = {
  blue:   {
    btn:    'border-blue-400/40 text-blue-300 hover:bg-blue-400/15 hover:border-blue-400/60',
    active: 'border-blue-400 bg-blue-400/20 text-blue-200',
    card:   'border-blue-400/30 bg-blue-400/8',
    badge:  'bg-blue-400/20 text-blue-300',
  },
  red:    {
    btn:    'border-red-400/40 text-red-300 hover:bg-red-400/15 hover:border-red-400/60',
    active: 'border-red-400 bg-red-400/20 text-red-200',
    card:   'border-red-400/30 bg-red-400/8',
    badge:  'bg-red-400/20 text-red-300',
  },
  yellow: {
    btn:    'border-amber-400/40 text-amber-300 hover:bg-amber-400/15 hover:border-amber-400/60',
    active: 'border-amber-400 bg-amber-400/20 text-amber-200',
    card:   'border-amber-400/30 bg-amber-400/8',
    badge:  'bg-amber-400/20 text-amber-300',
  },
};

export default function DecisionSimulator() {
  const [selected, setSelected] = useState<string | null>(null);
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  const selectedOption = decisionOptions.find(o => o.id === selected);

  return (
    <div className="relative">
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-400/10 border border-violet-400/25 text-violet-300 text-xs font-medium mb-4">
          <Zap size={12} />
          Phần 1: Decision Simulator
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-2">
          Bạn là Quan tri huyện
        </h3>
        <p className="text-slate-400 text-base leading-relaxed max-w-xl mx-auto">
          <span className="text-amber-400 font-semibold">Nếu bạn là quan tri huyện</span>, khi nông dân và địa chủ tranh chấp ruộng đất trước mặt bạn, bạn sẽ xử lý thế nào?
        </p>
      </motion.div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {decisionOptions.map((opt, i) => {
          const colors = COLOR_STYLES[opt.color];
          const isActive = selected === opt.id;
          return (
            <motion.button
              key={opt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(opt.id)}
              className={`glass rounded-2xl p-5 border text-left transition-all duration-300 ${
                isActive ? colors.active : colors.btn
              }`}
            >
              <div className={`inline-block px-2 py-0.5 rounded-md ${colors.badge} text-xs font-bold mb-3`}>
                {opt.id === 'protect-farmer' ? 'A' : opt.id === 'protect-landlord' ? 'B' : 'C'}
              </div>
              <p className="text-sm font-semibold leading-snug">{opt.label}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Consequence */}
      <AnimatePresence mode="wait">
        {selectedOption && (
          <motion.div
            key={selectedOption.id}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.5 }}
            className={`rounded-2xl border p-5 sm:p-6 mb-6 ${COLOR_STYLES[selectedOption.color].card}`}
          >
            <h4 className="text-slate-100 font-bold mb-2 text-sm">📋 Hệ quả:</h4>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">{selectedOption.consequence}</p>

            <div className="rounded-xl bg-amber-400/8 border border-amber-400/20 px-4 py-3">
              <p className="text-amber-300 text-xs leading-relaxed">
                <span className="font-bold text-amber-400">🔗 Liên hệ Lenin: </span>
                {selectedOption.theoryLink}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main conclusion — always show after selection */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl bg-gradient-to-r from-amber-400/12 to-red-400/8 border border-amber-400/30 p-5 sm:p-6"
          >
            <p className="text-slate-100 text-sm sm:text-base leading-relaxed text-center font-medium">
              <span className="text-amber-400 font-bold">Kết luận chung: </span>
              Dù lựa chọn nào — mâu thuẫn lợi ích giữa nông dân và địa chủ{' '}
              <span className="text-red-400 font-semibold">vẫn tồn tại</span>.
              Điều này chứng minh: mâu thuẫn giai cấp không thể tự điều hòa, và đó là lý do Lenin nói Nhà nước phải xuất hiện.
            </p>

            <motion.button
              onClick={() => setSelected(null)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="mt-4 flex items-center gap-2 mx-auto text-xs text-slate-400 hover:text-amber-400 transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
            >
              <RotateCcw size={12} /> Thử lại
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
