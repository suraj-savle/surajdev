import React from "react";
import {
  MapPin,
  Rocket,
  BookOpen,
  Code,
  Trophy,
  Compass,
  Search,
  Cpu,
  ArrowLeftIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import MusicPlayer from "../ui/MusicPlayer";

// Reusable Motion wrapper for fade-up animation (Kept as is)
const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- New Reusable Motion Wrapper for interactive elements ---
const CardMotion = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 250, damping: 15 }}
    viewport={{ once: true }}
    
    // Add simple interactive animation
    whileHover={{ 
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" // Increased shadow depth
    }}
    className={className}
  >
    {children}
  </motion.div>
);
// -----------------------------------------------------------

const AboutComponent = () => {
  return (
    <section className="max-w-6xl mx-auto relative min-h-screen py-10 overflow-hidden">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-start max-w-6xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-solid text-4xl md:text-6xl font-black uppercase mb-10"
        >
          <h1>ABOUT</h1>
        </motion.div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-min">
        
        {/* 🧠 Header Section (Uses CardMotion) */}
        <CardMotion
          delay={0.1}
          className="bg-white/80 backdrop-blur-xl rounded-xl border border-midcolor p-8 md:p-10 lg:col-span-2"
        >
          <div className="flex flex-col justify-center h-full">
            <div className="flex items-center gap-3 mb-6 border rounded-2xl p-2 border-solid">
              <div className="w-3 h-3 bg-solid rounded-full animate-pulse"></div>
              <span className="font-semibold text-sm uppercase tracking-wider">
                Available for Projects
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-solid leading-tight mb-6"
            >
              Crafting Digital <span className="block">Experiences</span>
            </motion.h1>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl">
              I'm <span className="font-bold text-gray-900">Suraj Savle</span>,
              a passionate Full Stack Developer and BCA student dedicated to
              building beautiful and performant web experiences using
              cutting-edge tech.
            </p>

            <motion.div
              // Removed previous whileHover to use CardMotion's default
              className="flex items-center text-gray-600 font-medium"
            >
              <MapPin className="w-5 h-5 mr-2 text-red-500" />
              <span>Maharashtra, India</span>
            </motion.div>
          </div>
        </CardMotion>

        {/* Music Player (Use FadeUp, since it's an interactive element already) */}
        <FadeUp delay={0.2}>
          <MusicPlayer />
        </FadeUp>

        {/* 🚀 Journey (Uses CardMotion) */}
        <CardMotion
          delay={0.3}
          className="bg-white/80 backdrop-blur-xl rounded-xl border border-midcolor p-6"
        >
          <div className="flex items-center mb-6">
            <Rocket className="w-6 h-6 mr-3 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900">Journey</h2>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-bold text-gray-900">Freelance Developer</h3>
              <p className="text-gray-600 text-sm">Global clients & projects</p>
              <p className="text-xs text-gray-500">2024 – Present</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-gray-900">BCA Student</h3>
              <p className="text-gray-600 text-sm">Full-stack specialization</p>
              <p className="text-xs text-gray-500">2022 – 2025</p>
            </div>
          </div>
        </CardMotion>

        {/* 🎓 Education (Uses CardMotion) */}
        <CardMotion
          delay={0.4}
          className="bg-white/80 backdrop-blur-xl rounded-xl border border-midcolor p-6"
        >
          <div className="flex items-center mb-4">
            <BookOpen className="w-6 h-6 mr-3 text-green-600" />
            <h2 className="text-xl font-bold text-gray-900">Education</h2>
          </div>
          <div className="text-gray-700">
            <p className="font-bold text-lg">
              Bachelor of Computer Applications
            </p>
            <p className="text-sm mt-1">3rd Year • Full-time</p>
            <p className="text-xs text-gray-600 mt-2">
              Focus: Web Development & Software Engineering
            </p>
          </div>
        </CardMotion>

        {/* 🎨 Interests (Uses CardMotion) */}
        <CardMotion
          delay={0.5}
          className="bg-white/80 backdrop-blur-xl rounded-xl border border-midcolor p-6"
        >
          <div className="flex items-center mb-4">
            <Compass className="w-6 h-6 mr-3 text-pink-600" />
            <h2 className="text-xl font-bold text-gray-900">Beyond Code</h2>
          </div>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              Exploring new tech & design trends
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              Cooking & music enthusiast
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
              Digital art & UI design
            </li>
          </ul>
        </CardMotion>

        {/* 🔥 Learning (Uses CardMotion) */}
        <CardMotion
          delay={0.6}
          className="bg-white/80 backdrop-blur-xl rounded-xl border border-midcolor p-6 lg:col-span-2"
        >
          <div className="flex items-center mb-6">
            <Search className="w-6 h-6 mr-3 text-orange-600" />
            <h2 className="text-xl font-bold text-gray-900">
              Currently Learning
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Three.js & WebGL", "Next.js 14", "Advanced Animations"].map(
              (topic, i) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={topic}
                  className="bg-gradient-to-br from-orange-500/10 to-red-500/10 p-4 rounded-2xl text-center cursor-pointer"
                >
                  <span className="font-semibold text-gray-800">{topic}</span>
                </motion.div>
              )
            )}
          </div>
        </CardMotion>
      </div>
    </section>
  );
};

export default AboutComponent;