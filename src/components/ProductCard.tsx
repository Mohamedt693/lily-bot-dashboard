import { Edit, Trash2 } from 'lucide-react';
import type { Product } from '../types/product.type';


interface ProductRowProps {
    product: Product;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductRowProps) {

    const getSkinTypeBadgeClass = (type: Product['skinType']): string => {
        switch (type) {
            case 'Oily': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'Dry': return 'bg-blue-50 text-blue-700 border-blue-100';
            case 'Combination': return 'bg-purple-50 text-purple-700 border-purple-100';
            case 'Sensitive': return 'bg-rose-50 text-rose-700 border-rose-100';
            default: return 'bg-zinc-100 text-zinc-700 border-zinc-200';
        }
    };

    return (
        <tr className="hover:bg-zinc-50/40 transition-colors">
            {/* 1. Image & Name */}
            <td className="py-4 px-6 flex items-center gap-4">
                <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-11 h-11 rounded-lg object-cover border border-zinc-100 bg-zinc-50"
                />
                <div>
                    <h4 className="font-semibold text-zinc-900 text-sm">{product.name}</h4>
                    <span className="text-xs text-zinc-400 font-mono">ID: {product._id}</span>
                </div>
            </td>

            {/* 2. Category */}
            <td className="py-4 px-4 text-zinc-500 font-medium">{product.category}</td>

            {/* 3. Skin Type Badge */}
            <td className="py-4 px-4">
                <span className={`px-2.5 py-0.5 text-xs font-bold rounded-md border ${getSkinTypeBadgeClass(product.skinType)}`}>
                    {product.skinType}
                </span>
            </td>

            {/* 4. Budget */}
            <td className="py-4 px-6">
                <span className="font-bold text-emerald-600">{product.budget}</span>
            </td>

            {/* 5. Coupons Badges */}
            <td className="py-4 px-4">
                <div className="flex flex-wrap gap-1">
                    {product.coupons.map((cp, idx) => (
                        <span 
                        key={idx} 
                        className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-1.5 py-0.5 rounded border border-emerald-100 tracking-wide"
                        >
                            {cp}
                        </span>
                    ))}
                </div>
            </td>

            {/* 6. Action Buttons */}
            <td className="py-4 px-6 text-right">
                <div className="flex items-center justify-end gap-2">
                    <button 
                    onClick={() => onEdit(product._id)}
                    className="p-1.5 rounded-lg border border-zinc-200 text-zinc-500 hover:text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 transition-all cursor-pointer"
                    title="Edit Product"
                    >
                        <Edit size={14} />
                    </button>
                    <button 
                    onClick={() => onDelete(product._id)}
                    className="p-1.5 rounded-lg border border-zinc-200 text-zinc-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all cursor-pointer"
                    title="Delete Product"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </td>
        </tr>
    );
}