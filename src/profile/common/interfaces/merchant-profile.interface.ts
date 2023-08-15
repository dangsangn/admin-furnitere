import { IFormMerchantProfile } from 'src/common/@types/profile';

export type StateProps = {
  profile: Partial<IFormMerchantProfile>;
  showOldPassword: boolean;
  showNewPassword: boolean;
};

export interface IResImage {
  file: {
    key: string;
    type: string;
    size: number;
    uploaderId: number;
    deletedAt: string | null;
    url: string;
    createdAt: string;
    version: number;
    id: number;
  };
}
export interface ImageInfo {
  id: number;
  url: string;
}
export interface IEditMerchantForm {
  name: string;
  address: string;
  phoneNumber: string;
  avatarId: number;
}

export interface IFormCallback {
  onSuccess: VoidFunction;
  onError: VoidFunction;
}
