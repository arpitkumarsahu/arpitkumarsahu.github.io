import React from "react";
import "./Contact.css";
import Reveal from "../../components/reveal/Reveal";
import SplitText from "../../components/reveal/SplitText";
import {contactInfo, socialMediaLinks} from "../../portfolio";

// "https://github.com/arpitkumarsahu/" -> "github.com/arpitkumarsahu"
const prettyUrl = url => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export default function Contact() {
  const rows = [
    contactInfo.email_address && {
      label: "email",
      value: contactInfo.email_address,
      href: `mailto:${contactInfo.email_address}`,
      icon: "fas fa-envelope",
    },
    contactInfo.number && {
      label: "phone",
      value: contactInfo.number,
      href: `tel:${contactInfo.number}`,
      icon: "fas fa-phone",
    },
    socialMediaLinks.github && {
      label: "github",
      value: prettyUrl(socialMediaLinks.github),
      href: socialMediaLinks.github,
      icon: "fab fa-github",
      external: true,
    },
    socialMediaLinks.linkedin && {
      label: "linkedin",
      value: prettyUrl(socialMediaLinks.linkedin),
      href: socialMediaLinks.linkedin,
      icon: "fab fa-linkedin-in",
      external: true,
    },
    socialMediaLinks.twitter && {
      label: "twitter",
      value: prettyUrl(socialMediaLinks.twitter),
      href: socialMediaLinks.twitter,
      icon: "fab fa-twitter",
      external: true,
    },
  ].filter(Boolean);

  return (
    <section className="section" id="contact">
      <div className="container">
        <Reveal className="card contact-card" variant="blur">
          <div className="contact-copy">
            <span className="eyebrow">06 / contact</span>
            <h2 className="contact-title">
              <SplitText text={contactInfo.title} startDelay={150} />
            </h2>
            <p className="contact-subtitle">{contactInfo.subtitle}</p>
            {contactInfo.email_address ? (
              <a className="btn btn-primary contact-cta" href={`mailto:${contactInfo.email_address}`} data-magnetic>
                Say hello <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </a>
            ) : null}
          </div>

          <ul className="contact-list">
            {rows.map((row, i) => (
              <Reveal as="li" key={row.label} variant="right" delay={200 + i * 90}>
                <a
                  className="contact-row"
                  href={row.href}
                  {...(row.external ? {target: "_blank", rel: "noopener noreferrer"} : {})}
                >
                  <span className="contact-row-icon">
                    <i className={row.icon} aria-hidden="true"></i>
                  </span>
                  <span className="contact-row-text">
                    <span className="contact-row-label mono">{row.label}</span>
                    <span className="contact-row-value">{row.value}</span>
                  </span>
                  <i className="fas fa-arrow-right contact-row-arrow" aria-hidden="true"></i>
                </a>
              </Reveal>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
