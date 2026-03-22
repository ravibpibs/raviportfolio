
import React from 'react';
import './ResumeTimeline.css';

const Resume = ({ data }) => {
  if (!data) return null;

  // Process education data
  const education = data.education.map((education) => (
    <div key={education.school}>
      <h3>{education.school}</h3>
      <p className="info">
        {education.degree} <span>&bull;</span>
        <em className="date">{education.graduated}</em>
      </p>
      <p className="info">{education.description}</p>
    </div>
  ));

  // Timeline-style work items
  const workTimeline = (
    <div className="timeline">
      {data.work.map((w, idx) => (
        <div className="timeline-item" key={`${w.company}-${idx}`}>
          <div className="timeline-marker">
            <span className="marker-circle" />
            <div className="marker-line" />
            <div className="marker-date">{w.years}</div>
          </div>
          <div className="timeline-content">
            <div className="timeline-card">
              <div className="card-header">
                <h3 className="company">{w.company}</h3>
                <div className="title-meta">
                  <span className="title">{w.title}</span>
                </div>
              </div>
              <div className="card-body">
                <ul>
                  {w.description.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );



  const Skills = ({ skills }) => {
    return (
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            <img
              src={skill?.img}
              alt={skill.name}
              className="skill-icon"
            />
            <h4>{skill.name}</h4>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="resume">
      <div className="row education">
        <div className="three columns header-col">
          <h1>
            <span>Education</span>
          </h1>
        </div>

        <div className="nine columns main-col">
          <div className="row item">
            <div className="twelve columns">{education}</div>
          </div>
        </div>
      </div>

      <div className="row work">
        <div className="three columns header-col">
          <h1>
            <span>Work Experience</span>
          </h1>
        </div>

        <div className="nine columns main-col">{workTimeline}</div>
      </div>
      <div className="row skill" id="skills">
        <div className="three columns header-col">
          <h1>
            <span>Skills</span>
          </h1>
        </div>

        <div className="nine columns main-col">
          <p>{data.skillmessage}</p>
          <Skills skills={data.skills} />
        </div>
      </div>
    </section>
  );
};

export default Resume;
