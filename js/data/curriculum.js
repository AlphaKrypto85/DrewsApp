/**
 * WebCraft Master Curriculum
 * Step-by-step blueprint teaching human web development from scratch.
 */

export const CURRICULUM_MILESTONES = [
  {
    id: 'setup',
    number: 1,
    title: 'Project Architecture & The Mental Model',
    timeEstimate: '20 mins',
    tag: 'Foundations',
    summary: 'Set up your local workspace, understand file paths, and learn how web browsers actually turn code into visual pixels.',
    learningGoals: [
      'Create a standard, professional web project folder structure',
      'Understand the browser rendering loop (HTML DOM + CSSOM = Render Tree)',
      'Master relative file paths (./ vs ../) so images and styles never break',
      'Set up a free local development environment with instant live reload'
    ],
    conceptExplainer: `
      <h3>The Golden Rule: How Browsers Read Your Code</h3>
      <p>A website is not an opaque app or an image. It is simply a collection of plain text files that any browser (Chrome, Safari, Firefox, Edge) knows how to interpret.</p>
      <ul>
        <li><strong>HTML (HyperText Markup Language):</strong> The skeleton. It defines the raw content and meaning: headings, paragraphs, buttons, and links.</li>
        <li><strong>CSS (Cascading Style Sheets):</strong> The skin and clothes. It controls colors, fonts, spacing, layout, and how things look across different screen sizes.</li>
        <li><strong>JavaScript:</strong> The muscles and nervous system. It enables interaction, like clicking a mobile menu button to slide open a drawer or submitting a form without reloading.</li>
      </ul>
      <div class="callout tip">
        <strong>💡 Craft Tip: Avoid AI "Magic Box" Spoilers</strong><br>
        When an AI generates 500 lines of messy code at once, you lose control of your own creation. By typing each block yourself, you develop "code intuition"—you will immediately know where to look when something needs adjusting.
      </div>
    `,
    folderStructure: `my-website/
├── index.html        <-- Your homepage (browsers look for this by default)
├── css/
│   └── style.css     <-- All your styling rules and custom properties
├── js/
│   └── main.js       <-- Interactivity (mobile menu, smooth scroll)
└── images/           <-- Logos, photos, icons (keep filenames lowercase!)`,
    codeSnippet: `<!-- File: index.html -->
<!-- Every web project starts with this minimal handshake: -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>My Project</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>`,
    pitfalls: [
      'Using spaces or uppercase letters in filenames (e.g. "My Cool Site.HTML" instead of "my-cool-site.html"). Spaces turn into messy "%20" in URLs!',
      'Double-clicking an HTML file to open it as "file:///" instead of using a local server. Local servers prevent CORS issues with fonts and icons.',
      'Putting images in your downloads folder instead of inside your project\'s "images/" folder.'
    ],
    actionSteps: [
      'Create a new folder on your computer named after your project (e.g., "bakery-site" or "portfolio").',
      'Download the free editor VS Code (Visual Studio Code).',
      'Install the "Live Server" extension in VS Code for automatic browser refreshes when you save.',
      'Create "index.html", a "css/" folder with "style.css", and an "images/" folder.'
    ]
  },
  {
    id: 'skeleton',
    number: 2,
    title: 'The HTML5 Skeleton & Essential Metadata',
    timeEstimate: '30 mins',
    tag: 'HTML5',
    summary: 'Construct the document head, set up mobile viewport scaling, and wire in Google Fonts and stylesheets.',
    learningGoals: [
      'Understand every required line in the HTML5 <!DOCTYPE> declaration',
      'Learn why the viewport meta tag is non-negotiable for mobile phones',
      'Connect external Google Fonts and your local style.css',
      'Configure SEO title and meta descriptions for search engines'
    ],
    conceptExplainer: `
      <h3>The Anatomy of &lt;head&gt; vs &lt;body&gt;</h3>
      <p>An HTML document has two main chambers:</p>
      <ul>
        <li><strong>&lt;head&gt;:</strong> The control center for the browser. Nothing in here is directly rendered as visual content on the page (except the title bar). It holds character sets, mobile instructions, font links, and CSS connections.</li>
        <li><strong>&lt;body&gt;:</strong> Everything the human visitor sees and touches. Headings, images, buttons, and footers live here.</li>
      </ul>
      <div class="callout warning">
        <strong>⚠️ The Mobile Trap: The Missing Viewport</strong><br>
        If you forget <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code>, smartphones will assume your site was built in 1999 for a 980px desktop screen and zoom out until your text is microscopic!
      </div>
    `,
    codeSnippet: `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- 1. Character encoding (supports emojis and all global alphabets) -->
  <meta charset="UTF-8">

  <!-- 2. Responsive viewport: tells mobile phones to scale 1:1 -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- 3. Title shown in browser tab and Google search results -->
  <title>Maya's Artisanal Bakery | Fresh Sourdough & Pastries</title>

  <!-- 4. Meta description for SEO snippet -->
  <meta name="description" content="Handmade sourdough bread and seasonal pastries baked fresh daily in Portland.">

  <!-- 5. Preconnect to Google Fonts for lightning-fast font loading -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet">

  <!-- 6. Link your external CSS stylesheet -->
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <!-- All visible content will go here -->
</body>
</html>`,
    pitfalls: [
      'Forgetting the `lang="en"` attribute on the `<html>` tag, which hurts screen readers and automated translation.',
      'Writing styles directly in `style="..."` attributes instead of linking `css/style.css`. Keeping CSS separate keeps your project organized and easy to maintain.'
    ],
    actionSteps: [
      'Open your index.html file and type "!" followed by Tab (in VS Code) to get the boilerplate, or paste the snippet above.',
      'Replace the title and description with your website\'s real purpose.',
      'Check your live browser tab to see your new title in action.'
    ]
  },
  {
    id: 'navigation',
    number: 3,
    title: 'The Semantic Header & Responsive Navigation',
    timeEstimate: '45 mins',
    tag: 'HTML & Flexbox',
    summary: 'Build a semantic navigation bar with a brand logo, desktop link list, call-to-action button, and mobile hamburger toggle.',
    learningGoals: [
      'Learn why semantic <header> and <nav> tags beat generic <div> tags',
      'Use CSS Flexbox with justify-content: space-between to align logo and links',
      'Create accessible link targets that smoothly scroll to sections (href="#about")',
      'Build a mobile-friendly hamburger menu toggle button with ARIA attributes'
    ],
    conceptExplainer: `
      <h3>Why Semantic HTML Matters (Don't Be a "Div Soup" Chef)</h3>
      <p>A browser or screen reader doesn't know what a <code>&lt;div class="nav-bar"&gt;</code> is. But when you write <code>&lt;nav&gt;</code>, visually impaired users can jump directly to your menu using assistive technology, and Google understands your site's structure.</p>
      <p>We use <strong>CSS Flexbox</strong> to arrange the navigation bar horizontally with one simple rule: <code>display: flex; justify-content: space-between; align-items: center;</code>. The logo sits on the left, the links sit on the right, and the browser calculates the empty space automatically.</p>
    `,
    codeSnippet: `<!-- In index.html, inside <body>: -->
<header class="site-header">
  <div class="container nav-container">
    <!-- Brand Logo / Name -->
    <a href="#" class="brand-logo">
      <span class="logo-icon">🌿</span> Maya's Bakery
    </a>

    <!-- Navigation Links -->
    <nav class="main-nav" id="mainNav" aria-label="Main Navigation">
      <ul class="nav-links">
        <li><a href="#about" class="nav-link">Our Story</a></li>
        <li><a href="#menu" class="nav-link">Daily Bakes</a></li>
        <li><a href="#reviews" class="nav-link">Reviews</a></li>
        <li><a href="#contact" class="nav-link nav-cta">Find Us</a></li>
      </ul>
    </nav>

    <!-- Mobile Hamburger Toggle Button -->
    <button class="nav-toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">
      <span class="hamburger-bar"></span>
      <span class="hamburger-bar"></span>
      <span class="hamburger-bar"></span>
    </button>
  </div>
</header>`,
    cssSnippet: `/* In css/style.css: */
.site-header {
  position: sticky;
  top: 0;
  background-color: var(--color-surface, #ffffff);
  border-bottom: 1px solid var(--color-border, #e2e8f0);
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.brand-logo {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-link {
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--color-primary);
}

/* Call to action pill button */
.nav-cta {
  background-color: var(--color-primary);
  color: #ffffff !important;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.nav-cta:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-1px);
}`,
    pitfalls: [
      'Using `<div>` for clickable buttons without keyboard accessibility. Always use `<button>` or `<a href="...">`!',
      'Forgetting `position: sticky; top: 0;` if you want the header to stay visible as the user scrolls.',
      'Missing the `list-style: none;` on `<ul>`, leaving awkward bullet points in your menu.'
    ],
    actionSteps: [
      'Add the `<header>` block to your `index.html`.',
      'Add the Flexbox navigation styles to `css/style.css`.',
      'Test clicking the brand logo to make sure it links back to `#` (the top of the page).'
    ]
  },
  {
    id: 'hero',
    number: 4,
    title: 'The Hero Section: Crafting the 3-Second Hook',
    timeEstimate: '45 mins',
    tag: 'Typography & Layout',
    summary: 'Construct the most important real estate on your website: a high-converting hero banner that clearly communicates what you do and drives action.',
    learningGoals: [
      'Apply the 3-Second Value Proposition formula to your headline',
      'Create high-contrast, accessible Call-to-Action (CTA) buttons with hover states',
      'Build a two-column responsive split layout using Flexbox',
      'Establish a visual type hierarchy where headings and body text look balanced'
    ],
    conceptExplainer: `
      <h3>The Anatomy of a High-Converting Hero</h3>
      <p>Visitors decide whether to stay on your site in under 3 seconds. A confusing headline like <em>"Synergistic Paradigms for Tomorrow"</em> causes visitors to bounce. Instead, follow this proven human framework:</p>
      <ol>
        <li><strong>Eyebrow / Badge:</strong> A small, friendly pill indicating your niche or category.</li>
        <li><strong>Headline (H1):</strong> The clear promise or benefit (What you do + Who it is for).</li>
        <li><strong>Subheadline:</strong> 1-2 sentences clarifying how you deliver that promise and what makes you special.</li>
        <li><strong>Action Row:</strong> A primary button (colored) and an optional secondary link (ghost or outlined).</li>
        <li><strong>Visual Anchor:</strong> A high-quality photo, illustration, or interactive preview card.</li>
      </ol>
    `,
    codeSnippet: `<!-- In index.html, right after <header>: -->
<main id="mainContent">
  <section class="hero-section" id="home">
    <div class="container hero-grid">
      <!-- Left Column: Copy & Actions -->
      <div class="hero-content">
        <span class="hero-badge">Organic & Locally Milled</span>
        <h1 class="hero-title">Handmade sourdough & seasonal bakes every morning.</h1>
        <p class="hero-subtitle">
          Slow-fermented for 36 hours using heritage grains and natural wild yeast. Baked in stone hearth ovens at dawn.
        </p>
        <div class="hero-actions">
          <a href="#menu" class="btn btn-primary">Browse Today's Bakes</a>
          <a href="#about" class="btn btn-secondary">Learn Our Process &rarr;</a>
        </div>
        <div class="hero-proof">
          <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          <span>Loved by 1,200+ Portland neighbors</span>
        </div>
      </div>

      <!-- Right Column: Visual Anchor -->
      <div class="hero-visual">
        <div class="hero-card-frame">
          <img src="images/hero-artisan-bread.jpg" alt="Golden brown artisan sourdough loaf on wooden cutting board" class="hero-img" loading="eager">
          <div class="hero-floating-tag">
            <span class="tag-dot"></span> Fresh from oven &bull; 6:00 AM
          </div>
        </div>
      </div>
    </div>
  </section>
</main>`,
    cssSnippet: `/* Hero Section Styling */
.hero-section {
  padding: 5rem 1.5rem;
  background: var(--color-hero-bg, #faf7f2);
  border-bottom: 1px solid var(--color-border);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

/* Two-column layout on desktop screens */
@media (min-width: 768px) {
  .hero-grid {
    grid-template-columns: 1.1fr 0.9fr;
    padding: 2rem 0;
  }
}

.hero-badge {
  display: inline-block;
  padding: 0.35rem 0.85rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-primary);
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 9999px;
  margin-bottom: 1.25rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}

.hero-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw + 1rem, 3.25rem);
  line-height: 1.15;
  color: var(--color-text);
  margin: 0 0 1.25rem 0;
}

.hero-subtitle {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--color-text-muted);
  margin-bottom: 2rem;
  max-width: 540px;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
}

/* Button Component Styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.75rem;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  border-radius: var(--border-radius, 8px);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: var(--color-primary);
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

.btn-secondary {
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background-color: var(--color-surface);
  border-color: var(--color-text-muted);
}`,
    pitfalls: [
      'Using vague headline copy like "Welcome to Our Website". Visitors already know they are on your website—tell them what value they get!',
      'Using low-contrast button colors that fail WCAG standards (e.g. yellow text on a white button).',
      'Forgetting the `alt` attribute on the hero image. Alt text is essential for screen readers and SEO.'
    ],
    actionSteps: [
      'Draft your 3-second value proposition headline.',
      'Add the `<section class="hero-section">` inside your `<main>` tag.',
      'Check how the typography scales when you resize your browser window.'
    ]
  },
  {
    id: 'content-grid',
    number: 5,
    title: 'Content Sections: Mastering Responsive Cards & Grids',
    timeEstimate: '60 mins',
    tag: 'CSS Grid & Flexbox',
    summary: 'Build clean, modular card grids for your features, services, or projects using modern CSS Grid with zero media queries.',
    learningGoals: [
      'Master the magic one-liner: grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))',
      'Structure accessible card components with images, titles, and tags',
      'Add subtle hover micro-interactions (box-shadow lift, image zoom)',
      'Understand the semantic difference between <section> and <article>'
    ],
    conceptExplainer: `
      <h3>The Magic of CSS Grid "Auto-Fit"</h3>
      <p>Before CSS Grid, web developers had to write complicated math with floats and percentages, and adjust them manually for every phone, tablet, and monitor.</p>
      <p>Today, one single CSS rule handles everything automatically:</p>
      <pre><code>display: grid;
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
gap: 1.5rem;</code></pre>
      <p><strong>What this means:</strong> <em>"Fill the row with as many cards as can fit, provided each card is at least 280px wide. If there is extra space, expand each card equally (1fr). If the screen shrinks smaller than 280px, wrap the card onto the next line."</em> It is completely responsive without writing a single media query!</p>
    `,
    codeSnippet: `<!-- Feature / Services Section in index.html: -->
<section class="section" id="services">
  <div class="container">
    <div class="section-header text-center">
      <span class="section-tag">What We Do</span>
      <h2 class="section-title">Baked with pure, uncompromised ingredients</h2>
      <p class="section-desc">We never use artificial conditioners, preservatives, or commercial yeast packets.</p>
    </div>

    <div class="cards-grid">
      <!-- Card 1 -->
      <article class="feature-card">
        <div class="card-icon">&#127806;</div>
        <h3 class="card-title">100% Heritage Grains</h3>
        <p class="card-text">Stone-ground grain sourced directly from independent Pacific Northwest farmers within 150 miles.</p>
      </article>

      <!-- Card 2 -->
      <article class="feature-card">
        <div class="card-icon">&#9201;</div>
        <h3 class="card-title">36-Hour Wild Fermentation</h3>
        <p class="card-text">Long, slow cold-proofing breaks down gluten and phytic acid, making our bread deeply flavorful and gentle on digestion.</p>
      </article>

      <!-- Card 3 -->
      <article class="feature-card">
        <div class="card-icon">&#128293;</div>
        <h3 class="card-title">Stone Hearth Firing</h3>
        <p class="card-text">Baked on raw basalt stone slabs with controlled steam injection for a blistering, crackling, caramel crust.</p>
      </article>
    </div>
  </div>
</section>`,
    cssSnippet: `/* Responsive Cards Grid */
.section {
  padding: 5rem 1.5rem;
}

.section-header {
  max-width: 650px;
  margin: 0 auto 3rem auto;
  text-align: center;
}

.section-tag {
  color: var(--color-primary);
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 2.25rem;
  margin: 0.5rem 0 1rem 0;
  color: var(--color-text);
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius, 8px);
  padding: 2rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.06);
  border-color: var(--color-primary);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.card-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  color: var(--color-text);
  margin-bottom: 0.75rem;
}

.card-text {
  color: var(--color-text-muted);
  line-height: 1.6;
  margin: 0;
}`,
    pitfalls: [
      'Setting a fixed height like `height: 300px;` on cards. If text overflows on mobile, it will spill out awkwardly. Use `min-height` or let padding dictate height.',
      'Using non-semantic `<div>` tags instead of `<article>` for self-contained cards.',
      'Forgetting `gap: 2rem;` and trying to use awkward margins on children instead.'
    ],
    actionSteps: [
      'Write the HTML for your 3 core feature or project cards.',
      'Add the `repeat(auto-fit, minmax(280px, 1fr))` grid rule to your CSS.',
      'Resize your browser window and watch the cards smoothly re-arrange from 3 columns down to 2 and 1!'
    ]
  },
  {
    id: 'forms-interactivity',
    number: 6,
    title: 'Accessible Forms & Zero-Backend Inquiries',
    timeEstimate: '45 mins',
    tag: 'Forms & Accessibility',
    summary: 'Build a contact form that looks great, handles errors gracefully, and receives real emails from visitors without needing your own server.',
    learningGoals: [
      'Connect <label for="..."> with <input id="..."> for WCAG compliance',
      'Use HTML5 input types (email, tel) for automatic mobile keyboards',
      'Hook your form up to Formspree or Web3Forms for free email notifications',
      'Style focus rings (:focus-visible) so keyboard users never get lost'
    ],
    conceptExplainer: `
      <h3>How to Get Form Emails Without Coding a Server</h3>
      <p>Beginners often think: <em>"If I build a contact form, don't I need a Python, PHP, or Node.js database backend to receive messages?"</em></p>
      <p>The answer is <strong>No!</strong> Modern services like <strong>Formspree</strong> (formspree.io) or <strong>Web3Forms</strong> give you a free endpoint URL. When someone submits your form, it posts directly to that endpoint and forwards the message straight to your personal email inbox!</p>
      <div class="callout tip">
        <strong>💡 The Most Common Accessibility Violation in Web Dev</strong><br>
        Placing an input without a matching label. A placeholder like <code>placeholder="Your Email"</code> disappears as soon as someone types! Always use an explicit <code>&lt;label for="userEmail"&gt;Email Address&lt;/label&gt;</code> paired with <code>&lt;input id="userEmail"&gt;</code>.
      </div>
    `,
    codeSnippet: `<!-- Contact Form Section in index.html: -->
<section class="section contact-section" id="contact">
  <div class="container contact-container">
    <div class="contact-info">
      <span class="section-tag">Get in Touch</span>
      <h2 class="section-title">Have a question or custom order?</h2>
      <p>We take special pre-orders for events, wholesale inquiries, and private sourdough workshops.</p>
      <ul class="contact-details">
        <li><strong>Location:</strong> 1422 SE Division St, Portland, OR</li>
        <li><strong>Hours:</strong> Wed - Sun: 7:00 AM - 2:00 PM</li>
        <li><strong>Email:</strong> hello@mayasbakery.com</li>
      </ul>
    </div>

    <!-- Free Formspree Form (Replace with your Formspree ID) -->
    <form class="contact-form" action="https://formspree.io/f/your-form-id" method="POST">
      <div class="form-group">
        <label for="fullName" class="form-label">Your Name <span class="required">*</span></label>
        <input type="text" id="fullName" name="name" class="form-input" placeholder="e.g. Alex Chen" required>
      </div>

      <div class="form-group">
        <label for="emailAddr" class="form-label">Email Address <span class="required">*</span></label>
        <input type="email" id="emailAddr" name="email" class="form-input" placeholder="alex@example.com" required>
      </div>

      <div class="form-group">
        <label for="messageText" class="form-label">Message <span class="required">*</span></label>
        <textarea id="messageText" name="message" class="form-input form-textarea" rows="4" placeholder="Tell us what you need..." required></textarea>
      </div>

      <button type="submit" class="btn btn-primary btn-block">Send Message &rarr;</button>
      <p class="form-note">We respect your privacy. No spam, ever.</p>
    </form>
  </div>
</section>`,
    cssSnippet: `/* Form Styling */
.contact-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

.contact-form {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 2rem;
  border-radius: var(--border-radius, 8px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.03);
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 0.4rem;
}

.required {
  color: #ef4444;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius, 6px);
  font-family: inherit;
  font-size: 1rem;
  color: var(--color-text);
  background: var(--color-bg);
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

/* Beautiful Accessible Focus Ring */
.form-input:focus-visible {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

.form-textarea {
  resize: vertical;
}

.btn-block {
  width: 100%;
}`,
    pitfalls: [
      'Removing focus outlines with `outline: none;` without providing a custom `:focus-visible` ring. This makes your site unusable for keyboard-only visitors.',
      'Using `type="text"` for email inputs instead of `type="email"`. On smartphones, `type="email"` automatically pops up the "@" and ".com" keyboard keys!'
    ],
    actionSteps: [
      'Create your free account at formspree.io and create a new contact form to get your endpoint URL.',
      'Paste your form endpoint into the `action="..."` attribute.',
      'Fill out the form and submit it to see a real email land in your inbox!'
    ]
  },
  {
    id: 'mobile-first-js',
    number: 7,
    title: 'Mobile-First Polish & Vanilla JavaScript Interactivity',
    timeEstimate: '45 mins',
    tag: 'JavaScript & UX',
    summary: 'Write clean, zero-bloat vanilla JavaScript to make your mobile menu toggle smoothly, close when links are clicked, and handle smooth scrolling.',
    learningGoals: [
      'Write event listeners without heavy frameworks (pure vanilla JS)',
      'Toggle active classes to open/close the mobile drawer',
      'Manage ARIA states (aria-expanded="true/false") dynamically',
      'Add native CSS smooth scrolling: scroll-behavior: smooth'
    ],
    conceptExplainer: `
      <h3>Why Vanilla JavaScript is the Superpower of Self-Reliant Devs</h3>
      <p>Modern beginners are often told they need React, Vue, or heavy npm bundles just to toggle a menu. That adds 200 kilobytes of extra code for something you can do in <strong>15 lines of pure, clean JavaScript</strong>!</p>
      <p>Browsers natively understand JavaScript. With three simple concepts:</p>
      <ul>
        <li><code>document.getElementById()</code> &bull; Grab an element from the page</li>
        <li><code>element.addEventListener('click', ...)</code> &bull; Listen for human taps or clicks</li>
        <li><code>element.classList.toggle('active')</code> &bull; Add or remove a CSS class</li>
      </ul>
      <p>You have all the interactivity 95% of websites ever need!</p>
    `,
    codeSnippet: `// In js/main.js:
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  // 1. Toggle mobile menu when hamburger is tapped
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-active');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // 2. Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Optional: Add shadow to navbar on scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  });
});`,
    cssSnippet: `/* Mobile Navigation Drawer styles in css/style.css: */
@media (max-width: 767px) {
  .nav-links {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: var(--color-surface);
    flex-direction: column;
    padding: 2rem 1.5rem;
    gap: 1.5rem;
    border-bottom: 1px solid var(--color-border);
    transform: translateY(-120%);
    transition: transform 0.3s ease-in-out;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }

  .main-nav.is-open .nav-links {
    transform: translateY(0);
  }

  .nav-toggle {
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }

  .hamburger-bar {
    width: 24px;
    height: 2px;
    background: var(--color-text);
    transition: transform 0.25s, opacity 0.25s;
  }
}

@media (min-width: 768px) {
  .nav-toggle {
    display: none; /* Hide hamburger on desktop */
  }
}`,
    pitfalls: [
      'Putting script tags in the `<head>` without `defer`, causing JavaScript to execute before the HTML elements exist in the DOM.',
      'Forgetting to close the menu when a link is clicked, leaving the mobile overlay stuck over the content.',
      'Overcomplicating animations with external libraries when native CSS `transition` does it better at 60fps.'
    ],
    actionSteps: [
      'Create `js/main.js` and paste the script above.',
      'Add `<script src="js/main.js" defer></script>` at the bottom of your HTML.',
      'Test your hamburger menu by shrinking your browser or testing in DevTools Device Mode (Ctrl+Shift+M).'
    ]
  },
  {
    id: 'launch',
    number: 8,
    title: 'Publishing to the Live Web (100% Free Hosting)',
    timeEstimate: '20 mins',
    tag: 'Deployment & Domains',
    summary: 'Deploy your hand-crafted website to a blazing-fast global CDN for free with automatic SSL (https://), and connect a custom domain name.',
    learningGoals: [
      'Deploy your website in 10 seconds with zero terminal commands using Netlify Drop',
      'Learn how GitHub Pages hosts your repository directly from your git commits',
      'Understand how Domain Name Servers (DNS), A Records, and CNAME work',
      'Run an automated Lighthouse audit to verify 100/100 performance and accessibility'
    ],
    conceptExplainer: `
      <h3>How Modern Web Hosting Works (You Don't Need an Expensive Server)</h3>
      <p>Because your website is built with clean, authentic HTML, CSS, and JavaScript, it is a <strong>Static Website</strong>. Static sites do not need a slow database or expensive PHP hosting.</p>
      <p>Global CDNs (Content Delivery Networks) like <strong>Netlify</strong>, <strong>Vercel</strong>, and <strong>GitHub Pages</strong> copy your files to hundreds of edge servers around the world. When a visitor loads your site, it downloads instantly from the server nearest to them!</p>
      <div class="callout tip">
        <strong>🚀 Option A: The 10-Second Drag & Drop (Netlify Drop)</strong><br>
        Go to <code>app.netlify.com/drop</code>. Simply drag your project folder and drop it onto the browser window. Within 10 seconds, Netlify assigns you a live public URL (e.g. <code>happy-bakery-123.netlify.app</code>) with a free SSL certificate!
      </div>
    `,
    codeSnippet: `<!-- Verify your site's SEO & Social Sharing preview before launching: -->
<!-- Place these Open Graph tags in your <head>: -->
<meta property="og:title" content="Maya's Artisanal Bakery">
<meta property="og:description" content="Handmade sourdough and seasonal pastries baked fresh daily in Portland.">
<meta property="og:image" content="https://yourdomain.com/images/social-preview.jpg">
<meta property="og:url" content="https://yourdomain.com">
<meta name="twitter:card" content="summary_large_image">`,
    pitfalls: [
      'Uploading a parent folder that contains another folder, causing the URL to be `site.com/my-folder/index.html`. Always ensure `index.html` is at the root level!',
      'Using mixed-case image names that work on Windows but break on Linux CDN servers (Windows is case-insensitive, but web servers are case-sensitive!).'
    ],
    actionSteps: [
      'Do a final review of your site in Chrome or Edge.',
      'Press F12, open the "Lighthouse" tab, and click "Analyze page load". Aim for high green scores (95+)!',
      'Visit app.netlify.com/drop and drag your folder onto the upload zone.',
      'Celebrate! You built an authentic, lightning-fast website from scratch with your own hands! 🎉'
    ]
  }
];
