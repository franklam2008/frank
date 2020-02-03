import React, { useState } from "react";
import UserLogin from "../UserLogin/UserLogin.jsx";
import { NavLink } from "react-router-dom";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
//css & icon & Img
import { GiGlassBall, GiCrossedSwords } from "react-icons/gi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import {
  MdLocalMovies,
  MdFormatListBulleted,
  MdHeadset,
  MdDashboard
} from "react-icons/md";
import "./css/header.css";

export default function Header({ openCol, setOpenCol }) {
  const [spinOnce, setSpinOnce] = useState(false);
  return (
    <ul className="nav flex-column">
      <li>
        <div
          className="menuIconCon"
          onClick={() => {
            setOpenCol(!openCol);
            spin_once();
          }}
        >
          {/* <IoIosMenu /> */}
          <div id="menuWrapper">
            <div  className={openCol?"close circle icon":"circle icon"}>
              <span className="line top"></span>
              <span className="line middle"></span>
              <span className="line bottom"></span>
            </div>
          </div>
          <div
            id={spinOnce ? "menuCircle" : " "}
            className={spinOnce ? "spin-it-once menuCircle" : "menuCircle"}
          >
            
          </div>
        </div>

        {[
          {
            name: "Dashboard",
            icon: MdDashboard,
            link: "/"
          },
          {
            name: "Movie",
            icon: MdLocalMovies,
            link: "movieList"
          },
          {
            name: "Pokemon",
            icon: GiGlassBall,
            link: "pokemon"
          },
          {
            name: "League",
            icon: GiCrossedSwords,
            link: "lol"
          },

          {
            name: "Todo",
            icon: MdFormatListBulleted,
            link: "todo"
          },

          {
            name: "Media",
            icon: MdHeadset,
            link: "media"
          },
          {
            name: "About",
            icon: AiOutlineQuestionCircle,
            link: "about"
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
              exact
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
    }, 950);
  }
}
