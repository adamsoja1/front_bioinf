import React from 'react';
import {useState,useEffect} from 'react';
import { useParams, useLocation } from "react-router-dom";
import Navbar from '../navbar/navBar'
import './post.css'
import Comment from '../comments/commentAdd'
import Photos from  '../Gallery/photos'
import Tag from './tags'
function Post(props)
{
    const {url} = useParams();
    const {id} = useParams();
    const [post, setPost] = useState([]);
    


    useEffect(() => {
            fetch(`http://127.0.0.1:8000/api/posts/${id}/`)
            .then(res => res.json())
            .then((res)=> setPost(res))
           
          
        },[]);
     

 

        

    return(
        <div>  
            <Navbar/>
            
                <div class = 'disp'>
                
                    <Tag id ={id}/>
                    
                    
                    <h3 class = 'display-4'> Tytuł: {post.title} <h6> Dodano:    {post.get_time_display}</h6> </h3> 
                        <p >{post.content}</p> 
                        
                      
                        <Photos id = {id}/>
                 </div> 

            <div>
                
            </div>


            <div class = 'comm'>
                 
                     <Comment numer = {id}/>

                   
                 

                </div>
            </div>       
                         
                 
                 
            
        
        )


}


export default Post;