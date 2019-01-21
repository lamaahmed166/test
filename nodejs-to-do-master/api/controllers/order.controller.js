var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/validations'),
  Order = mongoose.model('Order');


module.exports.createOrder = function(req, res, next) {
  var valid =
    req.body.merchantCode &&
    Validations.isString(req.body.merchantCode) &&
    req.body.customerId &&
    Validations.isString(req.body.customerId) &&
    req.body.orderAmount &&
    Validations.isString(req.body.orderAmount);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: ' merchantCode(String) and orderAmount(String) are required fields.',
      data: null
    });
  }
  // Security Check
  delete req.body.createdAt;
  delete req.body.updatedAt;
  Order.create(req.body, function (err, newOrder) {
    if (err) {
      return next(err);
    }
    res.status(201).json({
      err: null,
      msg: 'Order created successfully.',
      data: newOrder.toObject()
    });
  });
};

module.exports.updateOrder = function(req, res, next) {
  if (!Validations.isObjectId(req.params.orderId)) {
    return res.status(422).json({
      err: null,
      msg: 'orderId parameter must be a valid ObjectId.',
      data: null
    });
  }
  var valid =
    req.body.order_id &&
    Validations.isString(req.body.order_id) ;
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'order_id(String) is a required field.',
      data: null
    });
  }
  // Security Check
  delete req.body.createdAt;
  req.body.updatedAt = moment().toDate();

  Order.findByIdAndUpdate(
    req.params.orderId,
    {
      $set: req.body
    },
    { new: true }
  ).exec(function(err, updatedOrder) {
    if (err) {
      return next(err);
    }
    if (!updatedOrder) {
      return res
        .status(404)
        .json({ err: null, msg: 'Order not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'Order was updated successfully.',
      data: updatedOrder
    });
  });
};