import { useState, useEffect } from "react";
import './galer.css'
import React from 'react';
import FetchPhotos from './gallery'
import './Modal.css'
function Photos(params){
    const apiUrl = 'http://127.0.0.1:8000'
    const [photos, setPhotos] = useState([])
    if(modal) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }

    const [modal, setModal] = useState(false);
    const [photo,setPhoto] = useState('')

    const toggleModal = () => {
        setModal(!modal);
      };
    
    function togglePhoto(photo){
        setPhoto(photo);
        setModal(true)

        console.log('cos')
        console.log(modal)
        console.log(photo)
    }

    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/photos/post/${params.id}`)
        .then(result => result.json())
        .then((result) => setPhotos(result))
    },[])
    
    return(
        <div className = 'parent'>
            {photos.map(photo =>(
                <div class = 'gallery'>
                      <img src = {apiUrl + photo.photos.full_size} onClick = {()=> togglePhoto(photo.photos.full_size)}></img>
                </div>


    ))}
        {modal && <div className='overlay' onClick = {toggleModal}>   
                            <div onClick = {toggleModal}></div>
                            <div className = 'modal-content' onClick = {toggleModal}>

                                <img src = {apiUrl + photo}></img>
                                <button className="close-modal" onClick={toggleModal}>
              X
            </button>
                                </div>
                            
                            
                            
                            </div>}

        </div>
    )
}

export default Photos;