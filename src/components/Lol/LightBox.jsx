import { Modal, Button } from "react-bootstrap";
import React from "react";
import { Spinner } from "react-bootstrap";
import Img from "react-image";

export default function LightBox({ champ, onHide, show, lightBoxData }) {
  //if champ= [] case
  if (champ.length < 1) {
    return <></>;
  }
  console.log(champ);

  return (
    <Modal
      className="capitalize LolChampLightBox"
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>{champ.name}</Modal.Header>
      {!lightBoxData ? (
        <div className="loadingScreen">
          <Spinner size="lg" className="" animation="border" />
          <p>Loading...</p>
        </div>
      ) : (
        <Modal.Body>
          <Img
            draggable={false}
            src={`https://ddragon.leagueoflegends.com/cdn/10.1.1/img/champion/${champ.id}.png`}
            loader={<Spinner size="sm" className="" animation="border" />}
            unloader={<p>Not Available</p>}
          />
          <div className="champTitle">{champ.title}</div>
          <div className="champSpells">
            {champ.spells.map(spell => (
              <div key={spell.name}>
                {spell.name}
                <br />
                <Img
                  draggable={false}
                  src={`https://ddragon.leagueoflegends.com/cdn/10.1.1/img/spell/${spell.id}.png`}
                  loader={<Spinner size="sm" className="" animation="border" />}
                  unloader={<p>Not Available</p>}
                />

                {spell.description}
              </div>
            ))}
          </div>
          <div className="champTag">
            {champ.tags.map(tag => (
              <div key={tag}>{tag}</div>
            ))}
          </div>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
