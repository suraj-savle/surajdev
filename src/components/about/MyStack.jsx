import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import javascript from "../../assets/js.webp";
import react from "../../assets/react.webp";
import tailwind from "../../assets/tailwind.webp";
import motionIcon from "../../assets/framer-motion.webp";
import node from "../../assets/node.webp";
import express from "../../assets/express.webp";
import mongodb from "../../assets/MongoDB.png";
import sql from "../../assets/SQLDeveloper.png";
import git from "../../assets/git.webp";
import canva from "../../assets/Canva.png";
import figma from "../../assets/Figma.png";

// Technology arrays (UNMODIFIED)
const Frontend = [
  {
    image: javascript,
    title: "Javascript",
    category: "frontend",
    color: "from-yellow-400 to-yellow-600",
  },
  {
    image: react,
    title: "React",
    category: "frontend",
    color: "from-cyan-400 to-blue-600",
  },
  {
    image: tailwind,
    title: "Tailwind CSS",
    category: "frontend",
    color: "from-teal-400 to-cyan-600",
  },
  {
    image: motionIcon,
    title: "Framer Motion",
    category: "frontend",
    color: "from-purple-400 to-pink-600",
  },
];

const Backend = [
  {
    image: node,
    title: "Node.Js",
    category: "backend",
    color: "from-green-400 to-green-600",
  },
  {
    image: express,
    title: "Express.Js",
    category: "backend",
    color: "from-gray-400 to-gray-600",
  },
];

const Database = [
  {
    image: mongodb,
    title: "MongoDB",
    category: "database",
    color: "from-green-400 to-emerald-600",
  },
  {
    image: sql,
    title: "SQL",
    category: "database",
    color: "from-red-400 to-red-600",
  },
];

const Tools = [
  {
    image: git,
    title: "Git",
    category: "tools",
    color: "from-orange-400 to-orange-600",
  },
  {
    image: canva,
    title: "Canva",
    category: "tools",
    color: "from-blue-400 to-purple-600",
  },
  {
    image: figma,
    title: "Figma",
    category: "tools",
    color: "from-purple-400 to-pink-600",
  },
];

// Combine all technologies for marquee
const allTechnologies = [...Frontend, ...Backend, ...Database, ...Tools];

// Animation variants - REFINING EASE AND DURATION
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut", // Using a standard easeOut for consistent smoothness
    },
  },
};

const sectionTitle = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.0,
      ease: "easeOut", // Using easeOut for the header movement
    },
  },
};

// Marquee component (UNMODIFIED for smoothness)
const MarqueeRow = ({ technologies, direction = "left", speed = 100 }) => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let animationFrame;
    let position = 0;
    const baseSpeed = speed / 1000;

    const animate = () => {
      position += direction === "left" ? -baseSpeed : baseSpeed;

      if (direction === "left" && position <= -marquee.scrollWidth / 2) {
        position = 0;
      } else if (direction === "right" && position >= 0) {
        position = -marquee.scrollWidth / 2;
      }

      marquee.style.transform = `translateX(${position}px)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [direction, speed]);

  // Duplicate technologies for seamless loop
  const duplicatedTech = [...technologies, ...technologies];

  return (
    <div className="relative overflow-hidden py-4">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent z-10" />

      <motion.div
        ref={marqueeRef}
        className="flex gap-6"
        style={{ willChange: "transform" }}
      >
        {duplicatedTech.map((tech, index) => (
          <motion.div
            key={`${tech.title}-${index}`}
            whileHover={{
              scale: 1.1,
              y: -5,
              transition: { duration: 0.3 },
            }}
            className="flex items-center gap-4 px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl min-w-[180px] transition-all duration-300"
          >
            <motion.img
              src={tech.image}
              alt={tech.title}
              className="w-8 h-8 rounded-lg"
              whileHover={{
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.6 },
              }}
            />
            <span className="text-solid font-medium text-lg whitespace-nowrap">
              {tech.title}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

function MyStack() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col justify-around items-start gap-12 my-20 max-w-6xl mx-auto"
      id="Technologies"
    >
      {/* Header Section */}
      <motion.div
        variants={container}
        className="flex flex-col items-start gap-6 w-full"
      >
        <motion.span
          variants={sectionTitle}
          className="text-solid text-4xl md:text-6xl font-black uppercase"
        >
          Tech Stack
        </motion.span>
        <motion.p
          variants={sectionTitle}
          transition={{ delay: 0.4 }}
          className="text-midcolor text-xl md:text-2xl font-light leading-relaxed max-w-3xl"
        >
          Over the years, I've worked with a diverse range of technologies to
          create exceptional digital experiences. Here are the tools and
          technologies I'm proficient with:
        </motion.p>
      </motion.div>

      {/* Marquee Sections */}
      <motion.div variants={container} className="w-full space-y-12">
        {/* First Marquee Row */}
        <motion.div
          variants={item}
          className="space-y-4"
          // We apply the 'item' variant here to fade the entire container in from the bottom
        >
          <motion.h3
            className="text-solid text-2xl md:text-3xl font-light mb-6"
            // Ensure this title loads smoothly from the bottom too, but with less vertical travel
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            Frontend & Backend
          </motion.h3>
          <MarqueeRow
            technologies={[...Frontend, ...Backend]}
            direction="left"
            speed={500}
          />
        </motion.div>

        {/* Second Marquee Row */}
        <motion.div
          variants={item}
          className="space-y-4"
          // We apply the 'item' variant here to fade the entire container in from the bottom
        >
          <motion.h3
            className="text-solid text-2xl md:text-3xl font-light mb-6"
            // Ensure this title loads smoothly from the bottom too
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }} // Slightly longer delay for staggering
          >
            Database & Tools
          </motion.h3>
          <MarqueeRow
            technologies={[...Database, ...Tools]}
            direction="right"
            speed={500}
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default MyStack;
