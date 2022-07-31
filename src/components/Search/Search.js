import React from 'react';
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navBar'
import { useParams } from "react-router-dom";
import '../blog/wyglad.css'


export default function SearchQueryContent(){
    const [post,setPost] = useState([]);
    const [query,setQuery] = useState(' ');

    
    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/posts/')
        .then(result => result.json())
        .then((result) => setPost(result))
    },[])




    return(
        <div>
            <Navbar/>
        
        <div class = 'container'>
        <input placeholder="Czego szukasz?" onChange={event => setQuery(event.target.value)} />
            <div class ='row align-items-center'>
            {
                post.filter(item => {
                    if (query === '') {
                    return item;
                    } else if (item.content.includes(query)){
                    return item;
                    } else if (item.title.includes(query)){
                        return item;
                    }
                })
                .map((item=>(                                               
                    <div class = 'col-6 .--4col-' key={item.id}>
                     <Link to={`/post/${item.get_absolute_url}/${item.id}`}>
                     <div class ='blog-diw'>                                          
                        <div >
                        
                            <div class ='a' >Tytuł: {item.title}| Autor: {item.author} 
                              <div class = 'content-diw'> {item.content.substring(0,100)}...</div>
                              {item.event && <p>Wydarzenie</p>}
                              {!item.event && <p>Post</p>}
                            </div>   
                                            
                        </div>
                        
                    </div>
                
                    </Link>
                    </div>     
                    )))}
                    
                </div>

            </div>
            </div>
        )

}