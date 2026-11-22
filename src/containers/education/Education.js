import React from "react";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
import Timeline from "../../components/timeline/Timeline";
import {educationInfo} from "../../portfolio";

export default function Education() {
  if (!educationInfo.display) {
    return null;
  }
  const items = educationInfo.schools.map(school => ({
    logo: school.logo,
    title: school.schoolName,
    subtitle: school.subHeader,
    date: school.duration,
    desc: school.desc,
    bullets: school.descBullets,
  }));

  return (
    <section className="section" id="education">
      <div className="container narrow">
        <SectionHeader index="03" label="education" title="Education" />
        <Timeline items={items} />
      </div>
    </section>
  );
}
