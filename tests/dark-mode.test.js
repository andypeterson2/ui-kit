/**
 * @jest-environment jsdom
 */
// WP #758: Test: Monochrome token definitions
const fs = require('fs');
const path = require('path');

const tokensCSS = fs.readFileSync(path.resolve(__dirname, '..', 'tokens.css'), 'utf-8');

describe('Monochrome token definitions', () => {
  test('tokens.css defines :root variables', () => {
    expect(tokensCSS).toMatch(/:root\s*\{/);
    expect(tokensCSS).toContain('--bg:');
    expect(tokensCSS).toContain('--text:');
    expect(tokensCSS).toContain('--accent:');
  });

  test('monochrome palette has no light theme override block', () => {
    expect(tokensCSS).not.toContain('[data-theme="light"]');
  });

  test('monochrome palette has no accent-teal/olive/brown/dark tokens', () => {
    expect(tokensCSS).not.toContain('--accent-teal');
    expect(tokensCSS).not.toContain('--accent-olive');
    expect(tokensCSS).not.toContain('--accent-brown');
    expect(tokensCSS).not.toContain('--accent-dark');
  });

  test('surface tokens are defined', () => {
    expect(tokensCSS).toContain('--bg:');
    expect(tokensCSS).toContain('--surface:');
    expect(tokensCSS).toContain('--surface2:');
  });

  test('border tokens are defined', () => {
    expect(tokensCSS).toContain('--border:');
    expect(tokensCSS).toContain('--border-focus:');
    expect(tokensCSS).toContain('--focus-ring:');
  });

  test('text tokens are defined', () => {
    expect(tokensCSS).toContain('--text:');
    expect(tokensCSS).toContain('--text-secondary:');
    expect(tokensCSS).toContain('--text-muted:');
    expect(tokensCSS).toContain('--text-inverse:');
  });

  test('accent tokens are defined (monochrome)', () => {
    expect(tokensCSS).toContain('--accent:');
    expect(tokensCSS).toContain('--accent-hover:');
  });

  test('semantic tokens are defined', () => {
    expect(tokensCSS).toContain('--success:');
    expect(tokensCSS).toContain('--warn:');
    expect(tokensCSS).toContain('--danger:');
  });
});
