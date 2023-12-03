const Payment = require('../model/Payment');
const User = require('../model/User');
const Level = require('../model/Level')
const jwt = require('jsonwebtoken');
const paypal = require('@paypal/checkout-server-sdk');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_SECRET_KEY;
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

const updateLevels = async (req, res) => {
  try{
    const levels = req.body.levels;
    for (const updatedLevel of levels){
      const filter = {levelNumber: updatedLevel.levelNumber}

      await Level.updateOne(filter, updatedLevel);
    }

    res.sendStatus(200);
  }
  catch(err){
    res.sendStatus(403);
  }
}

const getLevelCost = async (req, res) => {
  try{
    const level = req.body.level;
    const currLevel = await Level.findOne({levelNumber: level});

    res.json({cost: currLevel.cost, originalCost: currLevel.originalCost});
  }
  catch(err){
    res.sendStatus(403);
  }
}

const getLevelsCosts = async (req, res) => {
  try{
    const levels = await Level.find();

    res.json({levels: levels});
  }
  catch{
    res.sendStatus(403);
  }
}


const handlePayment = async (req, res) => {

    const level = req.level

    try {
      const currLevel = await Level.findOne({levelNumber: level});
      const priceTotal = currLevel.cost;

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

                // IF LEVEL >= 3 SOMEHOW NOTIFY ALEXEY!
                
                await Payment.create({
                  paymentID: result.purchase_units[0].payments.captures[0].id,
                  status: result.status,
                  buyerEmail: email,
                  description: `Level ${level}`,
                  createTime: result.purchase_units[0].payments.captures[0].create_time,
                  updateTime: result.purchase_units[0].payments.captures[0].update_time,
                  amount: result.purchase_units[0].payments.captures[0].amount.value,
                  currency: result.purchase_units[0].payments.captures[0].amount.currency_code,
                })

                res.cookie('jwt', accessToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 }).json(resJson);
              }
              catch (err){
                console.log(err)
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

const handleGetTransactions = async (req, res) => {
  const transactions = await Payment.find();
  if (!transactions) return res.status(204).json({ 'message': 'No payments found' });
  res.json(transactions);
}

const createIntent = async (req, res) => {
  try{
    const token = req.cookies.jwt;
    const level = req.body.level;
    const currLevel = await Level.findOne({levelNumber: level});
    const priceTotal = currLevel.cost * 100;

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
            const user = await User.findOne({email})

            if (user){
              const paymentIntent = await stripe.paymentIntents.create({
                amount: priceTotal,
                currency: "usd",
                automatic_payment_methods: {
                  enabled: true,
                },
                description: `Level ${level} purchase`
              });
  
              res.json({ clientSecret: paymentIntent.client_secret, email })
            }
            else{
              res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
              res.status(500)
            }
          }
          catch (err){
            console.log(err)
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            res.status(500).json({ error: err.message });
          }
      }
    );
  }
  catch(err){
    console.log(err)
    res.status(500).json({ error: err.message });
  }
}

const success = async (req, res) => {
  try{
    const level = req.body.level;
    const token = req.cookies.jwt;

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
            const user = await User.findOneAndUpdate({email}, {level})

            const accessToken = jwt.sign(
              { 
                  "email": email,
                  "isAdmin": user.isAdmin,
                  "level": level
               },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '1d' }
            );

            res.cookie('jwt', accessToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

            res.sendStatus(200)
          }
          catch (err){
            console.log(err)
            res.status(500).json({ error: err.message });
          }
      }
    );
  }
  catch(err){
    console.log(err)
    res.status(500).json({ error: err.message });
  }
}

module.exports = {handlePayment, handleVerify, 
  handlePaypalTransactionComplete, 
  handleGetTransactions, getLevelCost,
  getLevelsCosts, updateLevels, createIntent, success}