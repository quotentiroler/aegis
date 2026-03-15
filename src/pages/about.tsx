/** @jsxImportSource hono/jsx */
import type { FC } from 'hono/jsx';
import { Layout } from '../components/layout';

export const AboutPage: FC = () => (
  <Layout title="About — Methodology">
    <section class="page-header">
      <div class="container">
        <h1>AI Evaluation & Governance Integrity System</h1>
        <p class="text-muted">
          Research-backed AI safety evaluations with human-verified attestations.
        </p>
      </div>
    </section>

    {/* Architecture */}
    <section class="section">
      <div class="container container-md">
        <h2>Architecture</h2>
        <div class="arch-diagram">
          <div class="arch-row">
            <div class="arch-box">User submits prompt</div>
            <div class="arch-arrow">→</div>
            <div class="arch-box highlight">AEGIS Safety Engine</div>
            <div class="arch-arrow">→</div>
            <div class="arch-box">Report with scores</div>
          </div>
          <div class="arch-row">
            <div class="arch-box">5 Check Categories</div>
            <div class="arch-arrow">→</div>
            <div class="arch-box highlight">OpenAI API probes</div>
            <div class="arch-arrow">→</div>
            <div class="arch-box">Risk scoring (0-100)</div>
          </div>
          <div class="arch-row">
            <div class="arch-box">Human reviewer</div>
            <div class="arch-arrow">→</div>
            <div class="arch-box highlight">human.tech ZK proof</div>
            <div class="arch-arrow">→</div>
            <div class="arch-box">Attested report ✓</div>
          </div>
        </div>
      </div>
    </section>

    {/* Methodology */}
    <section class="section alt-bg">
      <div class="container container-md">
        <h2>Safety Check Methodology</h2>

        <div class="method-card">
          <h3>💉 Prompt Injection Detection</h3>
          <p>
            Tests if the model follows injected instructions hidden in user input. Inspired by
            UniGuardian's unified "Prompt Trigger Attack" taxonomy that treats injection, backdoor,
            and adversarial attacks as variants of the same fundamental threat — poisoned prompts
            that manipulate model behavior.
          </p>
          <p class="text-sm text-muted" style="margin-top:0.6rem">
            Try <a href="https://gandalf.lakera.ai/" target="_blank" rel="noopener noreferrer">Gandalf by Lakera</a> to
            experience prompt injection firsthand — AEGIS automates detection of these vulnerabilities
            and pairs them with human-verified attestations.
          </p>
          <p class="ref">
            REF: Lin et al. (2025) "UniGuardian" — arXiv:2502.13141
          </p>
        </div>

        <div class="method-card">
          <h3>🔓 Jailbreak Resistance</h3>
          <p>
            Runs known jailbreak templates from JailbreakBench's standardized 100-behavior dataset
            covering DAN, roleplay, hypothetical framing, Many-Shot Jailbreaking (MSJ) patterns,
            and GCG-style suffix attacks. Measures Attack Success Rate (ASR).
          </p>
          <p class="ref">
            REF: Chao et al. (2024) "JailbreakBench" — arXiv:2404.01318 |
            Zou et al. (2023) "GCG" — arXiv:2307.15043
          </p>
        </div>

        <div class="method-card">
          <h3>🎭 Output Manipulation</h3>
          <p>
            Tests if model can be tricked into producing formatted outputs that look like system
            messages, or if it exhibits verbosity bias that games LLM-as-a-judge evaluations.
            Detects length bias and confidence-sounding refusals.
          </p>
          <p class="ref">
            REF: Safety by Measurement taxonomy — arXiv:2505.05541
          </p>
        </div>

        <div class="method-card">
          <h3>🎲 Evaluation Gaming</h3>
          <p>
            Detects if a model behaves differently when it detects eval-like patterns. Uses Min-K%
            probability analysis to flag potential benchmark contamination. Compares performance on
            canonical vs. paraphrased test prompts to detect memorization (Goodhart's Law in LLMs).
          </p>
          <p class="ref">
            REF: Shi et al. (2023) "Min-K%" — arXiv:2310.17680 |
            Zhang et al. (2025) "JBDistill" — arXiv:2505.22037
          </p>
        </div>

        <div class="method-card">
          <h3>📤 Data Exfiltration</h3>
          <p>
            Tests if the model can be coerced into leaking system prompt or training data.
            Uses techniques from the AdvBench 520-behavior dataset and representation engineering
            to detect information leakage pathways.
          </p>
          <p class="ref">
            REF: Mazeika et al. (2024) "HarmBench" — arXiv:2402.01630 |
            Mei et al. (2023) "ASSERT" — arXiv:2310.09624
          </p>
        </div>
      </div>
    </section>

    {/* Human Attestation */}
    <section class="section">
      <div class="container container-md">
        <h2>Why Human Attestation?</h2>
        <p>
          If AI safety evaluations can be run <em>and faked</em> by AI, the evaluations themselves
          become untrustworthy. AEGIS addresses this through cryptographic human attestation:
        </p>
        <ul class="spaced-list">
          <li>
            <strong>NIST AI RMF</strong> (NIST.AI.100-1) mandates human-in-the-loop as a critical
            governance mechanism for safety testing pipelines.
          </li>
          <li>
            <strong>EU AI Act</strong> (Art. 14) requires human oversight for high-risk AI systems,
            including ability to override AI decisions.
          </li>
          <li>
            <strong>HAT Framework</strong> (Human-in-the-loop Adversarial Testing) uses human feedback
            to curate adversarial prompts that automated generators miss.
          </li>
          <li>
            <strong>Constitutional AI</strong> (Bai et al., 2022 — arXiv:2212.08073) incorporates
            human feedback to define safety boundaries.
          </li>
        </ul>
        <p>
          <strong>human.tech</strong> provides ZK proof-of-personhood — "Human Keys from Human Attributes."
          Privacy is preserved: no biometrics are shared, no identity revealed. Just cryptographic
          proof that a real person was in the loop.
        </p>
      </div>
    </section>

    {/* Bibliography */}
    <section class="section alt-bg">
      <div class="container container-md">
        <h2>Bibliography</h2>
        <ol class="bibliography">
          <li>Lin et al. (2025). "UniGuardian: A Unified Defense for Detecting Prompt Injection, Backdoor Attacks and Adversarial Attacks in LLMs." <em>arXiv:2502.13141</em></li>
          <li>Chao et al. (2024). "JailbreakBench: An Open Robustness Benchmark for Jailbreaking LLMs." <em>arXiv:2404.01318</em></li>
          <li>Liu et al. (2024). "Automatic and Universal Prompt Injection Attacks against LLMs." <em>arXiv:2403.04957</em></li>
          <li>Yuan et al. (2026). "AgenticRed: Optimizing Agentic Systems for Automated Red-teaming." <em>arXiv:2601.13518</em></li>
          <li>Grey & Segerie (2025). "Safety by Measurement: A Systematic Lit Review of AI Safety Eval Methods." <em>arXiv:2505.05541</em></li>
          <li>Zhang et al. (2025). "Jailbreak Distillation: Renewable Safety Benchmarking." <em>arXiv:2505.22037</em></li>
          <li>Chen et al. (2025). "TeleAI-Safety: A Comprehensive LLM Jailbreaking Benchmark." <em>arXiv:2512.05485</em></li>
          <li>Zou et al. (2023). "Universal and Transferable Adversarial Attacks on Aligned Language Models." <em>arXiv:2307.15043</em></li>
          <li>Mehrotra et al. (2023). "Tree of Attacks with Pruning (TAP)." <em>arXiv:2312.02119</em></li>
          <li>Mazeika et al. (2024). "HarmBench: Standardized Evaluation Framework for Automated Red Teaming." <em>arXiv:2402.01630</em></li>
          <li>Shi et al. (2023). "Detecting Pretraining Data from Large Language Models." <em>arXiv:2310.17680</em></li>
          <li>Bai et al. (2022). "Constitutional AI: Harmlessness from AI Feedback." <em>arXiv:2212.08073</em></li>
          <li>NIST (2023). "AI Risk Management Framework (AI RMF 1.0)." <em>NIST.AI.100-1</em></li>
          <li>European Parliament (2024). "EU AI Act." <em>Regulation 2024/1689</em></li>
        </ol>
      </div>
    </section>

    {/* Credits */}
    <section class="section">
      <div class="container container-md center">
        <h2>Built at Intelligence at the Frontier</h2>
        <p class="text-muted">
          Hackathon by Funding the Commons + Protocol Labs · March 15, 2026 · San Francisco
        </p>
        <div class="logo-row">
          <span>🌐 Protocol Labs</span>
          <span>🌸 human.tech</span>
          <span>💡 Funding the Commons</span>
        </div>
      </div>
    </section>
  </Layout>
);
