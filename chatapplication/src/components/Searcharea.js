import React from "react";
import "./searcharea.css";

const STYLES = "search-area";

export const Searcharea = ({ type, onClick, searchStyle }) => {
  const SearchStyle = STYLES.includes(searchStyle)
    ? searchStyle
    : STYLES[0];
  return (
    <div className="search-area-wrapper">
      <div
        className={`search-area ${SearchStyle}`}
        onClick={onClick}
        type={type}
        action="/url"
        method="GET"
      >
        <img className={"search-icon"} src="Group.png" alt="search-icon" />
        <input type="text" placeholder="Search..." />
      </div>
    </div>
  );
};

/* 
//COMPONENT IN JSX! DON'T FORGET TO IMPORT THE COMPONENT!
<div>
    <Searcharea onClick={() => {console.log("You clicked on me!")}}
    type="form"
    >
    </Searcharea>
</div>
*/
