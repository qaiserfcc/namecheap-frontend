# Product Context - Frontend

## Project Description
Next.js frontend application for the Namecheap domain marketplace, providing a modern, responsive user interface for browsing, purchasing, and managing domain names.

## Architecture
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **State Management**: React hooks and context
- **API Communication**: Custom API client (`lib/api-client.ts`)

## Key Technologies
- Next.js
- React
- TypeScript
- Tailwind CSS
- PostCSS

## Libraries & Dependencies
- Next.js for server-side rendering and routing
- Tailwind CSS for utility-first styling
- TypeScript for type safety
- React hooks for state management

## Integration Points
- Backend API: Communicates with namecheap-backend via REST API
- Authentication: JWT-based auth tokens
- Payment processing: Integration with backend payment service
- Real-time updates: Potential for WebSocket integration

## Key Features
- User authentication (login/register)
- Product browsing and search
- Shopping cart management
- Order processing and history
- Admin dashboard
- Responsive design
