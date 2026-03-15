import { describe, it, expect } from 'vitest';
import {
  APP_NAME, ALL_CATEGORIES, TARGET_MODELS, DEFAULT_MODEL_IDS,
  JUDGE_MODEL, MODEL_MAP, CATEGORY_LABELS, getScoreColor, getScoreLabel,
} from '../src/lib/constants';

describe('constants integrity', () => {
  it('APP_NAME is defined', () => {
    expect(APP_NAME).toBe('AEGIS');
  });

  it('has exactly 5 categories', () => {
    expect(ALL_CATEGORIES).toHaveLength(5);
    expect(ALL_CATEGORIES).toContain('prompt-injection');
    expect(ALL_CATEGORIES).toContain('jailbreak');
    expect(ALL_CATEGORIES).toContain('data-exfiltration');
  });

  it('every category has a label', () => {
    for (const cat of ALL_CATEGORIES) {
      expect(CATEGORY_LABELS[cat]).toBeDefined();
      expect(CATEGORY_LABELS[cat].length).toBeGreaterThan(0);
    }
  });

  it('TARGET_MODELS has at least 2 entries with multiple providers', () => {
    expect(TARGET_MODELS.length).toBeGreaterThanOrEqual(2);
    const providers = new Set(TARGET_MODELS.map((m) => m.provider));
    expect(providers.size).toBeGreaterThanOrEqual(2);
  });

  it('every model has required fields', () => {
    for (const m of TARGET_MODELS) {
      expect(m.id).toBeTruthy();
      expect(m.name).toBeTruthy();
      expect(m.icon).toBeTruthy();
      expect(['openai', 'huggingface']).toContain(m.provider);
    }
  });

  it('DEFAULT_MODEL_IDS are all valid model IDs', () => {
    const validIds = new Set(TARGET_MODELS.map((m) => m.id));
    for (const id of DEFAULT_MODEL_IDS) {
      expect(validIds.has(id)).toBe(true);
    }
  });

  it('MODEL_MAP entries match TARGET_MODELS', () => {
    for (const m of TARGET_MODELS) {
      expect(MODEL_MAP[m.id]).toEqual(m);
    }
  });

  it('JUDGE_MODEL is set', () => {
    expect(JUDGE_MODEL).toBeTruthy();
  });
});

describe('getScoreColor', () => {
  it('returns green for safe scores', () => {
    expect(getScoreColor(80)).toBe('#22c55e');
    expect(getScoreColor(100)).toBe('#22c55e');
  });

  it('returns yellow for moderate scores', () => {
    expect(getScoreColor(60)).toBe('#eab308');
    expect(getScoreColor(79)).toBe('#eab308');
  });

  it('returns orange for risky scores', () => {
    expect(getScoreColor(40)).toBe('#f97316');
    expect(getScoreColor(59)).toBe('#f97316');
  });

  it('returns red for critical scores', () => {
    expect(getScoreColor(0)).toBe('#ef4444');
    expect(getScoreColor(39)).toBe('#ef4444');
  });
});

describe('getScoreLabel', () => {
  it('returns correct labels for score ranges', () => {
    expect(getScoreLabel(90)).toBe('Safe');
    expect(getScoreLabel(70)).toBe('Moderate');
    expect(getScoreLabel(50)).toBe('Risky');
    expect(getScoreLabel(20)).toBe('Critical');
  });
});
