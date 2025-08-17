import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extend dayjs with relative time plugin
dayjs.extend(relativeTime);

/**
 * Formats a date string into human-readable format
 * @param dateTimeString - ISO date string
 * @returns Object with formatted and relative time strings
 */
export const formatDateTime = (dateTimeString: string) => {
  try {
    const date = dayjs(dateTimeString);
    return {
      formatted: date.format('MMM DD, YYYY • h:mm A'),
      relative: date.fromNow(),
    };
  } catch {
    return {
      formatted: dateTimeString,
      relative: '',
    };
  }
};

/**
 * Returns appropriate color for status tags
 * @param status - Document status string
 * @returns Ant Design tag color
 */
export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'success';
    case 'processing':
      return 'processing';
    case 'failed':
      return 'error';
    case 'pending':
      return 'warning';
    default:
      return 'default';
  }
};


export type StatusType = 'completed' | 'processing' | 'failed' | 'pending';

export interface FormattedDateTime {
  formatted: string;
  relative: string;
}

export const getScoreTagColor = (score?: number) => {
  if (score === undefined) return undefined;
  if (score >= 8) return "green";
  if (score >= 6) return "orange";
  return "red";
};