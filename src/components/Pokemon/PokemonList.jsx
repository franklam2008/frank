import React, { useState, useEffect } from "react";
import PokemonLightBox from "./LightBox.jsx";
import axios from "axios";
import { Row, Col, Card, Spinner } from "react-bootstrap";
import Img from "react-image";
export default function PokemonList({ pokemon }) {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [targetId, setTargetId] = useState("6");

  const [modalShow, setModalShow] = useState(false);
  const [lightBoxDataLoaded, setLightBoxDataLoaded] = useState(false);
  const [detailClicked, setDetailClicked] = useState(false);

  useEffect(() => {
    var targetUrl = "https://pokeapi.co/api/v2/pokemon/" + targetId;
    axios.get(targetUrl).then(res => {
      setSelectedPokemon(res.data);
      setLightBoxDataLoaded("true");
    });
  }, [targetId, detailClicked]);

  return (
    <section className="container-fluid">
      <Row>
        {pokemon.map(pokemon => (
          <Col className="" xs={4} md={4} lg={2} key={pokemon.name}>
            <Card>
              {/* <Card.Header className="capitalize">
                {pokemon.name}
                <span className=""> - #{pokemon.id}</span>
              </Card.Header> */}
              <div
                className="imgCon"
                onClick={() => {
                  setModalShow(true);
                  setTargetId(pokemon.id);
                  setDetailClicked(true);
                }}
              >
                <Img
                  src={pokemon.imageUrlClear}
                  draggable={false}
                  loader={<Spinner className="" size="sm" animation="border" />}
                />
              </div>
              <div className="pokeName capitalize">{pokemon.name}</div>
            </Card>
          </Col>
        ))}
      </Row>
      {detailClicked ? (
        <PokemonLightBox
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            setLightBoxDataLoaded(false);
          }}
          pokemon={selectedPokemon}
          loaded={lightBoxDataLoaded}
        />
      ) : null}
    </section>
  );
}
