import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Namecheap Store
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link href="/products" className="hover:text-primary-600">
              Products
            </Link>
            <Link href="/cart" className="hover:text-primary-600">
              Cart
            </Link>
            <Link href="/orders" className="hover:text-primary-600">
              Orders
            </Link>
            <Link href="/admin" className="hover:text-primary-600">
              Admin
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/auth/login" className="hover:text-primary-600">
              Login
            </Link>
            <Link 
              href="/auth/register" 
              className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
