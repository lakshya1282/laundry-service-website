# Copilot Instructions for Laundry Service Website

## Project Overview
This is a **laundry service booking website** built with vanilla HTML/CSS/JavaScript. It features a hero section with service listings and a shopping cart interface where users can select services and complete a booking form.

## Architecture & Key Components

### Page Structure (`index.html`)
- **Header**: Navigation bar with logo, menu links (Home, Services, About Us, Contact Us), and username badge
- **Hero Section (`.section-hero`)**: Left side contains headline, paragraph, and "Book a Service" CTA button; right side displays washing image
- **Hero Footer (`.hero-footer`)**: Achievements/stats section with flexbox layout
- **Booking Section (`.section-booking`)**: Two-column layout with services list and shopping cart

### CSS Patterns (`resources/css/style.css`)
- **Flexbox for headers/navigation**: Header uses `display:flex; justify-content: space-between`
- **CSS Grid for content**: Hero section uses `grid-template-columns: 2fr 1fr`
- **Container patterns**: Service cards and cart use `display:flex; gap:` for spacing
- **Color scheme**: Primary blue (#0099FF), neutral gray (rgb(97, 97, 97)), white cards with shadows
- **Typography**: Sans-serif font family throughout, responsive sizing (1.9rem, 18px, etc.)

### JavaScript Logic (`resources/js/main.js`)
- **Service data structure**: Array of objects with `id`, `name`, `price` properties
- **Cart management**: `let cart = []` array to track added services
- **DOM targets**: `#serviceList` renders service items, `#cartBody` renders cart table, `#totalAmount` displays total

## Critical Patterns

### Margin Collapse Issues
The `.section-booking` requires `padding-top: 1px` to prevent child margin collapse—this keeps the `.container` element at its intended `4rem` margin distance. **Always remember this when troubleshooting vertical spacing.**

### Service Item Structure
Services follow a consistent pattern: `{ id: number, name: string, price: number }`. Prices are in ₹ (rupees). IDs range from 1-6.

### Color References
- Primary action: `#0099FF` (cyan blue)
- Text: `rgb(97, 97, 97)` (dark gray)
- Delete/remove button: `#ff5b5b` (red)
- Card shadow: `rgba(0,0,0,0.1)`

### External Dependencies
- **Ionicons**: Loaded via CDN (`unpkg.com/ionicons@7.1.0`) for calendar and other icons using `<ion-icon>` elements

## Common Development Tasks

1. **Adding new services**: Edit the `services` array in `main.js` with new `{ id, name, price }` objects
2. **Styling adjustments**: Modify corresponding class selectors in `style.css` (e.g., `.service-item`, `.btn`)
3. **Cart calculations**: Update total amount logic—currently sums selected service prices
4. **Form submissions**: "Book Now" form currently has no backend handler; implement event listener on `<form>`

## File Organization
```
index.html                 # Main page structure
resources/
  css/style.css           # All styling
  js/main.js              # Service data, cart logic
  img/                    # Images (washing.png referenced in hero)
vendors/                  # Third-party CSS/JS (if any)
```

## Notes for AI Agents
- This is a frontend-only project; no server-side logic present
- The services section and cart are **hardcoded in the DOM**—JavaScript currently initializes them
- Ionicons are used for UI elements; check element `name` attributes (e.g., `name="calendar-number-outline"`)
- All measurements use **rem/px mixed** (prefer rem for consistency in future updates)
- The form at the end has no submission handler—implement with caution to avoid data loss
