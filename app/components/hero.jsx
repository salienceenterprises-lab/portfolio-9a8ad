"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";

export default function PortfolioHero({ data }) {
  if (!data) return null;
  const hasPhoto = !!data?.heroImageBase64;

  // Parallax Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  };

  return (
    <section 
      id="hero" 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-end overflow-hidden" 
      style={{ background: "#0c0c0c" }}
    >
      {/* Background Animated Gradient Orb */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)" }} />

      <div className="absolute top-0 bottom-0 left-[55%] w-px hidden lg:block pointer-events-none"
        style={{ background: "rgba(247,247,245,0.05)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "rgba(247,247,245,0.08)" }} />
      
      {/* Gold Accent */}
      <div
        className="absolute top-0 left-0 w-24 h-px"
        style={{ background: "#c9a84c", boxShadow: "0 0 15px rgba(201,168,76,0.5)" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8 pb-20 pt-32 w-full">
        <div className={hasPhoto ? "grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-20 items-end" : ""}>
          <div className="relative z-20">
            {/* Label with stagger animation */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-12">
              <span className="text-[9px] font-black uppercase tracking-[0.6em] flex overflow-hidden" style={{ color: "#c9a84c" }}>
                {"Portfolio".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: "100%" }} 
                className="flex-1 h-px" 
                style={{ background: "rgba(201,168,76,0.3)" }} 
              />
            </motion.div>

            {/* Name Container */}
            <div className="mb-6 flex flex-col items-start">
              {(data.name || "YOUR NAME").split(" ").map((word, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }} animate={{ y: 0 }}
                    whileHover={{ x: 10 }} // Interactive hover nudge
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="block font-black uppercase leading-[0.9] cursor-default select-none"
                    style={{
                      fontSize: "clamp(3rem, 10vw, 7.5rem)",
                      letterSpacing: "-0.04em",
                      color: i === 0 ? "#f7f7f5" : "transparent",
                      WebkitTextStrokeWidth: i === 0 ? "0" : "1px",
                      WebkitTextStrokeColor: i === 0 ? "transparent" : "rgba(247,247,245,0.25)",
                      whiteSpace: "nowrap"
                    }}>
                    {word}
                  </motion.div>
                </div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-5 mb-6">
              <div
                className="w-8 h-px"
                style={{ background: "#c9a84c" }}
              />
              <span className="text-xs font-black uppercase tracking-[0.4em]"
                style={{ color: "rgba(247,247,245,0.5)" }}>
                {data.title || "Professional Title"}
              </span>
            </motion.div>

            {data.sloganHeroSection && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.6 }}
                className="text-base leading-relaxed mb-10 max-w-sm"
                style={{ color: "rgba(247,247,245,0.35)", fontStyle: "italic" }}>
                "{data.sloganHeroSection}"
              </motion.p>
            )}

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="flex flex-wrap items-center gap-5">
              {(data?.resumeBase64 || data?.resume) && (
                <motion.a 
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(201,168,76,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  href={data.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : "/resume.pdf"}
                  download className="inline-flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all"
                  style={{ background: "#c9a84c", color: "#0c0c0c" }}>
                  <FaDownload className="w-3 h-3" /> Resume
                </motion.a>
              )}
              <div className="flex items-center gap-5">
                {[
                  { icon: FaGithub, href: data?.github, color: "#f7f7f5" },
                  { icon: FaLinkedin, href: data?.linkedin, color: "#c9a84c" }
                ].map((social, i) => social.href && (
                  <motion.a 
                    key={i}
                    whileHover={{ y: -5, color: social.color }}
                    href={social.href} target="_blank" rel="noopener noreferrer"
                    style={{ color: "rgba(247,247,245,0.25)", transition: "color 0.2s" }}>
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {hasPhoto && (
            <motion.div 
              style={{ rotateX, rotateY, perspective: 1000 }}
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.9, delay: 0.4 }}
              className="hidden lg:block self-end justify-self-end group"
            >
              <div className="relative">
                {/* Interactive corner that expands on hover */}
                <motion.div 
                  whileHover={{ scale: 1.2, x: 5, y: -5 }}
                  className="absolute -top-4 -right-4 w-12 h-12 pointer-events-none z-20"
                  style={{ borderTop: "1px solid #c9a84c", borderRight: "1px solid #c9a84c" }} 
                />
                
                <div className="overflow-hidden relative">
                   <motion.img 
                    src={data.heroImageBase64} alt={data.name}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-xs object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-500"
                    style={{ aspectRatio: "3/4", objectPosition: "center top" }} 
                  />
                  {/* Subtle scanline overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-10" 
                    style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "100% 4px" }} 
                  />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "rgba(201,168,76,0.4)" }} />
              </div>
            </motion.div>
          )}
        </div>

        {/* Animated Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 right-8 flex items-center gap-3"
        >
          <div className="w-8 h-px bg-white/10" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Scroll</span>
        </motion.div>
      </div>
    </section>
  );
}
