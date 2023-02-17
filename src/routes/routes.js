const express = require('express');
let { database } = require('../data/database');

const router = express.Router();

router
  .post('/set', async (req, res) => {
    const { name, phoneNumber } = req.body;
    database.push({
      name,
      phoneNumber,
    });
    res.status(200).json(database);
  })
  .get('/send', async (req, res) => {
    res.status(200).json(database);
  })
  .post('/remove', async (req, res) => {
    const { buttonIndex } = req.body;
    database = database.filter((element, index) => index !== buttonIndex);
    res.status(200).json(database);
  });

module.exports = { router };
