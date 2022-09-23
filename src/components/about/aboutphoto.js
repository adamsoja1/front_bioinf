import { useState, useEffect } from "react";
import React from "react";

export default function MemberPhoto(params){


    const [photos, setPhotos] = useState([])
    const apiUrl = 'http://127.0.0.1:8000'
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/photos/member/${params.id}`)
        .then(result => result.json())
        .then((result) => setPhotos(result))
    },[])




    return(
        <div>
        {photos.map(photo =>(
            <div>
                  <img src = {apiUrl + photo.photos.full_size}></img>
            </div>
    ))}
    </div>
        )
}