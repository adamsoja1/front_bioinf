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

	const DeleteFile = (id)=>{
            fetch(`http://127.0.0.1:8000/download/${id}`,
                {
                    method: 'GET',

            })
            .then(res=>res.json())
            .then((res)=> setDownloadables(res))

        }

	const uploadDownload = (filename, id) => {
        fetch(`http://127.0.0.1:8000/download/${id}`).then(
    response => {
      response.blob().then(blob => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      console.log(url);
      a.href = url;
      a.download = filename;
      a.click();
    });
  });
}

	return (
		<div>
		    <Navbar/>

		        <div>
		            <h3>Pliki do pobrania</h3>

		            <div className='main-page'>
		            {downloadables.map(downloadable=>(
		               <div className='file-card' key={downloadable.id}>

		                  <div className='file-card-content'>
		                     <h6><b>Nazwa pliku : </b>{downloadable.name}</h6>
                                    <button class="button-12" onClick={()=>uploadDownload(downloadable.upload.replace('/media/uploads/', ''), downloadable.id)}> Pobierz </button>
                                    </div>
                                    {localStorage.getItem('token')&&
                                    <button onClick={()=>DeleteFile(downloadable.id)}>Usuń</button>}
		               </div>))}
		            </div>
		        </div>

		</div>
		)

}
