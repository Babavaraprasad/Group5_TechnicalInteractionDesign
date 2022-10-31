import React from 'react'
import './buttonwhite.css';


const STYLES = "btn--white--default--solid";

const SIZES = [
    "btn--white--width170--height60", 
    "btn--white--width230--height50", 
    "btn--white--width195--height50", 
    "btn--white--width120--height50", 
    "btn--white--width140--height40",
    "btn--white--width70--height40"
];



export const Buttonwhite = ({ 
    children, 
    type, 
    onClick, 
    buttonStyle, 
    buttonSize
}) => {

    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES;

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
    return (
        <div className='default-button-div'>
                <button className={`btnwhite ${checkButtonStyle} ${checkButtonSize}`}onClick={onClick} type={type}>
                    {children}
                </button>
        </div>

        
    )
}


/* 
COMPONENT IN JSX! DON'T FORGET TO IMPORT THE COMPONENT!

    <div>
        <Buttonwhite onClick={() => {console.log("You clicked on me!")}}
        type="button"
        buttonSize="btn--white--width195--height50"
        >
        Button</Buttonwhite>
     </div>

*/