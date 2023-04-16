export const isInRange = (value: number, min: number, max: number): boolean =>
  value >= min && value <= max;

export const isHourInRange = (hour: number): boolean => isInRange(hour, 0, 23);

export const isMinuteInRange = (minute: number): boolean =>
  isInRange(minute, 0, 59);
