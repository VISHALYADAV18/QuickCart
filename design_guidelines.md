# QuickCart Design Guidelines

## Design Approach
**Reference-Based Approach** drawing from Apple's minimalism, Netflix's content-first strategy, and Uber's functional clarity. The design emphasizes generous whitespace, clean typography, and uncluttered layouts typical of modern grocery e-commerce platforms like Instacart.

## Core Design Principles
1. **Spacious Minimalism**: Generous breathing room between elements
2. **Content Hierarchy**: Products and content take center stage
3. **Functional Clarity**: Every element serves a clear purpose
4. **Clean Aesthetics**: Undecorated, professional appearance

---

## Typography System

**Font Family**: 
- Primary: Inter or SF Pro Display (headings, UI)
- Secondary: System font stack for body text

**Type Scale**:
- Hero/H1: text-5xl font-bold (48px)
- H2: text-3xl font-semibold (30px)
- H3: text-xl font-medium (20px)
- Body: text-base (16px)
- Small/Meta: text-sm (14px)
- Micro: text-xs (12px)

**Text Treatment**:
- Headings: Bold/Semibold weights, tight leading
- Body: Regular weight, relaxed leading (leading-relaxed)
- Buttons: Medium weight, uppercase tracking-wide for primary CTAs

---

## Layout & Spacing System

**Spacing Primitives**: Use Tailwind units of **4, 6, 8, 12, 16, 24**
- Micro spacing: p-4, gap-4
- Component spacing: p-6, p-8
- Section spacing: py-12, py-16, py-24
- Container padding: px-6 md:px-8

**Grid System**:
- Container: max-w-7xl mx-auto
- Product grids: grid-cols-1 md:grid-cols-3 lg:grid-cols-4
- Content areas: max-w-4xl for forms and text

**Breakpoints**: Mobile-first responsive design
- Mobile: base (< 768px)
- Tablet: md (768px+)
- Desktop: lg (1024px+)

---

## Page-Specific Layouts

### Homepage
- **Hero Section**: Full-width, min-h-[60vh], centered content
  - Large heading with "QuickCart" branding
  - Subheading describing grocery delivery
  - Single prominent "Shop Groceries" CTA button
  - Clean background (solid or subtle gradient)
- **Navigation**: Fixed top navbar, h-16, max-w-7xl container
  - Logo left, nav links center, Cart/Login right
  - Minimal link count (Home, Products, Orders, Cart, Login/Profile)

### Products Page
- **Product Grid**: 4 columns desktop, 3 tablet, 1 mobile
- **Product Cards**: 
  - Square aspect ratio images (1:1)
  - 8px border radius
  - p-4 internal padding
  - Product image fills top 60% of card
  - Name: text-base font-medium
  - Price: text-lg font-semibold
  - "Add to Cart" button: full width, mt-4
  - Hover: Subtle lift effect (shadow-md)

### Cart & Checkout Pages
- **Layout**: Single column, max-w-3xl centered
- **Cart Items**: List layout with horizontal card design
  - Left: 80px square product image
  - Center: Product name and price stacked
  - Right: Quantity controls and remove button
  - Gap-6 between items
- **Summary Card**: Sticky sidebar (lg screens) or bottom section
  - Subtotal, tax (if applicable), total in list format
  - Prominent "Proceed to Checkout" / "Place Order" button

### Orders Page
- **Order Cards**: Vertical stack, gap-6
- Each order card shows:
  - Order date and ID at top (text-sm)
  - Item list with small thumbnails
  - Total amount (text-lg font-semibold)
  - Border and subtle shadow for card definition

### Admin Panel
- **Layout**: Sidebar + main content area (lg screens), stacked mobile
- **Sidebar**: w-64, product management links
- **Main Area**: 
  - Add Product Form: max-w-2xl, single column
  - Product List: Table or grid view
  - Delete buttons: Small, icon-based (trash icon)

---

## Component Library

### Navigation
- Horizontal navbar, shadow-sm
- Links: px-4 spacing, text-sm md:text-base
- Cart icon with badge indicator for item count
- Mobile: Hamburger menu, slide-in drawer

### Buttons
**Primary CTA**: 
- Rounded (rounded-lg), px-8 py-3
- Font-medium, text-base
- Prominent size for hero/checkout actions

**Secondary**: 
- Rounded (rounded-md), px-6 py-2
- Outlined or ghost style
- Used for "Add to Cart", "View Details"

**Icon Buttons**: 
- Square (w-10 h-10), rounded-md
- For cart quantity, remove items

### Forms
- **Input Fields**: 
  - h-12, px-4, rounded-lg
  - Border width: border-2
  - Label: text-sm font-medium, mb-2
- **Form Spacing**: gap-6 between fields
- **Submit Buttons**: Full width on mobile, auto width desktop

### Cards
- **Border Radius**: rounded-lg (8px) for all cards
- **Shadow**: shadow-sm default, shadow-md on hover
- **Padding**: p-6 for content cards, p-4 for product cards

### Product Images
- **Aspect Ratio**: 1:1 (square) for grid consistency
- **Object Fit**: object-cover to fill space
- **Placeholder**: Light background with centered icon when loading

---

## Images

### Hero Section Image
**Description**: Clean, bright grocery scene - fresh produce arranged on white/light surface (fruits, vegetables, minimal styling). Overhead or 45-degree angle shot. Professional food photography aesthetic.
**Placement**: Background image with overlay, or large image left/right split with text

### Product Images
**Description**: Individual grocery items on clean white/neutral backgrounds, well-lit studio photography style
**Placement**: Top portion of product cards, consistent sizing across grid

### Empty States
**Description**: Simple line illustrations for empty cart, no orders yet
**Placement**: Centered in empty state containers

---

## Interactions & States

### Minimal Animations
- **Transitions**: 150ms ease for hover states
- **Card Hover**: Subtle transform scale(1.02) + shadow elevation
- **Button Clicks**: Quick opacity flash (active:opacity-80)
- **Page Transitions**: Instant (no page transition animations)

### Loading States
- Skeleton screens for product grids (gray boxes matching card dimensions)
- Spinner for form submissions (centered, small size)

### Error States
- Inline validation messages (text-sm, below inputs)
- Toast notifications for cart actions (top-right, auto-dismiss)

---

## Accessibility
- All interactive elements: min-h-11 touch targets
- Form labels: Visible and associated with inputs
- Alt text: Descriptive for all product images
- Focus indicators: Visible ring on keyboard navigation
- Skip to main content link for keyboard users

---

## Icons
**Library**: Heroicons (outlined style for primary icons, solid for accents)
- Cart: shopping-bag
- User: user-circle
- Add: plus
- Remove: trash
- Menu: bars-3
- Close: x-mark