/**
 * Plant Date and Name Utilities
 * Handles age calculations, date formatting, and possessive grammar.
 */

export interface CalculatedAge {
  formattedAge: string;
  ageNumber: string;
  ageUnit: string;
  totalYears: number;
  totalMonths: number;
}

/**
 * Calculates human-readable age from a birth date string (YYYY-MM-DD or ISO).
 * Uses user's local date boundaries.
 */
export function calculateAgeFromBirthDate(birthDateStr: string): CalculatedAge {
  if (!birthDateStr) {
    return {
      formattedAge: '02 Years',
      ageNumber: '02',
      ageUnit: 'Years',
      totalYears: 2,
      totalMonths: 24
    };
  }

  // Parse YYYY-MM-DD safely into local timezone date
  const parts = birthDateStr.split('T')[0].split('-');
  if (parts.length < 3) {
    return {
      formattedAge: '02 Years',
      ageNumber: '02',
      ageUnit: 'Years',
      totalYears: 2,
      totalMonths: 24
    };
  }

  const birthYear = parseInt(parts[0], 10);
  const birthMonth = parseInt(parts[1], 10) - 1; // 0-indexed
  const birthDay = parseInt(parts[2], 10);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  let years = currentYear - birthYear;
  let months = currentMonth - birthMonth;

  if (currentDay < birthDay) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years < 0) {
    years = 0;
    months = 0;
  }

  let formattedAge: string;
  let ageNumber: string;
  let ageUnit: string;

  if (years >= 1) {
    const num = years < 10 ? `0${years}` : `${years}`;
    ageNumber = num;
    ageUnit = years === 1 ? 'Year' : 'Years';
    formattedAge = `${ageNumber} ${ageUnit}`;
  } else {
    // Under 1 year old: show months
    const totalMonths = Math.max(1, months);
    const num = totalMonths < 10 ? `0${totalMonths}` : `${totalMonths}`;
    ageNumber = num;
    ageUnit = totalMonths === 1 ? 'Month' : 'Months';
    formattedAge = `${ageNumber} ${ageUnit}`;
  }

  return {
    formattedAge,
    ageNumber,
    ageUnit,
    totalYears: years,
    totalMonths: years * 12 + months
  };
}

/**
 * Formats a date string (YYYY-MM-DD) into editorial format: "12 March 2024"
 */
export function formatDateDisplay(dateStr?: string): string {
  if (!dateStr) return '12 March 2024';

  const parts = dateStr.split('T')[0].split('-');
  if (parts.length < 3) return dateStr;

  const year = parseInt(parts[0], 10);
  const monthIdx = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthName = months[monthIdx] || 'March';
  return `${day} ${monthName} ${year}`;
}

/**
 * Returns today's date formatted as YYYY-MM-DD for date input max attribute.
 */
export function getTodayIsoDate(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Handles possessive names gracefully.
 * Examples:
 * "Kanak" -> "Kanak’s"
 * "Ali" -> "Ali’s"
 * "James" -> "James’"
 * "Carlos" -> "Carlos’"
 * "Kanak's" -> "Kanak’s"
 */
export function formatPossessiveName(name: string): string {
  const raw = (name || '').trim();
  if (!raw) return 'My';

  // Strip trailing possessive apostrophe-s if user already typed it
  const clean = raw.replace(/['’]s?$/i, '').trim();
  if (!clean) return 'My';

  // If ends in s or S, use single apostrophe (e.g. James’ or Carlos’)
  if (clean.toLowerCase().endsWith('s')) {
    return `${clean}’`;
  }

  return `${clean}’s`;
}
