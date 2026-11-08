/**
 * Design System & Color Recommendations Module
 * Live color palette testing, WCAG contrast verification, typography hierarchy, and token exports.
 */

import { getContrastRatio, getWcagRating } from '../utils/contrast.js';

export class DesignSystemView {
  constructor(project, onUpdateProject) {
    this.project = project;
    this.onUpdateProject = onUpdateProject;
  }

  render(container) {
    this.container = container;
    this.update();
  }

  update() {
    const c = this.project.vibe.colors;
    const t = this.project.vibe.typography;

    // Calculate contrast ratios
    const primaryOnBg = getContrastRatio(c.primary, c.bg);
    const primaryOnSurface = getContrastRatio(c.primary, c.surface);
    const textOnBg = getContrastRatio(c.text, c.bg);
    const textOnSurface = getContrastRatio(c.text, c.surface);
    const mutedOnSurface = getContrastRatio(c.textMuted, c.surface);

    const primaryBgRating = getWcagRating(primaryOnBg);
    const textBgRating = getWcagRating(textOnBg);
    const textSurfaceRating = getWcagRating(textOnSurface);
    const mutedSurfaceRating = getWcagRating(mutedOnSurface);

    this.container.innerHTML = `
      <div class="design-system-layout">
        <!-- Header -->
        <div class="ds-header">
          <div>
            <span class="badge-pill">${this.project.vibe.badge}</span>
            <h2 class="ds-title">Design System: ${this.project.vibe.title}</h2>
            <p class="ds-subtitle">
              Harmonized color tokens, WCAG 2.1 accessibility math, and typography pairings curated for your site.
            </p>
          </div>
          <button type="button" class="btn btn-secondary" id="copyTokensBtn">
            📋 Copy CSS :root Variables
          </button>
        </div>

        <!-- 1. Color System & Swatches -->
        <section class="ds-card mb-4">
          <h3 class="ds-section-title">🎨 Color Palette & WCAG Accessibility Audit</h3>
          <p class="text-muted mb-3">
            Click any color to test an alternative. Contrast ratios update automatically against WCAG 2.1 standards.
          </p>

          <div class="palette-grid">
            ${this.renderColorCard('Primary Brand', c.primary, 'primary', 'Main buttons, links, active states, key highlights')}
            ${this.renderColorCard('Primary Hover', c.primaryHover, 'primaryHover', 'Darker shade for button hover and focus states')}
            ${this.renderColorCard('Accent Highlight', c.accent, 'accent', 'Secondary badges, tags, decorative icons')}
            ${this.renderColorCard('Page Background', c.bg, 'bg', 'Canvas background color for the body element')}
            ${this.renderColorCard('Surface / Card', c.surface, 'surface', 'Elevated cards, navbar, modals, and input fields')}
            ${this.renderColorCard('Text Main', c.text, 'text', 'High-contrast text for headings and body copy')}
            ${this.renderColorCard('Text Muted', c.textMuted, 'textMuted', 'Secondary text, timestamps, captions, placeholders')}
            ${this.renderColorCard('Border & Divider', c.border, 'border', 'Subtle dividing lines, card outlines, input borders')}
          </div>

          <!-- WCAG Compliance Matrix -->
          <div class="contrast-matrix mt-4">
            <h4 class="matrix-title">👁️ Readability & Contrast Verification</h4>
            <div class="matrix-grid">
              <div class="contrast-row">
                <span class="pair-names">Body Text on Surface</span>
                <span class="ratio-badge">${textSurfaceRating.ratio || textOnSurface.toFixed(1)}:1</span>
                <span class="wcag-pill" style="background-color: ${textSurfaceRating.color}22; color: ${textSurfaceRating.color}; border: 1px solid ${textSurfaceRating.color};">
                  ${textSurfaceRating.level} (${textSurfaceRating.status})
                </span>
              </div>
              <div class="contrast-row">
                <span class="pair-names">Body Text on Page Background</span>
                <span class="ratio-badge">${textOnBg.toFixed(1)}:1</span>
                <span class="wcag-pill" style="background-color: ${textBgRating.color}22; color: ${textBgRating.color}; border: 1px solid ${textBgRating.color};">
                  ${textBgRating.level} (${textBgRating.status})
                </span>
              </div>
              <div class="contrast-row">
                <span class="pair-names">Primary Button on Surface</span>
                <span class="ratio-badge">${primaryOnSurface.toFixed(1)}:1</span>
                <span class="wcag-pill" style="background-color: ${primaryBgRating.color}22; color: ${primaryBgRating.color}; border: 1px solid ${primaryBgRating.color};">
                  ${primaryBgRating.level} (${primaryBgRating.status})
                </span>
              </div>
              <div class="contrast-row">
                <span class="pair-names">Muted Text on Surface</span>
                <span class="ratio-badge">${mutedOnSurface.toFixed(1)}:1</span>
                <span class="wcag-pill" style="background-color: ${mutedSurfaceRating.color}22; color: ${mutedSurfaceRating.color}; border: 1px solid ${mutedSurfaceRating.color};">
                  ${mutedSurfaceRating.level} (${mutedSurfaceRating.status})
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- 2. Typography Pairings & Modular Scale -->
        <section class="ds-card mb-4">
          <h3 class="ds-section-title">🔤 Typography System & Google Fonts</h3>
          <p class="text-muted mb-3">
            Pairing an expressive heading typeface with a clean, highly legible body font gives your site personality without sacrificing reading comfort.
          </p>

          <div class="typo-grid">
            <div class="typo-card">
              <span class="typo-role">Headings Font</span>
              <h2 class="typo-font-name" style="font-family: '${t.headingFont}', serif;">${t.headingFont}</h2>
              <p class="typo-sample" style="font-family: '${t.headingFont}', serif;">
                The quick brown fox jumps over the lazy dog.
              </p>
              <div class="typo-code-hint">
                <code>font-family: '${t.headingFont}', serif;</code>
              </div>
            </div>

            <div class="typo-card">
              <span class="typo-role">Body & UI Font</span>
              <h2 class="typo-font-name" style="font-family: '${t.bodyFont}', sans-serif;">${t.bodyFont}</h2>
              <p class="typo-sample" style="font-family: '${t.bodyFont}', sans-serif;">
                Designed for optimal on-screen clarity across high-DPI displays and small mobile viewports.
              </p>
              <div class="typo-code-hint">
                <code>font-family: '${t.bodyFont}', sans-serif;</code>
              </div>
            </div>
          </div>

          <!-- Type Scale Table -->
          <div class="type-scale-table mt-4">
            <h4 class="scale-title">Modular Type Scale (Built with Accessible REMs)</h4>
            <div class="scale-rows">
              <div class="scale-row">
                <span class="scale-tag">Display / Hero</span>
                <span class="scale-rem">3.25rem (52px)</span>
                <span class="scale-preview" style="font-size: 2rem; font-family: '${t.headingFont}', serif; font-weight: 700;">
                  Bespoke Craft
                </span>
              </div>
              <div class="scale-row">
                <span class="scale-tag">Heading 1 (H1)</span>
                <span class="scale-rem">2.25rem (36px)</span>
                <span class="scale-preview" style="font-size: 1.6rem; font-family: '${t.headingFont}', serif; font-weight: 700;">
                  Section Headline
                </span>
              </div>
              <div class="scale-row">
                <span class="scale-tag">Heading 2 (H2)</span>
                <span class="scale-rem">1.75rem (28px)</span>
                <span class="scale-preview" style="font-size: 1.3rem; font-family: '${t.headingFont}', serif; font-weight: 600;">
                  Component Title
                </span>
              </div>
              <div class="scale-row">
                <span class="scale-tag">Body Text</span>
                <span class="scale-rem">1.0rem (16px)</span>
                <span class="scale-preview" style="font-size: 1rem; font-family: '${t.bodyFont}', sans-serif;">
                  Standard reading paragraph with comfortable line height (1.6).
                </span>
              </div>
              <div class="scale-row">
                <span class="scale-tag">Caption / Small</span>
                <span class="scale-rem">0.85rem (13.6px)</span>
                <span class="scale-preview" style="font-size: 0.85rem; font-family: '${t.bodyFont}', sans-serif; color: ${c.textMuted};">
                  Badges, timestamps, footnotes, and subtle hints.
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. Live Component Showcase -->
        <section class="ds-card">
          <h3 class="ds-section-title">✨ Live Component Preview</h3>
          <p class="text-muted mb-3">
            This is how your buttons, cards, badges, and form controls look when rendered using your tokens:
          </p>

          <div class="components-sandbox" style="background-color: ${c.bg}; border: 1px solid ${c.border}; border-radius: ${t.borderRadius};">
            <!-- Buttons preview -->
            <div class="sandbox-row">
              <span class="sandbox-label">Buttons:</span>
              <div class="sandbox-flex">
                <button type="button" class="preview-btn" style="background-color: ${c.primary}; color: #ffffff; border-radius: ${t.borderRadius};">
                  Primary Action
                </button>
                <button type="button" class="preview-btn" style="background-color: transparent; color: ${c.text}; border: 1px solid ${c.border}; border-radius: ${t.borderRadius};">
                  Secondary Action
                </button>
                <span class="preview-badge" style="background-color: ${c.surface}; color: ${c.primary}; border: 1px solid ${c.border}; border-radius: 9999px;">
                  &starf; Highlight Badge
                </span>
              </div>
            </div>

            <!-- Card preview -->
            <div class="sandbox-row">
              <span class="sandbox-label">Content Card:</span>
              <div class="preview-card" style="background-color: ${c.surface}; border: 1px solid ${c.border}; border-radius: ${t.borderRadius};">
                <span class="card-tag" style="color: ${c.primary}; font-weight: 700; font-size: 0.8rem; text-transform: uppercase;">
                  Core Feature
                </span>
                <h4 style="font-family: '${t.headingFont}', serif; color: ${c.text}; margin: 0.5rem 0;">
                  Precision Engineering
                </h4>
                <p style="font-family: '${t.bodyFont}', sans-serif; color: ${c.textMuted}; font-size: 0.95rem; margin: 0 0 1rem 0;">
                  Built with intentional spacing, accessible contrast, and zero external dependencies.
                </p>
                <a href="#" style="color: ${c.primary}; font-weight: 600; text-decoration: none;">
                  Explore Documentation &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;

    this.bindEvents();
  }

  renderColorCard(label, hex, key, roleDesc) {
    return `
      <div class="color-token-card">
        <div class="color-swatch-box" style="background-color: ${hex};">
          <input type="color" class="color-picker-input" data-color-key="${key}" value="${hex}" title="Click to adjust">
        </div>
        <div class="color-token-info">
          <div class="color-token-header">
            <strong>${label}</strong>
            <code class="hex-badge">${hex.toUpperCase()}</code>
          </div>
          <p class="color-role-text">${roleDesc}</p>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Color picker change
    const pickers = this.container.querySelectorAll('.color-picker-input');
    pickers.forEach(p => {
      p.addEventListener('input', (e) => {
        const key = p.getAttribute('data-color-key');
        const newColor = e.target.value;
        this.project.vibe.colors[key] = newColor;
        // If primary changed, update hover too if not custom
        if (key === 'primary') {
          this.project.vibe.colors.primaryHover = newColor;
        }
        if (this.onUpdateProject) {
          this.onUpdateProject(this.project);
        }
        this.update();
      });
    });

    // Copy CSS Variables
    const copyBtn = document.getElementById('copyTokensBtn');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        const c = this.project.vibe.colors;
        const t = this.project.vibe.typography;
        const cssVars = `:root {
  --color-bg: ${c.bg};
  --color-surface: ${c.surface};
  --color-primary: ${c.primary};
  --color-primary-hover: ${c.primaryHover};
  --color-accent: ${c.accent};
  --color-text: ${c.text};
  --color-text-muted: ${c.textMuted};
  --color-border: ${c.border};

  --font-heading: '${t.headingFont}', serif;
  --font-body: '${t.bodyFont}', sans-serif;
  --border-radius: ${t.borderRadius || '8px'};
}`;
        try {
          await navigator.clipboard.writeText(cssVars);
          copyBtn.textContent = '✓ Copied to Clipboard!';
          setTimeout(() => { copyBtn.textContent = '📋 Copy CSS :root Variables'; }, 2500);
        } catch (e) {
          console.warn('Clipboard failed', e);
        }
      });
    }
  }
}
