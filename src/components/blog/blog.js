import React from 'react';
import Navbar from '../navbar/navBar'
import './wyglad.css'
import {useState,useEffect} from 'react';
import './wyglad-boxow.css'
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import InfiniteScroll from 'react-infinite-scroller';
const url = process.env.REACT_APP_HOST



/*
function componentWillMount(){
  window.addEventListener('scroll', this.loadMore);
}

function componentWillUnmount(){
    window.removeEventListener('scroll', this.loadMore);
}

function loadMore(fetchNext){
    if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
        // Do load more content here!
        fetchNext()
    }
}
*/

function Blog(){
    const [items,setItems] = useState([])
    const [data,setData] = useState({})
    const [newItems,setNewItems] = useState([])
    const [nextPage,setNextPage] = useState([])
    const [isLoaded,setIsLoaded] = useState(false)
    const [lastPosts,setLastPosts] = useState([])
    const [mostViewedPosts,setMostViewedPosts] = useState([]);
    const [noPage,setNoPage] = useState(false)

    console.log(nextPage)
    //componentWillMount();

    useEffect(() => {

        const fetchData = async () => {
        const result = await fetch(process.env.REACT_APP_HOST + '/view-posts?p=1')
        const jsonResult = await result.json()


        setNextPage(jsonResult.next)
        setItems(jsonResult.results)

        setIsLoaded(true)
        }
     fetchData();


    },[]);



    useEffect(()=>{
        fetch(process.env.REACT_APP_HOST + '/latest-posts')
        .then(res=>res.json())
        .then((res)=> setLastPosts(res))
        .catch((error) =>{
            setIsLoaded(false)
        })
    },[])






    useEffect(()=>{
        fetch(process.env.REACT_APP_HOST + '/most-viewed')
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

    //loadMore(fetchNext);

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

                                            {post.get_date_display} &nbsp;&nbsp;&nbsp; <b>{post.title}</b>

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


                                        {post.get_date_display} &nbsp;&nbsp;&nbsp; <b>{post.title}</b>

                                        </p>
                                        </Link>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>



                                    <div>
                                        </div>





                </div>




                <div className='left'>
                    <div className='tekst'>
                <h3>Nowości</h3>
                    </div>
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

                    </div>}
                </div>

            )
        }


function App2() {
    return(<div>
        <div>
        <Navbar/>
        <Blog/>
        </div>
      </div>

    )
  }

export default App2;
