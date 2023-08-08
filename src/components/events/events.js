import React from 'react';
import {useState,useEffect} from 'react';
import Navbar from '../navbar/navBar'
import '../blog/wyglad.css'
import { Link } from 'react-router-dom';
import './events.css'
import InfiniteScroll from 'react-infinite-scroller';

const url = process.env.REACT_APP_HOST


export default function Events(){

    const [items,setItems] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false);
    const [nextPage,setNextPage] = useState([]);

    useEffect(()=>{
        fetch(process.env.REACT_APP_HOST + '/events')

        .then(result=>result.json())
        .then((result)=>setItems(result))
        .then(setIsLoaded(true))


    },[]);
    const fetchNext = async()=>{

        const result = await fetch(nextPage)
        const jsonResult = await result.json()

        setItems(oldItems => [...oldItems,...jsonResult.results])
        setNextPage(jsonResult.next)}

    const DeletePost = (id)=>{
            fetch(process.env.REACT_APP_HOST + `/post/edit/${id}`,
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
                        <Link to={{
                                    pathname:`/post/${item.get_absolute_url}/${item.id}`,
                                    search: ``,
                                    state:{stateParam:true},
                                    }}>       
                            <div  class ='blog-diw2'>                            
                                <div> <h1> {item.title} </h1>
                                    <div class = 'content-diw2'> {item.content.substring(0,100)}...
                                    <a>...</a>

                                    
                                    </div>

                           

                                 {item.photos.length>0 &&
                                  <img src = {url + item.photos[0].photos.full_size}></img>
                                }
                                    
                                </div>   
                            </div>
                            </Link> 
                    
                        
                        <div className='przyciski'>

                        { localStorage.getItem('token')&&
                            <h4><Link to={`/edit/post/${item.id}`}>Edytuj</Link></h4>  }

                        { localStorage.getItem('token')&&
                            <button onClick ={()=>DeletePost(item.id)}>Usun</button> }
                        </div>
                       
                           </div>
                            ))}
                        <div>


                            {nextPage&&
                                    <button hidden onClick={()=>fetchNext()}>Wiecej..</button>}
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={fetchNext}
                                hasMore={true}
                                loader={<div className="loader" key={0}></div>}
                            >
                            </InfiniteScroll>
                        </div>
            </div>
            </div>
            </div>
        )}
