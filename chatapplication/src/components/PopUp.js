import React, { useState } from "react";
import "./PopUp.css";

function PopUp(props) {
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
          <div onClick={toggleModal} className="popup--overlay"></div>
          <div className="modal-content">
          
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
export default PopUp;