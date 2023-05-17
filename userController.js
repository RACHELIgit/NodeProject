const userModule = require("./user");
const express = require("express");
// const router = express.Router();

module.exports = {
  getAll: (req, res) => {
    try {
      let data = userModule.read();
      res.status(200).send(data);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  create: (req, res) => {
    if (req.validPhone && req.validMail) {
      // 
      const { name, email, phone, date } = req.body;
      userModule
        .create(req.body.name, req.body.email, req.body.phone)
        .then((name) => {

          res.status(200).send(name);
        })
        .catch((error) => {
          res.status(404).send({ error: error.message });
        });
    }
    else {

      if (!req.validPhone) res.status(500).send("invalid phone number");
       if(!req.validMail) res. status(500).send("invalid phone number");
    }
  }
};

// // Create a new user
// router.post('/users', (req, res) => {
//   const user = userModule.create(req.body.name, req.body.email, req.body.phone);
//   res.json(user);
// });

// // Get all users
// router.get('/users', (req, res) => {
//   const users = userModule.read();
//   res.json(users);
// });

// // Get user by ID
// router.get('/users/:id', (req, res) => {
//   const user = userModule.readById(parseInt(req.params.id));
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).send('User not found');
//   }
// });

// // Update user by ID
// router.put('/users/:id', (req, res) => {
//   const user = userModule.update(parseInt(req.params.id), req.body.name, req.body.email, req.body.phone);
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).send('User not found');
//   }
// });

// // Delete user by ID
// router.delete('/users/:id', (req, res) => {
//   const deleted = userModule.delete(parseInt(req.params.id));
//   if (deleted) {
//     res.json({ message: 'User deleted successfully' });
//   } else {
//     res.status(404).send('User not found');
//   }
// });

// module.exports = router;
