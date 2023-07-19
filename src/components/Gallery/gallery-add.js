import React from 'react';
import {useState,useEffect} from 'react';
import Navbar from '../navbar/navBar'
import { useHistory } from 'react-router-dom';

export default function CreateGallery(){
    const [title,setTitle] = useState('')
    const [files,setFiles] = useState()
    const[isPending,setIsPending] = useState(false);
    const history = useHistory()

    useEffect(()=>{
        if(!localStorage.getItem('token')){
          history.push('/login')
        }
      })



      const handleSubmit = () => {
        const uploadData = new FormData();
        uploadData.append('title',title)
        if(files != undefined){
          for(let i=0;i<=files.length;i++){
            uploadData.append('photos',files[i]);
          }}
    
        console.log(uploadData)
        setIsPending(true)
        fetch(process.env.REACT_APP_HOST + '/gallery/add', {
          method: 'POST',    
          headers: { Authorization : `Token ${localStorage.getItem('token')}`},
          body: uploadData
        }).then(() => {
    
          history.push('/gallery');
        })
        .catch((error) =>{
          setIsPending(false)
      })
        
      } 


      return(
          <div>
            <Navbar/>
                <div>
                    <div class = 'mb-3'>
                        <label for= "exampleFormControlInput1" class="form-label">Tytuł galerii:</label>
                            <input
                            id='shadow-add' 
                            type="text" 
                            class='form-control'
                            placeholder="Tytuł.."
                            required 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                    </div>

                    <label>
                        <input type="file" multiple onChange={(evt) => setFiles(evt.target.files)}/>
                    </label>
                    <br/>
                    <button onClick={() => handleSubmit()}>Dodaj</button>
                </div>
        </div>
      )

}
