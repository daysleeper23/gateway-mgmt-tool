import { Button } from "@/components/ui/button";
import { Gateway } from "@/data/types/gateway";
import { formatTimeUS } from "@/list/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { TanstackListRowAction } from "./tanstack-list-row-action";


const RESPONSIVE_CLASSES = {
  HIDE_ON_EXTRA_SMALL: "hidden sm:table-cell",
  HIDE_ON_SMALL: "hidden md:table-cell",
  HIDE_ON_MEDIUM: "hidden lg:table-cell",
  TRUNCATE: "truncate",
  CAPITALIZE: "capitalize",
} as const;

const COLUMN_SIZES = {
  GATEWAY_ID: "w-40",
  DESCRIPTION: "w-28 lg:w-40",
  STATUS: "w-16",
  MODEL: "w-32",
  VERSION: "w-24",
  LAST_MESSAGE: "w-40",
} as const;

export const columns: ColumnDef<Gateway>[] = [
  {
    accessorKey: "gatewayId",
    header: () => <div className={`pl-4 ${COLUMN_SIZES.GATEWAY_ID} ${RESPONSIVE_CLASSES.TRUNCATE}`}>Gateway ID</div>,
    cell: ({ row }) => (
      <div className={`pl-4 ${COLUMN_SIZES.GATEWAY_ID} ${RESPONSIVE_CLASSES.TRUNCATE}`}>{row.getValue("gatewayId")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div className={`${COLUMN_SIZES.DESCRIPTION} ${RESPONSIVE_CLASSES.TRUNCATE} ${RESPONSIVE_CLASSES.HIDE_ON_MEDIUM}`}>Description</div>,
    cell: ({ row }) => <div className={`${COLUMN_SIZES.DESCRIPTION} ${RESPONSIVE_CLASSES.TRUNCATE} ${RESPONSIVE_CLASSES.HIDE_ON_MEDIUM}`}>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className={`${RESPONSIVE_CLASSES.CAPITALIZE} ${COLUMN_SIZES.STATUS}`}>Status</div>,
    cell: ({ row }) => (
      <div className={`${RESPONSIVE_CLASSES.CAPITALIZE} ${COLUMN_SIZES.STATUS}`}>{row.getValue("status")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "model",
    header: () => <div className={`${RESPONSIVE_CLASSES.CAPITALIZE} ${COLUMN_SIZES.MODEL} ${RESPONSIVE_CLASSES.TRUNCATE} ${RESPONSIVE_CLASSES.HIDE_ON_MEDIUM}`}>Model</div>,
    cell: ({ row }) => (
      <div className={`${RESPONSIVE_CLASSES.CAPITALIZE} ${COLUMN_SIZES.MODEL} ${RESPONSIVE_CLASSES.TRUNCATE} ${RESPONSIVE_CLASSES.HIDE_ON_MEDIUM}`}>{row.getValue("model")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "version",
    header: () => <div className={`${RESPONSIVE_CLASSES.CAPITALIZE} ${COLUMN_SIZES.VERSION} ${RESPONSIVE_CLASSES.HIDE_ON_SMALL}`}>Version</div>,
    cell: ({ row }) => (
      <div className={`${RESPONSIVE_CLASSES.CAPITALIZE} ${COLUMN_SIZES.VERSION} ${RESPONSIVE_CLASSES.HIDE_ON_SMALL}`}>{row.getValue("version")}</div>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "sinkNodes",
    header: () => <div className={RESPONSIVE_CLASSES.HIDE_ON_SMALL}>Sink</div>,
    cell: ({ row }) => (
      <div className={RESPONSIVE_CLASSES.HIDE_ON_SMALL}>
        {row.original.sinkNodes.length +
          " node" +
          (row.original.sinkNodes.length === 1 ? "" : "s")}
      </div>
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
          className={`-ml-6 hidden sm:flex ${COLUMN_SIZES.LAST_MESSAGE}`}
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Message
          {column.getIsSorted() === "asc" ? <ArrowUp /> : <ArrowDown />}
        </Button>
      );
    },
    cell: ({ getValue }) => {
      return (
        <div className={`${COLUMN_SIZES.LAST_MESSAGE} ${RESPONSIVE_CLASSES.CAPITALIZE} ${COLUMN_SIZES.LAST_MESSAGE} ${RESPONSIVE_CLASSES.TRUNCATE} ${RESPONSIVE_CLASSES.HIDE_ON_EXTRA_SMALL}`}>{formatTimeUS(getValue() as number)}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TanstackListRowAction uuid={row.original.uuid} />,
    enableHiding: false,
    size: 50,
    enableSorting: false,
    enableColumnFilter: false,
  },
];
