"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/hero-section";
import { UrlShortenerForm } from "@/components/url-shortener-form";
import { UrlList } from "@/components/url-list";
import { StatsCard } from "@/components/stats-card";
import { PricingSection } from "@/components/pricing-section";
import { FeaturesSection } from "@/components/features-section";
import { AnalyticsSection } from "@/components/analytics-section";
import { useDataContext } from "../providers/ContextProvider";

export default function Home() {
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [hasLinks, setHasLinks] = useState(false);
  const { userData, getUserData } = useDataContext();
  const user = "aditya"; // Replace with dynamic user if needed

  useEffect(() => {
    getUserData(user).then(() => {
      setHasLinks(userData.length > 0);
    });
  }, [refreshFlag, user]);

  const handleUrlShortened = () => {
    setRefreshFlag((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <div className="container mx-auto px-4 pb-16" id="api">
        <UrlShortenerForm onSuccess={handleUrlShortened} />
        <UrlList />
        {hasLinks && <StatsCard />}
      </div>

      <FeaturesSection />
      <PricingSection />
      <AnalyticsSection />
    </div>
  );
}
