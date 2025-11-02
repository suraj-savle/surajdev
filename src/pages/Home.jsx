import React from "react";
import Hero from "../components/home/Hero";
import Navbar from "../components/Navigation/Navbar";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import ContactComponent from "../components/contact/ContactComponent";
import Services from "../components/services/Services";
import ScrollToTop from "../components/ui/ScrollToTop";
import Footer from "../components/footer/Footer";
import AboutComponent from "../components/about/AboutComponent";
import ProjectComponent from "../components/services/ProjectComponent";
import MyStack from "../components/about/MyStack";

function Home() {
  return (
    <div className=" overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="hidden lg:block fixed top-[70%] left-[-6rem] rotate-90 z-20"
      >
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=iamsurajsavle@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-solid tracking-wider text-xl hover:underline"
        >
          iamsurajsavle@gmail.com
        </a>
      </motion.div>
      <Navbar />
      <Hero />
      <AboutComponent />
      <Services />
      <MyStack />
      <ProjectComponent />
      <ContactComponent />
      <Footer />
      <ScrollToTop />
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="hidden lg:block fixed right-6 bottom-0 transform -translate-y-1/2 z-20"
      >
        <ul className="flex flex-col gap-4 text-2xl text-solid">
          <li>
            <a
              href="https://www.instagram.com/codebys"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-midcolor transition-colors"
            >
              <FaInstagram />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/surajsavle"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-midcolor transition-colors"
            >
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/suraj-savle"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-midcolor transition-colors"
            >
              <FaGithub />
            </a>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

export default Home;
