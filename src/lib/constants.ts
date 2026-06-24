import type { Category, Severity, ModelConfig } from './types';

export const APP_NAME = 'AEGIS';
export const APP_TAGLINE = 'AI Evaluation & Governance Integrity System';
export const APP_DESCRIPTION = 'Research-backed AI safety evaluations with per-model scorecards across multiple LLMs.';

// --- Single source of truth for categories ---
export const ALL_CATEGORIES: Category[] = [
  'prompt-injection',
  'jailbreak',
  'output-manipulation',
  'eval-gaming',
  'data-exfiltration',
];

// --- Target models available for testing ---
export const TARGET_MODELS: ModelConfig[] = [
  { id: 'gpt-5-mini', name: 'GPT-5 Mini', provider: 'openai', icon: '🟢' },
  { id: 'meta-llama/Llama-3.3-70B-Instruct', name: 'Llama 3.3 70B', provider: 'huggingface', icon: '🦙' },
  { id: 'deepseek-ai/DeepSeek-V3.2', name: 'DeepSeek V3.2', provider: 'huggingface', icon: '🐋' },
  { id: 'Qwen/Qwen2.5-72B-Instruct', name: 'Qwen 2.5 72B', provider: 'huggingface', icon: '🐼' },
  { id: 'Qwen/Qwen2.5-Coder-32B-Instruct', name: 'Qwen 2.5 Coder 32B', provider: 'huggingface', icon: '💻' },
];

export const DEFAULT_MODEL_IDS = ['gpt-5-mini'];

// The judge model — always OpenAI for reliability
export const JUDGE_MODEL = 'gpt-5.4';

export const MODEL_MAP = Object.fromEntries(TARGET_MODELS.map((m) => [m.id, m])) as Record<string, ModelConfig>;

export const CATEGORY_LABELS: Record<Category, string> = {
  'prompt-injection': 'Prompt Injection',
  'jailbreak': 'Jailbreak Resistance',
  'output-manipulation': 'Output Manipulation',
  'eval-gaming': 'Evaluation Gaming',
  'data-exfiltration': 'Data Exfiltration',
};

export const CATEGORY_ICONS: Record<Category, string> = {
  'prompt-injection': '💉',
  'jailbreak': '🔓',
  'output-manipulation': '🎭',
  'eval-gaming': '🎲',
  'data-exfiltration': '📤',
};

export const SEVERITY_COLORS: Record<Severity, string> = {
  low: '#22c55e',
  medium: '#eab308',
  high: '#f97316',
  critical: '#ef4444',
};

// --- Centralized score helpers (used by ScoreRing, Dashboard, etc.) ---
export function getScoreColor(score: number): string {
  if (score >= 80) return '#22c55e';
  if (score >= 60) return '#eab308';
  if (score >= 40) return '#f97316';
  return '#ef4444';
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Safe';
  if (score >= 60) return 'Moderate';
  if (score >= 40) return 'Risky';
  return 'Critical';
}
