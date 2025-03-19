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
import { useState } from "react";

const editFormSchema = GatewaySchema.pick({
  description: true,
  sinkNodes: true,
});

export type GatewayEdit = z.infer<typeof editFormSchema>;
interface FormEditProps {
  uuid: string;
  trigger: React.ReactNode;
}

export const FormEdit = ({ uuid, trigger }: FormEditProps) => {
  const [open, setOpen] = useState(false);

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
    console.log(values);
    updateGateway({ ...gateway, ...values });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
