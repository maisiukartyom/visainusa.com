//import { CLIENT_ID } from '../utils/config'
import React, { useEffect, useState } from "react" ;
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from '../api/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import SupportEngine from "./SupportEngine";
import {toast} from 'react-toastify'
import { PayPalButton } from 'react-paypal-button-v2';

const Payment = () => {
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(false);
    const {state} = useLocation();
    // const location = useLocation();

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
    })
    // const createOrder = (data, actions) => {
    //     return actions.order.create({
    //         purchase_units: [
    //             {
    //                 description: `Level ${level}`,
    //                 amount: {
    //                     currency_code: "USD",
    //                     value: purchaseAmount,
    //                 },
    //             },
    //         ],
    //         application_context: {
    //             shipping_preference: "NO_SHIPPING"
    //         }
    //     })
    // };

    // const onApprove = (data, actions) => {
    //     return actions.order.capture().then(function (payment) {
    //         axios.post("/checkout", 
    //             {
    //                 paymentID: payment.id,
    //                 description: payment.purchase_units[0].description,
    //                 status: payment.status,
    //                 amount: payment.purchase_units[0].amount.value,
    //                 currency: payment.purchase_units[0].amount.currency_code,
    //                 createTime: payment.create_time,
    //                 updateTime: payment.update_time,
    //                 purchasedLevel: level
    //             },
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 withCredentials: true
    //             }    
    //         ).then(() => {
    //             toast.success(`Level ${level} purchased successfully!`, {
    //                 position: "top-center",
    //                 autoClose: 6000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: false,
    //                 draggable: false,
    //                 progress: undefined,
    //                 theme: "light",
    //                 });
    //             console.log('Order successful . Your order id is--', payment.id);
    //             navigate("/levelone")
    //         }).catch((err) => toast.error(`Purchase failed!`, {
    //             position: "top-center",
    //             autoClose: 6000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: false,
    //             draggable: false,
    //             progress: undefined,
    //             theme: "light",
    //             }))
    //     });
    // };

    // //capture likely error
    // const onError = (data, actions) => {
    //     toast.error(`Purchase failed!`, {
    //         position: "top-center",
    //         autoClose: 6000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: false,
    //         draggable: false,
    //         progress: undefined,
    //         theme: "light",
    //         })
    // };

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
            console.log(err)
            toast.error("Couldn't create order!",{
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
        }).then((data) => {
            toast.success("Order created successful!",{
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
            return data.data.orderID;
        })
    }

    const onApprove = (data) => {
        return axios.post("/payment/paypal-transaction-complete", 
        {
            orderID: data.orderID
        },
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
        .then((res) => {
            return res;
        }).catch((details) => {
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
        <h2>Payment for LEVEL {state.levelToPurchase}</h2>
        <PayPalButton
            createOrder={createOrder}
            onApprove={onApprove}
        ></PayPalButton>
        <p><strong>If you experience trouble with payment from Russia or Belarus, you can ask your friends or relatives who have VISA/MASTERCARD to make payment on your behalf, we will accept such payments. <br/>Second option is to make payments to Sberbank account by phone number</strong></p>
        </div>

    );
}

export default Payment