import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimatedTitle = () => {
  const titleRef = useRef(null);

  // Text content
  const lines = [
    "Web Developer",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each character span
      gsap.fromTo(
        ".char-span",
        { y: "90%" },
        {
          y: "0%",
          duration: 0.2,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.5,
        }
      );

      // Animate SVG paths
      gsap.fromTo(
        ".l path.d",
        {
          opacity: 0,
          scale: 0.1,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 1.5,
        }
      );
    }, titleRef);

    return () => ctx.revert();
  }, []);

  // Function to split text into characters with duplicate spans
  const renderAnimatedText = (text) => {
    return text.split("").map((char, index) => {
      if (char === " ") {
        return (
          <span
            key={index}
            className="inline-block"
            style={{ transform: "translateY(-90%)" }}
          >
            &nbsp;
          </span>
        );
      }

      return (
        <span
          key={index}
          className=" relative overflow-hidden"
          style={{ transform: "translateY(90%)" }}
        >
          <span className="char-span inline-block">{char}</span>
        </span>
      );
    });
  };

  return (
    <div
      ref={titleRef}
      className="relative"
      aria-hidden="true"
    >
      {/* Animated Text Lines */}
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="anim-title">
          {renderAnimatedText(line)}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
