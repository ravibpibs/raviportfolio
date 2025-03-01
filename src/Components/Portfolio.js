


const Portfolio = ({ data }) => {
  if (data) {
    var projects = data.projects.map(function (projects) {
      var projectImage = "images/portfolio/" + projects.image;
      return (
        <div key={projects.title} className="columns portfolio-item">
          <a href={projects.url} target="blank" title={projects.title}>
            <div className="item-wrap">
              <img
                style={{ height: "140px", objectFit: "fill" }}
                alt={projects.title}
                src={projectImage}
              />
              <div className="overlay">
                <div className="portfolio-item-meta">
                  <h5>{projects.title}</h5>
                </div>
              </div>
            </div>
          </a>
          <div>
            <h5 style={{ height: "70px", marginTop: "5px" }}>{projects.title}</h5>
            <p style={{ height: "250px", overflowY: "auto", scrollbarWidth: "none" }}>
              {projects.description}
            </p>
            <p><strong>Skills used:</strong> {projects.skills.join(', ')}</p>
          </div>
        </div>
      );
    });
  }

  return (
    <section id="portfolio">
      <div className="row">
        <div className="twelve columns collapsed">
          <h1>Client Projects I've Worked On</h1>

          <div
            id="portfolio-wrapper"
            className="bgrid-quarters s-bgrid-thirds cf"
          >
            {projects}
          </div>
        </div>
      </div>


    </section>
  );
};


export default Portfolio;
