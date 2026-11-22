import React, {useEffect, useRef, useState} from "react";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import useActiveSection from "../../hooks/useActiveSection";
import {openResume} from "../../utils/resume";
import {
  greeting,
  workExperiences,
  skillsSection,
  blogSection,
  talkSection,
  achievementSection,
  bigProjects,
  educationInfo,
} from "../../portfolio";

const NAV_ITEMS = [
  {id: "app", label: "App", show: true},
  {id: "skills", label: "Skills", show: skillsSection.display},
  {id: "education", label: "Education", show: educationInfo.display},
  {id: "experience", label: "Experience", show: workExperiences.display},
  {id: "projects", label: "Projects", show: bigProjects.display},
  {id: "achievements", label: "Achievements", show: achievementSection.display},
  {id: "blogs", label: "Blogs", show: blogSection.display},
  {id: "talks", label: "Talks", show: talkSection.display},
  {id: "contact", label: "Contact", show: true},
].filter(item => item.show);

const SECTION_IDS = ["greeting", ...NAV_ITEMS.map(item => item.id)];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef(null);
  const active = useActiveSection(SECTION_IDS);
  const handle = greeting.username.split(" ")[0].toLowerCase();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      setScrolled(window.scrollY > 8);
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

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container nav">
        <a href="#greeting" className="brand" aria-label={`${greeting.username}, back to top`}>
          <span className="brand-prefix">~/</span>
          {handle}
          <span className="brand-cursor" aria-hidden="true">
            _
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={active === item.id ? "is-active" : ""}
              aria-current={active === item.id ? "true" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button type="button" className="btn btn-ghost btn-sm nav-resume" onClick={openResume} data-magnetic>
            <i className="fas fa-download" aria-hidden="true"></i>
            <span className="nav-resume-text">Resume</span>
          </button>
          <ToggleSwitch />
        </div>
      </div>
      <div className="scroll-progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>
    </header>
  );
}
export default Header;
