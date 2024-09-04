const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// Create Company
router.post('/', async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).send(company);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read Companies
router.get('/', async (req, res) => {
  try {
    const companies = await Company.find();
    res.send(companies);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update Company
router.put('/:id', async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!company) {
      return res.status(404).send();
    }
    res.send(company);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete Company
router.delete('/:id', async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).send();
    }
    res.send(company);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
