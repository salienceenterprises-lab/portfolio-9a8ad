"use client";
import { motion } from "framer-motion";

export default function PortfolioExperience({ data }) {
  if (!data?.experience?.length) return null;
  return (
    <section id="experience" className="relative py-32 px-8" style={{ background: "#0c0c0c" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(247,247,245,0.06)" }} />
      <div className="absolute top-0 left-8 w-8 h-px" style={{ background: "#c9a84c" }} />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }} className="lg:col-span-3">
            <span className="text-[9px] font-black uppercase tracking-[0.5em] block mb-2" style={{ color: "#c9a84c" }}>03</span>
            <h2 className="text-xs font-black uppercase tracking-[0.4em]" style={{ color: "rgba(247,247,245,0.2)" }}>Experience</h2>
            <div className="mt-6 w-8 h-px" style={{ background: "rgba(201,168,76,0.3)" }} />
          </motion.div>

          <div className="lg:col-span-9 space-y-0">
            {data.experience.map((exp, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="py-8 group"
                style={{ borderBottom: "1px solid rgba(247,247,245,0.06)" }}>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                  <h3 className="text-xl font-black tracking-tight"
                    style={{ color: "#f7f7f5", letterSpacing: "-0.02em" }}>{exp.role}</h3>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] flex-shrink-0"
                    style={{ color: "#c9a84c" }}>{exp.period}</span>
                </div>
                <p className="text-xs font-black uppercase tracking-[0.3em] mb-4"
                  style={{ color: "rgba(247,247,245,0.3)" }}>
                  {exp.company}{exp.location ? ` — ${exp.location}` : ""}
                </p>
                {exp.description && (
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(247,247,245,0.45)" }}>{exp.description}</p>
                )}
                {exp.highlights?.filter(h => h?.trim()).length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {exp.highlights.filter(h => h?.trim()).map((h, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm" style={{ color: "rgba(247,247,245,0.4)" }}>
                        <span className="mt-2 w-1 h-1 flex-shrink-0 rounded-full" style={{ background: "#c9a84c" }} />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                {exp.stack?.filter(s => s?.trim()).length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: "1px solid rgba(247,247,245,0.05)" }}>
                    {exp.stack.filter(s => s?.trim()).map((s) => (
                      <span key={s} className="text-[9px] font-black uppercase tracking-wider px-3 py-1"
                        style={{ color: "rgba(201,168,76,0.7)", border: "1px solid rgba(201,168,76,0.2)" }}>
                        {s}
                      </span>
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
