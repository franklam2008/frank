import React, { useState, useEffect } from "react";
import PokemonLightBox from "./LightBox.jsx";
import axios from "axios";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";
import Img from "react-image";
export default function PokemonList({ pokemon }) {
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [targetId, setTargetId] = useState('6');

  const [modalShow, setModalShow] = useState(false);
  const [lightBoxDataLoaded, setLightBoxDataLoaded] = useState(false);
  const [detailClicked, setDetailClicked] = useState(false);
 
  
  useEffect(() => {
    var targetUrl = "https://pokeapi.co/api/v2/pokemon/" + targetId;
    axios.get(targetUrl).then(res => {
      setSelectedPokemon(res.data);
      setLightBoxDataLoaded("true");
    });
  }, [targetId,detailClicked]);

  return (
    <div className="container-fluid">
      <Row>
        {pokemon.map(pokemon => (
          <Col className="mb-3" xs={12} lg={2} key={pokemon.name}>
            <Card>
              <Card.Header className="capitalize">
                {pokemon.name}
                <span className=""> - #{pokemon.id}</span>
              </Card.Header>
              <div className="imgCon">
                <Img
                  className=" w-50"
                  src={pokemon.imageUrlClear}
                  loader={<Spinner className="" size="sm" animation="border" />}
                />
              </div>

              <Card.Body>
                <div className="text-center">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    block
                    onClick={() => {
                      setModalShow(true);
                      setTargetId(pokemon.id);
                      setDetailClicked(true);
                    }}
                  >
                    Detail
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {detailClicked ? (
        <PokemonLightBox
          show={modalShow}
          onHide={() => {setModalShow(false); setLightBoxDataLoaded(false)}
            }
          pokemon={selectedPokemon}
          loaded={lightBoxDataLoaded}
        />
      ) : null}
    </div>
  );
}
