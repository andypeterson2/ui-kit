/**
 * @jest-environment jsdom
 */
// WP #764: Test: CSS custom property token completeness
const fs = require('fs');
const path = require('path');

const tokensCSS = fs.readFileSync(path.resolve(__dirname, '..', 'tokens.css'), 'utf-8');

function extractTokens(css, selector) {
  const re = new RegExp(selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\{([^}]+)\\}', 's');
  const match = css.match(re);
  if (!match) return [];
  return [...match[1].matchAll(/--([\w-]+):/g)].map((m) => m[1]);
}

describe('CSS custom property token completeness', () => {
  const rootTokens = extractTokens(tokensCSS, ':root');

  test('defines surface tokens', () => {
    ['bg', 'surface', 'surface2', 'surface-muted', 'surface-hl'].forEach((t) => {
      expect(rootTokens).toContain(t);
    });
  });

  test('defines text tokens', () => {
    ['text', 'text-secondary', 'text-muted', 'text-inverse'].forEach((t) => {
      expect(rootTokens).toContain(t);
    });
  });

  test('defines accent tokens (monochrome)', () => {
    ['accent', 'accent-hover'].forEach((t) => {
      expect(rootTokens).toContain(t);
    });
  });

  test('does not define Gruvbox accent tokens', () => {
    ['accent-teal', 'accent-olive', 'accent-brown', 'accent-dark'].forEach((t) => {
      expect(rootTokens).not.toContain(t);
    });
  });

  test('defines semantic tokens', () => {
    ['success', 'warn', 'danger'].forEach((t) => {
      expect(rootTokens).toContain(t);
    });
  });

  test('defines border tokens', () => {
    ['border', 'border-focus', 'focus-ring'].forEach((t) => {
      expect(rootTokens).toContain(t);
    });
  });

  test('defines syntax tokens', () => {
    ['syntax-string', 'syntax-keyword', 'syntax-function', 'syntax-comment', 'syntax-type'].forEach((t) => {
      expect(rootTokens).toContain(t);
    });
  });

  test('defines terminal tokens', () => {
    ['term-bg', 'term-scrollbar', 'term-time', 'term-text', 'term-ok', 'term-warn', 'term-err'].forEach((t) => {
      expect(rootTokens).toContain(t);
    });
  });

  test('defines typography tokens', () => {
    ['font', 'font-mono', 'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'].forEach((t) => {
      expect(rootTokens).toContain(t);
    });
  });

  test('defines motion tokens', () => {
    ['duration-fast', 'duration-normal'].forEach((t) => {
      expect(rootTokens).toContain(t);
    });
  });

  test('no light theme override block exists', () => {
    expect(tokensCSS).not.toContain('[data-theme="light"]');
  });
});
