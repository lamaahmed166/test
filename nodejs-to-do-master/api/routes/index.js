var express = require('express'),
router = express.Router(),
jwt = require('jsonwebtoken'),
authCtrl = require('../controllers/auth.controller');
merchantsCtrl = require('../controllers/merchant.controller');
orderCtrl= require('../controllers/order.controller');


var isAuthenticated = function(req, res, next) {
  // Check that the request has the JWT in the authorization header
  var token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({
      error: null,
      msg: 'You have to login first before you can access your lists.',
      data: null
    });
  }
  // Verify that the JWT is created using our server secret and that it hasn't expired yet
  jwt.verify(token, req.app.get('secret'), function(err, decodedToken) {
    if (err) {out
      return res.status(401).json({
        error: err,
        msg: 'Login timed , please login again.',
        data: null
      });
    }
    req.decodedToken = decodedToken;
    next();
  });
};



var isNotAuthenticated = function(req, res, next) {
  // Check that the request doesn't have the JWT in the authorization header
  var token = req.headers['authorization'];
  if (token) {
    return res.status(403).json({
      error: null,
      msg: 'You are already logged in.',
      data: null
    });
  }
  next();
};

//-----------------------------Authentication Routes-------------------------
router.post('/auth/customerRegister', isNotAuthenticated, authCtrl.customerRegister);
router.post('/auth/login', isNotAuthenticated, authCtrl.login);
router.get('/auth/getMerchants', isAuthenticated, authCtrl.getMerchants);
router.get('/auth/getCustomers', isAuthenticated, authCtrl.getCustomers);

//----------------------------SlotsCtrl---------------------
router.get('/items/getMyItems', isAuthenticated, merchantsCtrl.getMyItems);
router.get('/items/getItemsByUsername/:merchantUsername', isAuthenticated, merchantsCtrl.getItemsByUsername);
router.post('/items/createItem', isAuthenticated, merchantsCtrl.createItem);
router.delete('/items/deleteItem/:itemId',isAuthenticated, merchantsCtrl.deleteItem);
router.post('/order/createOrder', isAuthenticated, orderCtrl.createOrder);
//----cart
router.post('/order/addToCartMerchant', isAuthenticated, merchantsCtrl.addToCart);
router.post('/order/addToCartCustomer', isAuthenticated, customersCtrl.addToCart);


module.exports = router;
