import React from 'react';
import {useState,useEffect} from 'react';



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
                <h6>{tag.tagi}</h6>
            ))}

        </div>
    )

}