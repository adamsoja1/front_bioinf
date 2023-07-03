import React from 'react';
import {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/navBar'
import { useParams } from "react-router-dom";
import '../blog/wyglad.css'
import './search.css'
import InfiniteScroll from 'react-infinite-scroller';

const url = process.env.REACT_APP_HOST

export default function SearchQueryContent(){
    const [post,setPost] = useState([]);
    const [query,setQuery] = useState('');
    const [nextPage,setNextPage] = useState([]);
    const [items,setItems] = useState([]);

    
    useEffect(()=>{
        fetch(process.env.REACT_APP_HOST + '/view-posts')
        .then(result => result.json())
        .then((result) => setPost(result.results))
    },[])

    const fetchNext = async()=>{

        const result = await fetch(nextPage)
        const jsonResult = await result.json()

        setItems(oldItems => [...oldItems,...jsonResult.results])
        setNextPage(jsonResult.next)}


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
                        <div>


                            {nextPage&&
                                    <button onClick={()=>fetchNext()}>Wiecej..</button>}
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
        )

}
