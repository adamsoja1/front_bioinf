import React from 'react';
import {useState,useEffect} from 'react';
import './tag.css'
import { Link } from 'react-router-dom';

export default function Tag(params){


    const [tags,setTags] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false)


    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/tags/post/${params.id}`)
        .then(result=>result.json())
        .then((result)=>setTags(result))
        .catch((error)=>{
            setIsLoaded(false)
        })
        .then(setIsLoaded(true))

    },[]);


    return(
        <div>
            <div className='tag-box'>

                {tags.map(tag=>(

                   
                                <div className = 'tag'>
                                    <Link to ={`/${tag.tagi}/posts`}>
                                    <span class="tag tag-cloud-functions tag-lg">{tag.tagi}</span>
                                    </Link>
                                </div>
                    
                ))}

            </div>
        </div>
    )

}