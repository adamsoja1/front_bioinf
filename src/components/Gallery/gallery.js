import React from 'react';
import {useState,useEffect} from 'react';
import Navbar from '../navbar/navBar'
import './galer.css'
import './Modal.css'


// When the user clicks on <span> (x), close the modal




export default function FetchPhotos(){

    if(modal) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }



    const [galery,setGalery] = useState([]);
    const apiUrl = 'http://127.0.0.1:8000'
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
        fetch('http://127.0.0.1:8000/gallery')
        .then(result => result.json())
        .then((result) => setGalery(result))
    },[])

    return(
       <div>
           <Navbar/>
           
            <div>
                
                {galery.map(galer=>(
                    <div key = {galer.id}>
                    <h2>{galer.OpisGalerii}</h2>
                    <h7>{galer.date}</h7>
                    <div className = 'parent' onClick = {toggleModal}> 
                    {galer.gallery_photos.map(photo=>(
                        <div className = 'gallery'>
                        <img src = {apiUrl + photo.photos.full_size} onClick = {()=> togglePhoto(photo.photos.full_size)}></img>
                        
                        
                                </div>


                    ))}


                    </div>
                    </div>
                    
                ))}
                </div>
                    
              {modal && <div className='overlay' onClick = {toggleModal}>   
                            <div onClick = {toggleModal}></div>
                            <div className = 'modal-content' onClick = {toggleModal}>

                                <img src = {apiUrl + photo}></img>
                                <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
                                </div>
                            
                            
                            
                            </div>}

            </div>
       
    )
}

