import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 🖼️ Add your own image paths here
const IMAGES = [
  { image: "/images/suraj1.jpg" },
  { image: "/images/suraj2.jpg" },
  { image: "/images/suraj3.jpg" },
  { image: "/images/suraj1.jpg" },
  { image: "/images/suraj2.jpg" },
  { image: "/images/suraj3.jpg" },
];

const CursorImageTrail = () => {
  // ✅ store multiple active images at once
  const [trails, setTrails] = useState([]);
  const lastMove = useRef(0);
  const imageIndex = useRef(0);

  const handleMouseMove = (e) => {
    const now = Date.now();

    // ⏱️ control how often a new image appears
    if (now - lastMove.current < 110) return;
    lastMove.current = now;

    // 🧮 pick next image in sequence instead of random
    const nextImage = IMAGES[imageIndex.current].image;

    // ➡️ update index (loop back to 0 when at end)
    imageIndex.current = (imageIndex.current + 1) % IMAGES.length;

    // 🧩 create new image trail object
    const newTrail = {
      id: Math.random().toString(36).substring(2, 9),
      x: e.clientX,
      y: e.clientY,
      src: nextImage,
    };

    // 📦 add it to the list
    setTrails((prev) => [...prev, newTrail]);

    // 🕒 remove image after 1 second
    setTimeout(() => {
      setTrails((prev) => prev.filter((t) => t.id !== newTrail.id));
    }, 1000);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative h-[90vh] w-full bg-background  overflow-hidden flex items-center justify-center"
    >
      {/* ✨ center text */}
      <h1 className="absolute text-[7rem] md:text-[10rem] font-extrabold text-solid tracking-tight select-none z-50">
        WEB DEVLOPER
      </h1>

      {/* 🎞️ animated image trails */}
      <AnimatePresence>
        {trails.map((trail) => (
          <motion.div
            key={trail.id}
            className="absolute pointer-events-none"
            style={{
              left: trail.x,
              top: trail.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* 🖼️ actual image */}
            <motion.img
              src={trail.src}
              alt="Trail"
              className="w-[200px] h-[240px] object-cover shadow-2xl"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
};

export default CursorImageTrail;
