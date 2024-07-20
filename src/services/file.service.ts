import { axiosWithAuth } from '@/api/interceptors';
import { API_URL } from '@/config/api.config';

interface IFile {
  url: string;
  name: string;
}

class FileService {
  async upload(file: File, folder?: string) {
    const formData = new FormData();
    formData.append('file', file);

    return axiosWithAuth.post<IFile[]>(API_URL.files(), formData, {
      params: { folder },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

export const fileService = new FileService();
