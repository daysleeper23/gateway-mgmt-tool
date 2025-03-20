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
import { GatewayStatusTransitionCounts } from "@/data/types/gateway";

const StatusTransitions = ({
  statusTransitionCounts,
}: {
  statusTransitionCounts: GatewayStatusTransitionCounts;
}) => {
  return (
    <Card className="shadow-none rounded-sm">
      <CardHeader>
        <CardTitle>Status Transition Counts</CardTitle>
        <CardDescription>Number of status change per type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead>Transition</TableHead>
                <TableHead>Count</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(statusTransitionCounts).map(
                ([transition, count]) => (
                  <TableRow key={transition}>
                    <TableCell>{transition}</TableCell>
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
