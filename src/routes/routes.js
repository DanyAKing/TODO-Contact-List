const express = require('express');
const { database } = require('../data/database');

const router = express.Router();

router
  .post('/set', async (req, res) => {
    const { name, phoneNumber } = req.body;
    database.push({
      name,
      phoneNumber,
    });
    res.status(200).json(database);
  });

module.exports = { router };
