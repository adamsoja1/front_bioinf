import React from 'react';
import Navbar from '../navbar/navBar'
import './wyglad.css'
import {useState,useEffect} from 'react';
import './wyglad-boxow.css'
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import ParticlesBackground from '../particles/particles';
const url = 'http://127.0.0.1:8000'







function Blog(){
    const [items,setItems] = useState([])
    const [data,setData] = useState({})
    const[newItems,setNewItems] = useState([])
    const [nextPage,setNextPage] = useState([])
    const [isLoaded,setIsLoaded] = useState(false)
    const [lastPosts,setLastPosts] = useState([])
    const [mostViewedPosts,setMostViewedPosts] = useState([]);
    const [noPage,setNoPage] = useState(false)

    console.log(nextPage)

    useEffect(() => {
        
        const fetchData = async () => {
        const result = await fetch('http://127.0.0.1:8000/view-posts?p=1')
        const jsonResult = await result.json()
        
        
        setNextPage(jsonResult.next)
        setItems(jsonResult.results)

        setIsLoaded(true)
        }
     fetchData();
    

    },[]);
    


    useEffect(()=>{
        fetch('http://127.0.0.1:8000/latest-posts')
        .then(res=>res.json())
        .then((res)=> setLastPosts(res))
        .catch((error) =>{
            setIsLoaded(false)
        })
    },[])






    useEffect(()=>{
        fetch('http://127.0.0.1:8000/most-viewed')
        .then(res=>res.json())
        .then((res)=> setMostViewedPosts(res))
        .catch((error) =>{
            setIsLoaded(false)
        })
    },[])
    



    const fetchNext = async()=>{

        const result = await fetch(nextPage)
        const jsonResult = await result.json()
        
        setItems(oldItems => [...oldItems,...jsonResult.results])
        setNextPage(jsonResult.next)
        


    }

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
            <div>
        
          
            {!isLoaded &&
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

            {isLoaded &&
            <div>
                <div className = 'right'>


                    <div className = 'obramowanie-latest'>
                        <div> 
                        <h5>Ostatnio dodane:</h5>
                            {lastPosts.map(post=>(
                                <div className='linijka-post-obramowanie'>
                                    <div>
                                    <Link to={{
                                            pathname:`/post/${post.get_absolute_url}/${post.id}`,
                                            search: ``,
                                            state:{stateParam:true},
                                            
                
                                    }}>  
                                        <p>
                       
                                            <b>{post.title}</b> &nbsp; &nbsp; &nbsp;    Data:{post.get_time_display} 
                                            
                                        </p>
                                        </Link>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div> 




                    <div className = 'obramowanie-latest'>
                        <div> 
                        <h5>Najchętniej oglądane:</h5>
                            {mostViewedPosts.map(post=>(
                                <div className='linijka-post-obramowanie'>
                                    <div>
                                    <Link to={{
                                            pathname:`/post/${post.get_absolute_url}/${post.id}`,
                                            search: ``,
                                            state:{stateParam:true},
                                            
                
                                    }}>  
                                        <p>
                       
                                        <b>{post.title}</b> &nbsp; &nbsp; &nbsp; Wyświetlenia: {post.views}
                                            
                                        </p>
                                        </Link>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div> 



                                    <div>
                                        Mozna dodac ostatnie zdjecia
                                        </div>





                </div>                
                

                
                
                <div className='left'>
                    <div className='tekst'>
                <h3>Nowości</h3>
                    </div>
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

                            {nextPage&&
                                    <button onClick={()=>fetchNext()}>Wiecej..</button>}

                        </div>
                        
                    </div>
                                   
                    </div>}
                </div>

            )
        }
    


function App2() {
    return(<div>
        
        <ParticlesBackground/>
        <div>
        <Navbar/>
        <Blog/>
        </div>
      </div>

    )
  }
  
export default App2;