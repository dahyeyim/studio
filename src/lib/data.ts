
export interface Presentation {
  id: string;
  title: string;
  presenter: string;
  time: string;
  description: string;
  downloadUrls: {
    korean: string | null;
    mongolian: string | null;
  } | null;
  isSession: boolean;
}

export const presentationSchedule: Presentation[] = [
  {
    id: 'p1',
    title: 'Registration (Coffee break)',
    presenter: 'All Attendees',
    time: '08:30 - 08:50',
    description: '',
    downloadUrls: null,
    isSession: false,
  },
  {
    id: 'p2',
    title: 'Opening Remarks',
    presenter: 'Executive Director of NIRD / KOICA Resident Representative',
    time: '09:00 - 09:15',
    description: '',
    downloadUrls: null,
    isSession: false,
  },
  {
    id: 'p3',
    title: 'Group Photo',
    presenter: 'All Attendees',
    time: '09:15 - 09:20',
    description: '',
    downloadUrls: null,
    isSession: false,
  },
  {
    id: 'p4',
    title: 'SESSION 1: KHARKHORUM CITY',
    presenter: 'Mongolia & Korea Presentations',
    time: '09:20 - 10:50',
    description: 'Presentations (20 min), Discussion (50 min), Q&A (20 min)',
    downloadUrls: {
      korean: 'https://drive.google.com/file/d/16mdkg3Ehn-lYLBI3QH4d--pn1fTQb0kw/view?usp=drive_link',
      mongolian: 'https://drive.google.com/file/d/1CLFNBFG1Lur3QAtsjM80PINqA5yJljLi/view?usp=drive_link',
    },
    isSession: true,
  },
  {
    id: 'p5',
    title: 'Coffee break',
    presenter: 'All Attendees',
    time: '10:50 - 11:20',
    description: '',
    downloadUrls: null,
    isSession: false,
  },
  {
    id: 'p6',
    title: 'SESSION 2: THE 14 DISTRICTS OF ULAANBAATAR CITY',
    presenter: 'Mongolia Presentation',
    time: '11:20 - 12:40',
    description: 'Presentation (10 min), Discussion (50 min), Q&A (20 min)',
    downloadUrls: {
      korean: '/downloads/session2-korean.pdf',
      mongolian: '/downloads/session2-mongolian.pdf',
    },
    isSession: true,
  },
  {
    id: 'p7',
    title: 'Lunch',
    presenter: 'All Attendees',
    time: '12:50 - 14:20',
    description: '',
    downloadUrls: null,
    isSession: false,
  },
  {
    id: 'p8',
    title: 'SESSION 3: KHUNNU CITY',
    presenter: 'Mongolia & Korea Presentations',
    time: '14:20 - 15:50',
    description: 'Presentations (20 min), Discussion (50 min), Q&A (20 min)',
    downloadUrls: {
      korean: 'https://drive.google.com/file/d/1uLV1Wdum8v4haoYGhTEsWMqD1RGdwaIB/view?usp=drive_link',
      mongolian: 'https://drive.google.com/file/d/1gmCzOrcdMjkTcputlP1jBEEy-KobBp-9/view?usp=drive_link',
    },
    isSession: true,
  },
  {
    id: 'p9',
    title: 'Presentation on the Master Plan of Khunnu City',
    presenter: 'Young Researchers',
    time: '15:50 - 16:10',
    description: '',
    downloadUrls: {
      korean: '/downloads/khunnu-master-plan-korean.pdf',
      mongolian: '/downloads/khunnu-master-plan-mongolian.pdf',
    },
    isSession: false,
  },
  {
    id: 'p10',
    title: 'Break',
    presenter: 'All Attendees',
    time: '16:10 - 16:40',
    description: '',
    downloadUrls: null,
    isSession: false,
  },
  {
    id: 'p11',
    title:
      'CONCLUSION: REGIONAL DEVELOPMENT AND URBAN DEVELOPMENT OF MONGOLIA',
    presenter: 'All Speakers',
    time: '16:40 - 17:20',
    description: 'Discussion (20 min), Q&A (20 min)',
    downloadUrls: {
      korean: '/downloads/conclusion-korean.pdf',
      mongolian: '/downloads/conclusion-mongolian.pdf',
    },
    isSession: true,
  },
  {
    id: 'p12',
    title: 'Closing Session',
    presenter: 'All Attendees',
    time: '17:20 - 17:30',
    description: '',
    downloadUrls: null,
    isSession: false,
  },
];

export const staticPresenters = [
  {
    name: 'Kim Min-jun',
    affiliation: 'Seoul Metropolitan Government',
    imageUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjM4MDkyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'man portrait',
    bio: 'Kim Min-jun is a senior urban planner for the Seoul Metropolitan Government. He has led numerous successful urban regeneration projects, transforming old industrial areas into vibrant cultural hubs. His expertise lies in public-private partnerships and the implementation of technology-driven solutions to improve city life. He is a strong advocate for data-informed policy making.',
  },
  {
    name: 'Lee Seo-yeon',
    affiliation: 'Korea Research Institute for Human Settlements',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc2Mzc0NTI0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'woman portrait',
    bio: 'Dr. Lee Seo-yeon is a principal researcher at the Korea Research Institute for Human Settlements (KRIHS). Her research focuses on housing policy, smart cities, and international urban development cooperation. She has published extensively on the social impacts of urbanization and has worked as a consultant for various international organizations, including the World Bank and the Asian Development Bank.',
  },
];
