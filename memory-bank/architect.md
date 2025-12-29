# Architecture - Frontend

## Architectural Decisions

### 1. Next.js App Router
- **Decision**: Use Next.js App Router (not Pages Router)
- **Rationale**: Modern approach with better performance, React Server Components support
- **Impact**: Server-side rendering, improved SEO, better code splitting

### 2. Service Layer Pattern
- **Decision**: Separate API calls into dedicated service files
- **Rationale**: Maintainability, reusability, easier testing
- **Location**: `/services` directory
- **Pattern**: Each domain (auth, cart, order, payment, product) has its own service

### 3. Type System
- **Decision**: Strict TypeScript with dedicated type definitions
- **Rationale**: Type safety, better IDE support, fewer runtime errors
- **Location**: `/types` directory
- **Pattern**: One file per domain

### 4. Component Organization
- **Decision**: Separate layout and UI components
- **Rationale**: Clear separation of concerns, reusability
- **Structure**:
  - `/components/layout`: Header, Footer, navigation
  - `/components/ui`: Reusable UI elements (Button, etc.)

## Design Considerations

### Performance
- Leverage Next.js SSR for initial page loads
- Implement code splitting at route level
- Optimize images with Next.js Image component
- Minimize client-side JavaScript

### Security
- Store auth tokens securely
- Validate all user inputs
- Implement CSRF protection
- Use environment variables for sensitive data

### Scalability
- Modular service architecture
- Reusable component library
- Type-safe API contracts
- Separation of concerns

## System Components

### 1. App Router (`/app`)
- **Responsibilities**:
  - Route definitions
  - Page layouts
  - Metadata management
  - Global styles

### 2. Services Layer (`/services`)
- **Responsibilities**:
  - API communication
  - Data fetching/mutation
  - Error handling
  - Response transformation

### 3. API Client (`/lib/api-client.ts`)
- **Responsibilities**:
  - HTTP request wrapper
  - Authentication headers
  - Base URL configuration
  - Error interception

### 4. Component Library
- **Layout Components**:
  - Header: Navigation, user menu
  - Footer: Links, copyright
- **UI Components**:
  - Button: Reusable button with variants
  - Forms, inputs (to be added)
  - Cards, modals (to be added)

### 5. Type System (`/types`)
- **Responsibilities**:
  - Type definitions for API responses
  - Frontend model interfaces
  - Component prop types
  - Shared type utilities
