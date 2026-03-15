// Bindings type is centralized in src/lib/types.ts (AppBindings)
// This file kept for Cloudflare Workers global type augmentation only
import type { AppBindings } from '../lib/types';
type Bindings = AppBindings;
