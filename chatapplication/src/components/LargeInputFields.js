import React from "react";
import "./largeinputfields.css";

const STYLES = "large--input--field--area";

export const LargeInputFields = ({
  type,
  onClick,
  largeStyle,
  labelText,
  placeholder,
}) => {
  const checkLargeStyle = STYLES.includes(largeStyle) ? largeStyle : STYLES;

  return (
    <div
      className={`largeinputfield ${checkLargeStyle}`}
      onClick={onClick}
      type={type}
    >
      
        <div className="large-label-div">
          <label for="...">{labelText}</label>
        </div>

        <div className="large-input">
          <textarea
            className="large-input-fields-textarea"
            name="inputfield"
            rows="8"
            cols="50"
            placeholder={placeholder}
          ></textarea>
        </div>
      </div>
    
  );
};

/*
//COMPOINENT IN JSX! DON'T FORGET TO IMPORT THE COMPONENT.

<LargeInputFields labelText={'egg'} placeholder={'egg'}></LargeInputFields>

*/
