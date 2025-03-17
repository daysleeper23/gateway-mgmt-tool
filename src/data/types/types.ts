import z from "zod";

export const GatewaySchema = z.object({
  uuid: z.string(),
  modificationTime: z.number(),
  description: z.string(),
  gatewayId: z.string(),
  networkUuid: z.string(),
  sinkNodes: z.array(z.string()),
  model: z.string(),
  version: z.string(),
  status: z.string(),
  gatewayStatistics: z.object({
    lastMessageRxTime: z.number(),
  }),
});
export type Gateway = z.infer<typeof GatewaySchema>;
