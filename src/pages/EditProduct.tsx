import { Formik, Form, Field, ErrorMessage, FieldArray, type FormikHelpers } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Sparkles, Layers, Loader2, RefreshCw } from 'lucide-react';
import { validationSchema, type ProductFormValues, APPROVED_CATEGORIES } from '../schemas/product.schema';
import { useProduct } from '../contexts/ProductContext';
import PriceManager from '../components/PriceManager'; 

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, loading, updateProduct } = useProduct();

  const productToEdit = products.find((p) => p._id === id);

  const initialValues: ProductFormValues | null = productToEdit ? {
    name: productToEdit.name,
    description: productToEdit.description,
    ingredients: productToEdit.ingredients,
    category: productToEdit.category,
    budget: productToEdit.budget,
    skinType: productToEdit.skinType,
    origin: productToEdit.origin,
    coupons: productToEdit.coupons,
    images: productToEdit.images,
  } : null;

  const handleSubmit = async (
    values: ProductFormValues, 
    { setSubmitting }: FormikHelpers<ProductFormValues> 
  ) => {
    if (id) {
      await updateProduct(id, values);
      setSubmitting(false);
    }
  };

  if (loading || !productToEdit) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-3 text-zinc-500">
        <Loader2 className="animate-spin text-emerald-600" size={32} />
        <p className="text-sm font-medium">Extracting product architecture from database...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in pb-12">
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
            <h1 className="text-2xl font-bold text-zinc-900">Update Product</h1>
            <p className="text-sm text-zinc-500 mt-0.5">Modifying ID: <span className="font-mono text-xs font-bold text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded">{id}</span></p>
          </div>
        </div>

        <button 
          type="submit" 
          form="edit-product-form"
          className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>

      <Formik
        initialValues={initialValues!}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values }) => (
          <Form id="edit-product-form" className="space-y-6">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-xs space-y-5">
                  <div className="flex items-center gap-2 border-b border-zinc-100 pb-3 text-zinc-800 font-bold text-sm">
                    <Sparkles size={16} className="text-emerald-600" />
                    Core Specifications
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Product Name</label>
                    <Field name="name" type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all" />
                    <ErrorMessage name="name" component="span" className="text-xs font-semibold text-rose-500 mt-0.5" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Description (AI Context)</label>
                    <Field as="textarea" rows={5} name="description" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all resize-none leading-relaxed" />
                    <ErrorMessage name="description" component="span" className="text-xs font-semibold text-rose-500 mt-0.5" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-xs space-y-4">
                  <label className="text-sm font-bold text-zinc-800">Chemical Ingredients Structure</label>
                  <FieldArray name="ingredients">
                    {({ push, remove }) => (
                      <div className="space-y-2.5">
                        {values.ingredients && values.ingredients.map((_, index) => (
                          <div key={index} className="flex flex-col gap-1">
                            <div className="flex gap-2 items-center">
                              <Field name={`ingredients.${index}`} className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2 text-sm" />
                              {values.ingredients.length > 1 && (
                                <button type="button" onClick={() => remove(index)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"><Trash2 size={15} /></button>
                              )}
                            </div>
                            <ErrorMessage name={`ingredients.${index}`} component="span" className="text-xs font-semibold text-rose-500" />
                          </div>
                        ))}
                        <button type="button" onClick={() => push('')} className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg cursor-pointer w-fit"><Plus size={14} /> Add Ingredient</button>
                      </div>
                    )}
                  </FieldArray>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 border-b border-zinc-100 pb-3 text-zinc-800 font-bold text-sm">
                    <Layers size={16} className="text-emerald-600" />
                    Classification & Taxonomy
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Category</label>
                    <Field as="select" name="category" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all cursor-pointer">
                      {APPROVED_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </Field>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Budget Tier</label>
                    <Field as="select" name="budget" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all cursor-pointer">
                      <option value="economy">Economy</option>
                      <option value="medium">Medium</option>
                      <option value="luxury">Luxury</option>
                    </Field>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Skin Type Target</label>
                    <Field name="skinType" type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all" />
                    <ErrorMessage name="skinType" component="span" className="text-xs font-semibold text-rose-500 mt-0.5" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Product Origin</label>
                    <Field name="origin" type="text" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all" />
                    <ErrorMessage name="origin" component="span" className="text-xs font-semibold text-rose-500 mt-0.5" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-xs space-y-4">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Active Coupons</label>
                  <FieldArray name="coupons">
                    {({ push, remove }) => (
                      <div className="space-y-2">
                        {values.coupons && values.coupons.map((_, index) => (
                          <div key={index} className="flex gap-2 items-center">
                            <Field name={`coupons.${index}`} className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm" />
                            <button type="button" onClick={() => remove(index)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"><Trash2 size={15} /></button>
                          </div>
                        ))}
                        <button type="button" onClick={() => push('')} className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer"><Plus size={12} /> Add Coupon</button>
                      </div>
                    )}
                  </FieldArray>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-200">
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-100 pb-3 text-zinc-800 font-bold text-sm">
                  <RefreshCw size={16} className="text-emerald-600" />
                  Marketplace Pricing Sync
                </div>
                <PriceManager productId={id!} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}