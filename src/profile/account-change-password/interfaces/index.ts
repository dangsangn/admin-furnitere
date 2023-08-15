export interface FormValuesProps {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface IDataUpdatePassword {
  email: string;
  new_password: string;
}

export interface ICallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}
