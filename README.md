# WebCraft Studio 🛠️
> **Learn to build authentic websites from scratch with your own two hands — no AI black boxes, no opaque template generators. Pure craft.**

---

## 💡 About The App

**WebCraft Studio** is an interactive web development mentor and blueprint studio. Instead of an AI spitting out 500 lines of spaghetti code that you don't understand, WebCraft Studio asks about the website you want to build and creates a personalized, step-by-step master curriculum tailored to your specific project.

It provides concrete recommendations on:
- **Semantic HTML Architecture:** Learn *why* semantic tags (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`) beat generic `<div>` soup.
- **Color Systems & WCAG Math:** Curated, harmonious palettes with live WCAG 2.1 contrast ratio calculations (AA and AAA rating tests).
- **Typography Pairing & Modular Scales:** Google Fonts pairings (heading vs body) and accessible `rem` type scales.
- **Wireframes & Layout Blueprints:** 2D interactive wireframes with Desktop (1200px) and Mobile (375px) toggles, plus a clear "Flexbox vs CSS Grid" decision tree.
- **Human Content & Copywriting Formulas:** Say goodbye to "Lorem Ipsum". Get 3-second hero headline formulas, value proposition builders, and feature-versus-benefit frameworks.
- **Live In-Browser Code Playground:** Tabbed editor (HTML, CSS, JS) with a live sandboxed preview and a built-in **Code Health & Accessibility Inspector** that audits your markup like a senior developer.
- **Visual Concept Studios:** Interactive sliders to visually understand the **CSS Box Model** (`margin`, `border`, `padding`, `content`, and `box-sizing`) and the **Flexbox Playground** (main vs cross axes, flex-direction, justify-content, align-items, gap).
- **Export & Starter Kits:** One-click download of a clean customized project `.zip` bundle or an offline Markdown Developer Handbook.

---

## 🚀 Quick Start (Instant Launch)

You can run WebCraft Studio immediately using Node.js or Python without installing any external npm dependencies:

### Option 1: Node.js (Recommended)
```bash
npm start
# or
node server.js
```
Open your browser to: **[http://localhost:3000](http://localhost:3000)**

### Option 2: Python
```bash
python -m http.server 3000
```
Open your browser to: **[http://localhost:3000](http://localhost:3000)**

### Option 3: Direct Browser Launch
Simply double-click `index.html` in your file explorer to open it directly in Chrome, Edge, Safari, or Firefox!

---

## 🗂️ Project Architecture

```
DrewsApp/
├── index.html                   # Main application entry point
├── server.js                    # Built-in zero-dependency local web server
├── package.json                 # Project configuration
├── README.md                    # Project documentation
├── css/
│   ├── main.css                 # Design system, theme variables, reset
│   ├── wizard.css               # Intake questionnaire & card styles
│   ├── blueprint.css            # 8-milestone curriculum, code showcase
│   ├── playground.css           # Live code editor, preview iframe, inspector
│   └── visual-labs.css          # Interactive Box Model & Flexbox visualizers
└── js/
    ├── app.js                   # Application coordinator & state routing
    ├── data/
    │   ├── presets.js           # Categories, color palettes, fonts, copy formulas
    │   ├── curriculum.js        # Deep step-by-step milestones & pitfall alerts
    │   └── code-templates.js    # Bespoke HTML/CSS/JS generator engine
    ├── modules/
    │   ├── wizard.js            # Site specification intake wizard
    │   ├── blueprint-view.js    # Master roadmap & progress tracking view
    │   ├── design-system.js     # Color tokens, contrast checker, type scale
    │   ├── wireframe-view.js    # 2D visual layout diagram & responsive wireframe
    │   ├── content-studio.js    # Human copywriting frameworks & value prop builder
    │   ├── code-playground.js   # Live sandbox with real-time preview & auditor
    │   ├── visual-labs.js       # Interactive Box Model & Flexbox simulator
    │   └── exporter.js          # Pure-client ZIP packager & handbook exporter
    └── utils/
        ├── contrast.js          # WCAG 2.1 luminance and contrast math
        ├── zip-writer.js        # Pure JavaScript ZIP archive generator
        └── storage.js           # LocalStorage persistence manager
```

---

## 🛠️ The 8-Milestone Curriculum Taught in the App

1. **Milestone 1: Project Setup & The Mental Model** — Folder structures, relative paths (`./` vs `../`), and how browsers turn text files into DOM trees and pixels.
2. **Milestone 2: The HTML5 Document Skeleton** — `<!DOCTYPE html>`, why the viewport meta tag is essential for mobile phones, and connecting Google Fonts.
3. **Milestone 3: The Semantic Header & Navigation** — Semantic `<header>` and `<nav>`, CSS Flexbox alignment, and mobile hamburger buttons.
4. **Milestone 4: The Hero Section** — The 3-second value hook, type scale hierarchy, accessible CTA buttons with hover/focus states, and split layouts.
5. **Milestone 5: Content Sections & Responsive Cards** — CSS Grid `repeat(auto-fit, minmax(280px, 1fr))` without media queries, micro-interactions, and `<article>` tags.
6. **Milestone 6: Accessible Forms & Zero-Backend Inquiries** — Connecting `<label for>` with `<input id>`, mobile keyboard types (`type="email"`), and receiving messages for free via Formspree.
7. **Milestone 7: Mobile-First Polish & Vanilla JavaScript** — 15 lines of pure JavaScript for mobile drawer toggles, smooth scroll, and clean class manipulation without npm bundles.
8. **Milestone 8: Launching to the Real Web (100% Free)** — Drag-and-drop global CDN hosting via Netlify Drop, GitHub Pages, and custom domain setup.

---

## 🌟 Philosophy

> "Give a person an AI-generated site, and they have code they cannot fix. Teach a person the fundamentals of HTML, CSS, and JavaScript, and they can build whatever they can imagine."
