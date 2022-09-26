import React from 'react';
import {useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navBar'


 export default function GetPostByTag(){

    const [post,setPost] = useState([]);
    const {nazwa} = useParams();
    const [isLoaded,setIsLoaded] = useState(false)

    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/filter/post/${nazwa}`)
        .then(result => result.json())
        .then((result) => setPost(result))
        .catch((error) =>{

            setIsLoaded(false)
        })
        .then(setIsLoaded(true))
    },[])


    return(
        
        <div>
            <Navbar/>

        <div>
            {!isLoaded &&
            <div>
                                
            <div>
            <center> 
                <h2>Ładuję ...</h2>
            </center>
            </div>
            <center>
        <div class="spinner-border" role="status"></div>
            </center>     
            </div>}
            {isLoaded &&
        <div class = 'container'>
            
            <div class ='row align-items-center'>
                
                {post.map(item=>(                                               
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
                    ))}
                    
                </div>

            </div>
                    }

            </div>

            </div>
        )
    }








