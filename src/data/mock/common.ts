import { Activity, Wifi, WifiLow, WifiOff, WifiZero } from "lucide-react";

export const statuses = [
  {
    value: "ACTIVE",
    label: "ACTIVE",
    icon: Wifi,
  },
  {
    value: "INACTIVE",
    label: "INACTIVE",
    icon: WifiLow,
  },
  {
    value: "UNSTABLE",
    label: "UNSTABLE",
    icon: Activity,
  },
  {
    value: "OFFLINE",
    label: "OFFLINE",
    icon: WifiOff,
  },
  {
    value: "UNAVAILABLE",
    label: "UNAVAILABLE",
    icon: WifiZero,
  },
];

export const models = [
  {
    value: "Simulated Gateway",
    label: "Simulated Gateway",
  },
  {
    value: "Real Gateway",
    label: "Real Gateway",
  },
];

export const versions = [
  {
    value: "1.4.4.4",
    label: "1.4.4.4",
  },
  {
    value: "1.4.4.3",
    label: "1.4.4.3",
  },
];

export const ErrorMessages = {
  DESCRIPTION_EMPTY: "Description cannot be empty.",
  SINK_MINIMUM: "At least 2 sink nodes are required.",
};
