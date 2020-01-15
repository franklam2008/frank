import { Modal, Button } from "react-bootstrap";
import React from "react";
import { Spinner, Col, Row } from "react-bootstrap";

export default function PokemonLightBox(props) {
  if (!props.loaded) return <Spinner className="" animation="grow" />;

  const imgUrl =
    "https://pokeres.bastionbot.org/images/pokemon/" +
    props.pokemon.id +
    ".png";

  return (
    <Modal
      className="capitalize lightBox"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        #{props.pokemon.id} - {props.pokemon.name}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="container-fluid">
          <Row>
            <Col lg={4}>
              {" "}
              <div className="typeDiv">
                {props.pokemon.types.map(x => (
                  <span className={x.type.name} key={x.type.name}>
                    {x.type.name}
                  </span>
                ))}
              </div>
              <div className="specs">
                Weight: {(props.pokemon.weight / 10).toFixed(1)}{" "}
                <span className="nonCapitalize">kg</span>
              </div>
              <div className="specs">
                height: {(props.pokemon.height / 10).toFixed(1)}{" "}
                <span className="nonCapitalize">m</span>
              </div>
              <div className="abilityTitle">
                {" "}
                <span>Ability</span>
              </div>
              <div className="abilityDiv">
                {props.pokemon.abilities.map(x => (
                  <div key={x.ability.name}>{x.ability.name}</div>
                ))}
              </div>{" "}
            </Col>
            <Col className="text-center" lg={8}>
              <img src={imgUrl} alt={props.pokemon.name} />{" "}
            </Col>
          </Row>
        </div>
        <div className="statsCon">
          {props.pokemon.stats.map(stats => (
            <div className="stat" key={stats.stat.name}>
              <div className="statName">
                {stats.stat.name}: {stats.base_stat}
              </div>
              <div className="statBar">
                <div
                  className="statWidth"
                  style={{ width: (stats.base_stat / 252) * 100 + "%" }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="dark" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
