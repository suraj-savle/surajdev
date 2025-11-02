import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [showImage, setShowImage] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  const navigate = useNavigate();
  const handleProjectClick = () => navigate("/projects");
  const handleResumeDownload = () => window.open("/docs/resume.pdf", "_blank");

  const handleMouseEnter = () => {
    if (!isMobile) setShowImage(true);
  };

  return (
    <section className="relative flex items-center justify-center text-solid min-h-[85vh] md:min-h-[90vh] overflow-hidden">
      {/* Floating hover image */}
      <AnimatePresence>
        {showImage && !isMobile && (
          <motion.img
            src="/images/suraj.jpg"
            alt="Suraj preview"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed w-32 h-32 object-cover cursor-none rounded-full border-2 border-white shadow-2xl pointer-events-none z-40"
            style={{
              left: mousePosition.x + 10,
              top: mousePosition.y + 20,
            }}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex flex-col items-start md:text-left max-w-6xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-midcolor/80 tracking-wide uppercase mb-4"
        >
          Full Stack Web Developer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 select-none"
        >
          <h1>
            I ' M{" "}
            <motion.span
              className="text-solid inline-block cursor-none"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => setShowImage(false)}
              onTouchStart={handleMouseEnter}
              onTouchEnd={() => setShowImage(false)}
              transition={{ type: "spring", stiffness: 250 }}
            >
              SURAJ SAVLE
            </motion.span>
          </h1>
        </motion.div>

        <motion.p
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl text-midcolor/90 leading-relaxed font-light mb-8 hover:text-solid transition-all duration-500"
        >
          I create digital experiences that are fast, accessible, and visually
          compelling. Specializing in React, TypeScript, and modern web
          animation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
          viewport={{ once: true }}
          className="flex flex-col w-full sm:flex-row items-start gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="group relative w-full flex items-center justify-center border-2 border-midcolor text-midcolor px-8 py-4 hover:bg-midcolor hover:text-background transition-all duration-500 font-medium text-lg"
            onClick={handleProjectClick}
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
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
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
