import React from "react";
import "./Skills.css";
import SoftwareSkill from "../../components/softwareSkills/SoftwareSkill";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
import Reveal from "../../components/reveal/Reveal";
import {skillsSection} from "../../portfolio";

// The bullet text in portfolio.js starts with a "⚡" marker; the cards number themselves instead.
const stripMarker = text => text.replace(/^\s*⚡\s*/u, "");

export default function Skills() {
  if (!skillsSection.display) {
    return null;
  }
  const [first, ...rest] = skillsSection.skills;

  return (
    <section className="section" id="skills">
      <div className="container">
        <SectionHeader index="02" label="skills" title={skillsSection.title} />

        <div className="bento">
          <Reveal className="card bento-stack spotlight" variant="blur">
            <div className="bento-label mono">tech stack</div>
            <p className="bento-tagline">{skillsSection.subTitle.toLowerCase()}</p>
            <SoftwareSkill />
          </Reveal>

          {first ? <SkillCard index={0} text={first} delay={80} /> : null}

          {rest.map((text, i) => (
            <SkillCard key={i} index={i + 1} text={text} delay={80 * (i + 1)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({index, text, delay}) {
  return (
    <Reveal className="card bento-skill spotlight pressable" variant="blur" delay={delay}>
      <span className="bento-index mono">{String(index + 1).padStart(2, "0")}</span>
      <p>{stripMarker(text)}</p>
    </Reveal>
  );
}
