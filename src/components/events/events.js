import React from 'react';
import {useState,useEffect} from 'react';
import Navbar from '../navbar/navBar'
import '../blog/wyglad.css'
import { Link } from 'react-router-dom';
import './events.css'


const url = 'http://127.0.0.1:8000'


export default function Events(){

    const [items,setItems] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false)

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/events')

        .then(result=>result.json())
        .then((result)=>setItems(result))
        .then(setIsLoaded(true))


    },[]);

const DeletePost = (id)=>{
            fetch(`http://127.0.0.1:8000/post/edit/${id}`,
                {
                    method: 'DELETE',
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
            <h3>Wydarzenia</h3>
            <div>
                {items.map(item=>(                                               
                        <div>
                            <div  class ='blog-diw2'>
                        
                            
                                <div> <h1> {item.title} </h1>
                                    <div class = 'content-diw2'> {item.content.substring(0,100)}...       <Link to={{
                                        pathname:`/post/${item.get_absolute_url}/${item.id}`,
                                        search: ``,
                                        state:{stateParam:true},
                                    }}>       
                                    <a>Więcej...</a>
                                    
                                    </Link> 
                                    </div>

                           

                                 {item.photos.length>0 &&
                                  <img src = {url + item.photos[0].photos.full_size}></img>
                                }
                                    
                                </div>   
                            </div>
                            
                    
                        
                        <div className='przyciski'>

                        { localStorage.getItem('token')&&
                            <h4><Link to={`/edit/post/${item.id}`}>Edytuj</Link></h4>  }

                        { localStorage.getItem('token')&&
                            <button onClick ={()=>DeletePost(item.id)}>Usun</button> }
                        </div>
                       
                           </div>
                            ))}
            </div>


            </div>
            </div>
        )

}