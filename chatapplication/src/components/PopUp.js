import React, { useState } from "react";
import "./PopUp.css";
import {Button} from "./Button.js";


function PopUp(props) {
  //Usestate - using "setModal" to change the state of "modal"
  const [modal, setModal] = useState(false);
  
  //function on the popup 
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
  <>
      <Button onClick={toggleModal} className="btn-modal"
            type="button"
            buttonSize="btn--width120--height50">Register
      </Button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="popup--overlay"></div>
          <div className="modal-content">
            <h2>Register</h2>
            <p> You have been registered succesfully.<br />
            Please Login to continue <br />

            </p>
            <button className="close-modal" onClick={toggleModal}>❌</button>
          
          </div>
        </div>
      )}
  </>
  )
}
export default PopUp;