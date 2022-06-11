import React from 'react';
import {useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import App4 from '../navbar/navBar'
import './post.css'
import Comment from '../comments/commentAdd'
import Photos from  '../Gallery/photos'
function Post()
{
    const {id} = useParams();
    

    const [post, setPost] = useState([]);
    


    useEffect(() => {
            fetch(`http://127.0.0.1:8000/api/posts/${id}/`)
            .then(res => res.json())
            .then((res)=> setPost(res))
           
          
        },[]);
     

 

        const photos = post.photos ||{};

    return(
        <div>  
            <App4/>
            
                <div class = 'disp'>
              
                    
                    <h3 class = 'display-4'> Tytuł: {post.title}  </h3> 
                        <p >{post.content}</p> 
                        
                      
                 </div> 
            <div>
                <Photos id = {id}/>
            </div>
            <div>
                 
                     <Comment numer = {id}/>

                   
                 

                </div>
            </div>       
                         
                 
                 
            
        
        )


}


export default Post;