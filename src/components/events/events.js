import React from 'react';
import {useState,useEffect} from 'react';
import App4 from '../navbar/navBar'
import './wyglad.css'
import { Link } from 'react-router-dom';

export default function Events(){

    const [items,setItems] = useState([]);


    useEffect(()=>{
        fetch('http://127.0.0.1:8000/events')
        .then(result=>result.json())
        .then((result)=>setItems(result))


    },[]);

   

    return(
        <div>
            <App4/>
        
        <div class = 'container'>
            
            <div class ='row align-items-center'>
                
                {items.map(item=>(                                               
                    <div class = 'col-6 .--4col-' key={item.id}>
                     <Link to={`/post/${item.id}`}>
                     <div class ='blog-diw'>
                     
                        
                        <div >
                        
                            <div class ='a' >Tytuł: {item.title}
                              <div class = 'content-diw'> {item.content.substring(0,100)}...</div>
                            </div>   
                                            
                        </div>
                        
                    </div>
                
                    </Link>
                    </div>     
                    ))}
                    
                </div>

            </div>
            </div>
        )

}