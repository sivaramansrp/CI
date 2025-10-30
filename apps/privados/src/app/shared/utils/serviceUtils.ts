export type TypeResponseStatus = {
  success: boolean;
  msg?: string;
};

export function cleanParams(obj: Record<string, any>) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null && v !== ''));
}

export function formatDateIso(date: Date) {
  const newDate = new Date(date);
  return newDate.toISOString();
}
