export interface IFormNewUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  roleId: {
    id: number;
    name: string;
  };
  isActive: {
    id: number;
    name: string;
  };
}

export interface ICreateNewProductState {
  dataSubmit: IFormNewUser;
  numbSubmit: number;
}

export interface IPostUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  roleId: number;
}
