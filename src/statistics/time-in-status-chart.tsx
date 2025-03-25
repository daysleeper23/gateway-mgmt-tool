"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { GatewayTimeInStatus } from "@/data/types/gateway"
import { formatNumber } from "@/list/utils"

const chartConfig = {
  time: {
    label: "Time",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig

const TimeInStatusChart = ({
  timeInStatuses,
}: {
  timeInStatuses: GatewayTimeInStatus;
}) => {
  const chartData = Object.entries(timeInStatuses).map(([status, time]) => ({
    status,
    time,
  }));
  const maxTime = Math.max(...chartData.map((item) => item.time));

  return (
    <Card className="shadow-none rounded-sm">
      <CardHeader>
        <CardTitle>Time in Statuses</CardTitle>
        <CardDescription>Total time in each status during the period</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="status"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis dataKey="time" type="number" domain={[0, maxTime * 1.2]} hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="time"
              layout="vertical"
              fill="var(--color-time)"
              radius={4}
            >
              <LabelList
                dataKey="status"
                position="left"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="time"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
                formatter={(value: number) => formatNumber(value)}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          The gateway was in offline mode for a total of 27 hours and 30 minutes <TrendingDown className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total time in each status for the last 3 days
        </div>
      </CardFooter>
    </Card>
  )
}
export default TimeInStatusChart;