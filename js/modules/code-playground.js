/**
 * Interactive Code Playground & Learning Sandbox Module
 * In-browser HTML/CSS/JS sandbox with live preview iframe and accessibility inspector.
 */

import { generateCompleteHtml, generateCompleteCss, generateCompleteJs } from '../data/code-templates.js';
import { CURRICULUM_MILESTONES } from '../data/curriculum.js';
import { Storage } from '../utils/storage.js';

export class CodePlayground {
  constructor(project) {
    this.project = project;
    this.activeTab = 'html'; // 'html', 'css', 'js', 'inspector'
    this.previewMode = 'desktop'; // 'desktop', 'tablet', 'mobile'

    // Load initial code from storage or generate default starter
    const saved = Storage.getPlayground();
    if (saved) {
      this.code = saved;
    } else {
      this.code = {
        html: generateCompleteHtml(this.project),
        css: generateCompleteCss(this.project),
        js: generateCompleteJs(this.project)
      };
    }
  }

  loadMilestone(milestoneId) {
    const milestone = CURRICULUM_MILESTONES.find(m => m.id === milestoneId);
    if (!milestone) return;

    if (milestone.codeSnippet) {
      this.code.html = milestone.codeSnippet;
    }
    if (milestone.cssSnippet) {
      this.code.css = milestone.cssSnippet;
    }
    this.update();
    this.runPreview();
  }

  render(container) {
    this.container = container;
    this.update();
    this.runPreview();
  }

  update() {
    this.container.innerHTML = `
      <div class="playground-layout">
        <!-- Playground Top Bar -->
        <div class="pg-topbar">
          <div class="pg-controls-left">
            <div class="pg-tabs">
              <button type="button" class="pg-tab ${this.activeTab === 'html' ? 'active' : ''}" data-tab="html">
                📄 HTML
              </button>
              <button type="button" class="pg-tab ${this.activeTab === 'css' ? 'active' : ''}" data-tab="css">
                🎨 CSS
              </button>
              <button type="button" class="pg-tab ${this.activeTab === 'js' ? 'active' : ''}" data-tab="js">
                ⚡ JS
              </button>
              <button type="button" class="pg-tab inspector-tab ${this.activeTab === 'inspector' ? 'active' : ''}" data-tab="inspector">
                🔍 Code Health Inspector
              </button>
            </div>
          </div>

          <div class="pg-controls-right">
            <!-- Preset loader dropdown -->
            <select class="pg-select" id="milestoneLoaderSelect">
              <option value="">-- Load Code Example --</option>
              <option value="complete">🚀 Full Handcrafted Website</option>
              <option value="setup">Step 1: Minimal Setup</option>
              <option value="skeleton">Step 2: HTML5 Skeleton</option>
              <option value="navigation">Step 3: Responsive Navigation</option>
              <option value="hero">Step 4: Hero Section</option>
              <option value="content-grid">Step 5: Content Cards Grid</option>
              <option value="forms-interactivity">Step 6: Contact Form</option>
              <option value="mobile-first-js">Step 7: Vanilla JS & Mobile</option>
            </select>

            <button type="button" class="btn btn-secondary btn-sm" id="pgResetBtn" title="Reset to project starter">
              ↺ Reset
            </button>
            <button type="button" class="btn btn-primary btn-sm" id="pgRunBtn">
              ▶ Run Preview
            </button>
          </div>
        </div>

        <!-- Main Split: Editor on Left, Live Preview on Right -->
        <div class="pg-split-pane">
          <!-- Editor Area -->
          <div class="pg-editor-pane">
            ${this.activeTab === 'inspector' ? this.renderInspectorView() : `
              <div class="editor-header">
                <span class="editor-filename">
                  ${this.activeTab === 'html' ? 'index.html' : this.activeTab === 'css' ? 'css/style.css' : 'js/main.js'}
                </span>
                <span class="editor-hint">Edit code below — updates in real time</span>
              </div>
              <textarea 
                class="pg-textarea" 
                id="codeEditor" 
                spellcheck="false" 
                placeholder="Type your code here..."
              >${escapeHtml(this.code[this.activeTab])}</textarea>
            `}
          </div>

          <!-- Preview Area -->
          <div class="pg-preview-pane">
            <div class="preview-toolbar">
              <div class="viewport-buttons">
                <button type="button" class="vp-btn ${this.previewMode === 'desktop' ? 'active' : ''}" data-vp="desktop" title="Desktop View (100%)">
                  💻 Desktop
                </button>
                <button type="button" class="vp-btn ${this.previewMode === 'tablet' ? 'active' : ''}" data-vp="tablet" title="Tablet View (768px)">
                  📋 Tablet
                </button>
                <button type="button" class="vp-btn ${this.previewMode === 'mobile' ? 'active' : ''}" data-vp="mobile" title="Mobile View (375px)">
                  📱 Mobile
                </button>
              </div>
              <span class="preview-status-pill" id="previewStatus">Live Preview</span>
            </div>

            <div class="preview-frame-wrapper ${this.previewMode}">
              <iframe id="previewIframe" sandbox="allow-scripts allow-modals" title="Live Website Sandbox"></iframe>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    if (this.activeTab !== 'inspector') {
      this.runPreview();
    }
  }

  runPreview() {
    const iframe = document.getElementById('previewIframe');
    if (!iframe) return;

    // Save to storage
    Storage.savePlayground(this.code);

    let docHtml = this.code.html;

    // If docHtml is just a fragment (e.g. from milestone 3, 4, 5 without full skeleton), wrap it!
    if (!docHtml.includes('<!DOCTYPE') && !docHtml.includes('<html')) {
      docHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${this.project.vibe.typography.googleFontsUrl}" rel="stylesheet">
  <style>
    ${this.code.css}
  </style>
</head>
<body>
  ${docHtml}
  <script>
    ${this.code.js}
  </script>
</body>
</html>`;
    } else {
      // Inject CSS and JS into complete document
      if (this.code.css && !docHtml.includes('<style>')) {
        docHtml = docHtml.replace('</head>', `<style>\n${this.code.css}\n</style>\n</head>`);
      }
      if (this.code.js && !docHtml.includes('<script>')) {
        docHtml = docHtml.replace('</body>', `<script>\n${this.code.js}\n</script>\n</body>`);
      }
    }

    iframe.srcdoc = docHtml;

    const statusPill = document.getElementById('previewStatus');
    if (statusPill) {
      statusPill.textContent = '✓ Updated';
      setTimeout(() => {
        if (statusPill) statusPill.textContent = 'Live Preview';
      }, 1500);
    }
  }

  renderInspectorView() {
    const issues = this.auditCode();
    return `
      <div class="inspector-panel">
        <div class="inspector-header">
          <h3 class="inspector-title">🔍 Code Health & Accessibility Inspector</h3>
          <p class="inspector-desc">
            Static analysis of your HTML & CSS markup. We check for WCAG accessibility, semantic correctness, and beginner pitfalls.
          </p>
        </div>

        <div class="audit-summary-row mb-3">
          <div class="audit-score-pill ${issues.errors.length === 0 ? 'score-good' : 'score-warn'}">
            ${issues.errors.length === 0 ? '🎉 High Quality Markup' : `⚠️ ${issues.errors.length} Important Issues Found`}
          </div>
          <span class="audit-counts">
            ${issues.passes.length} Passed Checks &bull; ${issues.errors.length} Warnings &bull; ${issues.tips.length} Senior Tips
          </span>
        </div>

        <div class="audit-cards-stream">
          <!-- Warnings & Errors -->
          ${issues.errors.map(err => `
            <div class="audit-card error">
              <div class="audit-card-icon">⚠️</div>
              <div class="audit-card-body">
                <strong>${err.title}</strong>
                <p>${err.detail}</p>
                <div class="audit-fix"><strong>Fix:</strong> <code>${escapeHtml(err.fix)}</code></div>
              </div>
            </div>
          `).join('')}

          <!-- Senior Developer Tips -->
          ${issues.tips.map(tip => `
            <div class="audit-card tip">
              <div class="audit-card-icon">💡</div>
              <div class="audit-card-body">
                <strong>${tip.title}</strong>
                <p>${tip.detail}</p>
              </div>
            </div>
          `).join('')}

          <!-- Passed Checks -->
          ${issues.passes.map(pass => `
            <div class="audit-card pass">
              <div class="audit-card-icon">&check;</div>
              <div class="audit-card-body">
                <strong>${pass.title}</strong>
                <p>${pass.detail}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  auditCode() {
    const html = this.code.html || '';
    const css = this.code.css || '';

    const errors = [];
    const tips = [];
    const passes = [];

    // 1. DOCTYPE check
    if (html.includes('<!DOCTYPE html>') || html.includes('<!doctype html>')) {
      passes.push({ title: 'HTML5 DOCTYPE present', detail: 'Standards mode is correctly enabled for all modern browsers.' });
    } else {
      errors.push({
        title: 'Missing <!DOCTYPE html> declaration',
        detail: 'Without a doctype, browsers will enter "quirks mode", causing erratic CSS box rendering.',
        fix: 'Add <!DOCTYPE html> as the very first line of your file.'
      });
    }

    // 2. Viewport meta
    if (html.includes('name="viewport"') && html.includes('width=device-width')) {
      passes.push({ title: 'Responsive viewport meta configured', detail: 'Mobile devices will properly scale text and layout 1:1.' });
    } else {
      errors.push({
        title: 'Missing viewport meta tag',
        detail: 'Smartphones will render your site tiny and zoomed out.',
        fix: '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
      });
    }

    // 3. Image ALT tags check
    const imgMatches = html.match(/<img[^>]+>/gi) || [];
    let missingAltCount = 0;
    imgMatches.forEach(img => {
      if (!img.includes('alt=')) missingAltCount++;
    });

    if (imgMatches.length > 0 && missingAltCount > 0) {
      errors.push({
        title: `${missingAltCount} image(s) missing alt attribute`,
        detail: 'Screen readers cannot describe images without alt text, and search engine crawlers cannot index them.',
        fix: '<img src="..." alt="Descriptive text of image content">'
      });
    } else if (imgMatches.length > 0) {
      passes.push({ title: 'All images have alt descriptions', detail: 'Screen reader users will know what your images represent.' });
    }

    // 4. Form inputs paired with labels
    const inputMatches = html.match(/<input[^>]+>/gi) || [];
    let inputsWithoutId = 0;
    inputMatches.forEach(inp => {
      if (inp.includes('type="submit"') || inp.includes('type="button"') || inp.includes('type="checkbox"')) return;
      if (!inp.includes('id=')) inputsWithoutId++;
    });

    if (inputsWithoutId > 0) {
      errors.push({
        title: 'Input field(s) missing unique "id" for <label>',
        detail: 'Labels must be explicitly connected to inputs using the "for" and "id" attributes.',
        fix: '<label for="myInput">Name</label> <input id="myInput">'
      });
    } else if (inputMatches.length > 0) {
      passes.push({ title: 'Form inputs properly structured', detail: 'Accessible label associations detected.' });
    }

    // 5. Semantic tag usage
    const hasHeader = html.includes('<header');
    const hasNav = html.includes('<nav');
    const hasMain = html.includes('<main');
    const hasFooter = html.includes('<footer');

    if (hasHeader && hasNav && hasMain && hasFooter) {
      passes.push({ title: 'Excellent semantic architecture', detail: 'You are using <header>, <nav>, <main>, and <footer> instead of generic <div> soup.' });
    } else {
      tips.push({
        title: 'Expand semantic tag usage',
        detail: 'Try wrapping your navigation in <nav>, primary content in <main>, and bottom links in <footer> for optimal accessibility.'
      });
    }

    // 6. CSS box-sizing
    if (css.includes('box-sizing: border-box')) {
      passes.push({ title: 'Modern box-sizing: border-box in place', detail: 'Padding and borders are included in element widths, preventing unexpected overflow.' });
    } else {
      tips.push({
        title: 'Consider adding universal box-sizing',
        detail: 'Adding *, *::before, *::after { box-sizing: border-box; } makes layout sizing intuitive.'
      });
    }

    // 7. Responsive media queries
    if (css.includes('@media')) {
      passes.push({ title: 'Mobile-first media queries detected', detail: 'Styles adapt to different viewport widths.' });
    } else {
      tips.push({
        title: 'Consider adding responsive @media rules',
        detail: 'Use @media (min-width: 768px) to enhance multi-column layouts on tablets and desktops.'
      });
    }

    return { errors, tips, passes };
  }

  bindEvents() {
    // Tabs
    const tabs = this.container.querySelectorAll('.pg-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.activeTab = tab.getAttribute('data-tab');
        this.update();
      });
    });

    // Code editing
    const editor = document.getElementById('codeEditor');
    if (editor) {
      let timeout;
      editor.addEventListener('input', (e) => {
        this.code[this.activeTab] = e.target.value;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.runPreview();
        }, 500); // 500ms debounce
      });

      // Handle Tab key in textarea
      editor.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          e.preventDefault();
          const start = editor.selectionStart;
          const end = editor.selectionEnd;
          editor.value = editor.value.substring(0, start) + '  ' + editor.value.substring(end);
          editor.selectionStart = editor.selectionEnd = start + 2;
          this.code[this.activeTab] = editor.value;
        }
      });
    }

    // Run preview button
    const runBtn = document.getElementById('pgRunBtn');
    if (runBtn) {
      runBtn.addEventListener('click', () => {
        this.runPreview();
      });
    }

    // Reset button
    const resetBtn = document.getElementById('pgResetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset playground code back to your customized project starter?')) {
          this.code = {
            html: generateCompleteHtml(this.project),
            css: generateCompleteCss(this.project),
            js: generateCompleteJs(this.project)
          };
          this.update();
        }
      });
    }

    // Milestone loader dropdown
    const loaderSelect = document.getElementById('milestoneLoaderSelect');
    if (loaderSelect) {
      loaderSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (!val) return;
        if (val === 'complete') {
          this.code = {
            html: generateCompleteHtml(this.project),
            css: generateCompleteCss(this.project),
            js: generateCompleteJs(this.project)
          };
          this.update();
        } else {
          this.loadMilestone(val);
        }
      });
    }

    // Viewport switcher
    const vpButtons = this.container.querySelectorAll('.vp-btn');
    vpButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        this.previewMode = btn.getAttribute('data-vp');
        const frameWrapper = this.container.querySelector('.preview-frame-wrapper');
        if (frameWrapper) {
          frameWrapper.className = `preview-frame-wrapper ${this.previewMode}`;
        }
        vpButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
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
