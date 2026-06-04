/**
 * App.tsx — ĐẠI VIỆT KÝ SỰ
 * MLN111 Interactive Presentation — FPT University
 *
 * Replaces PowerPoint for a group of 6 presenters.
 * Demonstrates Lenin's statement:
 * "The State is a Product and Manifestation of the Irreconcilability of Class Antagonisms."
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Layout
import Navigation from './components/Navigation';

// Sections
import HeroSection       from './components/HeroSection';
import TheoryTimeline    from './components/TheoryTimeline';
import DaiVietStory      from './components/DaiVietStory';
import InteractiveSection from './components/InteractiveSection';
import RealityConnection from './components/RealityConnection';
import QuizSection       from './components/QuizSection';
import PresentationModeSection from './components/PresentationMode';
import AITransparencySection from './components/AITransparencySection';
import ConclusionSection from './components/ConclusionSection';

// ─── Loading Screen ──────────────────────────────────────────────────────────
function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onDone, 400);
          return 100;
        }
        return p + Math.random() * 18 + 8;
      });
    }, 120);
    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: '#020617' }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(245,158,11,0.08),transparent)] pointer-events-none" />

      {/* Mini citadel SVG */}
      <svg viewBox="0 0 200 80" className="w-40 mb-8 opacity-30">
        <rect x="0" y="40" width="200" height="40" fill="#F59E0B" />
        {[0,20,40,60,80,100,120,140,160,180].map(x => (
          <rect key={x} x={x+2} y="32" width="12" height="8" fill="#F59E0B" />
        ))}
        <rect x="85" y="10" width="30" height="40" fill="#F59E0B" />
        <ellipse cx="100" cy="10" rx="15" ry="8" fill="#F59E0B" />
        <rect x="92" y="18" width="16" height="32" fill="#020617" />
        <ellipse cx="100" cy="18" rx="8" ry="6" fill="#020617" />
      </svg>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-black tracking-widest mb-2"
        style={{
          background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        ĐẠI VIỆT KÝ SỰ
      </motion.h1>
      <p className="text-slate-500 text-xs tracking-wider mb-10">MLN111 · FPT University</p>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-amber-400 rounded-full"
          style={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.15 }}
        />
      </div>
      <p className="text-slate-600 text-xs mt-3">{Math.min(Math.round(progress), 100)}%</p>
    </motion.div>
  );
}

// ─── Back-to-top button ──────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-amber-400/90 text-slate-900 flex items-center justify-center shadow-lg hover:bg-amber-400 transition-all"
          title="Về đầu trang"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Loading screen */}
      <AnimatePresence>
        {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Main website */}
      {loaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Sticky navigation */}
          <Navigation />

          {/* Main content */}
          <main>
            {/* 1 — Hero Introduction (Presenter: Long) */}
            <HeroSection />

            {/* 2 — Lenin Theory Timeline (Presenter: Duy) */}
            <TheoryTimeline />

            {/* 3 — Đại Việt Story (Presenter: Sơn) */}
            <DaiVietStory />

            {/* 4 — Interactive Experience (Presenter: Sang) */}
            <InteractiveSection />

            {/* 5 — Reality Connection (Presenter: Phát) */}
            <RealityConnection />

            {/* 6 — Quiz (Presenter: Quý) */}
            <QuizSection />

            {/* 7 — Presentation / Team Section */}
            <PresentationModeSection />

            {/* 8 — AI Transparency & Academic Integrity */}
            <AITransparencySection />

            {/* 9 — Final Conclusion (Presenter: Quý) */}
            <ConclusionSection />
          </main>

          {/* Back to top */}
          <BackToTop />
        </motion.div>
      )}
    </>
  );
}
