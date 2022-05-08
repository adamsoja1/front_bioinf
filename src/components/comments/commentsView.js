import { useState,useEffect } from "react";
import React from 'react';

function CommentsView(params){

    const [post, setPost] = useState([]);
    
 

    useEffect(() => {
            fetch(`http://127.0.0.1:8000/api/posts/${params.post_id}/`)
            .then(res => res.json())
            .then((res)=> setPost(res))
           
          
        },[]);

    const comments = post.comments || {};
    return(
        <div>
                    <h2>Komentarze:</h2>
                    {Object.values(comments).map(coment=>
                    (
                            <div>
                                <h4>{coment.User}</h4>
                                <h6>{coment.content}</h6>
                                <p></p>
                            </div>
                    )

                                                )
                    }

        </div>
    )


}

export default CommentsView;