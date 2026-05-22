import RevealSection from '../shared/RevealSection';
import Link from '@/components/navigation/AppLink';

export default function FinalCTA() {
  return (
    <section className="relative py-24 lg:py-40 bg-surface overflow-hidden">
      {/* Giant background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-heading font-light text-center whitespace-nowrap"
          style={{
            fontSize: 'clamp(5rem, 16vw, 16rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(160,120,48,0.07)',
            letterSpacing: '-0.04em',
          }}
        >
          LET'S BUILD
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <RevealSection>
          <span className="label-gold">Ready?</span>

          <h2
            className="mt-6 font-heading font-light"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#1A1710' }}
          >
            Ready to build something
            <br />
            <span className="italic" style={{ color: '#A07830' }}>exceptional?</span>
          </h2>

          <p className="mt-6 text-warmgray max-w-lg mx-auto leading-relaxed">
            Every great project starts with a conversation. Tell us about your vision, and we'll show you what's possible.
          </p>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/contact"
              className="relative group overflow-hidden px-12 py-5 bg-gold text-surface-dark text-sm font-medium tracking-widest hover:bg-gold-hover transition-all duration-300"
            >
              Start a Project
            </Link>
            <Link
              to="/work"
              className="text-gold text-sm tracking-wide hover:text-gold-hover flex items-center gap-2 group"
            >
              <span>See Our Work</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>
        </RevealSection>

        {/* Decorative horizontal rule */}
        <RevealSection delay={200}>
          <div className="mt-20 flex items-center gap-6">
            <div className="flex-1 h-px bg-gold/10" />
            <span className="text-gold/30 text-xs tracking-widest">CRESCENTEK © {new Date().getFullYear()}</span>
            <div className="flex-1 h-px bg-gold/10" />
          </div>
        </RevealSection>
      </div>
    </section>
  );
}