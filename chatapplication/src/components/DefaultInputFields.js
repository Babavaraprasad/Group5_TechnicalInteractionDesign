import React from 'react'
import './defaultinputfields.css';


const STYLES = "default--input"
    



export const DefaultInputFields = ({ 
    children, 
    type, 
    onClick, 
    inputFieldStyle, 
}) => {

    const checkInputFieldStyle = STYLES.includes(inputFieldStyle) ? inputFieldStyle : STYLES;

    return (
        
        <div className={`inputfield ${checkInputFieldStyle}`}onClick={onClick} type={type}>
            {children}
        </div>
    )
}

/* 
// COMPONENT IN JSX! DON'T FORGET TO IMPORT THE COMPONENT!

<div>
  <div>
  <DefaultInputFields onClick={() => {console.log("You clicked on me!")}}
    type="input"
    inputFieldStyle="default--input"
    >

    <div className='l-div'>

      <div className='label-div'>
        <label for="...">Name</label>
      </div>

      <div className='div-input'>
         <input className='input-input' type="text" placeholder='Name' />
      </div>
  </div>

  </DefaultInputFields>
  </div>
</div>


*/