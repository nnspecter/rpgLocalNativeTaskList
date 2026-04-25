export function formatMinutes(totalMinutes: number): string {
  if (totalMinutes < 0) return '0мин';

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours}ч`);
  }

  if (minutes > 0 || hours === 0) {
    parts.push(`${minutes}мин`);
  }

  return parts.join(' ');
}