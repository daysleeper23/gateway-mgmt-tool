import { GatewayStore, useGatewayStore } from "@/data/store/gateway-store";
import React from "react";

const ListRow = React.memo(({ gatewayUuid }: { gatewayUuid: string }) => {
  const gateway = useGatewayStore((state: GatewayStore) =>
    state.getGateway(gatewayUuid),
  )!;

  const lastMessageRxTime = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).format(new Date(gateway.gatewayStatistics.lastMessageRxTime * 1000));

  return (
    <div
      key={gateway.uuid}
      data-testid="list-row"
      className="px-6 py-3 flex border-b gap-4 w-full hover:bg-muted/40 text-primary/80 text-sm"
    >
      <div className="w-48">{gateway.gatewayId}</div>
      <div>{gateway.description}</div>

      <div className="ml-auto flex gap-4">
        <div className="w-28">{gateway.status}</div>
        <div className="w-40">{gateway.model}</div>
        <div className="w-20">{gateway.version}</div>
        <div className="w-36">{lastMessageRxTime}</div>
      </div>
    </div>
  );
});
export default ListRow;
