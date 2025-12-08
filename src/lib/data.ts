

export interface Presentation {
  id: string;
  title: string;
  presenter: string;
  time: string;
  description: string;
  downloadUrls?: {
    korean: string | null;
    mongolian: string | null;
  } | null;
  downloadUrl?: string | null; // For single download button
  isSession: boolean;
  details?: string[];
}
