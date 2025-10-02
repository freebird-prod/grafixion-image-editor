# Photo Studio & Mood-to-Music Application

## Overview

This is a dual-module creative web application that combines professional photo editing capabilities with AI-powered music discovery. Built as a full-stack application, it features a Photo Studio for applying filters and editing images, and a Mood-to-Music Generator that creates curated Spotify playlists based on emotional states.

The application emphasizes a clean, modern user experience with a design philosophy that balances precision tools (photo editing) with emotional discovery (music generation). It's designed to be a hybrid creative-utility system inspired by Canva's editing interface, Figma's tool organization, Spotify's music discovery, and Linear's clean typography.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Routing**
- React 18 with TypeScript using Vite as the build tool
- Client-side routing via Wouter (lightweight alternative to React Router)
- Component structure organized around three main pages: Landing, PhotoStudio, and MoodMusic
- Design system based on shadcn/ui components with Radix UI primitives

**State Management**
- TanStack Query (React Query) for server state management and API data fetching
- Local component state using React hooks for UI interactions
- Custom hooks for reusable logic (e.g., `use-mobile`, `use-toast`)

**Styling Approach**
- Tailwind CSS with custom design tokens defined in CSS variables
- Dual theme support (light/dark mode) with theme persistence in localStorage
- Custom color palette with module-specific accents:
  - Photo Studio: Teal accent (185 60% 45%)
  - Mood-to-Music: Coral-pink accent (340 75% 55%)
- Typography using Inter for UI/body and Cal Sans for display headings

**Key Design Decisions**
- Chose Vite over Create React App for faster development builds and better dev experience
- Wouter selected for minimal bundle size compared to React Router
- shadcn/ui provides accessible, customizable components without runtime overhead
- Framer Motion for declarative animations and smooth transitions

### Backend Architecture

**Server Framework**
- Express.js running on Node.js with TypeScript
- ES Modules (type: "module") for modern JavaScript module system
- RESTful API design with routes under `/api` prefix

**API Structure**
- Photo management endpoints:
  - `POST /api/photos` - Create new photo record
  - `GET /api/photos` - List all photos
  - `GET /api/photos/:id` - Get specific photo
  - `PATCH /api/photos/:id` - Update photo metadata
- Playlist generation endpoints (planned):
  - `POST /api/playlists/generate` - Generate mood-based playlist
  - `GET /api/playlists` - List saved playlists

**Data Validation**
- Zod schemas for runtime type validation
- Drizzle-Zod integration for automatic schema generation from database models
- Input validation at API boundaries with descriptive error messages

**Development Features**
- Hot module replacement (HMR) via Vite in development
- Request logging middleware with duration tracking
- Development-only Replit plugins for debugging and visualization

### Data Storage

**ORM & Database**
- Drizzle ORM for type-safe database queries
- PostgreSQL as the target database (via Neon serverless driver)
- WebSocket-based connection for serverless environments

**Schema Design**
Three main tables:
1. **users** - User authentication (id, username, password)
2. **photos** - Photo metadata (id, originalUrl, editedUrl, filter, createdAt)
3. **playlists** - Music playlists (id, mood, tracks[], createdAt)

**Storage Strategy**
- In-memory storage adapter (`MemStorage`) for development/testing
- Database storage implementation pending (interface defined in `IStorage`)
- Photo URLs stored as text (references to external storage or base64 data)
- Playlist tracks stored as text array

**Migration Management**
- Drizzle Kit for schema migrations
- Migrations output to `/migrations` directory
- Push-based workflow for quick schema updates

### Authentication & Authorization

**Current State**
- User table exists but authentication is not yet implemented
- No session management or JWT tokens configured
- Frontend has no login/registration flows

**Planned Architecture**
- Session-based authentication using `connect-pg-simple` (already in dependencies)
- Password hashing not yet implemented (consider bcrypt)
- Protected routes will need middleware for authenticated-only access

### External Dependencies

**UI & Component Libraries**
- Radix UI primitives for accessible, unstyled components
- Lucide React for consistent icon set
- Embla Carousel for image carousels
- cmdk for command palette functionality

**Data & State**
- TanStack Query for async state management
- React Hook Form with Zod resolvers for form validation
- date-fns for date manipulation

**Development Tools**
- Replit-specific plugins for development environment integration
- ESBuild for production server bundling
- PostCSS with Autoprefixer for CSS processing

**Third-Party Integrations**
- Spotify API integration (planned, not yet implemented)
  - Will require OAuth flow for user authentication
  - Web API for playlist creation and track search
- Image processing handled client-side via Canvas API
  - Filters applied using CSS blend modes and canvas transformations
  - No server-side image processing currently

**Database**
- Neon serverless PostgreSQL
- Connection pooling via `@neondatabase/serverless`
- WebSocket-based connection for edge/serverless compatibility

### Build & Deployment

**Build Process**
- Frontend: Vite builds to `dist/public`
- Backend: ESBuild bundles server to `dist/index.js`
- Single production server serves static files and API

**Environment Configuration**
- `DATABASE_URL` required for database connection
- Development mode uses Vite dev server with HMR
- Production serves pre-built static assets from Express

**Deployment Considerations**
- Designed for Replit deployment (evident from plugins and configuration)
- Stateless server design suitable for serverless/edge deployment
- Database connection via connection string (no persistent connections)