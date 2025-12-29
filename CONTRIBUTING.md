# Contributing to Namecheap E-commerce Frontend

Thank you for your interest in contributing to the Namecheap E-commerce Frontend!

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/qaiserfcc/namecheap-frontend.git
   cd namecheap-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your backend API URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Project Structure

```
namecheap-frontend/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── auth/              # Authentication pages
│   ├── cart/              # Shopping cart page
│   ├── orders/            # Order management pages
│   ├── products/          # Product catalog pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── layout/           # Layout components (Header, Footer)
│   └── ui/               # UI components (Button, etc.)
├── lib/                   # Utility libraries
│   └── api-client.ts      # API client for backend communication
├── services/              # Backend service integrations
│   ├── auth.service.ts    # Authentication service
│   ├── cart.service.ts    # Cart service
│   ├── order.service.ts   # Order service
│   ├── payment.service.ts # Payment service
│   └── product.service.ts # Product service
├── types/                 # TypeScript type definitions
│   ├── auth.ts
│   ├── cart.ts
│   ├── order.ts
│   ├── payment.ts
│   └── product.ts
└── public/               # Static assets
```

## Coding Guidelines

### TypeScript

- Use TypeScript for all new files
- Define types in the `types/` directory
- Avoid using `any` - use proper types
- Export interfaces and types for reusability

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper TypeScript types for props

### Styling

- Use Tailwind CSS utility classes
- Follow the existing color scheme (primary colors defined in `tailwind.config.js`)
- Ensure responsive design (mobile-first approach)
- Maintain consistent spacing and typography

### File Naming

- Use kebab-case for directories: `auth-service/`
- Use PascalCase for component files: `Button.tsx`
- Use camelCase for utility files: `api-client.ts`
- Use lowercase for type files: `product.ts`

## Adding New Features

### Adding a New Page

1. Create a new directory in `app/`
2. Add a `page.tsx` file
3. Follow the pattern of existing pages

Example:
```typescript
// app/profile/page.tsx
export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>
      {/* Your content */}
    </div>
  )
}
```

### Adding a New Service

1. Create a type definition in `types/`
2. Create a service file in `services/`
3. Use the API client for HTTP requests

Example:
```typescript
// types/review.ts
export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
}

// services/review.service.ts
import { apiClient } from '@/lib/api-client';
import { Review } from '@/types/review';

export const reviewService = {
  async getReviews(productId: string) {
    return apiClient.get<Review[]>(`/api/reviews/${productId}`);
  },
  
  async createReview(data: Partial<Review>) {
    return apiClient.post<Review>('/api/reviews', data);
  },
};
```

### Adding a New Component

1. Create component in `components/ui/` or `components/layout/`
2. Use TypeScript for props
3. Export as default

Example:
```typescript
// components/ui/Card.tsx
interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`border rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
}
```

## Testing

Before submitting a PR:

1. **Lint your code**
   ```bash
   npm run lint
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Test in development**
   ```bash
   npm run dev
   ```

## Backend Integration

The frontend is designed to work with a microservices backend. Ensure:

1. Your `.env.local` points to the correct backend URL
2. API endpoints match the backend routes
3. Request/response types match backend contracts
4. Handle errors appropriately (network errors, 404s, 500s, etc.)

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run linting and build tests
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### PR Guidelines

- Provide a clear description of the changes
- Reference any related issues
- Include screenshots for UI changes
- Ensure all tests pass
- Keep PRs focused on a single feature/fix

## Questions?

If you have questions about contributing, please open an issue for discussion.

Thank you for contributing! 🎉
