import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Header } from '../components/Header';
import { ExpenseForm } from '../components/ExpenseForm';
import { ExpenseList } from '../components/ExpenseList';
import { ExpenseSummary } from '../components/ExpenseSummary';
import { ExpenseFilter, FilterOptions } from '../components/ExpenseFilter';
import { Button } from '../components/ui/Button';
import { Expense } from '../types';
import { 
  INITIAL_EXPENSES
} from '../data/mockData';
import { 
  generateId, 
  calculateExpenseSummary, 
  filterExpenses, 
  downloadCSV 
} from '../utils/expenseUtils';

export const Dashboard: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    personTags: [],
    categoryTags: [],
    dateFrom: '',
    dateTo: '',
    minAmount: '',
    maxAmount: '',
  });
  const [isAddingExpense, setIsAddingExpense] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [timeframe, setTimeframe] = useState('All time');

  // Apply filters when expenses or filters change
  useEffect(() => {
    setFilteredExpenses(filterExpenses(expenses, filters));
    
    // Update timeframe display
    if (filters.dateFrom && filters.dateTo) {
      setTimeframe(`${filters.dateFrom} to ${filters.dateTo}`);
    } else if (filters.dateFrom) {
      setTimeframe(`From ${filters.dateFrom}`);
    } else if (filters.dateTo) {
      setTimeframe(`Until ${filters.dateTo}`);
    } else {
      setTimeframe('All time');
    }
  }, [expenses, filters]);

  const handleAddExpense = (expenseData: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: generateId(),
    };
    
    setExpenses([newExpense, ...expenses]);
    setIsAddingExpense(false);
  };

  const handleUpdateExpense = (expenseData: Omit<Expense, 'id'>) => {
    if (!editingExpense) return;
    
    const updatedExpenses = expenses.map(expense => 
      expense.id === editingExpense.id 
        ? { ...expenseData, id: expense.id } 
        : expense
    );
    
    setExpenses(updatedExpenses);
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      setExpenses(expenses.filter(expense => expense.id !== id));
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setIsAddingExpense(false);
  };

  const handleExport = () => {
    downloadCSV(filteredExpenses);
  };

  const summary = calculateExpenseSummary(filteredExpenses);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onExport={handleExport} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {(isAddingExpense || editingExpense) && (
          <div className="mb-8">
            <ExpenseForm 
              onAddExpense={editingExpense ? handleUpdateExpense : handleAddExpense}
              initialValues={editingExpense || undefined}
              isEditing={!!editingExpense}
              onCancel={() => {
                setIsAddingExpense(false);
                setEditingExpense(null);
              }}
            />
          </div>
        )}
        
        {!isAddingExpense && !editingExpense && (
          <div className="mb-6 flex justify-end">
            <Button 
              onClick={() => setIsAddingExpense(true)}
              icon={<Plus size={16} />}
            >
              Add Expense
            </Button>
          </div>
        )}
        
        <ExpenseSummary summary={summary} timeframe={timeframe} />
        
        <ExpenseFilter onFilterChange={setFilters} />
        
        <ExpenseList 
          expenses={filteredExpenses} 
          onDelete={handleDeleteExpense}
          onEdit={handleEditExpense}
        />
      </main>
    </div>
  );
};