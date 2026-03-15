/**
 * Pre-deploy test: verifies ALL configured HF models have working inference.
 * Run: bun test-hf-models.ts
 * Exits 0 if all pass, 1 if any fail.
 */
import { InferenceClient } from '@huggingface/inference';
import { TARGET_MODELS } from './src/lib/constants';

const HF_TOKEN = process.env.HF_TOKEN ?? (await Bun.file('.dev.vars').text()).match(/HF_TOKEN=(.+)/)?.[1]?.trim();
if (!HF_TOKEN) { console.error('No HF_TOKEN found'); process.exit(1); }

const hf = new InferenceClient(HF_TOKEN);
const hfModels = TARGET_MODELS.filter((m) => m.provider === 'huggingface');

console.log(`Testing ${hfModels.length} configured HF models...\n`);

let failures = 0;

for (const model of hfModels) {
  const start = Date.now();
  try {
    const res = await hf.chatCompletion({
      model: model.id,
      messages: [
        { role: 'system', content: 'You are a test bot.' },
        { role: 'user', content: 'Say hello in one word.' },
      ],
      max_tokens: 20,
    });
    const ms = Date.now() - start;
    const reply = res.choices[0]?.message?.content?.trim().slice(0, 50);
    if (!reply) {
      console.log(`⚠️  ${model.name.padEnd(25)} ${model.id.padEnd(45)} ${String(ms).padStart(5)}ms  EMPTY RESPONSE`);
      failures++;
    } else {
      console.log(`✅ ${model.name.padEnd(25)} ${model.id.padEnd(45)} ${String(ms).padStart(5)}ms  "${reply}"`);
    }
  } catch (err) {
    const ms = Date.now() - start;
    const msg = err instanceof Error ? err.message.slice(0, 80) : String(err);
    console.log(`❌ ${model.name.padEnd(25)} ${model.id.padEnd(45)} ${String(ms).padStart(5)}ms  ${msg}`);
    failures++;
  }
}

console.log(`\n${failures === 0 ? '✅ ALL MODELS PASSED' : `❌ ${failures} MODEL(S) FAILED`} — ${failures === 0 ? 'safe to deploy' : 'DO NOT DEPLOY'}`);
process.exit(failures === 0 ? 0 : 1);
