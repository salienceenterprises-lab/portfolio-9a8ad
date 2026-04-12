"use client";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function PortfolioProjects({ data }) {
  if (!data?.projects?.length) return null;
  return (
    <section id="projects" className="relative py-32 px-8" style={{ background: "#0f0f0f" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(247,247,245,0.06)" }} />
      <div className="absolute top-0 left-8 w-8 h-px" style={{ background: "#c9a84c" }} />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }} className="lg:col-span-3">
            <span className="text-[9px] font-black uppercase tracking-[0.5em] block mb-2" style={{ color: "#c9a84c" }}>04</span>
            <h2 className="text-xs font-black uppercase tracking-[0.4em]" style={{ color: "rgba(247,247,245,0.2)" }}>Projects</h2>
            <div className="mt-6 w-8 h-px" style={{ background: "rgba(201,168,76,0.3)" }} />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(247,247,245,0.05)" }}>
          {data.projects.map((proj, i) => (
            <motion.div key={i}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative flex flex-col p-8 transition-all duration-300"
              style={{ background: "#0f0f0f" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#111111"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#0f0f0f"}>
              {/* Gold top line on hover */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "#c9a84c" }} />

              {proj.imageBase64 && (
                <div className="mb-6 overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <img src={proj.imageBase64} alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: "grayscale(40%)" }} />
                </div>
              )}

              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-[9px] font-black uppercase tracking-[0.4em]"
                  style={{ color: "rgba(201,168,76,0.5)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-3">
                  {proj.github && (
                    <a href={proj.github} target="_blank" rel="noopener noreferrer"
                      style={{ color: "rgba(247,247,245,0.2)" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "#f7f7f5"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "rgba(247,247,245,0.2)"}
                      onClick={(e) => e.stopPropagation()}>
                      <FaGithub className="w-4 h-4" />
                    </a>
                  )}
                  {proj.demo && (
                    <a href={proj.demo} target="_blank" rel="noopener noreferrer"
                      style={{ color: "rgba(247,247,245,0.2)" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "#c9a84c"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "rgba(247,247,245,0.2)"}
                      onClick={(e) => e.stopPropagation()}>
                      <FaExternalLinkAlt className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-black tracking-tight mb-3 transition-colors duration-200 group-hover:text-[#c9a84c]"
                style={{ color: "#f7f7f5", letterSpacing: "-0.02em" }}>
                {proj.title}
              </h3>
              <p className="text-sm leading-relaxed flex-grow mb-4" style={{ color: "rgba(247,247,245,0.4)" }}>
                {proj.description}
              </p>
              {proj.stack?.filter(t => t?.trim()).length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-4" style={{ borderTop: "1px solid rgba(247,247,245,0.05)" }}>
                  {proj.stack.filter(t => t?.trim()).map((tech) => (
                    <span key={tech} className="text-[9px] font-black uppercase tracking-wider px-2.5 py-1"
                      style={{ color: "rgba(201,168,76,0.6)", border: "1px solid rgba(201,168,76,0.15)" }}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
