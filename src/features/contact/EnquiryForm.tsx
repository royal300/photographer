import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { SERVICE_OPTIONS } from '@/data/services';
import { todayISO } from '@/lib/format';
import { validateEnquiry, type EnquiryErrors, type EnquiryValues } from '@/lib/validation';
import { buildBookingMessage, openWhatsApp, whatsappUrl } from '@/lib/whatsapp';
import { useEnquiry } from '@/providers/EnquiryProvider';
import { Button } from '@/components/ui/Button';
import './EnquiryForm.css';

const FIELD_ORDER: ReadonlyArray<keyof EnquiryValues> = ['name', 'mobile', 'date', 'service'];
const DEFAULT_NOTE = 'WhatsApp opens with your details filled in — just press send.';

interface FieldShellProps {
  name: keyof EnquiryValues;
  label: string;
  error?: string;
  children: ReactNode;
}

function FieldShell({ name, label, error, children }: FieldShellProps) {
  return (
    <div className={error ? 'field bad' : 'field'}>
      <label htmlFor={`f-${name}`}>{label}</label>
      {children}
      <span className="err" id={`f-${name}-error`}>
        {error}
      </span>
    </div>
  );
}

/** Name / mobile / date / service form that hands the booking over to WhatsApp. */
export function EnquiryForm() {
  const { service: preselected } = useEnquiry();
  const [values, setValues] = useState<EnquiryValues>({ name: '', mobile: '', date: '', service: '' });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [note, setNote] = useState(DEFAULT_NOTE);
  const today = useMemo(() => todayISO(), []);

  useEffect(() => {
    if (!preselected) return;
    setValues((v) => ({ ...v, service: preselected }));
    setErrors((e) => ({ ...e, service: undefined }));
  }, [preselected]);

  const bind = (name: keyof EnquiryValues) => ({
    id: `f-${name}`,
    name,
    value: values[name],
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `f-${name}-error` : undefined,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setValues((v) => ({ ...v, [name]: e.target.value }));
      setErrors((err) => ({ ...err, [name]: undefined }));
    },
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validateEnquiry(values, today);
    setErrors(found);
    const firstBad = FIELD_ORDER.find((key) => found[key]);
    if (firstBad) {
      document.getElementById(`f-${firstBad}`)?.focus();
      setNote('Please fix the highlighted fields.');
      return;
    }
    setNote('Opening WhatsApp…');
    openWhatsApp(whatsappUrl(buildBookingMessage(values)));
  };

  return (
    <form className="enquiry" onSubmit={onSubmit} noValidate aria-label="Booking enquiry">
      <FieldShell name="name" label="Name" error={errors.name}>
        <input {...bind('name')} type="text" autoComplete="name" placeholder="Your full name" required />
      </FieldShell>
      <FieldShell name="mobile" label="Mobile" error={errors.mobile}>
        <input {...bind('mobile')} type="tel" inputMode="numeric" autoComplete="tel" placeholder="98765 43210" required />
      </FieldShell>
      <FieldShell name="date" label="Event date" error={errors.date}>
        <input {...bind('date')} type="date" min={today} />
      </FieldShell>
      <FieldShell name="service" label="Service" error={errors.service}>
        <select {...bind('service')} required>
          <option value="">Select a service</option>
          {SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </FieldShell>
      <Button type="submit" variant="dark" icon="whatsapp" className="full">
        Send on WhatsApp
      </Button>
      <p className="form-note full" role="status" aria-live="polite">
        {note}
      </p>
    </form>
  );
}
