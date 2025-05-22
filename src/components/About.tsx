import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/About.css";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (aboutRef.current && titleRef.current && paraRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "bottom 20%",
          }
        }
      );

      gsap.fromTo(
        paraRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "bottom 20%",
          }
        }
      );
    }
  }, []);

  return (
    <div className="about-section" id="about" ref={aboutRef}>
      <div className="about-me">
        <h3 className="title" ref={titleRef}>About Me</h3>
        <p className="para" ref={paraRef}>
          I'm Anirban Basak, a UI/UX designer and web developer with a Computer Science background. I enjoy building clean, user-friendly digital experiences that are both functional and visually appealing.
        </p>
      </div>
    </div>
  );
};

export default About;
