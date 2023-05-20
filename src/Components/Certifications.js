import React from "react";

const Certifications = ({ data }) => {
    if (data) {
        var projects = data.projects.map(function (projects) {
            var projectImage = "images/certificate/" + projects.image;
            return (
                <div key={projects.title} className="columns portfolio-item">
                    <div className="item-wrap">
                        <a href={projects.url} title={projects.title}>
                            <img alt={projects.title} src={projectImage} />
                            <div className="overlay">
                                <div className="portfolio-item-meta">
                                    <h5>{projects.title}</h5>
                                    <p>{projects.category}</p>
                                </div>
                            </div>
                            <div className="link-icon">
                                <i className="fa fa-link"></i>
                            </div>
                        </a>
                    </div>
                </div>
            );
        });
    }

    return (
        <section id="certificate">
            <div className="row">
                <div className="twelve columns collapsed">
                    <h1>COMPLETED THESES COURSE BY COURSERA AND UDEMY</h1>

                    <div
                        id="certificate-wrapper"
                        className="bgrid-quarters s-bgrid-thirds cf"
                    >
                        {projects}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Certifications;
