/** Format seconds to human-readable duration like "1h 12min" */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return minutes > 0 ? `${hours}h ${minutes}min` : `${hours}h`;
  }
  return minutes > 0 ? `${minutes}min` : `${seconds}s`;
}
