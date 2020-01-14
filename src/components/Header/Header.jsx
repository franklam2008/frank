import React ,{useState} from "react";
import UserLogin from "./UserLogin/UserLogin.jsx";
import { NavLink } from "react-router-dom";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
//css & icon & Img
import { GiGlassBall } from "react-icons/gi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
import { MdLocalMovies, MdFormatListBulleted } from "react-icons/md";
import "./css/header.css";
import reactImg from "../assets/img/react.png";

export default function Header({ openCol, setOpenCol }) {
  const[spinOnce, setSpinOnce]= useState(false)
  return (
    <ul className="nav flex-column">
      <li>
        <NavLink className="nav-link nav-item" to="/">
          <OverlayTrigger placement="right" overlay={<Tooltip>Home</Tooltip>}>
            <div>
              <img
                className={spinOnce?"spin-it-once menuMainIcon nav-item":"menuMainIcon nav-item"}
                src={reactImg}draggable={false}
                alt="react"
                onClick ={()=>setSpinOnce(!spinOnce)}
              />
              {openCol && (
                <span className={!openCol ? "hide" : undefined}>Home</span>
              )}
            </div>
          </OverlayTrigger>
        </NavLink>

        <div
          className="menuItem"
          onClick={() => {
            setOpenCol(!openCol);
            
          }}
        >
          {!openCol ? <TiArrowRightOutline /> : <TiArrowLeftOutline />}
          {openCol && (
            <span className={!openCol ? "hide" : undefined}>Close</span>
          )}
        </div>
        {[
          {
            name: "Pokemon",
            icon: GiGlassBall,
            link: "/Pokemon",
            variant: "success"
          },
          {
            name: "Movie",
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
    this.classList.remove("spin-it-once");
    
    void this.offsetWidth;
    this.classList.add("spin-it-once");
  }
}
