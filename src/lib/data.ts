export interface Attendee {
  id: string;
  name: string;
  affiliation: string;
  email: string;
  phone: string;
}

export interface Presentation {
  id: string;
  title: string;
  presenter: string;
  time: string;
  description: string;
  downloadUrl: string;
}

export const attendees: Attendee[] = [
  {
    id: '1',
    name: '김민준',
    affiliation: '넥스트젠 이노베이션',
    email: 'mj.kim@nextgen.com',
    phone: '010-1111-2222',
  },
  {
    id: '2',
    name: '이서연',
    affiliation: '크리에이티브 솔루션',
    email: 'sy.lee@creativesol.com',
    phone: '010-2222-3333',
  },
  {
    id: '3',
    name: '박지훈',
    affiliation: '퓨처테크',
    email: 'jh.park@future-tech.net',
    phone: '010-3333-4444',
  },
  {
    id: '4',
    name: '최수아',
    affiliation: '데이터 인사이트',
    email: 'sa.choi@datainsight.io',
    phone: '010-4444-5555',
  },
  {
    id: '5',
    name: '정현우',
    affiliation: '넥스트젠 이노베이션',
    email: 'hw.jung@nextgen.com',
    phone: '010-5555-6666',
  },
  {
    id: '6',
    name: '윤지아',
    affiliation: '서울기술대학교',
    email: 'ja.yoon@stech.ac.kr',
    phone: '010-6666-7777',
  },
];

export const presentationSchedule: Presentation[] = [
  {
    id: 'p1',
    title: 'Welcome & Introduction to SeminarSync',
    presenter: 'SeminarSync Team',
    time: '9:00 AM - 9:30 AM',
    description:
      'An overview of the day\'s events and a brief introduction to the SeminarSync application features designed to enhance your experience.',
    downloadUrl: '/downloads/intro.pdf',
  },
  {
    id: 'p2',
    title: 'The Future of AI in Business',
    presenter: 'Dr. Evelyn Reed',
    time: '9:30 AM - 10:30 AM',
    description:
      'A deep dive into how artificial intelligence is reshaping industries, with a focus on practical applications and future trends.',
    downloadUrl: '/downloads/ai-in-business.pdf',
  },
  {
    id: 'p3',
    title: 'Networking Break',
    presenter: 'All Attendees',
    time: '10:30 AM - 11:00 AM',
    description:
      'A short break for networking with fellow attendees. Coffee and refreshments will be served.',
    downloadUrl: '#',
  },
  {
    id: 'p4',
    title: 'Sustainable Technology Practices',
    presenter: 'Mark Chen',
    time: '11:00 AM - 12:00 PM',
    description:
      'Exploring how companies can adopt greener technologies and practices to reduce their environmental impact while boosting efficiency.',
    downloadUrl: '/downloads/sustainable-tech.pdf',
  },
  {
    id: 'p5',
    title: 'Closing Remarks & Q&A Panel',
    presenter: 'All Speakers',
    time: '12:00 PM - 12:30 PM',
    description:
      'A final panel with all speakers to answer your most pressing questions, followed by closing remarks.',
    downloadUrl: '#',
  },
];
