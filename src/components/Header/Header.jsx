import React, { useState } from "react";
import UserLogin from "./UserLogin/UserLogin.jsx";
import { NavLink } from "react-router-dom";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
//css & icon & Img
import { GiGlassBall } from "react-icons/gi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import {
  MdLocalMovies,
  MdFormatListBulleted,
  MdDashboard
} from "react-icons/md";
import "./css/header.css";
import reactImg from "../assets/img/react.png";

export default function Header({ openCol, setOpenCol }) {
  const [spinOnce, setSpinOnce] = useState(false);
  return (
    <ul className="nav flex-column">
      <li>
          <div onClick={() => setOpenCol(!openCol)}>
            <img
              className={
                spinOnce
                  ? "spin-it-once  nav-item menuMainIcon"
                  : "menuMainIcon nav-item"
              }
              src={reactImg}
              draggable={false}
              alt="react"
              onClick={() => spin_once()}
            />
            {openCol && (
              <span className={!openCol ? "hide" : undefined}>Close</span>
            )}
          </div>

        {[
          {
            name: "Dashboard",
            icon: MdDashboard,
            link: "/home"
          },
          {
            name: "Pokemon",
            icon: GiGlassBall,
            link: "/Pokemon"
          },
          {
            name: "Movie",
            icon: MdLocalMovies,
            link: "/MovieList"
          },
          {
            name: "Todo",
            icon: MdFormatListBulleted,
            link: "/Todo"
          },
          {
            name: "About",
            icon: AiOutlineQuestionCircle,
            link: "/about"
          }
        ].map(item => (
          <OverlayTrigger
            key={item.name}
            placement={"right"}
            overlay={<Tooltip>{item.name}</Tooltip>}
          >
            <NavLink
              className="nav-link nav-item"
              activeClassName="activeLink"
              to={item.link}
            >
              <div className="menuItem">
                {React.createElement(item.icon)}
                <span className={!openCol ? "hide" : undefined}>
                  {openCol && item.name}
                </span>
              </div>
            </NavLink>
          </OverlayTrigger>
        ))}
      </li>
      <li>
        <UserLogin openCol={openCol} />
      </li>
    </ul>
  );
  function spin_once() {
    //spin items
    setSpinOnce(true);
    setTimeout(function() {
      setSpinOnce(false);
    }, 750);

    // setSpinOnce(false)
    // this.classList.remove("spin-it-once");

    // void this.offsetWidth;
    // this.classList.add("spin-it-once");
  }
}
