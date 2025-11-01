import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Floating3DBackground = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const shapes = [
    { size: 200, color: "from-blue-500 to-purple-500", delay: 0 },
    { size: 150, color: "from-pink-500 to-orange-500", delay: 0.2 },
    { size: 250, color: "from-teal-400 to-cyan-500", delay: 0.4 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${shape.color} opacity-30 blur-3xl`}
          style={{
            width: shape.size,
            height: shape.size,
            top: `${20 + i * 30}%`,
            left: `${10 + i * 25}%`,
          }}
          animate={{
            x: mouse.x * (50 + i * 20),
            y: mouse.y * (50 + i * 20),
            scale: 1 + mouse.x * 0.05,
          }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  );
};

export default Floating3DBackground;
