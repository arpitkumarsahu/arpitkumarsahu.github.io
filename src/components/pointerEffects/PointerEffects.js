import React, {useEffect, useRef} from "react";
import "./PointerEffects.css";

const INTERACTIVE = "a, button, [role='button'], label, summary";
const TEXT = "p, h1, h2, h3, h4, li, pre, .chip, .timeline-date, .eyebrow";
const SNAP_MAX_AREA = 48000; // px²; bigger controls get a label or a soft hover instead
const LABEL_ICONS = {Open: "↗", Visit: "↗", Code: "</>", Expand: "+", Close: "×", Reply: "↩"};

const lerp = (a, b, t) => a + (b - a) * t;

/**
 * iPadOS-style pointer plus the page's other cursor-driven effects.
 *
 * Cursor modes (resolved from the element under the pointer):
 *  - default: an inverting dot that stretches along its direction of travel
 *  - snap:    over small buttons/links a highlight wraps the control, iPad-style
 *  - label:   over [data-cursor="Text"] a compact pill trails beside the pointer
 *  - text:    over copy the dot becomes a slim caret sized to the font
 * Clicks send out a ripple. Also drives .spotlight cards (--mx/--my),
 * [data-magnetic] elements and [data-tilt] (--rx/--ry).
 * Mouse/trackpad only; the cursor is skipped entirely for reduced motion.
 */
export default function PointerEffects() {
  const rootRef = useRef(null);
  const blobRef = useRef(null);
  const highlightRef = useRef(null);
  const pillRef = useRef(null);
  const pillTextRef = useRef(null);
  const pillIconRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!finePointer) return undefined;
    const useCursor = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const html = document.documentElement;
    const root = rootRef.current;
    const blob = blobRef.current;
    const highlight = highlightRef.current;
    const pill = pillRef.current;

    if (useCursor) html.classList.add("has-custom-cursor");

    const s = {
      x: -100,
      y: -100,
      bx: -100,
      by: -100,
      px: -100,
      py: -100,
      angle: 0,
      stretch: 0,
      mode: "default",
      snapEl: null,
      snapRadius: 10,
      hl: {x: 0, y: 0, w: 0, h: 0},
      down: false,
      visible: false,
    };
    let frame = 0;
    let magnetEl = null;
    let tiltEl = null;

    const setMode = (mode, extra = {}) => {
      if (mode !== s.mode) {
        blob.classList.remove(`is-${s.mode}`);
        blob.classList.add(`is-${mode}`);
        highlight.classList.toggle("is-active", mode === "snap");
        pill.classList.toggle("is-active", mode === "label");
        if (mode === "snap" && s.mode !== "snap") {
          // Grow the highlight out of the pointer rather than from its last spot.
          s.hl = {x: s.bx - 4, y: s.by - 4, w: 8, h: 8};
        }
        s.mode = mode;
      }
      if (mode === "snap") {
        s.snapEl = extra.el;
        s.snapRadius = extra.radius;
      }
      if (mode === "label" && pillTextRef.current.textContent !== extra.text) {
        pillTextRef.current.textContent = extra.text;
        pillIconRef.current.textContent = LABEL_ICONS[extra.text] || "→";
      }
      if (mode === "text") blob.style.setProperty("--caret-h", `${extra.height}px`);
    };

    const resolve = target => {
      if (!target || !(target instanceof Element)) return setMode("default");
      const interactive = target.closest(INTERACTIVE);
      const labelled = target.closest("[data-cursor]");

      if (interactive && interactive.hasAttribute("data-cursor")) {
        return setMode("label", {text: interactive.getAttribute("data-cursor")});
      }
      if (interactive && !interactive.hasAttribute("data-cursor-skip")) {
        const r = interactive.getBoundingClientRect();
        if (r.width * r.height <= SNAP_MAX_AREA) {
          const radius = parseFloat(getComputedStyle(interactive).borderTopLeftRadius) || 8;
          return setMode("snap", {el: interactive, radius: Math.min(radius + 5, 999)});
        }
      }
      if (labelled) return setMode("label", {text: labelled.getAttribute("data-cursor")});
      if (interactive) return setMode("hover");

      const textEl = target.closest(TEXT);
      if (textEl) {
        const size = parseFloat(getComputedStyle(textEl).fontSize) || 16;
        return setMode("text", {height: Math.min(Math.round(size * 1.15), 72)});
      }
      return setMode("default");
    };

    const loop = () => {
      // Dot: eases toward the pointer and stretches with speed.
      const prevX = s.bx;
      const prevY = s.by;
      s.bx = lerp(s.bx, s.x, 0.3);
      s.by = lerp(s.by, s.y, 0.3);
      const vx = s.bx - prevX;
      const vy = s.by - prevY;
      const speed = Math.hypot(vx, vy);
      if (speed > 0.4) s.angle = Math.atan2(vy, vx);
      const targetStretch = s.mode === "default" || s.mode === "hover" ? Math.min(speed / 28, 0.55) : 0;
      s.stretch = lerp(s.stretch, targetStretch, 0.22);
      const press = s.down ? 0.72 : 1;
      const rotate = s.mode === "text" ? 0 : s.angle;
      blob.style.transform =
        `translate3d(${s.bx}px, ${s.by}px, 0) translate(-50%, -50%) rotate(${rotate}rad) ` +
        `scale(${(1 + s.stretch) * press}, ${(1 - s.stretch * 0.45) * press})`;

      // Highlight: wraps the snapped control, leaning slightly toward the pointer.
      if (s.mode === "snap" && s.snapEl && s.snapEl.isConnected) {
        const r = s.snapEl.getBoundingClientRect();
        const pad = 5;
        const lean = 0.1;
        const tx = r.left - pad + (s.x - (r.left + r.width / 2)) * lean;
        const ty = r.top - pad + (s.y - (r.top + r.height / 2)) * lean;
        s.hl.x = lerp(s.hl.x, tx, 0.3);
        s.hl.y = lerp(s.hl.y, ty, 0.3);
        s.hl.w = lerp(s.hl.w, r.width + pad * 2, 0.3);
        s.hl.h = lerp(s.hl.h, r.height + pad * 2, 0.3);
        highlight.style.transform = `translate3d(${s.hl.x}px, ${s.hl.y}px, 0)`;
        highlight.style.width = `${s.hl.w}px`;
        highlight.style.height = `${s.hl.h}px`;
        highlight.style.borderRadius = `${s.snapRadius}px`;
      }

      // Label pill trails a little behind, flipping sides near the screen edge.
      const flip = s.x > window.innerWidth - 140;
      s.px = lerp(s.px, s.x + (flip ? -18 : 18), 0.2);
      s.py = lerp(s.py, s.y + 18, 0.2);
      pill.style.transform = `translate3d(${s.px}px, ${s.py}px, 0) translateX(${flip ? "-100%" : "0"})`;

      frame = requestAnimationFrame(loop);
    };

    const resetMagnet = () => {
      if (magnetEl) magnetEl.style.transform = "";
      magnetEl = null;
    };
    const resetTilt = () => {
      if (tiltEl) {
        tiltEl.style.setProperty("--rx", "0deg");
        tiltEl.style.setProperty("--ry", "0deg");
      }
      tiltEl = null;
    };

    const onMove = e => {
      s.x = e.clientX;
      s.y = e.clientY;
      const target = e.target instanceof Element ? e.target : null;

      const spot = target && target.closest(".spotlight");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${s.x - r.left}px`);
        spot.style.setProperty("--my", `${s.y - r.top}px`);
      }

      if (!useCursor) return;
      if (!s.visible) {
        s.visible = true;
        s.bx = s.px = s.x;
        s.by = s.py = s.y;
        root.classList.add("is-visible");
      }
      resolve(target);

      const magnet = target && target.closest("[data-magnetic]");
      if (magnet !== magnetEl) resetMagnet();
      if (magnet) {
        magnetEl = magnet;
        const r = magnet.getBoundingClientRect();
        magnet.style.transform = `translate(${(s.x - (r.left + r.width / 2)) * 0.22}px, ${
          (s.y - (r.top + r.height / 2)) * 0.3
        }px)`;
      }

      const tilt = target && target.closest("[data-tilt]");
      if (tilt !== tiltEl) resetTilt();
      if (tilt) {
        tiltEl = tilt;
        const r = tilt.getBoundingClientRect();
        tilt.style.setProperty("--ry", `${(((s.x - r.left) / r.width - 0.5) * 14).toFixed(2)}deg`);
        tilt.style.setProperty("--rx", `${(-((s.y - r.top) / r.height - 0.5) * 10).toFixed(2)}deg`);
      }
    };

    // Content can move under a still pointer (scrolling, dialogs opening).
    const reresolve = () => {
      if (s.visible) resolve(document.elementFromPoint(s.x, s.y));
    };

    const onDown = e => {
      s.down = true;
      if (!useCursor) return;
      const ripple = document.createElement("span");
      ripple.className = "cursor-ripple";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      root.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove());
    };
    const onUp = () => {
      s.down = false;
      setTimeout(reresolve, 60);
    };
    const onLeave = () => {
      s.visible = false;
      root.classList.remove("is-visible");
      resetMagnet();
      resetTilt();
    };

    window.addEventListener("pointermove", onMove, {passive: true});
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("scroll", reresolve, {passive: true});
    document.addEventListener("mouseleave", onLeave);
    if (useCursor) frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("scroll", reresolve);
      document.removeEventListener("mouseleave", onLeave);
      html.classList.remove("has-custom-cursor");
      resetMagnet();
      resetTilt();
    };
  }, []);

  return (
    <div className="cursor" ref={rootRef} aria-hidden="true">
      <div ref={highlightRef} className="cursor-highlight" />
      <div ref={blobRef} className="cursor-blob is-default" />
      <div ref={pillRef} className="cursor-pill">
        <span ref={pillTextRef} className="cursor-pill-text" />
        <span ref={pillIconRef} className="cursor-pill-icon" />
      </div>
    </div>
  );
}
