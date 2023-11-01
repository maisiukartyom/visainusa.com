import { CLIENT_ID } from '../utils/config'
import React, { useState, useEffect } from "react" ;
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from '../api/axios';

const Checkout = () => {
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

    const initialOptions = {
        "client-id": CLIENT_ID, 
        "commit": true, 
    };

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
        }).then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    // check Approval
    // const onApprove = async (data, actions) => {
    //     const payment = actions.order.capture();
    //     console.log(payment);
    //     setSuccess(true);
    //     return actions.order.capture().then(async function (payment) {
    //         try{
    //             await axios.post("/checkout", 
                    // JSON.stringify({
                    //     paymentID: payment.id,
                    //     description: payment.purchase_units[0].description,
                    //     status: payment.status,
                    //     amount: payment.purchase_units[0].amount.value,
                    //     currency: payment.purchase_units[0].amount.currency_code,
                    //     createTime: payment.create_time,
                    //     updateTime: payment.update_time
                    // }),
                    // {
                    //     headers: { 'Content-Type': 'application/json' },
                    //     withCredentials: true
                    // }
    //             )
    //         }
    //         catch(err){
    //             console.log(err)
    //         }

    //         setSuccess(true);
    //     });
    // };
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (payment) {
            axios.post("/checkout", 
                JSON.stringify({
                    paymentID: payment.id,
                    description: payment.purchase_units[0].description,
                    status: payment.status,
                    amount: payment.purchase_units[0].amount.value,
                    currency: payment.purchase_units[0].amount.currency_code,
                    createTime: payment.create_time,
                    updateTime: payment.update_time
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }    
            ).then(() => setSuccess(true)).catch((err) => alert("Couldn't save transaction in the database!"))
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };

    useEffect(() => {
        if (success) {
            alert("Payment successful!!");
            console.log('Order successful . Your order id is--', orderID);
        }
    },[success]);

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