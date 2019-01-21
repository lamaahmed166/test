var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/validations'),
  Customer = mongoose.model('Customer');
  
module.exports.addToCart = function(req, res, next) {
    // Security Check
    delete req.body.createdAt;
    delete req.body.updatedAt;
    Customer.findById(req.decodedToken.customer._id).exec(function(err, customer) {
      if (err) {
        return next(err);
      }
      if (!customer) {
        return res
          .status(404)
          .json({ err: null, msg: 'customer not found.', data: null });
      }
      var newItem = req.body;
      customer.cart.push(newItem);
      customer.save(function(err) {
        if (err) {
          return next(err);
        }
        res.status(201).json({
          err: null,
          msg: 'Item was added successfully.',
          data: newItem
        });
      });
    });
  };