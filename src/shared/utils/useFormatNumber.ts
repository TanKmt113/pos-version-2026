/**
 * Utility functions for number formatting
 * Supports currency, percentage, decimal, and custom number formatting
 */

export interface FormatNumberOptions {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
  currency?: string;
  currencyDisplay?: 'symbol' | 'code' | 'name';
}

/**
 * Format a number with customizable options
 * @param value - The number to format
 * @param options - Formatting options
 * @returns Formatted string
 */
export function formatNumber(
  value: number | string | null | undefined,
  options?: FormatNumberOptions
): string {
  const num = Number(value);
  
  if (isNaN(num)) {
    return '0';
  }

  const {
    locale = 'vi-VN',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    useGrouping = true,
  } = options || {};

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
    useGrouping,
  }).format(num);
}

/**
 * Format a number as currency
 * @param value - The number to format
 * @param currency - Currency code (default: VND)
 * @param locale - Locale string (default: vi-VN)
 * @returns Formatted currency string
 */
export function formatCurrency(
  value: number | string | null | undefined,
  currency: string = 'VND',
  locale: string = 'vi-VN'
): string {
  const num = Number(value);
  
  if (isNaN(num)) {
    return '0 ₫';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

/**
 * Format a number as percentage
 * @param value - The number to format (0.15 = 15%)
 * @param decimals - Number of decimal places
 * @param locale - Locale string
 * @returns Formatted percentage string
 */
export function formatPercentage(
  value: number | string | null | undefined,
  decimals: number = 2,
  locale: string = 'vi-VN'
): string {
  const num = Number(value);
  
  if (isNaN(num)) {
    return '0%';
  }

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

/**
 * Format a number with thousand separators
 * @param value - The number to format
 * @param locale - Locale string
 * @returns Formatted string with thousand separators
 */
export function formatWithThousandSeparator(
  value: number | string | null | undefined,
  locale: string = 'vi-VN'
): string {
  return formatNumber(value, { locale, useGrouping: true });
}

/**
 * Format a number to a fixed number of decimal places
 * @param value - The number to format
 * @param decimals - Number of decimal places
 * @param locale - Locale string
 * @returns Formatted string
 */
export function formatDecimal(
  value: number | string | null | undefined,
  decimals: number = 2,
  locale: string = 'vi-VN'
): string {
  return formatNumber(value, {
    locale,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Shorten large numbers with K, M, B suffixes
 * @param value - The number to format
 * @param decimals - Number of decimal places
 * @returns Formatted string (e.g., 1.5K, 2.3M)
 */
export function formatCompactNumber(
  value: number | string | null | undefined,
  decimals: number = 1
): string {
  const num = Number(value);
  
  if (isNaN(num)) {
    return '0';
  }

  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';

  if (absNum >= 1_000_000_000) {
    return sign + (absNum / 1_000_000_000).toFixed(decimals) + 'B';
  }
  if (absNum >= 1_000_000) {
    return sign + (absNum / 1_000_000).toFixed(decimals) + 'M';
  }
  if (absNum >= 1_000) {
    return sign + (absNum / 1_000).toFixed(decimals) + 'K';
  }

  return sign + absNum.toFixed(decimals);
}

/**
 * Parse a formatted number string back to a number
 * @param value - The formatted string
 * @param locale - Locale string
 * @returns Parsed number or NaN
 */
export function parseFormattedNumber(
  value: string,
  locale: string = 'vi-VN'
): number {
  // Remove currency symbols, percent signs, and spaces
  let cleaned = value.replace(/[^\d.,\-+]/g, '');
  
  // Handle different decimal separators based on locale
  if (locale.startsWith('vi')) {
    // Vietnamese uses . for thousands and , for decimals
    cleaned = cleaned.replace(/\./g, '').replace(',', '.');
  } else {
    // Most locales use , for thousands and . for decimals
    cleaned = cleaned.replace(/,/g, '');
  }

  return parseFloat(cleaned);
}

/**
 * Convert number to Vietnamese words
 * @param value - The number to convert
 * @returns Vietnamese words representation
 */
export function numberToVietnameseWords(
  value: number | string | null | undefined
): string {
  const num = Number(value);
  
  if (isNaN(num) || num === 0) {
    return 'Không đồng';
  }

  const negative = num < 0;
  const absNum = Math.abs(Math.floor(num));

  const units = ['', 'nghìn', 'triệu', 'tỷ'];
  const digits = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];

  function readGroup(n: number): string {
    const hundred = Math.floor(n / 100);
    const ten = Math.floor((n % 100) / 10);
    const unit = n % 10;

    let result = '';

    if (hundred > 0) {
      result += digits[hundred] + ' trăm';
      if (ten === 0 && unit > 0) {
        result += ' lẻ';
      }
    }

    if (ten > 1) {
      result += (result ? ' ' : '') + digits[ten] + ' mươi';
      if (unit === 1) {
        result += ' mốt';
      } else if (unit === 5 && ten > 0) {
        result += ' lăm';
      } else if (unit > 0) {
        result += ' ' + digits[unit];
      }
    } else if (ten === 1) {
      result += (result ? ' ' : '') + 'mười';
      if (unit === 5) {
        result += ' lăm';
      } else if (unit > 0) {
        result += ' ' + digits[unit];
      }
    } else if (unit > 0) {
      result += (result ? ' ' : '') + digits[unit];
    }

    return result;
  }

  // Split number into groups of 3 digits
  const groups: number[] = [];
  let temp = absNum;
  while (temp > 0) {
    groups.push(temp % 1000);
    temp = Math.floor(temp / 1000);
  }

  let result = '';
  for (let i = groups.length - 1; i >= 0; i--) {
    if (groups[i] > 0) {
      const groupText = readGroup(groups[i]);
      result += (result ? ' ' : '') + groupText;
      if (i > 0) {
        result += ' ' + units[i];
      }
    }
  }

  // Capitalize first letter
  result = result.charAt(0).toUpperCase() + result.slice(1);
  
  // Add currency and negative sign
  result += ' đồng';
  if (negative) {
    result = 'Âm ' + result.toLowerCase();
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  return result;
}

/**
 * Convert number to words with "chẵn" suffix for round numbers
 * @param value - The number to convert
 * @returns Vietnamese words with "chẵn" if applicable
 */
export function numberToWords(
  value: number | string | null | undefined
): string {
  const num = Number(value);
  
  if (isNaN(num)) {
    return 'Không đồng';
  }

  let result = numberToVietnameseWords(num);
  
  // Add "chẵn" for round numbers
  if (num > 0 && num % 1000 === 0) {
    result = result.replace(' đồng', ' đồng chẵn');
  }

  return result;
}

/**
 * React hook for formatting numbers
 * @returns Object with formatting functions
 */
export function useFormatNumber() {
  return {
    formatNumber,
    formatCurrency,
    formatPercentage,
    formatWithThousandSeparator,
    formatDecimal,
    formatCompactNumber,
    parseFormattedNumber,
    numberToVietnameseWords,
    numberToWords,
  };
}

/**
 * Format file size in bytes to human-readable format
 * @param bytes - Size in bytes
 * @param decimals - Number of decimal places
 * @returns Formatted string (e.g., 1.5 KB, 2.3 MB)
 */
export function formatFileSize(
  bytes: number | string | null | undefined,
  decimals: number = 2
): string {
  const num = Number(bytes);
  
  if (isNaN(num) || num === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(num) / Math.log(k));

  return parseFloat((num / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
}

// Export all functions as default object
export default {
  formatNumber,
  formatCurrency,
  formatPercentage,
  formatWithThousandSeparator,
  formatDecimal,
  formatCompactNumber,
  parseFormattedNumber,
  numberToVietnameseWords,
  numberToWords,
  formatFileSize,
  useFormatNumber,
};
