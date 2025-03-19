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
} from "@/components/ui/chart";
import { mapStatusToNumeric } from "@/data/types/gateway";
import { formatTimeHourMinute24, formatTimeUS } from "@/list/utils";
import { TrendingUpDown } from "lucide-react";

export type StatusChangeDataPoint = {
  time: number | string;
  status: number;
};

const chartConfig = {
  status: {
    label: "Status",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function StatusTransitionChart({
  chartData,
}: {
  chartData: StatusChangeDataPoint[];
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
        <ChartContainer config={chartConfig}>
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
              dataKey="status"
              tickLine={true}
              axisLine={true}
              domain={[0, 4.5]}
              ticks={[0, 1, 2, 3, 4]}
              tickFormatter={(value) => {
                return (
                  Object.keys(mapStatusToNumeric).find(
                    (key) =>
                      mapStatusToNumeric[
                        key as keyof typeof mapStatusToNumeric
                      ] === value,
                  ) || ""
                );
              }}
            />
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Line
              dataKey="status"
              type="step"
              stroke="var(--color-status)"
              strokeWidth={3}
              dot={true}
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

import { TooltipProps } from "recharts";

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const statusValue = payload[0].value as number;

    const statusLabel =
      Object.keys(mapStatusToNumeric).find(
        (key) =>
          mapStatusToNumeric[key as keyof typeof mapStatusToNumeric] ===
          statusValue,
      ) || "Unknown";

    return (
      <div className="border-border/50 bg-background grid min-w-[8rem] items-start gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs shadow-xl">
        <p className="text-xs font-medium flex gap-1.5">
          <strong>Status:</strong> {statusLabel}
        </p>
        <p className="text-xs font-medium flex gap-1.5">
          <strong>Time:</strong> {formatTimeUS(payload[0].payload.time)}
        </p>
      </div>
    );
  }

  return null;
};
