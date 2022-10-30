import React, { useState } from "react";
import "./PopUp.css";

export default function Modal() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <div className>
      <button onClick={toggleModal} className="btn-modal">
        Open🚀 
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>PopUp</h2>
            <p> You can add your own components</p>
            <button className="close-modal" onClick={toggleModal}>❌</button>
          </div>
        </div>
      )}
    </div>
  );
}