import React from "react";
import Img from "react-image";
import { Spinner } from "react-bootstrap";
import "./css/LolChamp.css";
export default function LolChamp({ champ, setModalShow, setSelectedChamp }) {
  return (
    <div className="lolChamp">
      <div className="frame" onClick={()=>{setModalShow(true);setSelectedChamp(champ.id)}}>
        <Img
          draggable={false}
          src={`http://ddragon.leagueoflegends.com/cdn/10.1.1/img/champion/${champ.id}.png`}
          loader={<Spinner size="sm" className="" animation="border" />}
          unloader={<p>Not Available</p>}
        />
      </div>

      <p>{champ.name}</p>
    </div>
  );
}
