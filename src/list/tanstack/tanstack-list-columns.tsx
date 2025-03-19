import { Button } from "@/components/ui/button";
import { Gateway } from "@/data/types/gateway";
import { FormEdit } from "@/form-edit/form-edit";
import { formatTimeUS } from "@/list/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChartLine, SquarePen } from "lucide-react";
import { useNavigate } from "react-router";

export const columns: ColumnDef<Gateway>[] = [
  {
    accessorKey: "gatewayId",
    header: "Gateway ID",
    cell: ({ row }) => (
      <div className="w-40 truncate">{row.getValue("gatewayId")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="capitalize w-20">Status</div>,
    cell: ({ row }) => (
      <div className="capitalize w-20">{row.getValue("status")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => (
      <div className="capitalize w-32 truncate">{row.getValue("model")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "version",
    header: "Version",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("version")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "lastMessageRxTime",
    accessorFn: (row: Gateway) => row.gatewayStatistics?.lastMessageRxTime,
    header: ({ column }) => {
      return (
        <Button
          data-testid="list-sort-last-message"
          className="-ml-3"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Message Timestamp
          {column.getIsSorted() === "asc" ? <ArrowUp /> : <ArrowDown />}
        </Button>
      );
    },
    cell: ({ getValue }) => {
      return (
        <div className="capitalize">{formatTimeUS(getValue() as number)}</div>
      );
    },
  },
  {
    id: "edit",
    cell: ({ row }) => {
      return (
        <FormEdit
          uuid={row.original.uuid}
          trigger={
            <Button className="cursor-pointer" variant="ghost">
              <SquarePen />
              Edit
            </Button>
          }
        />
      );
    },
  },
  {
    id: "stats",
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <Button
          className="cursor-pointer"
          variant="outline"
          onClick={() => navigate(`/${row.original.uuid}`)}
        >
          <ChartLine />
          Stats
        </Button>
      );
    },
  },
];
