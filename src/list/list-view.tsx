import { useGatewayStore } from "@/data/store/gateway-store";
import { Gateway } from "@/data/types/types";
import ListRow from "./list-row";
import ListHeader from "./list-header";

const ListView = () => {
  const gateways = useGatewayStore(
    (state: { gateways: Gateway[] }) => state.gateways,
  );

  return (
    <>
      <ListHeader />
      <div data-testid="list-view" className="flex-1 overflow-y-auto relative">
        <div className="flex-1 flex flex-col relative">
          {gateways.map((gateway) => {
            return <ListRow key={gateway.uuid} gatewayUuid={gateway.uuid} />;
          })}
        </div>
      </div>
    </>
  );
};
export default ListView;
