// WP #759: Test: Typography scale and font loading
const fs = require('fs');
const path = require('path');

const tokensCSS = fs.readFileSync(path.resolve(__dirname, '..', 'tokens.css'), 'utf-8');
const baseCSS = fs.readFileSync(path.resolve(__dirname, '..', 'base.css'), 'utf-8');

describe('Typography scale and font loading', () => {
  test('font family token is defined', () => {
    expect(tokensCSS).toContain("--font:");
    expect(tokensCSS).toContain('Geneva');
  });

  test('monospace font family token is defined', () => {
    expect(tokensCSS).toContain('--font-mono:');
    expect(tokensCSS).toContain('monospace');
  });

  test('typography scale tokens exist in correct order', () => {
    const sizes = ['--text-xs:', '--text-sm:', '--text-base:', '--text-lg:', '--text-xl:', '--text-2xl:', '--text-3xl:'];
    sizes.forEach((size) => {
      expect(tokensCSS).toContain(size);
    });
  });

  test('typography scale values increase monotonically', () => {
    const sizeMap = {};
    const regex = /--(text-\w+):\s*([\d.]+)rem/g;
    let match;
    while ((match = regex.exec(tokensCSS)) !== null) {
      sizeMap[match[1]] = parseFloat(match[2]);
    }
    const ordered = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'];
    for (let i = 1; i < ordered.length; i++) {
      expect(sizeMap[ordered[i]]).toBeGreaterThan(sizeMap[ordered[i - 1]]);
    }
  });

  test('base.css defines box-sizing reset', () => {
    expect(baseCSS).toContain('box-sizing: border-box');
  });

  test('base.css defines reduced motion media query', () => {
    expect(baseCSS).toContain('prefers-reduced-motion');
  });
});
