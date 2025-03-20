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
import SelectMultiple from "@/components/ui/select-multiple";
import { toast } from "sonner";

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
  const gateway = useGatewayStore((state) => state.getGateway(uuid))!;
  const updateGateway = useGatewayStore((state) => state.updateGateway);
  const sinkNodesOptions = useGatewayStore((state) => state.sinkNodes);

  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      description: gateway.description,
      sinkNodes: gateway.sinkNodes,
    },
  });

  const onSubmit = (values: z.infer<typeof editFormSchema>) => {
    if (
      form.getValues().description === gateway.description &&
      form.getValues().sinkNodes.toString() === gateway.sinkNodes.toString()
    ) {
      toast.info("Gateway data is the same as before. No changes have been made.");
      onClose();
      return;
    }

    try {
      updateGateway({ ...gateway, ...values });
      onClose();
      toast.success("Gateway updated successfully.");
    } catch (error) {
      toast.error("Failed to update gateway.");
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
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

            <FormField
              control={form.control}
              name="sinkNodes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sink Nodes</FormLabel>
                  <FormControl>
                    <SelectMultiple
                      title="Select sink nodes..."
                      options={sinkNodesOptions}
                      value={field.value}
                      onChange={field.onChange}
                      data-testid="form-edit-sink-nodes"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                data-testid="form-edit-submit"
                type="submit"
                disabled={
                  form.getValues().description === gateway.description &&
                  form.getValues().sinkNodes === gateway.sinkNodes
                }
              >
                Save
              </Button>
              <Button
                data-testid="form-edit-cancel"
                type="button"
                variant="outline"
                onClick={onClose}
              >
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
