export const formatTimeCA = (time: number): string => {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).format(new Date(time * 1000));
};

export const formatTimeUS = (time: number): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).format(new Date(time * 1000));
};

export const formatTimeHourMinute24 = (time: number): string => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).format(new Date(time * 1000));
};

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US").format(value);
