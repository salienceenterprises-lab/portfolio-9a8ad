"use client";
import { motion } from "framer-motion";

export default function PortfolioAbout({ data }) {
  if (!data?.bio) return null;

  return (
    <section id="about" className="relative py-32 px-8 overflow-hidden" style={{ background: "#0c0c0c" }}>
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-[0.02]" 
        style={{ backgroundImage: "repeating-linear-gradient(90deg, #c9a84c 0px, #c9a84c 1px, transparent 1px, transparent 40px)" }} />
      
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(247,247,245,0.06)" }} />
      
      {/* Animated top accent */}
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "32px" }}
        viewport={{ once: true }}
        className="absolute top-0 left-8 h-px" 
        style={{ background: "#c9a84c" }} 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column — Editorial Label */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6 }} 
            className="lg:col-span-3"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.5em]" style={{ color: "#c9a84c" }}>01</span>
            </div>
            <h2 className="text-xs font-black uppercase tracking-[0.4em]"
              style={{ color: "rgba(247,247,245,0.2)" }}>About_Me</h2>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-6 w-8 h-px origin-left" 
              style={{ background: "rgba(201,168,76,0.5)" }} 
            />
          </motion.div>

          {/* Right Column — Content */}
          <div className="lg:col-span-9">
            {/* Bio Text with "Line-by-Line" feel */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} 
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-2xl lg:text-3xl leading-relaxed mb-16 font-light"
              style={{ color: "rgba(247,247,245,0.85)", letterSpacing: "-0.02em" }}
            >
              {data.bio}
            </motion.p>

            {/* Info Grid with Hover Interaction */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 pt-12 relative"
              style={{ borderTop: "1px solid rgba(247,247,245,0.1)" }}>
              
              {[
                { label: "Name", value: data.name },
                { label: "Role", value: data.title },
                { label: "Email", value: data.email },
              ].filter(i => i.value).map((item, idx) => (
                <motion.div 
                  key={item.label} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} 
                  transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
                  whileHover={{ y: -5 }} // Interactive nudge
                  className="group cursor-default"
                >
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] mb-3 transition-colors duration-300 group-hover:text-white"
                    style={{ color: "#c9a84c" }}>
                    {item.label}
                  </p>
                  <p className="text-sm font-medium transition-colors duration-300 group-hover:text-[rgba(247,247,245,1)]" 
                    style={{ color: "rgba(247,247,245,0.5)" }}>
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Vertical Watermark */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.03 }}
        className="absolute bottom-10 left-10 pointer-events-none select-none hidden lg:block"
        style={{ 
          fontSize: "120px", 
          fontWeight: 900, 
          color: "#f7f7f5", 
          writingMode: "vertical-rl",
          transform: "rotate(180deg)"
        }}
      >
        INFO
      </motion.div>
    </section>
  );
}
