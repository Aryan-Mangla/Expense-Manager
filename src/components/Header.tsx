import React from 'react';
import { Wallet, Download } from 'lucide-react';
import { Button } from './ui/Button';

interface HeaderProps {
  onExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onExport }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Wallet size={28} className="text-teal-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">ExpenseTracker</h1>
          </div>
          <div>
            <Button
              variant="outline"
              size="sm"
              icon={<Download size={16} />}
              onClick={onExport}
            >
              Export Data
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};