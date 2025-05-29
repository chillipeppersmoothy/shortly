/* eslint-disable react-hooks/exhaustive-deps */
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
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const [hasLinks, setHasLinks] = useState(false);
  const { userData, updateUserDetails } = useDataContext();
  const { user, isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    setHasLinks(userData.length > 0);
  }, [userData]);

  useEffect(() => {
    if (!user || !user.username || !user.fullName) return;

    updateUserDetails({
      fullName: user.fullName,
      username: user.username,
      isLoaded,
      isSignedIn: isSignedIn ?? false,
    });
  }, [user, isSignedIn, isLoaded]);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <div className="container mx-auto px-4 pb-16" id="api">
        <UrlShortenerForm />
        <UrlList />
        {hasLinks && <StatsCard />}
      </div>

      <FeaturesSection />
      <PricingSection />
      <AnalyticsSection />
    </div>
  );
}
