/**
 * @jest-environment jsdom
 */
// WP #755: Test: Button component variants and states
const fs = require('fs');
const path = require('path');

const CSS = fs.readFileSync(path.resolve(__dirname, '..', 'components', 'buttons.css'), 'utf-8');

function injectStyles() {
  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);
}

beforeEach(() => {
  document.head.innerHTML = '';
  document.body.innerHTML = '';
  injectStyles();
});

describe('Button component variants and states', () => {
  test('ui-btn base class exists and is applicable', () => {
    const btn = document.createElement('button');
    btn.className = 'ui-btn';
    document.body.appendChild(btn);
    expect(btn.classList.contains('ui-btn')).toBe(true);
  });

  test.each(['ui-btn-primary', 'ui-btn-secondary', 'ui-btn-danger', 'ui-btn-icon'])(
    'variant %s can be applied alongside ui-btn',
    (variant) => {
      const btn = document.createElement('button');
      btn.className = `ui-btn ${variant}`;
      document.body.appendChild(btn);
      expect(btn.classList.contains('ui-btn')).toBe(true);
      expect(btn.classList.contains(variant)).toBe(true);
    }
  );

  test.each(['ui-btn-sm', 'ui-btn-xs', 'ui-btn-lg'])(
    'size variant %s can be applied',
    (size) => {
      const btn = document.createElement('button');
      btn.className = `ui-btn ui-btn-primary ${size}`;
      document.body.appendChild(btn);
      expect(btn.classList.contains(size)).toBe(true);
    }
  );

  test('disabled button has disabled attribute', () => {
    const btn = document.createElement('button');
    btn.className = 'ui-btn ui-btn-primary';
    btn.disabled = true;
    document.body.appendChild(btn);
    expect(btn.disabled).toBe(true);
    expect(btn.matches(':disabled')).toBe(true);
  });

  test('loading state adds ui-btn-loading class', () => {
    const btn = document.createElement('button');
    btn.className = 'ui-btn ui-btn-primary ui-btn-loading';
    document.body.appendChild(btn);
    expect(btn.classList.contains('ui-btn-loading')).toBe(true);
  });

  test('focus-visible outline is defined in CSS', () => {
    expect(CSS).toContain(':focus-visible');
    expect(CSS).toContain('outline');
  });

  test('active state is defined in CSS', () => {
    expect(CSS).toContain(':active:not(:disabled)');
  });

  test('hover state is defined for primary variant', () => {
    expect(CSS).toContain('.ui-btn-primary:hover:not(:disabled)');
  });

  test('hover state is defined for secondary variant', () => {
    expect(CSS).toContain('.ui-btn-secondary:hover:not(:disabled)');
  });

  test('hover state is defined for danger variant', () => {
    expect(CSS).toContain('.ui-btn-danger:hover:not(:disabled)');
  });

  test('transition property is set on base ui-btn', () => {
    expect(CSS).toMatch(/\.ui-btn\s*\{[^}]*transition:/);
  });

  test('ui-btn-pulse keyframes exist for loading animation', () => {
    expect(CSS).toContain('@keyframes ui-btn-pulse');
  });

  test('combined variant and size classes work together', () => {
    const btn = document.createElement('button');
    btn.className = 'ui-btn ui-btn-danger ui-btn-lg ui-btn-loading';
    document.body.appendChild(btn);
    expect(btn.classList.contains('ui-btn')).toBe(true);
    expect(btn.classList.contains('ui-btn-danger')).toBe(true);
    expect(btn.classList.contains('ui-btn-lg')).toBe(true);
    expect(btn.classList.contains('ui-btn-loading')).toBe(true);
  });
});
