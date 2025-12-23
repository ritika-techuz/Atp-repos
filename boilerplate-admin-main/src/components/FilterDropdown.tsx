
import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  statusValue: string;
  onStatusChange: (value: string) => void;
  statusOptions: FilterOption[];
  roleValue: string;
  onRoleChange: (value: string) => void;
  roleOptions: FilterOption[];
  activeFiltersCount: number;
  className?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  statusValue,
  onStatusChange,
  statusOptions,
  roleValue,
  onRoleChange,
  roleOptions,
  activeFiltersCount,
  className = "w-full sm:w-auto"
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const clearAllFilters = () => {
    onStatusChange('all');
    if (roleOptions.length > 0) {
      onRoleChange('all');
    }
  };

  const showRoleFilter = roleOptions.length > 0;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className={`border-gray-300 text-gray-700 hover:bg-gray-50 justify-between ${className}`}
        >
          <div className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <Badge 
                variant="secondary" 
                className="bg-blue-100 text-blue-700 border-blue-200 ml-2"
              >
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <ChevronDown className="w-4 h-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="bg-white border-gray-200 w-80" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900">Filter Options</h4>
            {activeFiltersCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                Clear all
              </Button>
            )}
          </div>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-900">Status</Label>
              <Select value={statusValue} onValueChange={onStatusChange}>
                <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {showRoleFilter && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-900">Role</Label>
                <Select value={roleValue} onValueChange={onRoleChange}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    {roleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
