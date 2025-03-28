import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { formatTimeUS } from "@/list/utils";
import {
  GatewayStatsSummary,
  mapStatusToChartColor,
} from "@/data/types/gateway";
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
    ACTIVE: sample.timeInStatusesS.active || 0,
    INACTIVE: sample.timeInStatusesS.inactive || 0,
    UNSTABLE: sample.timeInStatusesS.unstable || 0,
    OFFLINE: sample.timeInStatusesS.offline || 0,
  }));

  const chartConfig = {
    ACTIVE: {
      label: "ACTIVE",
      color: mapStatusToChartColor.ACTIVE,
    },
    INACTIVE: {
      label: "INACTIVE",
      color: mapStatusToChartColor.INACTIVE,
    },
    UNSTABLE: {
      label: "UNSTABLE",
      color: mapStatusToChartColor.UNSTABLE,
    },
    OFFLINE: {
      label: "OFFLINE",
      color: mapStatusToChartColor.OFFLINE,
    },
  } satisfies ChartConfig;

  const startDate = data[0].time;
  const endDate = data[data.length - 1].time;

  return (
    <Card className="shadow-none rounded-sm">
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
            {
              Object.entries(chartConfig).map(([key, value]) => (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stackId="1"
                  stroke={value.color}
                  fill={value.color}
                  fillOpacity={0.4}
                  name={value.label}
                />
              ))
            }
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
export default HistorySamplesChart;
