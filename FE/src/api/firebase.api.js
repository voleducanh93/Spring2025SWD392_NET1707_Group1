// src/api/fileUpload.js
import { uploadFile } from "../config/firebase";  

// Hàm upload file
export const uploadFileImage = async (file) => {
  try {
    const url = await uploadFile(file);  
    return url;  
  } catch (error) {
    throw new Error("File upload failed: " + error.message);  
  }
};
