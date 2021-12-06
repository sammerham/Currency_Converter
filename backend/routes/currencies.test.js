
const request = require("supertest");

const app = require("../app.js");


  const currencies = [
    { "name": "Euro", "symbol": "EUR" },
    { "name": "United States Dollar", "symbol": "USD" },
    { "name": "British Pound Sterling", "symbol": "GBP" },
    { "name": "Canadian Dollar", "symbol": "CAD" }
  ]

/** GET /currencies - returns
`[
    { "name": "Euro", "symbol": "EUR" },
    { "name": "United States Dollar", "symbol": "USD" },
    { "name": "British Pound Sterling", "symbol": "GBP" },
    { "name": "Canadian Dollar", "symbol": "CAD" }
  ]` */

describe("GET /currencies", function () {
  it("Gets a list of currencies", async function () {
    const resp = await request(app).get(`/currencies`);
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual(currencies  );
  });
});
// end
