
import React,{Component} from 'react';
import Logout from '../login/logout'
function Navbar(){

 
    return(
   
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Strona glowna</a>
            
            <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/About">O nas</a>
        </li>
        <li class="nav-item">
          <a class="nav-link "href='/gallery'>Galeria</a>
        </li>
        <li class="nav-item">
          <a class="nav-link "href='/events'>Wydarzenia</a>
        </li>
        <li class="nav-item">
          <a class="nav-link "href='/search'>Szukaj</a>
        </li>
      
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
        Współpraca      </a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="https://www.facebook.com/bioinformatyczneskn"> Facebook</a>
        <a class="dropdown-item" href="http://kbs.ise.polsl.pl/sknb/">SKNB</a>
        <a class="dropdown-item" href="https://www.polsl.pl/rau/">AEI</a>
      </div>
    </li>
    {!localStorage.getItem('token')&&<li class="nav-item">
          <a class="nav-link "href='/login'>Login</a>
        </li>}
    {localStorage.getItem('token')&&<li class="nav-item">
          <a class="nav-link "href='/login' onClick={Logout}>Logout</a>
        </li>}
        {localStorage.getItem('token')&&<li class="nav-item">
          <a class="nav-link "href='/dodaj' >Dodaj post</a>
        </li>}
        {localStorage.getItem('token')&&<li class="nav-item">
          <a class="nav-link "href='/post-rubbish' >Kosz</a>
        </li>}
        {localStorage.getItem('token')&&<li class="nav-item">
          <a class="nav-link "href='/about/create' >Dodaj czlonka</a>
        </li>}
        {localStorage.getItem('token')&&<li class="nav-item">
          <a class="nav-link "href='/comments-all' >Usun komentarze</a>
        </li>}
        {localStorage.getItem('token')&&<li class="nav-item">
          <a class="nav-link "href='/members' >Czlonkowie</a>
        </li>}
      </ul>
    </div>
      </div>
        
  </nav>

    )
}



export default Navbar;