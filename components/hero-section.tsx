import { Button } from "@/components/ui/button";
import { LinkIcon } from "lucide-react";

export function HeroSection() {
  const handleNavClick = (id: string) => {
    const ele = document.getElementById(id);
    if (ele) {
      ele.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative overflow-hidden py-24 sm:py-32 md:py-40 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 z-[-1]" />

      <div className="absolute top-[-10%] right-[20%] w-[40%] h-[40%] bg-primary/5 rounded-full filter blur-3xl" />
      <div className="absolute bottom-[-5%] left-[10%] w-[30%] h-[30%] bg-chart-2/5 rounded-full filter blur-3xl" />

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-6xl sm:min-h-[80px] bg-clip-text text-transparent bg-gradient-to-r from-primary to-chart-2">
          Simplify your links
        </h1>

        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Create short, memorable links that redirect to your long URLs. Track
          clicks, generate QR codes, and manage all your links in one place.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button
            size="lg"
            className="px-8 py-6 text-lg"
            onClick={() => handleNavClick("api")}
          >
            <LinkIcon className="h-5 w-5" />
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-lg"
            onClick={() => handleNavClick("features")}
          >
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
