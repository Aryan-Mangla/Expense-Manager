import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { CategoryTagBadge, PersonTagBadge } from './ui/Tag';
import { Expense, PersonTag, CategoryTag } from '../types';
import { PERSON_TAGS, CATEGORY_TAGS } from '../data/mockData';

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  initialValues?: Omit<Expense, 'id'>;
  isEditing?: boolean;
  onCancel?: () => void;
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ 
  onAddExpense, 
  initialValues, 
  isEditing = false,
  onCancel,
}) => {
  const [amount, setAmount] = useState(initialValues?.amount?.toString() || '');
  const [date, setDate] = useState(initialValues?.date || new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState(initialValues?.description || '');
  const [personTag, setPersonTag] = useState<PersonTag>(initialValues?.personTag || 'myself');
  const [categoryTag, setCategoryTag] = useState<CategoryTag>(initialValues?.categoryTag || 'other');
  const [notes, setNotes] = useState(initialValues?.notes || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || isNaN(Number(amount))) {
      setError('Please enter a valid amount');
      return;
    }
    
    if (!description) {
      setError('Please enter a description');
      return;
    }

    if (!date) {
      setError('Please select a date');
      return;
    }
    
    setError('');
    
    onAddExpense({
      amount: parseFloat(amount),
      date,
      description,
      personTag,
      categoryTag,
      notes: notes.trim() ? notes : undefined,
    });
    
    if (!isEditing) {
      // Reset form if adding new expense
      setAmount('');
      setDate(new Date().toISOString().split('T')[0]);
      setDescription('');
      setPersonTag('myself');
      setCategoryTag('other');
      setNotes('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="bg-white rounded-lg shadow-md p-6 mx-auto max-w-lg"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        {isEditing ? 'Edit Expense' : 'Add New Expense'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              className="pl-8 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            id="date"
            type="date"
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <input
          id="description"
          type="text"
          placeholder="What was this expense for?"
          className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Person
        </label>
        <div className="flex flex-wrap gap-2">
          {PERSON_TAGS.map((tag) => (
            <div 
              key={tag} 
              onClick={() => setPersonTag(tag)}
              className="cursor-pointer"
            >
              <PersonTagBadge
                tag={tag}
                selected={personTag === tag}
                clickable
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_TAGS.map((tag) => (
            <div 
              key={tag} 
              onClick={() => setCategoryTag(tag)}
              className="cursor-pointer"
            >
              <CategoryTagBadge
                tag={tag}
                selected={categoryTag === tag}
                clickable
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-5">
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          rows={3}
          placeholder="Any additional details..."
          className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      
      <div className="flex justify-end gap-3">
        {isEditing && onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          icon={<PlusCircle size={16} />}
        >
          {isEditing ? 'Update Expense' : 'Add Expense'}
        </Button>
      </div>
    </form>
  );
};