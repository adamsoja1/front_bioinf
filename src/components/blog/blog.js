import React,{Component} from 'react';
import Navbar from '../navbar/navBar'
import './wyglad.css'

import { Link } from 'react-router-dom';

class Blog extends Component{
    constructor(props){
        super(props);
        this.state = {
            items:[],
            isLoaded:false,
     
       }
    } 
componentDidMount(){
    fetch('http://127.0.0.1:8000/api/posts/')
    .then(res=>res.json())
    .then(json=>{
        this.setState({
            items:json,
            isLoaded:true,
            })
    
        })
    .catch((error) =>{
        this.setState({
        isLoaded:false,
        })
    })

    }    

render()
{
    var {isLoaded,items} = this.state;

    if(!isLoaded){
        return (<div class = 'container'>
            
            <div>
            <center> 
                <h2>Ładuję ...</h2>
            </center>
      </div>
      <center>
        <div class="spinner-border" role="status"></div>
       </center>     
      </div>
        )
    }
    else{
        return(
            <div class = 'container'>
                
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
                             
                                 
                                  <img src = {item.photos.length>0 ? item.photos[0].photos.thumbnail:''}></img>

                                </div>   
                                                
                            </div>
                            
                        </div>
                    
                        </Link>
                        </div>     
                        ))}
                        
                    </div>

                </div>
            )
        }
    }
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