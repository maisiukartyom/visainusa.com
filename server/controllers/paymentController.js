const Payment = require('../model/Payment');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const paypal = require('@paypal/checkout-server-sdk')

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_SECRET_KEY;
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);


const handlePayment = async (req, res) => {

    const level = req.level

    try {
      let priceTotal;
      switch (level){
        case 1:
          priceTotal = 25;
          break;
        case 2:
          priceTotal = 50;
          break;
        case 3:
          priceTotal = 1000;
          break;
      }

      const finalSum = priceTotal;

      // Call PayPal to set up a transaction. Create a request object and set parameters
      let request = new paypal.orders.OrdersCreateRequest();
      request.prefer("return=representation");
      request.requestBody({
          intent: "CAPTURE",
          application_context: {
              landing_page: "BILLING",
              shipping_preference: "NO_SHIPPING",
              user_action: "PAY_NOW",
          },
          purchase_units: [{
              description: `Payment for level ${level}`,
              soft_descriptor: "Visa In USA",
              amount: {
                  currency_code: "USD",
                  value: finalSum, // 
                  breakdown: {
                      item_total: {
                          currency_code: "USD",
                          value: priceTotal,
                      }
                  }
              },
              items: [{name: `Level ${level}`, quantity: 1, unit_amount: {currency_code: "USD", value: priceTotal}}], 
          }],
      });

      // your client gets a response with the order id
      const response = await client.execute(request);
      console.log(`Response: ${JSON.stringify(response)}`);
      const orderID = response.result.id;
      console.log(`Order:    ${JSON.stringify(response.result)}`);
      const resJson = {
          orderID
      };
      res.json(resJson);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
}

const handlePaypalTransactionComplete = async (req, res) => {
    const orderID = req.body.orderID;
    const {level} = req.body
    const token = req.cookies.jwt;

    const request = new paypal.orders.OrdersCaptureRequest(orderID);
    request.requestBody({});
    try {
        const capture = await client.execute(request);
        console.log(`Response: ${JSON.stringify(capture)}`);
        console.log(`Capture: ${JSON.stringify(capture.result)}`);
        const result = capture.result;
        const resJson = {
            result
        };

        jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET,
          async (err, data) => {
              if (err) {
                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
                return res.sendStatus(403);
              }
              const email = data.email;
    
              try{
                const user = await User.findOneAndUpdate({email: email}, {level: level})
    
                const accessToken = jwt.sign(
                  { 
                      "email": email,
                      "isAdmin": user.isAdmin,
                      "level": level
                   },
                  process.env.ACCESS_TOKEN_SECRET,
                  { expiresIn: '1d' }
                );
                res.cookie('jwt', accessToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }).json(resJson);;
              }
              catch{
                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
                res.sendStatus(403);
              }
          }
        );
        // return capture.result;
    } catch (err) {
        // Handle any errors from the call
        console.error(err);
        res.sendStatus(500);
    }
}

const handleLevel1 = async (req, res) => {

    const token = req.cookies.jwt;
    let email = "";
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, data) => {
          if (err) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.sendStatus(403);
          }
          email = data.email;

          if (data.level >= 1){
            return res.sendStatus(401)
          }

          try{
            const result = await User.findOneAndUpdate({email: email}, {level: 1})

            const accessToken = jwt.sign(
              { 
                  "email": email,
                  "isAdmin": result.isAdmin,
                  "level": 1
               },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '1d' }
            );
            res.cookie('jwt', accessToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
            res.sendStatus(200);
          }
          catch{
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            res.sendStatus(403);
          }
      }
    );
}

const handleVerify = async (req, res) => {
    const token = req.cookies.jwt;
    const {level} = req.body;

    jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, data) => {
        if (err) {
          res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
          return res.sendStatus(403);
        }

        const user = await User.findOne({email: data.email})
            if (user) {
              if (data.level >= level){
                return res.sendStatus(401)
              }
                else{
                    return res.sendStatus(200)
                }
            }
            else{
                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
                return res.sendStatus(403);
            } 
    }
  );
}

module.exports = {handlePayment, handleLevel1, handleVerify, handlePaypalTransactionComplete}