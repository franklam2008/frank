import React, { useState, useEffect } from "react";
import movieIcon from "../assets/img/movieIcon.png";
import axios from "axios";
import LolChamp from "./LolChamp";
import { Row, Col, Spinner } from "react-bootstrap";
import "./css/Lol.css";
export default function LolApp() {
  const [champs, setChamps] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <section className="lolCon" >
      <div className="mainTitle">
        <img src={movieIcon} alt="League" />
        League of Legend
      </div>
      <button className="btn red" onClick={log}>Log Champs</button>
      <Row>
      {Object.keys(champs).map(champ => (
        <Col className="" xs={4} md={4} lg={2} key={champs[champ].key} >
          <LolChamp champ={champs[champ]} />
        </Col>
      ))}</Row>
    </section>
  );
}
