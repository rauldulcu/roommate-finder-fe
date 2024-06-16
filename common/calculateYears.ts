export const calculateYearsFromTimestamp = (timestamp: string) => {
  const dateFromTimestamp = new Date(timestamp);
  const currentDate = new Date();
  console.log(dateFromTimestamp);

  const yearsDifference =
    currentDate.getFullYear() - dateFromTimestamp.getFullYear();

  const monthDayNotPassed =
    currentDate.getMonth() < dateFromTimestamp.getMonth() ||
    (currentDate.getMonth() === dateFromTimestamp.getMonth() &&
      currentDate.getDate() < dateFromTimestamp.getDate());

  if (monthDayNotPassed) {
    return yearsDifference - 1;
  }

  return yearsDifference;
};
