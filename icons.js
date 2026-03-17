/**
 * UI-KIT — Consolidated SVG Icon Library.
 *
 * All icons are 16×16, use currentColor, and are wrapped in <span class="icon">.
 * Style: stroke-based (stroke-width 1.5–2, round caps/joins) unless noted.
 *
 * Replaces: Font Awesome (website), scattered .svg files (Video Chat),
 * and duplicated inline SVGs across all projects.
 *
 * Usage:
 *   <script src="ui-kit/icons.js"></script>
 *   element.innerHTML = UIKit.ICONS.play;
 *   // or
 *   element.innerHTML = UIKit.icon("play");
 */
(function (root) {
  "use strict";

  var UIKit = root.UIKit || {};

  // ═══════════════════════════════════════════════════════════════════════════
  // ICONS — inline SVG markup strings (16×16, currentColor)
  // ═══════════════════════════════════════════════════════════════════════════

  var S = ' stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"';
  var S2 = ' stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  var V = '<span class="icon"><svg viewBox="0 0 16 16" fill="none"';

  UIKit.ICONS = {

    // ── App controls ──

    /** Right-pointing play triangle (filled). */
    play: '<span class="icon"><svg viewBox="0 0 16 16" fill="currentColor" stroke="none"><polygon points="4,2 14,8 4,14"/></svg></span>',

    /** Pause (two vertical bars). */
    pause: V + S2 + '><line x1="5" y1="3" x2="5" y2="13"/><line x1="11" y1="3" x2="11" y2="13"/></svg></span>',

    /** Stop (filled square). */
    stop: '<span class="icon"><svg viewBox="0 0 16 16" fill="currentColor" stroke="none"><rect x="3" y="3" width="10" height="10"/></svg></span>',

    /** Circular refresh arrow. */
    refresh: V + S2 + '><path d="M13.5 2.5v4h-4"/><path d="M2.5 13.5v-4h4"/><path d="M3.2 6a5.5 5.5 0 0 1 9.3-1.5L13.5 6.5"/><path d="M12.8 10a5.5 5.5 0 0 1-9.3 1.5L2.5 9.5"/></svg></span>',

    /** Spinning refresh arrow (animated via CSS .icon-spin). */
    spinner: '<span class="icon icon-spin"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 2a6 6 0 0 1 5.2 3"/><path d="M13.2 5l0.3-2.5L11 3.5"/></svg></span>',

    /** Floppy-disk save icon. */
    save: V + S + '><path d="M13 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h7l4 4v7a1 1 0 0 1-1 1z"/><polyline points="10,2 10,5 5,5 5,2"/><rect x="5" y="9" width="6" height="4"/></svg></span>',

    /** Close / remove (X mark). */
    close: V + S2 + '><line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/></svg></span>',

    /** Plus sign. */
    plus: V + S2 + '><line x1="8" y1="3" x2="8" y2="13"/><line x1="3" y1="8" x2="13" y2="8"/></svg></span>',

    /** Minus sign. */
    minus: V + S2 + '><line x1="3" y1="8" x2="13" y2="8"/></svg></span>',

    /** Hamburger menu (three horizontal lines). */
    hamburger: V + S2 + '><line x1="2" y1="4" x2="14" y2="4"/><line x1="2" y1="8" x2="14" y2="8"/><line x1="2" y1="12" x2="14" y2="12"/></svg></span>',

    /** Right-pointing chevron (rotated via CSS for open/close). */
    chevron: '<svg class="drawer-chevron" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6,3 11,8 6,13"/></svg>',

    /** Gear / settings. */
    gear: V + S + '><circle cx="8" cy="8" r="2.5"/><path d="M13.3 9.7l-.6 1a.5.5 0 0 0 .1.6l.8.7a.5.5 0 0 1 0 .7l-.7.7a.5.5 0 0 1-.7 0l-.7-.8a.5.5 0 0 0-.6-.1l-1 .6a.5.5 0 0 0-.3.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 0-.3-.5l-1-.6a.5.5 0 0 0-.6.1l-.7.8a.5.5 0 0 1-.7 0l-.7-.7a.5.5 0 0 1 0-.7l.8-.7a.5.5 0 0 0 .1-.6l-.6-1a.5.5 0 0 0-.5-.3h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 0 .5-.3l.6-1a.5.5 0 0 0-.1-.6l-.8-.7a.5.5 0 0 1 0-.7l.7-.7a.5.5 0 0 1 .7 0l.7.8a.5.5 0 0 0 .6.1l1-.6a.5.5 0 0 0 .3-.5v-1a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 0 .3.5l1 .6a.5.5 0 0 0 .6-.1l.7-.8a.5.5 0 0 1 .7 0l.7.7a.5.5 0 0 1 0 .7l-.8.7a.5.5 0 0 0-.1.6l.6 1a.5.5 0 0 0 .5.3h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 0-.5.3z"/></svg></span>',

    // ── Theme ──

    /** Crescent moon (dark-theme indicator, filled). */
    moon: '<span class="icon"><svg viewBox="0 0 16 16" fill="currentColor" stroke="none"><path d="M8 1a7 7 0 1 0 0 14A5 5 0 0 1 8 1z"/></svg></span>',

    /** Sun with rays (light-theme indicator). */
    sun: V + S + '><circle cx="8" cy="8" r="3"/><line x1="8" y1="1" x2="8" y2="3"/><line x1="8" y1="13" x2="8" y2="15"/><line x1="1" y1="8" x2="3" y2="8"/><line x1="13" y1="8" x2="15" y2="8"/><line x1="3.1" y1="3.1" x2="4.5" y2="4.5"/><line x1="11.5" y1="11.5" x2="12.9" y2="12.9"/><line x1="3.1" y1="12.9" x2="4.5" y2="11.5"/><line x1="11.5" y1="4.5" x2="12.9" y2="3.1"/></svg></span>',

    // ── Contact / social (replaces Font Awesome) ──

    /** Map marker pin. */
    mapMarker: V + S + '><path d="M8 1C5.2 1 3 3.2 3 6c0 4 5 9 5 9s5-5 5-9c0-2.8-2.2-5-5-5z"/><circle cx="8" cy="6" r="1.5"/></svg></span>',

    /** Graduation cap. */
    graduationCap: V + S + '><polygon points="8,2 1,6 8,10 15,6"/><polyline points="12,7.5 12,12 8,14 4,12 4,7.5"/></svg></span>',

    /** Envelope / email. */
    envelope: V + S + '><rect x="1" y="3" width="14" height="10"/><polyline points="1,3 8,9 15,3"/></svg></span>',

    /** Certificate / badge. */
    certificate: V + S + '><circle cx="8" cy="6" r="4"/><polyline points="5.5,9.5 4,15 8,13 12,15 10.5,9.5"/></svg></span>',

    /** Download arrow. */
    download: V + S2 + '><line x1="8" y1="2" x2="8" y2="11"/><polyline points="4,7 8,11 12,7"/><line x1="2" y1="14" x2="14" y2="14"/></svg></span>',

    /** Upload arrow. */
    upload: V + S2 + '><line x1="8" y1="11" x2="8" y2="2"/><polyline points="4,6 8,2 12,6"/><line x1="2" y1="14" x2="14" y2="14"/></svg></span>',

    /** Lock (closed). */
    lock: V + S + '><rect x="3" y="7" width="10" height="7"/><path d="M5 7V5a3 3 0 0 1 6 0v2"/></svg></span>',

    /** Unlock (open). */
    unlock: V + S + '><rect x="3" y="7" width="10" height="7"/><path d="M5 7V5a3 3 0 0 1 6 0"/></svg></span>',

    /** Brain / AI. */
    brain: V + S + '><path d="M8 2C6 2 4.5 3 4 4.5 2.5 4.8 1.5 6 1.5 7.5c0 1.3.7 2.3 1.8 2.8C3.5 12 5.5 14 8 14s4.5-2 4.7-3.7c1.1-.5 1.8-1.5 1.8-2.8 0-1.5-1-2.7-2.5-3C11.5 3 10 2 8 2z"/><path d="M8 2v12"/></svg></span>',

    /** GitHub logo (filled path). */
    github: '<span class="icon"><svg viewBox="0 0 16 16" fill="currentColor" stroke="none"><path d="M8 .5A7.5 7.5 0 0 0 5.6 15.1c.4.1.5-.2.5-.4v-1.3C4 13.8 3.5 12.4 3.5 12.4c-.3-.9-.8-1.1-.8-1.1-.7-.5 0-.5 0-.5.7.1 1.1.7 1.1.7.6 1.1 1.7.8 2.1.6.1-.5.3-.8.5-.9-1.6-.2-3.3-.8-3.3-3.6 0-.8.3-1.4.7-2-.1-.2-.3-.9.1-1.9 0 0 .6-.2 2 .7a6.8 6.8 0 0 1 3.6 0c1.4-.9 2-.7 2-.7.4 1 .2 1.7.1 1.9.5.5.7 1.2.7 2 0 2.8-1.7 3.4-3.3 3.6.3.2.5.7.5 1.4v2.1c0 .2.1.5.5.4A7.5 7.5 0 0 0 8 .5z"/></svg></span>',

    /** LinkedIn logo (filled path). */
    linkedin: '<span class="icon"><svg viewBox="0 0 16 16" fill="currentColor" stroke="none"><path d="M2.5 1.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zM1 6h3v9H1V6zm5 0h2.8v1.2h0C9.3 6.5 10.3 6 11.5 6c2.7 0 3.2 1.8 3.2 4v5h-3V10.5c0-1.1 0-2.5-1.5-2.5S8.5 9.3 8.5 10.5V15H6V6z"/></svg></span>',

    /** Calendar with plus. */
    calendar: V + S + '><rect x="2" y="3" width="12" height="12"/><line x1="2" y1="7" x2="14" y2="7"/><line x1="5" y1="1" x2="5" y2="4"/><line x1="11" y1="1" x2="11" y2="4"/><line x1="8" y1="9" x2="8" y2="13"/><line x1="6" y1="11" x2="10" y2="11"/></svg></span>',

    // ── Media (Video Chat) ──

    /** Video camera. */
    video: V + S + '><rect x="1" y="4" width="9" height="8"/><polygon points="10,6 15,3 15,13 10,10"/></svg></span>',

    /** Video camera off. */
    videoOff: V + S + '><rect x="1" y="4" width="9" height="8"/><polygon points="10,6 15,3 15,13 10,10"/><line x1="1" y1="1" x2="15" y2="15"/></svg></span>',

    /** Microphone. */
    microphone: V + S + '><rect x="5.5" y="1" width="5" height="9"/><path d="M3 8a5 5 0 0 0 10 0"/><line x1="8" y1="13" x2="8" y2="15"/><line x1="5" y1="15" x2="11" y2="15"/></svg></span>',

    /** Microphone muted. */
    microphoneOff: V + S + '><rect x="5.5" y="1" width="5" height="9"/><path d="M3 8a5 5 0 0 0 10 0"/><line x1="8" y1="13" x2="8" y2="15"/><line x1="5" y1="15" x2="11" y2="15"/><line x1="1" y1="1" x2="15" y2="15"/></svg></span>',

    /** WiFi / signal icon. */
    wifi: V + S + '><path d="M1 5.5a10 10 0 0 1 14 0"/><path d="M3.5 8a6.5 6.5 0 0 1 9 0"/><path d="M6 10.5a3.5 3.5 0 0 1 4 0"/><circle cx="8" cy="13" r="0.5" fill="currentColor"/></svg></span>',

    // ── Misc ──

    /** External link. */
    externalLink: V + S + '><path d="M11 1h4v4"/><line x1="15" y1="1" x2="8" y2="8"/><path d="M13 9v5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5"/></svg></span>',

    /** Copy / clipboard. */
    copy: V + S + '><rect x="5" y="5" width="9" height="9"/><path d="M3 11H2V2h9v1"/></svg></span>',

    /** Edit / pencil. */
    edit: V + S + '><path d="M11.5 1.5l3 3L5 14H2v-3z"/></svg></span>',

    /** Trash / delete. */
    trash: V + S + '><polyline points="3,4 4,14 12,14 13,4"/><line x1="1" y1="4" x2="15" y2="4"/><path d="M6 4V2h4v2"/></svg></span>',

    /** Search / magnifying glass. */
    search: V + S + '><circle cx="7" cy="7" r="4.5"/><line x1="10.5" y1="10.5" x2="14" y2="14"/></svg></span>',

    /** Info circle. */
    info: V + S + '><circle cx="8" cy="8" r="6.5"/><line x1="8" y1="7" x2="8" y2="12"/><circle cx="8" cy="4.5" r="0.5" fill="currentColor"/></svg></span>',

    /** Warning triangle. */
    warning: V + S + '><path d="M8 1L1 14h14L8 1z"/><line x1="8" y1="6" x2="8" y2="10"/><circle cx="8" cy="12" r="0.5" fill="currentColor"/></svg></span>',

    /** Check / tick mark. */
    check: V + S2 + '><polyline points="3,8 6.5,12 13,4"/></svg></span>',

    /** Arrow left. */
    arrowLeft: V + S2 + '><line x1="14" y1="8" x2="2" y2="8"/><polyline points="6,4 2,8 6,12"/></svg></span>',

    /** Arrow right. */
    arrowRight: V + S2 + '><line x1="2" y1="8" x2="14" y2="8"/><polyline points="10,4 14,8 10,12"/></svg></span>',

    /** Star (outline). */
    star: V + S + '><polygon points="8,1.5 10,6 15,6.5 11,10 12.5,15 8,12 3.5,15 5,10 1,6.5 6,6"/></svg></span>',

    /** Code branch / fork. */
    codeBranch: V + S + '><circle cx="8" cy="3" r="1.5"/><circle cx="4" cy="13" r="1.5"/><circle cx="12" cy="13" r="1.5"/><line x1="8" y1="4.5" x2="8" y2="8"/><path d="M8 8c0 2-2.5 3.5-4 3.5"/><path d="M8 8c0 2 2.5 3.5 4 3.5"/></svg></span>',
  };

  /**
   * Get an icon's HTML markup by name.
   *
   * @param {string} name   - Icon name (key in UIKit.ICONS).
   * @param {Object} [opts] - Options (reserved for future use: size, class).
   * @returns {string} HTML string, or empty string if not found.
   */
  UIKit.icon = function (name, opts) {
    return UIKit.ICONS[name] || "";
  };

  root.UIKit = UIKit;

})(window);
