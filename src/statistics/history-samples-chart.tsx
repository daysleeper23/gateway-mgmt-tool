import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { formatTimeUS } from "@/list/utils";
import { GatewayStatsSummary } from "@/data/types/gateway";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const HistorySamplesChart = ({
  historySamples,
}: {
  historySamples: GatewayStatsSummary[];
}) => {
  const sortedSamples = [...historySamples].sort(
    (a, b) => a.startTime - b.startTime,
  );
  const data = sortedSamples.map((sample, index) => ({
    time:
      index === sortedSamples.length - 1
        ? formatTimeUS(sample.endTime)
        : formatTimeUS(sample.startTime),
    ACTIVE: sample.timeInStatusesS.active,
    INACTIVE: sample.timeInStatusesS.inactive,
    UNSTABLE: sample.timeInStatusesS.unstable,
    OFFLINE: sample.timeInStatusesS.offline,
  }));

  const chartConfig = {
    ACTIVE: {
      label: "ACTIVE",
      color: "hsl(var(--chart-2))",
    },
    INACTIVE: {
      label: "INACTIVE",
      color: "hsl(var(--chart-5))",
    },
    UNSTABLE: {
      label: "UNSTABLE",
      color: "hsl(var(--chart-4))",
    },
    OFFLINE: {
      label: "OFFLINE",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const startDate = data[0].time;
  const endDate = data[data.length - 1].time;

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Gateway Status History</CardTitle>
        <CardDescription>
          Showing status history during the time period: {startDate} - {endDate}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[400px] w-full"
        >
          <AreaChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={(value) =>
                value.slice(value.length - 8, value.length - 3)
              }
              type="category"
              domain={["dataMin", "dataMax"]}
              name="Time"
            />
            <YAxis
              label={{ value: "Seconds", angle: -90, position: "insideLeft" }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              type="monotone"
              dataKey="ACTIVE"
              stackId="1"
              stroke="var(--color-ACTIVE)"
              fill="var(--color-ACTIVE)"
              fillOpacity={0.4}
              name="ACTIVE"
            />
            <Area
              type="monotone"
              dataKey="INACTIVE"
              stackId="1"
              stroke="var(--color-INACTIVE)"
              fill="var(--color-INACTIVE)"
              fillOpacity={0.4}
              name="INACTIVE"
            />
            <Area
              type="monotone"
              dataKey="UNSTABLE"
              stackId="1"
              stroke="var(--color-UNSTABLE)"
              fill="var(--color-UNSTABLE)"
              fillOpacity={0.4}
              name="UNSTABLE"
            />
            <Area
              type="monotone"
              dataKey="OFFLINE"
              stackId="1"
              stroke="var(--color-OFFLINE)"
              fill="var(--color-OFFLINE)"
              fillOpacity={0.4}
              name="OFFLINE"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
export default HistorySamplesChart;
