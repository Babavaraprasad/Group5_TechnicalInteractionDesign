import "./AcademicSkill.css";
import React, { useState }  from "react";

export const AcademicSkill = ({ skillName, skillRating }) => {
  return (
    <div className='skill'>
      <p className='skill--title'>{skillName}</p>
      {starDisplay(skillRating)}
    </div>
  );
};

function starDisplay(skillRating){
    let content = [];

    for(let i = 0; i < 5; i++){
        if(Number(skillRating) > i){
            content.push(<p className="star">&#9733;</p>);
        } else {
            content.push(<p className="star">&#9734;</p>);
        }
    }

    return <span>{content}</span>;
}


/*
//COMPONENT IN JSX! DON'T FORGET TO IMPORT THE COMPONENT!

import {AcademicSkill} from '../components/AcademicSkill'
    <div>
        <AcademicSkill skillName="Python" skillRating="3"> 
        </AcademicSkill>
    </div>
*/
