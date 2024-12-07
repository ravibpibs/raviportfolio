import React from "react";
import ReactApexChart from "react-apexcharts";

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

  // Prepare data for ReactApexChart
  const options = {
    chart: {
      type: "bar",
      height: 400,
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: false, // Disable gridlines completely
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        const index = opts.dataPointIndex;
        return data.skills[index].level; // Show percentage value
      },
      style: {
        fontSize: "14px",
        colors: ["#333"],
      },
    },
    xaxis: {
      categories: data.skills.map((skill) => skill.name),
      labels: {
        style: {
          fontSize: "12px",
        },
      },
      
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val, opts) {
          return `${data.skills[opts.dataPointIndex].level}`;
        },
      },
    },
    fill: {
      colors: ["#1E90FF"],
    },
    yaxis: {
      max: 100, // Explicitly set the maximum to 100
    },
  };

  const series = [
    {
      name: "Skill Level",
      data: data.skills.map((skill) =>
        parseInt(skill.level.replace("%", ""), 10)
      ), // Convert percentage string to number
    },
  ];

  // Skills Component
  const Skills = () => (
    <div>
      <ReactApexChart options={options} series={series} type="bar" height={400} />
    </div>
  );

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

      <div className="row skill">
        <div className="three columns header-col">
          <h1>
            <span>Skills</span>
          </h1>
        </div>

        <div className="nine columns main-col">
          <p>{data.skillmessage}</p>

          <div className="bars">
            <Skills />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
