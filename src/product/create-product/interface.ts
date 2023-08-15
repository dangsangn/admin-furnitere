export interface IFormNewProduct {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: {
    name: string;
    id: number;
  };
  supplierId: { name: string; id: number };
  unit: string;
  qty: number;
  isActive: boolean;
  photoUrl: File | string;
}

export interface ICreateNewProductState {
  dataSubmit: IFormNewProduct;
  numbSubmit: number;
}

export interface IPostProduct {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  supplierId: number;
  unit: string;
  qty: number;
  isActive: boolean;
}
