import { Modal, Button } from "react-bootstrap";
import React from "react";
// import { Spinner, Row, Col } from "react-bootstrap";
// import Img from "react-image";

export default function LightBox({show, onHide}) {
  //if champ= [] case

  // console.log(champ);

  return (
    <Modal
      className=""
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
        
      
        <Modal.Body>
          
        </Modal.Body>
    
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
