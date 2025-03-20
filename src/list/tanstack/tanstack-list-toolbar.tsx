import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { models, statuses, versions } from "@/data/mock/common";
import TanstackListFilter from "./tanstack-list-filter";
import { X } from "lucide-react";

interface TanstackListToolbarProps<TData> {
  table: Table<TData>;
}

function TanstackListToolbar<TData>({
  table,
}: TanstackListToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div
      data-testid="list-toolbar"
      className="flex gap-4 items-center justify-between px-6 py-3 border-b"
    >
      <div className="text-sm font-medium">Filter</div>
      <div className="flex flex-1 items-center space-x-2">
        {table.getColumn("status") && (
          <div data-testid="list-filter-status">
            <TanstackListFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
            />
          </div>
        )}
        {table.getColumn("version") && (
          <div data-testid="list-filter-version">
            <TanstackListFilter
              column={table.getColumn("version")}
              title="Version"
              options={versions}
            />
          </div>
        )}
        {table.getColumn("model") && (
          <div data-testid="list-filter-model">
            <TanstackListFilter
              column={table.getColumn("model")}
              title="Model"
              options={models}
            />
          </div>
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
            data-testid="list-filter-reset"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
export default TanstackListToolbar;
