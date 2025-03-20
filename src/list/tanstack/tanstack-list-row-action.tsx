import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChartLine, Ellipsis, SquarePen } from "lucide-react";
import { useNavigate } from "react-router";
import { lazy, useState } from "react";

const FormEdit = lazy(() => import("@/form-edit/form-edit"));

interface TanstackListRowActionProps {
  uuid: string;
}

export function TanstackListRowAction({ uuid }: TanstackListRowActionProps) {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            data-testid="list-row-action-trigger"
          >
            <Ellipsis className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="inline-flex flex-col"
          data-testid="list-row-action-dropdown"
        >
          <DropdownMenuItem onSelect={() => setIsFormOpen(true)}>
            <SquarePen />
            Edit Gateway
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem onSelect={() => navigate(`/${uuid}`)}>
            {" "}
            <ChartLine /> Gateway Statistics
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Render FormEdit outside the DropdownMenu */}
      {isFormOpen && (
        <FormEdit
          uuid={uuid}
          trigger={null}
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </>
  );
}
