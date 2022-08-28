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
  
    useEffect(() => {
        const fetchData = async () => {
        const result = await fetch(`http://127.0.0.1:8000/comments/post/${params.numer}/`)
        const jsonResult = await result.json()
        
        
        setComment(jsonResult)
        }
     fetchData();
    

    },[]);

   

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
            <div>
                <form > 
                    <div class = 'container'> 
                        <label> Nazwa uzytkowika</label>
                        <input 
                        type = 'text'
                        required
                        value = {User}
                        onChange = {(e)=>setUser(e.target.value)}
                        />
                    </div>
                    <div>
                        <label> Treść </label>
                        <input
                        type = 'tekst'
                        
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
                    <h2>Komentarze:</h2>
                    {comment.map(coment=>
                    (
                            <div key = {coment.id}>
                                
                                <h4>Uzytkownik: {coment.User}</h4>
                                <h7  > Dodano: {coment.get_time} </h7>
                                <h2> </h2>
                                <h6>{coment.content}</h6>
                                <p></p>
                            </div>
                    )

                                                )
                    }

        </div>
            <div>
                
            </div>

            

          </div>
      )





};

export default Comment;