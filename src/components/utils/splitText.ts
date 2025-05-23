import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom split text implementation
function customSplitText(element: Element, options: { type: string }) {
  const text = element.textContent || "";
  element.textContent = "";
  
  const types = options.type.split(",");
  const shouldSplitWords = types.includes("words");
  const shouldSplitChars = types.includes("chars");
  
  const words = shouldSplitWords ? text.split(" ").map(word => {
    const wordSpan = document.createElement("span");
    wordSpan.className = "split-word";
    wordSpan.style.display = "inline-block";
    wordSpan.textContent = word + " ";
    return wordSpan;
  }) : [];

  const chars = shouldSplitChars ? text.split("").map(char => {
    const charSpan = document.createElement("span");
    charSpan.className = "split-char";
    charSpan.style.display = "inline-block";
    charSpan.textContent = char;
    return charSpan;
  }) : [];

  element.textContent = "";
  if (shouldSplitWords) {
    words.forEach(word => element.appendChild(word));
  } else if (shouldSplitChars) {
    chars.forEach(char => element.appendChild(char));
  } else {
    element.textContent = text;
  }

  return {
    lines: [],
    words: shouldSplitWords ? words : chars
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
