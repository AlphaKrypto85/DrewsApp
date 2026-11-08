/**
 * Dynamic Code Generator
 * Generates bespoke, accessible, cleanly indented HTML, CSS, and JS
 * based on the user's tailored inputs, colors, fonts, and sections.
 */

export function generateCompleteHtml(project) {
  const { name, type, vibe, sections = [] } = project;
  const colors = vibe.colors;
  const typo = vibe.typography;

  const hasSection = (id) => sections.includes(id);

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(name)}</title>
  <meta name="description" content="Welcome to ${escapeHtml(name)} - Handcrafted with clean HTML, CSS, and JavaScript.">

  <!-- Google Fonts: ${typo.headingFont} & ${typo.bodyFont} -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${typo.googleFontsUrl}" rel="stylesheet">

  <link rel="stylesheet" href="css/style.css">
</head>
<body>
`;

  // 1. Navigation
  if (hasSection('nav')) {
    html += `  <!-- Main Navigation Header -->
  <header class="site-header">
    <div class="container nav-container">
      <a href="#" class="brand-logo">
        <span class="logo-mark">&diams;</span> ${escapeHtml(name)}
      </a>
      <nav class="main-nav" id="mainNav" aria-label="Main Navigation">
        <ul class="nav-links">
${hasSection('about') ? '          <li><a href="#about" class="nav-link">About</a></li>\n' : ''}${hasSection('features') ? '          <li><a href="#features" class="nav-link">Services</a></li>\n' : ''}${hasSection('projects') ? '          <li><a href="#projects" class="nav-link">Work</a></li>\n' : ''}${hasSection('gallery') ? '          <li><a href="#gallery" class="nav-link">Gallery</a></li>\n' : ''}${hasSection('menu') ? '          <li><a href="#menu" class="nav-link">Menu</a></li>\n' : ''}${hasSection('pricing') ? '          <li><a href="#pricing" class="nav-link">Pricing</a></li>\n' : ''}${hasSection('faq') ? '          <li><a href="#faq" class="nav-link">FAQ</a></li>\n' : ''}${hasSection('contact') ? '          <li><a href="#contact" class="nav-link nav-cta">Contact Us</a></li>\n' : ''}        </ul>
      </nav>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation menu" aria-expanded="false">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
    </div>
  </header>
`;
  }

  html += `\n  <main id="mainContent">\n`;

  // 2. Hero Section
  if (hasSection('hero')) {
    const heroCopy = project.customHero || type.heroPlaceholder;
    html += `    <!-- Hero Section -->
    <section class="hero-section" id="hero">
      <div class="container hero-grid">
        <div class="hero-text">
          <span class="badge">${escapeHtml(type.badge)}</span>
          <h1 class="hero-title">${escapeHtml(heroCopy.headline)}</h1>
          <p class="hero-subtitle">${escapeHtml(heroCopy.subhead)}</p>
          <div class="hero-actions">
            <a href="#${hasSection('contact') ? 'contact' : 'features'}" class="btn btn-primary">${escapeHtml(heroCopy.cta)}</a>
            ${hasSection('about') ? '<a href="#about" class="btn btn-secondary">Learn More &rarr;</a>' : ''}
          </div>
        </div>
        <div class="hero-visual">
          <div class="visual-card">
            <div class="visual-placeholder">
              <span class="visual-icon">&starf;</span>
              <p class="visual-caption">Handcrafted Digital Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>\n\n`;
  }

  // 3. Features / Services
  if (hasSection('features')) {
    html += `    <!-- Features & Services Grid -->
    <section class="section" id="features">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Core Offerings</span>
          <h2 class="section-title">Designed with focus, built to last</h2>
          <p class="section-desc">Every element is shaped with attention to detail, functionality, and lasting quality.</p>
        </div>
        <div class="cards-grid">
          <article class="feature-card">
            <div class="card-icon">&bull;</div>
            <h3 class="card-title">Crafted From First Principles</h3>
            <p class="card-text">Built using authentic semantic HTML and modern CSS without unnecessary dependencies.</p>
          </article>
          <article class="feature-card">
            <div class="card-icon">&hearts;</div>
            <h3 class="card-title">Accessible & Fast</h3>
            <p class="card-text">Engineered to load instantly on any connection and work gracefully for all visitors.</p>
          </article>
          <article class="feature-card">
            <div class="card-icon">&diams;</div>
            <h3 class="card-title">Responsive By Design</h3>
            <p class="card-text">Adapts seamlessly from mobile screens to ultra-wide desktop monitors without breaking.</p>
          </article>
        </div>
      </div>
    </section>\n\n`;
  }

  // 4. About Section
  if (hasSection('about')) {
    html += `    <!-- About / Story Section -->
    <section class="section bg-alt" id="about">
      <div class="container split-grid">
        <div class="split-visual">
          <div class="about-frame">
            <div class="frame-content">
              <h3>Our Philosophy</h3>
              <p>"Simplicity is the prerequisite for reliability."</p>
            </div>
          </div>
        </div>
        <div class="split-content">
          <span class="section-tag">Our Story</span>
          <h2 class="section-title">Rooted in genuine craft and human care</h2>
          <p class="paragraph">
            We believe the modern web works best when it is built with intention. Rather than relying on generic automated templates, we shape every curve, word, and interaction with purpose.
          </p>
          <p class="paragraph">
            Whether you are visiting for the first time or returning, our mission is to provide an authentic, dependable, and enjoyable experience.
          </p>
          <div class="about-stats">
            <div class="stat-item">
              <span class="stat-number">100%</span>
              <span class="stat-label">Handcrafted</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">&lt;0.5s</span>
              <span class="stat-label">Fast Load Time</span>
            </div>
          </div>
        </div>
      </div>
    </section>\n\n`;
  }

  // 5. Projects / Case Studies
  if (hasSection('projects')) {
    html += `    <!-- Projects Showcase -->
    <section class="section" id="projects">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Selected Works</span>
          <h2 class="section-title">Recent Work & Milestones</h2>
          <p class="section-desc">A snapshot of things we have built, designed, and brought to life.</p>
        </div>
        <div class="cards-grid">
          <article class="project-card">
            <div class="project-thumb"><span>Project Alpha</span></div>
            <div class="project-body">
              <span class="project-tag">Design System</span>
              <h3 class="card-title">High-Performance Web App</h3>
              <p class="card-text">Custom architecture delivering sub-second response times and 100/100 Lighthouse score.</p>
              <a href="#" class="project-link">View Case Study &rarr;</a>
            </div>
          </article>
          <article class="project-card">
            <div class="project-thumb"><span>Project Beta</span></div>
            <div class="project-body">
              <span class="project-tag">Branding & UX</span>
              <h3 class="card-title">Editorial Publication</h3>
              <p class="card-text">Fluid typography, responsive reading layouts, and accessible color harmony.</p>
              <a href="#" class="project-link">View Case Study &rarr;</a>
            </div>
          </article>
        </div>
      </div>
    </section>\n\n`;
  }

  // 6. Testimonials
  if (hasSection('testimonials')) {
    html += `    <!-- Testimonials / Social Proof -->
    <section class="section bg-alt" id="testimonials">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Word of Mouth</span>
          <h2 class="section-title">What people are saying</h2>
        </div>
        <div class="cards-grid">
          <blockquote class="testimonial-card">
            <p class="quote-text">"Working with them was the best decision we made. Clean communication, clear steps, and zero headaches."</p>
            <footer class="quote-footer">
              <strong>Elena Rostova</strong> &bull; Product Director
            </footer>
          </blockquote>
          <blockquote class="testimonial-card">
            <p class="quote-text">"The site is blazingly fast and customers love how intuitive everything feels. Highly recommended!"</p>
            <footer class="quote-footer">
              <strong>Marcus Sterling</strong> &bull; Small Business Owner
            </footer>
          </blockquote>
        </div>
      </div>
    </section>\n\n`;
  }

  // 7. Pricing
  if (hasSection('pricing')) {
    html += `    <!-- Pricing Plans -->
    <section class="section" id="pricing">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">Transparent Value</span>
          <h2 class="section-title">Simple, straightforward pricing</h2>
        </div>
        <div class="pricing-grid">
          <div class="pricing-card">
            <h3 class="plan-name">Starter</h3>
            <div class="plan-price">$29<span>/mo</span></div>
            <ul class="plan-features">
              <li>&check; Core features included</li>
              <li>&check; Responsive mobile design</li>
              <li>&check; Email support</li>
            </ul>
            <a href="#contact" class="btn btn-secondary btn-block">Get Started</a>
          </div>
          <div class="pricing-card featured">
            <div class="popular-badge">Most Popular</div>
            <h3 class="plan-name">Professional</h3>
            <div class="plan-price">$79<span>/mo</span></div>
            <ul class="plan-features">
              <li>&check; Everything in Starter</li>
              <li>&check; Custom design tokens</li>
              <li>&check; Priority 24/7 assistance</li>
            </ul>
            <a href="#contact" class="btn btn-primary btn-block">Get Started</a>
          </div>
        </div>
      </div>
    </section>\n\n`;
  }

  // 8. FAQ
  if (hasSection('faq')) {
    html += `    <!-- Interactive FAQ Accordion -->
    <section class="section" id="faq">
      <div class="container max-w-narrow">
        <div class="section-header">
          <span class="section-tag">Common Inquiries</span>
          <h2 class="section-title">Frequently Asked Questions</h2>
        </div>
        <div class="faq-list">
          <details class="faq-item">
            <summary class="faq-question">How was this website built?</summary>
            <div class="faq-answer">
              <p>This site was coded entirely by hand using semantic HTML5, modern CSS custom properties, and lightweight vanilla JavaScript.</p>
            </div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">Is the site mobile-friendly?</summary>
            <div class="faq-answer">
              <p>Yes! Every layout utilizes fluid CSS Grid and Flexbox with mobile-first media queries so it adapts to any screen size.</p>
            </div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">How do I get in touch?</summary>
            <div class="faq-answer">
              <p>Simply scroll down to our contact form or send us an email directly. We reply within 24 hours!</p>
            </div>
          </details>
        </div>
      </div>
    </section>\n\n`;
  }

  // 9. Contact
  if (hasSection('contact')) {
    html += `    <!-- Accessible Contact Form -->
    <section class="section bg-alt" id="contact">
      <div class="container contact-grid">
        <div class="contact-info">
          <span class="section-tag">Let's Connect</span>
          <h2 class="section-title">Send us a message</h2>
          <p class="paragraph">Have a question or looking to collaborate? Drop us a note below and we will get back to you promptly.</p>
          <ul class="info-list">
            <li><strong>Email:</strong> contact@${slugify(name)}.com</li>
            <li><strong>Response Time:</strong> Within 1 business day</li>
          </ul>
        </div>
        <form class="contact-form" action="https://formspree.io/f/your-form-id" method="POST">
          <div class="form-field">
            <label for="contactName" class="form-label">Your Name <span class="req">*</span></label>
            <input type="text" id="contactName" name="name" class="form-input" placeholder="e.g. Jordan Smith" required>
          </div>
          <div class="form-field">
            <label for="contactEmail" class="form-label">Email Address <span class="req">*</span></label>
            <input type="email" id="contactEmail" name="email" class="form-input" placeholder="jordan@example.com" required>
          </div>
          <div class="form-field">
            <label for="contactMessage" class="form-label">Your Message <span class="req">*</span></label>
            <textarea id="contactMessage" name="message" class="form-input" rows="4" placeholder="How can we help you?" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Send Message &rarr;</button>
        </form>
      </div>
    </section>\n\n`;
  }

  html += `  </main>\n\n`;

  // 10. Footer
  if (hasSection('footer')) {
    html += `  <!-- Site Footer -->
  <footer class="site-footer">
    <div class="container footer-content">
      <div class="footer-brand">
        <span class="brand-name">${escapeHtml(name)}</span>
        <p class="footer-tagline">Built by hand with pride and precision.</p>
      </div>
      <div class="footer-links">
        <a href="#hero">Back to Top &uarr;</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} ${escapeHtml(name)}. All rights reserved.</p>
    </div>
  </footer>
`;
  }

  html += `\n  <script src="js/main.js" defer></script>\n</body>\n</html>`;
  return html;
}

export function generateCompleteCss(project) {
  const { vibe } = project;
  const c = vibe.colors;
  const t = vibe.typography;

  return `/* ==========================================================================
   Design Tokens & CSS Custom Properties
   Generated for: ${project.name}
   ========================================================================== */

:root {
  /* Color Palette */
  --color-bg: ${c.bg};
  --color-surface: ${c.surface};
  --color-primary: ${c.primary};
  --color-primary-hover: ${c.primaryHover};
  --color-accent: ${c.accent};
  --color-text: ${c.text};
  --color-text-muted: ${c.textMuted};
  --color-border: ${c.border};
  --color-hero-bg: ${c.heroBg || c.bg};

  /* Typography */
  --font-heading: '${t.headingFont}', serif, -apple-system, sans-serif;
  --font-body: '${t.bodyFont}', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --weight-heading: ${t.headingWeight || '700'};

  /* Spacing & Borders */
  --border-radius: ${t.borderRadius || '8px'};
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 12px 24px rgba(0, 0, 0, 0.12);
  --transition-fast: 0.2s ease;
}

/* ==========================================================================
   Modern CSS Reset & Baseline
   ========================================================================== */

*, *::before, *::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

/* ==========================================================================
   Typography & Reusable Utilities
   ========================================================================== */

h1, h2, h3, h4 {
  font-family: var(--font-heading);
  font-weight: var(--weight-heading);
  line-height: 1.2;
  margin-top: 0;
  color: var(--color-text);
}

.container {
  width: 100%;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.max-w-narrow {
  max-width: 760px;
}

.section {
  padding: 5rem 0;
}

.bg-alt {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.section-header {
  text-align: center;
  max-width: 620px;
  margin: 0 auto 3rem auto;
}

.section-tag {
  display: inline-block;
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: clamp(1.85rem, 3vw, 2.5rem);
  margin-bottom: 0.75rem;
}

.section-desc {
  color: var(--color-text-muted);
  font-size: 1.1rem;
  margin: 0;
}

/* ==========================================================================
   Header & Navigation
   ========================================================================== */

.site-header {
  position: sticky;
  top: 0;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  z-index: 1000;
  transition: box-shadow var(--transition-fast);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.brand-logo {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: var(--weight-heading);
  color: var(--color-text);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.logo-mark {
  color: var(--color-primary);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1.75rem;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-link {
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-cta {
  background-color: var(--color-primary);
  color: #ffffff !important;
  padding: 0.5rem 1.15rem;
  border-radius: var(--border-radius);
  transition: background-color var(--transition-fast), transform var(--transition-fast);
}

.nav-cta:hover {
  background-color: var(--color-primary-hover);
  transform: translateY(-1px);
}

.nav-toggle {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  flex-direction: column;
  gap: 5px;
}

.nav-toggle .bar {
  width: 22px;
  height: 2px;
  background: var(--color-text);
  transition: transform var(--transition-fast), opacity var(--transition-fast);
}

/* ==========================================================================
   Hero Section
   ========================================================================== */

.hero-section {
  padding: 5rem 0 6rem 0;
  background: var(--color-hero-bg);
  border-bottom: 1px solid var(--color-border);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}

@media (min-width: 820px) {
  .hero-grid {
    grid-template-columns: 1.2fr 0.8fr;
  }
}

.badge {
  display: inline-block;
  padding: 0.35rem 0.8rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-primary);
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 9999px;
  margin-bottom: 1.25rem;
}

.hero-title {
  font-size: clamp(2.25rem, 4vw + 1rem, 3.5rem);
  line-height: 1.15;
  margin-bottom: 1.25rem;
}

.hero-subtitle {
  font-size: 1.15rem;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 520px;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.visual-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 3rem 2rem;
  box-shadow: var(--shadow-md);
  text-align: center;
}

.visual-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.visual-icon {
  font-size: 3rem;
  color: var(--color-primary);
}

.visual-caption {
  font-weight: 600;
  color: var(--color-text-muted);
  margin: 0;
}

/* ==========================================================================
   Buttons
   ========================================================================== */

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1.65rem;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  border: 1px solid transparent;
  transition: all var(--transition-fast);
}

.btn-primary {
  background: var(--color-primary);
  color: #ffffff;
}

.btn-primary:hover {
  background: var(--color-primary-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.btn-secondary {
  background: transparent;
  color: var(--color-text);
  border-color: var(--color-border);
}

.btn-secondary:hover {
  background: var(--color-surface);
  border-color: var(--color-text-muted);
}

.btn-block {
  width: 100%;
}

/* ==========================================================================
   Cards & Layout Grids
   ========================================================================== */

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 2.25rem 1.75rem;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.card-icon {
  font-size: 1.75rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.card-text {
  color: var(--color-text-muted);
  margin: 0;
  font-size: 0.95rem;
}

/* Split Content Grid */
.split-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3.5rem;
  align-items: center;
}

@media (min-width: 820px) {
  .split-grid {
    grid-template-columns: 0.9fr 1.1fr;
  }
}

.about-frame {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 3rem 2rem;
  text-align: center;
  font-style: italic;
}

.about-stats {
  display: flex;
  gap: 2.5rem;
  margin-top: 2rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
}

.stat-label {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
}

/* Pricing Grid */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  max-width: 780px;
  margin: 0 auto;
}

.pricing-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 2.5rem 2rem;
  position: relative;
}

.pricing-card.featured {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
}

.popular-badge {
  position: absolute;
  top: -12px;
  right: 24px;
  background: var(--color-primary);
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 9999px;
}

.plan-price {
  font-family: var(--font-heading);
  font-size: 2.75rem;
  font-weight: 700;
  margin: 1rem 0 1.5rem 0;
}

.plan-price span {
  font-size: 1rem;
  color: var(--color-text-muted);
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.plan-features li {
  padding: 0.5rem 0;
  color: var(--color-text-muted);
  border-bottom: 1px solid var(--color-border);
}

/* FAQ Details/Summary Accordion */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.faq-question {
  padding: 1.25rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  outline: none;
  transition: background var(--transition-fast);
}

.faq-question:hover {
  background: var(--color-bg);
}

.faq-answer {
  padding: 0 1.5rem 1.25rem 1.5rem;
  color: var(--color-text-muted);
  line-height: 1.6;
}

/* Forms */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 820px) {
  .contact-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.contact-form {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 2.25rem;
}

.form-field {
  margin-bottom: 1.25rem;
}

.form-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
}

.req {
  color: #ef4444;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  font-family: inherit;
  font-size: 0.95rem;
  background: var(--color-bg);
  color: var(--color-text);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.form-input:focus-visible {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

/* ==========================================================================
   Footer
   ========================================================================== */

.site-footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: 3rem 0 2rem 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.brand-name {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.15rem;
}

.footer-tagline {
  color: var(--color-text-muted);
  font-size: 0.85rem;
  margin: 0.25rem 0 0 0;
}

.footer-bottom {
  text-align: center;
  border-top: 1px solid var(--color-border);
  padding-top: 1.5rem;
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

/* ==========================================================================
   Responsive Mobile Navigation Drawer
   ========================================================================== */

@media (max-width: 819px) {
  .nav-links {
    position: fixed;
    top: 65px;
    left: 0;
    right: 0;
    background: var(--color-surface);
    flex-direction: column;
    padding: 2rem 1.5rem;
    gap: 1.25rem;
    border-bottom: 1px solid var(--color-border);
    transform: translateY(-120%);
    transition: transform 0.3s ease-in-out;
    box-shadow: var(--shadow-lg);
  }

  .main-nav.is-open .nav-links {
    transform: translateY(0);
  }

  .nav-toggle {
    display: flex;
  }
}
`;
}

export function generateCompleteJs(project) {
  return `/**
 * Main Application Script for: ${project.name}
 * Pure Vanilla JavaScript - Zero Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Drawer Toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu whenever any link inside is tapped
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Add subtle header shadow on window scroll
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

  // 3. Contact Form Gentle Submission Feedback
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.textContent = 'Sending Message...';
        submitBtn.style.opacity = '0.7';
      }
    });
  }
});
`;
}

export function generateReadme(project) {
  return `# ${project.name} - Custom Handcrafted Web Project

> Built by hand using the **WebCraft Blueprint & Mentor**.
> Clean, semantic HTML5, modern CSS custom properties, and zero-bloat vanilla JavaScript.

---

## 📁 Project Structure

\`\`\`
${slugify(project.name)}/
├── index.html        # Main semantic markup
├── css/
│   └── style.css     # CSS custom properties, responsive grid, reset
├── js/
│   └── main.js       # Lightweight mobile menu toggle & scroll behavior
└── README.md         # This handbook
\`\`\`

---

## 🚀 How to Run Locally

1. **Option A: VS Code Live Server (Recommended)**
   - Open this folder in **Visual Studio Code**.
   - Install the extension **"Live Server"** (by Ritwick Dey).
   - Right-click \`index.html\` and choose **"Open with Live Server"**.

2. **Option B: Node.js Built-in Server**
   - Run \`npx serve .\` or \`python -m http.server 3000\` in this folder.
   - Open your browser to \`http://localhost:3000\`.

---

## 🎨 Design Tokens

- **Vibe:** ${project.vibe.title}
- **Primary Color:** \`${project.vibe.colors.primary}\`
- **Background:** \`${project.vibe.colors.bg}\`
- **Surface / Cards:** \`${project.vibe.colors.surface}\`
- **Heading Font:** \`${project.vibe.typography.headingFont}\`
- **Body Font:** \`${project.vibe.typography.bodyFont}\`

---

## 🌐 Publishing to the Live Web for Free

1. Visit [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop this folder onto the web page.
3. Within 10 seconds, your website will be live worldwide with free HTTPS!
`;
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function slugify(text = '') {
  return text.toString().toLowerCase()
    .trim()
    .replace(/\\s+/g, '-')
    .replace(/[^\\w\\-]+/g, '')
    .replace(/\\-\\-+/g, '-');
}
