'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import { contentService } from '@/services/content.service';
import { productService } from '@/services/product.service';
import { Product } from '@/types/product';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<any>(null);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadContent() {
      try {
        const [homeData, testimonialsData, products] = await Promise.all([
          contentService.getHomepage(),
          contentService.getTestimonials(),
          productService.getFeaturedProducts(8)
        ]);
        setContent(homeData);
        setTestimonials(testimonialsData);
        setFeaturedProducts(products);
      } catch (error) {
        console.error('Failed to load content:', error);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  const categories = [
    {
      title: 'Fresh Harvest',
      description: 'Organic fruits & vegetables picked in-season.',
      icon: '🥬',
      href: '/products?category=produce',
      gradient: 'from-emerald-500 to-lime-500',
    },
    {
      title: 'Pantry Staples',
      description: 'Clean grains, pulses, oils, and baking essentials.',
      icon: '🥖',
      href: '/products?category=pantry',
      gradient: 'from-amber-500 to-orange-400',
    },
    {
      title: 'Wellness',
      description: 'Adaptogens, herbal teas, and daily supplements.',
      icon: '🍵',
      href: '/products?category=wellness',
      gradient: 'from-teal-500 to-cyan-400',
    },
    {
      title: 'Bundles',
      description: 'Chef-curated boxes for weekly cooking and gifting.',
      icon: '🎁',
      href: '/products?category=bundles',
      gradient: 'from-rose-400 to-amber-400',
    },
  ];

  const features = [
    {
      title: 'Soil-First Sourcing',
      description: 'Partner farms use regenerative practices for richer soil and better nutrition.',
      icon: '🪴',
    },
    {
      title: 'Plastic-Lite Packaging',
      description: 'Compostable bags and glass jars where possible.',
      icon: '📦',
    },
    {
      title: 'Cold-Chain Delivery',
      description: 'Chilled logistics keep greens crisp and dairy fresh.',
      icon: '❄️',
    },
    {
      title: 'Chef Notes',
      description: 'Cooking tips and pairings with every product detail.',
      icon: '🧑‍🍳',
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <Hero
        title={content?.hero?.title || 'Organic groceries, delivered with care'}
        subtitle={content?.hero?.subtitle || 'Shop regenerative produce, pantry staples, and wellness essentials sourced directly from trusted farms.'}
        ctaText="Shop Seasonal Picks"
        ctaLink="/products"
        secondaryCtaText="See Our Farms"
        secondaryCtaLink="/about"
        backgroundImage="/hero-bg.jpg"
      />

      {/* Stats Section */}
      <StatsSection
        title="Grown with intention"
        subtitle="A marketplace that supports farmers, chefs, and conscious households"
        stats={content?.stats || [
          { label: 'Local Farms', value: '120+' },
          { label: 'Happy Households', value: '85K+' },
          { label: 'Plastic Saved', value: '18T' },
          { label: 'Avg. Repeat Rate', value: '92%' },
        ]}
      />

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3 text-gray-900">Seasonal highlights</h2>
            <p className="text-lg text-gray-600">Fresh picks rotating weekly with chef pairings and bundle discounts.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="btn btn-primary">
              Browse full catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-white/70">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3 text-gray-900">Shop by collection</h2>
            <p className="text-lg text-gray-600">Follow the season or stock up on pantry essentials.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 text-center transition-all hover:shadow-xl hover:-translate-y-1 border border-gray-200"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}
                ></div>
                <div className="relative">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-3 text-gray-900">Why shop with us</h2>
            <p className="text-lg text-gray-600">Sustainable sourcing, thoughtful packaging, and chef-led inspiration.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-xl transition-all hover:shadow-lg bg-white border border-gray-200"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <TestimonialsSection
          title="What Our Customers Say"
          subtitle="Join thousands of satisfied customers"
          testimonials={testimonials}
        />
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 text-center text-white" style={{ background: 'var(--gradient-primary)' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready for your next market day?</h2>
          <p className="text-xl mb-8 opacity-95">Fill your basket with organic essentials and seasonal surprises.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="px-8 py-4 bg-white rounded-xl font-semibold text-[var(--primary-forest)] transition-all hover:shadow-xl hover:-translate-y-1"
            >
              Start shopping
            </Link>
            <Link
              href="/auth/register"
              className="px-8 py-4 border-2 border-white rounded-xl font-semibold text-white transition-all hover:bg-white hover:text-[var(--primary-forest)] hover:-translate-y-1"
            >
              Create account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
