import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

interface EnquiryState {
  /** Service pre-selected in the booking form (set by clicking a service card). */
  service: string;
  selectService: (service: string) => void;
}

const EnquiryContext = createContext<EnquiryState | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [service, setService] = useState('');
  const value = useMemo(() => ({ service, selectService: setService }), [service]);
  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry(): EnquiryState {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used inside <EnquiryProvider>');
  return ctx;
}
