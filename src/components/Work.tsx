import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    id: 1,
    name: "Portfolio Website",
    category: "Web Development",
    tools: "React, TypeScript, Three.js, GSAP",
    image: "/images/work_img/1.png",
    link: "https://github.com/Anirban-1910/Portfolio-Website"
  },
  {
    id: 2,
    name: "Micro payment platform",
    category: "UI/UX Design",
    tools: "Figma, Adobe XD, React, Tailwind CSS",
    image: "/images/work_img/2.png",
    link: "https://www.behance.net/anirbanbasak3"
  },
  {
    id: 3,
    name: "Social Media Platform",
    category: "Web Application",
    tools: "Next.js, Node.js, MongoDB, Tailwind CSS",
    image: "/images/work_img/3.png",
    link: "https://www.behance.net/anirbanbasak3"
  },
  {
    id: 4,
    name: "movie app",
    category: "UI/UX Design",
    tools: "Figma, Adobe XD, React, Tailwind CSS",
    image: "/images/work_img/4.png",
    link: "https://www.behance.net/anirbanbasak3"
  },
  {
    id: 5,
    name: "Fitness App",
    category: "UI/UX Design",
    tools: "Figma, Adobe XD, React, Tailwind CSS",
    image: "/images/work_img/5.png",
    link: "https://www.behance.net/anirbanbasak3"
  }
];

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;
    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        pinType: !ScrollTrigger.isTouch ? "transform" : "fixed",
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      duration: 40,
      delay: 0.2,
    });
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{project.id}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage 
                image={project.image} 
                alt={project.name}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
