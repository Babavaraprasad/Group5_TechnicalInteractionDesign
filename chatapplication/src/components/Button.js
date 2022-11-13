import React from "react";
import "./button.css";

//Button style refers to the color of the button
//Button size refers to the width and height of the button
const STYLES = [
  "btn--default", 
  "btn--white"];
const SIZES = [
  "btn--width170--height60",
  "btn--width230--height50",
  "btn--width195--height50",
  "btn--width120--height50",
  "btn--width140--height40",
  "btn--width70--height40",
];
//It is not a wrapper. This pattern(children prop) allows you to put other children inside(i.e images)
export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) 
    ? buttonSize 
    : SIZES[0];
  return (
    <div className="default-button-wrapper">
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </div>
  );
};

/*
//COMPONENT IN JSX! DON'T FORGET TO IMPORT THE COMPONENT!
    <Button onClick={() => {console.log("You clicked on me!")}}
    type="button"
    buttonSize="btn--width120--height50" 
    buttonStyle={"btn--white" or "btn--default"}>
    Button</Button>
*/
