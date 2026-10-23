import { SERVICE_DETAILS } from '@/data/serviceDetails';
import type { Service } from '@/types';

export const hasServicePage = (slug: string): boolean => slug in SERVICE_DETAILS;

export const servicePath = (slug: string): string => `/services/${slug}`;

/** Where a service card should lead: its own page, or the booking form. */
export function serviceHref(service: Service): string {
  return hasServicePage(service.slug) ? servicePath(service.slug) : '/#contact';
}
