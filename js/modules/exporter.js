/**
 * Exporter & Project Packaging Module
 * Packages the customized project into a .zip archive and generates printable offline roadmaps.
 */

import { SimpleZip } from '../utils/zip-writer.js';
import { generateCompleteHtml, generateCompleteCss, generateCompleteJs, generateReadme } from '../data/code-templates.js';
import { CURRICULUM_MILESTONES } from '../data/curriculum.js';

export class ExporterView {
  constructor(project) {
    this.project = project;
  }

  render(container) {
    this.container = container;
    this.update();
  }

  update() {
    const slug = slugify(this.project.name);

    this.container.innerHTML = `
      <div class="exporter-layout">
        <div class="exp-header">
          <div>
            <span class="badge-pill">Take-Home Deliverables</span>
            <h2 class="exp-title">Export & Starter Kit Studio</h2>
            <p class="exp-subtitle">
              Download your personalized project kit and take your code into VS Code, or export an offline study handbook.
            </p>
          </div>
        </div>

        <div class="exp-cards-grid">
          <!-- Card 1: Complete Zip Archive -->
          <div class="exp-card primary-exp">
            <div class="exp-card-icon">📦</div>
            <h3 class="exp-card-title">Download Starter Kit (.zip)</h3>
            <p class="exp-card-desc">
              A clean, production-ready project folder packed with your customized <code>index.html</code>, <code>css/style.css</code>, <code>js/main.js</code>, and <code>README.md</code>.
            </p>
            <div class="folder-contents-list">
              <span class="folder-item">📄 ${slug}/index.html</span>
              <span class="folder-item">🎨 ${slug}/css/style.css</span>
              <span class="folder-item">⚡ ${slug}/js/main.js</span>
              <span class="folder-item">📖 ${slug}/README.md</span>
              <span class="folder-item">🖼️ ${slug}/images/README.txt</span>
            </div>
            <button type="button" class="btn btn-primary btn-block mt-3" id="btnDownloadZip">
              ⬇ Download ${slug}-kit.zip
            </button>
          </div>

          <!-- Card 2: Offline Markdown Study Guide -->
          <div class="exp-card">
            <div class="exp-card-icon">📖</div>
            <h3 class="exp-card-title">Export Developer Handbook (.md)</h3>
            <p class="exp-card-desc">
              A comprehensive Markdown document containing the complete 8-milestone curriculum, color formulas, and pitfall warnings to read alongside your editor.
            </p>
            <div class="doc-highlights">
              <span>&bull; All 8 milestones with annotated code</span>
              <span>&bull; WCAG contrast formulas & CSS tokens</span>
              <span>&bull; Netlify & GitHub Pages launch guide</span>
            </div>
            <button type="button" class="btn btn-secondary btn-block mt-3" id="btnDownloadGuide">
              ⬇ Download Handbook (.md)
            </button>
            <button type="button" class="btn btn-secondary btn-block mt-2" id="btnPrintHandbook">
              🖨️ Open Print-Friendly View
            </button>
          </div>

          <!-- Card 3: Single File Quick Downloads -->
          <div class="exp-card">
            <div class="exp-card-icon">💾</div>
            <h3 class="exp-card-title">Individual Files</h3>
            <p class="exp-card-desc">
              Prefer grabbing single files directly without unzipping? Download them one-by-one:
            </p>
            <div class="single-file-buttons">
              <button type="button" class="btn btn-secondary btn-sm" id="btnDlHtml">
                ⬇ Download index.html
              </button>
              <button type="button" class="btn btn-secondary btn-sm" id="btnDlCss">
                ⬇ Download style.css
              </button>
              <button type="button" class="btn btn-secondary btn-sm" id="btnDlJs">
                ⬇ Download main.js
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const slug = slugify(this.project.name);

    // Download Zip
    const zipBtn = document.getElementById('btnDownloadZip');
    if (zipBtn) {
      zipBtn.addEventListener('click', () => {
        const zip = new SimpleZip();

        const html = generateCompleteHtml(this.project);
        const css = generateCompleteCss(this.project);
        const js = generateCompleteJs(this.project);
        const readme = generateReadme(this.project);
        const imgReadme = `# Images Folder Guide for ${this.project.name}

Place your website images in this folder:
- Use lowercase filenames with hyphens (e.g. hero-bread.jpg, logo.svg)
- Preferred formats:
  - SVG: Perfect for logos and icons (scales infinitely with zero pixelation)
  - WebP / JPG: Best for photos (compress with squoosh.app for tiny file sizes)
- Reference them in your HTML like:
  <img src="images/hero-bread.jpg" alt="Description of image">
`;

        zip.file(`${slug}/index.html`, html);
        zip.file(`${slug}/css/style.css`, css);
        zip.file(`${slug}/js/main.js`, js);
        zip.file(`${slug}/README.md`, readme);
        zip.file(`${slug}/images/README.txt`, imgReadme);

        const blob = zip.generateBlob();
        downloadBlob(blob, `${slug}-starter-kit.zip`);

        zipBtn.textContent = '✓ Downloaded!';
        setTimeout(() => { zipBtn.textContent = `⬇ Download ${slug}-kit.zip`; }, 3000);
      });
    }

    // Download Markdown Guide
    const guideBtn = document.getElementById('btnDownloadGuide');
    if (guideBtn) {
      guideBtn.addEventListener('click', () => {
        const md = this.generateFullMarkdownHandbook();
        const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
        downloadBlob(blob, `${slug}-developer-handbook.md`);
      });
    }

    // Print Friendly View
    const printBtn = document.getElementById('btnPrintHandbook');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        this.openPrintWindow();
      });
    }

    // Single files
    document.getElementById('btnDlHtml')?.addEventListener('click', () => {
      const blob = new Blob([generateCompleteHtml(this.project)], { type: 'text/html' });
      downloadBlob(blob, 'index.html');
    });

    document.getElementById('btnDlCss')?.addEventListener('click', () => {
      const blob = new Blob([generateCompleteCss(this.project)], { type: 'text/css' });
      downloadBlob(blob, 'style.css');
    });

    document.getElementById('btnDlJs')?.addEventListener('click', () => {
      const blob = new Blob([generateCompleteJs(this.project)], { type: 'application/javascript' });
      downloadBlob(blob, 'main.js');
    });
  }

  generateFullMarkdownHandbook() {
    let md = `# ${this.project.name} - Handcrafted Web Developer Handbook\n\n`;
    md += `> **Category:** ${this.project.type.title} | **Aesthetic:** ${this.project.vibe.title} | **Level:** ${this.project.level.title}\n\n`;
    md += `This handbook guides you step-by-step through building this website completely from scratch using clean HTML5, CSS3, and vanilla JavaScript without relying on automated AI generators.\n\n`;

    md += `## 🎨 Design System & Color Tokens\n\n`;
    md += `\`\`\`css\n:root {\n`;
    const c = this.project.vibe.colors;
    for (const [key, val] of Object.entries(c)) {
      md += `  --color-${key}: ${val};\n`;
    }
    md += `  --font-heading: '${this.project.vibe.typography.headingFont}', serif;\n`;
    md += `  --font-body: '${this.project.vibe.typography.bodyFont}', sans-serif;\n`;
    md += `}\n\`\`\`\n\n`;

    md += `## 📚 Step-by-Step Curriculum\n\n`;
    CURRICULUM_MILESTONES.forEach(m => {
      md += `### Milestone ${m.number}: ${m.title} (${m.timeEstimate})\n\n`;
      md += `**Summary:** ${m.summary}\n\n`;
      md += `#### Goals:\n`;
      m.learningGoals.forEach(g => { md += `- ${g}\n`; });
      md += `\n#### Code to Write:\n\`\`\`html\n${m.codeSnippet}\n\`\`\`\n\n`;
      if (m.cssSnippet) {
        md += `#### Accompanying Styles:\n\`\`\`css\n${m.cssSnippet}\n\`\`\`\n\n`;
      }
      if (m.pitfalls && m.pitfalls.length > 0) {
        md += `#### Common Pitfalls to Avoid:\n`;
        m.pitfalls.forEach(p => { md += `- ⚠️ ${p}\n`; });
        md += `\n`;
      }
      md += `---\n\n`;
    });

    return md;
  }

  openPrintWindow() {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${this.project.name} - Handcrafted Developer Handbook</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #111; }
          h1, h2, h3 { color: #0f172a; }
          pre { background: #f1f5f9; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 13px; }
          code { font-family: monospace; }
          .callout { background: #f8fafc; border-left: 4px solid #4f46e5; padding: 12px 16px; margin: 16px 0; }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <button class="no-print" onclick="window.print()" style="padding: 10px 20px; background: #4f46e5; color: #fff; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin-bottom: 24px;">🖨️ Print or Save as PDF</button>
        <h1>${escapeHtml(this.project.name)} - Master Developer Handbook</h1>
        <p><strong>Site Type:</strong> ${this.project.type.title} | <strong>Aesthetic:</strong> ${this.project.vibe.title}</p>
        <hr>
        ${CURRICULUM_MILESTONES.map(m => `
          <h2>Milestone ${m.number}: ${m.title}</h2>
          <p>${m.summary}</p>
          <pre><code>${escapeHtml(m.codeSnippet)}</code></pre>
          ${m.cssSnippet ? `<pre><code>${escapeHtml(m.cssSnippet)}</code></pre>` : ''}
          <hr>
        `).join('')}
      </body>
      </html>
    `);
    printWindow.document.close();
  }
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function slugify(text = '') {
  return text.toString().toLowerCase()
    .trim()
    .replace(/\\s+/g, '-')
    .replace(/[^\\w\\-]+/g, '')
    .replace(/\\-\\-+/g, '-');
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
