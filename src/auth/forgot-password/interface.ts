export interface IResetCallBack {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}
export interface IResForgotPass {
  meta: {
    status: number;
    msg: string;
  };
  response: boolean;
}
export type IForgotPassword = {
  email: string;
};
