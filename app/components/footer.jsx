"use client";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function PortfolioFooter({ data }) {
  const year = new Date().getFullYear();
  if (!data) return null;

  return (
    <footer className="relative py-12 px-8" style={{ background: "#0c0c0c", borderTop: "1px solid rgba(247,247,245,0.06)" }}>
      {/* Gold top accent */}
      <div className="absolute top-0 left-8 w-8 h-px" style={{ background: "#c9a84c" }} />

      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.4em]" style={{ color: "rgba(247,247,245,0.5)" }}>
            {data.name || "Portfolio"}
            <span style={{ color: "#c9a84c" }}>.</span>
          </p>
          <p className="text-[9px] uppercase tracking-widest mt-1" style={{ color: "rgba(247,247,245,0.2)" }}>
            &copy; {year} All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          {data?.github && (
            <a href={data.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              style={{ color: "rgba(247,247,245,0.25)" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#f7f7f5"}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(247,247,245,0.25)"}>
              <FaGithub className="w-4 h-4" />
            </a>
          )}
          {data?.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              style={{ color: "rgba(247,247,245,0.25)" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#c9a84c"}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(247,247,245,0.25)"}>
              <FaLinkedin className="w-4 h-4" />
            </a>
          )}
          {data?.email && (
            <a href={`mailto:${data.email}`} aria-label="Email"
              style={{ color: "rgba(247,247,245,0.25)" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#c9a84c"}
              onMouseLeave={(e) => e.currentTarget.style.color = "rgba(247,247,245,0.25)"}>
              <FaEnvelope className="w-4 h-4" />
            </a>
          )}
        </div>

        <p className="text-[9px] uppercase tracking-[0.35em]" style={{ color: "rgba(247,247,245,0.15)" }}>
          Built with <span style={{ color: "#c9a84c" }}>Salience</span>
        </p>
      </div>
    </footer>
  );
}
