/**
 * Master Blueprint & Step-by-Step Curriculum View
 * Interactive roadmap guiding the user through building their site from scratch.
 */

import { CURRICULUM_MILESTONES } from '../data/curriculum.js';
import { Storage } from '../utils/storage.js';

export class BlueprintView {
  constructor(project, onOpenPlayground) {
    this.project = project;
    this.onOpenPlayground = onOpenPlayground;
    this.expandedMilestoneId = 'setup'; // default expanded
  }

  render(container) {
    this.container = container;
    this.update();
  }

  update() {
    const progress = Storage.getProgress();
    const totalMilestones = CURRICULUM_MILESTONES.length;
    let completedMilestones = 0;

    CURRICULUM_MILESTONES.forEach(m => {
      const allActionSteps = m.actionSteps || [];
      const checkedCount = allActionSteps.filter((_, idx) => progress[`${m.id}:${idx}`]).length;
      if (allActionSteps.length > 0 && checkedCount === allActionSteps.length) {
        completedMilestones++;
      }
    });

    const percentComplete = Math.round((completedMilestones / totalMilestones) * 100);

    this.container.innerHTML = `
      <div class="blueprint-layout">
        <!-- Blueprint Header & Stats -->
        <header class="blueprint-hero">
          <div class="blueprint-hero-content">
            <div class="hero-tags">
              <span class="badge-pill">${this.project.type.title}</span>
              <span class="badge-pill vibe-tag">${this.project.vibe.title}</span>
              <span class="badge-pill">${this.project.level.title}</span>
            </div>
            <h1 class="blueprint-headline">${escapeHtml(this.project.name)}: The Master Blueprint</h1>
            <p class="blueprint-lead">
              A bespoke, 8-milestone developer handbook tailored to your specifications. Follow each step to understand <em>why</em> your website works, without relying on automated AI black boxes.
            </p>
          </div>

          <div class="progress-card">
            <div class="progress-card-top">
              <span class="progress-label">Crafting Progress</span>
              <span class="progress-val">${percentComplete}%</span>
            </div>
            <div class="progress-meter">
              <div class="progress-fill" style="width: ${percentComplete}%"></div>
            </div>
            <p class="progress-subtext">${completedMilestones} of ${totalMilestones} milestones fully completed</p>
          </div>
        </header>

        <!-- Milestones Accordion / List -->
        <div class="milestones-stream">
          ${CURRICULUM_MILESTONES.map(milestone => this.renderMilestone(milestone, progress)).join('')}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderMilestone(m, progress) {
    const isExpanded = this.expandedMilestoneId === m.id;
    const actionSteps = m.actionSteps || [];
    const completedSteps = actionSteps.filter((_, idx) => progress[`${m.id}:${idx}`]).length;
    const isDone = actionSteps.length > 0 && completedSteps === actionSteps.length;

    return `
      <article class="milestone-card ${isExpanded ? 'is-expanded' : ''} ${isDone ? 'is-done' : ''}" id="milestone-${m.id}">
        <div class="milestone-header" data-milestone-id="${m.id}">
          <div class="milestone-left">
            <div class="milestone-num-badge">
              ${isDone ? '&check;' : m.number}
            </div>
            <div class="milestone-title-block">
              <div class="milestone-meta">
                <span class="m-tag">${m.tag}</span>
                <span class="m-time">&bull; Est. ${m.timeEstimate}</span>
                <span class="m-step-count">&bull; ${completedSteps}/${actionSteps.length} tasks done</span>
              </div>
              <h3 class="milestone-title">${m.title}</h3>
            </div>
          </div>
          <div class="milestone-toggle-arrow">
            <span>${isExpanded ? '&#9650;' : '&#9660;'}</span>
          </div>
        </div>

        ${isExpanded ? `
          <div class="milestone-content">
            <p class="milestone-summary">${m.summary}</p>

            <!-- Learning Goals -->
            <div class="learning-goals-box">
              <h4 class="box-heading">🎯 What You Will Learn & Build:</h4>
              <ul class="goals-list">
                ${m.learningGoals.map(g => `<li>${g}</li>`).join('')}
              </ul>
            </div>

            <!-- Concept Deep-Dive -->
            <div class="concept-section">
              ${m.conceptExplainer}
            </div>

            ${m.folderStructure ? `
              <div class="folder-box">
                <h4 class="box-heading">📁 Expected Folder Structure:</h4>
                <pre class="code-block structure-block"><code>${escapeHtml(m.folderStructure)}</code></pre>
              </div>
            ` : ''}

            <!-- Annotated Code -->
            <div class="code-showcase">
              <div class="code-showcase-header">
                <span class="code-lang">HTML &bull; Code to Write</span>
                <div class="code-actions">
                  <button type="button" class="btn-copy-code" data-code="${escapeAttr(m.codeSnippet)}">
                    Copy Code
                  </button>
                  <button type="button" class="btn-open-sandbox" data-milestone="${m.id}">
                    ⚡ Practice in Playground
                  </button>
                </div>
              </div>
              <pre class="code-block"><code>${escapeHtml(m.codeSnippet)}</code></pre>
            </div>

            ${m.cssSnippet ? `
              <div class="code-showcase mt-3">
                <div class="code-showcase-header">
                  <span class="code-lang">CSS &bull; Accompanying Styles</span>
                  <div class="code-actions">
                    <button type="button" class="btn-copy-code" data-code="${escapeAttr(m.cssSnippet)}">
                      Copy CSS
                    </button>
                  </div>
                </div>
                <pre class="code-block"><code>${escapeHtml(m.cssSnippet)}</code></pre>
              </div>
            ` : ''}

            <!-- Common Pitfalls -->
            ${m.pitfalls && m.pitfalls.length > 0 ? `
              <div class="pitfalls-box">
                <h4 class="box-heading">⚠️ Common Mistakes Beginners Make:</h4>
                <ul class="pitfalls-list">
                  ${m.pitfalls.map(p => `<li>${p}</li>`).join('')}
                </ul>
              </div>
            ` : ''}

            <!-- Interactive Action Checklist -->
            <div class="checklist-section">
              <h4 class="box-heading">✅ Milestone Completion Checklist:</h4>
              <div class="checklist-items">
                ${actionSteps.map((step, idx) => {
                  const isChecked = !!progress[`${m.id}:${idx}`];
                  return `
                    <label class="check-item ${isChecked ? 'checked' : ''}">
                      <input 
                        type="checkbox" 
                        class="milestone-checkbox" 
                        data-milestone-id="${m.id}" 
                        data-step-idx="${idx}" 
                        ${isChecked ? 'checked' : ''}
                      >
                      <span class="check-label-text">${step}</span>
                    </label>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        ` : ''}
      </article>
    `;
  }

  bindEvents() {
    // Accordion expand/collapse
    const headers = this.container.querySelectorAll('.milestone-header');
    headers.forEach(h => {
      h.addEventListener('click', () => {
        const id = h.getAttribute('data-milestone-id');
        this.expandedMilestoneId = (this.expandedMilestoneId === id) ? null : id;
        this.update();
      });
    });

    // Checkbox toggles
    const checkboxes = this.container.querySelectorAll('.milestone-checkbox');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const mId = cb.getAttribute('data-milestone-id');
        const sIdx = cb.getAttribute('data-step-idx');
        Storage.toggleChecklistItem(mId, sIdx);
        this.update();
      });
    });

    // Copy code button
    const copyBtns = this.container.querySelectorAll('.btn-copy-code');
    copyBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const code = btn.getAttribute('data-code');
        try {
          await navigator.clipboard.writeText(code);
          const origText = btn.textContent;
          btn.textContent = '✓ Copied!';
          setTimeout(() => { btn.textContent = origText; }, 2000);
        } catch (e) {
          console.warn('Clipboard write failed', e);
        }
      });
    });

    // Open Sandbox button
    const sandboxBtns = this.container.querySelectorAll('.btn-open-sandbox');
    sandboxBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const mId = btn.getAttribute('data-milestone');
        if (this.onOpenPlayground) {
          this.onOpenPlayground(mId);
        }
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

function escapeAttr(str = '') {
  return String(str)
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
