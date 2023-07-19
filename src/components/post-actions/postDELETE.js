import { useState, useEffect } from "react";
import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function DeletePost(id){
    useEffect(()=>{
        fetch(process.env.REACT_APP_HOST + `/post/edit/${id}`,
            {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" ,
                            Authorization : `Token ${localStorage.getItem('token')}`},
        }

    })

}
