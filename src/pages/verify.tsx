/** @jsxImportSource hono/jsx */
import type { FC } from 'hono/jsx';
import { Layout } from '../components/layout';
import type { ScanResult } from '../lib/types';

export const VerifyPage: FC<{ scan: ScanResult }> = ({ scan }) => (
  <Layout title="Human Attestation">
    <section class="page-header">
      <div class="container center">
        <h1>👤 Human Attestation</h1>
        <p class="text-muted">
          Prove that a real person reviewed this safety evaluation using ZK proof-of-personhood.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container container-sm">
        <div class="verify-card">
          <h2>Scan #{scan.id.slice(0, 8)}...</h2>
          <p>
            <strong>Score:</strong> {scan.overallScore}/100 &nbsp;|&nbsp;
            <strong>Checks:</strong> {scan.results.length} &nbsp;|&nbsp;
            <strong>Date:</strong> {scan.createdAt}
          </p>

          {scan.humanVerified ? (
            <div class="verify-status verified">
              <div class="verify-icon">✓</div>
              <h3>Verified by Human</h3>
              <p>This evaluation was reviewed and attested by a verified human via human.tech ZK proof.</p>
              {scan.verifiedAt && <p class="text-muted text-sm">Verified at: {scan.verifiedAt}</p>}
            </div>
          ) : (
            <div class="verify-flow">
              <div class="verify-steps">
                <div class="step">
                  <div class="step-num">1</div>
                  <div>
                    <h4>Review the Findings</h4>
                    <p>Read through the <a href={`/report/${scan.id}`}>safety report</a> and verify the results are accurate.</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-num">2</div>
                  <div>
                    <h4>Prove Your Personhood</h4>
                    <p>Connect to human.tech and generate a ZK proof-of-personhood — no biometrics shared.</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-num">3</div>
                  <div>
                    <h4>Sign the Attestation</h4>
                    <p>Your ZK proof is linked to this scan, creating a tamper-proof human attestation record.</p>
                  </div>
                </div>
              </div>

              <div class="verify-widget">
                <div class="widget-placeholder">
                  <p class="widget-label">human.tech Verification Widget</p>
                  <p class="text-muted text-sm">
                    In production, the human.tech SDK loads here. For this demo, click below to simulate verification.
                  </p>
                  <form method="post" action={`/api/verify/${scan.id}`}>
                    <button type="submit" class="btn btn-primary btn-lg">
                      🔐 Verify as Human (Demo)
                    </button>
                  </form>
                </div>
              </div>

              <div class="info-box" style="margin-top:2rem;">
                <h4>Why does this matter?</h4>
                <p>
                  If AI safety evaluations can be run <em>and faked</em> by AI, the evaluations themselves
                  become untrustworthy. Human attestation via ZK proofs closes this loop.
                </p>
                <ul>
                  <li><strong>NIST AI RMF</strong> mandates human-in-the-loop for safety testing pipelines</li>
                  <li><strong>EU AI Act Art. 14</strong> requires human oversight for high-risk AI systems</li>
                  <li><strong>Constitutional AI</strong> uses human feedback to define safety boundaries</li>
                </ul>
                <p class="text-sm text-muted">
                  human.tech uses "Human Keys from Human Attributes" — unique identity via zero-knowledge
                  proofs, not just CAPTCHA. Privacy is preserved: no biometrics are ever shared.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  </Layout>
);
