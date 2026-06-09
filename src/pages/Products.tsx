import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useProduct } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';
import ProductsFilters from '../components/ProductsFilters'; 
import Pagination from '../components/Pagination';
import { TableSkeleton } from '../components/Skeleton'; // استيراد المكون

export default function Products() {
  const navigate = useNavigate();
  const { products, loading, loadProducts, deleteProduct, pagination } = useProduct();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSkinType, setSelectedSkinType] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBudget, setSelectedBudget] = useState<string>('All');

  useEffect(() => {
    if (loadProducts) {
    loadProducts();
    }
  }, [loadProducts]);


  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkinType = selectedSkinType === 'All' || product.skinType === selectedSkinType;
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesBudget = selectedBudget === 'All' || product.budget === selectedBudget;

    return matchesSearch && matchesSkinType && matchesCategory && matchesBudget;
  });

  const handleDelete = async (id: string) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id); 
    }
  };

  const handleEdit = (id: string): void => {
    navigate(`/dashboard/products/edit/${id}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* ─── HEADER SECTION ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900">Product Warehouse</h1>
          <p className="text-sm text-zinc-500 mt-1">Manage items, filter by skin profiles, and monitor active affiliate tags.</p>
        </div>
        <Link 
          to="/dashboard/products/add"
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors duration-150 cursor-pointer"
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* ─── CONTROLS BAR (NEW FILTER COMPONENT COMPRISING ALL DROPDOWNS) ─── */}
      <ProductsFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedSkinType={selectedSkinType}
        setSelectedSkinType={setSelectedSkinType}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedBudget={selectedBudget}
        setSelectedBudget={setSelectedBudget}
      />

      {/* ─── DATA TABLE / LOADING STATE ─── */}
      <div className="bg-white rounded-xl border border-zinc-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-600">
            <thead className="text-xs text-zinc-400 uppercase bg-zinc-50 border-b border-zinc-200 font-semibold">
              <tr>
                <th className="py-3.5 px-6">Product</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Skin Target</th>
                <th className="py-3.5 px-6">Budget</th>
                <th className="py-3.5 px-4">Active Coupons</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            
            {loading ? (
              <TableSkeleton />
            ) : (
              <tbody className="divide-y divide-zinc-100">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard 
                      key={product._id} 
                      product={product} 
                      onEdit={handleEdit} 
                      onDelete={handleDelete} 
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-sm text-zinc-400 font-medium">
                      No products matched your current search parameters.
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>

        {/* ─── PAGINATION BAR ─── */}
        <Pagination 
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalEntries={pagination.totalProducts}
          currentEntriesCount={products.length}
          onPageChange={(page) => loadProducts(page, 10)}
        />

      </div>

    </div>
  );
}