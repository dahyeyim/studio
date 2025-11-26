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
  downloadUrl: string | null;
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
    title: 'Registration (Coffee break)',
    presenter: 'All Attendees',
    time: '08:30 - 08:50',
    description: '참석자 등록 및 커피 브레이크',
    downloadUrl: null,
  },
  {
    id: 'p2',
    title: 'Opening Remarks',
    presenter: 'Executive Director of NIRD / KOICA Resident Representative',
    time: '09:00 - 09:15',
    description: '개회사',
    downloadUrl: null,
  },
  {
    id: 'p3',
    title: 'Group Photo',
    presenter: 'All Attendees',
    time: '09:15 - 09:20',
    description: '단체 사진 촬영',
    downloadUrl: null,
  },
  {
    id: 'p4',
    title: 'SESSION 1: KHARKHORUM CITY',
    presenter: 'Mongolia & Korea Presentations',
    time: '09:20 - 10:50',
    description: 'Presentations (20 min), Discussion (50 min), Q&A (20 min)',
    downloadUrl: '/downloads/session1.pdf',
  },
  {
    id: 'p5',
    title: 'Coffee break',
    presenter: 'All Attendees',
    time: '10:50 - 11:20',
    description: '커피 브레이크',
    downloadUrl: null,
  },
  {
    id: 'p6',
    title: 'SESSION 2: THE 14 DISTRICTS OF ULAANBAATAR CITY',
    presenter: 'Mongolia Presentation',
    time: '11:20 - 12:40',
    description: 'Presentation (10 min), Discussion (50 min), Q&A (20 min)',
    downloadUrl: '/downloads/session2.pdf',
  },
  {
    id: 'p7',
    title: 'Lunch',
    presenter: 'All Attendees',
    time: '12:50 - 14:20',
    description: '점심 식사',
    downloadUrl: null,
  },
  {
    id: 'p8',
    title: 'SESSION 3: KHUNNU CITY',
    presenter: 'Mongolia & Korea Presentations',
    time: '14:20 - 15:50',
    description: 'Presentations (20 min), Discussion (50 min), Q&A (20 min)',
    downloadUrl: '/downloads/session3.pdf',
  },
  {
    id: 'p9',
    title: 'Presentation on the Master Plan of Khunnu City',
    presenter: 'Young Researchers',
    time: '15:50 - 16:10',
    description: '젊은 연구자들의 Khunnu City 마스터 플랜 발표',
    downloadUrl: '/downloads/khunnu-master-plan.pdf',
  },
  {
    id: 'p10',
    title: 'Break',
    presenter: 'All Attendees',
    time: '16:10 - 16:40',
    description: '휴식 시간',
    downloadUrl: null,
  },
  {
    id: 'p11',
    title:
      'CONCLUSION: REGIONAL DEVELOPMENT AND URBAN DEVELOPMENT OF MONGOLIA',
    presenter: 'All Speakers',
    time: '16:40 - 17:20',
    description: 'Discussion (20 min), Q&A (20 min)',
    downloadUrl: '/downloads/conclusion.pdf',
  },
  {
    id: 'p12',
    title: 'Closing Session',
    presenter: 'All Attendees',
    time: '17:20 - 17:30',
    description: '폐회',
    downloadUrl: null,
  },
];
