import { useState, useEffect } from "react";
import React from "react";

export default function MemberPhoto(params){


    const [photos, setPhotos] = useState([])
    const apiUrl = process.env.REACT_APP_HOST
    useEffect(()=>{
        fetch(process.env.REACT_APP_HOST + `/photos/member/${params.id}`)
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
