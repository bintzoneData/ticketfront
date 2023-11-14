const asycHandler = require('express-async-handler');
const Category = require('../models/categoryModel');
// @GET CATEGORY(GET)
// ROUTE api/categories
// access pulic
const getCategories = asycHandler(async (req, res) => {
  const data = await Category.find();
  res.status(200).json(data);
});

// @CREATE CATEGORY(POST)
// ROUTE api/items
// access pulic
const createCategory = asycHandler(async (req, res) => {
  const { category } = req.body;

  const data = await Category.create({
    category,
  });
  if (data) {
    res.status(200).json({
      category: data.category,
    });
  } else {
    res.status(400);
    throw new Error('Invailed Data');
  }
});

module.exports = {
  getCategories,
  createCategory,
};
