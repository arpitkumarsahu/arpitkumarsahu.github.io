import React from "react";
import "./SoftwareSkill.css";
import {skillsSection} from "../../portfolio";
import {appIconStyle} from "../../utils/appColors";

export default function SoftwareSkill() {
  return (
    <ul className="app-grid">
      {skillsSection.softwareSkills.map((skill, i) => (
        <li key={skill.skillName} className="app-icon" style={{...appIconStyle(skill.skillName), "--i": i}}>
          <span className="app-icon-tile">
            <i className={skill.fontAwesomeClassname} aria-hidden="true"></i>
          </span>
          <span className="app-icon-label">{skill.skillName}</span>
        </li>
      ))}
    </ul>
  );
}
