import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Diploma in CST</h4>
                <h5>BPC Institute of Technology</h5>
              </div>
              <h3>2019-2022</h3>
            </div>
            <p>
              I completed my Diploma in Computer Science and Engineering at BPC Institute of Technology in 2022.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in CSE</h4>
                <h5>RCC Institute of Technology</h5>
              </div>
              <h3>2022-2025</h3>
            </div>
            <p>
              I am currently pursuing my B.Tech in Computer Science and Engineering at RCC Institute of Technology.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>UI/UX Designer Intern</h4>
                <h5>ALT-PI</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              I am working as a UI/UX Designer Intern at ALT-PI. Designing clean, user-friendly interfaces and prototypes while collaborating with the team to improve user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
