import React, { useRef, useState, useEffect, useCallback } from 'react';
import './Portfolio.css';

const CARD_W = 300;
const CARD_W_ACTIVE = 480;
const GAP = 28;

const PortfolioCard = ({ project, index, isActive, isOpen, onClick, onClose }) => {
  const cardRef = useRef(null);
  const projectImage = 'images/portfolio/' + project.image;

  const handleMouseMove = useCallback(
    (e) => {
      const card = cardRef.current;
      if (!card || isOpen) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) scale(1.02)`;
    },
    [isOpen]
  );

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) cardRef.current.style.transform = '';
  }, []);

  const handleCardClick = (e) => {
    if (e.target.closest('.close-btn') || e.target.closest('.card-link-btn')) return;
    onClick();
  };

  return (
    <div
      ref={cardRef}
      className={`port-card${isActive ? ' active-card' : ''}${isOpen ? ' open' : ''}`}
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick(e)}
      aria-label={`View project: ${project.title}`}
      aria-expanded={isOpen}
    >
      {/* Background image */}
      <div className="card-bg" style={{ backgroundImage: `url(${projectImage})` }} />

      {/* Dark gradient overlay */}
      <div className="card-overlay" />

      {/* Top meta */}
      <span className="card-number">0{index + 1}</span>
      <span className="card-tag">{project.category || 'Project'}</span>

      {/* Title + pills — slides up when drawer opens */}
      <div className="card-static">
        <h3 className="card-title-text">{project.title}</h3>
        <div className="card-pills">
          {project.skills.map((skill) => (
            <span key={skill} className="card-pill">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Drawer — slides up from bottom on open */}
      <div className="cdrawer">
        <div className="drawer-top">
          <span className="drawer-label">About this project</span>
          <button
            className="close-btn"
            aria-label="Close description"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            &#10005;
          </button>
        </div>
        <div className="drawer-scroll">
          <p className="drawer-text">{project.description}</p>
        </div>
        <div className="drawer-fade" />
      </div>

      {/* Hover hint — hidden when drawer open */}
      <span className="read-hint" aria-hidden="true">
        tap to read &#8599;
      </span>

      {/* External link — shows on hover when drawer is closed */}
      {project.url && (
        <a
          className="card-link-btn"
          href={project.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.title}`}
          onClick={(e) => e.stopPropagation()}
        >
          &#8599;
        </a>
      )}
    </div>
  );
};

const Portfolio = ({ data }) => {
  const [current, setCurrent] = useState(0);
  const [openIdx, setOpenIdx] = useState(-1);
  const trackRef = useRef(null);
  const touchStartX = useRef(0);

  const projects = data?.projects ?? [];
  const total = projects.length;

  // Pan the track so the active card is centred
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let offset = 0;
    for (let i = 0; i < current; i++) {
      offset += CARD_W + GAP;
    }
    const wrapW = track.parentElement?.clientWidth ?? 800;
    const activeW = CARD_W_ACTIVE;
    offset = Math.max(0, offset - (wrapW - activeW) / 2);
    track.style.transform = `translateX(-${offset}px)`;
  }, [current, openIdx]);

  const goTo = useCallback(
    (idx) => {
      setOpenIdx(-1);
      setCurrent(((idx % total) + total) % total);
    },
    [total]
  );

  const handleCardClick = useCallback((idx) => {
    setCurrent(idx);
    setOpenIdx((prev) => (prev === idx ? -1 : idx));
  }, []);

  const handleClose = useCallback(() => setOpenIdx(-1), []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
  };

  if (!total) {
    return (
      <section id="portfolio">
        <div className="row">
          <div className="twelve columns">
            <p>No projects to display.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="port-section">
      {/* ── Header ── */}
      <div className="port-header">
        <div>
          <p className="port-eyebrow">Selected work</p>
          <h1 className="port-title">
            Client Projects
            <br />
            I've <em>crafted</em>
          </h1>
        </div>
        <div className="port-header-right">
          <span className="port-count">{String(total).padStart(2, '0')}</span>
          <div className="port-controls">
            <button
              className="port-nav-btn"
              aria-label="Previous project"
              onClick={() => goTo(current - 1)}
            >
              &#8592;
            </button>
            <span className="port-progress">
              {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            <button
              className="port-nav-btn"
              aria-label="Next project"
              onClick={() => goTo(current + 1)}
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>

      {/* ── Scrolling track ── */}
      <div
        className="port-track-wrap"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="scroller-fade-l" aria-hidden="true" />
        <div className="port-track" ref={trackRef}>
          {projects.map((project, i) => (
            <PortfolioCard
              key={project.title}
              project={project}
              index={i}
              isActive={i === current}
              isOpen={i === openIdx}
              onClick={() => handleCardClick(i)}
              onClose={handleClose}
            />
          ))}
        </div>
        <div className="scroller-fade-r" aria-hidden="true" />
      </div>

      {/* ── Dot indicators ── */}
      <div className="port-dots" role="tablist" aria-label="Project navigation">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`port-dot${i === current ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to project ${i + 1}`}
            aria-selected={i === current}
            role="tab"
          />
        ))}
      </div>

      <p className="port-hint">Click any card to read the full description</p>
    </section>
  );
};

export default Portfolio;
