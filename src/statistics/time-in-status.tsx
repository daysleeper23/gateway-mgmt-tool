import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GatewayTimeInStatus } from "@/data/types/gateway";
import { formatNumber } from "@/list/utils";

const TimeInStatus = ({
  timeInStatuses,
}: {
  timeInStatuses: GatewayTimeInStatus;
}) => {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Time in Statuses (seconds)</CardTitle>
        <CardDescription>
          Total time in each status during the period
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-12">
        {Object.entries(timeInStatuses).map(([status, time]) => (
          <div key={status} className="flex flex-col">
            <p className="capitalize text-muted-foreground">{status}</p>
            <p className="text-2xl font-semibold">{formatNumber(time)}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
export default TimeInStatus;
