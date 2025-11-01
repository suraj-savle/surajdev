import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";

const ContactComponent = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("iamsurajsavle@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const socialLinks = [
    {
      icon: Github,
      name: "GitHub",
      url: "https://github.com/suraj-savle",
      username: "@suraj-savle",
    },
    {
      icon: Linkedin,
      name: "LinkedIn",
      url: "https://linkedin.com/in/surajsavle",
      username: "in/surajsavle",
    },
  ];

  return (
    <section className="min-h-fit flex items-start justify-center py-8 ">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start mb-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-solid text-4xl md:text-6xl font-black uppercase mb-10"
          >
            <h1>contact</h1>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Email Copy Component */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="border rounded-2xl p-6 text-center"
          >
            <Mail className="w-12 h-12 text-solid mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-solid mb-3">Email Me</h3>
            <p className="text-midcolor/80 text-sm mb-6">
              Copy my email address to get in touch directly
            </p>
            <motion.button
              onClick={copyEmail}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-solid px-6 py-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-5 h-5 solid" />
                  <span className="text-lg">Copied to clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span className="text-lg">iamsurajsalve@gmail.com</span>
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Connect With Me Component */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="border rounded-2xl p-6"
          >
            <h3 className="text-xl font-semibold text-solid mb-6 text-center">
              Connect With Me
            </h3>
            <div className="space-y-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center justify-between p-4  border-b text-midcolor transition-all duration-300 group`}
                  >
                    <div className="flex items-center gap-4">
                      <IconComponent className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium text-base">
                          {social.name}
                        </div>
                        <div className="text-solid text-sm">
                          {social.username}
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="text-center mt-12 sm:mt-16">
            <p className="text-gray-600 text-sm sm:text-base">
              Prefer a quick chat?{" "}
              <a
                href="mailto:suraj@savle.com"
                className="text-solid font-medium underline underline-offset-2"
              >
                Send me an email
              </a>{" "}
              and I'll respond within hours.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactComponent;
