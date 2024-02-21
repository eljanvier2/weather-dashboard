export const getHourMinutes = (dateString: string) => {
  const date = new Date(dateString);
  return date.getHours() + ":" + date.getMinutes();
};

export const getDay = (dateString: string) => {
  const date = new Date(dateString);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[date.getDay()];
  return dayName;
};
