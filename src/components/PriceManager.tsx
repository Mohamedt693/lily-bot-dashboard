import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash2, RefreshCw, ExternalLink, TrendingDown, Store } from 'lucide-react';
import { useProduct } from '../contexts/ProductContext';
import type { LinkOffer, PriceFormState } from '../types/linkOffer.type';

interface PriceManagerProps {
  productId: string;
}

export default function PriceManager({ productId }: PriceManagerProps) {
  const { getOffersByProduct, addLinkOffer, deleteLinkOffer, triggerScraper } = useProduct();
  const [offers, setOffers] = useState<LinkOffer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [syncing, setSyncing] = useState<boolean>(false);

  const [formData, setFormData] = useState<PriceFormState>({
    storeName: 'Amazon',
    country: 'EG',
    currency: 'EGP',
    url: '',
    priceSelector: '',
  });

  const fetchOffers = useCallback(async (isMounted: boolean) => {
    if (!productId) return;
    try {
      const data = await getOffersByProduct(productId);
      if (isMounted) {
        setTimeout(() => {
          const certifiedData = (data as unknown) as LinkOffer[];
          setOffers(certifiedData || []);
        }, 0);
      }
    } catch (err) {
      console.error('Failed to fetch price offers index:', err);
    }
  }, [productId, getOffersByProduct]);

  useEffect(() => {
    let isMounted = true;
    if (productId) {
      fetchOffers(isMounted);
    }
    return () => {
      isMounted = false;
    };
  }, [productId, fetchOffers]);

  const handleFormSubmit = async () => {
    if (!formData.url || !formData.priceSelector || !productId) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        productId: productId
      };

      await addLinkOffer((payload as unknown) as Parameters<typeof addLinkOffer>[0]);
      
      setFormData((prev: PriceFormState) => ({ ...prev, url: '', priceSelector: '' }));
      await fetchOffers(true); 
    } catch (err) {
      console.error('Failed to establish marketplace link:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTriggerScraper = async () => {
    if (!productId) return;
    setSyncing(true);
    try {
      await triggerScraper(); 
      await fetchOffers(true); 
    } catch (err) {
      console.error('Scraper engine sync triggered an error:', err);
    } finally {
      setSyncing(false);
    }
  };

  const handleDelete = async (offerId: string) => {
    if (!window.confirm('Are you sure you want to terminate this marketplace feed?')) return;
    try {
      await deleteLinkOffer(offerId);
      await fetchOffers(true);
    } catch (err) {
      console.error('Failed to terminate index feed:', err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-xs space-y-6 animate-fade-in">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
        <div className="flex items-center gap-2">
          <Store className="text-emerald-600" size={18} />
          <div>
            <h3 className="text-sm font-bold text-zinc-900">Live Price Engine & Crawlers</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Link real-time marketplace feeds to feed LilyBot knowledge base.</p>
          </div>
        </div>

        {offers.length > 0 && (
          <button
            type="button"
            onClick={handleTriggerScraper}
            disabled={syncing}
            className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw size={13} className={syncing ? 'animate-spin' : ''} />
            <span>{syncing ? 'Crawling Market...' : 'Trigger Manual Sync'}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200 space-y-4">
          <div className="text-xs font-bold text-zinc-700 uppercase tracking-wider">Integrate New Store</div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-zinc-400 uppercase">Platform</label>
              <select
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value as PriceFormState['storeName'] })}
                className="bg-white border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-800 cursor-pointer focus:outline-hidden"
              >
                <option value="Amazon">Amazon</option>
                <option value="Noon">Noon</option>
                <option value="Jumia">Jumia</option>
                <option value="Sephora">Sephora</option>
                <option value="Ulta">Ulta</option>
                <option value="AliExpress">AliExpress</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-zinc-400 uppercase">Region</label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="bg-white border border-zinc-200 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-800 cursor-pointer focus:outline-hidden"
              >
                <option value="EG">Egypt (EG)</option>
                <option value="SA">Saudi Arabia (SA)</option>
                <option value="AE">UAE (AE)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase">Target Product URL</label>
            <input
              type="url"
              required
              placeholder="https://www.amazon.eg/dp/..."
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs focus:outline-hidden focus:border-emerald-500 font-mono"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-zinc-400 uppercase">DOM Price Selector</label>
            <input
              type="text"
              required
              placeholder="e.g., span.a-price-whole or .priceNow"
              value={formData.priceSelector}
              onChange={(e) => setFormData({ ...formData, priceSelector: e.target.value })}
              className="bg-white border border-zinc-200 rounded-lg px-3 py-1.5 text-xs focus:outline-hidden focus:border-emerald-500 font-mono"
            />
          </div>

          <button
            type="button"
            onClick={handleFormSubmit}
            disabled={loading}
            className="w-full flex items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50 shadow-xs"
          >
            <Plus size={14} />
            <span>{loading ? 'Linking...' : 'Integrate Marketplace'}</span>
          </button>
        </div>

        <div className="lg:col-span-2 border border-zinc-200 rounded-xl overflow-hidden bg-white">
          {offers.length === 0 ? (
            <div className="p-12 text-center text-xs font-medium text-zinc-400 flex flex-col items-center justify-center gap-2">
              <Store size={24} className="text-zinc-300 stroke-[1.5]" />
              <span>No marketplace channels connected to this asset profile yet.</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                    <th className="py-3 px-4">Marketplace</th>
                    <th className="py-3 px-4">Current Price</th>
                    <th className="py-3 px-4">Old Price</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-xs text-zinc-700">
                  {offers.map((offer) => {
                    const hasPriceDrop = offer.currentPrice < offer.oldPrice;
                    return (
                      <tr key={offer._id} className="hover:bg-zinc-50/50 transition-colors">
                        <td className="py-3 px-4 font-semibold text-zinc-900 flex items-center gap-2">
                          <span className="bg-zinc-100 px-2 py-0.5 rounded-md text-[10px] text-zinc-600 font-bold tracking-wide">{offer.country}</span>
                          {offer.storeName}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-zinc-900">
                          <span className="flex items-center gap-1">
                            {offer.currentPrice ? `${offer.currentPrice} ${offer.currency}` : 'N/A'}
                            {hasPriceDrop && <TrendingDown size={12} className="text-emerald-500 animate-pulse" />}
                          </span>
                        </td>
                        <td className={`py-3 px-4 font-mono ${hasPriceDrop ? 'text-rose-400 line-through font-medium' : 'text-zinc-400'}`}>
                          {offer.oldPrice ? `${offer.oldPrice} ${offer.currency}` : '—'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-1.5">
                            <a href={offer.url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-md transition-colors"><ExternalLink size={14} /></a>
                            <button type="button" onClick={() => handleDelete(offer._id)} className="p-1.5 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}