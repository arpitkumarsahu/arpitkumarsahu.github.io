import React from "react";
import Reveal from "../reveal/Reveal";
import SplitText from "../reveal/SplitText";

export default function SectionHeader({index, label, title, subtitle}) {
  return (
    <Reveal className="section-header" variant="none">
      <span className="eyebrow section-eyebrow">
        {index} / {label}
      </span>
      <h2 className="section-title">
        <SplitText text={title} startDelay={120} />
      </h2>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </Reveal>
  );
}
