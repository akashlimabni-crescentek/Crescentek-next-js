import AppLink from '@/components/navigation/AppLink';
import { ArrowUpRight } from 'lucide-react';

export default function PlannerCTA() {
  return (
    <section className="py-10 border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-warmgray text-sm">Prefer to talk directly with our team?</p>
        <AppLink
          to="/contact"
          className="flex items-center gap-2 text-gold text-sm font-medium hover:text-gold-hover transition-colors"
        >
          Contact us <ArrowUpRight className="w-4 h-4" />
        </AppLink>
      </div>
    </section>
  );
}
