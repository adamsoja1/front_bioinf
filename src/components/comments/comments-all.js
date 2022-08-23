import { useState,useEffect } from "react";
import React from 'react';
import Navbar from '../navbar/navBar'


export default function Allcomments(){

    const [comments,setComments] = useState([])

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/comments-get', {
            method: 'GET',
            headers: { Authorization : `Token ${localStorage.getItem('token')}`},
          })
        .then(res => res.json())
        .then((res)=>setComments(res))
    },[])

    const deleteComment = (id) =>{
        fetch(`http://127.0.0.1:8000/comments-delete/${id}`, {
            method: 'DELETE',
            headers: { Authorization : `Token ${localStorage.getItem('token')}`},
          })
          .then(res=>res.json())
          .then((res)=>setComments(res))      
        } 


    return(
        <div>
            <Navbar/>
            <div>
                {comments.map(comment=>(
                    <div>
                        <div>
                            <h6>User:{comment.User}|| Dodano: {comment.get_time}</h6>
                            <h8>{comment.content}</h8>
                            
                        </div>
                        <button onClick = {()=>deleteComment(comment.id)}>Usuń</button>
                    </div>       
                ))}

            </div>
        </div>
    )
    





}