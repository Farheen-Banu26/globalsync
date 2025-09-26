export interface User {
  id: string;
  username: string;
  email: string;
  role: 'vendor' | 'distributor';
  location: string;
  name: string;
}

export interface Meeting {
  id: string;
  topic: string;
  date: string;
  time: string;
  participants: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
  agenda?: string[];
  outcome?: string;
  vendorId: string;
  distributorId: string;
  timezone: string;
}

export interface CalendarSlot {
  userId: string;
  date: string;
  freeSlots: string[];
  timezone: string;
}

export interface FollowUp {
  id: string;
  meetingId: string;
  task: string;
  assignee: string;
  dueDate: string;
  status: 'pending' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

export interface SalesRecord {
  date: string;
  product: string;
  vendor: string;
  distributor: string;
  amount: number;
  region: string;
}

export interface PrepNote {
  meetingId: string;
  notes: string[];
  keyTopics: string[];
  lastMeetingSummary: string;
}