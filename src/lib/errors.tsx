/** @jsxImportSource hono/jsx */
import type { Context } from 'hono';
import type { FC } from 'hono/jsx';
import type { AppEnv } from './types';

// ==================== ERROR TYPES ====================

export type ErrorCode = 400 | 401 | 403 | 404 | 500;

interface ErrorDef {
  title: string;
  message: string;
  icon: string;
}

const ERROR_DEFINITIONS: Record<ErrorCode, ErrorDef> = {
  400: { title: 'Bad Request', message: 'The request was invalid or malformed.', icon: '⚠️' },
  401: { title: 'Unauthorized', message: 'You need to authenticate to access this resource.', icon: '🔒' },
  403: { title: 'Forbidden', message: "You don't have permission to access this resource.", icon: '🚫' },
  404: { title: 'Not Found', message: "The page you're looking for doesn't exist.", icon: '🔍' },
  500: { title: 'Server Error', message: 'Something went wrong on our end. Please try again.', icon: '💥' },
};

// ==================== ERROR PAGE COMPONENT ====================

const ErrorPage: FC<{ code: ErrorCode; title?: string; message?: string; details?: string }> = ({
  code,
  title,
  message,
  details,
}) => {
  const def = ERROR_DEFINITIONS[code];
  const displayTitle = title ?? def.title;
  const displayMessage = message ?? def.message;
  const errorColor = code >= 500 ? '#ef4444' : code >= 400 ? '#f97316' : '#a3a3a3';

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{`${code} ${displayTitle} — AEGIS`}</title>
        <link rel="stylesheet" href="/styles.css" />
        <style>{`
          .error-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 2rem;
          }
          .error-icon { font-size: 3.5rem; margin-bottom: 1rem; }
          .error-code { font-size: 5rem; font-weight: 800; color: ${errorColor}; line-height: 1; margin-bottom: 0.5rem; }
          .error-title { font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: var(--text); }
          .error-message { color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.5; max-width: 400px; }
          .error-details { font-size: 0.75rem; color: var(--text-muted); background: var(--bg-card); border: 1px solid var(--border); padding: 0.5rem 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-family: var(--mono); word-break: break-all; }
          .error-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
        `}</style>
      </head>
      <body>
        <div class="error-container">
          <div>
            <div class="error-icon">{def.icon}</div>
            <div class="error-code">{code}</div>
            <h1 class="error-title">{displayTitle}</h1>
            <p class="error-message">{displayMessage}</p>
            {details && <p class="error-details">{details}</p>}
            <div class="error-actions">
              <a href="/" class="btn btn-outline">← Home</a>
              <a href="/scan" class="btn btn-primary">Run a Scan</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

// ==================== RESPONSE HELPERS ====================

function isApiRequest(c: Context<AppEnv>): boolean {
  const path = c.req.path;
  const accept = c.req.header('accept') ?? '';
  return path.startsWith('/api') || accept.includes('application/json');
}

export function errorResponse(c: Context<AppEnv>, code: ErrorCode, options?: { title?: string; message?: string; details?: string }) {
  const def = ERROR_DEFINITIONS[code];
  const message = options?.message ?? def.message;

  if (isApiRequest(c)) {
    return c.json({ error: message }, code);
  }

  return c.html(<ErrorPage code={code} title={options?.title} message={options?.message} details={options?.details} />, code);
}

// ==================== CONVENIENCE HELPERS ====================

export const badRequest = (c: Context<AppEnv>, message?: string) => errorResponse(c, 400, { message });
export const notFound = (c: Context<AppEnv>, message?: string) => errorResponse(c, 404, { message });
export const serverError = (c: Context<AppEnv>, message?: string) => errorResponse(c, 500, { message });

// ==================== GLOBAL HANDLERS ====================

export function globalErrorHandler(err: Error, c: Context<AppEnv>) {
  console.error('Unhandled error:', err.message);
  return serverError(c, 'We encountered an unexpected error. Please try again.');
}

export function globalNotFoundHandler(c: Context<AppEnv>) {
  return errorResponse(c, 404, { details: `Path: ${c.req.path}` });
}
