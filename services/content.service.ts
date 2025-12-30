/**
 * Content Service
 * Fetches dynamic content from backend API
 */

import apiClient from '@/lib/api';

export interface HomepageContent {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    backgroundImage?: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
  featuredProducts: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    badge?: string;
  }[];
}

export interface AboutContent {
  title: string;
  subtitle: string;
  mission: string;
  vision: string;
  values: {
    title: string;
    description: string;
    icon: string;
  }[];
  team?: {
    name: string;
    role: string;
    image: string;
    bio: string;
  }[];
}

export interface FeatureContent {
  title: string;
  description: string;
  icon: string;
  benefits: string[];
}

export interface TestimonialContent {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface BannerContent {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  link?: string;
  linkText?: string;
  active: boolean;
}

class ContentService {
  /**
   * Get homepage content
   */
  async getHomepage(): Promise<HomepageContent> {
    try {
      const response = await apiClient.get<HomepageContent>('/content/homepage');
      return response.data;
    } catch (error) {
      console.error('Error fetching homepage content:', error);
      // Return default content as fallback
      return this.getDefaultHomepage();
    }
  }

  /**
   * Get about page content
   */
  async getAbout(): Promise<AboutContent> {
    try {
      const response = await apiClient.get<AboutContent>('/content/about');
      return response.data;
    } catch (error) {
      console.error('Error fetching about content:', error);
      return this.getDefaultAbout();
    }
  }

  /**
   * Get features content
   */
  async getFeatures(): Promise<FeatureContent[]> {
    try {
      const response = await apiClient.get<FeatureContent[]>('/content/features');
      return response.data;
    } catch (error) {
      console.error('Error fetching features:', error);
      return this.getDefaultFeatures();
    }
  }

  /**
   * Get testimonials
   */
  async getTestimonials(): Promise<TestimonialContent[]> {
    try {
      const response = await apiClient.get<TestimonialContent[]>('/content/testimonials');
      return response.data;
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return this.getDefaultTestimonials();
    }
  }

  /**
   * Get FAQs
   */
  async getFAQs(): Promise<FAQItem[]> {
    try {
      const response = await apiClient.get<FAQItem[]>('/content/faq');
      return response.data;
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      return this.getDefaultFAQs();
    }
  }

  /**
   * Get active banners
   */
  async getBanners(): Promise<BannerContent[]> {
    try {
      const response = await apiClient.get<BannerContent[]>('/content/banners');
      return response.data.filter(banner => banner.active);
    } catch (error) {
      console.error('Error fetching banners:', error);
      return [];
    }
  }

  // Default fallback content
  private getDefaultHomepage(): HomepageContent {
    return {
      hero: {
        title: 'Welcome to NameCheap Marketplace',
        subtitle: 'Discover amazing products at unbeatable prices',
        ctaText: 'Shop Now',
        ctaLink: '/products',
      },
      stats: [
        { label: 'Products', value: '10,000+' },
        { label: 'Customers', value: '50,000+' },
        { label: 'Orders', value: '100,000+' },
        { label: 'Satisfaction', value: '99%' },
      ],
      featuredProducts: [],
    };
  }

  private getDefaultAbout(): AboutContent {
    return {
      title: 'About NameCheap',
      subtitle: 'Your trusted e-commerce partner',
      mission: 'To provide high-quality products at affordable prices with exceptional customer service.',
      vision: 'To become the most customer-centric online marketplace.',
      values: [
        {
          title: 'Quality',
          description: 'We never compromise on product quality',
          icon: '⭐',
        },
        {
          title: 'Affordability',
          description: 'Best prices guaranteed on all products',
          icon: '💰',
        },
        {
          title: 'Customer First',
          description: 'Your satisfaction is our top priority',
          icon: '❤️',
        },
      ],
    };
  }

  private getDefaultFeatures(): FeatureContent[] {
    return [
      {
        title: 'Fast Shipping',
        description: 'Get your orders delivered quickly',
        icon: '🚀',
        benefits: ['Free shipping on orders over $50', '2-day delivery available', 'Track your order in real-time'],
      },
      {
        title: 'Secure Payments',
        description: 'Shop with confidence',
        icon: '🔒',
        benefits: ['SSL encryption', 'Multiple payment options', 'Buyer protection'],
      },
      {
        title: '24/7 Support',
        description: 'We\'re here to help',
        icon: '💬',
        benefits: ['Live chat support', 'Email assistance', 'Comprehensive help center'],
      },
    ];
  }

  private getDefaultTestimonials(): TestimonialContent[] {
    return [
      {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Verified Buyer',
        company: 'Home Essentials',
        content: 'Amazing products and fast delivery! Highly recommended.',
        rating: 5,
      },
      {
        id: 2,
        name: 'Mike Chen',
        role: 'Regular Customer',
        company: 'Tech Enthusiast',
        content: 'Best prices I\'ve found online. Customer service is top-notch!',
        rating: 5,
      },
    ];
  }

  private getDefaultFAQs(): FAQItem[] {
    return [
      {
        question: 'How long does shipping take?',
        answer: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery.',
        category: 'Shipping',
      },
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy on most items. Items must be unused and in original packaging.',
        category: 'Returns',
      },
      {
        question: 'Do you offer international shipping?',
        answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.',
        category: 'Shipping',
      },
    ];
  }
}

export default new ContentService();
