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
import { useParams } from "react-router";
import TimeInStatus from "./time-in-status";
import StatusTransitions from "./status-transition-count";
import { StatusTransitionChart } from "./status-transition-chart";
import HistorySamplesChart from "./history-samples-chart";
import DeviceInfo from "./device-info";
import NotFoundView from "@/layout/404";

const StatisticsView = () => {
  const uuid = useParams<{ uuid: string }>().uuid!;
  const gateway = useGatewayStore((state) => state.getGateway(uuid));
  if (!gateway) {
    return <NotFoundView />;
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
    <div className="bg-gray-50 flex-1 gap-4 flex flex-col overflow-y-auto p-4">
      <DeviceInfo uuid={uuid} snapshotTime={snapshotTime} />

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
    <Card
      data-testid="statistics-view-summary"
      className="shadow-none rounded-sm"
    >
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
