import React from "react";
import gear from "../assets/img/gear.svg";

export default function LoadingPage({loading}) {
  if(!loading){
    return <></>
  }
  return (
    <div className="loadingPage">
      <div>
        <img src={gear} alt="Kiwi standing on oval"></img>
      </div>
    </div>
  );
}

