import { useState, useEffect } from "react";
import './galer.css'
import React from 'react';


function Photos(params){
    const apiUrl = 'http://127.0.0.1:8000'
    const [photos, setPhotos] = useState([])


    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/photos/post/${params.id}`)
        .then(result => result.json())
        .then((result) => setPhotos(result))
    },[])
    
    return(
        <div>
            {photos.map(photo =>(
                <div class = 'gallery' >
                      <img src = {apiUrl + photo.photos.full_size}></img>
                </div>


    ))}
        </div>
    )
}

export default Photos;