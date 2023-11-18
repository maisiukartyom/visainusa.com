import {PopupButton} from 'react-calendly';
import './calendly.css'

const calendlyButtonStyle = {
  background: '#244b7a', 
  position: "fixed", 
  color: "#ffffff",
  fontFamily: "sans-serif",
  textAlign: "center",
  borderRadius: "25px",
  width: "auto",
  height: "45px",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: "15px",
  padding: "0 30px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "14px",
  border: "none"
}


const Calendly = ({userEmail, userName}) => {
    return(
      <PopupButton
        url="https://calendly.com/artyom-majsyuk/30min"
        rootElement={document.getElementById("root")}
        text='Schedule the call here!'
        styles={calendlyButtonStyle}
        prefill={{email: userEmail, name: userName}}
      />
    )
}

export default Calendly