export function getClosestFullHour() {
  const currentTime = new Date();
  currentTime.setMinutes(0, 0, 0);

  return addHours(currentTime, 1);
}

export function getClosestFlooredMinutes() {
  const currentTime = new Date();
  const currentMinutes = currentTime.getMinutes();
  const flooredMinutes = currentMinutes - (currentMinutes % 10) - 10;
  currentTime.setMinutes(flooredMinutes, 0, 0);

  return currentTime;
}

export function addDays(date: Date, days: number) {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);

  return newDate;
}

export function addHours(date: Date, hours: number) {
  const newDate = new Date(date);
  newDate.setHours(date.getHours() + hours);

  return newDate;
}
