var mongoose = require('mongoose'),
  moment = require('moment'),
  Validations = require('../utils/validations'),
  Merchant = mongoose.model('Merchant');

module.exports.getMyItems = function(req, res, next) {
  Merchant.findById(req.decodedToken.merchant._id).exec(function(err, merchant) {
    if (err) {
      return next(err);
    }
    if (!merchant) {
      return res
        .status(404)
        .json({ err: null, msg: 'Merchant not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'Items retrieved successfully.',
      data: merchant.MyItems
    });
  });
};

module.exports.getItemsByUsername = function(req, res, next) {
  Merchant.findOne({userName:req.params.merchantUsername}).exec(function(err, merchant) {
    if (err) {
      return next(err);
    }
    if (!merchant) {
      return res
        .status(404)
        .json({ err: null, msg: 'Merchant not found.', data: null });
    }
     res.status(200).json({
      err: null,
      msg: 'Items retrieved successfully.',
      data: merchant.MyItems
    });
  });
};


module.exports.createItem = function(req, res, next) {
  var valid =
    req.body.merchantCode &&
    Validations.isString(req.body.merchantCode) &&
    req.body.price &&
    Validations.isNumber(req.body.price);
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: ' merchantCode(String) and price(Number) are required fields.',
      data: null
    });
  }
  // Security Check
  delete req.body.createdAt;
  delete req.body.updatedAt;
  Merchant.findById(req.decodedToken.merchant._id).exec(function(err, merchant) {
    if (err) {
      return next(err);
    }
    if (!merchant) {
      return res
        .status(404)
        .json({ err: null, msg: 'Merchant not found.', data: null });
    }
    var newItem = merchant.MyItems.create(req.body);
    merchant.MyItems.push(newItem);
    merchant.save(function(err) {
      if (err) {
        return next(err);
      }
      res.status(201).json({
        err: null,
        msg: 'Item was created successfully.',
        data: newItem
      });
    });
  });
};

module.exports.deleteItem = function(req, res, next) {
  if (!Validations.isObjectId(req.params.itemId)) {
    return res.status(422).json({
      err: null,
      msg: 'itemId parameter must be a valid ObjectId.',
      data: null
    });
  }
  Merchant.findById(req.decodedToken.merchant._id).exec(function(err, merchant) {
    if (err) {
      return next(err);
    }
    if (!merchant) {
      return res
        .status(404)
        .json({ err: null, msg: 'Merchant not found.', data: null });
    }
    var item = merchant.MyItems.id(req.params.itemId);
    if (!item) {
      return res
        .status(404)
        .json({ err: null, msg: 'Item not found.', data: null });
    }
    item.remove();
    user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        err: null,
        msg: 'Item was deleted successfully.',
        data: item
      });
    });
  });
  };


module.exports.addToCart = function(req, res, next) {
  // Security Check
  delete req.body.createdAt;
  delete req.body.updatedAt;
  Merchant.findById(req.decodedToken.merchant._id).exec(function(err, merchant) {
    if (err) {
      return next(err);
    }
    if (!merchant) {
      return res
        .status(404)
        .json({ err: null, msg: 'Merchant not found.', data: null });
    }
    var newItem = req.body;
    merchant.cart.push(newItem);
    merchant.save(function(err) {
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