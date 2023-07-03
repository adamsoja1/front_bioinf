import React from 'react';
import {useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navBar'
import './wyglad.css'
import './tag.css'

const url = process.env.REACT_APP_HOST


 export default function GetPostByTag(){

    const [items,setItems] = useState([]);
    const {nazwa} = useParams();
    const [isLoaded,setIsLoaded] = useState(false)

    useEffect(()=>{
        fetch(process.env.REACT_APP_HOST + `/filter/post/${nazwa}`)
        .then(result => result.json())
        .then((result) => setItems(result))
        .catch((error) =>{

            setIsLoaded(false)
        })
        .then(setIsLoaded(true))
    },[])


    return(
        <div>
            <Navbar/>
        
        <div class = 'container'>
            <h3>Wydarzenia</h3>
            <div>
                {items.map(item=>(
                    <div className='blog-diw2'>
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
                    
                ))}
            </div>


            </div>
            </div>
 
        )
    }








