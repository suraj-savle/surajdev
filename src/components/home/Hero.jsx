import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const Hero = () => {
  const imgRef = useRef(null);
  const [showImage, setShowImage] = useState(false);

  // 🖱️ Cursor-following image
  useEffect(() => {
    const moveImage = (e) => {
      if (!imgRef.current) return;
      imgRef.current.style.transform = `translate(${e.clientX - 80}px, ${
        e.clientY - 100
      }px)`;
    };

    if (showImage) window.addEventListener("mousemove", moveImage);
    return () => window.removeEventListener("mousemove", moveImage);
  }, [showImage]);

  const handleResumeDownload = () => {
    window.open("/docs/resume.pdf", "_blank");
  };

  const handleprojectClick = () => {
    window.open("/projects", "_self");
  };

  return (
    <section className="relative flex items-center justify-center text-solid min-h-[85vh] md:min-h-[90vh] overflow-hidden">
      {/* Floating hover image */}
      <motion.img
        ref={imgRef}
        src="/images/suraj.jpg"
        alt="Suraj Savle"
        className={`absolute top-0 left-0 w-30 h-24 object-cover rounded-full border border-gray-500 shadow-xl pointer-events-none z-50 transition-all ${
          showImage ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-start md:text-left max-w-6xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-midcolor/80 tracking-wide uppercase mb-4"
        >
          Full Stack Web Developer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 select-none"
        >
          <h1>
            I ' M{" "}
            <motion.span
              className="text-solid inline-block cursor-none"
              onMouseEnter={() => setShowImage(true)}
              onMouseLeave={() => setShowImage(false)}
              
            >
              SURAJ SAVLE
            </motion.span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xl md:text-2xl text-midcolor/90 leading-relaxed font-light mb-8 hover:text-solid transition-all duration-500"
        >
          I create digital experiences that are fast, accessible, and visually
          compelling. Specializing in React, TypeScript, and modern web
          animation.
        </motion.p>

        <motion.div
          className="flex flex-col w-full sm:flex-row items-start gap-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-full flex items-center justify-center border-2 border-midcolor text-midcolor px-8 py-4 hover:bg-midcolor hover:text-background transition-all duration-500 font-medium text-lg"
            onClick={handleprojectClick}
          >
            <span className="flex items-center gap-3">
              View My Work
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group w-full flex items-center justify-center border-2 border-midcolor text-midcolor px-8 py-4 transition-all duration-500 font-medium text-lg"
            onClick={handleResumeDownload}
          >
            <span className="flex items-center gap-2">
              Resume
              <ArrowUpRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-midcolor group-hover:w-full transition-all duration-500" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
