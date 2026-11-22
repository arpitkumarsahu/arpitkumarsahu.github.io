import React from "react";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
import Timeline from "../../components/timeline/Timeline";
import {workExperiences} from "../../portfolio";

export default function WorkExperience() {
  if (!workExperiences.display) {
    return null;
  }
  const items = workExperiences.experience.map(job => ({
    logo: job.companylogo,
    title: job.role,
    subtitle: job.company,
    date: job.date,
    desc: job.desc,
    bullets: job.descBullets,
  }));

  return (
    <section className="section" id="experience">
      <div className="container narrow">
        <SectionHeader index="04" label="experience" title="Experiences" />
        <Timeline items={items} />
      </div>
    </section>
  );
}
