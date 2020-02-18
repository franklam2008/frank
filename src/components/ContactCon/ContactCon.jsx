import React, { useState } from "react";
import "./css/ContactForm.css";
import { AiOutlineMessage } from "react-icons/ai";
import ContactSection from "./ContactSection.jsx";

export default function ContactCon() {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const handleClick = event => {
    setTarget(event.target);
    setShow(!show);
  };
  return (
    <>
      <div className="ContactBtn" onClick={handleClick}>
        <AiOutlineMessage />
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
