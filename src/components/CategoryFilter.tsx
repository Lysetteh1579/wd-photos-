import React from 'react';
import { CATEGORIES } from '../data/photos';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts: Record<string, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div id="category-filter-bar" className="overflow-x-auto py-3 no-scrollbar">
      <div className="flex items-center gap-2 min-w-max">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          const count = categoryCounts[cat] ?? 0;
          return (
            <button
              key={cat}
              id={`filter-btn-${cat.toLowerCase()}`}
              onClick={() => onSelectCategory(cat)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                isSelected
                  ? 'bg-stone-900 text-stone-50 shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isSelected
                    ? 'bg-stone-700 text-stone-200'
                    : 'bg-stone-200/80 text-stone-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
