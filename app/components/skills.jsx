"use client";
import { motion } from "framer-motion";

export default function PortfolioSkills({ data }) {
  if (!data?.skills?.length) return null;

  return (
    <section id="skills" className="relative py-32 px-8 overflow-hidden" style={{ background: "#0c0c0c" }}>
      {/* Editorial Background Watermark */}
      <div className="absolute -bottom-10 right-10 text-[12rem] font-black opacity-[0.02] pointer-events-none select-none"
        style={{ color: "#c9a84c", lineHeight: 0.8 }}>
        SKLLS
      </div>

      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(247,247,245,0.06)" }} />
      
      {/* Animated Top Header Accent */}
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "32px" }}
        viewport={{ once: true }}
        className="absolute top-0 left-8 h-px" 
        style={{ background: "#c9a84c", boxShadow: "0 0 10px #c9a84c" }} 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Sidebar Label Column */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.5 }} 
            className="lg:col-span-3"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] block mb-2" style={{ color: "#c9a84c" }}>05</span>
            <h2 className="text-xs font-black uppercase tracking-[0.4em]" style={{ color: "rgba(247,247,245,0.2)" }}>Tech_Stack</h2>
            <div className="mt-6 w-8 h-px" style={{ background: "rgba(201,168,76,0.3)" }} />
            
            <div className="mt-10 p-4 border border-[rgba(201,168,76,0.1)] bg-[rgba(201,168,76,0.02)]">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] leading-relaxed" style={{ color: "rgba(247,247,245,0.3)" }}>
                Total_Modules: <span style={{ color: "#c9a84c" }}>{data.skills.length}</span><br />
                Status: <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>Active_Scan</motion.span>
              </p>
            </div>
          </motion.div>

          {/* Skills Grid */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-0">
              {data.skills.map((skill, i) => (
                <motion.div 
                  key={`${skill}-${i}`}
                  initial={{ opacity: 0, x: -10 }} 
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} 
                  transition={{ duration: 0.4, delay: i * 0.02 }}
                  whileHover={{ x: 8 }} // Subtle magnetic pull
                  className="group flex items-center justify-between py-4 border-b border-[rgba(247,247,245,0.05)] cursor-crosshair"
                >
                  <div className="flex items-center gap-4">
                    {/* Animated Square Marker */}
                    <motion.div 
                      animate={{ 
                        rotate: [0, 90, 0],
                        scale: [1, 1.2, 1],
                        backgroundColor: ["#c9a84c", "rgba(201,168,76,0.2)", "#c9a84c"]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                      className="w-1.5 h-1.5 flex-shrink-0"
                    />
                    
                    <span className="text-sm font-black uppercase tracking-widest transition-all duration-300 group-hover:text-white"
                      style={{ color: "rgba(247,247,245,0.5)" }}>
                      {skill}
                    </span>
                  </div>

                  {/* Hover Detail: Skill Index */}
                  <span className="text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: "#c9a84c", fontFamily: "monospace" }}>
                    [{String(i + 1).padStart(2, '0')}]
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
