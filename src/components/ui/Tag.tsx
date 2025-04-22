import React from 'react';
import { X } from 'lucide-react';
import { CategoryTag, PersonTag } from '../../types';
import { TAG_COLORS, PERSON_COLORS } from '../../data/mockData';

interface CategoryTagProps {
  tag: CategoryTag;
  onRemove?: () => void;
  clickable?: boolean;
  selected?: boolean;
}

interface PersonTagProps {
  tag: PersonTag;
  onRemove?: () => void;
  clickable?: boolean;
  selected?: boolean;
}

export const CategoryTagBadge: React.FC<CategoryTagProps> = ({ 
  tag, 
  onRemove, 
  clickable = false,
  selected = false,
}) => {
  const baseClasses = `
    text-xs px-2.5 py-1 rounded-full border transition-all
    ${TAG_COLORS[tag]}
    ${clickable ? 'cursor-pointer hover:ring-2 ring-offset-1 ring-opacity-50' : ''}
    ${selected ? 'ring-2 ring-offset-1 ring-opacity-50' : ''}
  `;

  return (
    <div className={`inline-flex items-center ${baseClasses}`}>
      <span className="capitalize">{tag}</span>
      {onRemove && (
        <button 
          onClick={onRemove} 
          className="ml-1.5 hover:bg-black hover:bg-opacity-10 rounded-full"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export const PersonTagBadge: React.FC<PersonTagProps> = ({ 
  tag, 
  onRemove,
  clickable = false,
  selected = false,
}) => {
  const baseClasses = `
    text-xs px-2.5 py-1 rounded-full border transition-all
    ${PERSON_COLORS[tag]}
    ${clickable ? 'cursor-pointer hover:ring-2 ring-offset-1 ring-opacity-50' : ''}
    ${selected ? 'ring-2 ring-offset-1 ring-opacity-50' : ''}
  `;

  return (
    <div className={`inline-flex items-center ${baseClasses}`}>
      <span className="capitalize">{tag}</span>
      {onRemove && (
        <button 
          onClick={onRemove} 
          className="ml-1.5 hover:bg-black hover:bg-opacity-10 rounded-full"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};