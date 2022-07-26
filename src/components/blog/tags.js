import React from 'react';
import {useState,useEffect} from 'react';

import { Link } from 'react-router-dom';

export default function Tag(params){


    const [tags,setTags] = useState([]);



    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/tags/post/${params.id}`)
        .then(result=>result.json())
        .then((result)=>setTags(result))

    },[]);


    return(
        <div>

            {tags.map(tag=>(
                <Link to ={`/${tag.tagi}/posts`}>
                <h6>{tag.tagi}</h6>
                </Link>
            ))}

        </div>
    )

}