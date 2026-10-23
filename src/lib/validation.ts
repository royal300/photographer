export interface EnquiryValues {
  name: string;
  mobile: string;
  date: string;
  service: string;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

/** Strips formatting and a leading 91 / 0 so only the 10 national digits remain. */
export function normalizeMobile(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return digits;
}

export function validateEnquiry(values: EnquiryValues, today: string): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!/^[6-9]\d{9}$/.test(normalizeMobile(values.mobile))) errors.mobile = 'Enter a valid 10-digit mobile number.';
  if (values.date && values.date < today) errors.date = 'Please choose a date from today onwards.';
  if (!values.service) errors.service = 'Please choose a service.';
  return errors;
}
