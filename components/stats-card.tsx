"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Link2, MousePointerClick, TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDataContext } from "../providers/ContextProvider";

const generateChartData = () => {
  const data = [];
  const now = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);

    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      clicks: Math.floor(Math.random() * 25) + 5,
    });
  }

  return data;
};

export function StatsCard() {
  const [totalUrls, setTotalUrls] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [chartData, setChartData] = useState(generateChartData());
  const { userData } = useDataContext();

  useEffect(() => {
    setTotalUrls(userData.length);
    const clicks = userData.reduce((total, url) => total + url.clicks, 0);
    setTotalClicks(clicks);
    setConversionRate(userData.length > 0 ? clicks / userData.length : 0);
  }, [userData]);

  return (
    <Card className="w-full max-w-3xl mx-auto mt-8 overflow-hidden">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Link Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-primary/20 dark:bg-primary/10 p-2 rounded-full">
              <Link2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Links</p>
              <p className="text-2xl font-bold">{totalUrls}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-chart-1/20 dark:bg-chart-1/10 p-2 rounded-full">
              <MousePointerClick className="h-5 w-5 text-chart-1" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Clicks</p>
              <p className="text-2xl font-bold">{totalClicks}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-chart-2/20 dark:bg-chart-2/10 p-2 rounded-full">
              <TrendingUp className="h-5 w-5 text-chart-2" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Clicks/Link</p>
              <p className="text-2xl font-bold">{conversionRate.toFixed(1)}</p>
            </div>
          </div>
        </div>

        <div className="h-[200px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted/30"
              />
              <XAxis dataKey="date" className="text-xs text-muted-foreground" />
              <YAxis className="text-xs text-muted-foreground" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
                labelStyle={{ fontWeight: "bold" }}
              />
              <Area
                type="monotone"
                dataKey="clicks"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#colorClicks)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
