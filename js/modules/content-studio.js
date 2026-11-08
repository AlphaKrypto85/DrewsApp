/**
 * Content & Copywriting Studio Module
 * Practical, non-AI human copywriting frameworks, headlines, value props, and section templates.
 */

export class ContentStudioView {
  constructor(project) {
    this.project = project;
  }

  render(container) {
    this.container = container;
    this.update();
  }

  update() {
    const { name, type } = this.project;

    this.container.innerHTML = `
      <div class="content-studio-layout">
        <!-- Header -->
        <div class="cs-header">
          <div>
            <span class="badge-pill">Human Copywriting Lab</span>
            <h2 class="cs-title">Content & Copywriting Recommendations</h2>
            <p class="cs-subtitle">
              Say goodbye to generic "Lorem Ipsum" and robotic AI jargon. Here are proven human copywriting frameworks to craft compelling words for ${escapeHtml(name)}.
            </p>
          </div>
        </div>

        <!-- 1. The 3-Second Hero Headline Formulas -->
        <section class="cs-card mb-4">
          <h3 class="ds-section-title">⚡ 3-Second Headline Formulas</h3>
          <p class="text-muted mb-3">
            Visitors decide whether to stay within 3 seconds. Test these 3 proven human formulas tailored to your site:
          </p>

          <div class="formula-grid">
            <!-- Formula 1 -->
            <div class="formula-card">
              <span class="formula-tag">Formula 1: Direct Benefit + Target Audience</span>
              <h4 class="formula-heading">"[Desired Result] for [Audience] without [Common Pain Point]"</h4>
              <p class="formula-example">
                <em>Example:</em> "Freshly milled sourdough for Portland families without artificial additives or commercial yeast."
              </p>
              <button type="button" class="btn-copy-template" data-text="Freshly milled sourdough for Portland families without artificial additives or commercial yeast.">
                Copy Headline
              </button>
            </div>

            <!-- Formula 2 -->
            <div class="formula-card">
              <span class="formula-tag">Formula 2: The Emotional Craft Hook</span>
              <h4 class="formula-heading">"Handmade [Product/Service] crafted with [Rare Quality]"</h4>
              <p class="formula-example">
                <em>Example:</em> "Handmade pastries & slow-roasted single-origin coffee baked fresh at dawn every single morning."
              </p>
              <button type="button" class="btn-copy-template" data-text="Handmade pastries & slow-roasted single-origin coffee baked fresh at dawn every single morning.">
                Copy Headline
              </button>
            </div>

            <!-- Formula 3 -->
            <div class="formula-card">
              <span class="formula-tag">Formula 3: The Problem-Solver Hook</span>
              <h4 class="formula-heading">"Never worry about [Pain Point] again. We [Core Solution]."</h4>
              <p class="formula-example">
                <em>Example:</em> "Never settle for bland grocery bread again. We deliver stone-hearth loaves straight from our ovens to your table."
              </p>
              <button type="button" class="btn-copy-template" data-text="Never settle for bland grocery bread again. We deliver stone-hearth loaves straight from our ovens to your table.">
                Copy Headline
              </button>
            </div>
          </div>
        </section>

        <!-- 2. Interactive Value Proposition Generator -->
        <section class="cs-card mb-4">
          <h3 class="ds-section-title">🎯 The 1-Sentence Value Proposition Generator</h3>
          <p class="text-muted mb-3">
            Fill in the 3 blanks below to assemble a crystal-clear mission statement to paste into your hero subheadline or About section:
          </p>

          <div class="vp-builder-box">
            <div class="vp-inputs">
              <div class="form-group mb-2">
                <label class="form-label-sm">1. Who do you help? (Audience)</label>
                <input type="text" id="vpAudience" class="form-input" value="local families and food lovers" placeholder="e.g. busy founders, local foodies, indie creators">
              </div>
              <div class="form-group mb-2">
                <label class="form-label-sm">2. What do you provide them? (Benefit)</label>
                <input type="text" id="vpBenefit" class="form-input" value="enjoy authentic, naturally fermented breads" placeholder="e.g. build fast web apps, capture honest portraits">
              </div>
              <div class="form-group mb-2">
                <label class="form-label-sm">3. How are you distinct from others? (Differentiator)</label>
                <input type="text" id="vpDiff" class="form-input" value="using 100% organic heritage grains and zero commercial shortcuts" placeholder="e.g. with zero fluff, without locked-in contracts">
              </div>
            </div>

            <div class="vp-preview-card mt-3">
              <span class="vp-preview-label">Your Live Assembled Value Proposition:</span>
              <p class="vp-result-text" id="vpResultText">
                "We help local families and food lovers enjoy authentic, naturally fermented breads using 100% organic heritage grains and zero commercial shortcuts."
              </p>
              <button type="button" class="btn btn-secondary btn-sm" id="copyVpBtn">📋 Copy Value Proposition</button>
            </div>
          </div>
        </section>

        <!-- 3. Section-by-Section Copy Frameworks -->
        <section class="cs-card">
          <h3 class="ds-section-title">📝 Section-by-Section Copy Blueprints</h3>
          <p class="text-muted mb-3">
            What to actually put into each section of your HTML document:
          </p>

          <div class="copy-sections-grid">
            <!-- About Section Framework -->
            <div class="copy-blueprint-card">
              <div class="cb-header">
                <h4>📖 About Us: The 3-Act Human Story</h4>
              </div>
              <div class="cb-body">
                <p>Don't just list your resume. Tell a story in three paragraphs:</p>
                <ol class="story-acts">
                  <li><strong>Act 1: The Spark.</strong> Why did you start ${escapeHtml(name)}? What frustration with existing options sparked your craft?</li>
                  <li><strong>Act 2: The Philosophy.</strong> What rules or standards do you refuse to compromise on? (e.g. "We never cut corners on ingredients").</li>
                  <li><strong>Act 3: The Invitation.</strong> Why should the visitor feel confident joining you or reaching out?</li>
                </ol>
              </div>
            </div>

            <!-- Features vs Benefits Framework -->
            <div class="copy-blueprint-card">
              <div class="cb-header">
                <h4>💡 Features Grid: Feature vs Benefit Rule</h4>
              </div>
              <div class="cb-body">
                <p>Beginners write technical features; customers buy benefits. Convert features to benefits:</p>
                <div class="fv-table">
                  <div class="fv-row">
                    <span class="fv-bad">❌ Feature: "36-Hour Cold Proofing"</span>
                    <span class="fv-good">&check; Benefit: "Breaks down gluten for easy digestion and richer flavor"</span>
                  </div>
                  <div class="fv-row">
                    <span class="fv-bad">❌ Feature: "Stone Basalt Oven"</span>
                    <span class="fv-good">&check; Benefit: "Gives every loaf a crackling caramel crust that stays crisp for days"</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Testimonial Framework -->
            <div class="copy-blueprint-card">
              <div class="cb-header">
                <h4>⭐ Testimonials: The Skeptic-to-Believer Formula</h4>
              </div>
              <div class="cb-body">
                <p>Generic quotes like "Great service!" sound fake. Realistic testimonials have 3 parts:</p>
                <blockquote class="cb-quote">
                  "I was skeptical because my stomach is sensitive to bread (The Hesitation). But Maya's sourdough is the only bread I can eat without discomfort (The Breakthrough), and we now pick up two loaves every Saturday morning (The Habit)."
                </blockquote>
              </div>
            </div>

            <!-- FAQ Framework -->
            <div class="copy-blueprint-card">
              <div class="cb-header">
                <h4>❓ FAQ Section: The Objections Buster</h4>
              </div>
              <div class="cb-body">
                <p>Your FAQ should answer the 4 silent objections preventing someone from taking action:</p>
                <ul class="faq-pointers">
                  <li><strong>Pricing / Value:</strong> "How much does it cost, and what is included?"</li>
                  <li><strong>Turnaround / Timing:</strong> "When do I receive my order / service?"</li>
                  <li><strong>Location / Fulfillment:</strong> "Where do you deliver or operate?"</li>
                  <li><strong>Guarantees / Modifications:</strong> "What if I need custom accommodations?"</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Value Prop generator inputs
    const audienceInput = document.getElementById('vpAudience');
    const benefitInput = document.getElementById('vpBenefit');
    const diffInput = document.getElementById('vpDiff');
    const resultText = document.getElementById('vpResultText');
    const copyVpBtn = document.getElementById('copyVpBtn');

    const updateVp = () => {
      const aud = audienceInput?.value.trim() || 'our clients';
      const ben = benefitInput?.value.trim() || 'achieve great results';
      const dif = diffInput?.value.trim() || 'with genuine care';
      const assembled = `"We help ${aud} ${ben} ${dif}."`;
      if (resultText) resultText.textContent = assembled;
    };

    [audienceInput, benefitInput, diffInput].forEach(inp => {
      if (inp) inp.addEventListener('input', updateVp);
    });

    if (copyVpBtn) {
      copyVpBtn.addEventListener('click', async () => {
        if (resultText) {
          try {
            await navigator.clipboard.writeText(resultText.textContent);
            copyVpBtn.textContent = '✓ Copied!';
            setTimeout(() => { copyVpBtn.textContent = '📋 Copy Value Proposition'; }, 2000);
          } catch (e) {
            console.warn(e);
          }
        }
      });
    }

    // Template copy buttons
    const templateBtns = this.container.querySelectorAll('.btn-copy-template');
    templateBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const text = btn.getAttribute('data-text');
        try {
          await navigator.clipboard.writeText(text);
          const orig = btn.textContent;
          btn.textContent = '✓ Copied!';
          setTimeout(() => { btn.textContent = orig; }, 2000);
        } catch (e) {
          console.warn(e);
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
