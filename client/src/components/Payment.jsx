//import { CLIENT_ID } from '../utils/config'
import React, { useEffect, useState } from "react" ;
import axios from '../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import { PayPalButton } from 'react-paypal-button-v2';
import styled from 'styled-components';
import "./Payment/Payment.css";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm } from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE);

const ButtonBack = styled.button`
  background-color: #032144;
  color: white; 
  padding: 10px 10px; 
  font-size: 16px; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer;
  font-size:12px;

  &:hover {
    background-color: #244B7A; 
  }

  position: absolute;
  top: 12px;
  left: 12px;
`;

const Payment = () => {
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const {state} = useLocation();


    useEffect(() => {
        async function createIntent(requiredLevel){
            try{
                const res = await axios.post("/payment/create-payment-intent",
                {
                    level: requiredLevel
                },
                {
                    withCredentials: true
                });
                setClientSecret(res.data.clientSecret)
            }
            catch(err){
                toast.error("Couldn't create payment intent!",{
                    position: "top-center",
                    autoClose: 6000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    }    
                )
                navigate(-1);
            }
        }
        async function verifyCookie(requiredLevel) {
            try{
                const user = await axios.post("auth/verify",
                {
                    requiredLevel: requiredLevel
                },
                {
                    withCredentials: true
                })
                setIsVerified(true)
            }
            catch(err){
                toast.error("You are not authorized!",{
                        position: "top-center",
                        autoClose: 6000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: false,
                        progress: undefined,
                        theme: "light",
                        }
                )
                setIsVerified(false)
                navigate("/login")
            }
        }

        verifyCookie(0);
        window.scrollTo(0, 0);
        if (!state){
            setIsVerified(false)
            navigate("/");
            toast.error("No current payment process!",{
                position: "top-center",
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                }
            )

        }
        else{
            setIsVerified(true);
            createIntent(state.levelToPurchase);
        }
    }, [])

    const createOrder = () => {
        return axios.post("/payment", 
        {
            level: state.levelToPurchase
        },
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then((res) => {return res})
        .catch((err) => {
            let errorMessage = "";
            if (!err?.response) {
                errorMessage = 'No Server Response'
            } else if (err.response?.status === 401) {
                errorMessage = 'You already have this level!'
            }
            else if (err.response?.status === 403) {
               errorMessage = 'You are not authorized! Please sign up to make purchase!'
            } 
            else if (err.response?.status === 500){
                errorMessage = "Couldn't create order!"
            }
            else if (err.response?.status === 405){
                errorMessage = "Admin can't pay!"
            }
   
            toast.error(errorMessage, {
               position: "top-center",
               autoClose: 10000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: false,
               progress: undefined,
               theme: "light"}
            ) 
        }).then((data) => {
            return data.data.orderID;
        })
    }

    const onApprove = (data) => {
        return axios.post("/payment/paypal-transaction-complete", 
        {
            orderID: data.orderID,
            level: state.levelToPurchase
        },
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
        .then((res) => {
            return res;
        }).catch((error) => {
            console.log(error?.response)
            toast.error("Payment failed!",{
                position: "top-center",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                }
            )   
        }).then((details) => {
            const { result } = details.data;
            // const { id, payer, purchase_units } = result;
            // const transactionId = purchase_units[0].payments.captures[0].id;
            // const transactionDate =
            //     purchase_units[0].payments.captures[0].create_time;
            // const name = payer.name.given_name + payer.name.surname;
            // const email = payer.email_address;
            // const address = payer.address.country_code;
            // const transactionAmount =
            //     purchase_units[0].payments.captures[0].amount.value;
            
            switch (state.levelToPurchase){
                case 1:
                    navigate("/levelone")
                    break
                case 2:
                    navigate("/leveltwo")
                    break
                case 3:
                    navigate("/levelthree")
                    break
                default:
            }

            toast.success("Payment successful!",{
                position: "top-center",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                }
            ) 
            // return history.push({
            //     pathname: `/success/${purchase_units[0].payments.captures[0].id}`,
            //     state: {
            //     transactionDate: transactionDate,
            //     transactionId: transactionId,
            //     name: name,
            //     email: email,
            //     address: address,
            //     transactionAmount: transactionAmount,
            //     },
            // });
        })
    }

    const appearance = {
        theme: 'stripe',
      };

      const options = {
        clientSecret,
        appearance,
      };


    return (
        isVerified &&
        <div className="pay">
        <div className="payment-center">
            <ButtonBack className="back-btn" onClick={() => navigate(-1)}>Back</ButtonBack>
            <h2 className="pay-level">Payment for LEVEL {state.levelToPurchase}. You are ready to pay ${state.price}!</h2>
            <div className="btn-pay">

                <PayPalButton className="paypal-button"
                    createOrder={createOrder}
                    onApprove={onApprove}
                ></PayPalButton>


            </div>
            {        clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm secret={clientSecret} level={state.levelToPurchase} />
                </Elements>
            )}
                        <div className="checkpay">
                        <div className="border-pay">
            
                <div className="mainpay"><p className="pay-name">Recipient Bank:  Bank of America
                <p>Address:  N.A.,222 Broadway, New York, NY, 10038</p>
                <p>Currency:  U.S. dollar</p>
                Purpose of the payment:  Consulting service</p>
                </div>
                <div className="check-choose">
                    <div className="padding-pay">
                <p className="check-infoone"><p ><strong>for payment OUTSIDE of the U.S.  </strong></p>
                <hr></hr>
                <p><strong>Account Number:</strong>  2230 3175 3873</p>
                <p ><strong>Routing Number(ABA):</strong>  053 904 483</p>
                <p ><strong>Wire Routing Number (ABA):</strong>  026 009 593</p>
                <p ><strong>SWIFT Code:</strong> BOFAUS3N</p>
                <p ><strong>Address:</strong>  521 Laxton Rd, Greer, SC, USA, 29651</p>
                <p ><strong>Phone: </strong>  +1 864 748 9898</p>
                <p ><strong>Name: </strong> Elena IVANOVA</p></p>

                </div>
                <div className="padding-pay">
                <p className="check-infotwo"><p><strong>for payment INSIDE of the U.S.  </strong></p>
                <hr></hr>
                <p><strong>Account Number:</strong>  2230 3175 3873</p>
                <p ><strong>Routing Number(ABA):</strong>  053 904 483</p>
                <p ><strong>Title on Account:</strong>  VISA IN USA LIMITED LIABILITY COMPANY</p>
                <p ><strong>Address:</strong> 521 Laxton Rd, Greer, SC, USA, 29651</p>
                <p ><strong>Phone:</strong>  +1 864 748 9898</p>
                <p ><strong>Name: </strong>  Elena IVANOVA</p></p>

                </div>
                </div>
                </div>
                            </div>
                                        <div className="pay-text">
                            <p className="text-pay"><strong>If you experience trouble with payment from Russia or Belarus, you can ask your friends or relatives who have VISA/MASTERCARD to make payment on your behalf, we will accept such payments. <br/>Second option is to make payments to Sberbank account by phone number</strong></p>
                        </div>
                        </div>
                        </div>

        
    );
}

export default Payment