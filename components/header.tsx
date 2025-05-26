"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { LinkIcon } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 flex justify-center ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <LinkIcon className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Smal.ly</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => handleNavClick("features")}>
            Features
          </Button>
          <Button variant="outline" onClick={() => handleNavClick("pricing")}>
            Pricing
          </Button>
          <Button variant="outline" onClick={() => handleNavClick("api")}>
            API
          </Button>
          <ModeToggle />
          <SignedOut>
            <Button asChild variant="outline" id="trigger-sign-in">
              <SignInButton />
            </Button>
            <Button asChild>
              <SignUpButton />
            </Button>
          </SignedOut>
          <Button asChild>
            <SignedIn>
              <UserButton showName />
            </SignedIn>
          </Button>
        </div>
      </div>
    </header>
  );
}
