import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  CloudRain, Home, FileText, Scale,
  ChevronRight, ChevronLeft, BookOpen
} from 'lucide-react';
import { characterData, storyScenes } from '../data/content';

const SCENE_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  CloudRain, Home, FileText, Scale,
};

const COLOR_MAP: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  blue:   { bg: 'bg-blue-400/10',   border: 'border-blue-400/30',   text: 'text-blue-300',   badge: 'bg-blue-400/20 text-blue-300' },
  yellow: { bg: 'bg-amber-400/10',  border: 'border-amber-400/30',  text: 'text-amber-300',  badge: 'bg-amber-400/20 text-amber-300' },
  red:    { bg: 'bg-red-400/10',    border: 'border-red-400/30',    text: 'text-red-300',    badge: 'bg-red-400/20 text-red-300' },
};

function CharacterCard({ char, index }: { char: typeof characterData[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const c = COLOR_MAP[char.color] ?? COLOR_MAP.blue;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`glass rounded-2xl p-5 border ${c.border} transition-all duration-300 hover:shadow-[0_8px_32px_rgba(245,158,11,0.12)] cursor-default`}
    >
      {/* Avatar */}
      <div className={`w-16 h-16 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center text-3xl mb-4 mx-auto`}>
        {char.emoji}
      </div>

      {/* Name & role */}
      <h3 className={`text-base font-bold text-center ${c.text} mb-1`}>{char.name}</h3>
      <p className="text-slate-400 text-xs text-center mb-3">{char.role}</p>

      {/* Position badge */}
      <div className={`inline-flex items-center justify-center w-full px-2 py-1 rounded-lg ${c.badge} text-xs font-medium mb-3`}>
        {char.position}
      </div>

      {/* Class interest */}
      <div className="rounded-lg bg-slate-800/50 px-3 py-2 border border-white/5">
        <p className="text-slate-400 text-xs text-center leading-relaxed">
          <span className="text-slate-300 font-medium">Lợi ích: </span>{char.classInterest}
        </p>
      </div>
    </motion.div>
  );
}

function SceneCard({ scene, isActive }: { scene: typeof storyScenes[0]; isActive: boolean }) {
  const Icon = SCENE_ICONS[scene.icon] ?? FileText;
  return (
    <motion.div
      key={scene.id}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className={`glass rounded-2xl p-6 sm:p-8 border transition-all duration-300 ${
        isActive ? 'border-amber-400/40 shadow-[0_0_30px_rgba(245,158,11,0.15)]' : 'border-white/8'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0">
          <Icon size={22} className="text-amber-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-amber-400/60 text-xs font-medium tracking-widest uppercase">
              Cảnh {scene.scene}
            </span>
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-slate-100 mb-3">{scene.title}</h4>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">{scene.description}</p>

          {/* Theory note */}
          <div className="rounded-xl bg-amber-400/8 border border-amber-400/20 px-4 py-3">
            <p className="text-amber-300/80 text-xs font-medium leading-relaxed">
              <span className="text-amber-400">🔍 Lý luận: </span>{scene.theoryNote}
            </p>
          </div>

          {/* Characters involved */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {scene.characterIds.map(cid => {
              const ch = characterData.find(c => c.id === cid);
              if (!ch) return null;
              const color = COLOR_MAP[ch.color];
              return (
                <span key={cid} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${color.badge} text-xs`}>
                  {ch.emoji} {ch.name}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DaiVietStory() {
  const [activeScene, setActiveScene] = useState(0);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const prev = () => setActiveScene(s => Math.max(0, s - 1));
  const next = () => setActiveScene(s => Math.min(storyScenes.length - 1, s + 1));

  return (
    <section id="story" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#080d1a] via-slate-900 to-[#080d1a] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_30%_60%,rgba(239,68,68,0.04),transparent)] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-400/10 border border-red-400/25 text-red-300 text-xs font-medium mb-6">
            <BookOpen size={12} />
            Người trình bày: Sơn
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-100 mb-4">
            Câu chuyện{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Đại Việt
            </span>
          </h2>
          <div className="section-divider" />
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Một câu chuyện lịch sử minh họa mâu thuẫn giai cấp và vai trò của Nhà nước trong xã hội phong kiến Việt Nam.
          </p>
        </motion.div>

        {/* Characters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
          {characterData.map((char, i) => (
            <CharacterCard key={char.id} char={char} index={i} />
          ))}
        </div>

        {/* Scene progress dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {storyScenes.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveScene(i)}
              className={`transition-all duration-300 rounded-full ${
                i === activeScene
                  ? 'w-8 h-2.5 bg-amber-400'
                  : 'w-2.5 h-2.5 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Active scene */}
        <div className="mb-6">
          <AnimatePresence mode="wait">
            <SceneCard
              key={storyScenes[activeScene].id}
              scene={storyScenes[activeScene]}
              isActive
            />
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between">
          <motion.button
            onClick={prev}
            disabled={activeScene === 0}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl border border-white/10 text-slate-400 hover:text-slate-100 hover:border-amber-400/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium"
          >
            <ChevronLeft size={16} /> Cảnh trước
          </motion.button>

          <span className="text-slate-500 text-sm">
            {activeScene + 1} / {storyScenes.length}
          </span>

          <motion.button
            onClick={next}
            disabled={activeScene === storyScenes.length - 1}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-2.5 glass rounded-xl border border-white/10 text-slate-400 hover:text-slate-100 hover:border-amber-400/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 text-sm font-medium"
          >
            Cảnh tiếp <ChevronRight size={16} />
          </motion.button>
        </div>

        {/* Story conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 rounded-2xl bg-gradient-to-r from-red-500/10 via-amber-400/10 to-red-500/10 border border-amber-400/25 p-6 sm:p-8 text-center"
        >
          <p className="text-slate-100 text-base sm:text-lg font-medium leading-relaxed max-w-3xl mx-auto">
            <span className="text-amber-400 font-bold">Kết luận câu chuyện: </span>
            Dù quan tri huyện xét xử thế nào, mâu thuẫn căn bản giữa nông dân và địa chủ{' '}
            <span className="text-red-400">không thể tự điều hòa</span>.
            Chính điều đó chứng minh tại sao Nhà nước phải tồn tại.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
