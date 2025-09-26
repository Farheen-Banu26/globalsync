import { User, Meeting, CalendarSlot, FollowUp, SalesRecord, PrepNote } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'vendor_zoho',
    email: 'vendor@zoho.com',
    role: 'vendor',
    location: 'Chennai, India',
    name: 'Rajesh Kumar'
  },
  {
    id: '2',
    username: 'distributor_de',
    email: 'partner@germany.com',
    role: 'distributor',
    location: 'Berlin, Germany',
    name: 'Klaus Mueller'
  }
];

export const mockMeetings: Meeting[] = [
  {
    id: '1',
    topic: 'Q1 Sales Review & Strategy',
    date: '2025-01-20',
    time: '14:00',
    participants: ['Rajesh Kumar', 'Klaus Mueller'],
    status: 'completed',
    agenda: [
      'Review Q4 2024 performance',
      'Discuss Q1 2025 targets',
      'New product launches',
      'Territory expansion plans'
    ],
    outcome: 'Agreed on 25% growth target for Q1. New CRM tools to be implemented.',
    vendorId: '1',
    distributorId: '2',
    timezone: 'UTC'
  },
  {
    id: '2',
    topic: 'Product Training Session',
    date: '2025-01-25',
    time: '10:00',
    participants: ['Rajesh Kumar', 'Klaus Mueller'],
    status: 'scheduled',
    agenda: [
      'New feature demonstrations',
      'Training materials review',
      'Certification process',
      'Support documentation'
    ],
    vendorId: '1',
    distributorId: '2',
    timezone: 'UTC'
  }
];

export const mockCalendarSlots: CalendarSlot[] = [
  {
    userId: '1',
    date: '2025-01-22',
    freeSlots: ['09:00', '10:00', '14:00', '15:00', '16:00'],
    timezone: 'Asia/Kolkata'
  },
  {
    userId: '2',
    date: '2025-01-22',
    freeSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'],
    timezone: 'Europe/Berlin'
  }
];

export const mockFollowUps: FollowUp[] = [
  {
    id: '1',
    meetingId: '1',
    task: 'Send updated pricing sheet',
    assignee: 'Rajesh Kumar',
    dueDate: '2025-01-23',
    status: 'pending',
    priority: 'high'
  },
  {
    id: '2',
    meetingId: '1',
    task: 'Review territory mapping',
    assignee: 'Klaus Mueller',
    dueDate: '2025-01-24',
    status: 'completed',
    priority: 'medium'
  },
  {
    id: '3',
    meetingId: '2',
    task: 'Prepare training materials',
    assignee: 'Rajesh Kumar',
    dueDate: '2025-01-26',
    status: 'pending',
    priority: 'high'
  }
];

export const mockSalesRecords: SalesRecord[] = [
  {
    date: '2024-12-15',
    product: 'CRM Enterprise',
    vendor: 'Zoho',
    distributor: 'German Partners GmbH',
    amount: 150000,
    region: 'EMEA'
  },
  {
    date: '2024-12-20',
    product: 'Analytics Suite',
    vendor: 'Zoho',
    distributor: 'German Partners GmbH',
    amount: 85000,
    region: 'EMEA'
  },
  {
    date: '2025-01-10',
    product: 'Marketing Automation',
    vendor: 'Zoho',
    distributor: 'German Partners GmbH',
    amount: 95000,
    region: 'EMEA'
  }
];

export const mockPrepNotes: PrepNote[] = [
  {
    meetingId: '2',
    notes: [
      'Focus on new AI features in latest release',
      'Address previous concerns about mobile app performance',
      'Discuss pricing strategy for enterprise clients'
    ],
    keyTopics: [
      'Product Updates',
      'Performance Improvements',
      'Pricing Strategy'
    ],
    lastMeetingSummary: 'Previous meeting focused on Q1 targets and territory expansion. Klaus mentioned strong interest in AI features.'
  }
];