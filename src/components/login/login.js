import React from 'react';
import { useState, useEffect } from "react";
import Navbar from '../navbar/navBar'
import { useHistory } from "react-router-dom";
import './login.css'

export default function Login(){
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const[isPending,setIsPending] = useState(false);
    const [correct,setCorrect] = useState(true)

    const toggleModal = () => {
        setCorrect(!correct);
      };

    const history = useHistory();

    useEffect(()=>{
        if(localStorage.getItem('token')){
            history.push('/')
        }
    })

    const handleSubmit = async(e) => {
        e.preventDefault();
        const auth = {username,password}
        setIsPending(true)
        const result =await fetch(process.env.REACT_APP_HOST + '/auth', {
          method: 'POST',
          headers: { "Content-Type": "application/json",
                    "Accept":'application/json' },
          body: JSON.stringify(auth)
        }).catch((error) =>{
          setIsPending(false)
            })
        
        const token= await result.json()
        if(token.token){
           localStorage.setItem('token',token.token) 
           history.push('/')
           setCorrect(true)

           
        }else{
            setCorrect(false)
        }
        
        


    }
      return(
          <div>
              <Navbar/>
              <div className ='col-sm-6 offset-sm-3'>
                  <input type = 'text' onChange = {(e)=>setUsername(e.target.value)}
                  className = 'form-control'/>
                  <br />
                  <input type = 'password' onChange ={(e)=>setPassword(e.target.value)}
                  className = 'form-control'/>
                    <br />
                    <button className='btn btn-primary' type = 'submit' onClick = {handleSubmit}>Login</button>
                  
              </div>
              {!correct && <div className='overlay' onClick = {toggleModal}>   
                            <div onClick = {toggleModal}></div>
                            <div className = 'modal-content' onClick = {toggleModal}>

                            <h2>Wprowadzono niepoprawny login i hasło</h2>
                                </div>
                            
                            
                            
                            </div>}
          </div>
      )



}
