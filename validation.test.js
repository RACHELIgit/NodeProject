const axios = require("axios");
const validation = require("./validation");
const phoneValidation = validation.phone;
jest.mock("axios");

describe("phoneValidation", () => {
  test("calls next for a valid phone number", async () => {
    const req = { body: { phone: "+1234567890" } };
    const res = { status: jest.fn(), send: jest.fn() };
    const data = { valid: true, international_format: "+1 234-567-890" };
    axios.get.mockResolvedValue({ data });
    const next = jest.fn();
    await phoneValidation(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });
  test("sends an error for an invalid phone number", async () => {
   const req = { body: { phone: "09876" } };
   const res = { status: jest.fn(), send: jest.fn() };
    const error = new Error("Request failed with status code 400");
    axios.get.mockRejectedValue(error);
    const next = jest.fn();
    await phoneValidation(req, res, next);
    expect(next).not.toHaveBeenCalled();
     expect(res.status).toHaveBeenCalledWith(500);
     expect(res.send).toHaveBeenCalledWith("invalid phone number");
  });


});
