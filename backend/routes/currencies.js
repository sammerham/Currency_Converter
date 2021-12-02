'use strict'
const express = require("express");
const axios = require("axios");
const router = express.Router();
const URL = 'https://data.fixer.io/api/';
const ACCESS_KEY = '95f535137405845706c72acdb194efb8';
const BASE_CURRENCIES = ['EUR', 'USD', 'GBP', 'CAD'];

/* GET
[
    { "name": "Euro", "symbol": "EUR" },
    { "name": "United States Dollar", "symbol": "USD" },
    { "name": "British Pound Sterling", "symbol": "GBP" },
    { "name": "Canadian Dollar", "symbol": "CAD" }
  ] */

router.get("/", async (req, res, next) => {
  try {
    const response = await axios.get(`${URL}symbols?access_key=${ACCESS_KEY}`);
    const { symbols } = response.data;
    const currencies = BASE_CURRENCIES.map(curr => ({ name: symbols[curr], symbol: curr }));
    res.status(200).json(currencies);
  }
  catch (err) {
    next(err);
  }
})
module.exports = router;
