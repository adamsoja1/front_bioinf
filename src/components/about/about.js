import React from 'react';
import {useState,useEffect} from 'react';
import Navbar from '../navbar/navBar'
import MemberPhoto from './aboutphoto'

import './about.css'
import GoogleMapReact from 'google-map-react'
import logo from './logo.png'
import ParticlesBackground from '../particles/particles';



export default function About(){

    const [users,setUsers] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/members/')
        .then(res => res.json())
        .then((res)=> setUsers(res))},[]);
 
    const deleteUser = (id) => {
        fetch(`http://127.0.0.1:8000/members/delete/${id}`, {
    method: 'DELETE',
    headers: {  Authorization : `Token ${localStorage.getItem('token')}`},
    })
    .then(res => res.json())
    .then((res)=> setUsers(res))
}

    return (
        <div>
            <ParticlesBackground/>
            <Navbar/>
            <div>

                <div className='page-right'>
                    <div className='contact'>
                        <div className='contact-content'>
                            <h3>Kontakt</h3>
                            <h6> <b>Email: </b> bioskn@gmail.com</h6>
                            <h4>Dołącz do nas!</h4>
                            <br/>
                            <br/>
                            <a href='https://www.facebook.com/bioinformatyczneskn'>

                                <img src ={logo} style={{height:"230px",
                                      width:"240px"}}></img>
                                </a>






                        

                        </div>


                            <div className='google-maps-box'>

                                <GoogleMapReact/>

                            </div>

                    </div>
                </div>



                <div className='main-page'>
                {users.map(user=>
                    (
                            <div className='about-card' key = {user.id}>
                                <div className='image-card'>
                                    <MemberPhoto id={user.id}/>
                                </div>

                                <div className='about-card-content'>
                                    <h6><b>Imie : </b>{user.user}</h6>
                                    <h6><b>Stanowisko : </b>{user.position}</h6>
                                    <h6><b>O sobie : </b>{user.about}</h6>
                                    <h6><b>Email : </b>{user.email}</h6>
                                    </div>
                                    {localStorage.getItem('token')&&
                                    <button onClick={()=>deleteUser(user.id)}>Usuń</button>}
                                
                            </div>
                            
                    ))}

                </div>
            </div>
        </div>
    )
}





                
