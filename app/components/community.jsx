"use client";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function PortfolioCommunity({ data }) {
  const items = data?.community;
  if (!items?.length) return null;

  return (
    <section id="community" className="relative py-32 px-8 overflow-hidden" style={{ background: "#0f0f0f" }}>
      {/* Background Decorative Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-black opacity-[0.015] pointer-events-none select-none"
        style={{ color: "#c9a84c", letterSpacing: "-0.05em" }}>
        IMPACT
      </div>

      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(247,247,245,0.06)" }} />
      
      {/* Pulse Accent */}
      <motion.div 
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-0 left-8 w-8 h-px" 
        style={{ background: "#c9a84c", boxShadow: "0 0 10px #c9a84c" }} 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Label Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6 }} 
            className="lg:col-span-3"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.5em] block mb-2" style={{ color: "#c9a84c" }}>06</span>
            <h2 className="text-xs font-black uppercase tracking-[0.4em]" style={{ color: "rgba(247,247,245,0.2)" }}>Impact_Logs</h2>
            <div className="mt-6 w-8 h-px" style={{ background: "rgba(201,168,76,0.3)" }} />
            
            {/* Live Counter Style */}
            <div className="mt-8 flex items-baseline gap-2">
              <span className="text-2xl font-black" style={{ color: "rgba(247,247,245,0.1)" }}>{items.length}</span>
              <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: "rgba(201,168,76,0.4)" }}>Records_Found</span>
            </div>
          </motion.div>

          {/* Impact List */}
          <div className="lg:col-span-9 space-y-0">
            {items.map((item, i) => {
              if (!item) return null;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }} 
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-20px" }} 
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative flex items-start justify-between gap-8 py-10"
                  style={{ borderBottom: "1px solid rgba(247,247,245,0.06)" }}
                >
                  {/* Hover Slide-in Background */}
                  <motion.div 
                    className="absolute inset-y-0 left-[-20px] right-[-20px] bg-[rgba(201,168,76,0.02)] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  />

                  <div className="flex-1 min-w-0 relative z-10">
                    <div className="flex items-center gap-4 mb-2">
                      {/* Active Status Dot */}
                      <motion.span 
                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0" 
                        style={{ background: "#c9a84c" }} 
                      />
                      
                      <h3 className="text-lg font-black uppercase tracking-tight transition-all duration-300 group-hover:tracking-wider group-hover:text-white"
                        style={{ color: "#f7f7f5", letterSpacing: "-0.01em" }}>
                        {item.role || "Contributor"}
                      </h3>
                    </div>

                    <div className="ml-5.5 pl-0.5">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 transition-colors group-hover:text-[#c9a84c]"
                        style={{ color: "rgba(201,168,76,0.6)" }}>
                        {item.organization || "Community Initiative"}
                      </p>
                      
                      {item.description && (
                        <p className="text-base leading-relaxed max-w-2xl transition-colors group-hover:text-[rgba(247,247,245,0.6)]" 
                          style={{ color: "rgba(247,247,245,0.4)" }}>
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* External Link with Magnetic Feel */}
                  {item.link && (
                    <motion.a 
                      href={item.link} target="_blank" rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      className="flex-shrink-0 p-3 rounded-full border border-transparent hover:border-[rgba(201,168,76,0.2)] hover:bg-[rgba(201,168,76,0.05)] transition-all"
                      style={{ color: "rgba(247,247,245,0.2)" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "#c9a84c"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "rgba(247,247,245,0.2)"}
                    >
                      <FaExternalLinkAlt className="w-4 h-4" />
                    </motion.a>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
