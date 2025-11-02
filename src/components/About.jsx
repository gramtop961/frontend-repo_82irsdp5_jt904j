import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Video, PenTool, Users, Zap, Layers } from 'lucide-react';

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const bullets = [
    'Upload your work. Get noticed instantly.',
    'No degrees. No resumes. Just skill.',
    'Instant hiring — from message to match in minutes.',
  ];

  return (
    <section id="how" className="relative w-full bg-[#050814] py-24 text-white snap-start">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent" />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        {/* Motion illustration */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-900/30 to-cyan-800/20 shadow-2xl">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/30 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-blue-500/30 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/20 backdrop-blur"
          >
            <Video className="h-4 w-4 text-cyan-300" />
            <span className="text-sm text-blue-100">Editing timeline</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="absolute right-6 top-16 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/20 backdrop-blur"
          >
            <PenTool className="h-4 w-4 text-cyan-300" />
            <span className="text-sm text-blue-100">Design layers</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/20 backdrop-blur"
          >
            <Users className="h-4 w-4 text-cyan-300" />
            <span className="text-sm text-blue-100">Brand collaboration</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur"
          >
            <div className="grid h-full w-full place-content-center rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-400/30 text-cyan-200 shadow-inner">
              <Zap className="mx-auto h-10 w-10 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]" />
              <div className="mt-2 text-center text-xs">Instant Match</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/20 backdrop-blur"
          >
            <Layers className="h-4 w-4 text-cyan-300" />
            <span className="text-sm text-blue-100">Project room</span>
          </motion.div>
        </div>

        {/* Copy */}
        <div ref={ref}>
          <h2 className="text-3xl font-bold text-white md:text-4xl">A platform built for the creative generation.</h2>
          <p className="mt-4 max-w-xl text-blue-100/90">
            Sqill simplifies creative hiring by connecting talent directly with startups, brands, and founders — using real projects, not long forms or portfolios hidden in DMs.
          </p>

          <ul className="mt-8 space-y-4">
            {bullets.map((b, i) => (
              <motion.li
                key={b}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 * i, duration: 0.6 }}
                className="flex items-start gap-3"
              >
                <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-[0_0_12px_#22d3ee]" />
                <span className="text-blue-100">{b}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
