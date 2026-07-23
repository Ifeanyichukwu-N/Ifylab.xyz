export interface Project {
  id: string;
  name: string;
  website: string;
  description: string;
  logoUrl: string;
  fullDetails?: string[];
  metrics?: { label: string; value: string }[];
  tags: string[];
}

export type TabId = 'overview' | 'projects' | 'leadership' | 'contact';

export interface TabItem {
  id: TabId;
  label: string;
}

export interface ContactFormData {
  name: string;
  company: string;
  email: string;
  subject: string;
  message: string;
}
