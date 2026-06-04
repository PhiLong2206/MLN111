import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ChevronDown, Users, BookOpen, Zap, Quote } from 'lucide-react';

function GoldParticles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 4 + 2,
    dur: Math.random() * 12 + 10,
    delay: Math.random() * 8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-400"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: 0.2,
          }}
          animate={{
            y: [0, -80, 0],
            x: [0, 20, -10, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function CitadelSilhouette() {
  const battlements = [
    0, 80, 160, 240, 320, 400, 480, 560, 640, 720, 800, 880, 960,
    1040, 1120, 1200, 1280, 1360,
  ];

  return (
    <svg
      viewBox="0 0 1440 320"
      className="absolute bottom-0 left-0 right-0 w-full opacity-[0.12]"
      preserveAspectRatio="xMidYMax slice"
    >
      <rect x="0" y="200" width="1440" height="120" fill="#F59E0B" />

      {battlements.map((x) => (
        <rect key={x} x={x} y="172" width="48" height="28" fill="#F59E0B" />
      ))}

      <rect x="660" y="80" width="120" height="150" fill="#F59E0B" />
      <ellipse cx="720" cy="80" rx="60" ry="30" fill="#F59E0B" />

      <rect x="690" y="110" width="60" height="120" fill="#020617" />
      <ellipse cx="720" cy="110" rx="30" ry="20" fill="#020617" />

      <rect x="300" y="100" width="80" height="130" fill="#F59E0B" />
      <polygon points="300,100 340,60 380,100" fill="#F59E0B" />

      <rect x="1060" y="100" width="80" height="130" fill="#F59E0B" />
      <polygon points="1060,100 1100,60 1140,100" fill="#F59E0B" />

      <rect x="100" y="140" width="60" height="90" fill="#F59E0B" />
      <polygon points="100,140 130,110 160,140" fill="#F59E0B" />

      <rect x="1280" y="140" width="60" height="90" fill="#F59E0B" />
      <polygon points="1280,140 1310,110 1340,140" fill="#F59E0B" />
    </svg>
  );
}

const stats = [
  {
    icon: Users,
    value: '6',
    label: 'thành viên nhóm',
  },
  {
    icon: BookOpen,
    value: '7',
    label: 'phần trình bày',
  },
  {
    icon: Zap,
    value: '3',
    label: 'hoạt động tương tác',
  },
  {
    icon: Quote,
    value: '1',
    label: 'nhận định trung tâm',
  },
];

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const bg = el.querySelector<HTMLElement>('.parallax-bg');
      if (!bg) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;

      bg.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #020617 0%, #0a0f1e 60%, #0F172A 100%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_70%_60%,rgba(239,68,68,0.06),transparent)]" />
      </div>

      <div className="parallax-bg absolute inset-0 transition-transform duration-100 ease-out pointer-events-none">
        <GoldParticles />
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(2,6,23,0.8) 0%, transparent 100%)',
        }}
      />

      <CitadelSilhouette />

      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} className="mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-400 text-xs font-medium tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Người trình bày: Long
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-4"
          style={{
            background:
              'linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          ĐẠI VIỆT KÝ SỰ
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Nhà nước và những mâu thuẫn giai cấp không thể điều hòa
        </motion.p>

        <motion.div variants={fadeUp} className="relative mb-10 mx-auto max-w-3xl">
          <div className="rounded-2xl p-6 sm:p-8 border border-amber-400/20 bg-white/5 backdrop-blur-md shadow-2xl">
            <div className="absolute -top-3 -left-3 text-amber-400 opacity-40">
              <Quote size={40} />
            </div>

            <p className="text-slate-100 text-base sm:text-lg italic leading-relaxed font-light">
              "Nhà nước là sản phẩm và biểu hiện của những mâu thuẫn giai cấp{' '}
              <span className="text-amber-400 font-semibold not-italic">
                không thể điều hòa được
              </span>
              ."
            </p>

            <p className="text-amber-400/70 text-sm mt-3 font-medium tracking-wide">
              — V. I. Lenin
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-16"
        >
          <motion.button
            onClick={() => scrollTo('theory')}
            whileHover={{
              scale: 1.04,
              boxShadow: '0 0 32px rgba(245,158,11,0.5)',
            }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 bg-amber-400 text-slate-900 font-bold rounded-xl text-sm tracking-wide transition-all duration-200 shadow-lg"
          >
            Bắt đầu hành trình
          </motion.button>

          <motion.button
            onClick={() => scrollTo('story')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 bg-transparent border border-amber-400/40 text-amber-400 font-medium rounded-xl text-sm tracking-wide hover:bg-amber-400/10 transition-all duration-200"
          >
            Câu chuyện Đại Việt
          </motion.button>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.2 + index * 0.1,
                }}
                className="rounded-xl p-4 border border-white/5 bg-white/5 backdrop-blur-md hover:border-amber-400/20 transition-all duration-300 group"
              >
                <Icon
                  size={18}
                  className="text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform"
                />

                <div className="text-2xl font-black text-amber-400">
                  {item.value}
                </div>

                <div className="text-slate-400 text-xs mt-0.5 leading-tight">
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <ChevronDown className="text-amber-400/50" size={28} />
      </motion.div>
    </section>
  );
}