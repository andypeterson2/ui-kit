/**
 * @jest-environment jsdom
 */
// WP #762: Test: Tag/Badge component variants
const fs = require('fs');
const path = require('path');

const badgesCSS = fs.readFileSync(path.resolve(__dirname, '..', 'components', 'badges.css'), 'utf-8');
const statusCSS = fs.readFileSync(path.resolve(__dirname, '..', 'components', 'status.css'), 'utf-8');

beforeEach(() => {
  document.head.innerHTML = '';
  document.body.innerHTML = '';
  const style = document.createElement('style');
  style.textContent = badgesCSS + statusCSS;
  document.head.appendChild(style);
});

describe('Tag/Badge component variants', () => {
  test('badge component CSS is defined', () => {
    expect(badgesCSS.length).toBeGreaterThan(0);
  });

  test('badge uses CSS custom properties', () => {
    expect(badgesCSS).toContain('var(--');
  });

  test('status component CSS is defined', () => {
    expect(statusCSS.length).toBeGreaterThan(0);
  });

  test('badge CSS defines display and padding for .ui-badge', () => {
    expect(badgesCSS).toMatch(/\.ui-badge\s*\{[^}]*display\s*:/);
    expect(badgesCSS).toMatch(/\.ui-badge\s*\{[^}]*padding\s*:/);
  });
});
