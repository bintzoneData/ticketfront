const asycHandler = require('express-async-handler');
const Item = require('../models/itemModel');
// @GET ITEMS(POST)
// ROUTE api/items
// access pulic
const getItems = asycHandler(async (req, res) => {
  const data = await Item.find(req.query);
  res.status(200).json(data);
});
// @GET ITEM (POST)
// ROUTE api/items
// access pulic
const getItem = asycHandler(async (req, res) => {
  const { code } = req.body;
  res.status(200).json({ message: 'get item' });
});
// @GET ITEM (POST)
// ROUTE api/items
// access pulic
const createItem = asycHandler(async (req, res) => {
  const { code, description, category } = req.body;
  if (!code || !category) {
    res.status(400);
    throw new Error('please add code and category');
  }
  const item = await Item.create({
    code,
    description,
    category,
  });
  if (item) {
    res.status(200).json({
      code: item.code,
      description: item.description,
      category: item.category,
    });
  } else {
    res.status(400);
    throw new Error('Invailed Data');
  }
});
module.exports = {
  getItems,
  getItem,
  createItem,
};
