export const parseStringToBoolean = (value: string): boolean => {
  if (!value) return false;

  return JSON.parse(value.toLowerCase());
};
