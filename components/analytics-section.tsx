import { Card, CardContent } from "@/components/ui/card";
import { Globe2, Users2, Link2, MousePointerClick } from "lucide-react";

const stats = [
  {
    icon: Users2,
    value: "2M+",
    label: "Active Users",
    description: "Monthly active users trust our platform",
  },
  {
    icon: Link2,
    value: "50M+",
    label: "Links Shortened",
    description: "URLs shortened and managed through our platform",
  },
  {
    icon: MousePointerClick,
    value: "1B+",
    label: "Monthly Clicks",
    description: "Link clicks tracked and analyzed each month",
  },
  {
    icon: Globe2,
    value: "190+",
    label: "Countries",
    description: "Global reach across countries and territories",
  },
];

export function AnalyticsSection() {
  return (
    <section className="py-24 bg-muted">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Trusted by millions worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Join the millions of users who trust Shortify for their link
            management needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="border-none bg-background/50 backdrop-blur"
            >
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="font-medium mb-1">{stat.label}</div>
                  <p className="text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
