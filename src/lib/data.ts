export interface Presentation {
  id: string;
  title: string;
  presenter: string;
  time: string;
  description: string;
  downloadUrl: string | null;
  isSession: boolean;
}

export const presentationSchedule: Presentation[] = [
  {
    id: 'p1',
    title: 'Registration (Coffee break)',
    presenter: 'All Attendees',
    time: '08:30 - 08:50',
    description: '',
    downloadUrl: null,
    isSession: false,
  },
  {
    id: 'p2',
    title: 'Opening Remarks',
    presenter: 'Executive Director of NIRD / KOICA Resident Representative',
    time: '09:00 - 09:15',
    description: '',
    downloadUrl: null,
    isSession: false,
  },
  {
    id: 'p3',
    title: 'Group Photo',
    presenter: 'All Attendees',
    time: '09:15 - 09:20',
    description: '',
    downloadUrl: null,
    isSession: false,
  },
  {
    id: 'p4',
    title: 'SESSION 1: KHARKHORUM CITY',
    presenter: 'Mongolia & Korea Presentations',
    time: '09:20 - 10:50',
    description: 'Presentations (20 min), Discussion (50 min), Q&A (20 min)',
    downloadUrl: '/downloads/session1.pdf',
    isSession: true,
  },
  {
    id: 'p5',
    title: 'Coffee break',
    presenter: 'All Attendees',
    time: '10:50 - 11:20',
    description: '',
    downloadUrl: null,
    isSession: false,
  },
  {
    id: 'p6',
    title: 'SESSION 2: THE 14 DISTRICTS OF ULAANBAATAR CITY',
    presenter: 'Mongolia Presentation',
    time: '11:20 - 12:40',
    description: 'Presentation (10 min), Discussion (50 min), Q&A (20 min)',
    downloadUrl: '/downloads/session2.pdf',
    isSession: true,
  },
  {
    id: 'p7',
    title: 'Lunch',
    presenter: 'All Attendees',
    time: '12:50 - 14:20',
    description: '',
    downloadUrl: null,
    isSession: false,
  },
  {
    id: 'p8',
    title: 'SESSION 3: KHUNNU CITY',
    presenter: 'Mongolia & Korea Presentations',
    time: '14:20 - 15:50',
    description: 'Presentations (20 min), Discussion (50 min), Q&A (20 min)',
    downloadUrl: '/downloads/session3.pdf',
    isSession: true,
  },
  {
    id: 'p9',
    title: 'Presentation on the Master Plan of Khunnu City',
    presenter: 'Young Researchers',
    time: '15:50 - 16:10',
    description: '',
    downloadUrl: '/downloads/khunnu-master-plan.pdf',
    isSession: false,
  },
  {
    id: 'p10',
    title: 'Break',
    presenter: 'All Attendees',
    time: '16:10 - 16:40',
    description: '',
    downloadUrl: null,
    isSession: false,
  },
  {
    id: 'p11',
    title:
      'CONCLUSION: REGIONAL DEVELOPMENT AND URBAN DEVELOPMENT OF MONGOLIA',
    presenter: 'All Speakers',
    time: '16:40 - 17:20',
    description: 'Discussion (20 min), Q&A (20 min)',
    downloadUrl: '/downloads/conclusion.pdf',
    isSession: true,
  },
  {
    id: 'p12',
    title: 'Closing Session',
    presenter: 'All Attendees',
    time: '17:20 - 17:30',
    description: '',
    downloadUrl: null,
    isSession: false,
  },
];
