/**
 * Formatting Utilities
 * Pure functions for formatting data for display
 */

/**
 * Truncates Stacks address (e.g., "ST1XHP...B5VV")
 * @example truncateAddress("ST1XHPEWSZYNN2QA9QG9JG9GHRVF6GZSFRWTFB5VV") // "ST1XHP...B5VV"
 */
export function truncateAddress(
  address: string,
  prefixLength: number = 6,
  suffixLength: number = 4
): string {
  if (!address || typeof address !== 'string') return '';
  if (address.length <= prefixLength + suffixLength) return address;
  return `${address.substring(0, prefixLength)}...${address.substring(address.length - suffixLength)}`;
}

/**
 * Formats score with thousand separators
 * @example formatScore(1234567) // "1,234,567"
 */
export function formatScore(score: number | undefined | null): string {
  if (score === undefined || score === null || typeof score !== 'number' || isNaN(score) || !isFinite(score)) {
    return '0';
  }
  return Math.floor(score).toLocaleString('en-US');
}

/**
 * Formats Unix timestamp to readable date
 * @example formatDate(1702906800) // "Dec 18, 2023"
 * @example formatDate(1702906800, true) // "Dec 18, 2023, 10:00 AM"
 */
export function formatDate(timestamp: number, includeTime: boolean = false): string {
  if (typeof timestamp !== 'number' || isNaN(timestamp) || timestamp <= 0) {
    return 'Invalid date';
  }

  const ms = timestamp < 10000000000 ? timestamp * 1000 : timestamp;
  const date = new Date(ms);

  if (isNaN(date.getTime())) return 'Invalid date';

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  if (includeTime) {
    options.hour = 'numeric';
    options.minute = '2-digit';
  }

  return date.toLocaleDateString('en-US', options);
}

/**
 * Formats seconds to MM:SS for game timer
 * @example formatTime(125) // "02:05"
 */
export function formatTime(seconds: number): string {
  if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
    return '00:00';
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formats timestamp to relative time (e.g., "2 hours ago")
 * @example formatRelativeTime(Date.now() - 60000) // "1 minute ago"
 */
export function formatRelativeTime(timestamp: number): string {
  if (typeof timestamp !== 'number' || isNaN(timestamp) || timestamp <= 0) {
    return 'Invalid time';
  }

  const ms = timestamp < 10000000000 ? timestamp * 1000 : timestamp;
  const now = Date.now();
  const diffMs = now - ms;

  if (diffMs < 0) return 'just now';

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (seconds > 5) return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  return 'just now';
}
