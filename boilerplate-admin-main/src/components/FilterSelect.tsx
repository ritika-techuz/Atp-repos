
import React from 'react';
import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: FilterOption[];
  placeholder: string;
  className?: string;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  onValueChange,
  options,
  placeholder,
  className = "w-full sm:w-48 glass-input"
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <Filter className="w-4 h-4 mr-2" />
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="glass-card border-white/10">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
