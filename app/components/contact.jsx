"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaEnvelope, FaGithub, FaLinkedin, FaCheckCircle, FaCircleNotch } from "react-icons/fa";

export default function PortfolioContact({ data }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const hasForm = !!data?.web3forms_key;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasForm) return;
    setStatus("loading");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...formData, access_key: data.web3forms_key, subject: `New Portfolio Message from ${formData.name}`, from_name: "Portfolio Contact Form", botcheck: "" }),
      });
      const result = await response.json();
      if (result.success) { setStatus("success"); setFormData({ name: "", email: "", message: "" }); setTimeout(() => setStatus("idle"), 5000); }
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const contactLinks = [
    { show: data?.email, icon: FaEnvelope, label: "Email", value: data?.email, href: `mailto:${data?.email}` },
    { show: data?.github, icon: FaGithub, label: "GitHub", value: "View Profile", href: data?.github },
    { show: data?.linkedin, icon: FaLinkedin, label: "LinkedIn", value: "Connect", href: data?.linkedin },
  ].filter(l => l.show);

  if (!hasForm && contactLinks.length === 0) return null;

  return (
    <section id="contact" className="relative py-32 px-8" style={{ background: "#0c0c0c" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(247,247,245,0.06)" }} />
      <div className="absolute top-0 left-8 w-8 h-px" style={{ background: "#c9a84c" }} />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }} className="lg:col-span-3">
            <span className="text-[9px] font-black uppercase tracking-[0.5em] block mb-2" style={{ color: "#c9a84c" }}>07</span>
            <h2 className="text-xs font-black uppercase tracking-[0.4em]" style={{ color: "rgba(247,247,245,0.2)" }}>Contact</h2>
            <div className="mt-6 w-8 h-px" style={{ background: "rgba(201,168,76,0.3)" }} />
          </motion.div>

          <div className={`lg:col-span-9 grid gap-12 ${hasForm ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 max-w-md"}`}>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}>
              {!hasForm && (
                <p className="text-2xl font-light mb-8 leading-relaxed"
                  style={{ color: "rgba(247,247,245,0.6)", letterSpacing: "-0.01em" }}>
                  Let us connect.
                </p>
              )}
              <div className="space-y-0">
                {contactLinks.map((link, i) => (
                  <a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center justify-between py-5 transition-all duration-200"
                    style={{ borderBottom: "1px solid rgba(247,247,245,0.06)" }}>
                    <div className="flex items-center gap-4">
                      <link.icon className="w-4 h-4" style={{ color: "#c9a84c" }} />
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.4em] mb-0.5"
                          style={{ color: "rgba(247,247,245,0.25)" }}>{link.label}</p>
                        <p className="text-sm font-black transition-colors duration-200 group-hover:text-[#c9a84c]"
                          style={{ color: "rgba(247,247,245,0.6)" }}>{link.value}</p>
                      </div>
                    </div>
                    <FaPaperPlane className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: "#c9a84c" }} />
                  </a>
                ))}
              </div>
            </motion.div>

            {hasForm && (
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {["name", "email"].map((field) => (
                    <div key={field}>
                      <label className="block text-[9px] font-black uppercase tracking-[0.4em] mb-2"
                        style={{ color: "rgba(247,247,245,0.25)" }}>
                        {field === "name" ? "Name" : "Email"}
                      </label>
                      <input name={field} type={field === "email" ? "email" : "text"}
                        value={formData[field]} onChange={handleChange} required
                        className="w-full py-3 text-sm text-white outline-none transition-all bg-transparent"
                        style={{ borderBottom: "1px solid rgba(247,247,245,0.15)" }}
                        onFocus={(e) => e.target.style.borderBottomColor = "#c9a84c"}
                        onBlur={(e) => e.target.style.borderBottomColor = "rgba(247,247,245,0.15)"} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[9px] font-black uppercase tracking-[0.4em] mb-2"
                      style={{ color: "rgba(247,247,245,0.25)" }}>Message</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={4}
                      className="w-full py-3 text-sm text-white outline-none transition-all bg-transparent resize-none"
                      style={{ borderBottom: "1px solid rgba(247,247,245,0.15)" }}
                      onFocus={(e) => e.target.style.borderBottomColor = "#c9a84c"}
                      onBlur={(e) => e.target.style.borderBottomColor = "rgba(247,247,245,0.15)"} />
                  </div>
                  <motion.button type="submit"
                    disabled={status === "loading" || status === "success"}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center gap-3 px-8 py-3.5 text-[10px] font-black uppercase tracking-widest transition-all disabled:opacity-50"
                    style={{ background: status === "success" ? "#16a34a" : "#c9a84c", color: "#0c0c0c" }}>
                    <AnimatePresence mode="wait">
                      {status === "loading" ? (
                        <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                          <FaCircleNotch className="w-3.5 h-3.5 animate-spin" /> Sending
                        </motion.span>
                      ) : status === "success" ? (
                        <motion.span key="s" initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex items-center gap-2">
                          <FaCheckCircle className="w-3.5 h-3.5" /> Sent
                        </motion.span>
                      ) : (
                        <motion.span key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                          Send Message <FaPaperPlane className="w-3 h-3" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
