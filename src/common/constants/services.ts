import axios, { AxiosStatic } from 'axios';
import axiosInstance from 'src/common/utils/axios';
import { API_PRESIGNED } from './apis';
import { PresignedResponse } from './common.interfaces';

export async function presignedUrl(
  file: any,
  axiosInstant?: AxiosStatic
): Promise<Partial<PresignedResponse>> {
  if (file) {
    const imgType = file?.name?.split('.').pop() || 'png';
    try {
      const presignHeaderInfo = await axiosInstance.post(API_PRESIGNED, {
        type: imgType,
      });
      const urlPostImg = presignHeaderInfo?.data?.presign?.url;
      const headerFields = presignHeaderInfo?.data?.presign?.fields || {};
      const id = presignHeaderInfo?.data?.file?.id;
      const formData = new FormData();
      Object.keys(headerFields).forEach((header) =>
        formData.append(header, headerFields[header])
      );
      formData.append('file', file);

      await (axiosInstant || axios).post(urlPostImg, formData);
      const fileUrl =
        presignHeaderInfo?.data?.presign?.url + presignHeaderInfo?.data?.file?.key;
      return { id, url: fileUrl };
    } catch (error) {
      console.log(error);
      return Promise.reject({});
    }
  }
  return Promise.resolve({});
}
