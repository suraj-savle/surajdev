import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import SplitText from "../ui/SplitText";
import { TbMenu } from "react-icons/tb";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/suraj-savle",
      icon: FiGithub,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/surajsavle",
      icon: FiLinkedin,
    },
    {
      name: "Email",
      url: "mailto:iamsurajsavle@gmail.com",
      icon: FiMail,
    },
  ];

  // Helper function to check active link
  const isActiveLink = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);


  // Prevent body scroll when mobile menu is open and Close menu on escape key
  useEffect(() => {
    // Body Scroll Management
    document.body.style.overflow = menuOpen ? "hidden" : "unset";

    // Escape Key Handler
    const handleEscape = (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Main Navbar: Z-index set to 40 */}
      <nav
        className={`relative top-0 left-0 w-full z-40 transition-all duration-500 font-inter overflow-hidden border-b border-solid/40 `}
      >
        <div className="py-2">
          <div className="flex items-center justify-between h-15 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className={`font-bebas-neue text-4xl sm:text-5xl lg:text-6xl mt-4 font-bold`}
              aria-label="Suraj - Home"
            >
              <SplitText
                text="SURAJ"
                delay={200}
                duration={0.8}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.5}
              />
            </Link>

            {/* Menu Button */}

            <button
              className={`flex items-center text-midcolor border border-midcolor/50 px-4 py-2 rounded-full text-base font-semibold transition-all duration-900 hover:bg-midcolor hover:text-background hover:border-midcolor lg:px-6 lg:py-2.5 `}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
               <TbMenu  size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Mobile Menu: Uses Tailwind CSS transition */}
      <div
        className={`fixed inset-0 w-full min-h-screen bg-background flex flex-col items-center justify-center p-6 z-50 
          transform transition-all duration-500 ease-in-out border-b-2 border-solid
          ${
            menuOpen
              ? "translate-y-0 opacity-100 visible pointer-events-auto"
              : "-translate-y-full opacity-0 invisible pointer-events-none"
          }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 md:top-6 right-4 md:right-20 flex items-center space-x-3 text-solid hover:text-background border border-solid px-4 py-2 rounded-full text-2xl font-semibold transition-all duration-300 hover:bg-solid hover:border-background lg:px-6 lg:py-2.5"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <FiX size={20} />
        </button>

        {/* Navigation Links Container */}
        <ul className="flex flex-col items-center justify-center space-y-1 w-full">
          {navLinks.map((link, index) => (
            <li key={link.name} className="w-full text-center border-b border-midcolor/20">
              <Link
                to={link.path}
                className={`inline-block w-full py-6 text-3xl sm:text-4xl lg:text-5xl font-extrabold transition-all duration-300  uppercase ${
                  isActiveLink(link.path)
                    ? "text-black scale-110"
                    : "text-solid  hover:scale-110"
                }`}
                onClick={() => setMenuOpen(false)}
                // Optional: Add a simple staggered transition using CSS delay
                style={{
                  transitionDelay: menuOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Media Links */}
        <div className="flex flex-col items-center space-y-6 mt-8">
          <div className="w-24 h-px bg-background/30 mb-4"></div>
          <p className="text-solid text-lg font-semibold mb-4">
            Connect with me
          </p>
          <div className="flex space-x-6">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center w-12 h-12 bg-background/10 rounded-full text-solid hover:text-background border border-solid transition-all duration-300 hover:scale-110 hover:bg-solid hover:border-background/40 `}
                  aria-label={`Visit ${social.name}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    transitionDelay: menuOpen
                      ? `${(navLinks.length + index) * 50}ms`
                      : "0ms",
                  }}
                >
                  <IconComponent size={24} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
