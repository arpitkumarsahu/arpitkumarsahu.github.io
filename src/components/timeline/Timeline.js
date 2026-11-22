import React, {useEffect, useId, useRef, useState} from "react";
import "./Timeline.css";
import Reveal from "../reveal/Reveal";

/**
 * Vertical timeline shared by the Education and Experience sections.
 * items: [{logo, title, subtitle, date, desc, bullets}]
 * Entries expand/collapse on click; the rail fills in as the list scrolls past.
 */
export default function Timeline({items}) {
  const listRef = useRef(null);
  const [open, setOpen] = useState(() => new Set()); // all entries start collapsed
  const [reached, setReached] = useState(-1);
  const baseId = useId();

  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = list.getBoundingClientRect();
      const line = window.innerHeight * 0.65;
      const progress = Math.min(1, Math.max(0, (line - rect.top) / rect.height));
      list.style.setProperty("--progress", progress.toFixed(4));
      const markers = list.querySelectorAll(".timeline-marker");
      let last = -1;
      markers.forEach((marker, i) => {
        if (marker.getBoundingClientRect().top + 24 <= line) last = i;
      });
      setReached(last);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, {passive: true});
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toggle = i =>
    setOpen(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <ol className="timeline" ref={listRef}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const panelId = `${baseId}-panel-${i}`;
        const hasDetails = Boolean(item.desc || (item.bullets && item.bullets.length));
        return (
          <Reveal
            as="li"
            key={`${item.title}-${i}`}
            className={`timeline-item ${isOpen ? "is-open" : ""} ${i <= reached ? "is-reached" : ""}`}
            variant="left"
            delay={i * 110}
          >
            <div className="timeline-marker">
              {item.logo ? <img src={item.logo} alt="" loading="lazy" /> : null}
            </div>
            <div className="card timeline-card spotlight">
              <button
                type="button"
                className="timeline-toggle"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => hasDetails && toggle(i)}
                data-cursor={hasDetails ? (isOpen ? "Close" : "Expand") : undefined}
              >
                <span className="timeline-head">
                  <span className="timeline-title">{item.title}</span>
                  {item.date ? <span className="timeline-date mono">{item.date}</span> : null}
                </span>
                {item.subtitle ? <span className="timeline-subtitle">{item.subtitle}</span> : null}
                {hasDetails ? (
                  <span className="timeline-chevron" aria-hidden="true">
                    <i className="fas fa-plus"></i>
                  </span>
                ) : null}
              </button>
              {hasDetails ? (
                <div className="timeline-panel" id={panelId} role="region" aria-hidden={!isOpen}>
                  <div className="timeline-panel-inner">
                    {item.desc ? <p className="timeline-desc">{item.desc.trim()}</p> : null}
                    {item.bullets && item.bullets.length ? (
                      <ul className="timeline-bullets">
                        {item.bullets.map((bullet, j) => (
                          <li key={j}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
