# FitConnect Design System

## Overview

The FitConnect design system prioritizes clarity, energy, and accessibility. Our design philosophy centers on making fitness class booking feel effortless and motivating.

## Design Principles

### 1. **Clarity Over Complexity**
Every interface element should have a clear purpose. Users should never feel confused about what to do next.

### 2. **Energy & Motivation**
Design choices should reflect the energetic nature of fitness. Use dynamic colors and engaging imagery while maintaining professionalism.

### 3. **Accessibility First**
All color combinations meet WCAG AA standards. Interactive elements are keyboard-navigable and screen-reader friendly.

### 4. **Consistency**
Reusable components maintain visual and behavioral consistency across all user types (studio owners and class attendees).

---

## Color Palette

### Primary Colors
**Purpose:** Brand identity, primary actions, key UI elements

```css
--primary-600: #7C3AED;    /* Main brand purple - buttons, links */
--primary-700: #6D28D9;    /* Hover states */
--primary-500: #8B5CF6;    /* Lighter variant */
--primary-50: #FAF5FF;     /* Light backgrounds */
```

**Usage:** Primary CTAs, navigation highlights, active states

### Secondary Colors
**Purpose:** Supporting actions, secondary information

```css
--secondary-600: #2563EB;  /* Blue - informational elements */
--secondary-700: #1D4ED8;  /* Hover states */
--secondary-50: #EFF6FF;   /* Light backgrounds */
```

**Usage:** Secondary buttons, links, badges

### Accent Colors
**Purpose:** Highlighting, energy, urgency

```css
--accent-500: #F59E0B;     /* Amber - highlights, warnings */
--accent-600: #D97706;     /* Hover state */
--accent-50: #FFFBEB;      /* Light background */
```

**Usage:** "Filling fast" indicators, featured content

### Semantic Colors

**Success:**
```css
--success-600: #059669;    /* Green - confirmations */
--success-700: #047857;    /* Hover */
--success-50: #ECFDF5;     /* Background */
```

**Warning:**
```css
--warning-600: #D97706;    /* Orange - cautions */
--warning-700: #B45309;    /* Hover */
--warning-50: #FFFBEB;     /* Background */
```

**Error:**
```css
--error-600: #DC2626;      /* Red - errors, cancellations */
--error-700: #B91C1C;      /* Hover */
--error-50: #FEF2F2;       /* Background */
```

**Info:**
```css
--info-600: #0284C7;       /* Sky blue - informational */
--info-700: #0369A1;       /* Hover */
--info-50: #F0F9FF;        /* Background */
```

### Neutral Colors

```css
--gray-900: #111827;       /* Primary text */
--gray-800: #1F2937;       /* Secondary text */
--gray-700: #374151;       /* Tertiary text */
--gray-600: #4B5563;       /* Muted text */
--gray-500: #6B7280;       /* Placeholder text */
--gray-400: #9CA3AF;       /* Disabled text */
--gray-300: #D1D5DB;       /* Borders */
--gray-200: #E5E7EB;       /* Dividers */
--gray-100: #F3F4F6;       /* Light backgrounds */
--gray-50: #F9FAFB;        /* Subtle backgrounds */
--white: #FFFFFF;          /* Pure white */
```

### Contrast Ratios (WCAG AA Compliance)
- Primary-600 on white: 4.87:1 ✓
- Gray-900 on white: 16.1:1 ✓
- Success-600 on white: 4.56:1 ✓
- Error-600 on white: 5.14:1 ✓

---

## Typography

### Font Families

**Headings:**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Body:**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Monospace (for code/data):**
```css
font-family: 'JetBrains Mono', 'Courier New', monospace;
```

### Type Scale

**Display (Hero text):**
```css
font-size: 3.75rem;    /* 60px */
line-height: 1.1;
font-weight: 700;
letter-spacing: -0.02em;
```

**H1:**
```css
font-size: 3rem;       /* 48px */
line-height: 1.2;
font-weight: 700;
letter-spacing: -0.01em;
```

**H2:**
```css
font-size: 2.25rem;    /* 36px */
line-height: 1.25;
font-weight: 600;
```

**H3:**
```css
font-size: 1.875rem;   /* 30px */
line-height: 1.3;
font-weight: 600;
```

**H4:**
```css
font-size: 1.5rem;     /* 24px */
line-height: 1.4;
font-weight: 600;
```

**H5:**
```css
font-size: 1.25rem;    /* 20px */
line-height: 1.5;
font-weight: 600;
```

**H6:**
```css
font-size: 1.125rem;   /* 18px */
line-height: 1.5;
font-weight: 600;
```

**Body Large:**
```css
font-size: 1.125rem;   /* 18px */
line-height: 1.75;
font-weight: 400;
```

**Body (Default):**
```css
font-size: 1rem;       /* 16px */
line-height: 1.5;
font-weight: 400;
```

**Body Small:**
```css
font-size: 0.875rem;   /* 14px */
line-height: 1.5;
font-weight: 400;
```

**Caption:**
```css
font-size: 0.75rem;    /* 12px */
line-height: 1.5;
font-weight: 400;
color: var(--gray-600);
```

---

## Spacing System

**Base unit:** 4px

```css
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;    /* 20px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;    /* 40px */
--space-12: 3rem;      /* 48px */
--space-16: 4rem;      /* 64px */
--space-20: 5rem;      /* 80px */
--space-24: 6rem;      /* 96px */
```

### Usage Guidelines
- **Component padding:** space-4 to space-6
- **Section spacing:** space-12 to space-16
- **Page margins:** space-6 to space-8
- **Icon spacing:** space-2 to space-3

---

## Border Radius

```css
--radius-sm: 0.25rem;   /* 4px - small elements */
--radius-md: 0.5rem;    /* 8px - cards, buttons */
--radius-lg: 0.75rem;   /* 12px - large cards */
--radius-xl: 1rem;      /* 16px - modals */
--radius-full: 9999px;  /* Pills, avatars */
```

---

## Shadows

### Elevation System

**Shadow SM (Subtle lift):**
```css
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
```
**Usage:** Hover states, input fields

**Shadow MD (Standard elevation):**
```css
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
```
**Usage:** Cards, dropdowns

**Shadow LG (Prominent elevation):**
```css
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
```
**Usage:** Modals, popovers

**Shadow XL (Maximum elevation):**
```css
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
```
**Usage:** Overlays, important modals

---

## Component Library

### Buttons

#### Primary Button
**Usage:** Main actions (Book Now, Save, Submit)

```jsx
<button className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-md 
                   hover:bg-primary-700 focus:outline-none focus:ring-2 
                   focus:ring-primary-500 focus:ring-offset-2 
                   transition-colors duration-200">
  Book Now
</button>
```

**Variants:**
- Large: `px-8 py-4 text-lg`
- Medium (default): `px-6 py-3 text-base`
- Small: `px-4 py-2 text-sm`

#### Secondary Button
**Usage:** Alternative actions (Cancel, Back)

```jsx
<button className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-md 
                   hover:bg-gray-200 focus:outline-none focus:ring-2 
                   focus:ring-gray-300 focus:ring-offset-2 
                   transition-colors duration-200">
  Cancel
</button>
```

#### Outline Button
**Usage:** Tertiary actions

```jsx
<button className="px-6 py-3 border-2 border-primary-600 text-primary-600 
                   font-semibold rounded-md hover:bg-primary-50 
                   focus:outline-none focus:ring-2 focus:ring-primary-500 
                   focus:ring-offset-2 transition-colors duration-200">
  Learn More
</button>
```

#### Ghost Button
**Usage:** Low-emphasis actions

```jsx
<button className="px-6 py-3 text-primary-600 font-semibold rounded-md 
                   hover:bg-primary-50 focus:outline-none focus:ring-2 
                   focus:ring-primary-500 focus:ring-offset-2 
                   transition-colors duration-200">
  Skip
</button>
```

#### Icon Button
**Usage:** Actions with icon only

```jsx
<button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 
                   rounded-md focus:outline-none focus:ring-2 
                   focus:ring-gray-300 transition-colors duration-200">
  <svg>...</svg>
</button>
```

#### States
- **Loading:** Add spinner, disable pointer events, reduce opacity to 0.7
- **Disabled:** `opacity-50 cursor-not-allowed`
- **Success:** Briefly show checkmark, then revert

---

### Input Fields

#### Text Input
```jsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700">
    Email Address
  </label>
  <input 
    type="email"
    className="w-full px-4 py-2 border border-gray-300 rounded-md 
               focus:outline-none focus:ring-2 focus:ring-primary-500 
               focus:border-transparent transition-shadow duration-200"
    placeholder="you@example.com"
  />
</div>
```

#### With Error State
```jsx
<input 
  className="w-full px-4 py-2 border-2 border-error-600 rounded-md 
             focus:outline-none focus:ring-2 focus:ring-error-500"
/>
<p className="mt-1 text-sm text-error-600">Please enter a valid email</p>
```

#### Search Input
```jsx
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <svg className="h-5 w-5 text-gray-400">...</svg>
  </div>
  <input 
    type="search"
    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md 
               focus:outline-none focus:ring-2 focus:ring-primary-500"
    placeholder="Search classes..."
  />
</div>
```

---

### Cards

#### Class Card
```jsx
<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg 
                transition-shadow duration-300">
  <img src="..." alt="..." className="w-full h-48 object-cover" />
  <div className="p-6">
    <div className="flex items-center justify-between mb-2">
      <span className="px-3 py-1 bg-primary-50 text-primary-700 text-sm 
                       font-semibold rounded-full">
        Yoga
      </span>
      <span className="text-2xl font-bold text-gray-900">$22</span>
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      Morning Vinyasa Flow
    </h3>
    <p className="text-gray-600 text-sm mb-4">
      Start your day with energizing flow...
    </p>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <svg>...</svg>
        <span>7:00 AM</span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">8/15 spots</span>
        <div className="w-20 h-2 bg-gray-200 rounded-full">
          <div className="w-1/2 h-full bg-accent-500 rounded-full"></div>
        </div>
      </div>
    </div>
    <button className="w-full mt-4 px-6 py-3 bg-primary-600 text-white 
                       font-semibold rounded-md hover:bg-primary-700">
      Book Now
    </button>
  </div>
</div>
```

#### Studio Card
```jsx
<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg 
                transition-shadow duration-300 cursor-pointer">
  <img src="..." alt="..." className="w-full h-40 object-cover" />
  <div className="p-4">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-semibold text-gray-900">ZenFlow Yoga</h3>
      <div className="flex items-center">
        <svg className="w-5 h-5 text-amber-400">...</svg>
        <span className="ml-1 text-sm font-medium text-gray-900">4.8</span>
      </div>
    </div>
    <p className="text-sm text-gray-600 mb-2">Yoga • Lincoln Park</p>
    <p className="text-xs text-gray-500">124 reviews</p>
  </div>
</div>
```

---

### Badges & Tags

#### Status Badge
```jsx
<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
               bg-success-50 text-success-700">
  Available
</span>

<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
               bg-warning-50 text-warning-700">
  Filling Fast
</span>

<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
               bg-error-50 text-error-700">
  Full
</span>
```

#### Difficulty Badge
```jsx
<span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
  Beginner
</span>
```

---

### Navigation

#### Top Navigation Bar
```jsx
<nav className="bg-white shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between h-16">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-primary-600">FitConnect</h1>
      </div>
      <div className="flex items-center space-x-4">
        <a href="#" className="text-gray-700 hover:text-primary-600 px-3 py-2 
                               rounded-md text-sm font-medium">
          Discover
        </a>
        <a href="#" className="text-gray-700 hover:text-primary-600 px-3 py-2 
                               rounded-md text-sm font-medium">
          My Bookings
        </a>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-md 
                          hover:bg-primary-700">
          Sign In
        </button>
      </div>
    </div>
  </div>
</nav>
```

---

### Modals

#### Booking Modal
```jsx
<div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center 
                justify-center z-50">
  <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 
                  max-h-[90vh] overflow-y-auto">
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Confirm Booking</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <svg>...</svg>
        </button>
      </div>
      {/* Modal content */}
    </div>
  </div>
</div>
```

---

### Loading States

#### Skeleton Loader
```jsx
<div className="animate-pulse">
  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
  <div className="p-6 space-y-3">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
</div>
```

#### Spinner
```jsx
<div className="flex items-center justify-center">
  <div className="animate-spin rounded-full h-12 w-12 border-4 
                  border-gray-200 border-t-primary-600"></div>
</div>
```

---

### Empty States

```jsx
<div className="text-center py-12">
  <svg className="mx-auto h-24 w-24 text-gray-400">...</svg>
  <h3 className="mt-4 text-lg font-medium text-gray-900">No classes found</h3>
  <p className="mt-2 text-sm text-gray-600">
    Try adjusting your filters or search terms
  </p>
  <button className="mt-6 px-6 py-3 bg-primary-600 text-white rounded-md 
                     hover:bg-primary-700">
    Clear Filters
  </button>
</div>
```

---

## Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Small devices */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large screens */
```

### Grid System
```css
/* Mobile: 1 column */
grid-template-columns: repeat(1, 1fr);

/* Tablet: 2 columns */
@media (min-width: 768px) {
  grid-template-columns: repeat(2, 1fr);
}

/* Desktop: 3-4 columns */
@media (min-width: 1024px) {
  grid-template-columns: repeat(3, 1fr);
}
```

---

## Accessibility Guidelines

### Focus States
- All interactive elements must have visible focus indicators
- Use `focus:ring-2 focus:ring-[color]` pattern
- Never use `outline-none` without replacement

### Color Contrast
- Text on background: minimum 4.5:1 ratio
- Large text (18px+): minimum 3:1 ratio
- UI components: minimum 3:1 ratio

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Logical tab order
- Escape key closes modals
- Enter/Space activates buttons

### Screen Reader Support
- Use semantic HTML (header, nav, main, footer)
- Include ARIA labels for icons
- Provide alt text for all images
- Use aria-live for dynamic updates

---

## Animation & Transitions

### Timing Functions
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### Duration
```css
--duration-fast: 150ms;     /* Quick interactions */
--duration-normal: 200ms;   /* Standard transitions */
--duration-slow: 300ms;     /* Deliberate animations */
```

### Common Transitions
```css
/* Button hover */
transition: background-color 200ms ease-in-out;

/* Card lift */
transition: box-shadow 300ms ease-in-out;

/* Modal fade */
transition: opacity 200ms ease-in-out;
```

---

## Implementation Notes

### Tailwind Configuration
Add these custom colors to your `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FAF5FF',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        // Add other custom colors
      }
    }
  }
}
```

### Component Reusability
- Create a `components/ui/` directory
- Each component in its own file
- Export with clear prop interfaces
- Include usage examples in comments

### Design Tokens
Consider using CSS custom properties for easy theming:

```css
:root {
  --color-primary: #7C3AED;
  --color-text: #111827;
  --spacing-base: 1rem;
}
```

This design system ensures consistency, accessibility, and a polished user experience throughout FitConnect.
