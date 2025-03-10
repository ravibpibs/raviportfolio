import React from "react";

const About = ({ data }) => {
  if (data) {
    var name = data.name;
    var profilepic = "images/" + data.image;
    var bio = data.bio;
    var phone = data.phone;
    var email = data.email;
    var resumeDownload = data.resumedownload;
  }

  return (
    <section id="about">
      <div className="row">
        <div className="four columns">
          <img
            className="profile-pic"
            src={profilepic}
            alt="Sonny's Profile Pic"
            style={{ width: "100%", height: "430px", objectFit: "fill" }}
          />
        </div>
        <div className="eight columns main-col">
          <h2>About Me</h2>

          <p>{bio}</p>
          <div className="row">
            <div className="columns contact-details">
              <h2>Contact Details</h2>
              <p className="address">
                <span>{name}</span>
                <br />

                <span>{phone}</span>
                <br />
                <span>
                  <a style={{ color: 'inherit', textDecoration: 'none' }} href={`mailto:${email}`}>{email}</a>
                </span>

              </p>
            </div>
            <div className="columns download">
              <p>
                <a href={resumeDownload} target="blank" className="button">
                  <i className="fa fa-download"></i>Download Resume
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
