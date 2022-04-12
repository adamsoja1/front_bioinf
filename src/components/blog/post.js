import React from 'react';
import {useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import App4 from '../navbar/navBar'
import './post.css'
function Post()
{
    const {id} = useParams();
  
    const [post, setPost] = useState([]);
  

    useEffect(() => {
            fetch(`http://127.0.0.1:8000/api/posts/${id}/`)
            .then(res => res.json())
            .then((res)=> setPost(res))
           
          
        },[]);
     

 
        console.log(post.comments)
        const comments = post.comments || {};

    return(
        <div>  
            <App4/>
            
                <div class = 'disp'>
              
                    
                    <h3 class = 'display-4'> Tytuł: {post.title}  </h3> 
                        <p >{post.content}</p> 
                     
                      
                 </div> 
                <div>
                    <h2>Komentarze:</h2>
                    {Object.values(comments).map(coment=>(
                        <div>
                            <h4>{coment.User}</h4>
                            <h6>{coment.content}</h6>
                            <p></p>
                            </div>
                    )

                        )}
                </div>
       
                         
                 
                 
            </div>
        
        )


}


export default Post;