
import React,{Component} from 'react';

class Navbar extends Component{
    render(){
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
          <a class="nav-link "href='/'>Galeria</a>
        </li>
        <li class="nav-item">
          <a class="nav-link "href='/'>Wydarzenia</a>
        </li>
      </ul>
    </div>
      </div>
        
  </nav>

    )
}}

function App4(){
    return(
        <Navbar/>
    )
}

export default App4;