import { Brain } from 'lucide-react';

export default function PlannerHero() {
  return (
    <section className="pt-32 pb-10 lg:pt-40 lg:pb-14 border-b border-gold/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(160,120,48,0.15)', border: '1px solid rgba(160,120,48,0.3)' }}
          >
            <Brain className="w-4 h-4 text-gold" />
          </div>
          <span className="label-gold">AI Project Planner</span>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-ivory font-light leading-tight mb-4">
          Plan your project with <span className="italic text-gold">AI guidance</span>
        </h1>
        <p className="text-warmgray text-base max-w-2xl leading-relaxed">
          Answer a few questions and get a professional project brief with tech stack recommendations, timeline, and
          cost estimate — powered by 14 years of Crescentek expertise.
        </p>
      </div>
    </section>
  );
}
