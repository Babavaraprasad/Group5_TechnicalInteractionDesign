import React from 'react'
import './largeinputfields.css';

const STYLES =  "large--input--field--area";

export const LargeInputFields = ({ 
    children, 
    type, 
    onClick, 
    largeStyle, 
}) => {

    const checkLargeStyle = STYLES.includes(largeStyle) ? largeStyle : STYLES;

    return (
        
        <div className={`largeinputfield ${checkLargeStyle}`}onClick={onClick} type={type}>
            {children}
        </div>
    )
}


/*
//COMPOINENT IN JSX! DON'T FORGET TO IMPORT THE COMPONENT.

<div>
    <div>
      <LargeInputFields onClick={() => {console.log("You clicked on me!")}}
        type="text-area"
        formStyle="large--input--field--area"
        >

        <div className='large-l-div'>

          <div className='large-label-div'>
          <label for="...">Name</label>
          </div>

          <div className='large-input'>
              <textarea className='large-input-fields-textarea' name="inputfield" rows="8" cols="50" placeholder='Name'></textarea>
          </div>

        </div>
        </LargeInputFields>
    </div>
  </div>

*/