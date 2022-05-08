import { useState,useReducer, useEffect } from "react";
import React from 'react';
import { useHistory } from "react-router-dom";
import CommentsView from './commentsView'
function Comment(params)
{
    const [reducerValue,forceUpdate] = useReducer(x=>x+1,0);
    const firstRender =React.useRef(true);
    const [val,setVal] = useState(0);
    const increase = () => setVal(val + 1);


    const [content, setContent] = useState('');
    const [User,setUser] = useState('');
    const post = `http://127.0.0.1:8000/api/posts/${params.numer}/`
    const[isPending,setIsPending] = useState(false);
    const history = useHistory();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const comments = { content, User, post };
        setIsPending(true)
        const result =await fetch('http://127.0.0.1:8000/api/comment/', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(comments)
        }).catch((error) =>{
          setIsPending(false)
      })
      setVal(val + 1);
     
 }
      useEffect(()=>{
          if (firstRender.current){
              firstRender.current = false;
              console.log("first render");

          }else{
              console.log('re-render')
          }
      }
      )



   
    
      return(
          <div class = 'container'>
            <div>
                <form onSubmit={handleSubmit}> 
                    <div>
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
                        required
                        value = {content}
                        onChange = {(e) => setContent(e.target.value)}
                        />
                    </div>
                    <center>
                    {!isPending && <button  onClick = {increase} id='shadow-add'  type ='submit' class = 'btn btn-primary'>Dodaj komentarz</button>}
                    { isPending && <button   disabled type = 'submit' class = 'btn btn-primary'>Dodawanie...</button>}
                    
                    </center>
                    
                    </form>
            </div>  

                    <CommentsView post_id = {params.numer} red = {reducerValue}/>
            <div>
                
            </div>

            

          </div>
      )





};

export default Comment;