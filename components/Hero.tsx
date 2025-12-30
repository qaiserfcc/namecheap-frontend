/**
 * Hero Component
 * Eye-catching hero section with gradient background and CTA
 */

import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage?: string;
}

export default function Hero({
  title,
  subtitle,
  ctaText = 'Get Started',
  ctaLink = '/products',
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
}: HeroProps) {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-32"
      style={{
        background: backgroundImage
          ? `linear-gradient(rgba(0, 102, 204, 0.85), rgba(139, 92, 246, 0.85)), url(${backgroundImage})`
          : 'var(--gradient-primary)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            {title}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-10 opacity-95 leading-relaxed">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={ctaLink}
              className="btn bg-white text-[var(--primary-blue)] hover:bg-gray-100 hover:text-[var(--primary-blue)] px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {ctaText}
            </Link>
            {secondaryCtaText && secondaryCtaLink && (
              <Link
                href={secondaryCtaLink}
                className="btn border-2 border-white text-white bg-transparent hover:bg-white hover:text-[var(--primary-blue)] px-8 py-4 text-lg font-semibold transition-all duration-300"
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
