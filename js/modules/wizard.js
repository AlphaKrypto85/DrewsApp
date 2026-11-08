/**
 * Site Architect / Intake Wizard Module
 * Guides the user through defining their website without relying on black-box AI.
 */

import { SITE_TYPES, DESIGN_VIBES, PALETTE_CATEGORIES, ALL_SECTIONS, EXPERIENCE_LEVELS } from '../data/presets.js';
import { getContrastRatio, getWcagRating, adjustBrightness, isLightColor, getHoverColor, autoHarmonizeColors, toggleCanvasMode } from '../utils/contrast.js';

const QUICK_ACCENTS = [
  { name: 'Indigo', hex: '#4f46e5' },
  { name: 'Sky Blue', hex: '#0284c7' },
  { name: 'Teal', hex: '#0f766e' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Amber', hex: '#d97706' },
  { name: 'Tangerine', hex: '#ea580c' },
  { name: 'Crimson', hex: '#e11d48' },
  { name: 'Rose', hex: '#be185d' },
  { name: 'Purple', hex: '#8b5cf6' },
  { name: 'Midnight Navy', hex: '#1e293b' }
];

const COLOR_TOKENS = [
  { key: 'primary', label: 'Primary Brand', role: 'CTA buttons, links, brand accent' },
  { key: 'primaryHover', label: 'Primary Hover', role: 'Button hover & active focus' },
  { key: 'accent', label: 'Accent Highlight', role: 'Badges, pill tags, key icons' },
  { key: 'bg', label: 'Canvas Background', role: 'Main page & body background' },
  { key: 'surface', label: 'Card & Surface', role: 'Elevated cards, navbar, modals' },
  { key: 'heroBg', label: 'Hero Background', role: 'Top hero section banner' },
  { key: 'text', label: 'Main Text', role: 'Headlines, body copy, readable text' },
  { key: 'textMuted', label: 'Muted Text', role: 'Secondary copy, captions, dates' },
  { key: 'border', label: 'Border & Divider', role: 'Card outlines and dividing lines' }
];

export class Wizard {
  constructor(onComplete, initialProject = null) {
    this.onComplete = onComplete;
    this.currentStep = 1;
    this.totalSteps = 4;
    this.vibeFilter = 'all';
    this.isCustomized = false;

    if (initialProject) {
      this.state = JSON.parse(JSON.stringify(initialProject));
      if (this.state.vibe) {
        const orig = DESIGN_VIBES.find(v => v.id === this.state.vibe.id);
        if (orig && JSON.stringify(orig.colors) !== JSON.stringify(this.state.vibe.colors)) {
          this.isCustomized = true;
        }
      }
    } else {
      // Default project state
      this.state = {
        name: "Maya's Artisanal Bakery",
        type: SITE_TYPES[1], // Local business
        vibe: JSON.parse(JSON.stringify(DESIGN_VIBES[1])), // Warm Earth & Terracotta
        sections: [...SITE_TYPES[1].defaultSections],
        level: EXPERIENCE_LEVELS[0], // Beginner
        customHero: {
          headline: "Handmade sourdough & seasonal bakes every morning",
          subhead: "Slow-fermented for 36 hours using heritage grains and natural wild yeast. Baked in stone hearth ovens at dawn.",
          cta: "Browse Today's Bakes"
        }
      };
    }
  }

  render(container) {
    this.container = container;
    this.update();
  }

  update() {
    this.container.innerHTML = `
      <div class="wizard-card">
        <div class="wizard-header">
          <div class="wizard-badge">Step ${this.currentStep} of ${this.totalSteps}</div>
          <h2 class="wizard-title">${this.getStepTitle()}</h2>
          <p class="wizard-subtitle">${this.getStepSubtitle()}</p>
          <div class="wizard-progress-bar">
            <div class="wizard-progress-fill" style="width: ${(this.currentStep / this.totalSteps) * 100}%"></div>
          </div>
        </div>

        <div class="wizard-body">
          ${this.renderStepContent()}
        </div>

        <div class="wizard-footer">
          ${this.currentStep > 1 
            ? `<button type="button" class="btn btn-secondary" id="wizPrev">&larr; Back</button>` 
            : `<div></div>`}
          ${this.currentStep < this.totalSteps 
            ? `<button type="button" class="btn btn-primary" id="wizNext">Continue &rarr;</button>` 
            : `<button type="button" class="btn btn-primary btn-generate" id="wizFinish">
                 <span>🚀 Generate My Custom Blueprint & Guide</span>
               </button>`}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  getStepTitle() {
    switch (this.currentStep) {
      case 1: return "What kind of website are you building?";
      case 2: return "Choose & Customize Your Color Scheme & Aesthetic Vibe";
      case 3: return "Select the sections and features you need";
      case 4: return "Your experience level & hero message";
      default: return "";
    }
  }

  getStepSubtitle() {
    switch (this.currentStep) {
      case 1: return "Give your project a name and choose the core purpose of the site.";
      case 2: return "Browse 16 curated aesthetic palettes or fine-tune individual color tokens below with real-time UI preview and WCAG accessibility ratings.";
      case 3: return "Pick the building blocks you want to learn to build from scratch.";
      case 4: return "Tailor the teaching depth and set your primary hook headline.";
      default: return "";
    }
  }

  renderStepContent() {
    switch (this.currentStep) {
      case 1: return this.renderStep1();
      case 2: return this.renderStep2();
      case 3: return this.renderStep3();
      case 4: return this.renderStep4();
      default: return "";
    }
  }

  renderStep1() {
    return `
      <div class="form-group mb-4">
        <label for="projectNameInput" class="form-label">
          <strong>Website or Brand Name</strong>
        </label>
        <input 
          type="text" 
          id="projectNameInput" 
          class="form-input form-input-lg" 
          value="${escapeAttr(this.state.name)}" 
          placeholder="e.g. Jordan Rivera Portfolio, Apex Fitness, GreenLeaf Cafe"
        >
        <p class="form-hint">This will be used for your &lt;title&gt;, navigation logo, and metadata.</p>
      </div>

      <label class="form-label mb-2"><strong>Select Website Category</strong></label>
      <div class="category-grid">
        ${SITE_TYPES.map(type => `
          <div class="category-card ${this.state.type.id === type.id ? 'active' : ''}" data-type-id="${type.id}">
            <div class="category-header">
              <span class="category-badge">${type.badge}</span>
            </div>
            <h4 class="category-title">${type.title}</h4>
            <p class="category-desc">${type.description}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderStep2() {
    const c = this.state.vibe.colors;
    const t = this.state.vibe.typography;
    const isDarkBg = !isLightColor(c.bg);

    // Filtered vibes list
    const filteredVibes = DESIGN_VIBES.filter(v => 
      this.vibeFilter === 'all' || v.category === this.vibeFilter
    );

    // WCAG contrast ratios
    const textOnBg = getContrastRatio(c.text, c.bg);
    const textOnSurface = getContrastRatio(c.text, c.surface);
    const primaryOnBg = getContrastRatio(c.primary, c.bg);

    const textBgRating = getWcagRating(textOnBg);
    const textSurfaceRating = getWcagRating(textOnSurface);
    const primaryBgRating = getWcagRating(primaryOnBg);

    return `
      <!-- Category Filter Pills -->
      <div class="vibes-filter-bar">
        ${PALETTE_CATEGORIES.map(cat => {
          const count = cat.id === 'all' 
            ? DESIGN_VIBES.length 
            : DESIGN_VIBES.filter(v => v.category === cat.id).length;
          return `
            <button 
              type="button" 
              class="vibe-filter-pill ${this.vibeFilter === cat.id ? 'active' : ''}" 
              data-filter="${cat.id}"
            >
              <span>${cat.icon}</span>
              <span>${cat.label}</span>
              <span class="filter-count">${count}</span>
            </button>
          `;
        }).join('')}
      </div>

      <!-- Presets Grid -->
      <div class="vibes-grid">
        ${filteredVibes.map(vibe => {
          const isSelected = this.state.vibe.id === vibe.id;
          const paletteColors = isSelected ? this.state.vibe.colors : vibe.colors;
          return `
            <div class="vibe-card ${isSelected ? 'active' : ''}" data-vibe-id="${vibe.id}">
              <div class="vibe-card-top">
                <span class="vibe-badge">${vibe.badge}</span>
                <div style="display:flex; gap: 0.35rem; align-items:center;">
                  <span class="vibe-category-pill">${vibe.category}</span>
                  ${isSelected ? '<span class="selected-check">&check; Selected</span>' : ''}
                </div>
              </div>
              <h4 class="vibe-title">${vibe.title}</h4>
              <p class="vibe-desc">${vibe.description}</p>
              
              <!-- Color Swatches -->
              <div class="swatches-row">
                <div class="swatch" style="background-color: ${paletteColors.bg}; border: 1px solid rgba(148, 163, 184, 0.3);" title="Canvas: ${paletteColors.bg}"></div>
                <div class="swatch" style="background-color: ${paletteColors.surface}; border: 1px solid rgba(148, 163, 184, 0.3);" title="Surface: ${paletteColors.surface}"></div>
                <div class="swatch" style="background-color: ${paletteColors.primary};" title="Primary: ${paletteColors.primary}"></div>
                <div class="swatch" style="background-color: ${paletteColors.accent};" title="Accent: ${paletteColors.accent}"></div>
                <div class="swatch" style="background-color: ${paletteColors.text};" title="Text: ${paletteColors.text}"></div>
              </div>

              <div class="vibe-typo">
                <span class="typo-pair">Fonts: <strong>${vibe.typography.headingFont}</strong> + <strong>${vibe.typography.bodyFont}</strong></span>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Color Scheme Studio & Deep Customizer Section -->
      <div class="color-studio-container" id="colorStudioSection">
        <div class="studio-header">
          <div class="studio-header-left">
            <span class="preset-badge-tag">${this.state.vibe.badge}</span>
            <h3 class="studio-title" id="studioPaletteTitle">
              Customizer: ${escapeHtml(this.state.vibe.title)}
            </h3>
            <span class="customized-badge" id="customStatusBadge" style="${this.isCustomized ? '' : 'display:none;'}">
              ✨ Custom Colors Active
            </span>
          </div>

          <div class="studio-actions">
            <button type="button" class="btn btn-secondary btn-sm" id="btnToggleCanvasMode" title="Flip between light and dark canvas backgrounds">
              ${isDarkBg ? '☀️ Switch to Light Canvas' : '🌙 Switch to Dark Canvas'}
            </button>
            <button type="button" class="btn btn-secondary btn-sm" id="btnAutoHarmonize" title="Derives matching hover, borders, surface, and text based on primary + canvas">
              🪄 Auto-Harmonize
            </button>
            <button type="button" class="btn btn-secondary btn-sm" id="btnResetPalette" title="Reset this palette back to its original preset values">
              ↺ Reset Preset
            </button>
          </div>
        </div>

        <!-- Quick Primary Brand Hues -->
        <div class="quick-accents-bar">
          <span class="quick-accents-label">Quick Brand Hues:</span>
          <div class="quick-accents-dots">
            ${QUICK_ACCENTS.map(acc => `
              <button 
                type="button" 
                class="accent-dot ${c.primary.toLowerCase() === acc.hex.toLowerCase() ? 'active' : ''}" 
                style="background-color: ${acc.hex};" 
                data-accent-hex="${acc.hex}" 
                title="${acc.name} (${acc.hex})"
              ></button>
            `).join('')}
          </div>
        </div>

        <!-- 9 Detailed Color Token Inputs -->
        <div class="color-tokens-grid" id="colorTokensGrid">
          ${COLOR_TOKENS.map(t => {
            const val = c[t.key] || '#ffffff';
            return `
              <div class="color-token-field">
                <div class="token-info">
                  <span class="token-name">${t.label}</span>
                  <span class="token-role" title="${t.role}">${t.role}</span>
                </div>
                <div class="token-input-row">
                  <input 
                    type="color" 
                    class="token-color-picker" 
                    data-token="${t.key}" 
                    value="${val}" 
                    title="Click to pick a color"
                  >
                  <input 
                    type="text" 
                    class="token-hex-input" 
                    data-token="${t.key}" 
                    value="${val.toUpperCase()}" 
                    maxlength="7" 
                    spellcheck="false"
                  >
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Live WCAG 2.1 Contrast Strip -->
        <div class="contrast-strip" id="contrastStrip">
          <div class="contrast-strip-left">
            <span class="contrast-strip-title">👁️ WCAG 2.1 Accessibility:</span>
          </div>
          <div class="contrast-items">
            <div class="contrast-item">
              <span class="contrast-label">Text on Canvas:</span>
              <span class="contrast-badge" id="badgeTextBg" style="background-color: ${textBgRating.color}22; color: ${textBgRating.color}; border: 1px solid ${textBgRating.color};">
                ${textOnBg.toFixed(1)}:1 (${textBgRating.level})
              </span>
            </div>
            <div class="contrast-item">
              <span class="contrast-label">Text on Card:</span>
              <span class="contrast-badge" id="badgeTextSurface" style="background-color: ${textSurfaceRating.color}22; color: ${textSurfaceRating.color}; border: 1px solid ${textSurfaceRating.color};">
                ${textOnSurface.toFixed(1)}:1 (${textSurfaceRating.level})
              </span>
            </div>
            <div class="contrast-item">
              <span class="contrast-label">Primary on Canvas:</span>
              <span class="contrast-badge" id="badgePrimaryBg" style="background-color: ${primaryBgRating.color}22; color: ${primaryBgRating.color}; border: 1px solid ${primaryBgRating.color};">
                ${primaryOnBg.toFixed(1)}:1 (${primaryBgRating.level})
              </span>
            </div>
          </div>
        </div>

        <!-- Live Interactive Component Preview Box -->
        <div 
          class="step2-preview-box" 
          id="step2LivePreview" 
          style="background-color: ${c.bg}; border-color: ${c.border}; color: ${c.text}; font-family: '${t.bodyFont}', sans-serif;"
        >
          <!-- Mini Top Nav -->
          <div class="preview-top-bar" id="prevTopBar" style="border-color: ${c.border};">
            <div class="preview-brand" id="prevBrand" style="color: ${c.text};">
              <span id="prevBrandIcon" style="color: ${c.primary};">&#9670;</span>
              <span>${escapeHtml(this.state.name || 'Crafted Web')}</span>
            </div>
            <div class="preview-nav-links" id="prevNavLinks" style="color: ${c.textMuted};">
              <span>Home</span>
              <span>Features</span>
              <span>Pricing</span>
            </div>
            <button 
              type="button" 
              class="preview-btn-primary" 
              id="prevNavCta" 
              style="background-color: ${c.primary}; color: #ffffff;"
            >
              Get Started
            </button>
          </div>

          <!-- Hero & Card Grid -->
          <div class="preview-content-grid">
            <!-- Hero Mock -->
            <div 
              class="preview-hero-mock" 
              id="prevHeroMock" 
              style="background-color: ${c.heroBg || c.bg}; border-color: ${c.border};"
            >
              <h3 class="preview-hero-h1" id="prevHeroH1" style="color: ${c.text}; font-family: '${t.headingFont}', serif;">
                Build Authentic, Responsive Websites
              </h3>
              <p class="preview-hero-sub" id="prevHeroSub" style="color: ${c.textMuted}; font-family: '${t.bodyFont}', sans-serif;">
                Harmonized colors, accessible contrast, and zero external framework lock-in.
              </p>
              <div class="preview-btn-row">
                <button 
                  type="button" 
                  class="preview-btn-primary" 
                  id="prevHeroCtaPrimary" 
                  style="background-color: ${c.primary}; color: #ffffff;"
                >
                  Explore Blueprint
                </button>
                <button 
                  type="button" 
                  class="preview-btn-secondary" 
                  id="prevHeroCtaSecondary" 
                  style="border-color: ${c.border}; color: ${c.text};"
                >
                  Learn More
                </button>
              </div>
            </div>

            <!-- Content Card Mock -->
            <div 
              class="preview-card-mock" 
              id="prevCardMock" 
              style="background-color: ${c.surface}; border-color: ${c.border};"
            >
              <span 
                class="preview-card-badge" 
                id="prevCardBadge" 
                style="background-color: ${c.accent}25; color: ${c.accent}; border: 1px solid ${c.accent}55;"
              >
                &starf; Core Feature
              </span>
              <h4 class="preview-card-title" id="prevCardTitle" style="color: ${c.text}; font-family: '${t.headingFont}', serif;">
                Semantic HTML & CSS
              </h4>
              <p class="preview-card-desc" id="prevCardDesc" style="color: ${c.textMuted}; font-family: '${t.bodyFont}', sans-serif;">
                Built cleanly from first principles for instant load times and complete creative control.
              </p>
              <span class="preview-card-link" id="prevCardLink" style="color: ${c.primary};">
                Read documentation &rarr;
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  syncStep2Preview() {
    const c = this.state.vibe.colors;
    const t = this.state.vibe.typography;
    const isDarkBg = !isLightColor(c.bg);

    // Update Live Preview box styles
    const prevBox = document.getElementById('step2LivePreview');
    if (prevBox) {
      prevBox.style.backgroundColor = c.bg;
      prevBox.style.borderColor = c.border;
      prevBox.style.color = c.text;
    }

    const prevTopBar = document.getElementById('prevTopBar');
    if (prevTopBar) prevTopBar.style.borderColor = c.border;

    const prevBrand = document.getElementById('prevBrand');
    if (prevBrand) prevBrand.style.color = c.text;

    const prevBrandIcon = document.getElementById('prevBrandIcon');
    if (prevBrandIcon) prevBrandIcon.style.color = c.primary;

    const prevNavLinks = document.getElementById('prevNavLinks');
    if (prevNavLinks) prevNavLinks.style.color = c.textMuted;

    const prevNavCta = document.getElementById('prevNavCta');
    if (prevNavCta) prevNavCta.style.backgroundColor = c.primary;

    const prevHeroMock = document.getElementById('prevHeroMock');
    if (prevHeroMock) {
      prevHeroMock.style.backgroundColor = c.heroBg || c.bg;
      prevHeroMock.style.borderColor = c.border;
    }

    const prevHeroH1 = document.getElementById('prevHeroH1');
    if (prevHeroH1) prevHeroH1.style.color = c.text;

    const prevHeroSub = document.getElementById('prevHeroSub');
    if (prevHeroSub) prevHeroSub.style.color = c.textMuted;

    const prevHeroCtaPrimary = document.getElementById('prevHeroCtaPrimary');
    if (prevHeroCtaPrimary) prevHeroCtaPrimary.style.backgroundColor = c.primary;

    const prevHeroCtaSecondary = document.getElementById('prevHeroCtaSecondary');
    if (prevHeroCtaSecondary) {
      prevHeroCtaSecondary.style.borderColor = c.border;
      prevHeroCtaSecondary.style.color = c.text;
    }

    const prevCardMock = document.getElementById('prevCardMock');
    if (prevCardMock) {
      prevCardMock.style.backgroundColor = c.surface;
      prevCardMock.style.borderColor = c.border;
    }

    const prevCardBadge = document.getElementById('prevCardBadge');
    if (prevCardBadge) {
      prevCardBadge.style.backgroundColor = `${c.accent}25`;
      prevCardBadge.style.color = c.accent;
      prevCardBadge.style.borderColor = `${c.accent}55`;
    }

    const prevCardTitle = document.getElementById('prevCardTitle');
    if (prevCardTitle) prevCardTitle.style.color = c.text;

    const prevCardDesc = document.getElementById('prevCardDesc');
    if (prevCardDesc) prevCardDesc.style.color = c.textMuted;

    const prevCardLink = document.getElementById('prevCardLink');
    if (prevCardLink) prevCardLink.style.color = c.primary;

    // Update Contrast meters
    const textOnBg = getContrastRatio(c.text, c.bg);
    const textOnSurface = getContrastRatio(c.text, c.surface);
    const primaryOnBg = getContrastRatio(c.primary, c.bg);

    const textBgRating = getWcagRating(textOnBg);
    const textSurfaceRating = getWcagRating(textOnSurface);
    const primaryBgRating = getWcagRating(primaryOnBg);

    const bTextBg = document.getElementById('badgeTextBg');
    if (bTextBg) {
      bTextBg.textContent = `${textOnBg.toFixed(1)}:1 (${textBgRating.level})`;
      bTextBg.style.backgroundColor = `${textBgRating.color}22`;
      bTextBg.style.color = textBgRating.color;
      bTextBg.style.borderColor = textBgRating.color;
    }

    const bTextSurface = document.getElementById('badgeTextSurface');
    if (bTextSurface) {
      bTextSurface.textContent = `${textOnSurface.toFixed(1)}:1 (${textSurfaceRating.level})`;
      bTextSurface.style.backgroundColor = `${textSurfaceRating.color}22`;
      bTextSurface.style.color = textSurfaceRating.color;
      bTextSurface.style.borderColor = textSurfaceRating.color;
    }

    const bPrimaryBg = document.getElementById('badgePrimaryBg');
    if (bPrimaryBg) {
      bPrimaryBg.textContent = `${primaryOnBg.toFixed(1)}:1 (${primaryBgRating.level})`;
      bPrimaryBg.style.backgroundColor = `${primaryBgRating.color}22`;
      bPrimaryBg.style.color = primaryBgRating.color;
      bPrimaryBg.style.borderColor = primaryBgRating.color;
    }

    // Toggle Light/Dark Canvas button text
    const btnToggle = document.getElementById('btnToggleCanvasMode');
    if (btnToggle) {
      btnToggle.textContent = isDarkBg ? '☀️ Switch to Light Canvas' : '🌙 Switch to Dark Canvas';
    }

    // Custom badge
    const customBadge = document.getElementById('customStatusBadge');
    if (customBadge) {
      customBadge.style.display = this.isCustomized ? 'inline-block' : 'none';
    }

    // Highlight matching active quick accent dot if any
    const accentDots = this.container.querySelectorAll('.accent-dot');
    accentDots.forEach(dot => {
      const dotHex = dot.getAttribute('data-accent-hex');
      dot.classList.toggle('active', dotHex.toLowerCase() === c.primary.toLowerCase());
    });

    // Update active vibe card swatches
    const activeCard = this.container.querySelector(`.vibe-card[data-vibe-id="${this.state.vibe.id}"]`);
    if (activeCard) {
      const swatches = activeCard.querySelectorAll('.swatch');
      if (swatches.length >= 5) {
        swatches[0].style.backgroundColor = c.bg;
        swatches[1].style.backgroundColor = c.surface;
        swatches[2].style.backgroundColor = c.primary;
        swatches[3].style.backgroundColor = c.accent;
        swatches[4].style.backgroundColor = c.text;
      }
    }
  }

  renderStep3() {
    return `
      <div class="sections-intro mb-3">
        <p class="text-muted">
          Check off the sections you want in your website. We will generate the semantic HTML wireframe, CSS recipes, and milestone tutorials for each one.
        </p>
      </div>

      <div class="sections-list">
        ${ALL_SECTIONS.map(sec => {
          const isChecked = this.state.sections.includes(sec.id);
          const isRequired = sec.required;
          return `
            <label class="section-item ${isChecked ? 'selected' : ''} ${isRequired ? 'locked' : ''}">
              <input 
                type="checkbox" 
                class="section-checkbox" 
                value="${sec.id}" 
                ${isChecked ? 'checked' : ''} 
                ${isRequired ? 'disabled' : ''}
              >
              <div class="section-item-text">
                <div class="section-item-title">
                  <strong>${sec.name}</strong>
                  ${isRequired ? '<span class="badge-mini">Essential Foundation</span>' : ''}
                </div>
                <p class="section-item-desc">${sec.desc}</p>
              </div>
            </label>
          `;
        }).join('')}
      </div>
    `;
  }

  renderStep4() {
    return `
      <div class="step4-grid">
        <div class="level-selection mb-4">
          <label class="form-label mb-2"><strong>How would you describe your coding experience?</strong></label>
          <div class="level-cards">
            ${EXPERIENCE_LEVELS.map(lvl => `
              <div class="level-card ${this.state.level.id === lvl.id ? 'active' : ''}" data-level-id="${lvl.id}">
                <div class="level-title"><strong>${lvl.title}</strong></div>
                <div class="level-subtitle">${lvl.subtitle}</div>
                <p class="level-desc">${lvl.description}</p>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="hero-customization mb-3">
          <label class="form-label mb-2"><strong>Hero Section Headline & Hook</strong></label>
          <p class="form-hint mb-3">Visitors judge a site in under 3 seconds. Here is a recommended hook tailored to your choice:</p>
          
          <div class="form-group mb-3">
            <label class="form-label-sm" for="heroHeadlineInput">Primary Headline (H1)</label>
            <input 
              type="text" 
              id="heroHeadlineInput" 
              class="form-input" 
              value="${escapeAttr(this.state.customHero.headline)}"
            >
          </div>

          <div class="form-group mb-3">
            <label class="form-label-sm" for="heroSubheadInput">Subheadline / Value Proposition</label>
            <textarea 
              id="heroSubheadInput" 
              class="form-input form-textarea" 
              rows="2"
            >${escapeHtml(this.state.customHero.subhead)}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label-sm" for="heroCtaInput">Call-to-Action Button Text</label>
            <input 
              type="text" 
              id="heroCtaInput" 
              class="form-input" 
              value="${escapeAttr(this.state.customHero.cta)}"
            >
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Project Name input
    const nameInput = document.getElementById('projectNameInput');
    if (nameInput) {
      nameInput.addEventListener('input', (e) => {
        this.state.name = e.target.value.trim() || 'My Handcrafted Website';
      });
    }

    // Category selection (Step 1)
    const categoryCards = this.container.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
      card.addEventListener('click', () => {
        const typeId = card.getAttribute('data-type-id');
        const selectedType = SITE_TYPES.find(t => t.id === typeId);
        if (selectedType) {
          this.state.type = selectedType;
          this.state.sections = [...selectedType.defaultSections];
          this.state.customHero = { ...selectedType.heroPlaceholder };
          if (selectedType.recommendedVibes && selectedType.recommendedVibes[0]) {
            const recVibe = DESIGN_VIBES.find(v => v.id === selectedType.recommendedVibes[0]);
            if (recVibe) {
              this.state.vibe = JSON.parse(JSON.stringify(recVibe));
              this.isCustomized = false;
            }
          }
          this.update();
        }
      });
    });

    // Vibe filter pills (Step 2)
    const filterPills = this.container.querySelectorAll('.vibe-filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        this.vibeFilter = pill.getAttribute('data-filter') || 'all';
        this.update();
      });
    });

    // Vibe selection (Step 2)
    const vibeCards = this.container.querySelectorAll('.vibe-card');
    vibeCards.forEach(card => {
      card.addEventListener('click', () => {
        const vibeId = card.getAttribute('data-vibe-id');
        const selectedVibe = DESIGN_VIBES.find(v => v.id === vibeId);
        if (selectedVibe) {
          this.state.vibe = JSON.parse(JSON.stringify(selectedVibe));
          this.isCustomized = false;
          this.update();
        }
      });
    });

    // Quick brand hue dots (Step 2)
    const accentDots = this.container.querySelectorAll('.accent-dot');
    accentDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const hex = dot.getAttribute('data-accent-hex');
        if (hex) {
          this.state.vibe.colors.primary = hex;
          this.state.vibe.colors.primaryHover = getHoverColor(hex);
          this.isCustomized = true;

          // Update primary inputs
          const primaryPicker = this.container.querySelector('.token-color-picker[data-token="primary"]');
          const primaryHex = this.container.querySelector('.token-hex-input[data-token="primary"]');
          const hoverPicker = this.container.querySelector('.token-color-picker[data-token="primaryHover"]');
          const hoverHex = this.container.querySelector('.token-hex-input[data-token="primaryHover"]');

          if (primaryPicker) primaryPicker.value = hex;
          if (primaryHex) primaryHex.value = hex.toUpperCase();
          if (hoverPicker) hoverPicker.value = this.state.vibe.colors.primaryHover;
          if (hoverHex) hoverHex.value = this.state.vibe.colors.primaryHover.toUpperCase();

          this.syncStep2Preview();
        }
      });
    });

    // Color Pickers (Step 2)
    const colorPickers = this.container.querySelectorAll('.token-color-picker');
    colorPickers.forEach(picker => {
      picker.addEventListener('input', (e) => {
        const token = picker.getAttribute('data-token');
        const val = e.target.value;
        this.state.vibe.colors[token] = val;
        this.isCustomized = true;

        // Sync hex text input
        const hexInput = this.container.querySelector(`.token-hex-input[data-token="${token}"]`);
        if (hexInput) hexInput.value = val.toUpperCase();

        // If primary changed, auto-adjust hover state
        if (token === 'primary') {
          const hover = getHoverColor(val);
          this.state.vibe.colors.primaryHover = hover;
          const hPicker = this.container.querySelector('.token-color-picker[data-token="primaryHover"]');
          const hHex = this.container.querySelector('.token-hex-input[data-token="primaryHover"]');
          if (hPicker) hPicker.value = hover;
          if (hHex) hHex.value = hover.toUpperCase();
        }

        this.syncStep2Preview();
      });
    });

    // Hex Text Inputs (Step 2)
    const hexInputs = this.container.querySelectorAll('.token-hex-input');
    hexInputs.forEach(input => {
      input.addEventListener('input', (e) => {
        let val = e.target.value.trim();
        if (!val.startsWith('#') && /^[0-9a-fA-F]{3,6}$/.test(val)) {
          val = '#' + val;
        }
        if (/^#[0-9a-fA-F]{3}$/.test(val)) {
          val = '#' + val.slice(1).split('').map(x => x + x).join('');
        }
        if (/^#[0-9a-fA-F]{6}$/.test(val)) {
          const token = input.getAttribute('data-token');
          this.state.vibe.colors[token] = val;
          this.isCustomized = true;

          const picker = this.container.querySelector(`.token-color-picker[data-token="${token}"]`);
          if (picker) picker.value = val;

          if (token === 'primary') {
            const hover = getHoverColor(val);
            this.state.vibe.colors.primaryHover = hover;
            const hPicker = this.container.querySelector('.token-color-picker[data-token="primaryHover"]');
            const hHex = this.container.querySelector('.token-hex-input[data-token="primaryHover"]');
            if (hPicker) hPicker.value = hover;
            if (hHex) hHex.value = hover.toUpperCase();
          }

          this.syncStep2Preview();
        }
      });
    });

    // Toggle Light/Dark Canvas mode (Step 2)
    const btnToggleCanvas = document.getElementById('btnToggleCanvasMode');
    if (btnToggleCanvas) {
      btnToggleCanvas.addEventListener('click', () => {
        this.state.vibe.colors = toggleCanvasMode(this.state.vibe.colors);
        this.isCustomized = true;
        this.update();
      });
    }

    // Auto-Harmonize (Step 2)
    const btnHarmonize = document.getElementById('btnAutoHarmonize');
    if (btnHarmonize) {
      btnHarmonize.addEventListener('click', () => {
        const c = this.state.vibe.colors;
        this.state.vibe.colors = autoHarmonizeColors(c.primary, c.bg, c.accent);
        this.isCustomized = true;
        this.update();
      });
    }

    // Reset Palette (Step 2)
    const btnReset = document.getElementById('btnResetPalette');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        const orig = DESIGN_VIBES.find(v => v.id === this.state.vibe.id);
        if (orig) {
          this.state.vibe = JSON.parse(JSON.stringify(orig));
          this.isCustomized = false;
          this.update();
        }
      });
    }

    // Section checkboxes (Step 3)
    const checkboxes = this.container.querySelectorAll('.section-checkbox');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const secId = cb.value;
        if (cb.checked) {
          if (!this.state.sections.includes(secId)) {
            this.state.sections.push(secId);
          }
        } else {
          this.state.sections = this.state.sections.filter(id => id !== secId);
        }
        const label = cb.closest('.section-item');
        if (label) label.classList.toggle('selected', cb.checked);
      });
    });

    // Level selection (Step 4)
    const levelCards = this.container.querySelectorAll('.level-card');
    levelCards.forEach(card => {
      card.addEventListener('click', () => {
        const lvlId = card.getAttribute('data-level-id');
        const selectedLvl = EXPERIENCE_LEVELS.find(l => l.id === lvlId);
        if (selectedLvl) {
          this.state.level = selectedLvl;
          this.update();
        }
      });
    });

    // Hero inputs in step 4
    const headlineInput = document.getElementById('heroHeadlineInput');
    const subheadInput = document.getElementById('heroSubheadInput');
    const ctaInput = document.getElementById('heroCtaInput');

    if (headlineInput) {
      headlineInput.addEventListener('input', (e) => {
        this.state.customHero.headline = e.target.value;
      });
    }
    if (subheadInput) {
      subheadInput.addEventListener('input', (e) => {
        this.state.customHero.subhead = e.target.value;
      });
    }
    if (ctaInput) {
      ctaInput.addEventListener('input', (e) => {
        this.state.customHero.cta = e.target.value;
      });
    }

    // Navigation buttons
    const prevBtn = document.getElementById('wizPrev');
    const nextBtn = document.getElementById('wizNext');
    const finishBtn = document.getElementById('wizFinish');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentStep > 1) {
          this.currentStep--;
          this.update();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentStep < this.totalSteps) {
          this.currentStep++;
          this.update();
        }
      });
    }

    if (finishBtn) {
      finishBtn.addEventListener('click', () => {
        if (this.onComplete) {
          this.onComplete(this.state);
        }
      });
    }
  }
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(str = '') {
  return String(str)
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
