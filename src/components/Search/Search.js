import React from 'react';
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navBar'
import { useParams } from "react-router-dom";
import '../blog/wyglad.css'
import './search.css'

const url = 'http://127.0.0.1:8000'

export default function SearchQueryContent(){
    const [post,setPost] = useState([]);
    const [query,setQuery] = useState('');

    
    useEffect(()=>{
        fetch('http://127.0.0.1:8000/view-posts')
        .then(result => result.json())
        .then((result) => setPost(result.results))
    },[])




    return(
        <div>
            <Navbar/>
        
        <div>
        
        <div className='search-div'>
        <form action="">
        <input type="search"  onChange={event => setQuery(event.target.value)} required/>
        <i class="fa fa-search"></i>
        <a href="javascript:void(0)" id="clear-btn">Clear</a>
        </form>
        </div>



            <div className='left'>
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
                .map(item=>(                                               

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
                        
                
                    
                    
                   
                       </div>
                        ))}
                    
                </div>

            </div>
            </div>
        )

}