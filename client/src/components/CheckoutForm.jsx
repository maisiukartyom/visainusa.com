import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'


export const CheckoutForm = ({secret, level}) => {

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const intentStatus = async () => {
        if (!stripe) {
            return;
          }
      
          const clientSecret = secret
      
          if (!clientSecret) {
            return;
          }
    }
    intentStatus()
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
      redirect: "if_required"
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error){
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
    }
    else if (paymentIntent && paymentIntent.status === "succeeded") {
        try{
            await axios.post("/payment/success", {level},
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            switch (level){
                case 1:
                    navigate("/levelone")
                    break
                case 2:
                    navigate("/leveltwo")
                    break
                case 3:
                    navigate("/levelthree")
                    break
                case 4:
                    navigate("/levelfour")
                    break
                case 5:
                    navigate("levelfive")
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
        }
        catch(err){
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
        }
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

    return(    
        <form className="paymentForm" id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <button className="paymentButton" disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                </span>
            </button>
        </form>
    )
}