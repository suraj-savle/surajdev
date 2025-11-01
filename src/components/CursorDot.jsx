import React, { useEffect, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/**
 * CursorDot - Enhanced Black Theme
 * - Smooth black cursor dot that follows mouse movement
 * - Auto-hides on touch devices
 * - Optional hover effects and size changes
 * - Performance optimized with proper cleanup
 */

const CursorDot = ({
  size = 14,              // Base diameter in px
  hoverSize = 24,         // Size on hover
  color = "#000000",      // Black color
  hoverColor = "#000000", // Black on hover
  outline = "2px solid rgba(255, 255, 255, 0.8)", // White outline for contrast
  springConfig = { mass: 0.5, stiffness: 300, damping: 25 }, // Faster, more responsive
  enableHoverEffect = true, // Enable size change on interactive elements
}) => {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Spring values for smooth movement
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);
  const scale = useSpring(isHovering ? 1.5 : 1, {
    mass: 0.5,
    stiffness: 400,
    damping: 28,
  });

  useEffect(() => {
    // Detect touch devices and disable cursor
    const isTouch = 
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    
    if (isTouch) return;

    setIsVisible(true);

    const handleMouseMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const handleMouseEnter = (e) => {
      if (enableHoverEffect && isInteractiveElement(e.target)) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e) => {
      if (enableHoverEffect && isInteractiveElement(e.target)) {
        setIsHovering(false);
      }
    };

    // Hide cursor when leaving window
    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    // Check if element is interactive
    const isInteractiveElement = (element) => {
      const interactiveSelectors = [
        'a', 'button', 'input', 'textarea', 'select', 
        '[role="button"]', '[tabindex]', '.interactive', '.clickable'
      ];
      
      return interactiveSelectors.some(selector => 
        element.matches?.(selector) || 
        element.closest?.(selector)
      );
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);
    document.addEventListener("mouseover", handleMouseEnter, true);
    document.addEventListener("mouseout", handleMouseLeave, true);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      // Cleanup all event listeners
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      document.removeEventListener("mouseover", handleMouseEnter, true);
      document.removeEventListener("mouseout", handleMouseLeave, true);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [rawX, rawY, enableHoverEffect]);

  // Don't render on touch devices
  const isTouch = 
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);
  
  if (isTouch || !isVisible) return null;

  const currentSize = isHovering ? hoverSize : size;
  const currentColor = isHovering ? hoverColor : color;

  const dotStyle = {
    position: "fixed",
    left: 0,
    top: 0,
    pointerEvents: "none",
    zIndex: 9999,
    width: `${currentSize}px`,
    height: `${currentSize}px`,
    borderRadius: "50%",
    backgroundColor: currentColor,
    border: outline,
    boxShadow: `
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 4px 12px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
    transform: "translate(-50%, -50%)",
    transition: "width 0.2s ease, height 0.2s ease, background-color 0.2s ease",
    willChange: "transform",
    mixBlendMode: "difference", // Creates nice contrast effect
  };

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          ...dotStyle,
          transform: `translate(calc(var(--cursor-x, -100px) - 50%), calc(var(--cursor-y, -100px) - 50%)) scale(var(--cursor-scale, 1))`,
        }}
        ref={(el) => {
          if (!el) return;

          // Update position with motion values
          const unsubscribeX = x.onChange((v) => {
            el.style.setProperty("--cursor-x", `${v}px`);
          });
          
          const unsubscribeY = y.onChange((v) => {
            el.style.setProperty("--cursor-y", `${v}px`);
          });
          
          const unsubscribeScale = scale.onChange((v) => {
            el.style.setProperty("--cursor-scale", v.toString());
          });

          // Cleanup function
          return () => {
            unsubscribeX();
            unsubscribeY();
            unsubscribeScale();
          };
        }}
      />
      
     
    </div>
  );
};

export default CursorDot;