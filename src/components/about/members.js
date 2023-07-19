import React from 'react';
import {useState,useEffect} from 'react';
import Navbar from '../navbar/navBar'

export default function RegisteredMembers(){

    const [members,setMembers] = useState([])

    useEffect(()=>{
        fetch(process.env.REACT_APP_HOST + '/get-club-members', {
            method: 'GET',
            headers: { Authorization : `Token ${localStorage.getItem('token')}`},
          })
        
        .then(res=>res.json())
        .then((res)=>setMembers(res))


    },[])


    return(
        <div>
            <Navbar/>
            <div>
                {members.map(member=>(
                    <div>
                        <h5>{member.name}</h5>
                        <h5>{member.surname}</h5>
                        <h2>--------------</h2>
                    </div>
                ))}

            </div>

        </div>
    )
    



}
