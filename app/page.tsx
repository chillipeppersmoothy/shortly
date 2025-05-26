"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/hero-section";
import { UrlShortenerForm } from "@/components/url-shortener-form";
import { UrlList } from "@/components/url-list";
import { StatsCard } from "@/components/stats-card";
import { PricingSection } from "@/components/pricing-section";
import { FeaturesSection } from "@/components/features-section";
import { AnalyticsSection } from "@/components/analytics-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      <div className="container mx-auto px-4 pb-16" id="api">
        <UrlShortenerForm />
        <UrlList />
        <StatsCard />
      </div>

      <FeaturesSection />
      <PricingSection />
      <AnalyticsSection />
    </div>
  );
}
