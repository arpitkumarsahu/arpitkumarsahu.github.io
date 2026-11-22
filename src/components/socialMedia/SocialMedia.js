import React from "react";
import "./SocialMedia.css";
import {socialMediaLinks} from "../../portfolio";

const NETWORKS = [
  {key: "github", label: "GitHub", icon: "fab fa-github"},
  {key: "linkedin", label: "LinkedIn", icon: "fab fa-linkedin-in"},
  {key: "gmail", label: "Email", icon: "fas fa-envelope", href: v => `mailto:${v}`},
  {key: "gitlab", label: "GitLab", icon: "fab fa-gitlab"},
  {key: "facebook", label: "Facebook", icon: "fab fa-facebook-f"},
  {key: "instagram", label: "Instagram", icon: "fab fa-instagram"},
  {key: "twitter", label: "Twitter", icon: "fab fa-twitter"},
  {key: "medium", label: "Medium", icon: "fab fa-medium"},
  {key: "stackoverflow", label: "Stack Overflow", icon: "fab fa-stack-overflow"},
];

export default function SocialMedia() {
  if (!socialMediaLinks.display) {
    return null;
  }
  return (
    <div className="social-media-div">
      {NETWORKS.filter(n => socialMediaLinks[n.key]).map(n => (
        <a
          key={n.key}
          href={n.href ? n.href(socialMediaLinks[n.key]) : socialMediaLinks[n.key]}
          className="social-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={n.label}
          title={n.label}
        >
          <i className={n.icon} aria-hidden="true"></i>
        </a>
      ))}
    </div>
  );
}
