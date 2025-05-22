import gsap from "gsap";

// Custom split text implementation
function customSplitText(selector: string, options: { type: string }) {
  const elements = document.querySelectorAll(selector);
  const results: { chars: HTMLElement[], lines: HTMLElement[] }[] = [];

  elements.forEach(element => {
    const text = element.textContent || "";
    element.textContent = "";
    
    const chars = text.split("").map(char => {
      const charSpan = document.createElement("span");
      charSpan.className = "split-char";
      charSpan.style.display = "inline-block";
      charSpan.textContent = char;
      return charSpan;
    });

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

    results.push({ chars, lines });
  });

  return {
    chars: results.flatMap(r => r.chars),
    lines: results.flatMap(r => r.lines)
  };
}

export function initialFX() {
  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0].classList.add("main-active");
  
  gsap.to("body", {
    backgroundColor: "#0b080c",
    duration: 0.5,
    delay: 1,
  });

  const landingText = customSplitText(".landing-info h3, .landing-intro h2, .landing-intro h1", {
    type: "chars,lines"
  });

  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  let TextProps = { type: "chars,lines" };

  const landingText2 = customSplitText(".landing-h2-info", TextProps);
  gsap.fromTo(
    landingText2.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  const landingText3 = customSplitText(".landing-h2-info-1", TextProps);
  const landingText4 = customSplitText(".landing-h2-1", TextProps);
  const landingText5 = customSplitText(".landing-h2-2", TextProps);

  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

function LoopText(Text1: any, Text2: any) {
  var tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    Text2.chars,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      Text1.chars,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      Text1.chars,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      Text2.chars,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
