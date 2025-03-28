import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { models, statuses, versions } from "@/data/mock/common";
import TanstackListFilter from "./tanstack-list-filter";
import { X } from "lucide-react";

// Define a type for filter configurations
interface FilterConfig {
  id: string;
  title: string;
  options: Array<{
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
}

interface TanstackListToolbarProps<TData> {
  table: Table<TData>;

  // enable external configuration for filters
  filters?: FilterConfig[];
}

function TanstackListToolbar<TData>({
  table,
  filters = [
    { id: "status", title: "Status", options: statuses },
    { id: "version", title: "Version", options: versions },
    { id: "model", title: "Model", options: models },
  ],
}: TanstackListToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const totalRowCount = table.getCoreRowModel().rows.length;
  const filteredRowCount = table.getFilteredRowModel().rows.length;

  return (
    <div
      data-testid="list-toolbar"
      className="flex gap-4 items-center justify-between px-6 py-3 border-b flex-wrap"
    >
      <div className="text-sm font-medium hidden sm:block">Filter</div>
      <div className="flex flex-1 items-center gap-2 flex-wrap">
        {filters.map((filter) => {
          const column = table.getColumn(filter.id);
          if (!column) return null;

          return (
            <div key={filter.id} data-testid={`list-filter-${filter.id}`}>
              <TanstackListFilter
                column={column}
                title={filter.title}
                options={filter.options}
              />
            </div>
          );
        })}

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

      <div
        className="text-sm text-muted-foreground"
        data-testid="list-row-count"
      >
        {isFiltered
          ? `${filteredRowCount} of ${totalRowCount} items`
          : `${totalRowCount} items`}
      </div>
    </div>
  );
}
export default TanstackListToolbar;
