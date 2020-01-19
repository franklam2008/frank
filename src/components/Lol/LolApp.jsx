import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Row, Col, Spinner, Button } from "react-bootstrap";

//Component
import LolChamp from "./LolChamp";
import LightBox from "./LightBox.jsx";
//css
import "./css/Lol.css";
import lol from "../assets/img/lol.png";
import { IoIosSearch } from "react-icons/io";

export default function LolApp() {
  const [champs, setChamps] = useState([]);
  const searchInput = useRef();

  const [filteredChamps, setFilteredChamps] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  //lightBox
  const [lightBoxData, setLightBoxData] = useState(true);
  const [selectedChamp, setSelectedChamp] = useState(null);
  const [selectedChampObj, setSelectedChampObj] = useState([]);
  const url =
    "https://ddragon.leagueoflegends.com/cdn/10.1.1/data/en_US/champion.json";

  //All Champ fetch
  useEffect(() => {
    axios.get(url).then(response => {
      setChamps(response.data.data);
      setFilteredChamps(response.data.data);
    });
    setLoading(false);
  }, []);

  //selected Champ fetch
  useEffect(() => {
    if (selectedChamp !== null) {
      const url =
        "https://ddragon.leagueoflegends.com/cdn/10.1.1/data/en_US/champion/" +
        selectedChamp +
        ".json";
      axios.get(url).then(response => {
        // setSelectedChampObj(response.data.data);
        for (var i in response.data.data) {
          // champObj = response.data.data[i];
          setSelectedChampObj(response.data.data[i]);
        }
      });
    }
    setLightBoxData(true);
  }, [selectedChamp]);

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
      <Row className="mb-3">
        <Col className=" text-center" lg={2}>
          <Button className="logBtn" onClick={log}>
            Log Champs
          </Button>
        </Col>
        <Col className=" text-center" lg={{ span: "4", offset: "2" }}>
          <div className="searchBar">
            <IoIosSearch />
            <input
              type="text"
              placeholder="Search by name"
              className="searchBarInput"
              ref={searchInput}
              onChange={handleInput}
            />
          </div>
        </Col>
      </Row>

      <Row className="lolContent">
        {Object.keys(filteredChamps).map(champ => (
          <Col xs={4} md={4} lg={2} xl={1} key={champs[champ].key}>
            <LolChamp
              champ={champs[champ]}
              setModalShow={setModalShow}
              setSelectedChamp={setSelectedChamp}
            />
          </Col>
        ))}
      </Row>
      <LightBox
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setLightBoxData(false);
        }}
        champ={selectedChampObj}
        lightBoxData={lightBoxData}
      />
    </section>
  );
  function log() {
    console.log("champs", champs);
    console.log("filteredChamps", filteredChamps);
    console.log("selectedChamp", selectedChamp);
    console.log("selectedChampObj", selectedChampObj);
    console.log("lightBoxData", lightBoxData);
    console.log("modalShow", modalShow);

    // setModalShow(true);

    
  }
  function handleInput(e) {
    // setSearch(true);
    filterChamps(e.target.value);
  }
  function filterChamps(value) {
    const filteredChamps = Object.keys(champs)
      .filter(key => key.toLowerCase().indexOf(value.toLowerCase()) !== -1)
      //combine
      .reduce((obj, key) => {
        obj[key] = champs[key];
        return obj;
      }, {});
    setFilteredChamps(filteredChamps);

  }
  function sortChamps(){

  }
}
