import { motion, useInView } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { Video, PenTool, Users, Globe, CheckCircle } from 'lucide-react';

function PersonaCard({ icon: Icon, title, subtitle, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.6 }}
      className="group relative h-48 w-72 flex-none cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-5 text-white backdrop-blur-md ring-1 ring-white/10 shadow-xl"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col justify-between">
        <Icon className="h-8 w-8 text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
        <div>
          <div className="text-lg font-semibold">{title}</div>
          <div className="text-sm text-blue-100/90">{subtitle}</div>
        </div>
      </div>
    </motion.div>
  );
}

function Counter({ label, target, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const display = useMemo(() => ({ value: 0 }), []);

  if (inView && display.value !== target) {
    const start = performance.now();
    const duration = 1400;
    const from = 0;
    const to = target;
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      display.value = Math.floor(from + (to - from) * (1 - Math.cos(p * Math.PI)) / 2);
      ref.current && (ref.current.textContent = display.value.toLocaleString());
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  return (
    <div className="text-center">
      <div ref={ref} className="text-3xl font-extrabold text-white" style={{ transitionDelay: `${delay}ms` }}>
        0
      </div>
      <div className="mt-1 text-sm text-blue-100/80">{label}</div>
    </div>
  );
}

export default function Showcase() {
  return (
    <section id="who" className="relative w-full bg-[#060b1b] py-24 text-white snap-start">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6">
        <h3 className="text-3xl font-bold">Who Sqill Is For</h3>
        <p className="mt-2 max-w-2xl text-blue-100/90">Creators, designers, editors, and strategists — if you build, you belong here.</p>

        {/* Horizontal carousel */}
        <div className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2">
          <PersonaCard icon={Video} title="Video Editors & Filmmakers" subtitle="Turn your reels into your résumé." />
          <PersonaCard icon={PenTool} title="Designers & Illustrators" subtitle="Show, don’t tell." delay={0.1} />
          <PersonaCard icon={Users} title="Influencers & Creators" subtitle="Collaborate. Build. Earn." delay={0.2} />
          <PersonaCard icon={Globe} title="Social Media Strategists" subtitle="Your campaigns speak for you." delay={0.3} />
        </div>

        {/* Core features */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              title: 'Portfolio-First Profiles',
              desc: 'Upload real work instead of writing about it.',
            },
            {
              title: 'Instant Hiring Matches',
              desc: 'Sqill connects brands and creators automatically.',
            },
            {
              title: 'Skill-Based Discovery',
              desc: 'Get found for what you’ve built, not where you studied.',
            },
            {
              title: 'Project Rooms',
              desc: 'Collaborate, manage briefs, and deliver — all inside Sqill.',
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10"
            >
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-400" />
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-1 h-5 w-5 text-cyan-300" />
                <div>
                  <div className="text-lg font-semibold">{f.title}</div>
                  <p className="mt-1 text-blue-100/90">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Movement / Social proof */}
        <div className="mt-20 rounded-2xl border border-white/10 bg-gradient-to-br from-blue-950/50 to-[#08112a] p-8 ring-1 ring-white/10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h4 className="text-2xl font-semibold">The creative world is joining Sqill.</h4>
              <p className="mt-2 max-w-md text-blue-100/90">
                From indie founders to global brands — real work, real matches, real momentum.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <Counter label="creatives on the waitlist 🔥" target={8542} />
                <Counter label="brands ready to hire" target={120} />
                <Counter label="countries represented" target={42} />
              </div>
            </div>

            <div className="relative min-h-[260px] overflow-hidden rounded-xl border border-white/10 bg-black/20">
              {/* Simple world map silhouette with glowing dots */}
              <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1695740633675-d060b607f5c4?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjIwNzE5NTh8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
              {[...Array(18)].map((_, i) => (
                <span
                  key={i}
                  className="absolute h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300/90 shadow-[0_0_8px_#22d3ee]"
                  style={{
                    top: `${Math.random() * 90 + 5}%`,
                    left: `${Math.random() * 90 + 5}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
