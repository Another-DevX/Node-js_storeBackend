const express = require('express');

const ProductsService = require('../services/products.service');

const validatorHandler = require('../middleware/validator.handler');
const {
  createProductsScheme,
  updateProductsScheme,
  getProductScheme,
} = require('../schemas/products.schema');


const router = express.Router();

const service = new ProductsService();


router.get('/', async (req, res) => {
  try {
    const products = await service.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(404).json({
      message: e.message,
    });
    console.error(e.message);
  }
});

router.get(
  '/:id',
  validatorHandler(getProductScheme, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (e) {
      next(e);
      // if (
      //   e.message === "Cannot read properties of undefined (reading 'length')"
      // ) {
      //   return res.status(404).json({
      //     message: 'Product not found',
      //   });
      // }
      // res.status(404).json({
      //   message: e.message,
      // });
      // console.error(e.message);
    }
  },
);

router.post('/', validatorHandler(createProductsScheme, 'body'),async (req, res, next) => {
  try {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({
      message: 'created',
      data: newProduct,
    });
  } catch (e) {
    next(e);
  }
});

router.patch('/:id', validatorHandler(getProductScheme, 'params'),  validatorHandler(updateProductsScheme, 'body'),async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
    console.error(e.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await service.delete(id);
    res.json(deleted);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
    console.error(e.message);
  }
});

module.exports = router;
