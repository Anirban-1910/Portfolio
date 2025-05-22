import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom split text implementation
function customSplitText(element: Element, options: { type: string }) {
  const text = element.textContent || "";
  element.textContent = "";
  
  const words = text.split(" ").map(word => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "split-word";
    wordSpan.style.display = "inline-block";
    wordSpan.textContent = word + " ";
    return wordSpan;
  });

  const lines: HTMLElement[] = [];
  let currentLine: HTMLElement[] = [];
  let currentLineWidth = 0;
  const containerWidth = element.clientWidth;

  words.forEach(word => {
    element.appendChild(word);
    const wordWidth = word.offsetWidth;
    
    if (currentLineWidth + wordWidth > containerWidth) {
      const lineDiv = document.createElement("div");
      lineDiv.className = "split-line";
      currentLine.forEach(w => lineDiv.appendChild(w));
      lines.push(lineDiv);
      currentLine = [word];
      currentLineWidth = wordWidth;
    } else {
      currentLine.push(word);
      currentLineWidth += wordWidth;
    }
  });

  if (currentLine.length > 0) {
    const lineDiv = document.createElement("div");
    lineDiv.className = "split-line";
    currentLine.forEach(w => lineDiv.appendChild(w));
    lines.push(lineDiv);
  }

  element.textContent = "";
  lines.forEach(line => element.appendChild(line));

  return {
    lines,
    words
  };
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  
  const paras = document.querySelectorAll<HTMLElement>(".para");
  const titles = document.querySelectorAll<HTMLElement>(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: HTMLElement) => {
    para.classList.add("visible");
    const split = customSplitText(para, { type: "words" });

    gsap.fromTo(
      split.words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });

  titles.forEach((title: HTMLElement) => {
    const split = customSplitText(title, { type: "chars" });
    
    gsap.fromTo(
      split.words,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
