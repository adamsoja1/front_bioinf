import React from 'react';
import {useState,useEffect} from 'react';
import App4 from '../navbar/navBar'
import MemberPhoto from './aboutphoto'

export default function About()

{
   
    const [users,setUsers] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/members/')
        .then(res => res.json())
        .then((res)=> setUsers(res))
       
      
    },[]);

    const deleteUser = (id) => {
        fetch(`http://127.0.0.1:8000/members-delete/${id}`, {
    method: 'DELETE',
    headers: {  Authorization : `Token ${localStorage.getItem('token')}`},
    })
    .then(res => res.json())
    .then((res)=> setUsers(res))
}

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
                                {localStorage.getItem('token')&&
                                <button onClick={()=>deleteUser(user.id)}>Usuń</button>}
                            </div>
                            
                    ))}

                </div>
            </div>
        </div>
    )
                }





                
