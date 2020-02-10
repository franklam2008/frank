import React from "react";
import { Modal, Button, Spinner, Row, Col } from "react-bootstrap";
import Img from "react-image";
import "./css/LolLightBox.css";
import { IoMdArrowForward } from "react-icons/io";

export default function LightBox({ champ, onHide, show, lightBoxData }) {
  //if champ= [] case
  if (champ.length < 1) {
    return <></>;
  }
  return (
    <Modal
      className="LolChampLightBox"
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <div className="champTitle">
          {champ.name}
          <a
            className="guide"
            href={`https://champion.gg/champion/${champ.name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Guide<IoMdArrowForward/>
          </a>
        </div>
      </Modal.Header>
      {!lightBoxData ? (
        <div className="loadingScreen">
          <Spinner size="lg" className="" animation="border" />
          <p>Loading...</p>
        </div>
      ) : (
        <Modal.Body>
          <Row className="mb-4 pr-3">
            <Col lg={3} className="lolIconCon">
              {/* icon */}
              <Img
                draggable={false}
                src={`https://ddragon.leagueoflegends.com/cdn/10.1.1/img/champion/${champ.id}.png`}
                loader={<Spinner size="sm" className="" animation="border" />}
                unloader={<p>Not Available</p>}
              />
              <div>{champ.title}</div>
            </Col>
            {/* tag */}
            <Col lg={9}>
              <div className="mb-2">
                {champ.tags.map(tag => (
                  <span className={tag + " champTag"} key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
              {/* info */}
              {Object.keys(champ.info).map(item => (
                <div className="champInfo" key={item}>
                  {item}: <span>{champ.info[item]}</span>
                  <div className="statBar">
                    <div
                      className="statWidth"
                      style={{ width: (champ.info[item] / 10) * 100 + "%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
          {/* Spells */}
          <div className="champSpells">
            {champ.spells.map(spell => (
              <div className="spellIconCol" key={spell.id}>
                <hr className="hr-text" data-content={spell.name} />

                <Row>
                  <Col lg={2}>
                    <div className="spellIconCon">
                      <Img
                        draggable={false}
                        src={`https://ddragon.leagueoflegends.com/cdn/10.1.1/img/spell/${spell.id}.png`}
                        loader={<Spinner size="sm" animation="border" />}
                        unloader={<p>Not Available</p>}
                      />
                    </div>
                    {/* <div>{spell.name}</div> */}
                  </Col>
                  <Col lg={10}>
                    <div className="spellDescriptionCon">
                      {/* {spell.description} */}

                      <div
                        dangerouslySetInnerHTML={{ __html: spell.description }}
                      />
                    </div>
                  </Col>
                </Row>
              </div>
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
