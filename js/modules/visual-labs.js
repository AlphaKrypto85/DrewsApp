/**
 * Visual Concept Studios Module
 * Interactive visual simulators explaining the CSS Box Model and Flexbox mechanics.
 */

export class VisualLabsView {
  constructor() {
    this.activeLab = 'box-model'; // 'box-model' or 'flexbox'

    // Box model initial state
    this.boxState = {
      contentWidth: 200,
      contentHeight: 120,
      padding: 24,
      border: 4,
      margin: 20,
      boxSizing: 'border-box' // or 'content-box'
    };

    // Flexbox initial state
    this.flexState = {
      direction: 'row',
      justify: 'space-between',
      align: 'center',
      wrap: 'nowrap',
      gap: 16,
      itemCount: 4
    };
  }

  render(container) {
    this.container = container;
    this.update();
  }

  update() {
    this.container.innerHTML = `
      <div class="visual-labs-layout">
        <div class="labs-nav mb-4">
          <button type="button" class="lab-tab-btn ${this.activeLab === 'box-model' ? 'active' : ''}" data-lab="box-model">
            📦 The CSS Box Model Simulator
          </button>
          <button type="button" class="lab-tab-btn ${this.activeLab === 'flexbox' ? 'active' : ''}" data-lab="flexbox">
            📐 The Interactive Flexbox Playground
          </button>
        </div>

        <div class="labs-stage">
          ${this.activeLab === 'box-model' ? this.renderBoxModelLab() : this.renderFlexboxLab()}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderBoxModelLab() {
    const s = this.boxState;
    // Calculate computed dimensions
    let totalWidth, totalHeight;
    if (s.boxSizing === 'content-box') {
      totalWidth = s.contentWidth + (s.padding * 2) + (s.border * 2) + (s.margin * 2);
      totalHeight = s.contentHeight + (s.padding * 2) + (s.border * 2) + (s.margin * 2);
    } else {
      // border-box
      totalWidth = s.contentWidth + (s.margin * 2);
      totalHeight = s.contentHeight + (s.margin * 2);
    }

    return `
      <div class="lab-card">
        <div class="lab-header">
          <div>
            <span class="badge-pill">CSS Mental Model</span>
            <h2 class="lab-title">The CSS Box Model Visualizer</h2>
            <p class="lab-subtitle">
              Every single element in HTML is a box. Adjust the sliders to see how Margin, Border, Padding, and Content interact.
            </p>
          </div>
          <div class="box-sizing-switch">
            <span class="switch-label">box-sizing:</span>
            <button type="button" class="btn-toggle-sizing ${s.boxSizing === 'border-box' ? 'active' : ''}" data-sizing="border-box">
              border-box (Modern Standard)
            </button>
            <button type="button" class="btn-toggle-sizing ${s.boxSizing === 'content-box' ? 'active' : ''}" data-sizing="content-box">
              content-box (Legacy)
            </button>
          </div>
        </div>

        <div class="box-model-grid">
          <!-- Controls Panel -->
          <div class="box-controls">
            <div class="control-group">
              <label>Content Width: <strong id="wVal">${s.contentWidth}px</strong></label>
              <input type="range" class="range-slider" id="wSlider" min="120" max="320" value="${s.contentWidth}">
            </div>
            <div class="control-group">
              <label>Padding: <strong id="pVal">${s.padding}px</strong> (Inner space)</label>
              <input type="range" class="range-slider" id="pSlider" min="0" max="48" value="${s.padding}">
            </div>
            <div class="control-group">
              <label>Border: <strong id="bVal">${s.border}px</strong> (Visible outline)</label>
              <input type="range" class="range-slider" id="bSlider" min="0" max="16" value="${s.border}">
            </div>
            <div class="control-group">
              <label>Margin: <strong id="mVal">${s.margin}px</strong> (Outer breathing room)</label>
              <input type="range" class="range-slider" id="mSlider" min="0" max="40" value="${s.margin}">
            </div>

            <!-- Computed Stats -->
            <div class="computed-stats-box mt-3">
              <h4>Computed Total Screen Space:</h4>
              <div class="stat-calc">
                <strong>${totalWidth}px wide &times; ${totalHeight}px tall</strong>
              </div>
              <p class="stat-explanation">
                ${s.boxSizing === 'border-box' 
                  ? '💡 In <strong>border-box</strong>, your specified width (' + s.contentWidth + 'px) includes the padding and border. Element sizing is predictable and never overflows its container!' 
                  : '⚠️ In <strong>content-box</strong>, padding and border are added ON TOP of your width. (200px width + 48px padding + 8px border = 256px!). This is why layouts often break for beginners.'}
              </p>
            </div>
          </div>

          <!-- Concentric Visual Diagram -->
          <div class="box-visual-container">
            <div class="bm-layer bm-margin" style="padding: ${s.margin}px;">
              <span class="bm-label margin-label">MARGIN: ${s.margin}px (Orange)</span>
              
              <div class="bm-layer bm-border" style="padding: ${s.border}px;">
                <span class="bm-label border-label">BORDER: ${s.border}px (Yellow)</span>
                
                <div class="bm-layer bm-padding" style="padding: ${s.padding}px;">
                  <span class="bm-label padding-label">PADDING: ${s.padding}px (Green)</span>
                  
                  <div class="bm-layer bm-content" style="width: ${s.contentWidth}px; height: ${s.contentHeight}px;">
                    <span class="bm-label content-label">CONTENT</span>
                    <span class="bm-dims">${s.contentWidth} &times; ${s.contentHeight}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderFlexboxLab() {
    const f = this.flexState;

    return `
      <div class="lab-card">
        <div class="lab-header">
          <div>
            <span class="badge-pill">Layout Mastery</span>
            <h2 class="lab-title">The Interactive Flexbox Playground</h2>
            <p class="lab-subtitle">
              Flexbox makes aligning elements effortless. Toggle the properties to see how the axes and items shift in real time.
            </p>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" id="copyFlexCssBtn">
            📋 Copy Flexbox CSS
          </button>
        </div>

        <div class="flex-lab-grid">
          <!-- Controls Panel -->
          <div class="flex-controls">
            <!-- Flex Direction -->
            <div class="control-group">
              <label><strong>flex-direction</strong> (Main Axis direction)</label>
              <div class="btn-group-row">
                <button type="button" class="btn-choice ${f.direction === 'row' ? 'active' : ''}" data-prop="direction" data-val="row">row &rarr;</button>
                <button type="button" class="btn-choice ${f.direction === 'column' ? 'active' : ''}" data-prop="direction" data-val="column">column &darr;</button>
                <button type="button" class="btn-choice ${f.direction === 'row-reverse' ? 'active' : ''}" data-prop="direction" data-val="row-reverse">row-reverse &larr;</button>
              </div>
            </div>

            <!-- Justify Content -->
            <div class="control-group">
              <label><strong>justify-content</strong> (Main Axis alignment)</label>
              <div class="btn-group-row wrap">
                <button type="button" class="btn-choice ${f.justify === 'flex-start' ? 'active' : ''}" data-prop="justify" data-val="flex-start">flex-start</button>
                <button type="button" class="btn-choice ${f.justify === 'center' ? 'active' : ''}" data-prop="justify" data-val="center">center</button>
                <button type="button" class="btn-choice ${f.justify === 'flex-end' ? 'active' : ''}" data-prop="justify" data-val="flex-end">flex-end</button>
                <button type="button" class="btn-choice ${f.justify === 'space-between' ? 'active' : ''}" data-prop="justify" data-val="space-between">space-between</button>
                <button type="button" class="btn-choice ${f.justify === 'space-around' ? 'active' : ''}" data-prop="justify" data-val="space-around">space-around</button>
              </div>
            </div>

            <!-- Align Items -->
            <div class="control-group">
              <label><strong>align-items</strong> (Cross Axis alignment)</label>
              <div class="btn-group-row">
                <button type="button" class="btn-choice ${f.align === 'stretch' ? 'active' : ''}" data-prop="align" data-val="stretch">stretch</button>
                <button type="button" class="btn-choice ${f.align === 'center' ? 'active' : ''}" data-prop="align" data-val="center">center</button>
                <button type="button" class="btn-choice ${f.align === 'flex-start' ? 'active' : ''}" data-prop="align" data-val="flex-start">flex-start</button>
                <button type="button" class="btn-choice ${f.align === 'flex-end' ? 'active' : ''}" data-prop="align" data-val="flex-end">flex-end</button>
              </div>
            </div>

            <!-- Gap Slider -->
            <div class="control-group">
              <label><strong>gap:</strong> <strong id="gapVal">${f.gap}px</strong></label>
              <input type="range" class="range-slider" id="gapSlider" min="0" max="40" value="${f.gap}">
            </div>
          </div>

          <!-- Flexbox Live Visual Stage -->
          <div class="flex-visual-pane">
            <div class="axis-indicator">
              <span class="axis-tag">Main Axis: ${f.direction.includes('column') ? 'Vertical &darr;' : 'Horizontal &rarr;'}</span>
              <span class="axis-tag">Cross Axis: ${f.direction.includes('column') ? 'Horizontal &rarr;' : 'Vertical &darr;'}</span>
            </div>

            <div class="flex-container-box" style="
              display: flex;
              flex-direction: ${f.direction};
              justify-content: ${f.justify};
              align-items: ${f.align};
              flex-wrap: ${f.wrap};
              gap: ${f.gap}px;
            ">
              ${Array.from({ length: f.itemCount }).map((_, i) => `
                <div class="flex-item-box item-${i + 1}">
                  <span class="item-title">Item ${i + 1}</span>
                  <span class="item-sub">${i === 1 ? 'Longer Text' : 'Box'}</span>
                </div>
              `).join('')}
            </div>

            <div class="generated-css-box mt-3">
              <span class="gen-css-label">Generated CSS Recipe:</span>
              <pre class="gen-code"><code>.container {
  display: flex;
  flex-direction: ${f.direction};
  justify-content: ${f.justify};
  align-items: ${f.align};
  gap: ${f.gap}px;
}</code></pre>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Switch between labs
    const tabBtns = this.container.querySelectorAll('.lab-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeLab = btn.getAttribute('data-lab');
        this.update();
      });
    });

    // Box model events
    if (this.activeLab === 'box-model') {
      const wSlider = document.getElementById('wSlider');
      const pSlider = document.getElementById('pSlider');
      const bSlider = document.getElementById('bSlider');
      const mSlider = document.getElementById('mSlider');

      const updateBox = () => {
        if (wSlider) this.boxState.contentWidth = parseInt(wSlider.value, 10);
        if (pSlider) this.boxState.padding = parseInt(pSlider.value, 10);
        if (bSlider) this.boxState.border = parseInt(bSlider.value, 10);
        if (mSlider) this.boxState.margin = parseInt(mSlider.value, 10);
        this.update();
      };

      [wSlider, pSlider, bSlider, mSlider].forEach(sl => {
        if (sl) sl.addEventListener('input', updateBox);
      });

      const sizingBtns = this.container.querySelectorAll('.btn-toggle-sizing');
      sizingBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.boxState.boxSizing = btn.getAttribute('data-sizing');
          this.update();
        });
      });
    }

    // Flexbox events
    if (this.activeLab === 'flexbox') {
      const choiceBtns = this.container.querySelectorAll('.btn-choice');
      choiceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const prop = btn.getAttribute('data-prop');
          const val = btn.getAttribute('data-val');
          this.flexState[prop] = val;
          this.update();
        });
      });

      const gapSlider = document.getElementById('gapSlider');
      if (gapSlider) {
        gapSlider.addEventListener('input', (e) => {
          this.flexState.gap = parseInt(e.target.value, 10);
          this.update();
        });
      }

      const copyBtn = document.getElementById('copyFlexCssBtn');
      if (copyBtn) {
        copyBtn.addEventListener('click', async () => {
          const f = this.flexState;
          const css = `display: flex;\nflex-direction: ${f.direction};\njustify-content: ${f.justify};\nalign-items: ${f.align};\ngap: ${f.gap}px;`;
          try {
            await navigator.clipboard.writeText(css);
            copyBtn.textContent = '✓ Copied!';
            setTimeout(() => { copyBtn.textContent = '📋 Copy Flexbox CSS'; }, 2000);
          } catch (e) {
            console.warn(e);
          }
        });
      }
    }
  }
}
