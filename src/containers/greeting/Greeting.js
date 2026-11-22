import React from "react";
import "./Greeting.css";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import Reveal from "../../components/reveal/Reveal";
import SplitText from "../../components/reveal/SplitText";
import {greeting, openSource} from "../../portfolio";
import {openResume} from "../../utils/resume";
import portrait from "../../assets/images/Arpit-hero.jpg";
import avatar from "../../assets/images/Arpit.jpg";

const ROLE = "Full Stack Web Developer";

export default function Greeting() {
  if (!greeting.displayGreeting) {
    return null;
  }

  return (
    <section className="hero" id="greeting">
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          {/* Phones: a native-app style profile header instead of a big photo card. */}
          <Reveal variant="blur" className="hero-profile">
            <span className="hero-profile-photo">
              <img src={avatar} alt={greeting.username} width="480" height="480" />
              <span className="hero-profile-status" aria-hidden="true" />
            </span>
            <span className="hero-profile-text">
              <strong>{greeting.username}</strong>
              <span>{ROLE}</span>
              {openSource.githubUserName ? (
                <em className="mono">@{openSource.githubUserName}</em>
              ) : null}
            </span>
          </Reveal>

          <Reveal variant="blur" className="hero-eyebrow-wrap">
            <span className="hero-eyebrow">
              <span className="hero-dot" aria-hidden="true" />
              {greeting.username}
            </span>
          </Reveal>
          <Reveal as="h1" variant="none" className="hero-title" delay={120}>
            <SplitText text={greeting.title} step={90} />
            <span className="split-word" aria-hidden="true">
              <span className="split-word-inner hero-title-accent" style={{"--word-delay": "420ms"}}>
                .
              </span>
            </span>
          </Reveal>
          <Reveal variant="blur" delay={420}>
            <p className="hero-sub">{greeting.subTitle}</p>
          </Reveal>
          <Reveal variant="blur" delay={540} className="hero-actions">
            <a className="btn btn-primary" href="#contact" data-magnetic>
              Contact me <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </a>
            <button type="button" className="btn btn-ghost" onClick={openResume} data-magnetic>
              <i className="fas fa-download" aria-hidden="true"></i> See my resume
            </button>
          </Reveal>
          <Reveal variant="blur" delay={660}>
            <SocialMedia />
          </Reveal>
        </div>

        {/* Desktop: a large portrait whose dark backdrop fades into the page.
            Nothing is layered on top of it. */}
        <Reveal variant="blur" delay={200} className="hero-portrait">
          <img src={portrait} alt="" width="800" height="1000" />
        </Reveal>
      </div>

      <a className="scroll-cue" href="#app" aria-label="Scroll to the app">
        <span />
      </a>
    </section>
  );
}
