import React from 'react'
import './button.css';


const STYLES = "btn--default--solid";

const SIZES = [
    "btn--width170--height60", 
    "btn--width230--height50", 
    "btn--width195--height50", 
    "btn--width120--height50", 
    "btn--width140--height40",
    "btn--width70--height40"
];



export const Button = ({ 
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
                <button className={`btn ${checkButtonStyle} ${checkButtonSize}`}onClick={onClick} type={type}>
                    {children}
                </button>
        </div>

        
    )
}


/*
//COMPONENT IN JSX! DON'T FORGET TO IMPORT THE COMPONENT!

<div className='App'>
    <Button onClick={() => {console.log("You clicked on me!")}}
    type="button"
    buttonSize="btn--width120--height50"
    >
    Button</Button>
</div>


*/