import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Rocket } from 'lucide-react';

function Confetti({ run }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!run) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);
    const colors = ['#60a5fa', '#22d3ee', '#93c5fd', '#67e8f9'];
    const pieces = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * w,
      y: -20 - Math.random() * h,
      r: 2 + Math.random() * 3,
      c: colors[Math.floor(Math.random() * colors.length)],
      v: 2 + Math.random() * 3,
      a: Math.random() * Math.PI,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      pieces.forEach((p) => {
        p.y += p.v;
        p.x += Math.sin(p.a);
        p.a += 0.02;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    setTimeout(() => cancelAnimationFrame(raf), 2000);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [run]);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />;
}

export default function WaitlistCTA({ onSubmit, submitted }) {
  const [form, setForm] = useState({ name: '', email: '', profession: '' });
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(Boolean(form.name && form.email && form.profession && /.+@.+\..+/.test(form.email)));
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valid) return;
    onSubmit(form);
  };

  return (
    <section id="join" className="relative w-full bg-[#070e22] py-24 text-white snap-start">
      <div className="absolute inset-0 bg-[radial-gradient(90%_90%_at_20%_10%,rgba(3,105,161,0.35),transparent),radial-gradient(90%_90%_at_80%_20%,rgba(59,130,246,0.25),transparent)]" />
      <div className="pointer-events-none absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-cyan-400/30 blur-[1px]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: 'floatSpark 6s ease-in-out infinite',
              animationDelay: `${Math.random() * 6}s`,
            }}
          />
        ))}
      </div>

      <style>{`@keyframes floatSpark{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center ring-1 ring-white/10 backdrop-blur-md">
          <h3 className="text-3xl font-bold">Join the Waitlist</h3>
          <p className="mt-2 text-blue-100/90">Be part of the platform redefining creative hiring.</p>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 grid grid-cols-1 gap-4 text-left md:grid-cols-2">
            <div>
              <label className="text-sm text-blue-100">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#0a132e] px-4 py-3 text-white outline-none ring-1 ring-white/10 placeholder:text-blue-200/50 focus:ring-cyan-400"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="text-sm text-blue-100">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#0a132e] px-4 py-3 text-white outline-none ring-1 ring-white/10 placeholder:text-blue-200/50 focus:ring-cyan-400"
                placeholder="name@domain.com"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-blue-100">Profession</label>
              <select
                value={form.profession}
                onChange={(e) => setForm({ ...form, profession: e.target.value })}
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#0a132e] px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-cyan-400"
                required
              >
                <option value="" disabled>
                  Select one
                </option>
                <option>Editor</option>
                <option>Designer</option>
                <option>Influencer</option>
                <option>Filmmaker</option>
                <option>Social Media Strategist</option>
                <option>Other</option>
              </select>
            </div>

            <div className="md:col-span-2 mt-2 flex items-center justify-center">
              <button
                type="submit"
                disabled={!valid || submitted}
                className={`group relative inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white ring-1 ring-white/10 transition ${submitted ? 'bg-green-500/90' : 'bg-gradient-to-r from-blue-500 to-cyan-400 shadow-lg shadow-cyan-500/30 hover:scale-[1.02]'}`}
              >
                {submitted ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Welcome to the movement. You’re on the list.</span>
                  </>
                ) : (
                  <>
                    <Rocket className="h-5 w-5" />
                    <span>🔥 Join the Waitlist</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Confetti run={submitted} />
    </section>
  );
}
