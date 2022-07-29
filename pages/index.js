//imports
import React from 'react';
import {storage} from "../firebase.js";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';
import axios from 'axios';

export default function Home()
{
  //Set states for initial file upload and image displayed on webpage
  const [file, setFile] = React.useState(null);
  const [img, setImg] = React.useState(null);
  //Function that runs when the button is clicked
  const uploadImage = () =>
  {
    //Checking if there is a file
    if(file == null)return;
    console.log(storage);
    //Where to place the image in firebase storage
    const imageRef = ref(storage, `images/${file.name + v4()}`);
    //Uploading image to database w promise
    uploadBytes(imageRef, file).then(() =>
    {
      //Once it's uploaded, we can get the firebase url to the image w promise
      getDownloadURL(imageRef)
      .then(link => {
        console.log(link);
        //Now that we've recieved the link to the image, we're going to display the html
        //image tag and set the img state to this link
        //It will re-render the image so that it now displays
        //This is a good for the client because they can have an image before the enpoint
        //returns their filtered image
        //Also good for debugging
        setImg(function(){
          document.getElementById("firstImg").style.display = "block";
          return link;
        });
        //Requesting the imageFilter endpoint with the link to our image to
        //Get a black and white image in return
        axios.post('/api/imageFilter',
        {
          responseType: 'blob',
          imgUrl: link,
        })
        .then((res) =>
        {
          //Once we get the response from the server, we need to display it
          //It's in base64 format so to display it, we need to add the data:img.. 
          //information before the link
          //We set img state to this updated link
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
      <div id = "form-wrapper">
        <div id="form-container">
          <h1>UPLOAD IMAGE</h1>
          {/*Replacing upload with this icon*/}
          <label htmlFor = "imgUploadObj" id="imgUploadObjLabel">
            <img src = "../renameUpload.png" id="limg"/>
          </label>
          {/*Changing file state whenver the file is changed*/}
          <input onChange = {(e) => setFile(e.target.files[0])} type = "file" id = "imgUploadObj"/>
          <button onClick = {uploadImage} id ="imgSubmit">Upload Image</button>
        </div>
      </div>
      <div>
        <img alt="black and white" id="firstImg" src={img}/>
      </div>
    </div>
  )
}
