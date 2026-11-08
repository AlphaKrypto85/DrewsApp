/**
 * Wireframe & Layout Architecture Module
 * Interactive visual layout diagram, desktop vs mobile preview, and layout decision matrices.
 */

export class WireframeView {
  constructor(project) {
    this.project = project;
    this.viewMode = 'desktop'; // 'desktop' or 'mobile'
  }

  render(container) {
    this.container = container;
    this.update();
  }

  update() {
    const sections = this.project.sections || [];
    const has = (id) => sections.includes(id);

    this.container.innerHTML = `
      <div class="wireframe-layout">
        <!-- Header & Viewport Controls -->
        <div class="wf-header">
          <div>
            <span class="badge-pill">Architectural Blueprint</span>
            <h2 class="wf-title">Layout Architecture & Wireframe</h2>
            <p class="wf-subtitle">
              Visual map of your semantic HTML structure. See how desktop rows collapse into mobile stacks.
            </p>
          </div>
          <div class="viewport-toggle">
            <button type="button" class="view-btn ${this.viewMode === 'desktop' ? 'active' : ''}" data-mode="desktop">
              💻 Desktop View (1200px)
            </button>
            <button type="button" class="view-btn ${this.viewMode === 'mobile' ? 'active' : ''}" data-mode="mobile">
              📱 Mobile View (375px)
            </button>
          </div>
        </div>

        <!-- Wireframe Canvas Container -->
        <div class="wireframe-stage">
          <div class="wireframe-canvas ${this.viewMode}">
            <div class="wf-browser-chrome">
              <div class="chrome-dots">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
              </div>
              <div class="chrome-url-bar">${this.project.name.toLowerCase().replace(/\\s+/g, '')}.com</div>
            </div>

            <div class="wf-document">
              <!-- 1. Header Wireframe -->
              ${has('nav') ? `
                <div class="wf-block wf-header-block" title="<header> & <nav>">
                  <div class="wf-tag-pill">&lt;header class="site-header"&gt;</div>
                  <div class="wf-nav-content ${this.viewMode}">
                    <div class="wf-box wf-logo">&diams; ${escapeHtml(this.project.name)}</div>
                    ${this.viewMode === 'desktop' ? `
                      <div class="wf-links-row">
                        <span class="wf-link">About</span>
                        <span class="wf-link">Services</span>
                        <span class="wf-link">Work</span>
                        <span class="wf-btn-pill">Contact</span>
                      </div>
                    ` : `
                      <div class="wf-hamburger">&#9776;</div>
                    `}
                  </div>
                </div>
              ` : ''}

              <!-- 2. Hero Wireframe -->
              ${has('hero') ? `
                <div class="wf-block wf-hero-block" title="<section class='hero'>">
                  <div class="wf-tag-pill">&lt;section class="hero-section"&gt; &bull; Flexbox Split</div>
                  <div class="wf-hero-grid ${this.viewMode}">
                    <div class="wf-col wf-hero-text">
                      <div class="wf-badge-mock"></div>
                      <div class="wf-line wf-title-line"></div>
                      <div class="wf-line wf-sub-line"></div>
                      <div class="wf-line wf-sub-line short"></div>
                      <div class="wf-btn-row">
                        <div class="wf-btn-mock primary"></div>
                        <div class="wf-btn-mock secondary"></div>
                      </div>
                    </div>
                    <div class="wf-col wf-hero-img-box">
                      <div class="wf-image-placeholder">
                        <span>🖼️ Hero Visual Anchor</span>
                      </div>
                    </div>
                  </div>
                </div>
              ` : ''}

              <!-- 3. Features Wireframe -->
              ${has('features') ? `
                <div class="wf-block wf-section-block" title="<section id='features'>">
                  <div class="wf-tag-pill">&lt;section id="features"&gt; &bull; CSS Grid (auto-fit, minmax(280px, 1fr))</div>
                  <div class="wf-section-head-mock">
                    <div class="wf-line wf-title-center"></div>
                    <div class="wf-line wf-sub-center"></div>
                  </div>
                  <div class="wf-cards-grid ${this.viewMode}">
                    <div class="wf-card-mock"><div class="wf-card-icon"></div><div class="wf-line"></div><div class="wf-line short"></div></div>
                    <div class="wf-card-mock"><div class="wf-card-icon"></div><div class="wf-line"></div><div class="wf-line short"></div></div>
                    <div class="wf-card-mock"><div class="wf-card-icon"></div><div class="wf-line"></div><div class="wf-line short"></div></div>
                  </div>
                </div>
              ` : ''}

              <!-- 4. About Wireframe -->
              ${has('about') ? `
                <div class="wf-block wf-section-block alt" title="<section id='about'>">
                  <div class="wf-tag-pill">&lt;section id="about"&gt; &bull; 2-Column Split Grid</div>
                  <div class="wf-split-grid ${this.viewMode}">
                    <div class="wf-col wf-box-frame"><span>📖 Story / Mission Visual</span></div>
                    <div class="wf-col">
                      <div class="wf-line wf-title-line"></div>
                      <div class="wf-line"></div>
                      <div class="wf-line"></div>
                      <div class="wf-line short"></div>
                    </div>
                  </div>
                </div>
              ` : ''}

              <!-- 5. Contact Wireframe -->
              ${has('contact') ? `
                <div class="wf-block wf-section-block" title="<section id='contact'>">
                  <div class="wf-tag-pill">&lt;section id="contact"&gt; &bull; Accessible Form</div>
                  <div class="wf-split-grid ${this.viewMode}">
                    <div class="wf-col">
                      <div class="wf-line wf-title-line"></div>
                      <div class="wf-line"></div>
                      <div class="wf-line short"></div>
                    </div>
                    <div class="wf-col wf-form-mock">
                      <div class="wf-input-mock"></div>
                      <div class="wf-input-mock"></div>
                      <div class="wf-input-mock tall"></div>
                      <div class="wf-btn-mock primary full"></div>
                    </div>
                  </div>
                </div>
              ` : ''}

              <!-- 6. Footer Wireframe -->
              ${has('footer') ? `
                <div class="wf-block wf-footer-block" title="<footer>">
                  <div class="wf-tag-pill">&lt;footer class="site-footer"&gt;</div>
                  <div class="wf-footer-row">
                    <div class="wf-line short"></div>
                    <div class="wf-line short"></div>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Layout Decision Matrix -->
        <section class="layout-matrix-card mt-4">
          <h3 class="ds-section-title">⚖️ Flexbox vs CSS Grid: Where to Use Which</h3>
          <p class="text-muted mb-3">
            Beginners often get confused about when to reach for Flexbox versus Grid. Here is the straightforward golden rule:
          </p>

          <div class="matrix-compare-grid">
            <div class="compare-card">
              <div class="compare-header flexbox">
                <h4>CSS Flexbox (One-Dimensional)</h4>
                <span class="compare-rule">Rows OR Columns</span>
              </div>
              <p>Best for items laid out in a single direction where you want items to space out or align nicely.</p>
              <ul class="compare-list">
                <li>&check; <strong>Navigation Bar:</strong> Align logo on the left, links on the right</li>
                <li>&check; <strong>Button Groups:</strong> Primary button next to secondary button</li>
                <li>&check; <strong>Tag / Pill Lists:</strong> Wrapping pills on a project card</li>
                <li>&check; <strong>Vertical Centering:</strong> Perfect centering inside a hero box</li>
              </ul>
            </div>

            <div class="compare-card">
              <div class="compare-header grid">
                <h4>CSS Grid (Two-Dimensional)</h4>
                <span class="compare-rule">Rows AND Columns</span>
              </div>
              <p>Best for overall page layouts and multi-column card grids where items need to align on both axes.</p>
              <ul class="compare-list">
                <li>&check; <strong>Cards Grids:</strong> 3-column services or portfolio cards</li>
                <li>&check; <strong>Split Sections:</strong> Image on the left, text on the right</li>
                <li>&check; <strong>Photo Galleries:</strong> Responsive masonry or square photo grids</li>
                <li>&check; <strong>Pricing Tables:</strong> Side-by-side tier cards with uniform height</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const buttons = this.container.querySelectorAll('.view-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.viewMode = btn.getAttribute('data-mode');
        this.update();
      });
    });
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
