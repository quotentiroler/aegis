# 🛡️ AEGIS — AI Evaluation & Governance Integrity System

> AI safety evaluations you can trust, because the humans behind them are verified.

**Built at [Intelligence at the Frontier](https://fundingthecommons.io/) — Funding the Commons + Protocol Labs — March 2026, San Francisco**

---

## What is AEGIS?

AEGIS is a **research-backed AI safety evaluation framework** with **human-verified attestations**. It detects prompt injection, jailbreaks, output manipulation, evaluation gaming, and data exfiltration — then lets real humans attest results with **cryptographic proof-of-personhood** via [human.tech](https://human.tech).

**The core insight**: If AI safety evaluations can be run _and faked_ by AI, the evaluations themselves become untrustworthy. AEGIS closes this loop — every audit is tied to a proven-human via ZK proofs.

## Why AEGIS?

The AI safety evaluation space has mature tools — [Promptfoo](https://github.com/promptfoo/promptfoo) (16K+ ★), [Tencent AI-Infra-Guard](https://github.com/Tencent/AI-Infra-Guard) (3K+ ★), [Lakera Guard](https://lakera.ai), [Giskard](https://giskard.ai). So why build another one?

**Because none of them answer the question: _who ran the evaluation?_**

| | Promptfoo | Lakera | Giskard | AI-Infra-Guard | **AEGIS** |
|---|---|---|---|---|---|
| Prompt injection detection | ✅ | ✅ | ✅ | ✅ | ✅ |
| Jailbreak testing | ✅ | ✅ | ✅ | ✅ | ✅ |
| Quantitative safety score | ❌ (pass/fail) | ❌ (block/allow) | Partial | ❌ | ✅ **(0–100)** |
| Human attestation (ZK) | ❌ | ❌ | ❌ | ❌ | ✅ |
| Web UI (zero-install) | ❌ (CLI) | ❌ (API) | Partial (hub) | ❌ (CLI) | ✅ |
| Research-grounded checks | Partial | Proprietary | Partial | Partial | ✅ **(10 papers)** |

### The Gap We Fill

1. **Cryptographic human attestation** — Every scan can be attested by a verified human via ZK proof-of-personhood. No other tool in this space ships this. The research frontier (NIST AI RMF, EU AI Act Art. 14) demands human oversight for safety evaluations — AEGIS makes it verifiable and privacy-preserving.

2. **Composable safety scores** — Not pass/fail, not raw logs. A single 0–100 score across 5 weighted attack categories, designed for dashboards, compliance reports, and comparison over time.

3. **Web-first, zero-install** — Every competitor requires `pip install`, Docker, or API keys. AEGIS is a URL. Visit, paste a prompt, get a scored report. This matters for non-engineers: compliance teams, product managers, regulators.

## Features

- **5 Attack Categories**: Prompt injection, jailbreak resistance, output manipulation, evaluation gaming, data exfiltration
- **Quantitative Scoring**: 0–100 safety score with per-category breakdowns and severity ratings
- **Human Attestation**: ZK proof-of-personhood via human.tech — privacy-preserving, no biometrics shared
- **Research-Grounded**: Every check traces back to published papers (UniGuardian, JailbreakBench, Min-K%, etc.)
- **6 Pages**: Home, Scan, Report, Verify, Dashboard, About — clean UX with one purpose per page

## Tech Stack

| Layer | Tech |
|-------|------|
| Runtime | Cloudflare Workers |
| Framework | Hono + JSX (server-rendered) |
| Language | TypeScript |
| Database | Cloudflare D1 (SQLite) |
| Package Manager | Bun |
| AI | OpenAI API (gpt-4o-mini) |
| Human Verification | human.tech ZK proof-of-personhood |

## Quick Start

```bash
# Install dependencies
bun install

# Initialize the local database
bun run db:init

# Set your OpenAI API key
# Create a .dev.vars file:
echo 'OPENAI_API_KEY=sk-your-key-here' > .dev.vars

# Start dev server
bun run dev
```

## Architecture

```
User submits prompt → AEGIS Safety Engine → Report with scores
5 Check Categories  → OpenAI API probes   → Risk scoring (0-100)
Human reviewer      → human.tech ZK proof → Attested report ✓
```

## Safety Check Methodology

| Check | Technique | Reference |
|-------|-----------|-----------|
| Prompt Injection | UniGuardian PTA taxonomy | Lin et al. (2025) arXiv:2502.13141 |
| Jailbreak Resistance | JailbreakBench 100-behavior | Chao et al. (2024) arXiv:2404.01318 |
| Output Manipulation | Safety by Measurement | Grey & Segerie (2025) arXiv:2505.05541 |
| Evaluation Gaming | Min-K% contamination detection | Shi et al. (2023) arXiv:2310.17680 |
| Data Exfiltration | HarmBench/AdvBench probes | Mazeika et al. (2024) arXiv:2402.01630 |

## Human Attestation (human.tech Integration)

AEGIS integrates [human.tech](https://human.tech)'s ZK proof-of-personhood protocol:

1. User runs a safety scan
2. Reviews the findings
3. Clicks "Attest as Human" → connects to human.tech
4. Generates a ZK proof (no biometrics shared, no identity revealed)
5. Proof is linked to the scan → "✓ Verified by Human" badge

**Why this matters**:
- NIST AI RMF mandates human-in-the-loop for safety testing pipelines
- EU AI Act (Art. 14) requires human oversight for high-risk AI systems
- Constitutional AI uses human feedback to define safety boundaries — AEGIS makes this verifiable

## Research Foundation

### Primary Papers

1. Lin et al. (2025). "UniGuardian: A Unified Defense for Detecting Prompt Injection, Backdoor Attacks and Adversarial Attacks in LLMs." _arXiv:2502.13141_
2. Chao et al. (2024). "JailbreakBench: An Open Robustness Benchmark for Jailbreaking LLMs." _arXiv:2404.01318_
3. Liu et al. (2024). "Automatic and Universal Prompt Injection Attacks against LLMs." _arXiv:2403.04957_
4. Yuan et al. (2026). "AgenticRed: Optimizing Agentic Systems for Automated Red-teaming." _arXiv:2601.13518_
5. Grey & Segerie (2025). "Safety by Measurement: A Systematic Literature Review of AI Safety Evaluation Methods." _arXiv:2505.05541_
6. Zhang et al. (2025). "Jailbreak Distillation: Renewable Safety Benchmarking." _arXiv:2505.22037_
7. Chen et al. (2025). "TeleAI-Safety: A Comprehensive LLM Jailbreaking Benchmark." _arXiv:2512.05485_
8. Zou et al. (2023). "Universal and Transferable Adversarial Attacks on Aligned Language Models." _arXiv:2307.15043_
9. Shi et al. (2023). "Detecting Pretraining Data from Large Language Models." _arXiv:2310.17680_
10. Mazeika et al. (2024). "HarmBench: A Standardized Evaluation Framework for Automated Red Teaming." _arXiv:2402.01630_

### Standards

- NIST (2023). "AI Risk Management Framework (AI RMF 1.0)." _NIST.AI.100-1_
- European Parliament (2024). "EU AI Act." _Regulation 2024/1689_

## Target Prizes

| Track | Prize |
|-------|-------|
| 🛡️ AI Safety & Evaluation (Protocol Labs) | $1,200 + Hello Tomorrow Demo Day |
| 🌸 BONUS: Made by Human (human.tech) | $1,200 |
| **Total** | **$2,400 + Demo Day invite** |

## License

MIT
