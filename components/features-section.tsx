"use client";

import {
  BarChart3,
  Globe2,
  Link,
  QrCode,
  Shield,
  Smartphone,
  Clock,
  Share2,
  Settings,
} from "lucide-react";

const features = [
  {
    icon: Link,
    title: "URL Shortening",
    description:
      "Transform long URLs into concise, shareable links instantly with our powerful shortening engine.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Track clicks, monitor geographic data, and analyze user behavior with detailed insights.",
  },
  {
    icon: QrCode,
    title: "QR Code Generation",
    description:
      "Generate custom QR codes for your shortened URLs to bridge digital and physical marketing.",
  },
  {
    icon: Globe2,
    title: "Custom Domains",
    description:
      "Use your own branded domain for shortened links to maintain brand consistency.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level security with SSL encryption and advanced threat protection.",
  },
  {
    icon: Settings,
    title: "API Access",
    description:
      "Integrate URL shortening into your applications with our robust REST API.",
  },
  {
    icon: Clock,
    title: "Link Management",
    description:
      "Organize, edit, and manage all your shortened links from one dashboard.",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description:
      "Share your shortened links across any platform with one click.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Perfect viewing and sharing experience on any device.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-background" id="features">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Powerful features for powerful results
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to manage, track, and optimize your links
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
