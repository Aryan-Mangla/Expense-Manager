import React from 'react';
import { 
  BarChart3, 
  PieChart, 
  DollarSign, 
  TrendingUp, 
  Calendar
} from 'lucide-react';
import { ExpenseSummary as ExpenseSummaryType } from '../types';
import { PERSON_TAGS, CATEGORY_TAGS } from '../data/mockData';

interface ExpenseSummaryProps {
  summary: ExpenseSummaryType;
  timeframe: string;
}

export const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({ 
  summary, 
  timeframe 
}) => {
  // Find highest spending person and category
  const highestPersonSpending = Object.entries(summary.byPerson)
    .sort(([, a], [, b]) => b - a)[0];
  
  const highestCategorySpending = Object.entries(summary.byCategory)
    .sort(([, a], [, b]) => b - a)[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <DollarSign className="text-teal-600 mr-2" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">Total Expenses</h3>
        </div>
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-gray-900">${summary.total.toFixed(2)}</span>
          <span className="text-sm text-gray-500 mt-1">{timeframe}</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <TrendingUp className="text-violet-600 mr-2" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">Top Spending</h3>
        </div>
        <div className="space-y-2">
          {highestPersonSpending && (
            <div>
              <span className="text-sm text-gray-500">Person:</span>
              <span className="ml-2 font-medium capitalize text-gray-900">
                {highestPersonSpending[0]} (${highestPersonSpending[1].toFixed(2)})
              </span>
            </div>
          )}
          {highestCategorySpending && (
            <div>
              <span className="text-sm text-gray-500">Category:</span>
              <span className="ml-2 font-medium capitalize text-gray-900">
                {highestCategorySpending[0]} (${highestCategorySpending[1].toFixed(2)})
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <BarChart3 className="text-amber-600 mr-2" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">By Person</h3>
        </div>
        <div className="space-y-3">
          {PERSON_TAGS.map(person => (
            <div key={person} className="relative">
              <div className="flex justify-between mb-1">
                <span className="text-xs font-medium capitalize text-gray-700">{person}</span>
                <span className="text-xs font-medium text-gray-700">
                  ${summary.byPerson[person]?.toFixed(2) || '0.00'}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-teal-600 h-2.5 rounded-full" 
                  style={{ 
                    width: `${summary.total > 0 
                      ? (summary.byPerson[person] / summary.total) * 100 
                      : 0}%` 
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <PieChart className="text-indigo-600 mr-2" size={24} />
          <h3 className="text-lg font-semibold text-gray-800">By Category</h3>
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {CATEGORY_TAGS.filter(category => summary.byCategory[category] > 0)
            .sort((a, b) => summary.byCategory[b] - summary.byCategory[a])
            .map(category => (
              <div key={category} className="relative">
                <div className="flex justify-between mb-1">
                  <span className="text-xs font-medium capitalize text-gray-700">{category}</span>
                  <span className="text-xs font-medium text-gray-700">
                    ${summary.byCategory[category]?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-violet-600 h-2.5 rounded-full" 
                    style={{ 
                      width: `${summary.total > 0 
                        ? (summary.byCategory[category] / summary.total) * 100 
                        : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};