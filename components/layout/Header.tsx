import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary-500 via-mint-400 to-apricot-400 shadow-sm" />
          <Link href="/" className="text-xl font-semibold text-ink-900">
            Namecheap Store
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-ink-700">
          <Link href="/products" className="hover:text-primary-600 transition-colors">Products</Link>
          <Link href="/cart" className="hover:text-primary-600 transition-colors">Cart</Link>
          <Link href="/wishlist" className="hover:text-primary-600 transition-colors">Wishlist</Link>
          <Link href="/orders" className="hover:text-primary-600 transition-colors">Orders</Link>
          <Link href="/admin" className="hover:text-primary-600 transition-colors">Admin</Link>
        </div>

        <div className="flex items-center space-x-3 text-sm">
          <Link href="/auth/login" className="px-3 py-2 rounded-lg text-ink-700 hover:bg-slate-100 transition">
            Login
          </Link>
          <Link 
            href="/auth/register"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary-500 to-sky-500 text-white shadow-sm hover:shadow-md transition"
          >
            Create account
          </Link>
        </div>
      </nav>
    </header>
  )
}
