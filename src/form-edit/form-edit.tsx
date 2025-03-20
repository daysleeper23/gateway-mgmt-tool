import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GatewaySchema } from "@/data/types/gateway";
import { useGatewayStore } from "@/data/store/gateway-store";

const editFormSchema = GatewaySchema.pick({
  description: true,
  sinkNodes: true,
});

export type GatewayEdit = z.infer<typeof editFormSchema>;
interface FormEditProps {
  uuid: string;
  trigger: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const FormEdit = ({ uuid, trigger, open, onClose }: FormEditProps) => {
  // const [isOpen, setIsOpen] = useState(open);

  const gateway = useGatewayStore((state) => state.getGateway(uuid))!;
  const updateGateway = useGatewayStore((state) => state.updateGateway);

  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      description: gateway.description,
      sinkNodes: gateway.sinkNodes,
    },
  });

  const onSubmit = (values: z.infer<typeof editFormSchema>) => {
    updateGateway({ ...gateway, ...values });
    // setIsOpen(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        // setIsOpen(value);
        onClose();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent data-testid="form-edit" className="sm:max-w-[768px]">
        <DialogHeader>
          <DialogTitle>Edit Gateway</DialogTitle>
          <DialogDescription>
            Make changes to your gateway here.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Write a short description..."
                      {...field}
                      data-testid="form-edit-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button data-testid="form-edit-submit" type="submit">
                Save
              </Button>
              <Button data-testid="form-edit-cancel" type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default FormEdit;
