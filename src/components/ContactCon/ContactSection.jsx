import React, { useRef } from "react";

import { FaTimes } from "react-icons/fa";
import PopoverForm from "../Forms/PopoverForm.jsx";
import { Popover, ButtonToolbar, Overlay } from "react-bootstrap";

export default function ContactSection({ target, show, setShow }) {
  const ref = useRef(null);
  return (
    <ButtonToolbar ref={ref}>
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
          <Popover.Title as="h3">Contact Us</Popover.Title>
          <Popover.Content>
            <PopoverForm />
          </Popover.Content>
        </Popover>
      </Overlay>
    </ButtonToolbar>
  );
}
