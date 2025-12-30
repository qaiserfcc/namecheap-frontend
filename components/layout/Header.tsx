'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Shop' },
    { href: '/orders', label: 'Orders' },
    { href: '/admin', label: 'Admin' },
  ]

  const linkClass = (href: string) =>
    `text-sm font-semibold tracking-tight transition hover:text-[var(--primary-leaf)] ${
      pathname === href ? 'text-[var(--primary-leaf)]' : 'text-gray-700'
    }`

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-lg backdrop-blur-sm' : 'bg-white/90 backdrop-blur'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-18 py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--primary-forest)] via-[var(--primary-leaf)] to-[var(--primary-mint)] text-white font-bold text-xl flex items-center justify-center shadow-md">
              🌿
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-bold text-gray-900">Verdant Market</span>
              <span className="text-xs uppercase tracking-[0.18em] text-gray-500">Organic Goods</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/cart"
              className="relative p-2 rounded-lg text-gray-700 hover:text-[var(--primary-leaf)] hover:bg-gray-100 transition"
            >
              <span className="sr-only">Cart</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </Link>

            <Link
              href="/auth/login"
              className="hidden md:inline-flex items-center rounded-xl bg-gradient-to-r from-[var(--primary-forest)] to-[var(--primary-leaf)] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5"
            >
              Sign In
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Toggle navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                  {link.label}
                </Link>
              ))}
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[var(--primary-forest)] to-[var(--primary-leaf)] px-4 py-2 text-sm font-semibold text-white shadow-md"
              >
                Sign In
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
