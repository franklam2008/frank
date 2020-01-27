import React, { useState, useRef } from "react";
import "./css/ContactForm.css";
import { AiOutlineMessage } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import PopoverForm from "./PopoverForm.jsx";

import { Popover, ButtonToolbar, Overlay } from "react-bootstrap";
export default function ContactCon() {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const handleClick = event => {
    setTarget(event.target);
    setShow(!show);
  };
  return (
    <ButtonToolbar ref={ref}>
      <div className="ContactBtn" onClick={handleClick}>
        <AiOutlineMessage />
      </div>
      <Overlay
        show={show}
        target={target}
        onHide={() => {
          setShow(false);
        }}
        rootClose
        placement="top"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="contact-form">
          <FaTimes
            onClick={() => {
              setShow(false);
            }}
          />
          <Popover.Title as="h3">Contact Form</Popover.Title>
          <Popover.Content>
            <PopoverForm />
          </Popover.Content>
        </Popover>
      </Overlay>
    </ButtonToolbar>
  );
}
