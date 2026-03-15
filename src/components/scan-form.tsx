/** @jsxImportSource hono/jsx */
import type { FC } from 'hono/jsx';
import { ALL_CATEGORIES, CATEGORY_LABELS, CATEGORY_ICONS } from '../lib/constants';
import { html } from 'hono/html';

export const ScanForm: FC = () => (
  <div id="scan-wrapper">
    <form method="post" action="/api/scan" class="scan-form" id="scan-form">
      <div class="form-group">
        <label for="target">System Prompt or Model Input</label>
        <textarea
          id="target"
          name="target"
          rows={6}
          placeholder="Paste a system prompt to evaluate its safety..."
          required
        />
      </div>

      <fieldset class="form-group">
        <legend>Attack Categories to Test</legend>
        <div class="checkbox-grid">
          {ALL_CATEGORIES.map((cat) => (
            <label class="checkbox-label" key={cat}>
              <input type="checkbox" name="categories" value={cat} checked />
              <span>{CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button type="submit" class="btn btn-primary btn-lg" id="scan-btn">
        🔍 Run Safety Scan
      </button>
    </form>

    {/* Loading state — hidden until JS activates it */}
    <div id="scan-loading" class="scan-loading" style="display:none">
      <div class="scan-loading-shield">
        <img src="/icon/aegis-icon-transparent.svg" alt="AEGIS" width="80" height="80" class="scan-shield-icon" />
        <div class="scan-pulse-ring"></div>
      </div>

      <h2 class="scan-loading-title">Scanning for Vulnerabilities</h2>
      <p id="scan-status" class="scan-loading-status">Initializing probe engine...</p>

      <div class="scan-progress-track">
        <div id="scan-progress-bar" class="scan-progress-bar"></div>
      </div>

      <div class="scan-loading-meta">
        <span id="scan-timer" class="scan-timer">0s elapsed</span>
        <span class="scan-loading-hint">Usually takes 20–40 seconds</span>
      </div>

      <div id="scan-probes-live" class="scan-probes-live"></div>
    </div>

    {/* Error state — hidden unless fetch fails */}
    <div id="scan-error" class="scan-error" style="display:none">
      <div class="scan-error-icon">⚠️</div>
      <h3>Scan Failed</h3>
      <p id="scan-error-msg" class="text-muted">An unexpected error occurred.</p>
      <button class="btn btn-primary" onclick="document.getElementById('scan-error').style.display='none';document.getElementById('scan-form').style.display='flex';">
        Try Again
      </button>
    </div>
  </div>
);
