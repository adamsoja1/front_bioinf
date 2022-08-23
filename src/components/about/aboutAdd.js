import React,{Component,useState,useEffect} from 'react';
import Navbar from '../navbar/navBar'
import { useHistory } from "react-router-dom";
 

function CreateMember(){


    const [email, setEmail] = useState('');
    const [about, setAbout] = useState('');
    const [position, setPosition] = useState('');
    const [user, setUser] = useState('');
    const [photo,setPhoto] = useState()
    const[isPending,setIsPending] = useState(false);
    const history = useHistory();
  
    useEffect(()=>{
      if(!localStorage.getItem('token')){
        history.push('/login')
      }
    })
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const uploadData = new FormData();
      uploadData.append('user',user)
      uploadData.append('position',position)
      uploadData.append('email',email)
      uploadData.append('about',about)
      uploadData.append('member_photo',photo)
      setIsPending(true)
      fetch('http://127.0.0.1:8000/members-add', {
        method: 'POST',
        headers: { Authorization : `Token ${localStorage.getItem('token')}`},
        body: uploadData
      }).then(() => {
        history.push('/About');
      })
      .catch((error) =>{
        setIsPending(false)
    })
  
    }    
    return (
      <div>
        <Navbar/>
      <div class="container" id='rozmiar'>
        <div class = 'mb-3' id='rozmiar'>
        <form onSubmit={handleSubmit}>
          <div class = 'mb-3'>
          <label for= "exampleFormControlInput1" class="form-label">Imie:</label>
          <input
            id='shadow-add' 
            type="text" 
            class='form-control'
            placeholder="Tytuł.."
            required 
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          </div>
          <div class ='mb-3'>
          <label for='exampleFormControlInput1' class="form-label">Stanowisko:</label>
          <input
            id='shadow-add' 
            class="form-control"  rows="3"
            required
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          ></input>
          </div>
          <div class = 'mb-3'>
          <label for='exampleFormControlTextarea1' class="form-label">O sobie:</label>
          <textarea
            id='shadow-add' 
            type="text" 
            class='form-control'
           
            required 
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
          </div>

          <div class ='mb-3'>
          <label for='exampleFormControlInput1' class="form-label">Email:</label>
          <input
            id='shadow-add' 
            class="form-control"  rows="3"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          </div>
          <input type="file"  onChange={(e) => setPhoto(e.target.files[0])}/>
          <center>
          {!isPending && <button id='shadow-add'  type = 'submit' class = 'btn btn-primary'>Dodaj osobę</button>}
          { isPending && <button disabled type = 'submit' class = 'btn btn-primary'>Dodawanie...</button>}
          </center>
        </form>
        </div>
      </div>
      </div>
    );
  }



  
  export default CreateMember;