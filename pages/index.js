import styles from '../styles/Home.module.css';
import React from 'react';
import {storage} from "../firebase.js";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';
import axios from 'axios';

export default function Home()
{
  const [file, setFile] = React.useState(null);
  const [img, setImg] = React.useState(null);
  //const [blackAndWhite, setBW] = React.useState("JFIF Image");
  
  const uploadImage = () =>
  {
    console.log(storage);
    if(file == null)return;
    const imageRef = ref(storage, `images/${file.name + v4()}`);
    uploadBytes(imageRef, file).then(() =>
    {
      getDownloadURL(imageRef)
      .then(link => {
        console.log(link);
        setImg(function(){
          document.getElementById("firstImg").style.display = "block";
          return link;
        });
        axios.post('http://localhost:3000/api/imageFilter',
        {
          responseType: 'blob',
          imgUrl: link,
        })
        .then((res) =>
        {
          console.log("data:image/png;base64," + res.data.fileData);
          setImg(() => {
            return "data:image/png;base64," + res.data.fileData;
          })
        });
      });
    });
  }

  return (
    <div id = "wrapper">
      <div id="form-container">
        <h1>Upload Image</h1>
        <label htmlFor = "imgUploadObj" id="imgUploadObjLabel">Choose a file</label>
        <input onChange = {(e) => setFile(e.target.files[0])} type = "file" id = "imgUploadObj"/>
        <button onClick = {uploadImage}>Upload Image</button>
      </div>
      <div>
        <img alt="black and white" id="firstImg" src={img}/>
      </div>
    </div>
  )
}
