const axios = require("axios");

module.exports = {
  Email: function (email) {
    const apiKey = "f17a068c505541138562bfc860be30c7";
    const apiUrl = `https://emailvalidation.abstractapi.com/v1/?api_key==${apiKey}&email=${email}`;
    //

    axios
      .get(apiUrl)
      .then((response) => {
        const isValid = response.data.is_valid;
        if (isValid) {
          console.log(`${email} is a valid email address.`);
        } else {
          console.log(`${email} is an invalid email address.`);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
  phone: async function (req, res, next) {
 
    const uaPhoneNumber = `972${req.body?.phone?.slice(1)}`;
    axios
      .get(
        `https://phonevalidation.abstractapi.com/v1/?api_key=e8c51abf2edf43f2ab415fada836721a&phone=${uaPhoneNumber}`
      )
      .then((response) => {
        console.log(response.data);
        req.validPhone = response.data.valid;
        next();
      })
      .catch((error) => {
        console.log(error);
      });
  },
//  Hdate: async (date) =>{
 
//  }

};
