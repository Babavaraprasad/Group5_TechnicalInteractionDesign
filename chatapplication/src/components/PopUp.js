import React, { useState } from "react";
import "./PopUp.css";

export default function Modal() {
  //Usestate - using "setModal" to change the state of "modal"
  const [modal, setModal] = useState(false);
  
  //function on the popup 
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
  <>
      <button onClick={toggleModal} className="btn-modal"> Open🚀</button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Hello Group 5</h2>
            <p> You can add your own components <br />
            Hello Again <br />
            Goodbye

            </p>
            <button className="close-modal" onClick={toggleModal}>❌</button>
          </div>
        </div>
      )}
  </>
  )
}