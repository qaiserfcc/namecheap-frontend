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
      title: 'Domains',
      description: 'Register your perfect domain name',
      icon: '🌐',
      href: '/products?category=domains',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Hosting',
      description: 'Reliable hosting solutions',
      icon: '⚡',
      href: '/products?category=hosting',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Security',
      description: 'SSL & privacy protection',
      icon: '🔒',
      href: '/products?category=security',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Email',
      description: 'Professional email services',
      icon: '✉️',
      href: '/products?category=email',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const features = [
    {
      title: '24/7 Support',
      description: 'Expert support whenever you need it',
      icon: '💬',
    },
    {
      title: 'Money-Back Guarantee',
      description: '30-day risk-free trial on all products',
      icon: '💰',
    },
    {
      title: 'Easy Migration',
      description: 'Free website migration assistance',
      icon: '🚀',
    },
    {
      title: 'Free Tools',
      description: 'Access to premium tools and resources',
      icon: '🛠️',
    },
  ];

  return (
    <main>
      {/* Hero Section */}
      <Hero
        title={content?.hero?.title || 'Your Perfect Domain Starts Here'}
        subtitle={content?.hero?.subtitle || 'Find, register, and manage your domain with ease. Join millions of satisfied customers worldwide.'}
        ctaText="Browse Domains"
        ctaLink="/products"
        secondaryCtaText="Learn More"
        secondaryCtaLink="/about"
        backgroundImage="/hero-bg.jpg"
      />

      {/* Stats Section */}
      <StatsSection
        title="Trusted by Millions"
        subtitle="Join the world's leading domain and hosting platform"
        stats={content?.stats || [
          { label: 'Active Domains', value: '2M+' },
          { label: 'Happy Customers', value: '500K+' },
          { label: 'Orders Completed', value: '5M+' },
          { label: 'Satisfaction Rate', value: '99%' },
        ]}
      />

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>Featured Products</h2>
            <p className="text-lg" style={{ color: 'var(--gray-600)' }}>Discover our most popular services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products" className="btn btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4" style={{ backgroundColor: 'var(--gray-100)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>Browse by Category</h2>
            <p className="text-lg" style={{ color: 'var(--gray-600)' }}>Find exactly what you need</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.title}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl bg-white p-8 text-center transition-all hover:shadow-xl hover:-translate-y-1"
                style={{ border: '1px solid var(--gray-200)' }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}
                ></div>
                <div className="relative">
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--gray-900)' }}>
                    {category.title}
                  </h3>
                  <p style={{ color: 'var(--gray-600)' }}>{category.description}</p>
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
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--gray-900)' }}>Why Choose Us</h2>
            <p className="text-lg" style={{ color: 'var(--gray-600)' }}>We make domain management simple and reliable</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-xl transition-all hover:shadow-lg"
                style={{ backgroundColor: 'var(--white)', border: '1px solid var(--gray-200)' }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--gray-900)' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'var(--gray-600)' }}>{feature.description}</p>
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
      <section
        className="py-20 px-4 text-center text-white"
        style={{ background: 'var(--gradient-primary)' }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Find your perfect domain and launch your online presence today
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="px-8 py-4 bg-white rounded-xl font-semibold transition-all hover:shadow-xl hover:-translate-y-1"
              style={{ color: 'var(--primary-blue)' }}
            >
              Browse Products
            </Link>
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-transparent border-2 border-white rounded-xl font-semibold text-white transition-all hover:bg-white hover:-translate-y-1"
              style={{ '--hover-color': 'var(--primary-blue)' } as any}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary-blue)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
