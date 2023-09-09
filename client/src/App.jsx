import React, {useState} from 'react'
import axios from 'axios'

export default function App() {
  const [file, setFile] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles =Array.from(e.target.files);;
    setFile(selectedFiles); 
  }

  const handleUpload = async()=>{
    const formData = new FormData()
    file.forEach((f)=>{
      formData.append("image",f)
    })
    // formData.append("image",file)  //name same as input / can be anything but should be same as backend upload.single/multiple(name)

    try {
      const response = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
  
  return (
    <div>
      <h1>Upload Image</h1>
        <input type='file' name='image' multiple accept='image/*' onChange={handleFileChange}/>
        <button onClick={handleUpload}>Submit</button>
    </div>
  )
}
