import React, { useRef, useEffect } from 'react';
import './Certifications.css';

const Certifications = ({ data }) => {
    let items = null;
    if (data && data.projects) {
        items = data.projects.map((p) => {
            const projectImage = 'images/certificate/' + p.image;
            return (
                <div key={p.title} className="cert-card">
                    <a href={p.url} target="_blank" rel="noreferrer" title={p.title}>
                        <div className="cert-media">
                            <img alt={p.title} src={projectImage} />
                            <div className="cert-overlay">
                                <h5 className="cert-title">{p.title}</h5>
                                <p className="cert-category">{p.category}</p>
                            </div>
                        </div>
                    </a>
                </div>
            );
        });
    }

    const CertScroller = ({ children }) => {
        const ref = useRef(null);
        const rafRef = useRef(null);
        const paused = useRef(false);
        const speed = 2;

        useEffect(() => {
            const el = ref.current;
            if (!el) return;
            let last = performance.now();

            const tick = (now) => {
                if (!paused.current) {
                    const dt = now - last;
                    const px = (speed * dt) / 16;
                    el.scrollLeft += px;
                    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 1) el.scrollLeft = 0;
                }
                last = now;
                rafRef.current = requestAnimationFrame(tick);
            };

            rafRef.current = requestAnimationFrame(tick);
            return () => cancelAnimationFrame(rafRef.current);
        }, []);


        return (
            <div className="cert-scroller-wrap">
                <div
                    className="cert-scroller"
                    ref={ref}
                    onMouseEnter={() => (paused.current = true)}
                    onMouseLeave={() => (paused.current = false)}
                >
                    <div className="cert-track">{children}</div>
                </div>
            </div>
        );
    };

    return (
        <section id="certificate">
            <div className="row">
                <div className="twelve columns collapsed">
                    <h1>Certifications from Coursera and Udemy</h1>

                    {items ? (
                        <CertScroller>{items}</CertScroller>
                    ) : (
                        <div>No certifications to show.</div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
