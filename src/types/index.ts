export type PersonTag = 'myself' | 'mom' | 'dad' | 'other';

export type CategoryTag = 
  | 'food' 
  | 'groceries' 
  | 'bills' 
  | 'transportation' 
  | 'entertainment' 
  | 'shopping' 
  | 'accessories'
  | 'health'
  | 'other';

export interface Expense {
  id: string;
  amount: number;
  date: string;
  description: string;
  personTag: PersonTag;
  categoryTag: CategoryTag;
  notes?: string;
}

export interface ExpenseSummary {
  total: number;
  byPerson: Record<PersonTag, number>;
  byCategory: Record<CategoryTag, number>;
}