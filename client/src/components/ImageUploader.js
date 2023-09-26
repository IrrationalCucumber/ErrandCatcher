import React, { useState } from 'react';

const ImageUploader = () => {
  const [uploadedImage, setUploadedImage] = useState('');

  const handleFileUpload = (e) => {
    setUploadedImage(e.target.files[0]);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <img src={uploadedImage || '/placeholder.png'} alt="Uploaded image" />
    </div>
  );
};

export default ImageUploader;