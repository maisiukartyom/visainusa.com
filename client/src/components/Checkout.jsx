import { CLIENT_ID } from '../utils/config'
import React, { useState, useEffect } from "react" ;
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const {clearAuthentication} = useAuth();
    const navigate = useNavigate()

    const initialOptions = {
        "client-id": CLIENT_ID, 
        "commit": true, 
        "enable-funding": "card"
    };

    useEffect(() => {
        const verifyCookie = async (level) => {
          try{
            await axios.post("auth/verify",
                {
                    requiredLevel: level
                },
                {
                    withCredentials: true
                })
          }
          catch (err){
            navigate("/login")
          }
        }

        verifyCookie(3)
      })

    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "Level 1",
                    amount: {
                        currency_code: "USD",
                        value: 10,
                    },
                },
            ],
            application_context: {
                shipping_preference: "NO_SHIPPING"
            }
        })
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (payment) {
            axios.post("/checkout", 
                {
                    paymentID: payment.id,
                    description: payment.purchase_units[0].description,
                    status: payment.status,
                    amount: payment.purchase_units[0].amount.value,
                    currency: payment.purchase_units[0].amount.currency_code,
                    createTime: payment.create_time,
                    updateTime: payment.update_time,
                    purchasedLevel: 3
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }    
            ).then(() => {
                alert("Payment successful!!");
                console.log('Order successful . Your order id is--', payment.id);
                navigate("/login")
            }).catch((err) => alert("Couldn't save transaction in the database!"))
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        alert("There's been an error!");
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
            />
        </PayPalScriptProvider>
    );
}

export default Checkout