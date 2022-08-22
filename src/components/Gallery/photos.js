import { useState, useEffect } from "react";
import './galer.css'
import React from 'react';
import FetchPhotos from './gallery'
import './Modal.css'

function Photos(params){
    const apiUrl = 'http://127.0.0.1:8000'
    const [photos, setPhotos] = useState([])
    const [isPending,setIsPending] = useState()
    
    if(modal) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }

    const [modal, setModal] = useState(false);
    const [photo,setPhoto] = useState()
    const [foto,setFoto] = useState()
    const toggleModal = () => {
        setModal(!modal);
      };
    
    function togglePhoto(photo){
        setPhoto(photo);
        setModal(true)
    }

    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/photos/post/${params.id}`)
        .then(result => result.json())
        .then((result) => setPhotos(result))
    },[])




    const [images,setImages] = useState()
    const handleSubmit = () => {
        const uploadData = new FormData();
        if (images != undefined){
        for(var i=0;i<=images.length;i++){
            console.log(images[i])
            uploadData.append('photos',images[i]);
        }}
        setIsPending(true)
        fetch(`http://127.0.0.1:8000/photo-add-post/${params.id}`, {
          method: 'POST',
          headers: { Authorization : `Token ${localStorage.getItem('token')}`},
          body: uploadData
        })
        .then(res=>res.json())
        .then((res)=>setPhotos(res))
        
      } 
    

      const deletePhoto = (photo_id) => {

        fetch(`http://127.0.0.1:8000/photo-delete/${photo_id}/post/${params.id}`, {
          method: 'DELETE',
          headers: { Authorization : `Token ${localStorage.getItem('token')}`},
        })
        .then(res=>res.json())
        .then((res)=>setPhotos(res))
        
      } 

        
      
    
    return(
        <div>
        <div className = 'parent'>
            {photos.map(photo =>(
                <div class = 'gallery'>

                      <img src = {apiUrl + photo.photos.full_size} onClick = {()=> togglePhoto(photo.photos.full_size)}></img>
                      {localStorage.getItem('token')&&
                        <div>
                      <button onClick = {()=>deletePhoto(photo.id)}>Usun</button>
                      </div>}
                </div>


    ))}
        {modal && <div className='overlay' onClick = {toggleModal}>   
                            <div onClick = {toggleModal}></div>
                            <div className = 'modal-content' onClick = {toggleModal}>

                                <img src = {apiUrl + photo}></img>
                                <button className="button-50" onClick={toggleModal}>
              X
            </button>
                                </div>
                            
                            
                            
                            </div>}

        </div>
        {localStorage.getItem('token')&&
           <div>           
        <br/>
          <label>
           
            <input type="file" multiple onChange={(evt) => setImages(evt.target.files)}/>
          </label>
          <br/>
          <button onClick={() => handleSubmit()}>Dodaj</button>
          </div>}
 
        </div>
    )
}

export default Photos;