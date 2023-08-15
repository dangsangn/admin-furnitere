import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import uuidv4 from '../utils/uuidv4';
import { storage } from '../utils/firebase';
import { useState } from 'react';

export const useUploadImage = () => {
  const [imageUpload, setImageUpload] = useState<File>();
  const handleUploadImage = async () => {
    if (imageUpload == null) return null; // Return null if no image selected
    const imageRef = ref(storage, `product/${imageUpload.name + uuidv4()}`);
    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL; // Return the image download URL
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  return {
    handleUploadImage,
    imageUpload,
    setImageUpload,
  };
};
