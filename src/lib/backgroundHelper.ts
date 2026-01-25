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

    // JANUARY
    if (month === 0) {
        const sunrise = toMinutes(7, 45);
        const sunset = toMinutes(16, 0);

        if (isBetween(now, sunrise - 30, sunrise)) return 'twilight';
        if (isBetween(now, sunrise, sunrise + 15)) return 'sunrise';
        if (isBetween(now, sunrise + 15, sunrise + 75)) return 'golden_hour';
        if (isBetween(now, sunrise + 75, sunset - 60)) return 'sunlight';
        if (isBetween(now, sunset - 60, sunset)) return 'golden_hour';
        if (isBetween(now, sunset, sunset + 45)) return 'sunset';
        if (isBetween(now, sunset + 45, sunset + 75)) return 'twilight';
        return 'night';
    }

    // FEBRUARY
    if (month === 1) {
        const sunrise = toMinutes(7, 10);
        const sunset = toMinutes(16, 45);

        if (isBetween(now, sunrise - 30, sunrise)) return 'twilight';
        if (isBetween(now, sunrise, sunrise + 15)) return 'sunrise';
        if (isBetween(now, sunrise + 15, sunrise + 75)) return 'golden_hour';
        if (isBetween(now, sunrise + 75, sunset - 60)) return 'sunlight';
        if (isBetween(now, sunset - 60, sunset)) return 'golden_hour';
        if (isBetween(now, sunset, sunset + 45)) return 'sunset';
        if (isBetween(now, sunset + 45, sunset + 75)) return 'twilight';
        return 'night';
    }

    // MARCH
    if (month === 2) {
        const sunrise = toMinutes(6, 10);
        const sunset = toMinutes(17, 40);

        if (isBetween(now, sunrise - 30, sunrise)) return 'twilight';
        if (isBetween(now, sunrise, sunrise + 15)) return 'sunrise';
        if (isBetween(now, sunrise + 15, sunrise + 75)) return 'golden_hour';
        if (isBetween(now, sunrise + 75, sunset - 60)) return 'sunlight';
        if (isBetween(now, sunset - 60, sunset)) return 'golden_hour';
        if (isBetween(now, sunset, sunset + 45)) return 'sunset';
        if (isBetween(now, sunset + 45, sunset + 75)) return 'twilight';
        return 'night';
    }

    return 'night';
}
