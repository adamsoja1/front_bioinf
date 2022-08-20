import { useState, useEffect } from "react";
import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function DeletePost(id){
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/post-edit/${id}`,
            {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" ,
                            Authorization : `Token ${localStorage.getItem('token')}`},
        }

    })

}