export interface Topic {
  id: string;
  name: string;
  mastery: number;
  lastSeen: string;
  category: string;
  icon: string;
}

export const WEAK_TOPICS: Topic[] = [
  { id: '1', name: 'Quantum Superposition', mastery: 32, lastSeen: '2d ago', category: 'Physics', icon: 'functions' },
  { id: '2', name: 'Keynesian Economics', mastery: 45, lastSeen: '4d ago', category: 'Economics', icon: 'account_balance' },
  { id: '3', name: 'CRISPR Gene Editing', mastery: 51, lastSeen: '1w ago', category: 'Biology', icon: 'dna' }
];

export const ALL_TOPICS: Topic[] = [
  ...WEAK_TOPICS,
  { id: '4', name: 'Cognitive Science', mastery: 88, lastSeen: '3h ago', category: 'Psychology', icon: 'psychology' },
  { id: '5', name: 'Advanced Mathematics', mastery: 62, lastSeen: '1d ago', category: 'Mathematics', icon: 'functions' },
  { id: '6', name: 'World History', mastery: 95, lastSeen: '12h ago', category: 'History', icon: 'history_edu' }
];
