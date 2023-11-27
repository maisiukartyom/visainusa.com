import {PopupButton} from 'react-calendly';
import './calendly.css'

const calendlyButtonStyle = {
  background: '#ffffff', 
  position: "fixed", 
  color: "#244B7A",
  fontFamily: "sans-serif",
  textAlign: "center",
  borderRadius: "12px",
  width: "auto",
  height: "45px",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: "15px",
  padding: "0 30px",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "14px",
  border: "4px #244B7A solid"
}


const Calendly = ({userEmail, userName}) => {
    return(
      <PopupButton
        url="https://calendly.com/eb3unskilled/eb3unskilled"
        rootElement={document.getElementById("root")}
        text='Schedule the call here!'
        styles={calendlyButtonStyle}
        prefill={{email: userEmail, name: userName}}
      />
    )
}

export default Calendly