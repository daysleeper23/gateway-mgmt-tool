import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatTimeHourMinute24, formatTimeUS } from "@/list/utils";
import { TrendingUpDown } from "lucide-react";

export type StatusChangeCountDataPoint = {
  time: number | string;
  count: number;
};

const chartConfig = {
  count: {
    label: "No. of changes",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function StatusTransitionCountChart({
  chartData,
}: {
  chartData: StatusChangeCountDataPoint[];
}) {
  const startDate = formatTimeUS(chartData[0].time as number);
  const endDate = formatTimeUS(chartData[chartData.length - 1].time as number);

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Status Transitions</CardTitle>
        <CardDescription>
          {startDate} - {endDate}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[320px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => formatTimeHourMinute24(value)}
            />
            <YAxis
              dataKey="count"
              tickLine={true}
              axisLine={true}
              domain={[0, (dataMax: number) => dataMax + 1]}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="count"
              type="linear"
              stroke="var(--color-count)"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          The gateway is not very stable during the selected period{" "}
          <TrendingUpDown className="w-4 h-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing transitions between statuses of the gateway
        </div>
      </CardFooter>
    </Card>
  );
}
