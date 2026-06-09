import { type ProductFormValues } from '../schemas/product.schema';


export type Product = ProductFormValues & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};