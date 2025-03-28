import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  GatewayStatusTransitionCounts,
  mapStatusToChartColor,
} from "@/data/types/gateway";
import { CircleSmall } from "lucide-react";

const StatusTransitions = ({
  statusTransitionCounts,
}: {
  statusTransitionCounts: GatewayStatusTransitionCounts;
}) => {
  const formatTransitionString = (transition: string) => {
    const [from, to] = transition.split("To");
    const fromColorIndex =
      mapStatusToChartColor[
        from.toUpperCase() as keyof typeof mapStatusToChartColor
      ];
    const toColorIndex =
      mapStatusToChartColor[
        to.toUpperCase() as keyof typeof mapStatusToChartColor
      ];

    return {
      from: (
        <div className="flex items-center gap-2">
          <CircleSmall
            stroke={`${fromColorIndex}`}
            fill={`${fromColorIndex}`}
          />
          {from.toUpperCase()}
        </div>
      ),
      to: (
        <div className="flex items-center gap-2">
          <CircleSmall stroke={`${toColorIndex}`} fill={`${toColorIndex}`} />
          {to.toUpperCase()}
        </div>
      ),
    };
  };

  return (
    <Card className="shadow-none rounded-sm">
      <CardHeader>
        <CardTitle>Status Transition Counts</CardTitle>
        <CardDescription>Number of status change per type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>No. of changes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(statusTransitionCounts).map(
                ([transition, count]) => (
                  <TableRow key={transition}>
                    <TableCell>
                      {formatTransitionString(transition).from}
                    </TableCell>
                    <TableCell>
                      {formatTransitionString(transition).to}
                    </TableCell>
                    <TableCell>{count}</TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
export default StatusTransitions;
