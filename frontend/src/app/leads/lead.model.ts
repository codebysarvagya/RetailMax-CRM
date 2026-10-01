export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  source: string;
  status: string;
}

export interface LeadRequest {
  name: string;
  email: string;
  phone: string;
  source: string;
  status: string;
}

export const LEAD_SOURCES = [
  'WEBSITE',
  'REFERRAL',
  'SOCIAL_MEDIA',
  'ADVERTISEMENT',
  'OTHER'
] as const;

export const LEAD_STATUSES = [
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'CONVERTED',
  'LOST'
] as const;
