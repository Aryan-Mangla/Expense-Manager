import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from './ui/Button';
import { PersonTagBadge, CategoryTagBadge } from './ui/Tag';
import { PersonTag, CategoryTag } from '../types';
import { PERSON_TAGS, CATEGORY_TAGS } from '../data/mockData';

interface FilterOptions {
  searchTerm: string;
  personTags: PersonTag[];
  categoryTags: CategoryTag[];
  dateFrom: string;
  dateTo: string;
  minAmount: string;
  maxAmount: string;
}

interface ExpenseFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export const ExpenseFilter: React.FC<ExpenseFilterProps> = ({ onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPersonTags, setSelectedPersonTags] = useState<PersonTag[]>([]);
  const [selectedCategoryTags, setSelectedCategoryTags] = useState<CategoryTag[]>([]);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  const applyFilters = () => {
    onFilterChange({
      searchTerm,
      personTags: selectedPersonTags,
      categoryTags: selectedCategoryTags,
      dateFrom,
      dateTo,
      minAmount,
      maxAmount,
    });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedPersonTags([]);
    setSelectedCategoryTags([]);
    setDateFrom('');
    setDateTo('');
    setMinAmount('');
    setMaxAmount('');
    
    onFilterChange({
      searchTerm: '',
      personTags: [],
      categoryTags: [],
      dateFrom: '',
      dateTo: '',
      minAmount: '',
      maxAmount: '',
    });
  };

  const togglePersonTag = (tag: PersonTag) => {
    if (selectedPersonTags.includes(tag)) {
      setSelectedPersonTags(selectedPersonTags.filter(t => t !== tag));
    } else {
      setSelectedPersonTags([...selectedPersonTags, tag]);
    }
  };

  const toggleCategoryTag = (tag: CategoryTag) => {
    if (selectedCategoryTags.includes(tag)) {
      setSelectedCategoryTags(selectedCategoryTags.filter(t => t !== tag));
    } else {
      setSelectedCategoryTags([...selectedCategoryTags, tag]);
    }
  };

  const hasActiveFilters = () => {
    return (
      searchTerm !== '' || 
      selectedPersonTags.length > 0 || 
      selectedCategoryTags.length > 0 ||
      dateFrom !== '' ||
      dateTo !== '' ||
      minAmount !== '' ||
      maxAmount !== ''
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search expenses..."
            className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onFilterChange({
                searchTerm: e.target.value,
                personTags: selectedPersonTags,
                categoryTags: selectedCategoryTags,
                dateFrom,
                dateTo,
                minAmount,
                maxAmount,
              });
            }}
          />
        </div>
        <div className="ml-3 flex items-center">
          <Button
            variant={isExpanded ? "primary" : "outline"}
            size="md"
            icon={isExpanded ? <X size={16} /> : <Filter size={16} />}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Hide Filters" : "Filters"}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-4 pt-2 border-t border-gray-200 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Person Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {PERSON_TAGS.map((tag) => (
                  <div 
                    key={tag} 
                    onClick={() => togglePersonTag(tag)}
                    className="cursor-pointer"
                  >
                    <PersonTagBadge
                      tag={tag}
                      selected={selectedPersonTags.includes(tag)}
                      clickable
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_TAGS.map((tag) => (
                  <div 
                    key={tag} 
                    onClick={() => toggleCategoryTag(tag)}
                    className="cursor-pointer"
                  >
                    <CategoryTagBadge
                      tag={tag}
                      selected={selectedCategoryTags.includes(tag)}
                      clickable
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="date"
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    placeholder="From"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    placeholder="To"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    className="pl-8 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={minAmount}
                    onChange={(e) => setMinAmount(e.target.value)}
                    placeholder="Min"
                    min="0"
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    className="pl-8 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                    placeholder="Max"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={resetFilters}
            >
              Reset
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={applyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      {hasActiveFilters() && !isExpanded && (
        <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200">
          {selectedPersonTags.map(tag => (
            <PersonTagBadge
              key={`person-${tag}`}
              tag={tag}
              onRemove={() => togglePersonTag(tag)}
            />
          ))}
          {selectedCategoryTags.map(tag => (
            <CategoryTagBadge
              key={`category-${tag}`}
              tag={tag}
              onRemove={() => toggleCategoryTag(tag)}
            />
          ))}
          {dateFrom && (
            <div className="inline-flex items-center text-xs px-2.5 py-1 rounded-full border bg-gray-100 text-gray-800">
              <span>From: {dateFrom}</span>
              <button 
                onClick={() => {
                  setDateFrom('');
                  applyFilters();
                }} 
                className="ml-1.5 hover:bg-black hover:bg-opacity-10 rounded-full"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {dateTo && (
            <div className="inline-flex items-center text-xs px-2.5 py-1 rounded-full border bg-gray-100 text-gray-800">
              <span>To: {dateTo}</span>
              <button 
                onClick={() => {
                  setDateTo('');
                  applyFilters();
                }} 
                className="ml-1.5 hover:bg-black hover:bg-opacity-10 rounded-full"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {minAmount && (
            <div className="inline-flex items-center text-xs px-2.5 py-1 rounded-full border bg-gray-100 text-gray-800">
              <span>Min: ${minAmount}</span>
              <button 
                onClick={() => {
                  setMinAmount('');
                  applyFilters();
                }} 
                className="ml-1.5 hover:bg-black hover:bg-opacity-10 rounded-full"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {maxAmount && (
            <div className="inline-flex items-center text-xs px-2.5 py-1 rounded-full border bg-gray-100 text-gray-800">
              <span>Max: ${maxAmount}</span>
              <button 
                onClick={() => {
                  setMaxAmount('');
                  applyFilters();
                }} 
                className="ml-1.5 hover:bg-black hover:bg-opacity-10 rounded-full"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {hasActiveFilters() && (
            <button
              onClick={resetFilters}
              className="text-xs text-teal-600 hover:text-teal-800 font-medium ml-auto"
            >
              Clear All
            </button>
          )}
        </div>
      )}
    </div>
  );
};