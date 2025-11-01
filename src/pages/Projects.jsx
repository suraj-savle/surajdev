import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  X,
  ArrowUpRight,
  Play,
  Code2,
  Eye,
  ArrowLeftIcon,
  Layers, // Added for visual interest
} from "lucide-react";

// Assuming projectsData is the same as provided
const projectsData = {
  Projects: [
    {
      id: 1,
      name: "S-GRAPHIC",
      cover: "/project-1.png",
      image: "/project-1-1.png",
      image1: "/project-1-2.png",
      image2: "/project-1-3.png",
      image3: "/project-1-4.png",
      tech: ["React", "TailwindCSS", "Giphy Api"],
      description:
        "S-GRAPHIC is a creative platform where you can easily download stickers, GIFs, and stylish text designs. Perfect for enhancing your chats, stories, and projects, S-GRAPHIC offers a fun and easy way to express yourself with eye-catching visuals.",
      url: "https://s-graphic.vercel.app",
      github: "https://github.com/suraj-savle/S-GRAPHIC",
    },
    {
      id: 2,
      name: "INVOICE GENERATOR",
      cover: "/project-2.png",
      image: "/project-2-1.png",
      image1: "/project-2-2.png",
      image2: "/project-2-3.png",
      image3: "/project-2-4.png",
      tech: ["React", "jspdf", "TailwindCSS"],
      description:
        "This Invoice Generator built with React and Tailwind lets you add multiple items, input name and email, and select a date. It calculates totals in real-time and allows you to download or print the invoice easily with a clean, responsive design.",
      url: "https://invoice-generator-blond-mu.vercel.app",
      github: "https://github.com/suraj-savle/Invoice-Generator",
    },
    {
      id: 3,
      name: "FITNATION",
      cover: "/project-3.png",
      image: "/project-3-1.png",
      image1: "/project-3-2.png",
      image2: "/project-3-3.png",
      image3: "/project-3-4.png",
      tech: ["JavaScript", "API Integration", "CSS3"],
      description:
        "A modern fitness club website showcasing services, facilities, and exclusive merchandise. Built with React and Tailwind CSS to deliver a sleek and responsive user experience.",
      url: "https://fitnation-black.vercel.app",
      github: "https://github.com/suraj-savle/FITNATION",
    },
  ],
};

function Projects() {
  const [selectedId, setSelectedId] = useState(null);
  const [activeImage, setActiveImage] = useState(0);

  // --- Animation Variants (Kept for continuity) ---
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const selectedProject = projectsData.Projects.find(
    (p) => p.id === selectedId
  );

  const projectImages = selectedProject
    ? [
        selectedProject.image,
        selectedProject.image1,
        selectedProject.image2,
        selectedProject.image3,
      ]
    : [];

  const handleBackClick = () => {
    // Note: In a real SPA with routing, you should use your router's back function (e.g., navigate(-1))
    window.history.back();
  };
  // -------------------------------------------------

  return (
    <section
      id="projects"
      className="py-10 sm:py-15 px-1 sm:px-6 lg:px-8 bg-background relative"
    >
      {/* Background/Pattern for depth (Assuming Tailwind/CSS vars for colors) */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {/* Example of a subtle background texture/pattern */}
        <div className="w-full h-full bg-repeat [background-image:radial-gradient(ellipse_at_center,_var(--tw-color-midcolor)_1px,_transparent_0)] [background-size:20px_20px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12 sm:mb-16">
          <button
            onClick={handleBackClick}
            className="group flex items-center gap-2 text-midcolor hover:text-solid transition-all duration-300 py-2 rounded-xl"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Go Back</span>
          </button>
        </div>

        {/* Header - Improved Hierarchy and Visuals */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start mb-12"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-solid text-4xl md:text-7xl font-black uppercase"
          >
            Projects
          </motion.h1>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 "
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {projectsData.Projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              className="group relative rounded-2xl border border-midcolor bg-background transition-all duration-500 cursor-pointer overflow-hidden shadow-lg hover:shadow-midcolor/30"
              whileHover={{ y: -8, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}
              onClick={() => setSelectedId(project.id)}
            >
              {/* Project Image */}
              <div className="aspect-video relative overflow-hidden bg-gray-900">
                <motion.img
                  src={project.cover}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Project Content */}
              <div className="p-6 relative">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-3xl font-extrabold text-solid group-hover:text-midcolor transition-colors duration-300">
                    {project.name}
                  </h3>
                  <ArrowUpRight className="w-6 h-6 text-midcolor/60 group-hover:text-midcolor transition-all duration-300 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0" />
                </div>

                <p className="text-midcolor/80 text-base mb-5 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack - Improved style */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-midcolor/10 border border-midcolor/50 rounded-full text-xs text-midcolor font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons - More prominent */}
                <div className="flex gap-4 pt-4 border-t border-midcolor/20">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-background border border-midcolor/50 rounded-xl text-midcolor transition-all duration-300 text-sm font-medium"
                  >
                    <Code2 className="w-4 h-4" />
                    Code
                  </motion.a>
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-background border border-midcolor rounded-xl text-solid  transition-all duration-300 text-sm font-medium shadow-md"
                  >
                    <Play className="w-4 h-4" />
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Modal - Improved Layout and Design */}
        <AnimatePresence>
          {selectedId && (
            <>
              {/* Overlay - Fixed and darker */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[50]"
                onClick={() => {
                  setSelectedId(null);
                  setActiveImage(0); // Reset image on close
                }}
              />

              {/* Modal Content - Fixed positioning, max-width, and rounded corners */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 0 }}
                className="fixed inset-0 sm:inset-8 xl:inset-12 max-w-6xl mx-auto bg-background border border-midcolor/50 sm:rounded-xl z-[60] overflow-hidden flex flex-col shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-midcolor/20 bg-background sticky top-0 z-10">
                  <h2 className="text-3xl font-bold text-solid">
                    {selectedProject?.name}
                  </h2>
                  <button
                    onClick={() => {
                      setSelectedId(null);
                      setActiveImage(0);
                    }}
                    className="p-2 rounded-full hover:bg-midcolor/10 transition-colors"
                  >
                    <X className="w-6 h-6 text-solid" />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                  {selectedProject && (
                    <div className="p-6 space-y-10">
                      {/* Main Image */}
                      <div className="bg-midcolor/10 p-2 rounded-xl shadow-inner border border-midcolor/20">
                        <img
                          src={projectImages[activeImage]}
                          alt={selectedProject.name}
                          className="w-full h-96 object-cover lg:object-contain rounded-lg"
                        />
                      </div>

                      {/* Image Thumbnails - Better-styled, smaller gap */}
                      <div className="flex gap-3 overflow-x-auto pb-4">
                        {projectImages.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveImage(index)}
                            className={`flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden border-3 transition-all duration-300 transform hover:scale-[1.02] ${
                              activeImage === index
                                ? "border-solid ring-2 ring-midcolor" // Highlight active image
                                : "border-midcolor/20 hover:border-midcolor/50"
                            }`}
                          >
                            <img
                              src={img}
                              alt={`${selectedProject.name} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>

                      {/* Project Details */}
                      <div className="grid lg:grid-cols-3 gap-10">
                        {/* Description */}
                        <div className="lg:col-span-2 space-y-8">
                          <div>
                            <h3 className="text-2xl font-bold text-solid mb-4 border-l-4 border-midcolor pl-3">
                              Project Overview
                            </h3>
                            <p className="text-midcolor/90 leading-relaxed text-lg">
                              {selectedProject.description}
                            </p>
                          </div>
                          {/* Could add a 'Key Features' list here if available in data */}
                        </div>

                        {/* Tech & Links */}
                        <div className="space-y-8 lg:border-l lg:border-midcolor/20 lg:pl-6">
                          {/* Tech Stack */}
                          <div>
                            <h3 className="text-2xl font-bold text-solid mb-4 border-l-4 border-midcolor pl-3">
                              Technologies
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.tech.map((tech, index) => (
                                <span
                                  key={index}
                                  className="px-4 py-2 bg-midcolor/10 border border-midcolor/50 rounded-full text-solid text-sm font-medium shadow-sm"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="space-y-4">
                            <motion.a
                              href={selectedProject.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-background text-solid border rounded-xl hover:shadow-xl hover:shadow-midcolor/30 transition-all duration-300 font-bold text-lg"
                            >
                              <Eye className="w-5 h-5" />
                              View Live Demo
                            </motion.a>
                            <motion.a
                              href={selectedProject.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-background border border-midcolor/50 text-midcolor rounded-xl hover:bg-midcolor/10 transition-all duration-300 font-semibold"
                            >
                              <Github className="w-5 h-5" />
                              Source Code
                            </motion.a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Projects;
