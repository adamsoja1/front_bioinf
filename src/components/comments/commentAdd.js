import { useState,useEffect,useReducer } from "react";
import React from 'react';
import { useHistory } from "react-router-dom";
import './comment.css'

function Comment(params)
{
    const [comment,setComment] = useState([])

    const [content, setContent] = useState('');
    const [User,setUser] = useState('');
    const post = params.numer;
    const[isPending,setIsPending] = useState(false);
    const[isLoaded,setIsLoaded] = useState(false);
  

    try{
    useEffect(() => {
        
        const fetchData = async () => {
        const result = await fetch(`http://127.0.0.1:8000/comments/post/${params.numer}/`)
        const jsonResult = await result.json()
        
        
        setComment(jsonResult)
        setIsLoaded(true)
        }
     fetchData();
    

    },[]);
        }catch(error){
            setIsLoaded(false)
        }


   

    const handleSubmit = async(e) => {
        e.preventDefault();
        const commentts = { content, User, post };
        setIsPending(true)
        const result =await fetch('http://127.0.0.1:8000/api/comment/', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(commentts)
        }).catch((error) =>{
          setIsPending(false)
      })

        const newComment= await result.json()
        setComment(oldComment => [newComment,...oldComment])
     
 }
      



   
    
      return(
          <div>
              
            <div class = 'comments'>
                <form > 
                    <div class ='user'> 
                        <label> Nazwa uzytkowika  </label>
                        <input 
                        type = 'text'
                        required
                        maxLength='10'
                        value = {User}
                        onChange = {(e)=>setUser(e.target.value)}
                    />
                    </div>
                    <div class = 'content'>
                        <label> Treść </label>
                        <input
                        type = 'text'
                        
                        value = {content}
                        onChange = {(e) => setContent(e.target.value)}
                        required/>
                    </div>
                    <center>
                    {!isPending && <button onClick= {handleSubmit}  id='shadow-add'  type ='submit' class = 'btn btn-primary'>Dodaj komentarz</button>}
                    { isPending && <button   disabled type = 'submit' class = 'btn btn-primary'>Dodano komentarz</button>}
                    
                    </center>
                    
                    </form>
            </div>  

            <div>

                
                <br/>
                <br/>
                    <h2>Komentarze:</h2>
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
                <div className='comments-display'>

               
                    {comment.map(coment=>
                    (
                            <div className='comment-box' key = {coment.id}>
                                
                                <h4>{coment.User}</h4>
                             
                                <h7> Dodano: {coment.get_time} </h7>
                                
                                <h6>{coment.content}</h6>
                                <center>
                                <h5></h5>
                                </center>
                                <p></p>
                            </div>
                    )

                                                )
                    }

                    </div>}
        </div>
            <div>
                
            </div>

            

          </div>
      )





};

export default Comment;