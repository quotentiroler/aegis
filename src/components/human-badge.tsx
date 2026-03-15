/** @jsxImportSource hono/jsx */
import type { FC } from 'hono/jsx';

export const HumanBadge: FC<{ verified: boolean; scanId?: string }> = ({ verified, scanId }) => {
  if (verified) {
    return (
      <div class="human-badge verified">
        <span class="human-badge-icon">✓</span>
        <span>Verified by Human</span>
        <span class="human-badge-sub">via human.tech ZK proof</span>
      </div>
    );
  }
  return (
    <a href={scanId ? `/verify/${scanId}` : '#'} class="human-badge unverified">
      <span class="human-badge-icon">👤</span>
      <span>Attest as Human</span>
      <span class="human-badge-sub">Prove you reviewed this evaluation</span>
    </a>
  );
};
