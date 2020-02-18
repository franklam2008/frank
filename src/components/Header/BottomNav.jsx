import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import { MdDashboard } from "react-icons/md";
import { IoIosMenu } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import ContactSection from "../ContactCon/ContactSection.jsx";
import "./css/bottomNav.css";

export default function BottomNav({ setOpenCol, openCol }) {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const handleClick = event => {
    setTarget(event.target);
    setShow(!show);
  };
  return (
    <>
      <div className="bottomNav">
        <div
          className="bottomNavItem"
          onClick={() => {
            setOpenCol(!openCol);
          }}
        >
          <IoIosMenu />
          <div className="description">Menu</div>
        </div>

        <NavLink className="bottomNavItem" exact to="/">
          <MdDashboard />
          <div className="description">Dashboard</div>
        </NavLink>
        <div className="bottomNavItem" onClick={handleClick}>
          <AiOutlineMessage />
          <div className="description">Contact</div>
        </div>
      </div>
      <ContactSection
        target={target}
        show={show}
        setShow={setShow}
        setTarget={setTarget}
      />
    </>
  );
}
