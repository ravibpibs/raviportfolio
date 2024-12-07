import React, { useState } from "react";


const Portfolio = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // state for modal visibility
  const [currentImage, setCurrentImage] = useState(""); // state for current image URL

  const openModal = (image) => {
    setCurrentImage(image); // set the current image to display in the modal
    setIsModalOpen(true); // open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // close the modal
    setCurrentImage(""); // reset the image
  };

  if (data) {
    var projects = data.projects.map(function (projects) {
      var projectImage = "images/portfolio/" + projects.image;
      return (
        <div key={projects.title} className="columns portfolio-item">
          <div style={{ cursor: "pointer" }} onClick={() => openModal(projectImage)} className="item-wrap">
            <img
              style={{ height: "140px", objectFit: "fill" }}
              alt={projects.title}
              src={projectImage}
            // Open modal when image is clicked
            />
            <div className="overlay">
              <div className="portfolio-item-meta">
                <h5>{projects.title}</h5>
              </div>
            </div>
          </div>
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

      {/* Modal */}
      {isModalOpen && (
        <div style={modalStyles.overlay} onClick={closeModal}>
          <div style={modalStyles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={currentImage} alt="Project" style={modalStyles.image} />
            <img onClick={closeModal} style={modalStyles.closeButton} src="images/remove.jpg" alt="remove" />
          </div>
        </div>
      )}
    </section>
  );
};

// Styles for modal
const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    position: "relative",
    backgroundColor: "#fff",
    padding: "20px",
    maxWidth: "90%",
    maxHeight: "90%",
    overflow: "auto",
    borderRadius: "8px",
  },
  image: {
    width: "100%",
    height: "auto",
  },
  closeButton: {
    position: "absolute",
    top: "1px",
    right: "1px",
    border: "none",
    padding: "5px",
    cursor: "pointer",
    height: "40px",
    width: "40px",
    objectFit:"fill"

  },
};

export default Portfolio;
