import React from 'react';
import {useState,useEffect} from 'react';
import { useParams, useLocation } from "react-router-dom";
import Navbar from '../navbar/navBar'
import './post.css'
import Comment from '../comments/commentAdd'
import Photos from  '../Gallery/photos'
import Tag from './tags'
import ImageUpload from './add-photo'
import { Link } from 'react-router-dom';
function Post(props)
{
    
    const {id} = useParams();
    const [post, setPost] = useState('');
    const [loaded,setLoaded] = useState(false)


    useEffect(() => {
            fetch(process.env.REACT_APP_HOST + `/post/${id}/`)
            .then(res => res.json())
            .then((res)=> {alert(JSON.stringify(res));setPost(res)})
            .then(setLoaded(true))
          
        },[]);

     

    return(
        <div>  
            <Navbar/>
            {!loaded &&
                    <div>
                                
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
            {loaded &&
                <div class = 'disp'>
                    
                    {localStorage.getItem('token')&&
                        <h4><Link to={`/edit/post/${post.id}`}>Edytuj</Link></h4>
    }
                    <h3 class = 'display-4'> <b>{post.title}</b>  </h3> 
                    <h8> {post.get_time_display}</h8>
                      <div className='display-content'>
                          <p>
                          {post.content} 
                          </p>
                          </div>   
                          <h6>Wyswietlenia: {post.views} </h6>       
     
                        <Photos id = {id}/>
                     
                 </div> 
}
                 <div>
                 <Tag id ={id}/>
                 </div>
                 <br/>
            <div>
                
            </div>

            Spodobał się post? Skomentuj!
            <div class = 'comm'>
                 
                     <Comment numer = {id}/>
                </div>
            </div>       

                 
                 
            
        
        )


}


export default Post;
