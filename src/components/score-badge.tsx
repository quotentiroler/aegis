/** @jsxImportSource hono/jsx */
import type { FC } from 'hono/jsx';
import type { Severity } from '../lib/types';
import { SEVERITY_COLORS, getScoreColor, getScoreLabel } from '../lib/constants';

export const ScoreBadge: FC<{ severity: Severity; label?: string }> = ({ severity, label }) => {
  const text = label ?? severity.toUpperCase();
  const bg = SEVERITY_COLORS[severity] ?? '#6b7280';
  return (
    <span class="badge" style={`background:${bg};color:#fff;`}>
      {text}
    </span>
  );
};

export const PassFailBadge: FC<{ passed: boolean }> = ({ passed }) => (
  <span class={`badge ${passed ? 'badge-pass' : 'badge-fail'}`}>
    {passed ? '✓ PASS' : '✗ FAIL'}
  </span>
);

export const ScoreRing: FC<{ score: number }> = ({ score }) => {
  const color = getScoreColor(score);
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div class="score-ring-wrapper">
      <svg viewBox="0 0 120 120" width="160" height="160">
        <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" stroke-width="10" />
        <circle
          cx="60" cy="60" r="54" fill="none"
          stroke={color} stroke-width="10"
          stroke-linecap="round"
          stroke-dasharray={circumference}
          stroke-dashoffset={offset}
          transform="rotate(-90 60 60)"
        />
        <text x="60" y="55" text-anchor="middle" font-size="28" font-weight="bold" fill={color}>
          {score}
        </text>
        <text x="60" y="75" text-anchor="middle" font-size="12" fill="#6b7280">
          / 100
        </text>
      </svg>
      <p class="score-label" style={`color:${color}`}>
        {getScoreLabel(score)}
      </p>
    </div>
  );
};
