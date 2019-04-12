import React from "react";
import Modal from "react-modal";
const option = props => (
  <Modal
    isOpen={!!props.selectedOption}
    contentLabel="Selected Option"
    onRequestClose={props.handleClearOptionModal}
  >
    <h3>Selected Option </h3>
    {props.selectedOption && <p>{props.selectedOption}</p>}
    <button onClick={props.handleClearOptionModal}>Okay</button>
  </Modal>
);

export default option;
