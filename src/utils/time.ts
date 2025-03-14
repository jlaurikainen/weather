export function getClosestFullHour() {
  const currentTime = new Date();
  const timeOffset =
    currentTime.getHours() + (currentTime.getMinutes() > 30 ? 1 : 0);
  currentTime.setHours(timeOffset, 0, 0, 0);

  return currentTime;
}
