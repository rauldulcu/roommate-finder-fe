export function formatDate(isoString: string) {
  const date = new Date(isoString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export const dateToISO = (dateStr: string) => {
  const parts = dateStr.split("/");
  if (parts.length !== 3) {
    throw new Error("Invalid date format. Expected DD/MM/YYYY");
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  if (month < 0 || month > 11 || day < 1 || day > 31) {
    throw new Error("Date values are out of bounds");
  }

  const date = new Date(Date.UTC(year, month, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month ||
    date.getUTCDate() !== day
  ) {
    throw new Error("Invalid date. Please check the day, month, and year.");
  }

  return date.toISOString();
};
