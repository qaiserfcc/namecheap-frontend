/**
 * Footer Component
 * Site footer with links, social media, and copyright
 */

import Link from 'next/link';

export default function Footer() {
  const footerLinks = {
    shop: [
      { label: 'All Products', href: '/products' },
      { label: 'New Arrivals', href: '/products?filter=new' },
      { label: 'Best Sellers', href: '/products?filter=bestsellers' },
      { label: 'Sale', href: '/products?filter=sale' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'FAQ', href: '/faq' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'F', href: '#' },
    { name: 'Twitter', icon: 'T', href: '#' },
    { name: 'Instagram', icon: 'I', href: '#' },
    { name: 'LinkedIn', icon: 'L', href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary-blue)] to-[var(--secondary-purple)] rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
                N
              </div>
              <span className="text-2xl font-bold text-white">NameCheap</span>
            </Link>
            <p className="text-sm mb-6">
              Your trusted e-commerce partner for quality products at unbeatable prices.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-[var(--primary-blue)] rounded-lg flex items-center justify-center text-white font-semibold transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-white text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-semibold text-white text-xl mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-sm mb-6">
              Get the latest updates on new products and upcoming sales
            </p>
            <form className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-[var(--primary-blue)] focus:outline-none text-white"
              />
              <button
                type="submit"
                className="btn btn-primary px-8 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} NameCheap. All rights reserved.</p>
          <div className="flex gap-6">
            <span>🔒 Secure Payment</span>
            <span>🚚 Free Shipping over $50</span>
            <span>↩️ Easy Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
