export const isInRange = (value: number, min: number, max: number): boolean =>
  value >= min && value <= max;

export const isHourInRange = (hour: number): boolean => isInRange(hour, 0, 23);

export const isMinuteInRange = (minute: number): boolean =>
  isInRange(minute, 0, 59);

export const isValidTime = (time: string): boolean => {
  const [hour, minute] = time.split(":").map(Number);
  return isHourInRange(hour) && isMinuteInRange(minute);
};

export const isMilitaryTime = (timeRange: string): boolean => {
  const [start, end] = timeRange.split(" - ");
  return isValidTime(start) && isValidTime(end);
};
