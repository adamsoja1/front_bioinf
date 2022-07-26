
import React,{Component} from 'react';

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
      </ul>
    </div>
      </div>
        
  </nav>

    )
}



export default Navbar;