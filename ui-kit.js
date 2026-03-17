/**
 * UI-KIT — Reusable UI behaviours.
 *
 * Exposes `window.UIKit` with opt-in initialisers for common interactive
 * patterns: theme toggle, drawer, dropdown, resize handle, and log terminal.
 * Nothing auto-initialises — the consumer calls what they need.
 *
 * Requires icons.js to be loaded first (provides UIKit.ICONS and UIKit.icon).
 *
 * Usage:
 *   <script src="ui-kit/icons.js"></script>
 *   <script src="ui-kit/ui-kit.js"></script>
 *   <script>
 *     UIKit.initThemeToggle(document.getElementById("theme-toggle"));
 *     UIKit.initDrawer(drawerEl, handleEl);
 *   </script>
 */
(function (root) {
  "use strict";

  var UIKit = root.UIKit || {};

  // ═══════════════════════════════════════════════════════════════════════════
  // THEME TOGGLE
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Initialise a dark/light theme toggle button.
   *
   * @param {HTMLElement} el         - The toggle button element.
   * @param {string}      [key="theme"] - localStorage key for persistence.
   * @returns {{ setTheme(t: string): void }}
   */
  UIKit.initThemeToggle = function (el, key) {
    key = key || "theme";

    function apply(theme) {
      document.documentElement.dataset.theme = theme;
      el.innerHTML = theme === "light" ? UIKit.ICONS.moon : UIKit.ICONS.sun;
      el.setAttribute("aria-label",
        theme === "light" ? "Switch to dark mode" : "Switch to light mode");
    }

    apply(localStorage.getItem(key) || "dark");

    el.addEventListener("click", function () {
      var next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
      apply(next);
      localStorage.setItem(key, next);
    });

    return { setTheme: apply };
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // DRAWER
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Initialise a collapsible drawer (adds/removes `.open` class).
   *
   * @param {HTMLElement} drawerEl - The `.drawer` container.
   * @param {HTMLElement} handleEl - The `.side-handle` toggle button.
   * @returns {{ open(): void, close(): void, toggle(): void }}
   */
  UIKit.initDrawer = function (drawerEl, handleEl) {
    function open() {
      drawerEl.classList.add("open");
      handleEl.setAttribute("aria-expanded", "true");
    }
    function close() {
      drawerEl.classList.remove("open");
      handleEl.setAttribute("aria-expanded", "false");
    }
    function toggle() {
      drawerEl.classList.contains("open") ? close() : open();
    }

    handleEl.addEventListener("click", toggle);

    return { open: open, close: close, toggle: toggle };
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // DROPDOWN
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Initialise a dropdown (toggle + click-outside-to-close).
   *
   * @param {HTMLElement} triggerEl - The button that toggles the menu.
   * @param {HTMLElement} menuEl   - The `.ui-dropdown` container.
   * @returns {{ open(): void, close(): void }}
   */
  UIKit.initDropdown = function (triggerEl, menuEl) {
    function open() {
      menuEl.classList.remove("hidden");
      triggerEl.setAttribute("aria-expanded", "true");
    }
    function close() {
      menuEl.classList.add("hidden");
      triggerEl.setAttribute("aria-expanded", "false");
    }

    triggerEl.addEventListener("click", function (e) {
      e.stopPropagation();
      menuEl.classList.contains("hidden") ? open() : close();
    });

    document.addEventListener("click", function (e) {
      if (!menuEl.contains(e.target) && e.target !== triggerEl) {
        close();
      }
    });

    return { open: open, close: close };
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // ESCAPE KEY
  // ═══════════════════════════════════════════════════════════════════════════

  var _escapeCallbacks = [];

  /**
   * Register a callback that fires when the Escape key is pressed.
   *
   * @param {function(): void} callback
   */
  UIKit.onEscape = function (callback) {
    if (_escapeCallbacks.length === 0) {
      document.addEventListener("keydown", function (e) {
        if (e.key !== "Escape") return;
        for (var i = 0; i < _escapeCallbacks.length; i++) {
          _escapeCallbacks[i]();
        }
      });
    }
    _escapeCallbacks.push(callback);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RESIZE HANDLE
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Initialise a drag-to-resize handle for a split layout.
   *
   * @param {HTMLElement} handleEl    - The `.resize-handle` element.
   * @param {HTMLElement} targetEl    - The element whose width is adjusted.
   * @param {HTMLElement} containerEl - The parent flex container.
   * @param {Object}      [opts]
   * @param {number}      [opts.min=180]     - Minimum width in px.
   * @param {number}      [opts.max]         - Maximum width (defaults to container - min).
   * @param {number}      [opts.default=300] - Default width if nothing persisted.
   * @param {string}      [opts.key]         - localStorage key for persistence.
   */
  UIKit.initResize = function (handleEl, targetEl, containerEl, opts) {
    opts = opts || {};
    var min = opts.min || 180;
    var def = opts["default"] || 300;
    var storageKey = opts.key || null;

    // Restore persisted width
    if (storageKey) {
      var saved = parseInt(localStorage.getItem(storageKey));
      targetEl.style.width = (!isNaN(saved) ? saved : def) + "px";
    } else {
      targetEl.style.width = def + "px";
    }

    handleEl.addEventListener("mousedown", function (e) {
      e.preventDefault();
      document.body.classList.add("resize-dragging");
      handleEl.classList.add("dragging");
      var startX = e.clientX;
      var startW = targetEl.getBoundingClientRect().width;

      function onMove(e) {
        var bounds = containerEl.getBoundingClientRect();
        var maxW = opts.max || (bounds.width - min);
        var newW = Math.max(min, Math.min(maxW, startW + (e.clientX - startX)));
        targetEl.style.width = newW + "px";
        if (storageKey) localStorage.setItem(storageKey, Math.round(newW));
      }
      function onUp() {
        handleEl.classList.remove("dragging");
        document.body.classList.remove("resize-dragging");
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      }
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    });
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // LOG TERMINAL
  // ═══════════════════════════════════════════════════════════════════════════

  /**
   * Create a log appender for a `.log-terminal` element.
   *
   * @param {HTMLElement} terminalEl   - The `.log-terminal` container.
   * @param {number}      [max=200]    - Maximum retained entries.
   * @returns {function(msg: string, level?: string): void}
   */
  UIKit.createLogger = function (terminalEl, max) {
    max = max || 200;

    return function addLog(msg, level) {
      var time  = new Date().toTimeString().slice(0, 8);
      var entry = document.createElement("div");
      entry.className = "log-entry";
      var t = document.createElement("span");
      t.className   = "log-time";
      t.textContent = time;
      var m = document.createElement("span");
      m.className   = "log-msg" + (level ? " log-" + level : "");
      m.textContent = msg;
      entry.appendChild(t);
      entry.appendChild(m);
      terminalEl.appendChild(entry);
      while (terminalEl.children.length > max) terminalEl.removeChild(terminalEl.firstChild);
      terminalEl.scrollTop = terminalEl.scrollHeight;
    };
  };

  // ═══════════════════════════════════════════════════════════════════════════

  root.UIKit = UIKit;

})(window);
