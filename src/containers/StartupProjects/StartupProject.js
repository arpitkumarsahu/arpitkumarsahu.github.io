import React, {useCallback, useEffect, useRef, useState} from "react";
import "./StartupProjects.css";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
import Reveal from "../../components/reveal/Reveal";
import ProjectSheet from "../../components/projectSheet/ProjectSheet";
import {bigProjects} from "../../portfolio";
import {OPEN_PROJECT_EVENT} from "../../utils/events";
import {parseTech, linkIcon, isRepoLink} from "./projectUtils";

// "SOME OF MY PROJECTS" -> "Some of my projects"
function capitalize(text) {
  const lower = text.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

export default function StartupProject() {
  const [active, setActive] = useState(null); // {index, originEl}
  const imageRefs = useRef([]);
  const triggerRefs = useRef([]);

  const openProject = useCallback((index, originEl) => {
    setActive({index, originEl: originEl || imageRefs.current[index] || null});
  }, []);

  // The hero phone's "Featured" row can open a project too.
  useEffect(() => {
    const onOpen = e => openProject(e.detail.index, e.detail.originEl);
    window.addEventListener(OPEN_PROJECT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, onOpen);
  }, [openProject]);

  if (!bigProjects.display) {
    return null;
  }
  const projects = bigProjects.projects;

  return (
    <section className="section" id="projects">
      <div className="container">
        <SectionHeader
          index="05"
          label="projects"
          title={bigProjects.title}
          subtitle={bigProjects.subtitle ? capitalize(bigProjects.subtitle) : null}
        />

        <div className="projects-grid">
          {projects.map((project, i) => {
            const links = project.footerLink || [];
            return (
              <Reveal
                as="article"
                key={project.projectName}
                className="card project-card spotlight pressable"
                variant="blur"
                delay={(i % 2) * 120}
                data-cursor="Open"
              >
                {project.image ? (
                  <div className="project-media">
                    <img
                      ref={el => (imageRefs.current[i] = el)}
                      src={project.image}
                      alt=""
                      loading="lazy"
                    />
                    <span className="project-media-hint" aria-hidden="true">
                      <i className="fas fa-expand-alt"></i>
                    </span>
                  </div>
                ) : null}
                <div className="project-body">
                  <div className="project-top">
                    <span className="project-index mono">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="pcard-title">
                      {/* Stretched button: the whole card opens the detail sheet. */}
                      <button
                        type="button"
                        className="project-open"
                        ref={el => (triggerRefs.current[i] = el)}
                        onClick={() => openProject(i)}
                        aria-haspopup="dialog"
                        data-cursor-skip
                      >
                        {project.projectName}
                      </button>
                    </h3>
                  </div>
                  <p className="project-desc">{project.projectDesc.trim()}</p>
                  <ul className="chips" aria-label="Tech stack">
                    {parseTech(project.tech).map(tech => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                  {links.length ? (
                    <div className="project-links">
                      {links.map(link => (
                        <a
                          key={link.url}
                          className="link-arrow"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor={isRepoLink(link) ? "Code" : "Visit"}
                        >
                          {link.name}
                          <i className={linkIcon(link)} aria-hidden="true"></i>
                        </a>
                      ))}
                      <span className="project-more mono" aria-hidden="true">
                        details <i className="fas fa-arrow-right"></i>
                      </span>
                    </div>
                  ) : null}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {active ? (
        <ProjectSheet
          projects={projects}
          index={active.index}
          originEl={active.originEl}
          getOrigin={i => imageRefs.current[i]}
          onNavigate={i => setActive({index: i, originEl: imageRefs.current[i]})}
          onClose={() => {
            const trigger = triggerRefs.current[active.index];
            setActive(null);
            if (trigger) trigger.focus({preventScroll: true});
          }}
        />
      ) : null}
    </section>
  );
}
