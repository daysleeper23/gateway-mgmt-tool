import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatTimeUS } from "@/list/utils";

const DeviceInfo = ({
  uuid,
  snapshotTime,
}: {
  uuid: string;
  snapshotTime: number;
}) => {
  return (
    <Card className="shadow-none rounded-sm">
      <CardHeader>
        <CardTitle>Device Info</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col">
          <p className="text-muted-foreground font-medium">UUID</p>
          <p className="text-lg lg:text-xl xl:text-2xl font-semibold">{uuid}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-muted-foreground font-medium">Snapshot Time</p>
          <p className="text-lg lg:text-xl xl:text-2xl font-semibold">{formatTimeUS(snapshotTime)}</p>
        </div>
      </CardContent>
    </Card>
  );
};
export default DeviceInfo;
