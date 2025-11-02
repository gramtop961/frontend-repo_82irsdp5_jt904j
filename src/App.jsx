import { useEffect, useState } from 'react';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Showcase from './components/Showcase.jsx';
import WaitlistCTA from './components/WaitlistCTA.jsx';
import { Mail } from 'lucide-react';

function App() {
  const [waitlistCount, setWaitlistCount] = useState(8542);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitlistCount((c) => c + Math.floor(1 + Math.random() * 3));
    }, 4000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

  const handleJoinClick = () => {
    const el = document.getElementById('join');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = (data) => {
    // In a full app, send to backend. For now, simulate success.
    setSubmitted(true);
    setTimeout(() => {
      // optional: show invite friends popup in future iteration
    }, 200);
  };

  return (
    <div className="h-full w-full bg-[#050814] text-white">
      {/* Sticky top nav */}
      <header className="fixed inset-x-0 top-0 z-50 mx-auto mt-3 flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-black/30 px-4 py-2 backdrop-blur">
        <a href="#home" className="text-lg font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Sqill</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-blue-100/90 md:flex">
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#who" className="hover:text-white">Who it's for</a>
          <a href="#join" className="hover:text-white">Join</a>
        </nav>
        <button onClick={handleJoinClick} className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10">
          Join Waitlist
        </button>
      </header>

      {/* Scroll container */}
      <main className="snap-y snap-mandatory">
        <Hero onJoinClick={handleJoinClick} waitlistCount={waitlistCount} />
        <About />
        <Showcase />
        <WaitlistCTA onSubmit={handleSubmit} submitted={submitted} />
      </main>

      {/* Sticky floating Join button (mobile & desktop) */}
      {!submitted && (
        <button
          onClick={handleJoinClick}
          className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-3 font-semibold text-white shadow-lg ring-1 ring-white/10 hover:scale-[1.02]"
        >
          <Mail className="h-5 w-5" />
          Join Waitlist
        </button>
      )}

      {/* Footer */}
      <footer className="relative mt-16 border-t border-white/10 bg-transparent py-10 text-sm text-blue-100/80">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <div className="">© {new Date().getFullYear()} Sqill. The future of creative hiring launches soon.</div>
          <div className="flex items-center gap-6">
            <a href="#how" className="hover:text-white">About</a>
            <a href="#join" className="hover:text-white">Contact</a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">X</a>
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
