import { create } from "zustand";
import { Gateway } from "../types/types";
import gateways from "@/mock-data/gateway_listing_response.json";

export interface GatewayStore {
  gateways: Gateway[];
  getGateway: (uuid: string) => Gateway | undefined;
  updateGateway: (gateway: Gateway) => void;
}

export const useGatewayStore = create<GatewayStore>((set, get) => ({
  gateways: gateways.results.sort((a, b) =>
    a.gatewayId > b.gatewayId ? 1 : -1,
  ) as Gateway[],
  updateGateway: (gateway: Gateway) =>
    set((state: { gateways: Gateway[] }) => ({
      gateways: state.gateways.map((g) =>
        g.uuid === gateway.uuid ? gateway : g,
      ),
    })),
  getGateway: (uuid: string): Gateway | undefined =>
    get().gateways.find((g: Gateway) => g.uuid === uuid),
}));
