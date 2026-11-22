import React, {useEffect, useState} from "react";
import "./TabBar.css";
import useActiveSection from "../../hooks/useActiveSection";

// "journey" covers both Education and Experience.
const TABS = [
  {id: "greeting", label: "Home", icon: "fas fa-home", sections: ["greeting", "app"]},
  {id: "skills", label: "Skills", icon: "fas fa-layer-group", sections: ["skills"]},
  {id: "education", label: "Journey", icon: "fas fa-route", sections: ["education", "experience"]},
  {id: "projects", label: "Projects", icon: "fas fa-th-large", sections: ["projects"]},
  {id: "contact", label: "Contact", icon: "fas fa-paper-plane", sections: ["contact"]},
];

const ALL_SECTIONS = TABS.flatMap(tab => tab.sections);

/**
 * iOS-style bottom tab bar shown on phones/tablets. It tracks the current
 * section and tucks away while scrolling down, like a native app.
 */
export default function TabBar() {
  const activeSection = useActiveSection(ALL_SECTIONS);
  const activeIndex = Math.max(
    0,
    TABS.findIndex(tab => tab.sections.includes(activeSection))
  );
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const nearBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 40;
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 240 && !nearBottom);
        lastY = y;
      }
    };
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`tab-bar ${hidden ? "is-hidden" : ""}`} aria-label="Sections">
      <span className="tab-bar-indicator" style={{"--tab-index": activeIndex}} aria-hidden="true" />
      {TABS.map((tab, i) => (
        <a
          key={tab.id}
          href={`#${tab.id}`}
          className={`tab-bar-item ${i === activeIndex ? "is-active" : ""}`}
          aria-current={i === activeIndex ? "true" : undefined}
        >
          <i className={tab.icon} aria-hidden="true"></i>
          <span>{tab.label}</span>
        </a>
      ))}
    </nav>
  );
}
