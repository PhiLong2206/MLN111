import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Scale, Building2, Shield, Users,
  Swords, Flame, AlertCircle, X,
  Power
} from 'lucide-react';
import { stateOnItems, stateOffItems } from '../data/content';

const ON_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Scale, Building2, Shield, Users,
};
const OFF_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Swords, Flame, AlertCircle, X,
};

// Side-by-side comparison table
const comparisonPoints = [
  {
    aspect: 'Giải quyết xung đột',
    without: 'Bạo lực, sức mạnh quyết định',
    with:    'Thông qua pháp luật và tòa án',
  },
  {
    aspect: 'Quyền sở hữu',
    without: 'Dễ bị cướp đoạt',
    with:    'Được luật pháp bảo vệ',
  },
  {
    aspect: 'Trật tự xã hội',
    without: 'Hỗn loạn, không có chuẩn mực',
    with:    'Ổn định, có hệ thống quản lý',
  },
  {
    aspect: 'Công lý',
    without: 'Thuộc về kẻ mạnh hơn',
    with:    'Hệ thống tư pháp xét xử',
  },
  {
    aspect: 'An ninh cá nhân',
    without: 'Tự bảo vệ, bất an thường trực',
    with:    'Công an, lực lượng bảo vệ',
  },
];

function StateItemCard({
  item,
  isOn,
  index,
}: {
  item: typeof stateOnItems[0];
  isOn: boolean;
  index: number;
}) {
  const IconMap = isOn ? ON_ICONS : OFF_ICONS;
  const Icon = IconMap[item.icon] ?? Scale;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`glass rounded-xl p-4 border transition-all duration-300 ${
        isOn
          ? 'border-green-400/25 hover:border-green-400/50 hover:shadow-[0_0_16px_rgba(34,197,94,0.15)]'
          : 'border-red-400/25 hover:border-red-400/50 hover:shadow-[0_0_16px_rgba(239,68,68,0.15)]'
      }`}
    >
      <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${
        isOn ? 'bg-green-400/15' : 'bg-red-400/15'
      }`}>
        <Icon size={18} className={isOn ? 'text-green-400' : 'text-red-400'} />
      </div>
      <p className={`text-sm font-semibold mb-1 ${isOn ? 'text-green-300' : 'text-red-300'}`}>
        {isOn ? '✓' : '✗'} {item.label}
      </p>
      <p className="text-slate-400 text-xs leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

export default function StateToggleSimulation() {
  const [stateOn, setStateOn] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-400/10 border border-green-400/25 text-green-300 text-xs font-medium mb-4">
          <Power size={12} />
          Phần 2: State ON/OFF Simulation
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-2">
          Xã hội có và không có Nhà nước
        </h3>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Bật/tắt Nhà nước để thấy sự khác biệt trong quản lý xã hội.
        </p>
      </motion.div>

      {/* Toggle switch */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center justify-center gap-6 mb-10"
      >
        <span className={`text-sm font-bold transition-colors duration-300 ${!stateOn ? 'text-red-400' : 'text-slate-500'}`}>
          NHÀ NƯỚC: TẮT
        </span>

        <button
          onClick={() => setStateOn(s => !s)}
          className={`relative w-20 h-10 rounded-full transition-all duration-500 focus-visible:outline-amber-400 ${
            stateOn
              ? 'bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]'
              : 'bg-red-500/70 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
          }`}
          aria-label={`Nhà nước ${stateOn ? 'BẬT' : 'TẮT'}`}
        >
          <motion.div
            layout
            animate={{ x: stateOn ? 40 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            className="absolute top-1 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center"
          >
            <Power size={14} className={stateOn ? 'text-green-500' : 'text-red-400'} />
          </motion.div>
        </button>

        <span className={`text-sm font-bold transition-colors duration-300 ${stateOn ? 'text-green-400' : 'text-slate-500'}`}>
          NHÀ NƯỚC: BẬT
        </span>
      </motion.div>

      {/* State content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stateOn ? 'on' : 'off'}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
        >
          {/* Status banner */}
          <div className={`rounded-xl px-5 py-3 mb-6 border text-center transition-all duration-500 ${
            stateOn
              ? 'bg-green-400/10 border-green-400/30 text-green-300'
              : 'bg-red-400/10 border-red-400/30 text-red-300'
          }`}>
            <p className="text-sm font-semibold">
              {stateOn
                ? '✅ Xã hội có Nhà nước — Trật tự được duy trì'
                : '⚠️ Xã hội không có Nhà nước — Hỗn loạn và bất ổn'}
            </p>
          </div>

          {/* Items grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {(stateOn ? stateOnItems : stateOffItems).map((item, i) => (
              <StateItemCard key={item.label} item={item} isOn={stateOn} index={i} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Comparison table */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="rounded-2xl overflow-hidden border border-white/8"
      >
        <div className="grid grid-cols-3 bg-slate-800/80">
          <div className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Khía cạnh</div>
          <div className="px-4 py-3 text-xs font-semibold text-red-400 uppercase tracking-wider border-l border-white/5">
            ✗ Không có Nhà nước
          </div>
          <div className="px-4 py-3 text-xs font-semibold text-green-400 uppercase tracking-wider border-l border-white/5">
            ✓ Có Nhà nước
          </div>
        </div>
        {comparisonPoints.map((row, i) => (
          <div key={i} className={`grid grid-cols-3 border-t border-white/5 ${i % 2 === 0 ? 'bg-slate-800/30' : ''}`}>
            <div className="px-4 py-3 text-xs font-medium text-slate-300">{row.aspect}</div>
            <div className="px-4 py-3 text-xs text-red-300/80 border-l border-white/5">{row.without}</div>
            <div className="px-4 py-3 text-xs text-green-300/80 border-l border-white/5">{row.with}</div>
          </div>
        ))}
      </motion.div>

      {/* Conclusion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-8 rounded-2xl bg-gradient-to-r from-green-400/8 via-amber-400/8 to-green-400/8 border border-amber-400/20 p-5 text-center"
      >
        <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          <span className="text-amber-400 font-bold">Kết luận: </span>
          Khi xã hội tồn tại mâu thuẫn không thể tự điều hòa, Nhà nước xuất hiện như một{' '}
          <span className="text-green-400 font-semibold">thiết chế đặc biệt</span>{' '}
          để duy trì trật tự xã hội — đúng như Lenin đã phân tích.
        </p>
      </motion.div>
    </div>
  );
}
