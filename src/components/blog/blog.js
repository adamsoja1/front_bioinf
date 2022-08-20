import React from 'react';
import Navbar from '../navbar/navBar'
import './wyglad.css'
import {useState,useEffect} from 'react';

import { Link } from 'react-router-dom';
const url = 'http://127.0.0.1:8000'







function Blog(){
    const [items,setItems] = useState([])
    const [isLoaded,setIsLoaded] = useState(false)

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/view-posts')
        .then(res=>res.json())
        .then((res)=> setItems(res))
        .then(setIsLoaded(true))
        .catch((error) =>{
            setIsLoaded(false)
        })
    },[])
    
 const DeletePost = (id)=>{
            fetch(`http://127.0.0.1:8000/post-edit/${id}`,
                {
                    method: 'DELETE',
                    headers: { "Content-Type": "application/json" ,
                                Authorization : `Token ${localStorage.getItem('token')}`},
            })
            .then(res=>res.json())
            .then((res)=> setItems(res))
 
        }
    


        return(
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
                        { localStorage.getItem('token')&&
                            <h4><Link to={`/edit/post/${item.id}`}>Edytuj</Link></h4>  }

                        { localStorage.getItem('token')&&
                            <button onClick ={()=>DeletePost(item.id)}>Usun</button> }
                        
                        </div>     
                            ))}
                        
                    </div>}
                </div>

            )
        }
    


function App2() {
    return(<div>
        <Navbar/>
      <div class = 'container'>

        <Blog/>
      </div>
      </div>
    )
  }
  
export default App2;