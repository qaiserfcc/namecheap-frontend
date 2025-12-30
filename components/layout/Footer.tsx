import Link from 'next/link'

export default function Footer() {
  const footerLinks = {
    shop: [
      { label: 'All Products', href: '/products' },
      { label: 'Seasonal Harvest', href: '/products?filter=seasonal' },
      { label: 'Pantry Staples', href: '/products?filter=pantry' },
      { label: 'Wellness', href: '/products?filter=wellness' },
    ],
    company: [
      { label: 'Our Farms', href: '/about' },
      { label: 'Sourcing', href: '/about?sourcing=true' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
    support: [
      { label: 'Help Center', href: '/help' },
      { label: 'Shipping & Delivery', href: '/shipping' },
      { label: 'Returns & Exchanges', href: '/returns' },
      { label: 'FAQ', href: '/faq' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  }

  const socialLinks = [
    { name: 'Instagram', icon: '📸', href: '#' },
    { name: 'Pinterest', icon: '📌', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' },
    { name: 'YouTube', icon: '▶️', href: '#' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-forest)] via-[var(--primary-leaf)] to-[var(--primary-mint)] rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform">
                🌱
              </div>
              <div>
                <span className="text-2xl font-bold text-white block">Verdant Market</span>
                <span className="text-xs uppercase tracking-[0.2em] text-gray-400">Organic Living</span>
              </div>
            </Link>
            <p className="text-sm mb-6 text-gray-400">
              Harvest-fresh produce, clean pantry staples, and eco-friendly essentials sourced directly from regenerative farms.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-[var(--primary-leaf)] rounded-lg flex items-center justify-center text-white font-semibold transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-semibold text-white text-lg mb-4 capitalize">{section}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-semibold text-white text-xl mb-3">
              Join the Harvest Letter
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Weekly recipes, farm stories, and early access to limited seasonal drops.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-[var(--primary-leaf)] focus:outline-none text-white"
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

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Verdant Market. Grown with care.</p>
          <div className="flex gap-6">
            <span>🌿 Regenerative farms</span>
            <span>🚚 Free delivery over $50</span>
            <span>↩️ 14-day easy returns</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
