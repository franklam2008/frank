import React,{useState} from "react";
import "./css/ContactBtn.css";
import { AiOutlineMessage } from "react-icons/ai";
import ContactLightBox from "./ContactLightBox.jsx";

export default function ContactBtn() {
    const [modalShow, setModalShow] = useState(true);

  return (
    <div className="ContactBtnCon" >
      <AiOutlineMessage onClick={()=>{setModalShow(true)}}/>
      <ContactLightBox
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          // setLightBoxData(false);
        }}
        // champ={selectedChampObj}
        // lightBoxData={lightBoxData}
      />
    </div>
  );
}
