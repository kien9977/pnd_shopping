'use strict';
module.exports = function(app) {
  let productsController = require('./products/productsController.js');

  // todoList Routes
  app.route('/products')
    .get(productsController.get);

  app.route('/products/:productId')
    .get(productsController.detail);
};
