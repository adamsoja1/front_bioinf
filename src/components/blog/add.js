import { useState, useEffect } from "react";
import React from 'react';
import { useHistory } from "react-router-dom";
import App4 from '../navbar/navBar'
import './add.css'
const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [event,setEvent] = useState(false)
  const [photos,setPhotos] = useState()
  const[isPending,setIsPending] = useState(false);
  const history = useHistory();

  const token = localStorage.getItem('token')

  const [tagi,setTagi] = useState([])

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      history.push('/login')
    }
  })

  
  const handleSubmit = () => {
  
 
    console.log(photos)
    const uploadData = new FormData();
    uploadData.append('title',title)
    uploadData.append('content',content)
    uploadData.append('author',author)
    uploadData.append('event',event)
    if(photos != undefined){
      for(let i=0;i<=photos.length;i++){
        uploadData.append('photos',photos[i]);
      }}

    console.log(uploadData)
    setIsPending(true)
    fetch('http://127.0.0.1:8000/post-add', {
      method: 'POST',    
      headers: { Authorization : `Token ${token}`},
      body: uploadData
    }).then(() => {

      history.push('/blog');
    })
    .catch((error) =>{
      setIsPending(false)
  })
    
  } 
    
  return (
    <div class="container" id='rozmiar'>
      <div class = 'mb-3' id='rozmiar'>
   
        <div class = 'mb-3'>
        <label for= "exampleFormControlInput1" class="form-label">Tytuł posta:</label>
        <input
          id='shadow-add' 
          type="text" 
          class='form-control'
          placeholder="Tytuł.."
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        </div>
        <div class ='mb-3'>
        <label for='exampleFormControlTextarea1' class="form-label">Tekst posta:</label>
        <textarea
        id='shadow-add' 
        class="form-control"  rows="3"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        </div>
        <div class = 'mb-3'>
        <label for= "exampleFormControlInput1" class="form-label">Autor:</label>
        <input 
        id='shadow-add' 
          type="text" 
          class='form-control'         
          required 
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        </div>
        
        <div class="form-check">
        <input class="form-check-input" type="checkbox" id="flexCheckDefault" value={event} onChange = {(e) => setEvent(!event)}/>
        <label class="form-check-label" for="flexCheckDefault">
          Wydarzenie
        </label>
      </div>
      <div className="App">

        <br/>
        <label>
        
          <input type="file" multiple onChange={(e) => setPhotos(e.target.files)}/>
        </label>
        <br/>
        </div>
      
        <center>
        {!isPending && <button onClick={()=>handleSubmit()} id='shadow-add' class = 'btn btn-primary'>Dodaj post</button>}
        { isPending && <button disabled  class = 'btn btn-primary'>Dodawanie...</button>}
        </center>
      
      </div>
    </div>
  );
}

function Add() {
  return (<div>
    <App4/>
    <div class ='mb-3'>
      <div class = 'container'>
      <h1 class="display-4">Dodaj nowy post</h1>
      </div>
      <Create/>
    
    </div>
    </div>
  )
}

export default Add;