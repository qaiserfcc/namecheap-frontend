import Link from 'next/link'

const highlights = [
  {
    title: 'Fresh arrivals',
    copy: 'Curated picks with bright visuals and quick add-to-cart.',
    href: '/products',
    accent: 'from-primary-500/90 to-sky-500',
  },
  {
    title: 'Wishlist-ready',
    copy: 'Save items, sync across sessions, and get restock nudges.',
    href: '/wishlist',
    accent: 'from-apricot-500 to-amber-400',
  },
  {
    title: 'Secure checkout',
    copy: 'Fast payments with order tracking, receipts, and alerts.',
    href: '/cart',
    accent: 'from-mint-500 to-emerald-400',
  },
]

const featureColumns = [
  {
    label: 'Shop',
    items: ['Smart search & filters', 'Wishlist & reminders', 'Rich product cards'],
  },
  {
    label: 'Account',
    items: ['JWT auth + refresh', 'Sessions & device sync', 'Order history & invoices'],
  },
  {
    label: 'Admin',
    items: ['Catalog & inventory', 'Discount rules', 'Payments & refunds'],
  },
]

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <section className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-20 pt-16 md:px-6 md:pt-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full bg-primary-50 px-4 py-2 text-xs font-semibold text-primary-700 ring-1 ring-primary-100">
              Modern commerce · Light orange · Mint · Sky
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight text-ink-900 md:text-5xl">
                Elegant shopping with delightful colors and crisp navigation.
              </h1>
              <p className="max-w-xl text-lg text-ink-600">
                A pastel-forward e-commerce experience with secure login, sessions, carts, wishlists, and an admin hub—ready for rapid iteration.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="rounded-xl bg-gradient-to-r from-primary-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-primary-200/60 transition hover:shadow-lg hover:-translate-y-0.5"
              >
                Shop the catalog
              </Link>
              <Link
                href="/auth/register"
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-primary-700 ring-1 ring-primary-200 transition hover:bg-primary-50 hover:-translate-y-0.5"
              >
                Create account
              </Link>
              <span className="text-xs text-ink-500">No cards charged in dev · API-backed</span>
            </div>
          </div>

          <div className="glass-card relative overflow-hidden rounded-2xl p-6 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-mint-50 to-white" />
            <div className="relative grid gap-4">
              <div className="flex items-center justify-between rounded-xl bg-white/90 p-4 shadow-sm ring-1 ring-slate-200/80">
                <div>
                  <p className="text-sm text-ink-500">Live status</p>
                  <p className="text-lg font-semibold text-ink-900">Sessions + Carts synced</p>
                </div>
                <span className="rounded-full bg-mint-100 px-3 py-1 text-xs font-semibold text-mint-700">Online</span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm font-semibold text-ink-800">
                {['Login', 'Cart', 'Wishlist'].map((pill) => (
                  <div key={pill} className="rounded-xl bg-white/90 p-3 text-center shadow-sm ring-1 ring-slate-200">
                    {pill}
                  </div>
                ))}
              </div>
              <div className="rounded-2xl bg-gradient-to-r from-apricot-400/90 to-primary-400/90 p-4 text-white shadow-md">
                <p className="text-sm">Admin snapshot</p>
                <p className="text-2xl font-semibold">Catalog + Discounts + Orders</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-5 transition group-hover:opacity-15`} />
              <div className="relative space-y-2">
                <h3 className="text-lg font-semibold text-ink-900">{item.title}</h3>
                <p className="text-sm text-ink-600">{item.copy}</p>
                <span className="inline-flex items-center text-xs font-semibold text-primary-700 group-hover:underline">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-3">
          {featureColumns.map((col) => (
            <div key={col.label} className="space-y-3">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-ink-500">{col.label}</h4>
              <ul className="space-y-2 text-sm text-ink-700">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 h-2 w-2 rounded-full bg-primary-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-gradient-to-r from-mint-100 via-white to-sky-100 p-6 ring-1 ring-slate-200/70">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-ink-600">Backend-connected</p>
              <p className="text-lg text-ink-800">Configure your API base URL in <code className="rounded bg-white px-2 py-1 text-sm ring-1 ring-slate-200">.env.local</code></p>
              <p className="text-sm text-ink-500">Works with the Node/Express + PostgreSQL microservices backend.</p>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-xl bg-ink-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition"
            >
              Open Admin
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
