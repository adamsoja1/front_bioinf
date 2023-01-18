import React from 'react';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import '../blog/add.css'
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Navbar from '../navbar/navBar'

const url = 'http://127.0.0.1:8000'
export default function PostRubbish(){
        const history = useHistory();

    useEffect(()=>{
        if(!localStorage.getItem('token')){
          history.push('/login')
        }
      })


    const [items,setItems] = useState([])
    const [isLoaded,setIsLoaded] = useState(false)

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/posts/deleted')
        .then(res=>res.json())
        .then((res)=> setItems(res))
        .then(setIsLoaded(true))
        .catch((error) =>{
            setIsLoaded(false)
        })
    },[])

    const Deletion = (id)=>{
        fetch(`http://127.0.0.1:8000/posts/deletion/${id}`,
            {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" ,
                            Authorization : `Token ${localStorage.getItem('token')}`},
        })
        .then(res=>res.json())
        .then((res)=> setItems(res))

    }
    const Recovery = (id) =>{
    fetch(`http://127.0.0.1:8000/posts/deletion/${id}`,
    {
        method: 'PUT',
        headers: { "Content-Type": "application/json" ,
                    Authorization : `Token ${localStorage.getItem('token')}`},

        })
        .then(res=>res.json())
        .then((res)=> setItems(res))

    }

    return(
        <div>
            <Navbar/>
        <div class = 'container'>
        {!isLoaded &&
            <div class = 'container'>
                       
                       <div>
                       <center> 
                           <h2>Ładuję ...</h2>
                       </center>
                 </div>
                 <center>
                   <div class="spinner-border" role="status"></div>
                  </center>     
                 </div>
               }
        
            {isLoaded&&
            <div class ='row align-items-center'>
                
                {items.map(item=>(                                               
                    <div class = 'col-6 .--4col-' key={item.id}>
                     <Link to={{
                         pathname:`/post/${item.get_absolute_url}/${item.id}`,
                         search: ``,
                         state:{stateParam:true},
                         

                }}>    
                     <div class ='blog-diw'>
                     
                        
                        <div >
                        
                            <div class ='a' >Tytuł: {item.title}| Autor: {item.author} 
                              <div class = 'content-diw'> {item.content.substring(0,100)}...</div>
                              {item.event && <p>Wydarzenie</p>}
                              {!item.event && <p>Post</p>}
                         
                             
                              <img src = {item.photos.length>0 ? url + item.photos[0].photos.thumbnail:''}></img>

                            </div>   
                             
                        </div>
                        
                    </div>
                
                    </Link>
                    <button onClick = {()=>Deletion(item.id)}> Usuń z bazy danych </button>
                    <button onClick = {()=>Recovery(item.id)}>Odzyskaj</button>
                    </div>     
                        ))}
                    
                </div>}
            </div>
            </div>

        )
    }
