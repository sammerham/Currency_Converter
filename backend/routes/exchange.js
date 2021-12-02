'use strict'
const express = require("express");
const axios = require("axios");
const router = express.Router();
const URL = 'https://data.fixer.io/api/';
const ACCESS_KEY = process.env.API_KEY;

// POST 
/* {
  "from": "USD",
  "to": "EUR",
  "amount": 1.05
} */

/* response:
{
  "from": "USD",
  "to": "EUR",
  "amount": 1.05,
  "amount_exchanged": 0.93
} */

router.post("/", async (req, res, next) => {
  const { to, from, amount } = req.body;
  try {
    const response = await axios.get(
      `${URL}convert?access_key=${ACCESS_KEY}&from=${from}&to=${to}&amount=${amount}`
    );
    const { query, result } = response.data;
    const data = { ...query, amount_exchanged: result };
    return res.status(200).json(data);
      
  }
  catch (err) {
    next(err);
  }
})
module.exports = router;
