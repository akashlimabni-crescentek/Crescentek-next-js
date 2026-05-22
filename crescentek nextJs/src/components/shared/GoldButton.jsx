import Link from '@/components/navigation/AppLink';

export default function GoldButton({ to, children, variant = 'filled', className = '' }) {
  const base = 'inline-block text-sm font-medium tracking-wider transition-all duration-300 px-8 py-3.5';
  const styles = variant === 'filled'
    ? `${base} bg-gold text-surface-dark hover:bg-gold-hover`
    : `${base} border border-gold text-gold hover:bg-gold/10`;

  if (to) {
    return (
      <Link to={to} className={`${styles} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${styles} ${className}`}>
      {children}
    </button>
  );
}