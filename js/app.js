/**
 * WebCraft Master Application
 * Coordinates views, state persistence, tab routing, and interactive tools.
 */

import { Storage } from './utils/storage.js';
import { Wizard } from './modules/wizard.js';
import { BlueprintView } from './modules/blueprint-view.js';
import { DesignSystemView } from './modules/design-system.js';
import { WireframeView } from './modules/wireframe-view.js';
import { ContentStudioView } from './modules/content-studio.js';
import { CodePlayground } from './modules/code-playground.js';
import { VisualLabsView } from './modules/visual-labs.js';
import { ExporterView } from './modules/exporter.js';

class App {
  constructor() {
    this.currentView = 'blueprint'; // 'wizard', 'blueprint', 'design', 'wireframe', 'content', 'playground', 'visual-labs', 'export'
    this.project = Storage.getProject();
    this.playgroundInstance = null;

    this.init();
  }

  init() {
    // If no project exists yet, open wizard by default
    if (!this.project) {
      this.currentView = 'wizard';
    }

    this.renderLayout();
    this.renderCurrentView();
  }

  renderLayout() {
    const appEl = document.getElementById('app');
    appEl.innerHTML = `
      <div class="app-shell">
        <!-- Top App Navigation Bar -->
        <header class="app-nav">
          <div class="app-nav-left">
            <div class="app-brand" id="brandHomeLink">
              <span class="app-brand-mark">&#128736;</span>
              <span class="app-brand-name">WebCraft</span>
              <span class="app-brand-badge">Self-Reliance Studio</span>
            </div>
            ${this.project ? `
              <div class="active-project-badge">
                <span class="badge-dot"></span>
                <span class="project-name-display" id="projectEditBtn" title="Click to edit specifications">
                  ${escapeHtml(this.project.name)} &bull; <em>${this.project.type.title}</em> ✏️
                </span>
              </div>
            ` : ''}
          </div>

          <div class="app-nav-center">
            ${this.project ? `
              <nav class="studio-tabs">
                <button type="button" class="tab-link ${this.currentView === 'blueprint' ? 'active' : ''}" data-view="blueprint">
                  🗺️ Blueprint
                </button>
                <button type="button" class="tab-link ${this.currentView === 'design' ? 'active' : ''}" data-view="design">
                  🎨 Colors & Design
                </button>
                <button type="button" class="tab-link ${this.currentView === 'wireframe' ? 'active' : ''}" data-view="wireframe">
                  📐 Wireframe
                </button>
                <button type="button" class="tab-link ${this.currentView === 'content' ? 'active' : ''}" data-view="content">
                  ✍️ Content
                </button>
                <button type="button" class="tab-link ${this.currentView === 'playground' ? 'active' : ''}" data-view="playground">
                  💻 Playground
                </button>
                <button type="button" class="tab-link ${this.currentView === 'visual-labs' ? 'active' : ''}" data-view="visual-labs">
                  🔬 Visual Labs
                </button>
                <button type="button" class="tab-link ${this.currentView === 'export' ? 'active' : ''}" data-view="export">
                  📦 Export Kit
                </button>
              </nav>
            ` : ''}
          </div>

          <div class="app-nav-right">
            ${this.project ? `
              <button type="button" class="btn btn-primary btn-sm" id="topDownloadZipBtn">
                📦 Download .zip
              </button>
            ` : `
              <span class="tag-setup">Crafting Assistant</span>
            `}
          </div>
        </header>

        <!-- Main Workspace View Container -->
        <main class="app-main" id="mainViewContainer"></main>

        <!-- Toast Notifications Area -->
        <div id="toastContainer" class="toast-container"></div>
      </div>
    `;

    this.bindGlobalEvents();
  }

  renderCurrentView() {
    const container = document.getElementById('mainViewContainer');
    if (!container) return;

    if (this.currentView === 'wizard' || !this.project) {
      const wizard = new Wizard((newProject) => {
        this.project = newProject;
        Storage.saveProject(this.project);
        this.showToast('🚀 Blueprint generated successfully!');
        this.currentView = 'blueprint';
        this.renderLayout();
        this.renderCurrentView();
      }, this.project);
      wizard.render(container);
      return;
    }

    // Update active tab styles
    const tabLinks = document.querySelectorAll('.studio-tabs .tab-link');
    tabLinks.forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-view') === this.currentView);
    });

    switch (this.currentView) {
      case 'blueprint':
        new BlueprintView(this.project, (milestoneId) => {
          this.currentView = 'playground';
          this.renderLayout();
          this.renderCurrentView();
          if (this.playgroundInstance) {
            this.playgroundInstance.loadMilestone(milestoneId);
          }
        }).render(container);
        break;

      case 'design':
        new DesignSystemView(this.project, (updatedProject) => {
          this.project = updatedProject;
          Storage.saveProject(this.project);
        }).render(container);
        break;

      case 'wireframe':
        new WireframeView(this.project).render(container);
        break;

      case 'content':
        new ContentStudioView(this.project).render(container);
        break;

      case 'playground':
        this.playgroundInstance = new CodePlayground(this.project);
        this.playgroundInstance.render(container);
        break;

      case 'visual-labs':
        new VisualLabsView().render(container);
        break;

      case 'export':
        new ExporterView(this.project).render(container);
        break;

      default:
        this.currentView = 'blueprint';
        this.renderCurrentView();
        break;
    }
  }

  bindGlobalEvents() {
    // Tab switching
    const tabs = document.querySelectorAll('.studio-tabs .tab-link');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.currentView = tab.getAttribute('data-view');
        this.renderCurrentView();
      });
    });

    // Brand logo click
    const brand = document.getElementById('brandHomeLink');
    if (brand) {
      brand.addEventListener('click', () => {
        if (this.project) {
          this.currentView = 'blueprint';
          this.renderCurrentView();
        }
      });
    }

    // Edit specifications button
    const editBtn = document.getElementById('projectEditBtn');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        if (confirm('Re-enter the Site Architect Wizard to modify your website specifications?')) {
          this.currentView = 'wizard';
          this.renderLayout();
          this.renderCurrentView();
        }
      });
    }

    // Quick download zip
    const topZipBtn = document.getElementById('topDownloadZipBtn');
    if (topZipBtn) {
      topZipBtn.addEventListener('click', () => {
        this.currentView = 'export';
        this.renderCurrentView();
      });
    }
  }

  showToast(message, duration = 3000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'app-toast';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 400);
    }, duration);
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

// Bootstrap
document.addEventListener('DOMContentLoaded', () => {
  window.webCraftApp = new App();
});
