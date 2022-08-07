import React from 'react';
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Login from './login'

export default function Logout(){
    localStorage.clear()
    sessionStorage.clear()
    
    return(
        <Login/>
    )

}