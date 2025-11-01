import { motion } from "framer-motion";
import { Code, Palette, Smartphone, Zap, Database, Cloud } from "lucide-react";
import MyStack from "../about/MyStack";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Frontend Development",
      description:
        "Building responsive and high-performance user interfaces with modern web technologies.",
      features: [
        "React.js / Next.js",
        "Tailwind CSS",
        "Component-Based Architecture",
        "SEO Optimization",
      ],
      color: "from-blue-500 to-cyan-500",
      delay: 0.1,
    },
    {
      icon: Database,
      title: "Backend Development",
      description:
        "Creating secure, efficient, and scalable backend solutions with RESTful APIs.",
      features: [
        "Node.js / Express.js",
        "MongoDB",
        "Authentication",
        "Error Handling",
      ],
      color: "from-green-500 to-emerald-500",
      delay: 0.2,
    },
    {
      icon: Cloud,
      title: "Deployment & Hosting",
      description:
        "Deploying and managing web applications with reliable cloud infrastructure.",
      features: [
        "Vercel / Netlify",
        "Render / Railway",
        "CI/CD Setup",
        "Environment Management",
      ],
      color: "from-indigo-500 to-purple-500",
      delay: 0.5,
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interface design",
      features: [
        "Figma Prototyping",
        "User Research",
        "Design Systems",
        "User Testing",
      ],
      color: "from-orange-500 to-red-500",
      delay: 0.4,
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Speed optimization and performance enhancement",
      features: [
        "Lighthouse Optimization",
        "Bundle Analysis",
        "Caching",
        "CDN Setup",
      ],
      color: "from-yellow-500 to-amber-500",
      delay: 0.6,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const ServiceCard = ({ service }) => {
    const IconComponent = service.icon;

    return (
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="border border-solid rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 group"
      >
        <div
          className={`w-14 h-14 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
        >
          <IconComponent className="w-7 h-7 text-white" />
        </div>

        <h3 className="text-xl font-bold text-solid mb-3">{service.title}</h3>
        <p className="text-midcolor/90 text-sm leading-relaxed mb-4">
          {service.description}
        </p>

        <ul className="space-y-2">
          {service.features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center text-sm text-midcolor/80"
            >
              <div className="w-1.5 h-1.5 bg-current rounded-full mr-3" />
              {feature}
            </li>
          ))}
        </ul>
      </motion.div>
    );
  };

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
          <h1>SERVICES</h1>
        </motion.div>
      </motion.div>

      {/* Services Section */}
      <motion.section
        className="w-full max-w-6xl py-1"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </motion.div>
      </motion.section>
    </section>
  );
};

export default Services;
