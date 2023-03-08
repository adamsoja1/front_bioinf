import React from 'react';
import Navbar from '../navbar/navBar'
import {useState, useEffect} from 'react'
import './downloadable.css'

export default function Downloadable(){

	const [downloadables, setDownloadables] = useState([])

	useEffect(() =>{
		fetch('http://127.0.0.1:8000/download')
		.then(res => res.json()
        .then((res)=> setDownloadables(res)))}, []);

	const uploadDownload = (id) => {
        fetch(`http://127.0.0.1:8000/download/6`, {
    method: 'GET'})
    
    .then(res => res.json())
    .then((res)=> setDownloadables(res))
    }
	

	return (
		<div>
		    <Navbar/>
		    
		        <div>
		            <h3>Pliki do pobrania</h3>

		            <div className='main-page'>
		            {downloadables.map(downloadable=>(
		               <div className='about-card' key={downloadable.id}>

		                  <div className='about-card-content'>
		                     <h6><b>Nazwa pliku : </b>{downloadable.name}</h6>
                                    <button onClick={()=>uploadDownload(downloadable.id)}> Pobierz </button>
                                    </div>
                                    {localStorage.getItem('token')&&
                                    <button onClick={()=>uploadDownload(downloadable.id)}>Usuń</button>}
		               </div>))}
		            </div>
		        </div>
		    
		</div>
		)

}