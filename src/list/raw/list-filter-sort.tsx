import { Checkbox } from "@/components/ui/checkbox";
import { GatewayStore, useGatewayStore } from "@/data/store/gateway-store";

const ListFilterSort = () => {
  const sortByLastMessageRxTime = useGatewayStore(
    (state: GatewayStore) => state.sortByLastMessageRxTime,
  );

  const sortById = useGatewayStore((state: GatewayStore) => state.sortById);

  return (
    <div
      data-testid="list-filter-sort"
      className="px-6 py-3 flex border-b gap-4 w-full text-primary font-medium items-center"
    >
      <div className="ml-auto flex gap-1 items-center">
        <Checkbox
          data-testid="list-sort-ts-checkbox"
          onCheckedChange={(value) => {
            if (value) {
              sortByLastMessageRxTime();
            } else {
              sortById();
            }
          }}
        />
        <label className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Sort by Last Message Timestamp
        </label>
      </div>
    </div>
  );
};
export default ListFilterSort;
