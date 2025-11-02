import { useEffect, useMemo, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Camera, Brush, Sparkles, Palette, Rocket } from 'lucide-react';

const FloatingIcon = ({ children, depth = 20, mouseX, mouseY, className = '' }) => {
  const x = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });

  useEffect(() => {
    const unsubX = mouseX.on('change', (val) => x.set(val / depth));
    const unsubY = mouseY.on('change', (val) => y.set(val / depth));
    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY, x, y, depth]);

  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
};

export default function Hero({ onJoinClick, waitlistCount }) {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      mouseX.set(e.clientX - cx);
      mouseY.set(e.clientY - cy);
    };
    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  const gradientId = useMemo(() => `grad-${Math.random().toString(36).slice(2)}`, []);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen w-full overflow-hidden snap-start"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_10%,#0a1024_20%,#0b1466_55%,#0a56d1_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,40,120,0.25)] to-[rgba(0,0,0,0.7)] mix-blend-screen" />

      {/* Parallax floating creative icons */}
      <FloatingIcon mouseX={mouseX} mouseY={mouseY} depth={24} className="absolute left-[10%] top-[25%] text-cyan-300/80">
        <Camera size={42} className="drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]" />
      </FloatingIcon>
      <FloatingIcon mouseX={mouseX} mouseY={mouseY} depth={18} className="absolute right-[15%] top-[30%] text-blue-300/80">
        <Brush size={44} className="drop-shadow-[0_0_12px_rgba(147,197,253,0.6)]" />
      </FloatingIcon>
      <FloatingIcon mouseX={mouseX} mouseY={mouseY} depth={30} className="absolute left-[18%] bottom-[20%] text-cyan-200/80">
        <Palette size={40} className="drop-shadow-[0_0_10px_rgba(103,232,249,0.6)]" />
      </FloatingIcon>
      <FloatingIcon mouseX={mouseX} mouseY={mouseY} depth={12} className="absolute right-[22%] bottom-[18%] text-blue-200/80">
        <Sparkles size={40} className="drop-shadow-[0_0_10px_rgba(191,219,254,0.6)]" />
      </FloatingIcon>

      {/* Center content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        {/* Glowing logo wordmark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mb-8"
        >
          <svg width="180" height="64" viewBox="0 0 600 200" className="mx-auto">
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="6.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <text
              x="50%"
              y="55%"
              textAnchor="middle"
              fontSize="120"
              fontWeight="800"
              fill={`url(#${gradientId})`}
              filter="url(#glow)"
              style={{ letterSpacing: '2px' }}
            >
              Sqill
            </text>
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl"
        >
          Talent Speaks Louder Than Degrees.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mx-auto mt-4 max-w-2xl text-lg text-blue-100/90"
        >
          A new way for creatives to get hired — through skill, not résumés.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onJoinClick}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/30 ring-1 ring-white/10 transition-transform hover:scale-[1.03] focus:outline-none"
          >
            <Rocket className="h-5 w-5" />
            <span>🔥 Join the Waitlist</span>
          </button>
          <a
            href="#how"
            className="inline-flex items-center rounded-full px-6 py-3 font-medium text-blue-100/90 ring-1 ring-white/10 backdrop-blur transition hover:text-white hover:ring-white/20"
          >
            See How It Works ↓
          </a>
        </motion.div>

        {/* Social proof counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-8 rounded-full bg-white/5 px-5 py-2 text-sm text-blue-100 ring-1 ring-white/10 backdrop-blur"
        >
          🔥 {waitlistCount.toLocaleString()} creatives have already joined
        </motion.div>
      </div>
    </section>
  );
}
