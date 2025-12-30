/**
 * StatsSection Component
 * Displays key platform statistics
 */

interface Stat {
  label: string;
  value: string;
  icon?: string;
}

interface StatsSectionProps {
  stats: Stat[];
  title?: string;
  subtitle?: string;
}

export default function StatsSection({ stats, title, subtitle }: StatsSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--secondary-purple)] text-white">
      <div className="container">
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>}
            {subtitle && <p className="text-lg md:text-xl opacity-90">{subtitle}</p>}
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center transform hover:scale-105 transition-transform duration-300"
            >
              {stat.icon && (
                <div className="text-4xl mb-3 opacity-80">{stat.icon}</div>
              )}
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm md:text-base opacity-90 uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
