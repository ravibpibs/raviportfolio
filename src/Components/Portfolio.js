
import React, { useRef, useEffect } from 'react';
import './Portfolio.css';

const Portfolio = ({ data }) => {
  let projects = null;
  if (data && data.projects) {
    projects = data.projects.map(function (project) {
      const projectImage = 'images/portfolio/' + project.image;
      return (
        <div key={project.title} className="portfolio-card">
          <a href={project.url} target="_blank" rel="noreferrer" title={project.title}>
            <div className="card-media">
              <img alt={project.title} src={projectImage} />
            </div>
          </a>
          <div className="card-body">
            <h5 className="card-title">{project.title}</h5>
            <p className="card-desc">{project.description}</p>
            <p className="card-skills"><strong>Skills:</strong> {project.skills.join(', ')}</p>
          </div>
        </div>
      );
    });
  }

  // Horizontal auto-scroller that pauses on hover
  const PortfolioScroller = ({ children }) => {
    const ref = useRef(null);
    const rafRef = useRef(null);
    const paused = useRef(false);
    const speed = 1.4; // pixels per frame reference

    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      let last = performance.now();

      const tick = (now) => {
        if (!paused.current) {
          const dt = now - last;
          const px = (speed * dt) / 16;
          el.scrollLeft += px;
          if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) {
            el.scrollLeft = 0;
          }
        }
        last = now;
        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafRef.current);
    }, []);


    const scrollByCard = (dir = 1) => {
      const el = ref.current;
      if (!el) return;
      let card = el.querySelector('.portfolio-card');
      if (!card) {
        const track = el.querySelector('.portfolio-track') || document.querySelector('.portfolio-track');
        card = track ? track.querySelector('.portfolio-card') : null;
      }
      const gap = 22; // must match .portfolio-track gap
      const distance = card ? Math.round(card.getBoundingClientRect().width) + gap : Math.round(el.clientWidth * 0.8);
      el.scrollBy({ left: distance * dir, behavior: 'smooth' });
    };

    const handleScrollLeft = (e) => {
      e.stopPropagation();
      e.preventDefault();
      // debug log
      // eslint-disable-next-line no-console
      console.log('Portfolio: scroll left');
      scrollByCard(-1);
    };

    const handleScrollRight = (e) => {
      e.stopPropagation();
      e.preventDefault();
      // debug log
      // eslint-disable-next-line no-console
      console.log('Portfolio: scroll right');
      scrollByCard(1);
    };

    return (
      <div className="portfolio-scroller-wrap">
        <button className="scroller-btn scroller-left" onClick={handleScrollLeft} aria-label="Scroll left">‹</button>
        <div
          className="portfolio-scroller"
          ref={ref}
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          <div className="portfolio-track">{children}</div>
        </div>
        <button className="scroller-btn scroller-right" onClick={handleScrollRight} aria-label="Scroll right">›</button>
      </div>
    );
  };

  return (
    <section id="portfolio">
      <div className="row">
        <div className="twelve columns collapsed">
          <h1>Client Projects I've Worked On</h1>

          {projects ? (
            <PortfolioScroller>{projects}</PortfolioScroller>
          ) : (
            <p>No projects to display.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
