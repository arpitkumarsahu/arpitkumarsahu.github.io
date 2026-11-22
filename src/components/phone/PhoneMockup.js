import React, {useEffect, useRef, useState} from "react";
import "./PhoneMockup.css";
import useCountUp from "../../hooks/useCountUp";
import {openResume} from "../../utils/resume";
import {requestOpenProject} from "../../utils/events";
import {appIconStyle} from "../../utils/appColors";
import {parseTech} from "../../containers/StartupProjects/projectUtils";
import {
  greeting,
  contactInfo,
  bigProjects,
  skillsSection,
  educationInfo,
  socialMediaLinks,
} from "../../portfolio";
import avatar from "../../assets/images/Arpit.jpg";

const ROLE = "Full Stack Web Developer";

const TABS = [
  {id: "profile", label: "Profile", icon: "fas fa-user"},
  {id: "stack", label: "Stack", icon: "fas fa-th-large"},
  {id: "projects", label: "Projects", icon: "fas fa-folder"},
  {id: "chat", label: "Chat", icon: "fas fa-comment-dots"},
];

const DOCK = [
  {key: "github", icon: "fab fa-github", label: "GitHub", bg: "#24292f"},
  {key: "linkedin", icon: "fab fa-linkedin-in", label: "LinkedIn", bg: "#0a66c2"},
  {key: "gmail", icon: "fas fa-envelope", label: "Mail", bg: "#ea4335", href: v => `mailto:${v}`},
  {key: "twitter", icon: "fab fa-twitter", label: "Twitter", bg: "#1d9bf0"},
].filter(item => socialMediaLinks[item.key]);

function formatTime(date) {
  return date.toLocaleTimeString([], {hour: "numeric", minute: "2-digit"}).replace(/\s?[AP]M$/i, "");
}

function Stat({value, label}) {
  return (
    <div className="app-stat">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

/* ---------------------------------------------------------------- Screens */

function ProfileScreen({booted, onMessage}) {
  const projects = useCountUp(bigProjects.projects.length, booted);
  const skills = useCountUp(skillsSection.softwareSkills.length, booted);
  const schools = useCountUp(educationInfo.schools.length, booted);
  const featured = bigProjects.projects[0];

  return (
    <div className={`app-screen app-profile-screen ${booted ? "is-booted" : ""}`}>
      <div className="app-profile">
        <div className="app-avatar">
          <img src={avatar} alt="" />
          <span className="app-online" aria-hidden="true" />
        </div>
        <h3>{greeting.username}</h3>
        <p>{ROLE}</p>
      </div>

      <div className="app-stats">
        <Stat value={projects} label="Projects" />
        <Stat value={skills} label="Skills" />
        <Stat value={schools} label="Schools" />
      </div>

      <div className="app-actions">
        <button type="button" className="app-btn app-btn-primary" onClick={openResume}>
          <i className="fas fa-file-alt" aria-hidden="true"></i> Resume
        </button>
        <button type="button" className="app-btn" onClick={onMessage}>
          <i className="fas fa-comment-dots" aria-hidden="true"></i> Message
        </button>
      </div>

      {featured ? (
        <div>
          <div className="app-label">Featured</div>
          <button
            type="button"
            className="app-row"
            onClick={e => requestOpenProject(0, e.currentTarget.querySelector("img"))}
            data-cursor="Open"
          >
            <img src={featured.image} alt="" />
            <span className="app-row-text">
              <strong>{featured.projectName}</strong>
              <span>Tap to preview</span>
            </span>
            <i className="fas fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
      ) : null}
    </div>
  );
}

function StackScreen({active}) {
  return (
    <div className={`app-screen app-home ${active ? "is-active" : ""}`}>
      <div className="app-home-label mono">tech stack</div>
      <ul className="app-home-grid">
        {skillsSection.softwareSkills.map((skill, i) => (
          <li key={skill.skillName} className="app-home-icon" style={{...appIconStyle(skill.skillName), "--i": i}}>
            <span className="app-icon-tile">
              <i className={skill.fontAwesomeClassname} aria-hidden="true"></i>
            </span>
            <span className="app-home-name">{skill.skillName}</span>
          </li>
        ))}
      </ul>
      {DOCK.length ? (
        <div className="app-dock">
          {DOCK.map(item => (
            <a
              key={item.key}
              className="app-dock-icon"
              href={item.href ? item.href(socialMediaLinks[item.key]) : socialMediaLinks[item.key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              style={{"--dock-bg": item.bg}}
            >
              <i className={item.icon} aria-hidden="true"></i>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ProjectsScreen() {
  return (
    <div className="app-screen app-list-screen">
      <h4 className="app-large-title">Projects</h4>
      <ul className="app-list">
        {bigProjects.projects.map((project, i) => (
          <li key={project.projectName}>
            <button
              type="button"
              className="app-row"
              onClick={e => requestOpenProject(i, e.currentTarget.querySelector("img"))}
              data-cursor="Open"
            >
              <img src={project.image} alt="" loading="lazy" />
              <span className="app-row-text">
                <strong>{project.projectName}</strong>
                <span>{parseTech(project.tech).slice(0, 3).join(" · ")}</span>
              </span>
              <i className="fas fa-chevron-right" aria-hidden="true"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChatScreen({active}) {
  // Show a typing indicator first, then the messages, each time the chat opens.
  const [typing, setTyping] = useState(true);
  useEffect(() => {
    if (!active) return undefined;
    setTyping(true);
    const timer = setTimeout(() => setTyping(false), 1100);
    return () => clearTimeout(timer);
  }, [active]);

  const replies = [
    contactInfo.email_address && {label: "Email", icon: "fas fa-envelope", href: `mailto:${contactInfo.email_address}`},
    contactInfo.number && {label: "Call", icon: "fas fa-phone", href: `tel:${contactInfo.number}`},
    socialMediaLinks.linkedin && {label: "LinkedIn", icon: "fab fa-linkedin-in", href: socialMediaLinks.linkedin},
  ].filter(Boolean);

  return (
    <div className="app-screen app-chat">
      <div className="app-chat-head">
        <img src={avatar} alt="" />
        <span>
          <strong>{greeting.username.split(" ")[0]}</strong>
          <em>{typing && active ? "typing…" : "online"}</em>
        </span>
      </div>
      <div className="app-chat-body">
        {typing ? (
          <div className="bubble bubble-in bubble-typing" aria-label="typing">
            <span />
            <span />
            <span />
          </div>
        ) : (
          <>
            <div className="bubble bubble-in">{contactInfo.subtitle}</div>
            {contactInfo.email_address ? (
              <div className="bubble bubble-in" style={{"--d": "0.25s"}}>
                {contactInfo.email_address}
              </div>
            ) : null}
          </>
        )}
      </div>
      <div className="app-chat-replies">
        {replies.map(reply => (
          <a
            key={reply.label}
            className="app-chip"
            href={reply.href}
            target={reply.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            <i className={reply.icon} aria-hidden="true"></i> {reply.label}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Phone */

export const PHONE_TABS = TABS;

/**
 * A phone running a small "profile app" built from portfolio.js. The tab bar
 * switches between real screens; buttons, links and the notification all work.
 * Pass `tab` + `onTabChange` to control the screen from outside; the boot
 * animation and demo notification start the first time the phone is in view.
 */
export default function PhoneMockup({tab: controlledTab, onTabChange}) {
  const rootRef = useRef(null);
  const [now, setNow] = useState(() => new Date());
  const [inView, setInView] = useState(false);
  const [booted, setBooted] = useState(false);
  const [notify, setNotify] = useState(false);
  const [innerTab, setInnerTab] = useState(0);
  const tab = controlledTab ?? innerTab;
  // Once the visitor has used the phone, the demo notification stays away.
  const interacted = useRef(false);

  const setTab = i => {
    if (onTabChange) onTabChange(i);
    else setInnerTab(i);
  };

  useEffect(() => {
    const clock = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(clock);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      {threshold: 0.35}
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return undefined;
    const boot = setTimeout(() => setBooted(true), 400);
    const show = setTimeout(() => !interacted.current && setNotify(true), 1900);
    const hide = setTimeout(() => setNotify(false), 6400);
    return () => [boot, show, hide].forEach(clearTimeout);
  }, [inView]);

  // Switching screens from outside also counts as using the phone.
  useEffect(() => {
    if (controlledTab !== undefined && controlledTab !== 0) {
      interacted.current = true;
      setNotify(false);
    }
  }, [controlledTab]);

  const dismissNotification = () => {
    interacted.current = true;
    setNotify(false);
  };

  const openChat = () => {
    dismissNotification();
    setTab(3);
  };

  const screens = [
    <ProfileScreen booted={booted} onMessage={openChat} />,
    <StackScreen active={tab === 1} />,
    <ProjectsScreen />,
    <ChatScreen active={tab === 3} />,
  ];

  return (
    <div className="phone" ref={rootRef} role="group" aria-label={`${greeting.username}'s profile, shown as a phone app`}>
      <span className="phone-btn phone-btn-action" aria-hidden="true" />
      <span className="phone-btn phone-btn-vol-up" aria-hidden="true" />
      <span className="phone-btn phone-btn-vol-down" aria-hidden="true" />
      <span className="phone-btn phone-btn-power" aria-hidden="true" />

      <div className="phone-screen">
        <div className="phone-island" aria-hidden="true" />
        <div className="phone-status" aria-hidden="true">
          <span className="phone-time">{formatTime(now)}</span>
          <span className="phone-status-icons">
            <i className="fas fa-signal" />
            <i className="fas fa-wifi" />
            <span className="phone-battery">
              <span />
            </span>
          </span>
        </div>

        <button
          type="button"
          className={`phone-notification ${notify ? "is-shown" : ""}`}
          onClick={openChat}
          tabIndex={notify ? 0 : -1}
          data-cursor="Reply"
        >
          <span className="phone-notification-icon">
            <i className="fas fa-envelope" aria-hidden="true"></i>
          </span>
          <span className="phone-notification-body">
            <span className="phone-notification-head">
              <strong>Inbox</strong>
              <em>now</em>
            </span>
            <span className="phone-notification-text">{contactInfo.subtitle}</span>
          </span>
        </button>

        <div className="app-viewport" style={{"--tab": tab}}>
          {screens.map((screen, i) => (
            <div
              key={TABS[i].id}
              className={`app-pane ${i === tab ? "is-current" : ""}`}
              style={{"--pane": i}}
              aria-hidden={i !== tab}
              {...(i !== tab ? {inert: ""} : {})}
            >
              {screen}
            </div>
          ))}
        </div>

        <div className="phone-tabbar" role="tablist" aria-label="App screens">
          <span className="phone-tab-indicator" style={{"--tab": tab}} aria-hidden="true" />
          {TABS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === tab}
              className={`phone-tab ${i === tab ? "is-active" : ""}`}
              onClick={() => {
                dismissNotification();
                setTab(i);
              }}
            >
              <i className={t.icon} aria-hidden="true"></i>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
        <div className="phone-home" aria-hidden="true" />
      </div>
    </div>
  );
}
