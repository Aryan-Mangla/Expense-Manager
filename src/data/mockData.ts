import { Expense, PersonTag, CategoryTag } from '../types';

// Helper to generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 10);

// Get current date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
const twoDaysAgo = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0];
const threeDaysAgo = new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0];
const fourDaysAgo = new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0];

export const INITIAL_EXPENSES: Expense[] = [
  {
    id: generateId(),
    amount: 120.50,
    date: today,
    description: 'Grocery shopping',
    personTag: 'myself',
    categoryTag: 'groceries',
    notes: 'Weekly grocery run',
  },
  {
    id: generateId(),
    amount: 45.99,
    date: yesterday,
    description: 'Dinner at restaurant',
    personTag: 'myself',
    categoryTag: 'food',
  },
  {
    id: generateId(),
    amount: 89.99,
    date: yesterday,
    description: 'Electricity bill',
    personTag: 'dad',
    categoryTag: 'bills',
    notes: 'Monthly electricity payment',
  },
  {
    id: generateId(),
    amount: 34.50,
    date: twoDaysAgo,
    description: 'Earrings',
    personTag: 'mom',
    categoryTag: 'accessories',
  },
  {
    id: generateId(),
    amount: 250.00,
    date: threeDaysAgo,
    description: 'Winter jacket',
    personTag: 'myself',
    categoryTag: 'shopping',
  },
  {
    id: generateId(),
    amount: 15.75,
    date: threeDaysAgo,
    description: 'Medicine',
    personTag: 'dad',
    categoryTag: 'health',
  },
  {
    id: generateId(),
    amount: 75.00,
    date: fourDaysAgo,
    description: 'Internet bill',
    personTag: 'mom',
    categoryTag: 'bills',
  },
];

export const PERSON_TAGS: PersonTag[] = ['myself', 'mom', 'dad', 'other'];

export const CATEGORY_TAGS: CategoryTag[] = [
  'food', 
  'groceries', 
  'bills', 
  'transportation', 
  'entertainment', 
  'shopping', 
  'accessories',
  'health',
  'other'
];

export const TAG_COLORS: Record<CategoryTag, string> = {
  food: 'bg-amber-100 text-amber-800 border-amber-200',
  groceries: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  bills: 'bg-red-100 text-red-800 border-red-200',
  transportation: 'bg-blue-100 text-blue-800 border-blue-200',
  entertainment: 'bg-purple-100 text-purple-800 border-purple-200',
  shopping: 'bg-pink-100 text-pink-800 border-pink-200',
  accessories: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  health: 'bg-green-100 text-green-800 border-green-200',
  other: 'bg-gray-100 text-gray-800 border-gray-200',
};

export const PERSON_COLORS: Record<PersonTag, string> = {
  myself: 'bg-teal-100 text-teal-800 border-teal-200',
  mom: 'bg-rose-100 text-rose-800 border-rose-200',
  dad: 'bg-sky-100 text-sky-800 border-sky-200',
  other: 'bg-gray-100 text-gray-800 border-gray-200',
};