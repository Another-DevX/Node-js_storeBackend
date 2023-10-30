const faker = require('faker');
const boom = require('@hapi/boom');

const pool = require('../lib/postgres.pool'); 

class ProductServices {
  constructor() {
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const { name, price, image } = data;
    const newProduct = {
      id: faker.datatype.uuid(),
      name,
      price,
      image,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  async find() {
    const query = 'SELECT * FROM tasks';
    const response = await this.pool.query(query);
    return response.rows;
  }
  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (typeof product === 'undefined')
      throw new boom.notFound('Product not found');
    if(product.isBlock) throw new boom.conflict('Product is block');
    return product;
  }
  async update(id, data) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('Product not found');
    }
    if(this.products[index].isBlock) throw new boom.conflict('Product is block');
    this.products[index] = { ...this.products[index], ...data };
    return this.products[index];
  }
  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new boom.notFound('Product not found');
    }
    if(this.products[index].isBlock) throw new boom.conflict('Product is block');
    this.products.splice(index, 1);
    return { message: 'product deleted' };
  }
}

module.exports = ProductServices;
