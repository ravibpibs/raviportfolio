import React from 'react';
import './About.css';

const About = ({ data }) => {
  const name = data?.name || 'Your Name';
  const profilepic = data?.image ? `images/${data.image}` : 'images/profile-placeholder.png';
  const bio = data?.bio || '';
  const phone = data?.phone || '';
  const email = data?.email || '';
  const resumeDownload = data?.resumedownload || '#';

  return (
    <section id="about" className="about-section">
      <div className="about-inner">
        <div className="about-left">
          <div className="profile-frame">
            <img className="profile-pic" src={profilepic} alt={`${name} profile`} />
          </div>
        </div>

        <div className="about-right">
          <h2>About Me</h2>
          <p className="about-bio">{bio}</p>

          <div className="about-cta">
            <div className="contact">
              <h4>Contact</h4>
              <p className="address">
                <strong>{name}</strong>
                <br />
                {phone && <span>{phone}<br /></span>}
                {email && (
                  <span>
                    <a href={`mailto:${email}`}>{email}</a>
                  </span>
                )}
              </p>
            </div>

            <div className="actions">
              <a href={resumeDownload} target="_blank" rel="noopener noreferrer" className="button primary">
                <i className="fa fa-download" /> Download Resume
              </a>
              <a href="#contact" className="button outline">
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
