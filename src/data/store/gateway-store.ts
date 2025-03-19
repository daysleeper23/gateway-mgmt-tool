import { create } from "zustand";
import { Gateway, GatewayStats } from "../types/gateway";
import gateways from "@/data/mock/gateway_listing_response.json";
import gatewayStat from "@/data/mock/single_gateway_stats.json";

export interface GatewayStore {
  gatewayStat: GatewayStats;
  gateways: Gateway[];
  sinkNodes: string[];
  getGateway: (uuid: string) => Gateway | undefined;
  updateGateway: (gateway: Gateway) => void;
  sortByLastMessageRxTime: () => void;
  sortById: () => void;
}

export const useGatewayStore = create<GatewayStore>((set, get) => ({
  gatewayStat: gatewayStat as GatewayStats,
  gateways: gateways.results.sort(
    (a, b) =>
      b.gatewayStatistics.lastMessageRxTime -
      a.gatewayStatistics.lastMessageRxTime,
  ) as Gateway[],
  sinkNodes: gateways.results.map((g) => g.sinkNodes).flat(),

  updateGateway: (gateway: Gateway) =>
    set((state: { gateways: Gateway[] }) => ({
      gateways: state.gateways.map((g) =>
        g.uuid === gateway.uuid ? gateway : g,
      ),
    })),

  getGateway: (uuid: string): Gateway | undefined =>
    get().gateways.find((g: Gateway) => g.uuid === uuid),

  sortByLastMessageRxTime: () =>
    set((state: { gateways: Gateway[] }) => ({
      gateways: [...state.gateways].sort(
        (a, b) =>
          b.gatewayStatistics.lastMessageRxTime -
          a.gatewayStatistics.lastMessageRxTime,
      ),
    })),

  sortById: () =>
    set((state: { gateways: Gateway[] }) => ({
      gateways: [...state.gateways].sort((a, b) =>
        a.gatewayId > b.gatewayId ? 1 : -1,
      ),
    })),
}));
