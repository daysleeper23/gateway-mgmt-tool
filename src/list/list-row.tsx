import { GatewayStore, useGatewayStore } from "@/data/store/gateway-store";

const ListRow = ({ gatewayUuid }: { gatewayUuid: string }) => {
  const gateway = useGatewayStore((state: GatewayStore) =>
    state.getGateway(gatewayUuid),
  )!;

  return (
    <div
      key={gateway.uuid}
      data-testid="list-row"
      className="p-6 flex border-b gap-4 w-full hover:bg-secondary text-primary/80 text-sm"
    >
      <div className="w-48">{gateway.gatewayId}</div>
      <div>{gateway.description}</div>

      <div className="ml-auto flex gap-4">
        <div className="w-32">{gateway.status}</div>
        <div className="w-40">{gateway.model}</div>
        <div className="w-20">{gateway.version}</div>
      </div>
    </div>
  );
};
export default ListRow;
