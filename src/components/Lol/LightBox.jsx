import { Modal, Button } from "react-bootstrap";
import React from "react";
import { Spinner } from "react-bootstrap";
import Img from "react-image";

export default function LightBox(props) {
  const { champ, onHide } = props;
  let champObj = [];
  for (var i in champ) {
    champObj = champ[i];
  }
  // console.log("champObj", champObj);
  if (champObj.length < 1) {
    return <></>;
  }

  return (
    <Modal
      className="capitalize LolChampLightBox"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>{champObj.name}</Modal.Header>
      <Modal.Body>
        <Img
          draggable={false}
          src={`http://ddragon.leagueoflegends.com/cdn/10.1.1/img/champion/${champObj.id}.png`}
          loader={<Spinner size="sm" className="" animation="border" />}
          unloader={<p>Not Available</p>}
        />
        <div>{champObj.title}</div>
        <div>
          {champObj.spells.map(spell => (
            <div key={spell.name}>
              {spell.name}
              {spell.description}
            </div>
          ))}
        </div>
        <div>
          {champObj.tags.map(tag => (
            <div key={tag}>{tag}</div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
