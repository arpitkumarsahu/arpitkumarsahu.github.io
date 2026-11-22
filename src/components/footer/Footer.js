import React from "react";
import "./Footer.css";
import {greeting} from "../../portfolio";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>
          © {new Date().getFullYear()} {greeting.username}
        </span>
        <span className="mono footer-meta">built with react · hosted on github pages</span>
      </div>
    </footer>
  );
}
