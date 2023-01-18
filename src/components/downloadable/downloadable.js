import React from 'react';
import Navbar from '../navbar/navBar'
import {useState, useEffect} from 'react'
import './downloadable.css'

export default function Downloadable(){
	
    fetch('http://127.0.0.1:8000/download', {
		                method: 'POST',              
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data)


                }).then(setIsLoaded(true))
		
	

	return (
		<div>
		    <Navbar/>
		    <div className="decl-box">
		        <div>
		            <h3>Pliki do pobrania</h3>
		        </div>

		    </div>

		</div>
		)

}