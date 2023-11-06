//import { CLIENT_ID } from '../utils/config'
import React, { useEffect } from "react" ;
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from '../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import SupportEngine from "./SupportEngine";
import {toast} from 'react-toastify'

const Checkout = () => {
    const navigate = useNavigate()
    const location = useLocation();

    const initialOptions = {
        "client-id": process.env.REACT_APP_CLIENT_ID, 
        "commit": true, 
        "enable-funding": "card"
    };

    let purchaseAmount = 0;
    const level = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    if (level === "leveltwo"){
        purchaseAmount = 50;
    }
    else if (level === "levelthree"){
        purchaseAmount = 100;
    }

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
                navigate("/login")
            }
        }

        verifyCookie(0)
    })

    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: `Level ${level}`,
                    amount: {
                        currency_code: "USD",
                        value: purchaseAmount,
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
                    purchasedLevel: level
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }    
            ).then(() => {
                toast.success(`Level ${level} purchased successfully!`, {
                    position: "top-center",
                    autoClose: 6000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    });
                console.log('Order successful . Your order id is--', payment.id);
                navigate("/levelone")
            }).catch((err) => toast.error(`Purchase failed!`, {
                position: "top-center",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                }))
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        alert("There's been an error!");
    };

    return (
        <>
            <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                />
            </PayPalScriptProvider>
        </>
    );
}

export default Checkout