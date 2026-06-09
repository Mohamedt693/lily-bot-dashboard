import * as Yup from 'yup';

export const APPROVED_CATEGORIES = [
    "Cleanser",
    "Moisturizer",
    "Serum",
    "Sunscreen",
    "Toner",
    "Exfoliator",
    "Lip Care"
] as const; 

export const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    description: Yup.string().required('Description is required for AI consultation context'),
    category: Yup.string().oneOf([...APPROVED_CATEGORIES], 'Invalid Category').required('Category is required'),
    budget: Yup.string().oneOf(['economy', 'medium', 'luxury']).required('Budget tier is required'),
    skinType: Yup.string()
        .oneOf(['Oily', 'Dry', 'Combination', 'Sensitive'], 'Please select a valid skin type')
        .required('Skin type is required'),
    link: Yup.string().url('Must be a valid URL'),
    origin: Yup.string().required('Product origin is required (e.g., Local, Egyptian)'),
    coupons: Yup.array().of(Yup.string().trim().required('Coupon cannot be empty')).required(),
    images: Yup.array().of(Yup.string().url('Must be a valid image URL').required('Image URL is required')).required(),
    ingredients: Yup.array().of(Yup.string().trim().required('Ingredient field cannot be empty')).required(),
});

export type ProductFormValues = Yup.InferType<typeof validationSchema>;