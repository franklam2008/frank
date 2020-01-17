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
  const [champsArr, setchampArr] = useState([]);
  const [search, setSearch] = useState(false);

  const [filteredChamps, setFilteredChamps] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchInput = useRef();
  //lightBox
  const [lightBoxLoading, setLightBoxLoading] = useState(true);
  const [selectedChamp, setSelectedChamp] = useState(null);
  const [selectedChampObj, setSelectedChampObj] = useState([]);
  const url =
    "https://ddragon.leagueoflegends.com/cdn/10.1.1/data/en_US/champion.json";

  useEffect(() => {
    axios.get(url).then(response => {
      setChamps(response.data.data);
      for (var i in response.data.data) {
        champsArr.push(response.data.data[i]);
      }

    });
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (selectedChamp !== null) {
      const url =
        "http://ddragon.leagueoflegends.com/cdn/10.1.1/data/en_US/champion/" +
        selectedChamp +
        ".json";

      axios.get(url).then(response => {
        setSelectedChampObj(response.data.data);
      });
    }

    setLightBoxLoading(false);
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

      {search ? (
        <Row className="lolContent">
          {filteredChamps.map(champ => {
            return (
              <Col xs={4} md={4} lg={2} xl={1} key={champ.key}>
                <LolChamp
                  champ={champ}
                  setModalShow={setModalShow}
                  setSelectedChamp={setSelectedChamp}
                />
              </Col>
            );
          })}
        </Row>
      ) : (
        <Row className="lolContent">
          {Object.keys(champs).map(champ => (
            <Col xs={4} md={4} lg={2} xl={1} key={champs[champ].key}>
              <LolChamp
                champ={champs[champ]}
                setModalShow={setModalShow}
                setSelectedChamp={setSelectedChamp}
              />
            </Col>
          ))}
        </Row>
      )}
      {!lightBoxLoading ? (
        <LightBox
          show={modalShow}
          onHide={() => {
            setModalShow(false);
            // setLightBoxDataLoaded(false);
          }}
          champ={selectedChampObj}
        />
      ) : null}
    </section>
  );
  function log() {
    console.log("champsArr", champsArr);
    console.log("champs", champs);
    console.log("filteredChamps", filteredChamps);
    console.log("selectedChamp", selectedChamp);
    console.log("selectedChampObj", selectedChampObj);
  }
  function handleInput(e) {
    setSearch(true);
    const { value } = e.target;
    const filteredChamps = champsArr.filter(champ => {
      let champName = champ.name.toLowerCase();
      return champName.indexOf(value.toLowerCase()) !== -1;
    });
    setFilteredChamps(filteredChamps);
  }
}
