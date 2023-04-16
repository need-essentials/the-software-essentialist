export const isInRange = (value: number, min: number, max: number): boolean =>
  value >= min && value <= max;

export const isHourInRange = (hour: number): boolean => isInRange(hour, 0, 23);
