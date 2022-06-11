import React from 'react';
import {useState,useEffect} from 'react';
import App4 from '../navbar/navBar'
import MemberPhoto from './aboutphoto'
export default function About()

{
    const apiUrl = 'http://127.0.0.1:8000'
    const [users,setUsers] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/members/')
        .then(res => res.json())
        .then((res)=> setUsers(res))
       
      
    },[]);

  
    return (
        <div>
            <App4/>
            <div>
                <h2>To my:</h2>
                <div>
                {users.map(user=>
                    (
                            <div key = {user.id}>
                                <h4>Imie : {user.user}</h4>
                                <h6>Stanowisko : {user.position}</h6>
                                <h6>O sobie : {user.about}</h6>
                                <h6>Email : {user.email}</h6>
                                <MemberPhoto id={user.id}/>
                            </div>
                    )

                                                )
                    }

                </div>
            </div>
        </div>
    )
                }





                
