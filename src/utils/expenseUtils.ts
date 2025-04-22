import { Expense, ExpenseSummary, PersonTag, CategoryTag } from '../types';
import { PERSON_TAGS, CATEGORY_TAGS } from '../data/mockData';

// Initialize all tags with zero amount
export const createEmptySummary = (): ExpenseSummary => {
  const byPerson = PERSON_TAGS.reduce((acc, tag) => {
    acc[tag] = 0;
    return acc;
  }, {} as Record<PersonTag, number>);

  const byCategory = CATEGORY_TAGS.reduce((acc, tag) => {
    acc[tag] = 0;
    return acc;
  }, {} as Record<CategoryTag, number>);

  return {
    total: 0,
    byPerson,
    byCategory,
  };
};

// Calculate expense summary
export const calculateExpenseSummary = (expenses: Expense[]): ExpenseSummary => {
  const summary = createEmptySummary();

  expenses.forEach((expense) => {
    summary.total += expense.amount;
    
    if (summary.byPerson[expense.personTag] !== undefined) {
      summary.byPerson[expense.personTag] += expense.amount;
    }
    
    if (summary.byCategory[expense.categoryTag] !== undefined) {
      summary.byCategory[expense.categoryTag] += expense.amount;
    }
  });

  return summary;
};

// Generate a random ID
export const generateId = () => Math.random().toString(36).substring(2, 10);

// Filter expenses based on filter options
export interface FilterOptions {
  searchTerm: string;
  personTags: PersonTag[];
  categoryTags: CategoryTag[];
  dateFrom: string;
  dateTo: string;
  minAmount: string;
  maxAmount: string;
}

export const filterExpenses = (expenses: Expense[], filters: FilterOptions): Expense[] => {
  return expenses.filter(expense => {
    // Filter by search term
    if (
      filters.searchTerm && 
      !expense.description.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
      !(expense.notes?.toLowerCase().includes(filters.searchTerm.toLowerCase()))
    ) {
      return false;
    }
    
    // Filter by person tags
    if (filters.personTags.length > 0 && !filters.personTags.includes(expense.personTag)) {
      return false;
    }
    
    // Filter by category tags
    if (filters.categoryTags.length > 0 && !filters.categoryTags.includes(expense.categoryTag)) {
      return false;
    }
    
    // Filter by date range
    if (filters.dateFrom && expense.date < filters.dateFrom) {
      return false;
    }
    
    if (filters.dateTo && expense.date > filters.dateTo) {
      return false;
    }
    
    // Filter by amount range
    if (filters.minAmount && expense.amount < parseFloat(filters.minAmount)) {
      return false;
    }
    
    if (filters.maxAmount && expense.amount > parseFloat(filters.maxAmount)) {
      return false;
    }
    
    return true;
  });
};

// Export expense data to CSV
export const exportToCSV = (expenses: Expense[]): string => {
  // Define CSV header
  const header = [
    'Date',
    'Description',
    'Amount',
    'Person',
    'Category',
    'Notes'
  ].join(',');
  
  // Convert each expense to CSV row
  const rows = expenses.map(expense => {
    return [
      expense.date,
      `"${expense.description.replace(/"/g, '""')}"`, // Escape quotes in description
      expense.amount,
      expense.personTag,
      expense.categoryTag,
      expense.notes ? `"${expense.notes.replace(/"/g, '""')}"` : '' // Escape quotes in notes
    ].join(',');
  });
  
  // Combine header and rows
  return [header, ...rows].join('\n');
};

// Download CSV file
export const downloadCSV = (expenses: Expense[]) => {
  const csv = exportToCSV(expenses);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  const date = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `expenses_${date}.csv`);
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};