
const request = require("supertest");

const app = require("../app.js");


/** POST /exchange - convert rate from data; return 
 `{
  "from": "USD",
  "to": "EUR",
  "amount": 1.05,
  "amount_exchanged": 0.93
}` */
const result = {
  "from": "USD",
  "to": "EUR",
  "amount": 1.05,
  "amount_exchanged": expect.any(Number)
}
describe("POST /exchange", function () {
  it("Converts rate", async function () {
    const resp = await request(app)
      .post(`/exchange`)
      .send({
        "from": "USD",
        "to": "EUR",
        "amount": 1.05
      });
    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual(result);
  });
});
// end
