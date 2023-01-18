import { useState, useEffect } from "react";
import React from 'react';
import '../blog/add.css'
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Navbar from '../navbar/navBar'
import { Link } from 'react-router-dom';

export default function EditPost(params){



    const [post, setPost] = useState([]);
    const {id} = useParams();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const[isPending,setIsPending] = useState(false);
    const history = useHistory();
    const [redirect,setRedirect] = useState(true)
    const [event,setEvent] = useState()
    const [type,setType] = useState()




  

        useEffect(() => {

            const fetchData = async () => {
            const result = await fetch(`http://127.0.0.1:8000/post/${id}/`)
            const jsonResult = await result.json()
                    setTitle(jsonResult.title)
                    setContent(jsonResult.content)
                    setAuthor(jsonResult.author)
                    setEvent(jsonResult.event)
                    if(!event){
                      setType('Post')
                    }
                    if(event){
                      setType('Wydarzenie')
                    }
                    
            }
            fetchData();
        },[]);

console.log(type)


const token = localStorage.getItem('token')



useEffect(()=>{
  if(!localStorage.getItem('token')){
    history.push('/login')
  }
})


const handleSubmit = () => {

  const blog = { title, content, author, event };
  setIsPending(true)

  fetch(`http://127.0.0.1:8000/post/edit/${id}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" ,
                Authorization : `Token ${token}`},
    body: JSON.stringify(blog)
  }).then(
  history.push('/blog')
  ).catch((error) =>{
    setIsPending(false)
})


    
}





return (
    <div>
        <Navbar/>
   
    <div class="container" id='rozmiar'>
      <div class = 'mb-3' id='rozmiar'>
      <form onSubmit={handleSubmit}>
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
        <h2 onClick = {() => setEvent(!event)} > {!event && <h2>Post</h2>} {event && <h2>Wydarzenie</h2>} </h2>

        <center>
        {!isPending && <button id='shadow-add' type = 'submit' class = 'btn btn-primary'>Edytuj</button>}
        { isPending && <button disabled type = 'submit' class = 'btn btn-primary'>Edytuj...</button>}
        </center>
      </form>
      </div>
    </div>
    </div>
  )
}





