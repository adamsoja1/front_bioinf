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
    const apiUrl = process.env.REACT_APP_HOST
    const [modal, setModal] = useState(false);
    const [photo,setPhoto] = useState('');
    const [photos,setPhotos] = useState()

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
        fetch(process.env.REACT_APP_HOST + '/gallery')
        .then(result => result.json())
        .then((result) => setGalery(result))
    },[])


    const deletePhoto = (id) =>{
        fetch(process.env.REACT_APP_HOST + `/gallery/delete/photo/${id}`,
        {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" ,
                        Authorization : `Token ${localStorage.getItem('token')}`},

            })
            .then(res=>res.json())
            .then((res)=> setGalery(res))

        }

    const deleteGallery = (id) =>{
        fetch(process.env.REACT_APP_HOST + `/gallery/delete/${id}`,
        {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" ,
                        Authorization : `Token ${localStorage.getItem('token')}`},

            })
            .then(res=>res.json())
            .then((res)=> setGalery(res))

        }

    const addPhotos = (id) =>{
        const uploadData = new FormData();
        if(photos != undefined){
            for(let i=0;i<=photos.length;i++){
              uploadData.append('photos',photos[i]);
            }}
        fetch(process.env.REACT_APP_HOST + `/gallery/delete/${id}`, {
        method: 'POST',
        headers: { Authorization : `Token ${localStorage.getItem('token')}`},
        body: uploadData
    })
            .then(res=>res.json())
            .then((res)=> setGalery(res))

    }


    return(
       <div>
           <Navbar/>

            <div>

                {galery.map(galer=>(
                    <div>
                        <br/>
                    {localStorage.getItem('token')&&
                    <div>
                        <input type="file" multiple onChange={(e) => setPhotos(e.target.files)}/>
                    <button onClick = {()=>addPhotos(galer.id)}>Dodaj zdjecia</button>
                    </div>}
                    <h2>{galer.OpisGalerii}</h2>
                    <h7>{galer.date}</h7>
                    <br/>

                    <div className = 'parent'>
                    {galer.gallery_photos.map(photo=>(

                        <div className = 'gallery'>
                        <img src = {apiUrl + photo.photos.full_size} onClick = {()=> togglePhoto(photo.photos.full_size)}></img>
                        {localStorage.getItem('token')&&
                        <button onClick = {()=>deletePhoto(photo.id)}>Usun</button>}
                        <br/>

                        </div>


                    ))}


                    </div>
                    {localStorage.getItem('token')&&
                    <div>
                        <br/>
                        <br/>
                    <button onClick = {()=>deleteGallery(galer.id)}>Usuń galerie</button>
                    </div>}
                    </div>

                ))}
                </div>

              {modal && <div className='overlay' onClick = {toggleModal}>
                            <div onClick = {toggleModal}></div>
                            <div className = 'modal-content' onClick = {toggleModal}>

                                <img src = {apiUrl + photo}></img>
                                <button  className="button-50" role = 'button' type='submit' onClick={toggleModal}>
                                            X
                            </button>
                                </div>



                            </div>}

            </div>

    )
}

