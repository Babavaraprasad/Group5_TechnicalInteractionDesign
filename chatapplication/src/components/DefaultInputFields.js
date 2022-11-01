import React from "react";
import "./defaultinputfields.css";

const STYLES = "default--input";

export const DefaultInputFields = ({
  type,
  onClick,
  inputFieldStyle,
  labelText,
  placeholder,
}) => {
  const checkInputFieldStyle = STYLES.includes(inputFieldStyle)
    ? inputFieldStyle
    : STYLES;

  return (
    <div
      className={`inputfield ${checkInputFieldStyle}`}
      onClick={onClick}
      type={type}
    >
      <div className="label-div">
        <label for="">{labelText}</label>
      </div>

      <div className="div-input">
        <input className="input-input" type="text" placeholder={placeholder} />
      </div>
    </div>
  );
};

/* 
// COMPONENT IN JSX! DON'T FORGET TO IMPORT THE COMPONENT!

<DefaultInputFields labelText={'egg'} placeholder={'egg'}></DefaultInputFields>

*/
