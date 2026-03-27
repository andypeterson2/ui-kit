// @vitest-environment node
// WP #753: Performance test: bundle size and load time
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const componentsDir = path.join(rootDir, 'components');

describe('Performance: bundle size and load time', () => {
  describe('CSS bundle sizes', () => {
    test('tokens.css is under 10KB', () => {
      const stat = fs.statSync(path.join(rootDir, 'tokens.css'));
      expect(stat.size).toBeLessThan(10 * 1024);
    });

    test('base.css is under 5KB', () => {
      const stat = fs.statSync(path.join(rootDir, 'base.css'));
      expect(stat.size).toBeLessThan(5 * 1024);
    });

    test('individual component files are each under 5KB', () => {
      const files = fs.readdirSync(componentsDir).filter((f) => f.endsWith('.css'));
      files.forEach((f) => {
        const stat = fs.statSync(path.join(componentsDir, f));
        expect(stat.size).toBeLessThan(5 * 1024);
      });
    });

    test('total component CSS is under 80KB', () => {
      const files = fs.readdirSync(componentsDir).filter((f) => f.endsWith('.css'));
      const totalSize = files.reduce((sum, f) => {
        return sum + fs.statSync(path.join(componentsDir, f)).size;
      }, 0);
      expect(totalSize).toBeLessThan(80 * 1024);
    });
  });

  describe('JavaScript bundle sizes', () => {
    test('ui-kit.js is under 25KB', () => {
      const stat = fs.statSync(path.join(rootDir, 'ui-kit.js'));
      expect(stat.size).toBeLessThan(25 * 1024);
    });

    test('theme-bootstrap.js is under 2KB', () => {
      const stat = fs.statSync(path.join(rootDir, 'theme-bootstrap.js'));
      expect(stat.size).toBeLessThan(2 * 1024);
    });

    test('icons.js is under 25KB', () => {
      const stat = fs.statSync(path.join(rootDir, 'icons.js'));
      expect(stat.size).toBeLessThan(25 * 1024);
    });
  });

  describe('Component count and overhead', () => {
    test('component count is documented and reasonable', () => {
      const files = fs.readdirSync(componentsDir).filter((f) => f.endsWith('.css'));
      // Should have a reasonable number of components (not bloated)
      expect(files.length).toBeGreaterThan(10);
      expect(files.length).toBeLessThan(100);
    });

    test('components.css aggregator imports all component files', () => {
      const aggregator = fs.readFileSync(path.join(rootDir, 'components.css'), 'utf-8');
      const files = fs.readdirSync(componentsDir).filter((f) => f.endsWith('.css'));
      files.forEach((f) => {
        expect(aggregator).toContain(f);
      });
    });
  });

  describe('No unnecessary dependencies', () => {
    test('ui-kit.js has no external imports or require statements', () => {
      const js = fs.readFileSync(path.join(rootDir, 'ui-kit.js'), 'utf-8');
      expect(js).not.toMatch(/require\(/);
      expect(js).not.toMatch(/import\s+.*from/);
    });

    test('theme-bootstrap.js is self-contained', () => {
      const js = fs.readFileSync(path.join(rootDir, 'theme-bootstrap.js'), 'utf-8');
      expect(js).not.toMatch(/require\(/);
      expect(js).not.toMatch(/import\s+.*from/);
    });
  });

  describe('File structure efficiency', () => {
    test('component CSS files define a reasonable number of unique selectors', () => {
      const files = fs.readdirSync(componentsDir).filter((f) => f.endsWith('.css'));
      const selectors = new Set();
      files.forEach((f) => {
        const content = fs.readFileSync(path.join(componentsDir, f), 'utf-8');
        const noComments = content.replace(/\/\*[\s\S]*?\*\//g, '');
        const matches = noComments.match(/^\.[a-z][a-z0-9-]+\s*\{/gm) || [];
        matches.forEach((sel) => {
          selectors.add(sel.replace(/\s*\{/, '').trim());
        });
      });
      expect(selectors.size).toBeGreaterThan(30);
    });
  });
});
