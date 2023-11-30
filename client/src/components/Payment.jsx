//import { CLIENT_ID } from '../utils/config'
import React, { useEffect, useState } from "react" ;
import axios from '../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import SupportEngine from "./SupportEngine";
import {toast} from 'react-toastify'
import { PayPalButton } from 'react-paypal-button-v2';
import styled from 'styled-components';
import  "../components/Payment/Payment.css"

const ButtonBack = styled.button`
  background-color: #032144;
  color: white; 
  padding: 10px 20px; 
  font-size: 16px; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer;

  &:hover {
    background-color: #244B7A; 
  }

  position: absolute;
  top: 20px;
  left: 20px;
`;

const Payment = () => {
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(false);
    const {state} = useLocation();


    useEffect(() => {
        async function verifyCookie(requiredLevel) {
            try{
                const user = await axios.post("auth/verify",
                {
                    requiredLevel: requiredLevel
                },
                {
                    withCredentials: true
                })

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

        verifyCookie(0)
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
            setIsVerified(true)
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


    return (
        isVerified &&
        <div>
            <ButtonBack onClick={() => navigate(-1)}>Back</ButtonBack>
            <h2>Payment for LEVEL {state.levelToPurchase}. You are ready to pay ${state.price}!</h2>
            <PayPalButton
                createOrder={createOrder}
                onApprove={onApprove}
            ></PayPalButton>
            <p><strong>If you experience trouble with payment from Russia or Belarus, you can ask your friends or relatives who have VISA/MASTERCARD to make payment on your behalf, we will accept such payments. <br/>Second option is to make payments to Sberbank account by phone number</strong></p>
        </div>

    );
}

export default Payment