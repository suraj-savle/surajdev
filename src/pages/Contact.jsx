import { ArrowLeftIcon, MessageCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ContactComponent from "../components/contact/ContactComponent";
import Footer from "../components/footer/Footer";

const Contact = () => {
  const handleBackClick = () => {
    window.history.back();
  };

  return (
    <div className="py-5 max-w-6xl mx-auto relative z-10">
      <div className="mb-8 sm:mb-5">
        <button
          onClick={handleBackClick}
          className="group flex items-center gap-2 text-solid hover:text-midcolor transition-all duration-300  py-2 rounded-xl  backdrop-blur-sm border border-transparent hover:underline"
        >
          <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      <ContactComponent />
      <Footer />
    </div>
  );
};

export default Contact;
