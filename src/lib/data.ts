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
    imageUrl: 'https://picsum.photos/seed/d-erdenebayar/400/400',
    imageHint: 'man portrait',
    bio: 'Executive Director at the National Institute for Regional Development. Serving as the moderator for the forum.',
  },
  {
    id: 'presenter-m-bayarbat',
    name: 'M. Bayarbat',
    affiliation: 'Chief Architect, Kharkhorum City',
    imageUrl: 'https://picsum.photos/seed/m-bayarbat/400/400',
    imageHint: 'man portrait suit',
    bio: 'Chief Architect of Kharkhorum City, participating in the discussion panel.',
  },
  {
    id: 'presenter-b-amarsanaa',
    name: 'B. Amarsanaa',
    affiliation: 'Senior Specialist, Dept. of Urban Planning and Development Policy, Kharkhorum City',
    imageUrl: 'https://picsum.photos/seed/b-amarsanaa/400/400',
    imageHint: 'man smiling',
    bio: 'Senior Specialist at the Department of Urban Planning and Development Policy of Kharkhorum City.',
  },
  {
    id: 'presenter-kim-hyung-ryeol',
    name: 'Kim, Hyung Ryeol',
    affiliation: 'Yonsei University, Dept. of Civil and Environmental Engineering',
    imageUrl: 'https://picsum.photos/seed/kim-hyung-ryeol/400/400',
    imageHint: 'man portrait glasses',
    bio: 'Professor at the Department of Civil and Environmental Engineering at Yonsei University.',
  },
  {
    id: 'presenter-tae-kyung-jin',
    name: 'Tae, Kyung Jin',
    affiliation: 'CEO, XHANA Urban and Architectural Planning Institute',
    imageUrl: 'https://picsum.photos/seed/tae-kyung-jin/400/400',
    imageHint: 'man profile',
    bio: 'CEO of the XHANA Urban and Architectural Planning Institute.',
  },
  {
    id: 'presenter-l-khaltar',
    name: 'L. Khaltar',
    affiliation: 'Governor of Kharkhorum City',
    imageUrl: 'https://picsum.photos/seed/l-khaltar/400/400',
    imageHint: 'man suit serious',
    bio: 'Governor of Kharkhorum City and a keynote speaker at the forum.',
  },
  {
    id: 'presenter-koh-seah-bum',
    name: 'Koh, Seah Bum',
    affiliation: 'Director, XHANA Urban and Architectural Planning Institute',
    imageUrl: 'https://picsum.photos/seed/koh-seah-bum/400/400',
    imageHint: 'man glasses smiling',
    bio: 'Director at the XHANA Urban and Architectural Planning Institute and a keynote speaker.',
  },
  {
    id: 'presenter-r-rinchinbazar',
    name: 'R. Rinchinbazar',
    affiliation: 'Member of the Fiscal Stability Board, Contract Professor, NUM',
    imageUrl: 'https://picsum.photos/seed/r-rinchinbazar/400/400',
    imageHint: 'man glasses serious',
    bio: 'Member of the Fiscal Stability Board and a contract professor and doctor at the National University of Mongolia (NUM).',
  },
  {
    id: 'presenter-v-battsengel',
    name: 'V. Battsengel',
    affiliation: 'Director, Urban and Regional Development Research Institute, NUM',
    imageUrl: 'https://picsum.photos/seed/v-battsengel/400/400',
    imageHint: 'man microphone',
    bio: 'Director, Doctor, and Professor at the Urban and Regional Development Research Institute of the National University of Mongolia (NUM).',
  },
  {
    id: 'presenter-g-gantulga',
    name: 'G. Gantulga',
    affiliation: 'Dept. of Geography, School of Arts and Sciences, NUM',
    imageUrl: 'https://picsum.photos/seed/g-gantulga/400/400',
    imageHint: 'man glasses friendly',
    bio: 'Doctor and Associate Professor at the Department of Geography, School of Arts and Sciences, National University of Mongolia (NUM).',
  },
  {
    id: 'presenter-b-ariunzhargalan',
    name: 'B. Ariunzhargalan',
    affiliation: 'Senior Lecturer, Dept. of Urban Planning, School of Civil Engineering and Architecture, MUST',
    imageUrl: 'https://picsum.photos/seed/b-ariunzhargalan/400/400',
    imageHint: 'woman smiling professional',
    bio: 'Senior Lecturer and Doctor at the Department of Urban Planning, School of Civil Engineering and Architecture, Mongolian University of Science and Technology (MUST). Urban redevelopment researcher.',
  },
];
