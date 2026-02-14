export function toMinutes(h: number, m: number) {
  return h * 60 + m;
}

export function isBetween(now: number, start: number, end: number) {
  return now >= start && now < end;
}

export function getTimeDescription(date: Date) {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const month = date.getMonth(); // jan = 0
  const now = toMinutes(hour, minute);

  // FEBRUARY
  if (month === 1) {
    const sunrise = toMinutes(7, 10);
    const sunset = toMinutes(16, 45);

    if (isBetween(now, sunrise, sunrise + 15)) return 'sunrise';
    if (isBetween(now, sunrise + 75, sunset - 60)) return 'sunlight';
    if (isBetween(now, sunset, sunset + 45)) return 'sunset';
  }

  // MARCH
  if (month === 2) {
    const sunrise = toMinutes(6, 10);
    const sunset = toMinutes(17, 40);

    if (isBetween(now, sunrise, sunrise + 15)) return 'sunrise';
    if (isBetween(now, sunrise + 75, sunset - 60)) return 'sunlight';
    if (isBetween(now, sunset, sunset + 45)) return 'sunset';
  }

  return 'night';
}
