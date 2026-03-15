// human.tech ZK proof-of-personhood integration
// In production, this would use the human.tech SDK
// For the hackathon demo, we simulate the verification flow

export function generateDemoProof(scanId: string): string {
  const timestamp = Date.now();
  // Simulate a ZK proof hash
  const proofData = `aegis:${scanId}:human:${timestamp}`;
  // Simple hash for demo — in production, this would be a real ZK proof
  let hash = 0;
  for (let i = 0; i < proofData.length; i++) {
    const char = proofData.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return `zk-proof-${Math.abs(hash).toString(16)}-${timestamp.toString(16)}`;
}

export function verifyProof(proof: string): boolean {
  // In production: verify ZK proof against human.tech's verification endpoint
  // For demo: check that it matches our format
  return /^zk-proof-[0-9a-f]+-[0-9a-f]+$/.test(proof);
}
