import React, { useContext } from "react";
// import Headroom from "react-headroom";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import StyleContext from "../../contexts/StyleContext";
import {
  greeting,
  workExperiences,
  skillsSection,
  openSource,
  blogSection,
  talkSection,
  achievementSection,
  bigProjects,
  educationInfo,
} from "../../portfolio";

function Header() {
  const { isDark } = useContext(StyleContext);
  const viewGreeting = greeting.displayGreeting;
  const viewExperience = workExperiences.display;
  const viewOpenSource = openSource.display;
  const viewSkills = skillsSection.display;
  const viewAchievement = achievementSection.display;
  const viewBlog = blogSection.display;
  const viewTalks = talkSection.display;
  const viewProjects = bigProjects.display;
  const viewEducation = educationInfo.display;

  return (
    <>
      <header className={isDark ? "dark-menu header" : "header"}>
        <a href="/" className="logo">
          <span className="grey-color"> &lt;</span>
          <span className="logo-name">{greeting.username}</span>
          <span className="grey-color">/&gt;</span>
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label
          className="menu-icon"
          htmlFor="menu-btn"
          style={{ color: "white" }}
        >
          <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
        </label>
        <ul className={isDark ? "dark-menu menu" : "menu"}>
          <li>
            <a href="https://drive.google.com/u/0/uc?id=1CTVIrO6Zrdu-FQJbVob93QevwWAP6l0U&export=download">Resume</a>
          </li>
          {viewGreeting && (
            <li>
              <a href="#greeting">About</a>
            </li>
          )}
          {viewSkills && (
            <li>
              <a href="#skills">Skills</a>
            </li>
          )}

          {viewEducation && (
            <li>
              <a href="#education">Education</a>
            </li>
          )}

          {/* {viewExperience && (
            <li>
              <a href="#experience">Work Experiences</a>
            </li>
          )} */}
          {viewProjects && (
            <li>
              <a href="#projects">Projects</a>
            </li>
          )}

          {viewAchievement && (
            <li>
              <a href="#achievements">Achievements</a>
            </li>
          )}
          {viewBlog && (
            <li>
              <a href="#blogs">Blogs</a>
            </li>
          )}
          {viewTalks && (
            <li>
              <a href="#talks">Talks</a>
            </li>
          )}
          <li>
            <a href="#contact">Contact Me</a>
          </li>
          <li>
            <a href="#">
              <ToggleSwitch />
            </a>
          </li>
        </ul>
      </header>
    </>
  );
}
export default Header;
