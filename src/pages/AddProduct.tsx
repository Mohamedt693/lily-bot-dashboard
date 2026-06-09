import { Formik, Form, Field, ErrorMessage, FieldArray, type FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Sparkles, Layers, Link2 } from 'lucide-react';
import { validationSchema, type ProductFormValues, APPROVED_CATEGORIES } from '../schemas/product.schema';
import { useProduct } from '../contexts/ProductContext';


export default function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useProduct();

  const initialValues: ProductFormValues = {
    name: '',
    description: '',
    category: "Cleanser", 
    budget: 'medium',
    skinType: 'Oily',
    link: '',
    origin: '', 
    coupons: ['lilycloset'], 
    images: [''],
    ingredients: [''],
  };

  const handleSubmit = async (
    values: ProductFormValues, 
    { setSubmitting }: FormikHelpers<ProductFormValues> 
  ) => {
    try {
      await addProduct(values);
    } catch (error) {
      console.error("Submission failed", error);
      setSubmitting(false); 
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in pb-12">
      {/* Top Bar Header */}
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
            <h1 className="text-2xl font-bold text-zinc-900">Add New Product</h1>
          </div>
        </div>

        {/* Global Save Button on Top for quick access */}
        <button 
          type="submit" 
          form="product-form"
          className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
        >
          <Save size={16} />
          <span>Save Product</span>
        </button>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form id="product-form" className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* LEFT COLUMN: Main Info (Takes 2 cols on Large screens) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Primary Content Card */}
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-xs space-y-5">
                <div className="flex items-center gap-2 border-b border-zinc-100 pb-3 text-zinc-800 font-bold text-sm">
                  <Sparkles size={16} className="text-emerald-600" />
                  Core Specifications
                </div>

                {/* NAME */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Product Name</label>
                  <Field name="name" type="text" placeholder="e.g., Starville Micellar Water" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all" />
                  <ErrorMessage name="name" component="span" className="text-xs font-semibold text-rose-500 mt-0.5" />
                </div>

                {/* DESCRIPTION */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Description (AI Context)</label>
                  <Field as="textarea" rows={5} name="description" placeholder="ينظف البشرة بعمق وينظم إفراز الدهون بدون جفاف..." className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all resize-none leading-relaxed" />
                  <ErrorMessage name="description" component="span" className="text-xs font-semibold text-rose-500 mt-0.5" />
                </div>
              </div>

              {/* Links Card */}
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-100 pb-3 text-zinc-800 font-bold text-sm">
                  <Link2 size={16} className="text-emerald-600" />
                  Marketplace Integrations
                </div>
                
                {/* DIRECT PURCHASE LINK */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Affiliate / Purchase URL (link)</label>
                  <Field name="link" type="text" placeholder="https://www.noon.com/egypt-en/..." className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2.5 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all font-mono" />
                  <ErrorMessage name="link" component="span" className="text-xs font-semibold text-rose-500 mt-0.5" />
                </div>
              </div>

              {/* INGREDIENTS ARRAY (Placed here for wide space) */}
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-xs space-y-4">
                <div>
                  <label className="text-sm font-bold text-zinc-800 flex items-center gap-2">Chemical Ingredients Structure</label>
                  <p className="text-xs text-zinc-400 mt-0.5">Used directly by the AI engine for ingredient analysis and comparison.</p>
                </div>
                <FieldArray name="ingredients">
                  {({ push, remove }) => (
                    <div className="space-y-2.5">
                      {values.ingredients.map((_, index) => (
                        <div key={index} className="flex flex-col gap-1">
                          <div className="flex gap-2 items-center">
                            <Field name={`ingredients.${index}`} placeholder="e.g., Salicylic Acid 2%" className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-2 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all" />
                            {values.ingredients.length > 1 && (
                              <button type="button" onClick={() => remove(index)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg border border-transparent hover:border-rose-200 cursor-pointer transition-colors"><Trash2 size={15} /></button>
                            )}
                          </div>
                          <ErrorMessage name={`ingredients.${index}`} component="span" className="text-xs font-semibold text-rose-500" />
                        </div>
                      ))}
                      <button type="button" onClick={() => push('')} className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/70 px-3 py-1.5 rounded-lg cursor-pointer w-fit transition-colors"><Plus size={14} /> Add Ingredient</button>
                    </div>
                  )}
                </FieldArray>
              </div>

            </div>

            {/* RIGHT COLUMN: Sidebar Metadata & Asset Arrays (Takes 1 col) */}
            <div className="space-y-6">
              
              {/* Classification Card */}
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-100 pb-3 text-zinc-800 font-bold text-sm">
                  <Layers size={16} className="text-emerald-600" />
                  Classification & Taxonomy
                </div>

                {/* CATEGORY */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Category</label>
                  <Field as="select" name="category" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all cursor-pointer">
                    {APPROVED_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Field>
                </div>

                {/* BUDGET TIER */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Budget Tier</label>
                  <Field as="select" name="budget" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all cursor-pointer">
                    <option value="economy">Economy</option>
                    <option value="medium">Medium</option>
                    <option value="luxury">Luxury</option>
                  </Field>
                </div>

                {/* SKIN TYPE */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Skin Type Target</label>
                  <Field 
                    as="select" 
                    name="skinType" 
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all"
                  >
                    <option value="Oily">Oily</option>
                    <option value="Dry">Dry</option>
                    <option value="Combination">Combination</option>
                    <option value="Sensitive">Sensitive</option>
                  </Field>
                  <ErrorMessage name="skinType" component="span" className="text-xs font-semibold text-rose-500 mt-0.5" />
                </div>

                {/* ORIGIN */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Product Origin</label>
                  <Field name="origin" type="text" placeholder="e.g., براند مصري 100%" className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all" />
                  <ErrorMessage name="origin" component="span" className="text-xs font-semibold text-rose-500 mt-0.5" />
                </div>
              </div>

              {/* COUPONS ARRAY */}
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-xs space-y-4">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Active Coupons</label>
                <FieldArray name="coupons">
                  {({ push, remove }) => (
                    <div className="space-y-2">
                      {values.coupons.map((_, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <Field name={`coupons.${index}`} placeholder="lilycloset" className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all uppercase font-bold tracking-wide" />
                          {values.coupons.length > 1 && (
                            <button type="button" onClick={() => remove(index)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"><Trash2 size={15} /></button>
                          )}
                        </div>
                      ))}
                      <button type="button" onClick={() => push('')} className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer pt-1"><Plus size={12} /> Add Coupon</button>
                    </div>
                  )}
                </FieldArray>
              </div>

              {/* IMAGES ARRAY */}
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-xs space-y-4">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">Cloudinary Assets</label>
                <FieldArray name="images">
                  {({ push, remove }) => (
                    <div className="space-y-2">
                      {values.images.map((_, index) => (
                        <div key={index} className="flex flex-col gap-1">
                          <div className="flex gap-2 items-center">
                            <Field name={`images.${index}`} placeholder="https://res.cloudinary.com/..." className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs focus:outline-hidden focus:border-emerald-500 focus:bg-white transition-all font-mono" />
                            {values.images.length > 1 && (
                              <button type="button" onClick={() => remove(index)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"><Trash2 size={15} /></button>
                            )}
                          </div>
                          <ErrorMessage name={`images.${index}`} component="span" className="text-xs font-semibold text-rose-500" />
                        </div>
                      ))}
                      <button type="button" onClick={() => push('')} className="flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer pt-1"><Plus size={12} /> Add Image Asset</button>
                    </div>
                  )}
                </FieldArray>
              </div>

            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
}