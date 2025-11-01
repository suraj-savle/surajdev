import React from "react";

const Footer = () => {
  return (
    <footer className="py-10 px-1 text-center text-solid">
      <div className="container mx-auto">
        <p className="text-sm">
          Have a project in mind? Let's build something great together.
        </p>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=iamsurajsavle@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-solid font-black text-2xl md:text-5xl hover:underline"
        >
          <h1>iamsurajsavle@gmail.com</h1>
        </a>
        <p className="mt-2 text-midcolor text-sm">
          All Rights Reserved by suraj savle © {new Date().getFullYear()}{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;