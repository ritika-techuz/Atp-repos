
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface FilterBadgeProps {
  count: number;
}

export const FilterBadge: React.FC<FilterBadgeProps> = ({ count }) => {
  if (count === 0) return null;

  return (
    <Badge 
      variant="outline" 
      className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 border-blue-500/30 ml-2"
    >
      {count} filter{count !== 1 ? 's' : ''} applied
    </Badge>
  );
};
