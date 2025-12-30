/**
 * TestimonialsSection Component
 * Displays customer testimonials and reviews
 */

'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}

export default function TestimonialsSection({
  testimonials,
  title = 'What Our Customers Say',
  subtitle = 'Trusted by thousands of happy customers',
}: TestimonialsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{title}</h2>
          <p className="text-lg md:text-xl text-gray-600">{subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="glass-card rounded-2xl p-8 md:p-12 shadow-xl mb-8">
            <div className="flex items-center gap-4 mb-6">
              {testimonials[activeIndex].image ? (
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary-blue)] to-[var(--secondary-purple)] flex items-center justify-center text-white text-2xl font-bold">
                  {testimonials[activeIndex].name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {testimonials[activeIndex].name}
                </h3>
                <p className="text-sm text-gray-600">
                  {testimonials[activeIndex].role} at {testimonials[activeIndex].company}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex text-yellow-400 text-2xl mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                  {star <= testimonials[activeIndex].rating ? '★' : '☆'}
                </span>
              ))}
            </div>

            {/* Content */}
            <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
              &quot;{testimonials[activeIndex].content}&quot;
            </blockquote>
          </div>

          {/* Navigation Dots */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-[var(--primary-blue)] w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Thumbnail Grid */}
          {testimonials.length > 3 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  onClick={() => setActiveIndex(index)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    index === activeIndex
                      ? 'border-[var(--primary-blue)] bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-600 truncate">{testimonial.company}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
