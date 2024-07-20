'use client';

import { FC, useState } from 'react';

// Adjust the path based on your project structure
import { axiosWithAuth } from '@/api/interceptors';

import { API_URL } from '@/config/api.config';

import { fileService } from '@/services/file.service';

interface IFileUpload  {
    setAvatarPath:any
}

const FileUpload: FC<IFileUpload> = ({setAvatarPath}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return;

    try {
      const folder = 'avatars'; 
      const response = await fileService.upload(selectedFile, folder);

      console.log('File uploaded successfully:', response.data);
      setAvatarPath(response.data[0].name)
    } catch (error) {
      console.error('Error uploading file:', error);

    }
  };

  return (
    <div>
      <label>
        <input type="file" onChange={handleFileChange} />
      </label>
      <button onClick={uploadFile}>Upload File</button>
    </div>
  );
};

export default FileUpload;
