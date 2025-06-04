export function parseSeats(seat: string) {
  if (!seat) return Array.from({length: 3}, () => '');

  const [_구역, _열, _번] = seat.split(' ');

  const 구역 = _구역.split('구역')[0];
  const 열 = _열.split('열')[0];
  const 번 = _번.split('번')[0];

  return [구역, 열, 번];
}

export function formatSeats(seats: string[]) {
  const [구역, 열, 번] = seats;

  return `${구역}구역 ${열}열 ${번}번`;
}
