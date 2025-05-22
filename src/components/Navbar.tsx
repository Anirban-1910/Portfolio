import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Add smooth scrolling behavior using CSS
    document.documentElement.style.scrollBehavior = "smooth";
    
    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initialize scroll animations for sections
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
      gsap.fromTo(section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Handle smooth scrolling for navigation links
    const handleNavClick = (e: MouseEvent) => {
      e.preventDefault();
      const target = (e.target as HTMLElement).getAttribute("data-target");
      if (target) {
        const element = document.getElementById(target);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    };

    const navLinks = document.querySelectorAll(".hover-link");
    navLinks.forEach(link => {
      link.addEventListener("click", handleNavClick as EventListener);
    });

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      window.removeEventListener("scroll", handleScroll);
      navLinks.forEach(link => {
        link.removeEventListener("click", handleNavClick as EventListener);
      });
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-title">ANIRBAN</div>
      <nav className="navbar">
        <div className="nav-links">
          <HoverLinks text="ABOUT" data-target="about" />
          <HoverLinks text="WORK" data-target="work" />
          <HoverLinks text="CONTACT" data-target="contact" />
        </div>
      </nav>
      <div className="navbar-connect">Let's Connect</div>
    </header>
  );
};

export default Navbar;
