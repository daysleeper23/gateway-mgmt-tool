import z from "zod";

export const mapStatusToNumeric = {
  ACTIVE: 4,
  UNSTABLE: 3,
  INACTIVE: 2,
  UNAVAILABLE: 1,
  OFFLINE: 0,
};

export const GatewayStatusEnum = z.enum([
  "ACTIVE",
  "UNSTABLE",
  "INACTIVE",
  "OFFLINE",
  "UNAVAILABLE",
]);
export type GatewayStatus = z.infer<typeof GatewayStatusEnum>;

export const GatewaySchema = z.object({
  uuid: z.string().uuid(),
  modificationTime: z.number().min(0),
  description: z.string().nonempty({ message: "Description cannot be empty." }),
  gatewayId: z.string(),
  networkUuid: z.string().uuid(),
  sinkNodes: z.array(z.string()),
  model: z.string(),
  version: z.string(),
  status: GatewayStatusEnum,
  gatewayStatistics: z.object({
    lastMessageRxTime: z.number(),
  }),
});
export type Gateway = z.infer<typeof GatewaySchema>;

export const GatewayTimeInStatusSchema = z.object({
  active: z.number().min(0),
  inactive: z.number().min(0),
  unstable: z.number().min(0),
  offline: z.number().min(0),
});
export type GatewayTimeInStatus = z.infer<typeof GatewayTimeInStatusSchema>;

export const GatewayStatusTransitionCountsSchema = z.object({
  activeToInactive: z.number().min(0),
  activeToUnstable: z.number().min(0),
  inactiveToOffline: z.number().min(0),
  inactiveToActive: z.number().min(0),
  unstableToActive: z.number().min(0),
  unstableToOffline: z.number().min(0),
  offlineToActive: z.number().min(0),
});
export type GatewayStatusTransitionCounts = z.infer<
  typeof GatewayStatusTransitionCountsSchema
>;

export const GatewayStatsSummarySchema = z.object({
  startTime: z.number().min(0),
  endTime: z.number().min(0),
  startTimeStatus: GatewayStatusEnum,
  endTimeStatus: GatewayStatusEnum,
  timeInStatusesS: GatewayTimeInStatusSchema,
  statusTransitionCounts: GatewayStatusTransitionCountsSchema,
});
export type GatewayStatsSummary = z.infer<typeof GatewayStatsSummarySchema>;

export const GatewayStatusChangeEventSchema = z.object({
  statusChangeTime: z.number(),
  status: GatewayStatusEnum,
});
export type GatewayStatusChangeEvent = z.infer<
  typeof GatewayStatusChangeEventSchema
>;

export const GatewayStatsSchema = z.object({
  snapshotTime: z.number().min(0),
  summary: GatewayStatsSummarySchema,
  historySamples: z.array(GatewayStatsSummarySchema),
  statusChangeEvents: z.array(GatewayStatusChangeEventSchema),
});
export type GatewayStats = z.infer<typeof GatewayStatsSchema>;
