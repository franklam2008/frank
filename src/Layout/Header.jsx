import React from "react";
import { NavLink } from "react-router-dom";
import { Tooltip, Button, OverlayTrigger } from "react-bootstrap";
import firebaseApp from "../firebase/base"

//css & icon
import { GiGlassBall } from "react-icons/gi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { MdLocalMovies, MdFormatListBulleted } from "react-icons/md";
import "./css/header.css";
import reactImg from "../assets/img/react.png";



export default function Header() {
  return (
    <ul className="nav flex-column align-items-center">
      <li>
        <NavLink className="nav-link nav-item" to="/">
          <OverlayTrigger
            placement="right"
            overlay={<Tooltip className="hide">Home</Tooltip>}
          >
            <img
              className="menuMainIcon nav-item "
              src={reactImg}
              alt="react"
            />
          </OverlayTrigger>
        </NavLink>
        {[
          {
            name: "Pokemon",
            icon: GiGlassBall,
            link: "/Pokemon",
            variant: "success"
          },
          {
            name: "Movie List",
            icon: MdLocalMovies,
            link: "/MovieList",
            variant: "success"
          },
          {
            name: "Todo",
            icon: MdFormatListBulleted,
            link: "/Todo",
            variant: "success"
          },
          {
            name: "About",
            icon: AiOutlineQuestionCircle,
            link: "/about",
            variant: "info"
          }
        ].map(item => (
          <OverlayTrigger
            key={item.name}
            placement={"right"}
            // delay={{ show: 0, hide: 400 }}
            overlay={<Tooltip>{item.name}</Tooltip>}
          >
            <NavLink
              className="nav-link nav-item"
              activeClassName="activeLink"
              to={item.link}
            >
              <Button size="lg" variant="link">
                {React.createElement(item.icon)}
              </Button>
            </NavLink>
          </OverlayTrigger>
        ))}
      </li>
      <li>
        <OverlayTrigger
          placement="right"
          overlay={<Tooltip>Sign Up/ Sign In</Tooltip>}
        >
          <div className="signUp-btn">
            <a>
              <div onClick={ ()=> {console.log('123');firebaseApp.auth().signOut()}}>
                <FaUserAlt />
              </div>
            </a>
          </div>
        </OverlayTrigger>
      </li>
    </ul>
  );
}
