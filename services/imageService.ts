import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer'
import { supabase } from '@/lib/supabase';
import { supabaseUrl } from '@/constants';

interface ImagePathResult {
  uri: string;
}

export const getUserImageSrc = (imagePath: string): ImagePathResult | NodeRequire => {
  if (imagePath) {
    return getSupabaseFileUrl(imagePath);
  } else {
    return require('@/assets/images/defaultUser.png');
  }
}

export const getSupabaseFileUrl = filePath => {
  if(filePath){
    return {uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}`}
  }
  return null
}

export const uploadFile = async (folderName: string, fileUri: string, isImage = true) => {
  try {
    let fileName = getFilePath(folderName, isImage);
    
    // Use the new File API instead of readAsStringAsync
    const file = new FileSystem.File(fileUri);
    const fileBase64 = await file.base64();
    
    let imageData = decode(fileBase64);

    let { data, error } = await supabase
      .storage
      .from('uploads')
      .upload(fileName, imageData, {
        cacheControl: '3600',
        upsert: false,
        contentType: isImage ? 'image/*' : 'video/*',
      });

    if (error) {
      console.log('file upload error:', error);
      return { success: false, msg: 'Could not upload media' };
    }

    console.log('data:', data);

    return { success: true, data: data.path };

  } catch (error) {
    console.log('upload file error:', error);
    return { success: false, msg: 'Could not upload media' };
  }
}

export const getFilePath = (folderName: string, isImage = true) => {
  return `/${folderName}/${(new Date()).getTime()}${isImage ? '.png' : '.mp4'}`;
}