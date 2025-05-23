import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const handleConnect = () => {
    const email = 'anirbanbasak5121@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000); // Hide after 2 seconds
    });
  };

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
      <div style={{ position: 'relative' }}>
        <div 
          className="navbar-connect" 
          onClick={handleConnect}
          style={{ cursor: 'pointer' }}
        >
          Let's Connect
        </div>
        {showCopied && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: '0',
              backgroundColor: 'rgba(127, 64, 255, 0.2)',
              backdropFilter: 'blur(5px)',
              border: '1px solid #7f40ff',
              color: '#fff',
              padding: '8px 12px',
              borderRadius: '4px',
              fontSize: '14px',
              marginTop: '8px',
              whiteSpace: 'nowrap',
              zIndex: 1000,
              boxShadow: '0 0 15px rgba(127, 64, 255, 0.3)',
              animation: 'fadeInOut 2s ease-in-out'
            }}
          >
            Email copied to clipboard!
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
