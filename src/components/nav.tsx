/** @jsxImportSource hono/jsx */
import type { FC } from 'hono/jsx';

export const Nav: FC = () => (
  <nav class="nav">
    <div class="container nav-inner">
      <a href="/" class="nav-brand">
        <img src="/logo/aegis-logo-transparent.svg" alt="AEGIS" class="nav-logo-img" />
      </a>
      <div class="nav-links">
        <a href="/scan" class="nav-link">Scan</a>
        <a href="/dashboard" class="nav-link">Dashboard</a>
        <a href="/about" class="nav-link">About</a>
        <a href="/" class="nav-icon-link">
          <img src="/icon/aegis-icon-transparent.svg" alt="AEGIS" class="nav-icon" />
        </a>
      </div>
    </div>
  </nav>
);
