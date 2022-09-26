import { useState,useEffect } from "react";
import React from 'react';
import Navbar from '../navbar/navBar'
import './declaration.css'

export default function Declaration(){
    const [nick,setNick] = useState()
    const [name,setName] = useState()
    const [surname,setSurname] = useState()
    const [email,setEmail] = useState()
    const [number,setNumber] = useState()
    const [wydzial,setWydzial] = useState()
    const [kierunek,setKierunek] = useState()
    const [rok,setRok] = useState()
    const [uploaded,setIsUploaded] = useState(false)
    const[success,setSuccess] = useState()



    console.log(wydzial)
    function sendData(){
        
        const data = {nick,name,surname,email,number,wydzial,kierunek,rok}
            if(nick == undefined||name==undefined||surname==undefined||email==undefined||number==undefined||wydzial==undefined||kierunek==undefined||rok==undefined){
                setSuccess('Uzupełnij wszystkie pola!')

            }else{        

        fetch('http://127.0.0.1:8000/formularz/',{
                        method: 'POST',              
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data)


                })
                .then(setIsUploaded(true))
                .then(setSuccess('Wysłano!'))}
            

    }



    return(
        <div>
            <Navbar/>
            
            <div className='decl-box'>
                <div>
                   <h2>Deklaracja członkowstwa</h2> 
                </div>
                 <div>
                     <center>
                         <h7>Nick</h7>
                         <input required value={nick} type="text" class="css-input" onChange={(e)=>setNick(e.target.value)}/>
                     </center>
                 </div>
                <div className='left-side'>
                    <h7>Imię   </h7>
                <input required value={name} type="text" class="css-input" onChange={(e)=>setName(e.target.value)}/>
                </div>

                <div className='right-side'>
                <h7>Nazwisko </h7>
                <input required value = {surname} onChange={(e)=>setSurname(e.target.value)} type="text" class="css-input" />
                </div>
                <div className = 'left-side'>
                <h7>Email </h7>
                <input required value={email} onChange={(e)=>setEmail(e.target.value)} type="text" class="css-input" />
                </div>

                <div className='right-side'>
                <h7>Numer tel. </h7>
                <input required value={number} onChange={(e)=>setNumber(e.target.value)} type="text" class="css-input" />
                </div>


                <div className='right-side'>
                <h7>Wydział </h7>
                <input required value={wydzial} onChange={(e)=>setWydzial(e.target.value)} type="text" class="css-input" />
                </div>

                <div className='left-side'>
                <h7>Kierunek </h7>
                <input required value={kierunek} onChange={(e)=>setKierunek(e.target.value)} type="text" class="css-input" />
                </div>

                <div>
                <h7>Rok studiów </h7>
                <input required value={rok} onChange={(e)=>setRok(e.target.value)} type="number" min='1' max='5' class="css-input" />
                </div>
                <center>
                    {!uploaded&&
                    <button className='button-12' onClick = {sendData} type='submit'>Wyślij</button>}
                    {uploaded &&
                    <button disabled className='button-12'  type='submit'>Wyślij</button>
                    }
                </center>
               
                <h3>{success}</h3>
            </div>
           
        </div>
    )
}