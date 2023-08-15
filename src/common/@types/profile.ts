import { CustomFile } from 'src/common/components/upload';

export interface IFormMerchantProfile {
  id: number;
  name: string;
  email: string;
  photoURL: CustomFile | string;
  phoneNumber: string;
  address: string;
  createdAt: string | null;
  status: string | null;
  rank: string | null;
  avatar?: {
    url?: string;
    id?: number;
  };
}

export interface IMerchantProfileProps {
  user: IFormMerchantProfile;
}
