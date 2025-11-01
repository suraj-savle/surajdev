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
import MusicPlayer from "../components/ui/MusicPlayer";
import Footer from "../components/footer/Footer";
import AboutComponent from "../components/about/AboutComponent";

// Reusable Motion wrapper for fade-up animation
const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className={className}
  >
    {children}
  </motion.div>
);
const handleBackClick = () => {
  window.history.back();
};

const About = () => {
  return (
    <section className="max-w-6xl mx-auto relative min-h-screen py-10 overflow-hidden">
      <div className="mb-8 sm:mb-12">
        <button
          onClick={handleBackClick}
          className="group flex items-center gap-2 text-solid hover:text-midcolor transition-all duration-300  py-2 rounded-xl  backdrop-blur-sm border border-transparent hover:underline"
        >
          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Back</span>
        </button>
      </div>
      <AboutComponent />
      <Footer />
    </section>
  );
};

export default About;
