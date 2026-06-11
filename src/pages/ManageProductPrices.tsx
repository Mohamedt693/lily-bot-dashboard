import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import PriceManager from '../components/PriceManager';

export default function ManageProductPrices() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  if (!id) {
    return (
      <div className="p-8 text-center text-rose-500 font-semibold">
        Error: Product Identification Index (ID) is missing from the context.
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto animate-fade-in pb-12">
      
      <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => navigate('/dashboard/products')}
            className="p-2 rounded-lg border border-zinc-200 hover:bg-zinc-100 text-zinc-600 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900">Link Live Price Index</h1>
            <p className="text-xs text-zinc-400 mt-0.5">Step 2: Connect automated web crawlers and scraping selectors to this asset profile.</p>
          </div>
        </div>

        <button 
          type="button" 
          onClick={() => navigate('/dashboard/products')}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <CheckCircle2 size={16} />
          <span>Complete Activation</span>
        </button>
      </div>

      <PriceManager productId={id} />

    </div>
  );
}