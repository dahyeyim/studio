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
    name: 'Jane Doe',
    affiliation: 'TechCorp',
    email: 'jane.doe@techcorp.com',
    phone: '123-456-7890',
  },
  {
    id: '2',
    name: 'John Smith',
    affiliation: 'Innovate LLC',
    email: 'john.smith@innovate.com',
    phone: '234-567-8901',
  },
  {
    id: '3',
    name: 'Emily White',
    affiliation: 'Future Solutions',
    email: 'emily.w@futuresol.net',
    phone: '345-678-9012',
  },
  {
    id: '4',
    name: 'Michael Brown',
    affiliation: 'Data Systems Inc.',
    email: 'm.brown@datasys.io',
    phone: '456-789-0123',
  },
  {
    id: '5',
    name: 'Sarah Green',
    affiliation: 'TechCorp',
    email: 'sarah.green@techcorp.com',
    phone: '567-890-1234',
  },
  {
    id: '6',
    name: 'David Black',
    affiliation: 'University of Technology',
    email: 'david.b@unitech.edu',
    phone: '678-901-2345',
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
