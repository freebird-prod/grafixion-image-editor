# Design Guidelines: Photo Studio & Mood-to-Music Application

## Design Approach: Hybrid Creative-Utility System

**Primary References**: Canva (editing interface), Figma (tool organization), Spotify (music discovery), Linear (clean typography and spacing)

**Design Philosophy**: Create a dual-personality interface that balances precision tools with emotional discovery—clinical efficiency for photo editing, warm expressiveness for music generation.

---

## Color Palette

### Light Mode
- **Primary**: 262 80% 50% (Deep purple-blue for brand identity)
- **Secondary**: 220 15% 25% (Charcoal for tools and controls)
- **Accent**: 340 75% 55% (Coral-pink for music/emotional elements)
- **Background**: 0 0% 100% (Pure white)
- **Surface**: 220 15% 97% (Cool gray for cards/panels)
- **Border**: 220 10% 88% (Subtle dividers)

### Dark Mode
- **Primary**: 262 70% 60% (Lighter purple-blue)
- **Secondary**: 220 15% 90% (Light text on dark)
- **Accent**: 340 70% 65% (Softer coral-pink)
- **Background**: 220 18% 11% (Deep blue-black)
- **Surface**: 220 15% 16% (Elevated panels)
- **Border**: 220 10% 22% (Subtle dark dividers)

### Module-Specific Accents
- **Photo Studio**: 185 60% 45% (Teal for editing actions)
- **Mood-to-Music**: 340 75% 55% (Coral-pink for emotional states)

---

## Typography

**Fonts**: 
- Primary: Inter (UI, body, controls)
- Display: Cal Sans (hero headings, section titles)

**Scale**:
- Hero: text-6xl md:text-7xl, font-bold
- H1: text-4xl md:text-5xl, font-bold
- H2: text-3xl md:text-4xl, font-semibold
- H3: text-2xl, font-semibold
- Body: text-base, font-normal
- Small: text-sm, font-medium
- Caption: text-xs, font-normal

---

## Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24, 32

**Container Strategy**:
- Landing/Marketing: max-w-7xl with px-4 md:px-8
- App Interface: Full-width with sidebar navigation (w-64 fixed left)
- Content Areas: Fluid with controlled max-widths per module

**Grid Patterns**:
- Landing Features: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Photo Gallery: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
- Mood Cards: grid-cols-2 md:grid-cols-3 lg:grid-cols-5

---

## Landing Page Structure

### Hero Section (h-screen max-h-[800px])
**Layout**: Full-width split design
- Left 50%: Large hero image showing photo editing in action (vibrant edited photo with subtle filter preview)
- Right 50%: 
  - Main heading emphasizing dual functionality
  - Subheading describing both modules
  - Two primary CTAs (buttons) side-by-side: "Edit Photos" (teal) + "Discover Music" (coral)
  - Social proof badge below CTAs

### Dual Feature Showcase (py-24)
**Two-column split** (50/50 on desktop, stacked on mobile):

**Left Panel - Photo Studio**:
- Icon/illustration of editing tools
- "Transform Your Photos" heading
- Feature list: Filters, Crop & Rotate, Real-time Preview, Instant Download
- Visual mockup of editing interface with before/after

**Right Panel - Mood-to-Music**:
- Illustration of mood selection
- "Music for Every Mood" heading
- Feature list: Mood Detection, Curated Playlists, Spotify Integration, Personalized Discovery
- Visual mockup of mood selector interface

### How It Works (py-20, bg-surface)
**Three-column grid**: Process steps for both modules
- Upload/Select → Edit/Choose → Download/Listen
- Icons + brief descriptions for each step
- Alternating module colors (teal for photo, coral for music)

### Interactive Demo Preview (py-24)
**Tabbed interface**: Switch between Photo Studio and Mood-to-Music demos
- Large interactive preview area showing actual UI
- Live demonstration capabilities
- "Try It Now" CTA below each tab

### Social Proof (py-16, bg-primary/5)
**Two-column testimonials**: 
- User photos with quotes about both features
- Usage statistics (photos edited, playlists generated)
- Brand logos if applicable

### Final CTA (py-32)
**Centered, full-width**:
- Bold headline encouraging action
- Dual CTAs again
- No unnecessary empty space—include supporting text about free tier/features

---

## Photo Studio Module Interface

### Layout Architecture
**Three-panel design**:
1. **Left Sidebar** (w-64): Tool palette with collapsible sections
2. **Center Canvas** (flex-1): Photo editing workspace with zoom controls
3. **Right Panel** (w-80): Filter presets, adjustments, layers

### Tool Organization
- Grouped by function: Transform, Filters, Adjustments, Export
- Icon-based with labels
- Active tool highlighted with primary color
- Tooltips on hover

### Canvas Controls
- Corner zoom percentage indicator
- Floating toolbar: Undo, Redo, Reset, Fit to screen
- Grid overlay toggle
- Background: checkerboard pattern for transparency

### Filter Preview Cards
- Grid of filter thumbnails (grid-cols-3)
- Hover state shows filter name
- Selected filter has border in teal accent
- Real-time preview on hover

---

## Mood-to-Music Module Interface

### Layout Architecture
**Center-focused design**:
- Wide content area (max-w-6xl)
- Mood selector prominence
- Generated playlist cards below

### Mood Selection Interface
**Large mood cards** (grid-cols-2 md:grid-cols-3 lg:grid-cols-5):
- Each card: 160px × 160px minimum
- Gradient backgrounds matching mood (warm for happy, cool for calm, etc.)
- Emoji/icon representing mood
- Mood name in bold
- Hover: subtle scale and glow effect
- Selected: prominent border + shadow in coral accent

### Playlist Generation View
**Three-stage reveal**:
1. Loading state: Animated music notes, pulsing gradient background
2. Results header: Mood name, playlist count, regenerate button
3. Track cards: Album art, song title, artist, duration, play preview button

### Track Cards
- Horizontal layout with album art left
- Spotify green accent on play button hover
- Add to Spotify button (outline variant)
- Fluid width, stacked on mobile

---

## Component Library

### Buttons
- **Primary**: Solid background (primary color), white text, rounded-lg, px-6 py-3
- **Secondary**: Outline variant with blur background when on images (backdrop-blur-md bg-white/10)
- **Accent**: Coral for music, teal for photo actions
- No custom hover states—rely on ShadCN defaults

### Cards
- Rounded-xl borders
- Subtle shadows (shadow-sm default, shadow-md hover)
- Padding: p-6 standard
- Background: surface color with border

### Input Fields
- Consistent dark mode styling
- Border focus states in primary color
- Label above, helper text below
- Icon prefix where applicable

### Navigation
- Fixed left sidebar for app (w-64)
- Logo at top, module switcher, user profile at bottom
- Active state: background primary/10, left border accent

### Modals/Dialogs
- Center screen, max-w-2xl
- Backdrop blur (backdrop-blur-sm bg-black/50)
- Rounded-xl, generous padding (p-8)
- Clear close button top-right

---

## Animations & Interactions

**Framer Motion Usage** (minimal, purposeful):
- Page transitions: Fade + slight Y-axis shift (20px)
- Card reveals: Stagger children with spring animations
- Photo loading: Skeleton → blur → sharp reveal
- Playlist generation: Scale + fade-in for tracks

**GSAP Usage**:
- Hero text: Split text animation on load
- Scroll-triggered: Parallax on hero image (subtle)
- Music visualization: Audio-reactive bar animations

**Micro-interactions**:
- Button press: Scale 0.98
- Tool selection: Smooth color transition
- Filter application: Cross-fade preview
- Mood card: Glow pulse on select

---

## Images

### Hero Section
**Large hero image** (left 50% of viewport):
- Subject: Split-screen showing vibrant edited photo (landscape/portrait) with subtle filter grid overlay
- Style: Professional, colorful, showcasing transformation capability
- Treatment: High contrast, sharp focus
- Placement: Full height of hero, left-aligned

### Feature Showcase
**Two interface mockups**:
1. Photo editing workspace screenshot showing actual UI with a sample photo being edited
2. Mood selector interface with colorful mood cards in action

### Demo Section
**Interactive previews**: Embedded actual interface components, not static images

### Social Proof
**User testimonials**: Small circular profile photos (48px × 48px) next to quotes

---

## Accessibility & Responsiveness

- All interactive elements minimum 44px touch target
- Color contrast ratios minimum 4.5:1 for text
- Focus visible states on all interactive elements (ring-2 ring-primary)
- Skip navigation link for keyboard users
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Mobile: Single column, collapsible sidebars, bottom navigation for app

---

**Key Principle**: Every section serves a purpose. The design balances creative expression with functional clarity, ensuring both modules feel unified while maintaining distinct personalities.