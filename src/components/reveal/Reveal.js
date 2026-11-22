import React, {forwardRef, useEffect, useRef, useState} from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Animates its children in the first time they scroll into view.
 * variant: "up" (default) | "blur" | "scale" | "left" | "right" | "clip" | "none"
 * Styles live in index.css (.reveal / .is-visible / .is-settled).
 */
const Reveal = forwardRef(function Reveal(
  {as: Tag = "div", delay = 0, variant = "up", className = "", style, children, ...rest},
  forwardedRef
) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined" || prefersReducedMotion()) {
      setVisible(true);
      setSettled(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {rootMargin: "0px 0px -10% 0px", threshold: 0.05}
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // After the entrance finishes, remove the stagger delay so hover effects feel instant.
  useEffect(() => {
    if (!visible || settled) return undefined;
    const timer = setTimeout(() => setSettled(true), delay + 1200);
    return () => clearTimeout(timer);
  }, [visible, settled, delay]);

  const setRefs = node => {
    ref.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  const classes = ["reveal", visible && "is-visible", settled && "is-settled", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={setRefs}
      className={classes}
      data-variant={variant}
      style={{"--reveal-delay": `${delay}ms`, ...style}}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export default Reveal;
