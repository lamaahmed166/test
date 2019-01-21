var mongoose = require('mongoose');
var Items =require('./merchants.model');
var ItemSchema = mongoose.Schema({
  merchantCode: {
    type: String,
    required: true,
    trim: true
    },
   description: {
    type: String,
    trim: true
    },
   price:{
    type: Number,
    required:true
    },
    currency:{
      type: String,
      required: true
    },
   quantity: {
    type: String,
    trim: true
      },
   width: {
    type: String,
    trim: true
        },
   height: {
     type: String,
    trim: true
          },
   length: {
    type: String,
    trim: true
            },
   weight: {
    type: String,
    trim: true
              }
 
});
var customerSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
 customerEmail: {
    type: String,
    required: true,
    trim: true
  } ,
  customerMobile: {
    type: String,
    required: true,
    trim: true
  } ,
  cardNumber: {
    type: String,
    required: true,
    trim: true
  } ,
  expiryYear: {
    type: String,
    required: true,
    trim: true
  } ,
 expiryMonth: {
    type: String,
    required: true,
    trim: true
  } ,
  cvv: {
    type: String,
    required: true,
    trim: true
  } ,
   address: {
    type: String,
    required: true,
    trim: true
  } ,
  locale: {
    type: String,
    required: true,
    trim: true
  } ,
  street: {
    type: String,
    trim: true
  } ,
  
  building: {
    type: String,
    trim: true
  } ,
  apartment: {
    type: String,
    trim: true
  } ,
  flat: {
    type: String,
    trim: true
  } ,
  city: {
    type: String,
    trim: true
  } ,
  country: {
    type: String,
    trim: true
  } ,
  state: {
    type: String,
    trim: true
  } ,
  postalCode: {
    type: String,
    trim: true
  } ,
  firstName: {
    type: String,
    trim: true
  } ,
  lastName: {
    type: String,
    trim: true
  } ,
  cart:[Items],
  
  CreatedAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

// Override the transform function of the schema to delete the password before it returns the object
if (!customerSchema.options.toObject) {
  customerSchema.options.toObject = {};
}
customerSchema.options.toObject.transform = (document, transformedDocument) => {
  delete transformedDocument.password;
  return transformedDocument;
};

mongoose.model('Customer', customerSchema);
//mongoose.model('items', ItemSchema);
