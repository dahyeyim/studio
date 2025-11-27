
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
      korean: '/downloads/session1-korean.pdf',
      mongolian: '/downloads/session1-mongolian.pdf',
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
      korean: '/downloads/session3-korean.pdf',
      mongolian: '/downloads/session3-mongolian.pdf',
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

export interface Presenter {
  id: string;
  name: string;
  affiliation: string;
  imageUrl: string;
  imageHint: string;
  bio: string;
}

export const presenters: Presenter[] = [
  {
    id: 'presenter-d-erdenebayar',
    name: 'D. Erdenebayar',
    affiliation: 'Executive Director, National Institute for Regional Development',
    imageUrl: 'https://picsum.photos/seed/d-erdenebayar/400/300',
    imageHint: 'man portrait',
    bio: 'D. Erdenebayar serves as the Executive Director of the National Institute for Regional Development and is the moderator for this forum.',
  },
  {
    id: 'presenter-m-bayarbat',
    name: 'M. Bayarbat',
    affiliation: 'Chief Architect, Kharkhorum City',
    imageUrl: 'https://picsum.photos/seed/m-bayarbat/400/300',
    imageHint: 'architect portrait',
    bio: 'M. Bayarbat is the Chief Architect of Kharkhorum City. He is responsible for the overall urban design and architectural vision for the new city.',
  },
  {
    id: 'presenter-b-amarsanaa',
    name: 'B. Amarsanaa',
    affiliation: 'Senior Specialist, Dept. of Urban Planning and Development, Kharkhorum',
    imageUrl: 'https://picsum.photos/seed/b-amarsanaa/400/300',
    imageHint: 'professional man',
    bio: 'B. Amarsanaa is a senior specialist in urban planning and development policy for Kharkhorum city. His work involves creating and implementing strategic development plans for the region.',
  },
  {
    id: 'presenter-kim-hyung-ryeol',
    name: 'Kim, Hyung Ryeol',
    affiliation: 'Yonsei University, Dept. of Civil and Environmental Engineering',
    imageUrl: 'https://picsum.photos/seed/kim-hyung-ryeol/400/300',
    imageHint: 'korean professor',
    bio: 'Kim, Hyung Ryeol is a professor in the Department of Civil and Environmental Engineering at Yonsei University. His expertise covers urban infrastructure and sustainable environmental engineering.',
  },
  {
    id: 'presenter-tae-kyung-jin',
    name: 'Tae, Kyung Jin',
    affiliation: 'CEO, XaHA Urban and Architectural Research Institute',
    imageUrl: 'https://picsum.photos/seed/tae-kyung-jin/400/300',
    imageHint: 'architect headshot',
    bio: 'Tae, Kyung Jin is the CEO of the XaHA (Cross-Architectural and Human-oriented Actions) Urban and Architectural Research Institute, focusing on human-centered design in urban environments.',
  },
  {
    id: 'presenter-l-khaltar',
    name: 'L. Khaltar',
    affiliation: 'Governor, Kharkhorum City',
    imageUrl: 'https://picsum.photos/seed/l-khaltar/400/300',
    imageHint: 'politician portrait',
    bio: 'L. Khaltar serves as the Governor of Kharkhorum City, overseeing the administrative and developmental functions of the new city.',
  },
  {
    id: 'presenter-koh-seah-bum',
    name: 'Koh, Seah Bum',
    affiliation: 'Director, XaHA Urban and Architectural Research Institute',
    imageUrl: 'https://picsum.photos/seed/koh-seah-bum/400/300',
    imageHint: 'smiling architect',
    bio: 'Koh, Seah Bum is a Director at the XaHA Urban and Architectural Research Institute, leading research in innovative urban and architectural solutions.',
  },
  {
    id: 'presenter-r-rinchinbazar',
    name: 'R. Rinchinbazar',
    affiliation: 'Board Member, Fiscal Stability Council & Professor, NUM',
    imageUrl: 'https://picsum.photos/seed/r-rinchinbazar/400/300',
    imageHint: 'senior professor',
    bio: 'Dr. R. Rinchinbazar is a board member of the Fiscal Stability Council and a contract professor at the National University of Mongolia (NUM), bringing extensive experience in economics and public policy.',
  },
  {
    id: 'presenter-v-battsengel',
    name: 'V. Battsengel',
    affiliation: 'Director, Center for Urban and Regional Development Studies, NUM',
    imageUrl: 'https://picsum.photos/seed/v-battsengel/400/300',
    imageHint: 'man giving presentation',
    bio: 'Dr. Prof. V. Battsengel is the Director of the Center for Urban and Regional Development Studies at the National University of Mongolia (NUM).',
  },
  {
    id: 'presenter-g-gantulga',
    name: 'G. Gantulga',
    affiliation: 'Associate Professor, Dept. of Geography, National University of Mongolia',
    imageUrl: 'https://picsum.photos/seed/g-gantulga/400/300',
    imageHint: 'geography professor',
    bio: 'Dr. G. Gantulga is an Associate Professor in the Department of Geography at the School of Arts and Sciences, National University of Mongolia (NUM).',
  },
  {
    id: 'presenter-b-ariunjargalan',
    name: 'B.Ariunjargalan',
    affiliation: 'Senior Lecturer, Dept. of Urban Planning, MUST',
    imageUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc2NTQxOTk5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'woman portrait',
    bio: 'Dr. B. Ariunjargalan is a senior lecturer and urban redevelopment researcher in the Department of Urban Planning at the Mongolian University of Science and Technology (MUST).',
  },
];

    
