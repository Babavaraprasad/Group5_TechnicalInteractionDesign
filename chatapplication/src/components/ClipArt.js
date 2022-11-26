import React from 'react'
import './UserAvatar.css';

export const ClipArt = ({ 
   imgUrl
}) => {
    return (
         <div 
            className={"clipart"} 
                imgUrl={imgUrl}>
                <img src={`${imgUrl}`}/>
         </div>  
    )
}