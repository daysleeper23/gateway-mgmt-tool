import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGatewayStore } from "@/data/store/gateway-store";
import { GatewayStatus, mapStatusToNumeric } from "@/data/types/gateway";
import { formatTimeUS } from "@/list/utils";
import { useNavigate, useParams } from "react-router";
import TimeInStatus from "./time-in-status";
import StatusTransitions from "./status-transition-count";
import { StatusTransitionChart } from "./status-transition-chart";
import HistorySamplesChart from "./history-samples-chart";
import { Button } from "@/components/ui/button";

const StatisticsView = () => {
  const navigate = useNavigate();
  const uuid = useParams<{ uuid: string }>().uuid!;
  const gateway = useGatewayStore((state) => state.getGateway(uuid));
  if (!gateway) {
    return (
      <div className="flex flex-col flex-1 h-full w-full gap-4 items-center justify-center bg-gray-50">
        <h1>Gateway not found!</h1>
        <Button
          onClick={() => navigate("/")}
        >
          Go back
        </Button>
      </div>
    )
  }
  
  const {
    snapshotTime,
    summary: {
      startTime,
      startTimeStatus,
      endTime,
      endTimeStatus,
      timeInStatusesS,
      statusTransitionCounts,
    },
    historySamples,
    statusChangeEvents,
  } = useGatewayStore((state) => state.gatewayStat);

  const statusTransitionChartData = statusChangeEvents
    .map((event) => ({
      time: event.statusChangeTime,
      status: mapStatusToNumeric[event.status],
    }))
    .sort((a, b) => a.time - b.time);

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <h1 className="text-lg font-bold">Device UUID: </h1>
          <h1 className="text-lg">{uuid}</h1>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <p className="text-lg font-semibold">Snapshot Time:</p>
          <p className="text-muted-foreground">{formatTimeUS(snapshotTime)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatusCard
          startTime={startTime}
          endTime={endTime}
          startTimeStatus={startTimeStatus}
          endTimeStatus={endTimeStatus}
        />
        <TimeInStatus timeInStatuses={timeInStatusesS} />
        <div className="space-y-4">
          <StatusTransitions statusTransitionCounts={statusTransitionCounts} />
        </div>

        <StatusTransitionChart chartData={statusTransitionChartData} />
      </div>

      <HistorySamplesChart historySamples={historySamples} />
    </div>
  );
};
export default StatisticsView;

interface SummaryStatusProps {
  label: string;
  status: string;
  time: number;
}

const SummaryStatus = ({ label, status }: SummaryStatusProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div key={status} className="flex flex-col">
        <p className="capitalize text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{status}</p>
      </div>
    </div>
  );
};

const StatusCard = ({
  startTime,
  endTime,
  startTimeStatus,
  endTimeStatus,
}: {
  startTime: number;
  endTime: number;
  startTimeStatus: GatewayStatus;
  endTimeStatus: GatewayStatus;
}) => {
  return (
    <Card data-testid="statistics-view-summary" className="shadow-none">
      <CardHeader>
        <CardTitle>Status</CardTitle>
        <CardDescription>
          Period: {formatTimeUS(startTime)} - {formatTimeUS(endTime)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <SummaryStatus
            label="Start"
            status={startTimeStatus}
            time={startTime}
          />
          <SummaryStatus label="End" status={endTimeStatus} time={endTime} />
        </div>
      </CardContent>
    </Card>
  );
};
