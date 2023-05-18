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
    const { name, email, phone, date } = req.body;
    userModule
      .create(req.body.name, req.body.email, req.body.phone)
      .then((name) => {
        res.status(200).send(name);
      })
      .catch((error) => {
        res.status(404).send({ error: error.message });
      });
  },

  getById: (req, res) => {
    try {
      let data = userModule.read().find(i => i.id = req.params.id);
      res.status(200).send(data);
    } catch (error) {
      res.status(404).send({ error: "not found this user" });
    }
  },
  update: (req, res) => {

      const { name, email, phone, date } = req.body;
      userModule
        .update(req.body.id,req.body.name, req.body.email, req.body.phone)
        .then((index) => {
          if (index != null)
            res.status(200).send(index.id + '  as update');
          else
            res.status(400).send('Nothing has been updated, the ID does not exist');
        })
        .catch((error) => {
          res.status(404).send({ error: error.message });
        });
      // } else res.status(500).send("invalid phone number");

  }
};