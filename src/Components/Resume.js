

const Resume = ({ data }) => {
  if (!data) return null; // Handle case when `data` is undefined or null

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

  // Process work data
  const work = data.work.map((work) => (
    <div className="work-wrapper" key={work.company}>
      <h3>{work.company}</h3>
      <p className="info">
        {work.title}
        <span>&bull;</span> <em className="date">{work.years}</em>
      </p>
      {work.description.map((desc, i) => (
        <p className="desc" key={i}>
          <span>&bull;</span> {desc}
        </p>
      ))}
    </div>
  ));



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

        <div className="nine columns main-col">{work}</div>
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
