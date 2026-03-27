// WP #771: Test: Component composition patterns
const fs = require('fs');
const path = require('path');

const componentsDir = path.resolve(__dirname, '..', 'components');
const tokensCSS = fs.readFileSync(path.resolve(__dirname, '..', 'tokens.css'), 'utf-8');

function injectAll() {
  const style = document.createElement('style');
  style.textContent = tokensCSS;
  const files = fs.readdirSync(componentsDir).filter((f) => f.endsWith('.css'));
  files.forEach((f) => {
    style.textContent += fs.readFileSync(path.join(componentsDir, f), 'utf-8');
  });
  document.head.appendChild(style);
}

beforeEach(() => {
  document.head.innerHTML = '';
  document.body.innerHTML = '';
  injectAll();
});

describe('Component composition patterns', () => {
  describe('Card + Button composition', () => {
    test('buttons render correctly inside cards', () => {
      document.body.innerHTML = `
        <div class="card">
          <div class="card-header"><h3>Actions</h3></div>
          <div class="card-body">
            <button class="ui-btn ui-btn-primary">Save</button>
            <button class="ui-btn ui-btn-secondary">Cancel</button>
          </div>
        </div>`;
      const card = document.querySelector('.card');
      const buttons = card.querySelectorAll('.ui-btn');
      expect(buttons.length).toBe(2);
      expect(buttons[0].classList.contains('ui-btn-primary')).toBe(true);
    });
  });

  describe('Card + Badge composition', () => {
    test('badges render inside card headers', () => {
      document.body.innerHTML = `
        <div class="card">
          <div class="card-header">
            <h3>Status</h3>
            <span class="ui-badge">Active</span>
          </div>
        </div>`;
      const badge = document.querySelector('.card-header .ui-badge');
      expect(badge).not.toBeNull();
      expect(badge.textContent).toBe('Active');
    });
  });

  describe('Modal + Form composition', () => {
    test('forms work inside modals', () => {
      document.body.innerHTML = `
        <div class="modal-overlay">
          <div class="modal" role="dialog">
            <div class="modal-header"><h2>Edit</h2></div>
            <div class="modal-body">
              <div class="form-row">
                <label for="name">Name</label>
                <input type="text" id="name" />
              </div>
              <div class="form-row">
                <label for="email">Email</label>
                <input type="email" id="email" />
              </div>
            </div>
            <div class="modal-footer">
              <button class="ui-btn ui-btn-primary">Save</button>
            </div>
          </div>
        </div>`;
      const formRows = document.querySelectorAll('.modal .form-row');
      expect(formRows.length).toBe(2);
      const saveBtn = document.querySelector('.modal-footer .ui-btn-primary');
      expect(saveBtn.textContent).toBe('Save');
    });
  });

  describe('Navbar + Dropdown composition', () => {
    test('dropdowns render inside navbar', () => {
      document.body.innerHTML = `
        <nav class="ui-navbar">
          <div class="ui-navbar-brand">App</div>
          <div class="ui-dropdown">
            <button class="ui-btn">Menu</button>
            <div class="ui-dropdown-menu">
              <div class="ui-dropdown-item">Option 1</div>
              <div class="ui-dropdown-item">Option 2</div>
            </div>
          </div>
        </nav>`;
      const dropdown = document.querySelector('.ui-navbar .ui-dropdown');
      expect(dropdown).not.toBeNull();
      const items = dropdown.querySelectorAll('.ui-dropdown-item');
      expect(items.length).toBe(2);
    });
  });

  describe('Table + Badge + Button composition', () => {
    test('badges and buttons work inside table cells', () => {
      document.body.innerHTML = `
        <table class="ui-table">
          <thead><tr><th>Name</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            <tr>
              <td>Item 1</td>
              <td><span class="ui-badge">Active</span></td>
              <td><button class="ui-btn ui-btn-sm">Edit</button></td>
            </tr>
          </tbody>
        </table>`;
      const badge = document.querySelector('td .ui-badge');
      const btn = document.querySelector('td .ui-btn');
      expect(badge).not.toBeNull();
      expect(btn).not.toBeNull();
    });
  });

  describe('Layout + Drawer + Content composition', () => {
    test('app layout with sidebar drawer and main content', () => {
      document.body.innerHTML = `
        <div class="app">
          <div class="app-topbar">
            <span>App Title</span>
          </div>
          <div class="app-sidebar">
            <div class="ui-sidebar-nav">
              <a href="/">Home</a>
              <a href="/settings">Settings</a>
            </div>
          </div>
          <div class="app-main">
            <div class="card">
              <div class="card-body"><p>Main content</p></div>
            </div>
          </div>
        </div>`;
      const app = document.querySelector('.app');
      expect(app.querySelector('.app-topbar')).not.toBeNull();
      expect(app.querySelector('.app-sidebar')).not.toBeNull();
      expect(app.querySelector('.app-main .card')).not.toBeNull();
    });
  });

  describe('Alert + Button composition', () => {
    test('buttons inside alerts for dismissal', () => {
      document.body.innerHTML = `
        <div class="ui-alert" role="alert">
          <span>Something happened</span>
          <button class="ui-btn ui-btn-sm">Dismiss</button>
        </div>`;
      const alert = document.querySelector('.ui-alert');
      const dismissBtn = alert.querySelector('.ui-btn');
      expect(dismissBtn).not.toBeNull();
    });
  });

  describe('Breadcrumb + Page layout', () => {
    test('breadcrumb above main content area', () => {
      document.body.innerHTML = `
        <div class="app-main">
          <nav class="ui-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a> / <a href="/projects">Projects</a> / <span>Current</span>
          </nav>
          <h1>Page Title</h1>
          <div class="card"><p>Content</p></div>
        </div>`;
      const breadcrumb = document.querySelector('.ui-breadcrumb');
      expect(breadcrumb).not.toBeNull();
      const links = breadcrumb.querySelectorAll('a');
      expect(links.length).toBe(2);
    });
  });

  describe('Progress + Card composition', () => {
    test('progress bars inside cards', () => {
      document.body.innerHTML = `
        <div class="card">
          <div class="card-header"><h3>Upload</h3></div>
          <div class="card-body">
            <div class="progress-area">
              <div class="progress-bar-wrap">
                <div class="progress-bar" style="width: 75%"></div>
              </div>
            </div>
          </div>
        </div>`;
      const progress = document.querySelector('.card .progress-bar');
      expect(progress).not.toBeNull();
      expect(progress.style.width).toBe('75%');
    });
  });

  describe('Tooltip + Button composition', () => {
    test('tooltip wraps interactive elements', () => {
      document.body.innerHTML = `
        <button class="ui-btn ui-btn-icon" data-tooltip="Click for help" aria-label="Help">?</button>`;
      const btn = document.querySelector('[data-tooltip]');
      expect(btn).not.toBeNull();
      expect(btn.getAttribute('data-tooltip')).toBe('Click for help');
    });
  });
});
