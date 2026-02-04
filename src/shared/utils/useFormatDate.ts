/**
 * Utility functions for date and time formatting
 * Supports various date/time formats for Vietnamese locale
 */

export interface FormatDateOptions {
  locale?: string;
  timeZone?: string;
  dateStyle?: 'full' | 'long' | 'medium' | 'short';
  timeStyle?: 'full' | 'long' | 'medium' | 'short';
}

/**
 * Format a date with customizable options
 * @param date - The date to format
 * @param options - Formatting options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number | null | undefined,
  options?: FormatDateOptions
): string {
  if (!date) {
    return '';
  }

  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const {
    locale = 'vi-VN',
    timeZone = 'Asia/Ho_Chi_Minh',
    dateStyle = 'medium',
  } = options || {};

  return new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeZone,
  }).format(dateObj);
}

/**
 * Format date and time together
 * @param date - The date to format
 * @param locale - Locale string
 * @returns Formatted datetime string
 */
export function formatDateTime(
  date: Date | string | number | null | undefined,
  locale: string = 'vi-VN'
): string {
  if (!date) {
    return '';
  }

  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(dateObj);
}

/**
 * Format time only
 * @param date - The date to format
 * @param locale - Locale string
 * @param showSeconds - Whether to show seconds
 * @returns Formatted time string
 */
export function formatTime(
  date: Date | string | number | null | undefined,
  locale: string = 'vi-VN',
  showSeconds: boolean = false
): string {
  if (!date) {
    return '';
  }

  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    ...(showSeconds && { second: '2-digit' }),
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(dateObj);
}

/**
 * Format date in DD/MM/YYYY format
 * @param date - The date to format
 * @returns Formatted date string
 */
export function formatDateDMY(
  date: Date | string | number | null | undefined
): string {
  if (!date) {
    return '';
  }

  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
}

/**
 * Format date in YYYY-MM-DD format (ISO format)
 * @param date - The date to format
 * @returns Formatted date string
 */
export function formatDateISO(
  date: Date | string | number | null | undefined
): string {
  if (!date) {
    return '';
  }

  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  return dateObj.toISOString().split('T')[0];
}

/**
 * Format date with Vietnamese day of week
 * @param date - The date to format
 * @returns Formatted date string with day of week
 */
export function formatDateWithDayOfWeek(
  date: Date | string | number | null | undefined
): string {
  if (!date) {
    return '';
  }

  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const dayOfWeek = new Intl.DateTimeFormat('vi-VN', {
    weekday: 'long',
    timeZone: 'Asia/Ho_Chi_Minh',
  }).format(dateObj);

  const formattedDate = formatDateDMY(dateObj);

  return `${dayOfWeek}, ${formattedDate}`;
}

/**
 * Format relative time (e.g., "2 giờ trước", "3 ngày trước")
 * @param date - The date to compare
 * @param locale - Locale string
 * @returns Relative time string
 */
export function formatRelativeTime(
  date: Date | string | number | null | undefined,
  locale: string = 'vi-VN'
): string {
  if (!date) {
    return '';
  }

  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) {
    return 'Vừa xong';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} phút trước`;
  } else if (diffInHours < 24) {
    return `${diffInHours} giờ trước`;
  } else if (diffInDays < 30) {
    return `${diffInDays} ngày trước`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} tháng trước`;
  } else {
    return `${diffInYears} năm trước`;
  }
}

/**
 * Format date range
 * @param startDate - Start date
 * @param endDate - End date
 * @param locale - Locale string
 * @returns Formatted date range string
 */
export function formatDateRange(
  startDate: Date | string | number | null | undefined,
  endDate: Date | string | number | null | undefined,
  locale: string = 'vi-VN'
): string {
  if (!startDate || !endDate) {
    return '';
  }

  const start = formatDateDMY(startDate);
  const end = formatDateDMY(endDate);

  if (start === end) {
    return start;
  }

  return `${start} - ${end}`;
}

/**
 * Get Vietnamese month name
 * @param date - The date
 * @returns Month name in Vietnamese
 */
export function getVietnameseMonth(
  date: Date | string | number | null | undefined
): string {
  if (!date) {
    return '';
  }

  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const month = dateObj.getMonth() + 1;
  return `Tháng ${month}`;
}

/**
 * Format date for invoice/receipt (e.g., "Ngày 15 tháng 03 năm 2024")
 * @param date - The date to format
 * @returns Formatted date string for documents
 */
export function formatDateForDocument(
  date: Date | string | number | null | undefined
): string {
  if (!date) {
    return '';
  }

  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();

  return `Ngày ${day} tháng ${String(month).padStart(2, '0')} năm ${year}`;
}

/**
 * Format date and time for document (e.g., "15/03/2024 14:30")
 * @param date - The date to format
 * @returns Formatted datetime string
 */
export function formatDateTimeForDocument(
  date: Date | string | number | null | undefined
): string {
  if (!date) {
    return '';
  }

  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  const datePart = formatDateDMY(dateObj);
  const timePart = formatTime(dateObj, 'vi-VN', false);

  return `${datePart} ${timePart}`;
}

/**
 * Check if date is today
 * @param date - The date to check
 * @returns True if date is today
 */
export function isToday(date: Date | string | number | null | undefined): boolean {
  if (!date) {
    return false;
  }

  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return false;
  }

  const today = new Date();
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if date is yesterday
 * @param date - The date to check
 * @returns True if date is yesterday
 */
export function isYesterday(date: Date | string | number | null | undefined): boolean {
  if (!date) {
    return false;
  }

  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return false;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    dateObj.getDate() === yesterday.getDate() &&
    dateObj.getMonth() === yesterday.getMonth() &&
    dateObj.getFullYear() === yesterday.getFullYear()
  );
}

/**
 * Get time ago with smart formatting
 * @param date - The date to compare
 * @returns Smart formatted time string
 */
export function getTimeAgo(
  date: Date | string | number | null | undefined
): string {
  if (!date) {
    return '';
  }

  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }

  if (isToday(dateObj)) {
    return `Hôm nay, ${formatTime(dateObj)}`;
  }

  if (isYesterday(dateObj)) {
    return `Hôm qua, ${formatTime(dateObj)}`;
  }

  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays < 7) {
    return formatRelativeTime(dateObj);
  }

  return formatDateDMY(dateObj);
}

/**
 * Format business hours (e.g., "08:00 - 22:00")
 * @param startTime - Start time (e.g., "08:00")
 * @param endTime - End time (e.g., "22:00")
 * @returns Formatted business hours string
 */
export function formatBusinessHours(
  startTime: string,
  endTime: string
): string {
  return `${startTime} - ${endTime}`;
}

/**
 * Get current timestamp in Vietnamese format
 * @returns Formatted current timestamp
 */
export function getCurrentTimestamp(): string {
  return formatDateTimeForDocument(new Date());
}

/**
 * React hook for formatting dates
 * @returns Object with date formatting functions
 */
export function useFormatDate() {
  return {
    formatDate,
    formatDateTime,
    formatTime,
    formatDateDMY,
    formatDateISO,
    formatDateWithDayOfWeek,
    formatRelativeTime,
    formatDateRange,
    getVietnameseMonth,
    formatDateForDocument,
    formatDateTimeForDocument,
    isToday,
    isYesterday,
    getTimeAgo,
    formatBusinessHours,
    getCurrentTimestamp,
  };
}

// Export all functions as default object
export default {
  formatDate,
  formatDateTime,
  formatTime,
  formatDateDMY,
  formatDateISO,
  formatDateWithDayOfWeek,
  formatRelativeTime,
  formatDateRange,
  getVietnameseMonth,
  formatDateForDocument,
  formatDateTimeForDocument,
  isToday,
  isYesterday,
  getTimeAgo,
  formatBusinessHours,
  getCurrentTimestamp,
  useFormatDate,
};
