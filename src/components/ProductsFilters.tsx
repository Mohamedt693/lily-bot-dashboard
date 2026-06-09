import { Search, SlidersHorizontal } from 'lucide-react';
import { APPROVED_CATEGORIES } from '../schemas/product.schema';

interface ProductsFiltersProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
    selectedSkinType: string;
    setSelectedSkinType: (value: string) => void;
    selectedBudget: string;
    setSelectedBudget: (value: string) => void;
}

export default function ProductsFilters({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedSkinType,
    setSelectedSkinType,
    selectedBudget,
    setSelectedBudget,
}: ProductsFiltersProps) {
    return (
        <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-xs flex flex-col gap-4">

            {/*  header */}
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
                <SlidersHorizontal size={14} className="text-emerald-600" />
                <span>Filter & Search Engine</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        
                {/* 1. Search by name */}
                <div className="relative w-full">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input 
                    type="text" 
                    placeholder="Search by name..." 
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all"
                    />
                </div>

                {/* 2. Dropdown: skin type */}
                <div className="w-full">
                    <select
                    value={selectedSkinType}
                    onChange={(e) => setSelectedSkinType(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all cursor-pointer text-zinc-700 font-medium"
                    >
                        <option value="All">All Skin Types</option>
                        <option value="Oily">Oily Skin</option>
                        <option value="Dry">Dry Skin</option>
                        <option value="Combination">Combination Skin</option>
                        <option value="Sensitive">Sensitive Skin</option>
                    </select>
                </div>

                {/* 3. Dropdown: chemical category */}
                <div className="w-full">
                    <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all cursor-pointer text-zinc-700 font-medium"
                    >
                        <option value="All">All Categories</option>
                        {APPROVED_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                {/* 4. Dropdown: budget category */}
                <div className="w-full">
                    <select
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all cursor-pointer text-zinc-700 font-medium"
                    >
                        <option value="All">All Budgets</option>
                        <option value="اقتصادي">اقتصادي (Economic)</option>
                        <option value="متوسط">متوسط (Medium)</option>
                        <option value="فاخر">فاخر (Premium)</option>
                    </select>
                </div>

            </div>
        </div>
  );
}