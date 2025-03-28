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
  mapStatusToNumeric,
} from "@/data/types/gateway";
import { CircleSmall } from "lucide-react";

const StatusTransitions = ({
  statusTransitionCounts,
}: {
  statusTransitionCounts: GatewayStatusTransitionCounts;
}) => {
  const formatTransitionString = (transition: string) => {
    const [from, to] = transition.split("To");
    const fromColorIndex = 5 -
      mapStatusToNumeric[
        from.toUpperCase() as keyof typeof mapStatusToNumeric
      ];
    const toColorIndex = 5 - 
      mapStatusToNumeric[to.toUpperCase() as keyof typeof mapStatusToNumeric];

    return {
      from: (
        <div className="flex items-center gap-2">
          <CircleSmall
            stroke={`hsl(var(--chart-${fromColorIndex}))`}
            fill={`hsl(var(--chart-${fromColorIndex}))`}
          />
          {from.toUpperCase()}
        </div>
      ),
      to: (
        <div className="flex items-center gap-2">
          <CircleSmall
            stroke={`hsl(var(--chart-${toColorIndex}))`}
            fill={`hsl(var(--chart-${toColorIndex}))`}
          />
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
                  <TableCell>{formatTransitionString(transition).to}</TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
export default StatusTransitions;
