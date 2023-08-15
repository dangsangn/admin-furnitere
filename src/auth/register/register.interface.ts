export interface IFormRegister {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface IDataSubmitRegister {
  email: string;
  password: string;
  name: string;
}

export type IRegisterCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};
