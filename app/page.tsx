"use client";

import React from "react";
// Import the JSON that your deployment script pushes to the root
import portfolioData from "../profile.json"; 

import PortfolioNav from "./components/nav";
import PortfolioHero from "./components/hero";
import PortfolioAbout from "./components/about";
import PortfolioExperience from "./components/experience";
import PortfolioProjects from "./components/projects";
import PortfolioSkills from "./components/skills";
import PortfolioContact from "./components/contact";
import PortfolioFooter from "./components/footer";
import PortfolioCommunity from "./components/community";
import PortfolioEducation from "./components/education";

// No props here! Next.js needs a clean default export for pages.
export default function DeployedPortfolio() {
  const data = portfolioData;

  if (!data) return <div className="text-white p-10">Loading Portfolio...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white scroll-smooth">
      <PortfolioNav data={data} />
      <PortfolioHero data={data} />
      <PortfolioAbout data={data} />
      <PortfolioEducation data={data} />
      <PortfolioExperience data={data} />
      <PortfolioProjects data={data} />
      <PortfolioSkills data={data} />
      <PortfolioCommunity data={data} />
      <PortfolioContact data={data} />
      <PortfolioFooter data={data} />
    </div>
  );
}
