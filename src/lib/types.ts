// --- Central type definitions for the entire AEGIS app ---

export type Severity = 'low' | 'medium' | 'high' | 'critical';
export type Category = 'prompt-injection' | 'jailbreak' | 'output-manipulation' | 'eval-gaming' | 'data-exfiltration';
export type TargetType = 'prompt' | 'endpoint';

export interface CheckResult {
  category: Category;
  name: string;
  passed: boolean;
  severity: Severity;
  description: string;
  evidence: string;
  reference: string;
}

export interface ScanResult {
  id: string;
  targetType: TargetType;
  targetValue: string;
  overallScore: number;
  categories: Category[];
  results: CheckResult[];
  humanVerified: boolean;
  humanProof?: string;
  verifiedAt?: string;
  createdAt: string;
}

// D1 row shape — maps 1:1 with schema.sql columns
export interface ScanRow {
  id: string;
  target_type: string;
  target_value: string;
  overall_score: number;
  categories: string;   // JSON
  results: string;      // JSON
  human_verified: number;
  human_proof: string | null;
  verified_at: string | null;
  created_at: string;
  ip_hash: string | null;
}

// Cloudflare Worker environment bindings
export type AppBindings = {
  DB: D1Database;
  OPENAI_API_KEY: string;
};

// Hono Env type — used by the Hono app and all route handlers
export type AppEnv = {
  Bindings: AppBindings;
};
