import React, { useState, useEffect,useRef } from "react";
import lol from "../assets/img/lol.png";
import axios from "axios";
import LolChamp from "./LolChamp";
import { Row, Col, Spinner, Button, Form } from "react-bootstrap";
import "./css/Lol.css";
export default function LolApp() {
  const [champs, setChamps] = useState([]);
  const [loading, setLoading] = useState(true);
const selectSort = useRef()
  const url =
    "https://ddragon.leagueoflegends.com/cdn/10.1.1/data/en_US/champion.json";

  useEffect(() => {
    axios.get(url).then(response => {
      setChamps(response.data.data);
    });
    setLoading(false);
  }, []);
  function log() {
    console.log(champs);
  }
  if (loading)
    return (
      <div className="loadingScreen">
        <Spinner size="lg" className="" animation="border" />
        <p>Loading...</p>
      </div>
    );
  return (
    <section className="lolCon">
      <div className="mainTitle">
        <img src={lol} alt="League" />
        League of Legend
      </div>
      <Button onClick={log}>Log Champs</Button>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Example select</Form.Label>
        <Form.Control as="select" ref={selectSort}>
          <option>Name</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>
      </Form.Group>
      <Row>
        {Object.keys(champs).map(champ => (
          <Col className="" xs={4} md={4} lg={2} key={champs[champ].key}>
            <LolChamp champ={champs[champ]} />
          </Col>
        ))}
      </Row>
    </section>
  );
}
