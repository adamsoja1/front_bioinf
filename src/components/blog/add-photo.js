import React from 'react';
import {useState,useEffect} from 'react';
import { useParams, useLocation, useHistory } from "react-router-dom";


export default function ImageUpload(params){
    const[photo,setPhoto] = useState([])
    const [photos,setPhotos] = useState()
    const [isPending,setIsPending] = useState()

    const handleSubmit = () => {
        console.log(photos)
        const uploadData = new FormData();
        for(let i=0;i<=photos.length;i++){
            uploadData.append('photos',photos[i]);
        }
        setIsPending(true)
        fetch(`http://127.0.0.1:8000/photo-add-post/${params.id}`, {
          method: 'POST',
          headers: { Authorization : `Token ${localStorage.getItem('token')}`},
          body: uploadData
        })
        .then(res=>res.json())
        .then((res)=>setPhoto(res))      
      } 
    


    return (
        <div className="App">

          <br/>
          <label>
           
            <input type="file" multiple onChange={(evt) => setPhotos(evt.target.files)}/>
          </label>
          <br/>
          <button onClick={() => handleSubmit()}>Dodaj</button>
        </div>
      );



    }




