// Constants
const timePattern = "([0-9]{2}:[0-9]{2})";

// Validation functions
export const isInRange = (value: number, min: number, max: number): boolean =>
  value >= min && value <= max;

export const isHourInRange = (hour: number): boolean => isInRange(hour, 0, 23);

export const isMinuteInRange = (minute: number): boolean =>
  isInRange(minute, 0, 59);

// Time format functions
export const hasValidTimeFormat = (time: string): boolean => {
  const timeFormat = new RegExp(`^${timePattern}$`);
  return timeFormat.test(time);
};

export const hasValidTimeRangeFormat = (timeRange: string): boolean => {
  const timeRangeFormat = new RegExp(`^${timePattern} - ${timePattern}$`);
  return timeRangeFormat.test(timeRange);
};

// Time validation functions
export const isValidTime = (time: string): boolean => {
  if (!hasValidTimeFormat(time)) return false;

  const [hour, minute] = time.split(":").map(Number);
  return isHourInRange(hour) && isMinuteInRange(minute);
};

export const isMilitaryTime = (timeRange: string): boolean => {
  if (!hasValidTimeRangeFormat(timeRange)) return false;

  const [start, end] = timeRange.split(" - ");
  return isValidTime(start) && isValidTime(end);
};
