export interface ILocation {
  id: string;
  location: string;
}

export interface IType {
  id: string;
  product_type: string;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  product_image: string;
  location: ILocation;
  type: IType;
}
