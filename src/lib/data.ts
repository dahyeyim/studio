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
    id: 'presenter-1',
    name: 'Kim Min-jun',
    affiliation: 'Seoul National University, Dept. of Urban Engineering',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjM4MDkyNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'man portrait',
    bio: 'Dr. Kim Min-jun is a professor in the Department of Urban Engineering at Seoul National University. His research focuses on smart cities, sustainable urban development, and the integration of technology in urban planning. He has published numerous papers and has been a consultant for several major urban regeneration projects in Seoul.',
  },
  {
    id: 'presenter-2',
    name: 'Lee Seo-yeon',
    affiliation: 'Korea Research Institute for Human Settlements (KRIHS)',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc2Mzc0NTI0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'woman portrait',
    bio: 'Dr. Lee Seo-yeon is a senior researcher at the Korea Research Institute for Human Settlements (KRIHS). Her work centers on housing policy, urban economics, and regional development. She has been instrumental in shaping policies related to affordable housing and balanced national development in South Korea.',
  },
  {
    id: 'presenter-3',
    name: 'Gantulga Batbold',
    affiliation: 'National University of Mongolia, Dept. of Geography',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtYW4lMjBzbWlsaW5nfGVufDB8fHx8MTc2MzczMTA1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'man smiling',
    bio: 'Professor Gantulga Batbold is a leading academic in the Department of Geography at the National University of Mongolia. His expertise lies in urbanization patterns in Central Asia, the environmental impacts of urban expansion, and the development of new cities like Kharkhorum. He is a key advisor to the Mongolian government on urban strategy.',
  },
  {
    id: 'presenter-4',
    name: 'Nomin-Erdene Tseren',
    affiliation: 'Ulaanbaatar City Municipality, Dept. of Planning',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx3b21hbiUyMHByb2ZpbGV8ZW58MHx8fHwxNzYzNzczNzU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'woman profile',
    bio: "Nomin-Erdene Tseren is the head of the Urban Planning department at the Ulaanbaatar City Municipality. With over 15 years of experience, she has been a driving force behind major infrastructure projects and the master plan for Ulaanbaatar's satellite districts. Her focus is on creating livable and resilient urban environments for the city's growing population.",
  },
];
