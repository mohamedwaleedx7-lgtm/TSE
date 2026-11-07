---
name: Stitch | ستيتش
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#bdc8d1'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#87929a'
  outline-variant: '#3e484f'
  surface-tint: '#7bd0ff'
  primary: '#8ed5ff'
  on-primary: '#00354a'
  primary-container: '#38bdf8'
  on-primary-container: '#004965'
  inverse-primary: '#00668a'
  secondary: '#93ccff'
  on-secondary: '#003351'
  secondary-container: '#3198dc'
  on-secondary-container: '#002c47'
  tertiary: '#ffc174'
  on-tertiary: '#472a00'
  tertiary-container: '#f59e0b'
  on-tertiary-container: '#613b00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c4e7ff'
  primary-fixed-dim: '#7bd0ff'
  on-primary-fixed: '#001e2c'
  on-primary-fixed-variant: '#004c69'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-lg:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  display-lg-mobile:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Outfit
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  headline-sm:
    fontFamily: Outfit
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Outfit
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system establishes a high-end culinary atmosphere tailored for an immersive digital dining experience. It fuses sharp geometric display framing with glowing cyan glassmorphism over deep slate substrates. The visual language conveys exclusivity, technical precision, and modern hospitality.

### Target Audience & Aesthetic Sensibility
Targeted at discerning diners who appreciate gastronomy and refined visual presentation. The interface invokes the feeling of dining in an intimate, dimly lit luxury lounge where ambient neon lighting traces sharp architectural forms.

### Design Movement: Luminous Dark Glassmorphism
The aesthetic relies on multi-layered optical depth:
- **Translucent Obsidian Slabs:** Backgrounds allow subtle backdrop blurs (`backdrop-filter: blur(16px)`), giving surfaces the texture of smoked acoustic crystal.
- **Cyan Edge Glows:** Ultra-fine, glowing border rules that mimic light piped through polished acrylic.
- **Warm Culinary Accents:** Intentional touches of rich amber and gold to highlight culinary achievements, chef recommendations, and spice indicators without breaking the cool nocturnal canvas.

## Colors

The palette leverages high-contrast luminescence against deep twilight foundations to emphasize gastronomy photography and dish descriptions.

### Palette Architecture
- **Primary (`#38bdf8` - Sky Cyan):** The signature electric accent. Used for interactive states, focal highlights, active navigation nodes, and ambient edge illumination.
- **Secondary (`#0284c7` - Deep Ocean Cyan):** Used for structural contrast, layered gradient depth, button hover foundations, and sub-surface glows.
- **Tertiary (`#f59e0b` - Amber Gold):** Reserved strictly for prestige signifiers: Michelin/chef badges, star ratings, specialty tags (e.g., "الأكثر طلباً"), and warm nutritional highlights.
- **Neutral Canvas (`#0f172a` - Deep Charcoal Navy):** The absolute grounding canvas, complemented by layered elevation tokens:
  - `surface-base`: `#0b1120` (Underlying viewport canvas)
  - `surface-container`: `#0f172a` with 80% opacity
  - `surface-elevated`: `#1e293b` with 65% opacity
- **Content Neutrals:**
  - `text-primary`: `#f8fafc` (Ultra-crisp off-white for titles and prices)
  - `text-secondary`: `#94a3b8` (Muted slate for bilingual ingredients, pairings, and calorie info)
  - `text-tertiary`: `#64748b` (Subtle metadata and inactive toggles)

### Semantic Glow Tokens
- `cyan-glow`: `0 0 24px -4px rgba(56, 189, 248, 0.35)`
- `amber-glow`: `0 0 20px -4px rgba(245, 158, 11, 0.30)`

## Typography

The typographical hierarchy is engineered for bilingual rhythm (English and Arabic), handling RTL-first layouts seamlessly.

### Type Pairings & Editorial Voice
- **Headlines & Badges (`Outfit`):** Provides a bold geometric profile, delivering architectural balance to menu section headers, course names, and pricing numerals. When localized to Arabic, pair directly with a geometric Naskh variant with matched cap-height.
- **Narrative & Descriptions (`Manrope`):** Delivers open counters and neutral legibility for multi-line ingredient manifests, dietary advisories, and preparation notes across low-light environments.

### Typographic Rules
- Numerals for prices and metrics utilize tabular layout figures (`font-variant-numeric: tabular-nums`) with `Outfit` medium weights.
- All badges and category labels use explicit tracking (`letter-spacing: 0.04em`) in Latin text, translated to standard kerning in RTL Arabic scripts.

## Layout & Spacing

The layout employs an RTL-first fluid grid optimized for mobile and tabletop ordering tablets.

### Responsive Grids & Structural Containers
- **Mobile (< 768px):** 4-column fluid layout with `margin: 1rem` and `gutter: 1.25rem`. Content stacks vertically, prioritizing food visuals and condensed item specs.
- **Tablet & In-Dining Displays (768px - 1024px):** 8-column layout with `gutter: 1.5rem`. Enables dual-column menu structures (visual card alongside detail panel).
- **Desktop & Widescreen (> 1024px):** 12-column layout capped at an absolute max-width of `1340px`, featuring a persistent sticky category rail on the right (in RTL mode) and a floating order tray on the left.

### Directional Awareness (RTL Core)
All margin and padding tokens leverage logical CSS properties (`padding-inline-start`, `margin-inline-end`). Alignment begins on the right edge, ensuring native visual scanning for Arabic menus while gracefully inverting when toggled to English.

## Elevation & Depth

Visual hierarchy does not rely on opaque material drop shadows; it is constructed through luminous optical glass tiers and ambient back-glows.

### Tiered Elevation Matrix
1. **Level 0 (Canvas):** `#0b1120` solid backdrop with an ambient cyan radial gradient anchored to the top-right corner (`background: radial-gradient(circle at top right, rgba(56, 189, 248, 0.08), transparent 60%)`).
2. **Level 1 (Menu Item Cards):** `#0f172a` rendered at 70% opacity, paired with `backdrop-filter: blur(16px)` and a directional border: `1px solid rgba(255, 255, 255, 0.08)`.
3. **Level 2 (Hovered / Selected Dish):** Elevated via `rgba(30, 41, 59, 0.85)`, accompanied by an outer cyan hairline illumination: `border-color: rgba(56, 189, 248, 0.4)` and `box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.7), 0 0 16px -2px rgba(56, 189, 248, 0.2)`.
4. **Level 3 (Modal Sheets & Side Drawers):** `#0f172a` at 92% opacity, blurred with `backdrop-filter: blur(28px)`, framed by `1px solid rgba(56, 189, 248, 0.25)` and a heavy cast shadow `0 24px 64px -12px rgba(0, 0, 0, 0.85)`.

## Shapes

The design system enforces a tailored roundedness index (`2`), producing a contemporary architecture that feels ergonomic without losing structural integrity.

### Corner Radius System
- **Compact UI Elements (Buttons, Inputs, Badges):** `rounded-md` (`0.5rem` / `8px`).
- **Standard Cards & Menu Slabs:** `rounded-lg` (`1rem` / `16px`).
- **Interactive Modals, Full Drawers & Featured Course Banners:** `rounded-xl` (`1.5rem` / `24px`).
- **Interactive Floating Pills & Category Filters:** Fully rounded capsule styling (`border-radius: 9999px`).

## Components

### Dish Presentation Cards
- **Structure:** Encased in glass panels (`rounded-lg`). Top half anchors photography with an integrated 16:10 aspect ratio and subtle bottom vignette (`linear-gradient(to top, #0f172a, transparent)`).
- **Interactive Trigger:** Active states trigger a scale transformation (`scale: 1.015`) and a cyan border highlight (`rgba(56, 189, 248, 0.45)`).
- **Price Block:** Positioned at the terminal inline edge, styled in `Outfit` Semibold `#38bdf8`.

### Status Badges & Dietary Markers
- **Best Seller (الأكثر طلباً):** Amber fill (`rgba(245, 158, 11, 0.12)`), text `#f59e0b`, border `1px solid rgba(245, 158, 11, 0.3)`.
- **Spicy (حار):** Deep crimson/coral tint (`rgba(239, 68, 68, 0.12)`), text `#f87171`, border `1px solid rgba(239, 68, 68, 0.3)`.
- **Vegetarian / Vegan (نباتي):** Emerald glow tint (`rgba(16, 185, 129, 0.12)`), text `#34d399`, border `1px solid rgba(16, 185, 129, 0.3)`.

### Buttons & Interactive Controls
- **Primary Order Button:** Gradient fill from `#38bdf8` to `#0284c7`, text `#0f172a` (Ultra-contrast dark slate), `font-weight: 600`, elevated with `cyan-glow`.
- **Ghost / Quantity Modifiers:** Translucent background (`rgba(255, 255, 255, 0.05)`), border `1px solid rgba(255, 255, 255, 0.12)`, hover state lifts border to primary cyan.

### Category Filter Chips
- Capsule-shaped (`9999px`) scrolling horizontal rail.
- Inactive: Frosted glass surface, muted slate text (`#94a3b8`).
- Selected: Solid `#38bdf8` background, `#0b1120` deep text, backed by an ambient glow.

### Dish Customization Drawer
- Slides upward from bottom on mobile; glides in from the trailing inline edge on widescreen.
- Features blurred translucent background (`backdrop-filter: blur(28px)`), sticky footer checkout button, and crisp ingredient selection checkboxes styled with cyan check indicators and amber upsell badges.