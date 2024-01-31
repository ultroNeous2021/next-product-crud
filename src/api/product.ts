import { requests } from "./api";
import { IProduct, IType, ILocation } from "./models/product.interface";

export const Product = {
  getProducts: (): Promise<IProduct[]> => requests.get("product"),
  getProductById: (id: string): Promise<IProduct> =>
    requests.get(`product/${id}`),
  createProduct: (product: IProduct, isFormData: boolean): Promise<IProduct> =>
    requests.post("product", product, isFormData),
  updateProduct: (
    product: IProduct,
    id: string,
    isFormData: boolean
  ): Promise<IProduct> => requests.put(`product/${id}`, product, isFormData),
  deleteProduct: (id: string): Promise<void> =>
    requests.delete(`product/${id}`),
  getProductTypes: (): Promise<IType[]> => requests.get("product-type"),
  getProductLocations: (): Promise<ILocation[]> =>
    requests.get("product-location"),
};
