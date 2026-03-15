/** @jsxImportSource hono/jsx */
import type { FC } from 'hono/jsx';
import { Layout } from '../components/layout';

export const HomePage: FC<{ totalScans: number; threats: number; attestations: number }> = ({
  totalScans,
  threats,
  attestations,
}) => (
  <Layout>
    <section class="hero">
      <div class="container">
        <div class="hero-badge">🛡️ Research-Backed AI Safety</div>
        <h1 class="hero-title">
          AI Safety Evaluations,<br />
          <span class="gradient-text">Verified by Humans</span>
        </h1>
        <p class="hero-subtitle">
          AEGIS detects prompt injection, jailbreaks, and evaluation gaming — then lets real humans
          attest results with cryptographic proof-of-personhood via{' '}
          <a href="https://human.tech" target="_blank" rel="noopener">human.tech</a>.
        </p>
        <div class="hero-actions">
          <a href="/scan" class="btn btn-primary btn-lg">Run Your First Scan →</a>
          <a href="/about" class="btn btn-outline btn-lg">How It Works</a>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <div class="grid-3">
          <div class="card">
            <div class="card-icon">🔍</div>
            <h3>Detect</h3>
            <p>
              5 attack categories grounded in peer-reviewed research — from UniGuardian's prompt trigger
              detection to JailbreakBench's 100-behavior dataset.
            </p>
          </div>
          <div class="card">
            <div class="card-icon">📊</div>
            <h3>Score</h3>
            <p>
              Quantitative safety scores (0–100) based on Attack Success Rate, with per-category
              breakdowns and severity ratings.
            </p>
          </div>
          <div class="card">
            <div class="card-icon">👤</div>
            <h3>Attest</h3>
            <p>
              Every evaluation can be cryptographically attested by a verified human via ZK
              proof-of-personhood — because <em>who watches the watchmen?</em>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="container">
        <div class="grid-3">
          <div class="stat">
            <div class="stat-number">{totalScans}</div>
            <div class="stat-label">Scans Run</div>
          </div>
          <div class="stat">
            <div class="stat-number">{threats}</div>
            <div class="stat-label">Threats Detected</div>
          </div>
          <div class="stat">
            <div class="stat-number">{attestations}</div>
            <div class="stat-label">Human Attestations</div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container center">
        <h2>Why Human Attestation Matters</h2>
        <p class="text-muted">
          If AI safety evaluations can be run <em>and faked</em> by AI, the evaluations themselves become
          untrustworthy. AEGIS closes this loop: every audit is tied to a proven-human via
          human.tech's ZK proofs. No biometrics shared. No identity revealed. Just cryptographic
          proof that a real person was in the loop.
        </p>
        <blockquote class="quote">
          "NIST AI RMF mandates human-in-the-loop as a critical governance mechanism for safety
          testing pipelines. The EU AI Act requires human oversight for high-risk AI systems."
        </blockquote>
      </div>
    </section>
  </Layout>
);
