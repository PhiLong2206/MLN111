import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, ChevronLeft, Maximize2 } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'hero',            label: 'Giới thiệu' },
  { id: 'theory',          label: 'Lý luận Lenin' },
  { id: 'story',           label: 'Đại Việt' },
  { id: 'interactive',     label: 'Tương tác' },
  { id: 'quiz',            label: 'Quiz' },
  { id: 'ai-transparency', label: 'Minh bạch AI' },
  { id: 'conclusion',      label: 'Kết luận' },
];

export default function Navigation() {
  const [activeId, setActiveId]         = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [presentMode, setPresentMode]   = useState(false);

  // Track scroll progress + active section
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (scrollTop / docH) * 100 : 0);
      setIsScrolled(scrollTop > 40);

      // Determine active section
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveId(NAV_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keyboard navigation for presentation mode
  const currentIdx = NAV_ITEMS.findIndex(n => n.id === activeId);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  }, []);

  const goPrev = useCallback(() => {
    if (currentIdx > 0) scrollToSection(NAV_ITEMS[currentIdx - 1].id);
  }, [currentIdx, scrollToSection]);

  const goNext = useCallback(() => {
    if (currentIdx < NAV_ITEMS.length - 1) scrollToSection(NAV_ITEMS[currentIdx + 1].id);
  }, [currentIdx, scrollToSection]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!presentMode) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { e.preventDefault(); goPrev(); }
      if (e.key === 'Escape') setPresentMode(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [presentMode, goNext, goPrev]);

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-slate-800">
        <motion.div
          className="h-full bg-amber-400"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Nav bar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0.5 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/90 backdrop-blur-md border-b border-white/5 shadow-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="text-amber-400 font-bold text-sm tracking-widest hover:text-amber-300 transition-colors"
          >
            ĐẠI VIỆT KÝ SỰ
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  activeId === item.id
                    ? 'bg-amber-400/15 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Present mode toggle */}
            <button
              onClick={() => setPresentMode(p => !p)}
              title="Chế độ trình chiếu (phím ← →)"
              className={`p-2 rounded-lg text-xs transition-all duration-200 ${
                presentMode
                  ? 'bg-amber-400/20 text-amber-400 glow-gold'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              <Maximize2 size={14} />
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-slate-400 hover:text-slate-100"
              onClick={() => setMobileOpen(o => !o)}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Presentation mode controls */}
        <AnimatePresence>
          {presentMode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-slate-900/95 border-t border-amber-400/20"
            >
              <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
                <button
                  onClick={goPrev}
                  disabled={currentIdx === 0}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-400 hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={14} /> Trước
                </button>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-amber-400 font-medium">
                    {currentIdx + 1} / {NAV_ITEMS.length}
                  </span>
                  <span className="text-xs text-slate-500">
                    {NAV_ITEMS[currentIdx]?.label}
                  </span>
                  <span className="text-xs text-slate-600">← → để điều hướng • Esc để thoát</span>
                </div>
                <button
                  onClick={goNext}
                  disabled={currentIdx === NAV_ITEMS.length - 1}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-400 hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Tiếp <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden bg-slate-900/98 backdrop-blur-md border-t border-white/5"
            >
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-6 py-3 text-sm transition-colors border-b border-white/5 last:border-0 ${
                    activeId === item.id
                      ? 'text-amber-400 bg-amber-400/10'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
