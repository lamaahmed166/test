var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  Validations = require('../utils/validations'),
  Encryption = require('../utils/encryption'),
  EMAIL_REGEX = require('../config').EMAIL_REGEX,
  Merchant = mongoose.model('Merchant');
  Customer = mongoose.model('Customer');

  module.exports.getMerchants = function(req, res, next) {
  
      Merchant.find({}).exec(function(err, merchants) {
      if (err) {
        return next(err);
      }
      res.status(200).json({
        err: null,
        msg:
         'merchants retrieved correctly',
        data: merchants
      });
    });
      
};
module.exports.getCustomers = function(req, res, next) {
  
  Customer.find({}).exec(function(err, customers) {
  if (err) {
    return next(err);
  }
  res.status(200).json({
    err: null,
    msg:
     'customers retrieved correctly',
    data: customers
  });
});
  
};


module.exports.merchantRegister = function (req, res, next) {
  // Check that the body keys are in the expected format and the required fields are there
  var valid =
    req.body.merchantEmail &&
    Validations.isString(req.body.merchantEmail) &&
    Validations.matchesRegex(req.body.merchantEmail, EMAIL_REGEX) &&
    req.body.password &&
    Validations.isString(req.body.password) &&
    req.body.confirmPassword &&
    Validations.isString(req.body.confirmPassword) &&
    req.body.userName &&
    Validations.isString(req.body.userName) 
    

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg:
        'merchantEmail(String and of valid email format), password(String) and confirmPassword(String) and User Name are required fields.',
      data: null
    });
  }
  // Check that the password is 8+ characters
  var password = req.body.password.trim();
  if (password.length < 8) {
    return res.status(422).json({
      err: null,
      msg: 'Password must be of length 8 characters or more.',
      data: null
    });
  }
  // Check that password matches confirmPassword
  if (password !== req.body.confirmPassword.trim()) {
    return res.status(422).json({
      err: null,
      msg: 'password and confirmPassword does not match.',
      data: null
    });
  }
  // Check that no other user is registered with this email
  Merchant.findOne({
    userName: req.body.userName.trim().toLowerCase()
  }).exec(function (err, merchant) {
    // If an err occurred, call the next middleware in the app.js which is the error handler
    if (err) {
      return next(err);
    }
    // If there is a user with this email don't continue
    if (merchant) {
      return res.status(422).json({
        err: null,
        msg:
          'A merchant with this user name already exists, please try another user name.',
        data: null
      });
    }

    // Security Check
    delete req.body.createdAt;
    delete req.body.updatedAt;

    // Encrypt the password before saving the user in the database
    Encryption.hashPassword(password, function (err, hash) {
      // If an err occurred, call the next middleware in the app.js which is the error handler
      if (err) {
        return next(err);
      }
      req.body.password = hash;
      Merchant.create(req.body, function (err, newMerchant) {
        if (err) {
          return next(err);
        }
        res.status(201).json({
          err: null,
          msg: 'Registration successful, you can now login to your account.',
          data: newMerchant.toObject()
        });
      });
    });
  });
};
module.exports.customerRegister = function (req, res, next) {

  var valid =
    req.body.customerEmail &&
    Validations.isString(req.body.customerEmail) &&
    Validations.matchesRegex(req.body.customerEmail, EMAIL_REGEX) &&
    req.body.password &&
    Validations.isString(req.body.password) &&
    req.body.confirmPassword &&
    Validations.isString(req.body.confirmPassword) &&
    req.body.userName &&
    Validations.isString(req.body.userName) 
    &&
    req.body.customerMobile &&
    Validations.isString(req.body.customerMobile) 
    &&
    req.body.cardNumber &&
    Validations.isString(req.body.cardNumber) 
    &&
    req.body.cvv &&
    Validations.isString(req.body.cvv) 
    &&
    req.body.expiryYear &&
    Validations.isString(req.body.expiryYear) 
    &&
    req.body.expiryMonth &&
    Validations.isString(req.body.expiryMonth) 
    &&
    req.body.address &&
    Validations.isString(req.body.address) 
    &&
    req.body.locale &&
    Validations.isString(req.body.locale) 

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg:
        'customerEmail(String and of valid email format), password(String) and confirmPassword(String) and User Name are required fields.',
      data: null
    });
  }
  // Check that the password is 8+ characters
  var password = req.body.password.trim();
  if (password.length < 8) {
    return res.status(422).json({
      err: null,
      msg: 'Password must be of length 8 characters or more.',
      data: null
    });
  }
  // Check that password matches confirmPassword
  if (password !== req.body.confirmPassword.trim()) {
    return res.status(422).json({
      err: null,
      msg: 'password and confirmPassword does not match.',
      data: null
    });
  }
  // Check that no other user is registered with this email
  Customer.findOne({
    userName: req.body.userName.trim().toLowerCase()
  }).exec(function (err, customer) {
    // If an err occurred, call the next middleware in the app.js which is the error handler
    if (err) {
      return next(err);
    }
    // If there is a user with this email don't continue
    if (customer) {
      return res.status(422).json({
        err: null,
        msg:
          'A customer with this user name already exists, please try another user name.',
        data: null
      });
    }

    // Security Check
    delete req.body.createdAt;
    delete req.body.updatedAt;

    // Encrypt the password before saving the user in the database
    Encryption.hashPassword(password, function (err, hash) {
      // If an err occurred, call the next middleware in the app.js which is the error handler
      if (err) {
        return next(err);
      }
      req.body.password = hash;
    Customer.create(req.body, function (err, newCustomer) {
        if (err) {
          return next(err);
        }
        res.status(201).json({
          err: null,
          msg: 'Registration successful, you can now login to your account.',
          data: newCustomer.toObject()
        });
      });
    });
  });
};
module.exports.login = function (req, res, next) {
  // Check that the body keys are in the expected format and the required fields are there

  var valid =
    req.body.userName &&
    Validations.isString(req.body.userName) &&
    req.body.password &&
    Validations.isString(req.body.password);
  // not valid format 
  if (!valid) {
    return res.status(422).json({
      err: null,
      msg:
        'userName(String)) and Password(String) are required fields!',
      data: null
    });
  }

  // Find the user with this email from the database 
  Merchant.findOne({
    userName: req.body.userName.trim().toLowerCase()
  }).exec(function (err, merchant) {
    if (err) {
      return next(err);
    }
    // If user not found then he/she is not registered
    if (!merchant) {
      Customer.findOne({
        userName: req.body.userName.trim().toLowerCase()
      }).exec(function (err, customer) {
        if (err) {
          return next(err);
        }
        // If user not found then he/she is not registered
        if (!customer) {
          return res
            .status(404)
            .json({
              err: null, msg: 'User not found. Please register first!', data: null
            });
        }
    
        // If user found then check that the password he entered matches the encrypted hash in the database
        Encryption.comparePasswordToHash(req.body.password, customer.password, function (
          err,
          passwordMatches
        ) {
          if (err) {
            return next(err);
          }
          // If password doesn't match then its incorrect
          if (!passwordMatches) {
            return res
              .status(401)
              .json({
                err: null, msg: 'Password is incorrect.', data: null
              });
          }
          // Create a JWT and put in it the user object from the database
          var token = jwt.sign(
            {
              // user.toObject transorms the document to a json object without the password as we can't leak sensitive info to the frontend
              customer: customer.toObject()
            },
            req.app.get('secret'),
            {
              expiresIn: '72h'
            }
          );
          // Send the JWT to the frontend
          res.status(200).json({
            err: null, msg: 'Welcome back dear friend :).', data: token
          });
        });
      });
    }
else{
    // If user found then check that the password he entered matches the encrypted hash in the database
    Encryption.comparePasswordToHash(req.body.password, merchant.password, function (
      err,
      passwordMatches
    ) {
      if (err) {
        return next(err);
      }
      // If password doesn't match then its incorrect
      if (!passwordMatches) {
        return res
          .status(401)
          .json({
            err: null, msg: 'Password is incorrect.', data: null
          });
      }
      // Create a JWT and put in it the user object from the database
      var token = jwt.sign(
        {
          // user.toObject transorms the document to a json object without the password as we can't leak sensitive info to the frontend
          merchant: merchant.toObject()
        },
        req.app.get('secret'),
        {
          expiresIn: '72h'
        }
      );
      // Send the JWT to the frontend
      res.status(200).json({
        err: null, msg: 'Welcome back dear friend :).', data: token
      });
    });}
  });
};

