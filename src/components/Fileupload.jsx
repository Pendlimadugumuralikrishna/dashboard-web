import { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ updateUploadedFiles }) => { 
  const [file, setFile] = useState(null);
 

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        alert('Please select a file');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:8082/upload', formData, {
        withCredentials:true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        
      });

      alert(response.data.message);
     
      updateUploadedFiles(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  return (
    <div className='m-2.5'>
      <input type="file" onChange={handleFileChange} name='file' className="mb-2 p-2 border rounded-md grayscale-25 w-full"/>
      <button onClick={handleUpload}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload</button>
     
    </div>
  );
};

export default FileUpload;
