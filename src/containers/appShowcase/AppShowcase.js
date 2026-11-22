import React, {useEffect, useRef, useState} from "react";
import "./AppShowcase.css";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
import Reveal from "../../components/reveal/Reveal";
import PhoneMockup from "../../components/phone/PhoneMockup";
import {bigProjects, contactInfo, educationInfo, skillsSection, workExperiences} from "../../portfolio";

const ROLE = "Full Stack Web Developer";
const TAB = {profile: 0, stack: 1, projects: 2, chat: 3};

// "August 2017 - May 2021" -> "2017–2021"
const years = duration => {
  const found = String(duration || "").match(/\d{4}/g);
  return found && found.length ? `${found[0]}–${found[found.length - 1]}` : "";
};

// "National Aluminium Company Limited (NALCO) , Damanjodi" -> "NALCO"
const shortCompany = company => {
  const acronym = String(company || "").match(/\(([A-Z]{2,})\)/);
  return acronym ? acronym[1] : String(company || "").split(",")[0].trim();
};

/** Builds the config entries from portfolio.js; each maps to a phone screen. */
function buildEntries() {
  const [bootcamp, degree] = educationInfo.schools;
  const job = workExperiences.experience[0];
  return [
    {key: "role", value: {type: "string", text: ROLE}, tab: TAB.profile},
    {
      key: "stack",
      value: {type: "array", items: skillsSection.softwareSkills.map(s => s.skillName)},
      tab: TAB.stack,
    },
    {
      key: "shipped",
      value: {type: "number", text: String(bigProjects.projects.length)},
      comment: "projects",
      tab: TAB.projects,
    },
    bootcamp && {
      key: "trained",
      value: {type: "string", text: bootcamp.subHeader.trim()},
      comment: bootcamp.schoolName,
      tab: TAB.profile,
    },
    degree && {
      key: "degree",
      value: {type: "string", text: degree.subHeader.trim()},
      comment: years(degree.duration),
      tab: TAB.profile,
    },
    job && {
      key: "internship",
      value: {type: "string", text: job.role},
      comment: shortCompany(job.company),
      tab: TAB.profile,
    },
    contactInfo.email_address && {
      key: "contact",
      value: {type: "string", text: contactInfo.email_address},
      tab: TAB.chat,
    },
  ].filter(Boolean);
}

const ENTRIES = buildEntries();

function Value({value}) {
  if (value.type === "number") return <span className="tok-num">{value.text}</span>;
  if (value.type === "array") {
    return (
      <>
        <span className="tok-punc">[</span>
        {value.items.map((item, i) => (
          <React.Fragment key={item}>
            <span className="tok-str">"{item}"</span>
            {i < value.items.length - 1 ? <span className="tok-punc">, </span> : null}
          </React.Fragment>
        ))}
        <span className="tok-punc">]</span>
      </>
    );
  }
  return <span className="tok-str">"{value.text}"</span>;
}

/**
 * "At a glance": key facts as a code-editor card, paired with the interactive
 * phone. Hovering or tapping a line switches the phone to the matching screen.
 */
export default function AppShowcase() {
  const [tab, setTab] = useState(TAB.profile);
  const [activeKey, setActiveKey] = useState("role");
  const hoverTimer = useRef(0);
  const phoneRef = useRef(null);

  useEffect(() => () => clearTimeout(hoverTimer.current), []);

  const activate = (entry, {scrollPhone = false} = {}) => {
    setActiveKey(entry.key);
    setTab(entry.tab);
    // On stacked layouts the phone can be off-screen; bring it into view.
    if (scrollPhone && phoneRef.current) {
      const r = phoneRef.current.getBoundingClientRect();
      if (r.top < 0 || r.bottom > window.innerHeight) {
        phoneRef.current.scrollIntoView({behavior: "smooth", block: "center"});
      }
    }
  };

  // Hover switches after a short pause so sweeping the mouse across lines doesn't flicker.
  const onHover = entry => {
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => activate(entry), 140);
  };
  const stacked = () => window.matchMedia("(max-width: 900px)").matches;

  const lines = 1 + ENTRIES.length + 1;

  return (
    <section className="section" id="app">
      <div className="container showcase">
        <div className="showcase-copy">
          <SectionHeader index="01" label="at a glance" title="Full stack, end to end." />

          <Reveal variant="blur" className="editor" style={{"--lines": lines}}>
            <div className="editor-bar">
              <span className="editor-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="editor-tab mono">
                <i className="fas fa-code" aria-hidden="true"></i> arpit.config.ts
              </span>
              <span className="editor-lang mono">TypeScript</span>
            </div>

            <div className="editor-body mono" onMouseLeave={() => clearTimeout(hoverTimer.current)}>
              <div className="editor-line" style={{"--n": 0}}>
                <span className="editor-ln">1</span>
                <code>
                  <span className="tok-kw">export const</span> <span className="tok-var">arpit</span>{" "}
                  <span className="tok-punc">= {"{"}</span>
                </code>
              </div>

              {ENTRIES.map((entry, i) => (
                <button
                  key={entry.key}
                  type="button"
                  className={`editor-line editor-entry ${activeKey === entry.key ? "is-active" : ""}`}
                  style={{"--n": i + 1}}
                  onMouseEnter={() => onHover(entry)}
                  onFocus={() => activate(entry)}
                  onClick={() => activate(entry, {scrollPhone: stacked()})}
                  aria-pressed={activeKey === entry.key}
                  data-cursor="Show"
                >
                  <span className="editor-ln">{i + 2}</span>
                  <code className="editor-indent">
                    <span className="tok-key">{entry.key}</span>
                    <span className="tok-punc">: </span>
                    <Value value={entry.value} />
                    <span className="tok-punc">,</span>
                    {entry.comment ? <span className="tok-comment">{` // ${entry.comment}`}</span> : null}
                    {activeKey === entry.key ? <span className="editor-caret" aria-hidden="true" /> : null}
                  </code>
                </button>
              ))}

              <div className="editor-line" style={{"--n": ENTRIES.length + 1}}>
                <span className="editor-ln">{ENTRIES.length + 2}</span>
                <code>
                  <span className="tok-punc">{"};"}</span>
                </code>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={150} className="showcase-visual">
          <div className="phone-stage" data-tilt ref={phoneRef}>
            <div className="phone-float">
              <div className="phone-tilt">
                <PhoneMockup
                  tab={tab}
                  onTabChange={i => {
                    setTab(i);
                    const match = ENTRIES.find(entry => entry.tab === i);
                    if (match) setActiveKey(match.key);
                  }}
                />
              </div>
            </div>
          </div>
          <p className="showcase-caption mono">
            <span className="showcase-caption-dot" aria-hidden="true" />
            ↳ interactive · try it
          </p>
        </Reveal>
      </div>
    </section>
  );
}
