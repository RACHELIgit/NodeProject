const axios = require("axios");

module.exports = {
  // Email: function (email) {
  //   const apiKey = "f17a068c505541138562bfc860be30c7";
  //   const apiUrl = `https://emailvalidation.abstractapi.com/v1/?api_key==${apiKey}&email=${email}`;
  //   //

  //   axios
  //     .get(apiUrl)
  //     .then((response) => {
  //       const isValid = response.data.is_valid;
  //       if (isValid) {
  //         console.log(`${email} is a valid email address.`);
  //       } else {
  //         console.log(`${email} is an invalid email address.`);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // },
  phone: async function (req, res, next) {
 
    const uaPhoneNumber = `972${req.body?.phone?.slice(1)}`;
    axios
      .get(
        `https://phonevalidation.abstractapi.com/v1/?api_key=e8c51abf2edf43f2ab415fada836721a&phone=${uaPhoneNumber}`
      )
      .then((response) => {
        console.log(response.data);
       if(response.data.valid)
        next();
        else
        res.status(500).send("invalid phone number");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  ,
  email: async function (req, res, next) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))
      {
        req.validMail = true;
        next();     
       }
        else
        res. status(500).send("invalid email adresss");
}
};
