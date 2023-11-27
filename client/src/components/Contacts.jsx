import "../pages/Main/main.css";




const Contacts = () => {
    return (
        <>
  
  
            <div  class="contacts-map" >
  
              <iframe class="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.2171612892553!2d-80.03051992448948!3d32.91886027360458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88fe6396fc39530d%3A0xaee5adf21c554e33!2zNjY1MCBSaXZlcnMgQXZlLCBOb3J0aCBDaGFybGVzdG9uLCBTQyAyOTQwNiwg0KHQqNCQ!5e0!3m2!1sru!2sby!4v1699432124178!5m2!1sru!2sby"
               width="600" 
               allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  
  
                 <div className="cont">
  
    <div className="align">
                 <h4 class="contact-name" id="contact">Contacts</h4>
                  <div className="number-phone">
                 <img src="/images/number.png" alt="phone" width={20} height={20} />
                 <p class="number">+1 864 748 9898</p>
                                </div>
                                <div className="number-phone">
                 <img src="/images/mail.png" alt="phone" width={26} height={20} />
                 <a href="mailto:eb3unskilled@visainusa.com" class="number" >eb3unskilled@visainusa.com</a>
                                </div>
                                <br></br>
                 <div className="number-phone">
                 <img src="/images/home.png" alt="phone" width={30} height={20} />
                 <p class="number" >"Visa in USA" Limited Liability Company"
   6650 Rivers Ave Suite 105, North Charleston, South Carolina, 29406</p>
                                </div>
                                </div>
                                <div className="link-column">
                                <a href="https://web.telegram.org/k/#79168070961" target="_blank"><img className="link-margin" src="images/telegram.png" alt="telegram" width="38" height="38" /></a>
                          <a href="https://web.whatsapp.com/#79168070961" target="_blank"><img className="link-margin" src="images/whatsapp.png" alt="whatsapp" width="38" height="38" /></a>
                          </div>
                 </div>
              </div>
  <hr className="hr-contact"></hr>
        </>
    )
  }

  export default Contacts