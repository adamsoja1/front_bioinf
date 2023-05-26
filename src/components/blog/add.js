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
  const [tags,setTags] = useState([])
  const [put_tag,setPut_tag] = useState([])
  const[isPending,setIsPending] = useState(false);
  const history = useHistory();
  const token = localStorage.getItem('token')

  const [newtag,setNewtag] = useState()

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      history.push('/login')
    }
  })

  useEffect(()=>{
    fetch('http://127.0.0.1:8000/tags/operations', {
      method: 'GET',
      headers: { Authorization : `Token ${token}`}
    })
    .then(res=>res.json())
    .then((res)=>setTags(res))
  },[])


  const addNewtags = () =>{
    const uploadData = new FormData();

    uploadData.append('tagi', newtag)



    fetch('http://127.0.0.1:8000/tags/operations', {
      method: 'PUT',
      headers: { Authorization : `Token ${token}`},
      body: uploadData
    })
    .then(res=>res.json())
    .then((res)=>setTags(res))

  }




  const handleSubmit = () => {
    console.log(photos)
    const uploadData = new FormData();
    uploadData.append('title',title)
    uploadData.append('content',content)
    uploadData.append('author',author)
    uploadData.append('event',event)


    uploadData.append('tag',put_tag)

    if(photos != undefined){
      for(let i=0;i<=photos.length;i++){
        uploadData.append('photos',photos[i]);
      }}

    console.log(uploadData)
    setIsPending(true)
    fetch('http://127.0.0.1:8000/post/add', {
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

  const appendToUpload = (tag) =>{
    if (!put_tag.includes(tag)){
      setPut_tag(tags=>[...tags,tag])
    }
  }

  const deleteFromUpload = (tag) =>{
    var arr = put_tag
    for (var i=arr.length -1; i>=0;i--){
      if(arr[i] == tag){
        arr.splice(i,1);
      }
    }
    setPut_tag(()=>[arr])
  }

  console.log(put_tag)
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
        <input class="form-check-input" type="checkbox" id="flexCheckDefault" value={event} onChange = {(e) => setEvent(!event)}
        required/>
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
        {!isPending && <button type='submit' onClick={()=>handleSubmit()} id='shadow-add' class = 'btn btn-primary'>Dodaj post</button>}
        { isPending && <button disabled  class = 'btn btn-primary'>Dodawanie...</button>}
        </center>

            <div>

            <div>
              <input
              value={newtag}
              onChange = {(e)=>setNewtag(e.target.value)}
              />
              <button onClick={()=>addNewtags()}>Dodaj</button>
            </div>


        <div className='tags-left'>
           <h3>Dostepne tagi:</h3>
              {tags.map(tag=>(
                <div>
                 <h7 onClick = {()=>appendToUpload(tag.tagi)}>{tag.tagi}</h7>
                 </div>

              ))}
            </div>
            <div className='tags-right'>
            <h3>Dodane tagi:</h3>
            {put_tag.map(tags=>(
                <div>
                 <h7 onClick = {()=>deleteFromUpload(tags)}>{tags}</h7>
                 </div>

              ))}
          </div>
            </div>
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
