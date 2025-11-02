import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const letters = ["S", "U", "R", "A", "J"];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2800); // 2.8s loading
    return () => clearTimeout(timer);
  }, []);

  const letterVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.15,
        type: "spring",
        stiffness: 150,
        damping: 12,
      },
    }),
    exit: { y: -100, opacity: 0, transition: { duration: 0.5 } },
  };

  const overlayVariants = {
    hidden: { y: 0 },
    exit: {
      y: "-100%",
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0.2, 1, 0.2],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          variants={overlayVariants}
          initial="hidden"
          exit="exit"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-solid text-background overflow-hidden"
        >
          {/* subtle animated gradient background */}
          <motion.div
            variants={glowVariants}
            initial="hidden"
            animate="visible"
            className="absolute inset-0 bg-solid blur-3xl"
          />

          {/* Animated brand name */}
          <div className="flex gap-4 text-6xl sm:text-8xl md:text-[140px] font-extrabold tracking-widest relative z-10">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-background"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Subtext fade in */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.8, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="mt-6 text-sm tracking-widest text-background uppercase"
          >
            Crafting the Web Experience...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
