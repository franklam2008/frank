import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import "./css/userLogin.css";
import "./css/userBtn.css";
import UserLightBox from "./UserLightBox.jsx";
import { useStore } from "../Firebase/FirebaseStore.jsx";

export default function UserLogin({ openCol }) {
  const { state } = useStore();
  const [lightBoxShow, setLightBoxShow] = useState(false);

  return (
    <section className="userLoginCon">
      <OverlayTrigger
        placement="right"
        overlay={
          state.login ? (
            <Tooltip>{state.authUser.displayName||"No UserName"}</Tooltip>
          ) : (
            <Tooltip>Sign Up/ Sign In</Tooltip>
          )
        }
      >
        <div
          className="signUpBtnCon"
          onClick={() => {
            setLightBoxShow(true);
          }}
        >
          <div className="signUp-btn">
            <div>
              <FaUserAlt />
            </div>
          </div>
          {openCol && (
            <span className={!openCol ? "hide" : undefined}>Account</span>
          )}
        </div>
      </OverlayTrigger>

      <UserLightBox
        className="userLoginCon"
        show={lightBoxShow}
        onHide={() => {
          setLightBoxShow(false);
        }}
      />
    </section>
  );
}
