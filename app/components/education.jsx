"use client";
import { motion } from "framer-motion";

export default function PortfolioEducation({ data }) {
  if (!data?.education?.length) return null;

  return (
    <section id="education" className="relative py-32 px-8 overflow-hidden" style={{ background: "#0f0f0f" }}>
      {/* Editorial Background Element */}
      <div className="absolute top-0 right-10 text-[10rem] font-black opacity-[0.02] pointer-events-none select-none"
        style={{ color: "#f7f7f5", lineHeight: 1 }}>
        02
      </div>
      
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(247,247,245,0.06)" }} />
      
      {/* Animated Header Accent */}
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "32px" }}
        viewport={{ once: true }}
        className="absolute top-0 left-8 h-px" 
        style={{ background: "#c9a84c" }} 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Section Label */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] block mb-2" style={{ color: "#c9a84c" }}>02</span>
            <h2 className="text-xs font-black uppercase tracking-[0.4em]" style={{ color: "rgba(247,247,245,0.2)" }}>Education</h2>
            <div className="mt-6 w-8 h-px" style={{ background: "rgba(201,168,76,0.3)" }} />
          </motion.div>

          {/* Education List */}
          <div className="lg:col-span-9 space-y-0">
            {data.education.map((edu, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }} 
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="py-10 group relative"
                style={{ borderBottom: "1px solid rgba(247,247,245,0.06)" }}
              >
                {/* Hover Accent Line */}
                <motion.div 
                  className="absolute left-[-2rem] top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: "linear-gradient(to bottom, #c9a84c, transparent)" }}
                />

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-4 mb-4">
                  <motion.h3 
                    whileHover={{ x: 5 }}
                    className="text-2xl font-black tracking-tight transition-colors duration-300"
                    style={{ color: "#f7f7f5", letterSpacing: "-0.02em" }}
                  >
                    {edu.degree}
                  </motion.h3>
                  
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] px-3 py-1 border border-[rgba(201,168,76,0.2)]"
                    style={{ color: "#c9a84c", background: "rgba(201,168,76,0.03)" }}>
                    {edu.period}
                  </span>
                </div>

                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-3"
                  style={{ color: "rgba(247,247,245,0.4)" }}>
                  <span className="w-4 h-px bg-[rgba(201,168,76,0.4)]" />
                  {edu.institution}{edu.location ? ` — ${edu.location}` : ""}
                </p>

                {edu.description && (
                  <p className="text-base leading-relaxed mb-6 max-w-2xl" 
                    style={{ color: "rgba(247,247,245,0.45)" }}>
                    {edu.description}
                  </p>
                )}

                {/* Achievements with staggered reveal */}
                {edu.achievements?.filter(a => a?.trim()).length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2">
                    {edu.achievements.filter(a => a?.trim()).map((a, j) => (
                      <motion.div 
                        key={j} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (j * 0.05) }}
                        className="flex items-start gap-3 text-sm group/item" 
                        style={{ color: "rgba(247,247,245,0.4)" }}
                      >
                        <motion.span 
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: j * 0.5 }}
                          className="mt-2 w-1 h-1 flex-shrink-0 rounded-full bg-[#c9a84c]" 
                        />
                        <span className="group-hover/item:text-[rgba(247,247,245,0.8)] transition-colors">
                          {a}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
