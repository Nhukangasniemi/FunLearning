---
name: BerryQuest Kids
colors:
  surface: '#fdf7ff'
  surface-dim: '#dfd4fc'
  surface-bright: '#fdf7ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f1ff'
  surface-container: '#f2eaff'
  surface-container-high: '#ede4ff'
  surface-container-highest: '#e8deff'
  on-surface: '#1e1734'
  on-surface-variant: '#5b4043'
  inverse-surface: '#332c4b'
  inverse-on-surface: '#f5eeff'
  outline: '#8f6f73'
  outline-variant: '#e3bdc1'
  surface-tint: '#bd0049'
  primary: '#b80047'
  on-primary: '#ffffff'
  primary-container: '#de235e'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb2bd'
  secondary: '#710fe5'
  on-secondary: '#ffffff'
  secondary-container: '#8b3dff'
  on-secondary-container: '#faf1ff'
  tertiary: '#006947'
  on-tertiary: '#ffffff'
  tertiary-container: '#00855b'
  on-tertiary-container: '#f5fff6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9dd'
  primary-fixed-dim: '#ffb2bd'
  on-primary-fixed: '#400013'
  on-primary-fixed-variant: '#900036'
  secondary-fixed: '#ebdcff'
  secondary-fixed-dim: '#d4bbff'
  on-secondary-fixed: '#270058'
  on-secondary-fixed-variant: '#5d00c2'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#fdf7ff'
  on-background: '#1e1734'
  surface-variant: '#e8deff'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
  label-phonics:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.08em
  label-badge:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2.5rem
  space-xs: 0.375rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system delivers a gamified, joyful, and curriculum-aligned English language learning experience for young learners aged 6–13 progressing through Cambridge Young Learners English (Pre-A1 Starters, A1 Movers, A2 Flyers).

The emotional tone balances high-energy playfulness with reassuring educational clarity. Children experience an interactive playground with cheerful mascot companions, tactile physical buttons, instant audio feedback, and celebration rewards. Parents and educators encounter an organized, credible, and trustworthy pedagogical tool.

### Design Movement & Influence
- **Tactile / Skeuomorphic Modernism:** Chunky, pillowy buttons with subtle inner highlights and dimensional bottom-edge depths that beg to be tapped.
- **Candy Pastel Glass & Cards:** Soft, luminous white surfaces elevated by delicate pastel gradients (blush pink, soft lavender, whipped cream) paired with crisp, high-clarity typography.
- **Gamified Toy Aesthetic:** Smooth pebble curves, squishy state changes, bubbly mascot interaction frames, and vibrant candy-fruit badge accents.

## Colors

The palette balances energetic fruit and candy primaries with gentle, non-fatiguing pastel backgrounds to allow sustained reading and engagement for children.

### Palette Roles
- **Primary (`#E82C64` - Strawberry Magenta):** Anchors primary brand actions, interactive prompts, phonetic syllable emphasis, and celebratory focus points.
- **Secondary (`#8B3DFF` - Electric Violet):** Drives game mechanics, active tabs, AI-assisted storytelling actions, and quest progression states.
- **Tertiary (`#10B981` - Crisp Mint):** Represents positive feedback, sound status indicators, completed quests, and "feed/submit" success actions.
- **Accent Amber (`#F59E0B` - Sunny Honey):** Powers star counters, reward coins, trophy streaks, and Cambridge PRO badges.
- **Surface & Canvas:** Base canvas uses soft tinted whites (`#F9FAFD`) layered with warm blush clouds (`#FFF1F5`) and cool lavender tints (`#F5F3FF`).
- **Neutral Foreground (`#241D3B` - Deep Midnight Plum):** Ensures friendly yet compliant AA/AAA legibility for child readers without the harsh contrast of pitch black.

## Typography

Typography prioritizes open counters, friendly geometric shapes, and instant phonetic recognition. `Plus Jakarta Sans` provides child-friendly letterforms with sturdy terminal strokes and disambiguated glyphs.

### Typographic Treatments
- **Phonics & Syllable Breaks:** Formatted in `label-phonics` with wide tracking (`0.08em`) and colored highlight tokens to assist early readers with word decomposition (`sau · sa · ges`).
- **Headings & Badges:** Rounded, prominent weights (`700` and `800`) provide joyful clarity across flashcards and interactive stages.
- **Numbers & Gamification Stats:** Star counts, level ranks, and timers utilize tabular numbers set in bold weights for rapid scanning.

## Layout & Spacing

The layout is built on a responsive 12-column adaptive fluid grid. The interface supports single-hand tablet usage and large touch-screen interactions for children.

### Breakpoints & Reflow
- **Mobile (< 640px):** Single-column stack. Flashcard grids collapse to 2 columns with generous vertical tap targets (minimum 48px height). Top game status bars condense into horizontal pill carousels.
- **Tablet (640px – 1024px):** 8-column layout. Activity dashboard features a sticky sidebar for character interaction alongside a 3-column vocabulary flashcard grid.
- **Desktop (> 1024px):** 12-column layout. Character stage and speech prompt occupy 4 columns on the left; the 8-column interactive zone organizes word cards into comfortable 4-column item grids with dedicated action trays anchored below.

## Elevation & Depth

Visual depth reinforces physical playfulness without overwhelming young eyes. Elevation avoids cold, dark dropshadows, relying instead on soft color-tinted ambient glows and tactile bottom bevels.

### Depth Layers
- **Ground Floor (Base Canvas):** Light pastel wash with subtle organic radial highlights centered behind learning targets.
- **Card Tier (Elevation 1):** Flat pure-white (`#FFFFFF`) cards resting on a soft strawberry-tinted ambient veil (`0px 8px 24px -4px rgba(232, 44, 100, 0.06)`), bounded by a hairline border (`1.5px solid #F1F3F9`).
- **Interactive Floating Tier (Elevation 2):** Flashcards and popover dialogues elevated by crisp bottom shadows (`0px 10px 28px -6px rgba(44, 30, 80, 0.08)`).
- **Physical Push Depth (Tactile Buttons):** Primary buttons use a bottom physical edge (e.g., `box-shadow: 0 4px 0 #C4184F`) that depresses flat (`translateY(3px)` with `box-shadow: 0 1px 0 #C4184F`) when pressed.

## Shapes

The shape vocabulary uses an organic, friendly curvature to prevent sharp edges and mimic high-grade educational toys.

### Curvature Principles
- **Flashcards & Mascot Stages:** Generous `2rem` to `2.5rem` radii create inviting "play mats" that frame illustrations comfortably.
- **Interactive Buttons & Badges:** Full pill-shapes (`9999px`) for controls, category switchers, audio triggers, and coin chips.
- **Dialogues & Speech Bubbles:** Pillowy `1.5rem` cards accented with subtle curved SVG tail pointers directing attention to Lily and accompanying mascots.

## Components

### Vocabulary Flashcards
- Crisp white rounded cards (`border-radius: 1.75rem`) with generous internal breathing room (`space-lg`).
- Centered 3D or vector food/object illustration (minimum 72x72px bounding box).
- English vocabulary name in `headline-md`, followed by phonetically hyphenated guide in `label-phonics` with strawberry accent dots.
- Bottom reference chip (`bg-blue-50`, text in Cambridge blue `#2563EB`) stating syllabus page references.
- Hover & active states: Micro scale-up (`scale(1.03)`), gentle lift, and audible cue trigger.

### Tactile Buttons
- **Primary / Call-to-Action:** Vivid Strawberry or Mint gradient fills, white text, bold tracking, tactile 4px bottom bevel, and emoji accents.
- **Audio Hint Buttons:** Soft tinted capsules (e.g., `#FEF3C7` Amber or `#ECFDF5` Mint) with dynamic soundwave or speaker icons and prompt label ("Tap to listen").
- **Secondary Actions:** White pills with subtle `1.5px` border in `#E2E8F0` and soft slate text (`#475569`).

### Gamification & Header Chips
- **Star Counter:** Golden pill badge (`#FEF3C7`) with 3D star icon, bold count (`#92400E`), and coin collection burst animation.
- **Sound & Mode Toggles:** High-contrast pill chips with clear status text ("Sound ON") paired with green/gray auditory indicators.
- **Parent Portal Action:** Neutral, quiet pill with minimal icon footprint to avoid child misclicks.

### Category Segment Controls
- Smooth pill-shaped pill track container (`#F1F5F9`) with sliding active pill caps. Active state carries a bold gradient fill (`#8B3DFF` to `#E82C64`) with crisp white typography.

### Mascot Stage & Speech Bubbles
- Mascot portrait centered within a soft glowing frame.
- Speech bubble wrapped in warm gold border (`#FDE68A`) with an amber speech pointer. Includes embedded audio replay capsule for non-fluent readers.
- Bottom action button to trigger friendly greetings ("Wave & Say Hello! 👋").

### Interactive Plate & Drop Targets
- Large circular drop mat (`border-radius: 9999px`) styled with soft concentric rings (`#E2E8F0`) indicating empty/ready states.
- Receptive drag-and-drop or tap-to-add transitions with cheerful floating badge count updates.