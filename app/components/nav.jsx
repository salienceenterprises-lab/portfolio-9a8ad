"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaDownload } from "react-icons/fa";

export default function PortfolioNav({ data }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [mobileOpen, setMobileOpen] = useState(false);
  if (!data) return null;

  const allNavLinks = [
    { label: "About",      href: "#about",      key: "about" },
    { label: "Education",  href: "#education",  key: "education" },
    { label: "Experience", href: "#experience", key: "experience" },
    { label: "Projects",   href: "#projects",   key: "projects" },
    { label: "Skills",     href: "#skills",     key: "skills" },
    { label: "Impact",     href: "#community",  key: "community" },
    { label: "Contact",    href: "#contact",    key: "email" },
  ];

  const activeLinks = allNavLinks.filter((link) => {
    if (link.label === "About") return true;
    const d = data?.[link.key];
    return Array.isArray(d) ? d.length > 0 : !!d;
  });

  useEffect(() => {
    const sectionIds = activeLinks.map((l) => l.href.replace("#", ""));
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sorted = sectionIds
        .map((id) => ({ id, top: document.getElementById(id)?.offsetTop ?? Infinity }))
        .filter((s) => s.top !== Infinity)
        .sort((a, b) => a.top - b.top);
      for (let i = sorted.length - 1; i >= 0; i--) {
        if (window.scrollY >= sorted[i].top - 130) { setActiveSection(sorted[i].id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  return (
    <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(12,12,12,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(247,247,245,0.06)" : "none",
      }}>
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        <a href="#about" onClick={(e) => go(e, "#about")}
          className="text-xs font-black uppercase tracking-[0.4em]"
          style={{ color: "#f7f7f5" }}>
          {data.name || "Portfolio"}
          <span style={{ color: "#c9a84c" }}>.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {activeLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}
                className="relative text-[10px] font-black uppercase tracking-[0.3em] transition-colors duration-200"
                style={{ color: isActive ? "#f7f7f5" : "rgba(247,247,245,0.3)" }}>
                {link.label}
                {isActive && (
                  <motion.div layoutId="md-indicator" className="absolute -bottom-0.5 left-0 right-0 h-px"
                    style={{ background: "#c9a84c" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                )}
              </a>
            );
          })}
          {(data?.resumeBase64 || data?.resume) && (
            <a href={data.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : "/resume.pdf"}
              download className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all"
              style={{ border: "1px solid rgba(201,168,76,0.4)", color: "#c9a84c" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(201,168,76,0.08)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
              <FaDownload className="w-2.5 h-2.5" /> Resume
            </a>
          )}
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden"
          style={{ color: "rgba(247,247,245,0.5)" }}>
          {mobileOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden px-8 pb-6 pt-2 overflow-hidden"
            style={{ background: "rgba(12,12,12,0.99)", borderBottom: "1px solid rgba(247,247,245,0.06)" }}>
            {activeLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}
                className="block py-3 text-xs font-black uppercase tracking-[0.3em] border-b transition-colors"
                style={{ color: "rgba(247,247,245,0.4)", borderColor: "rgba(247,247,245,0.05)" }}>
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
