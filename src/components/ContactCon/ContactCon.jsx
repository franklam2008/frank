import React,{useState} from "react";
import "./css/ContactForm.css";
import { AiOutlineMessage } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import PopoverForm from "./PopoverForm.jsx";

import { OverlayTrigger, Popover } from "react-bootstrap";
export default function ContactCon() {
  const [closeForm, setCloseForm] = useState(false);
  return (
    <div className="ContactCon">
      <OverlayTrigger
        trigger="click"
        key="top"
        placement="top"
        onHide={closeForm}
        overlay={
          <Popover id="contact-form">
              <FaTimes onClick={()=>{setCloseForm(true)}}/>

            <Popover.Title as="h3">

              Contact Form
            </Popover.Title>
            <Popover.Content>
              <PopoverForm />
            </Popover.Content>
          </Popover>
        }
      >
        <div className="ContactBtn">
          <AiOutlineMessage />
        </div>
      </OverlayTrigger>
    </div>
  );
}
