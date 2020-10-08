function daysToMs(days: number = 1) {
  const day = 1000 * 60 * 60 * 24;
  return day * days;
}

export { daysToMs };
