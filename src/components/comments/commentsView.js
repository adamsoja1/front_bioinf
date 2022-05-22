import { useState,useEffect } from "react";
import React from 'react';

function CommentsView(comment){              
   const comments = comment;
    return(
        <div>
                    <h2>Komentarze:</h2>
                    {comments.map(coment=>
                    (
                            <div key = {coment.id}>
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