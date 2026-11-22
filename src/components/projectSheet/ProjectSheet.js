import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import "./ProjectSheet.css";
import {parseTech, linkIcon, isRepoLink, hostOf} from "../../containers/StartupProjects/projectUtils";

const DURATION = 560;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isBottomSheet = () => window.matchMedia("(max-width: 720px)").matches;

function inViewport(rect) {
  return rect && rect.width > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
}

/**
 * Flies a copy of the screenshot between two rectangles (card <-> sheet) so the
 * card appears to expand into the sheet.
 */
function flyImage(src, fromRect, toRect, fromRadius, toRadius) {
  const clone = document.createElement("img");
  clone.src = src;
  clone.alt = "";
  clone.className = "sheet-fly";
  Object.assign(clone.style, {
    left: `${toRect.left}px`,
    top: `${toRect.top}px`,
    width: `${toRect.width}px`,
    height: `${toRect.height}px`,
  });
  document.body.appendChild(clone);
  // Uniform scale (no stretching), vertically centred on the source image.
  const s = fromRect.width / toRect.width;
  const dx = fromRect.left - toRect.left;
  const dy = fromRect.top + fromRect.height / 2 - (toRect.top + (toRect.height * s) / 2);
  const animation = clone.animate(
    [
      {transform: `translate(${dx}px, ${dy}px) scale(${s})`, borderRadius: `${fromRadius / s}px`},
      {transform: "none", borderRadius: `${toRadius}px`},
    ],
    {duration: DURATION, easing: EASE, fill: "forwards"}
  );
  return animation.finished.catch(() => {}).then(() => clone.remove());
}

export default function ProjectSheet({projects, index, originEl, getOrigin, onNavigate, onClose}) {
  const project = projects[index];
  const links = project.footerLink || [];
  const primary = links.find(link => !isRepoLink(link)) || links[0];

  // measure -> enter -> open -> closing
  const [phase, setPhase] = useState("measure");
  const [flying, setFlying] = useState(false);
  const panelRef = useRef(null);
  const imgRef = useRef(null);
  const closeRef = useRef(null);
  const drag = useRef(null);
  const closingRef = useRef(false);

  // Lock page scroll (keeping the scrollbar gap) while the sheet is open.
  useEffect(() => {
    const {body, documentElement} = document;
    const gap = window.innerWidth - documentElement.clientWidth;
    const prev = {overflow: body.style.overflow, paddingRight: body.style.paddingRight};
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prev.overflow;
      body.style.paddingRight = prev.paddingRight;
    };
  }, []);

  // Entrance: measure the final image position, then expand from the card.
  useLayoutEffect(() => {
    const img = imgRef.current;
    const from = originEl && originEl.getBoundingClientRect();
    const canFly = img && project.image && !reducedMotion() && inViewport(from);
    if (canFly) {
      const to = img.getBoundingClientRect();
      setFlying(true);
      flyImage(project.image, from, to, 10, isBottomSheet() ? 12 : 10).then(() => setFlying(false));
    }
    setPhase("enter");
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setPhase("open")));
    closeRef.current && closeRef.current.focus({preventScroll: true});
    return () => cancelAnimationFrame(frame);
    // Only on mount; navigation swaps content without re-running the morph.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = useCallback(
    ({fly = true} = {}) => {
      if (closingRef.current) return;
      closingRef.current = true;
      const img = imgRef.current;
      const target = getOrigin(index);
      const to = target && target.getBoundingClientRect();
      if (fly && img && project.image && !reducedMotion() && inViewport(to)) {
        setFlying(true);
        flyImage(project.image, img.getBoundingClientRect(), to, 12, 10);
      }
      setPhase("closing");
      setTimeout(onClose, reducedMotion() ? 0 : DURATION - 40);
    },
    [getOrigin, index, onClose, project.image]
  );

  const go = useCallback(
    step => {
      const next = (index + step + projects.length) % projects.length;
      onNavigate(next);
      if (panelRef.current) panelRef.current.scrollTop = 0;
    },
    [index, onNavigate, projects.length]
  );

  // Keyboard: Esc closes, arrows navigate, Tab stays inside the dialog.
  useEffect(() => {
    const onKey = e => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, go]);

  // Bottom sheet: drag the handle/screenshot down to dismiss, like a native sheet.
  const onPointerDown = e => {
    if (!isBottomSheet() || e.pointerType === "mouse") return;
    drag.current = {startY: e.clientY, dy: 0, t: performance.now()};
    panelRef.current.classList.add("is-dragging");
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = e => {
    if (!drag.current) return;
    const dy = Math.max(0, e.clientY - drag.current.startY);
    drag.current.dy = dy;
    panelRef.current.style.transform = `translateY(${dy}px)`;
  };
  const onPointerUp = () => {
    if (!drag.current) return;
    const {dy, t} = drag.current;
    const velocity = dy / Math.max(1, performance.now() - t);
    drag.current = null;
    const panel = panelRef.current;
    panel.classList.remove("is-dragging");
    panel.style.transform = "";
    if (dy > 120 || velocity > 0.6) close({fly: false});
  };
  const dragHandlers = {onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp};

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const titleId = `sheet-title-${index}`;

  return ReactDOM.createPortal(
    <div className={`sheet-root is-${phase} ${flying ? "is-flying" : ""}`}>
      <div className="sheet-backdrop" onClick={() => close()} aria-hidden="true" />
      <div
        className="sheet-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="sheet-grabber" {...dragHandlers} aria-hidden="true">
          <span />
        </div>

        <button
          type="button"
          className="sheet-close"
          ref={closeRef}
          onClick={() => close()}
          aria-label="Close project details"
          data-cursor="Close"
        >
          <i className="fas fa-times" aria-hidden="true"></i>
        </button>

        <div className="sheet-media browser" {...dragHandlers}>
          <div className="browser-bar">
            <span className="browser-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            {primary ? (
              <a className="browser-url mono" href={primary.url} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-lock" aria-hidden="true"></i>
                {hostOf(primary.url)}
              </a>
            ) : null}
          </div>
          <div className="browser-viewport">
            {project.image ? <img key={index} ref={imgRef} src={project.image} alt={`${project.projectName} screenshot`} /> : null}
          </div>
        </div>

        <div className="sheet-content" key={index}>
          <div className="sheet-heading">
            <span className="sheet-index mono">
              {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <h3 id={titleId}>{project.projectName}</h3>
          </div>

          <div className="sheet-grid">
            <p className="sheet-desc">{project.projectDesc.trim()}</p>
            <aside className="sheet-aside">
              <div className="sheet-label mono">tech stack</div>
              <ul className="chips">
                {parseTech(project.tech).map(tech => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>
              {links.length ? (
                <div className="sheet-actions">
                  {links.map(link => (
                    <a
                      key={link.url}
                      className={`btn ${isRepoLink(link) ? "btn-ghost" : "btn-primary"}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-magnetic
                    >
                      <i className={linkIcon(link)} aria-hidden="true"></i> {link.name}
                    </a>
                  ))}
                </div>
              ) : null}
            </aside>
          </div>
        </div>

        {projects.length > 1 ? (
          <nav className="sheet-nav" aria-label="More projects">
            <button type="button" onClick={() => go(-1)} className="sheet-nav-btn">
              <i className="fas fa-arrow-left" aria-hidden="true"></i>
              <span>
                <em className="mono">previous</em>
                {prev.projectName}
              </span>
            </button>
            <button type="button" onClick={() => go(1)} className="sheet-nav-btn is-next">
              <span>
                <em className="mono">next</em>
                {next.projectName}
              </span>
              <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </button>
          </nav>
        ) : null}
      </div>
    </div>,
    document.body
  );
}
