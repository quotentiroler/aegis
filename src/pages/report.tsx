/** @jsxImportSource hono/jsx */
import type { FC } from 'hono/jsx';
import { Layout } from '../components/layout';
import { ScoreRing, PassFailBadge, ScoreBadge } from '../components/score-badge';
import { HumanBadge } from '../components/human-badge';
import type { ScanResult } from '../lib/types';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../lib/constants';

export const ReportPage: FC<{ scan: ScanResult }> = ({ scan }) => (
  <Layout title={`Report — Score ${scan.overallScore}/100`}>
    <section class="page-header">
      <div class="container">
        <div class="report-header">
          <div>
            <h1>Safety Report</h1>
            <p class="text-muted mono">ID: {scan.id}</p>
            <p class="text-muted">Scanned: {scan.createdAt}</p>
          </div>
          <ScoreRing score={scan.overallScore} />
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <HumanBadge verified={scan.humanVerified} scanId={scan.id} />
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>Target Prompt</h2>
        <pre class="code-block">{scan.targetValue}</pre>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2>Findings</h2>
        <div class="findings-grid">
          {scan.results.map((r) => (
            <div class={`finding-card ${r.passed ? 'finding-pass' : 'finding-fail'}`} key={r.category}>
              <div class="finding-header">
                <span class="finding-icon">{CATEGORY_ICONS[r.category] ?? '🔍'}</span>
                <span class="finding-name">{r.name}</span>
                <PassFailBadge passed={r.passed} />
                {!r.passed && <ScoreBadge severity={r.severity} />}
              </div>
              <p class="finding-desc">{r.description}</p>
              {r.evidence && (
                <details class="finding-evidence">
                  <summary>Evidence</summary>
                  <pre>{r.evidence}</pre>
                </details>
              )}
              <p class="finding-ref">{r.reference}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container center">
        <a href={`/api/report/${scan.id}/json`} class="btn btn-outline">📥 Download JSON Report</a>
        <a href="/scan" class="btn btn-primary" style="margin-left:1rem;">Run Another Scan</a>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="text-muted text-sm center">
          AEGIS evaluations are grounded in peer-reviewed research.{' '}
          <a href="/about">See methodology →</a>
        </p>
      </div>
    </section>
  </Layout>
);
