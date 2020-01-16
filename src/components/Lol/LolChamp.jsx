import React from "react";
import Img from "react-image";
import {  Spinner } from "react-bootstrap";

export default function LolChamp({ champ }) {
  return (
    <div className="lolChamp">   
    <div className="frame">
        <Img
        variant="top"
        src={`http://ddragon.leagueoflegends.com/cdn/10.1.1/img/champion/${champ.id}.png`}
        loader={<Spinner size="sm" className="" animation="border" />}
        unloader={<p>Not Available</p>}
      />
        </div>   
      
      <p>{champ.name}</p>
      <p>{champ.title}</p>
    </div>
  );
}
