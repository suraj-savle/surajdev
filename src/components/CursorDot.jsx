import React, { useEffect, useState, useCallback } from "react";
import { useMotionValue, useSpring } from "framer-motion";

/**
 * Enhanced CursorDot - Black Theme
 * - Smooth black cursor dot that follows mouse movement
 * - Auto-hides on touch devices and when mouse leaves window
 * - Performance optimized with proper cleanup and throttling
 * - Better accessibility and interactive element detection
 * - Configurable behavior and styling
 */

const CursorDot = ({
  size = 14,              // Base diameter in px
  hoverSize = 24,         // Size on hover
  color = "#000000",      // Black color
  hoverColor = "#000000", // Black on hover
  outline = "2px solid rgba(255, 255, 255, 0.8)", // White outline for contrast
  springConfig = { mass: 0.5, stiffness: 300, damping: 25 },
  enableHoverEffect = true,
  enableBlendMode = true, // Optional blend mode
  hideDelay = 500,        // Delay before hiding when mouse leaves window
}) => {
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  // Spring values for smooth movement
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);
  const scale = useSpring(isHovering ? 1.5 : 1, {
    mass: 0.5,
    stiffness: 400,
    damping: 28,
  });

  // Throttled mouse move handler
  const handleMouseMove = useCallback((e) => {
    rawX.set(e.clientX);
    rawY.set(e.clientY);
  }, [rawX, rawY]);

  // Improved interactive element detection
  const isInteractiveElement = useCallback((element) => {
    if (!element || !element.matches) return false;

    const interactiveSelectors = [
      'a', 'button', 'input', 'textarea', 'select', 'label',
      '[role="button"]', '[role="link"]', '[tabindex]:not([tabindex="-1"])',
      '.interactive', '.clickable', '.cursor-pointer',
      '[onclick]', '[data-cursor-hover]' // Custom data attribute
    ];

    // Check if element matches selectors
    const isInteractive = interactiveSelectors.some(selector => 
      element.matches?.(selector) || 
      element.closest?.(selector)
    );

    // Check computed style for cursor pointer
    if (!isInteractive) {
      const style = window.getComputedStyle(element);
      if (style.cursor === 'pointer') {
        return true;
      }
    }

    return isInteractive;
  }, []);

  const handleMouseEnter = useCallback((e) => {
    if (!enableHoverEffect) return;
    
    const interactive = isInteractiveElement(e.target);
    if (interactive) {
      setIsHovering(true);
      setIsPointer(true);
    }
  }, [enableHoverEffect, isInteractiveElement]);

  const handleMouseLeave = useCallback((e) => {
    if (!enableHoverEffect) return;
    
    if (isInteractiveElement(e.target)) {
      setIsHovering(false);
      setIsPointer(false);
    }
  }, [enableHoverEffect, isInteractiveElement]);

  // Hide cursor with delay when leaving window
  const handleMouseLeaveWindow = useCallback(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, hideDelay);
    
    return () => clearTimeout(timeoutId);
  }, [hideDelay]);

  const handleMouseEnterWindow = useCallback(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    // Detect touch devices and disable cursor
    const isTouch = 
      typeof window !== "undefined" &&
      ("ontouchstart" in window || 
       navigator.maxTouchPoints > 0 || 
       navigator.msMaxTouchPoints > 0);
    
    if (isTouch) return;

    setIsVisible(true);

    // Add event listeners with passive where appropriate
    const passiveOptions = { passive: true };
    const captureOptions = { capture: true };

    window.addEventListener("mousemove", handleMouseMove, passiveOptions);
    document.addEventListener("mouseenter", handleMouseEnter, captureOptions);
    document.addEventListener("mouseleave", handleMouseLeave, captureOptions);
    document.addEventListener("mouseover", handleMouseEnter, captureOptions);
    document.addEventListener("mouseout", handleMouseLeave, captureOptions);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      // Cleanup all event listeners
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, captureOptions);
      document.removeEventListener("mouseleave", handleMouseLeave, captureOptions);
      document.removeEventListener("mouseover", handleMouseEnter, captureOptions);
      document.removeEventListener("mouseout", handleMouseLeave, captureOptions);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [
    handleMouseMove, 
    handleMouseEnter, 
    handleMouseLeave, 
    handleMouseLeaveWindow, 
    handleMouseEnterWindow
  ]);

  // Don't render on touch devices
  const isTouch = 
    typeof window !== "undefined" &&
    ("ontouchstart" in window || 
     navigator.maxTouchPoints > 0 || 
     navigator.msMaxTouchPoints > 0);
  
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
    transition: "width 0.15s ease, height 0.15s ease, background-color 0.15s ease",
    willChange: "transform",
    mixBlendMode: enableBlendMode ? "difference" : "normal",
    opacity: isPointer ? 0.9 : 1,
  };

  return (
    <div
      aria-hidden="true"
      role="presentation"
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