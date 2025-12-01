
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
    name: 'B.Ariunjargalan',
    affiliation: 'National Institute for Regional and Urban Development',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0fGVufDB8fHx8MTc2Mzc0NTI0MXww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'woman portrait',
    bio: 'B. Ariunjargalan is a leading researcher at the National Institute for Regional and Urban Development, specializing in sustainable urban planning and infrastructure. With over 15 years of experience, she has been instrumental in shaping policies for smart city development in Mongolia. Her work focuses on integrating green technologies and community-centric designs into modern urban environments.',
  },
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
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx3b21hbiUyMHNtaWxpbmd8ZW58MHx8fHwxNzYzODE0MjEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'woman smiling',
    bio: 'Dr. Lee Seo-yeon is a principal researcher at the Korea Research Institute for Human Settlements (KRIHS). Her research focuses on housing policy, smart cities, and international urban development cooperation. She has published extensively on the social impacts of urbanization and has worked as a consultant for various international organizations, including the World Bank and the Asian Development Bank.',
  },
  {
    name: 'Gantulga Batbold',
    affiliation: 'Ulaanbaatar City Municipality',
    imageUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtYW4lMjBzbWlsaW5nfGVufDB8fHx8MTc2MzczMTA1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    imageHint: 'man smiling',
    bio: "Gantulga Batbold serves as the head of the Urban Planning Department for the Ulaanbaatar City Municipality. He is responsible for overseeing the city's master plan and guiding its development to address challenges like traffic congestion and air pollution. He is passionate about creating a more livable and sustainable capital city for the citizens of Mongolia.",
  },
];
