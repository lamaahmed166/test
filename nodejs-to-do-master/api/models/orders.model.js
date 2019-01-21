var mongoose = require('mongoose');

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
  var OrderSchema = mongoose.Schema({
    order_id:{
      type: String
    },
    merchantCode: {
      type: String,
      required: true,
      trim: true
      },
      customerId: {
        type: String,
        required: true,
        trim: true
        },
     orderDesc: {
      type: String,
      trim: true
      },
     orderExpiry:{
      type: String,
      required:true,
      trim: true
      },
     orderAmount: {
      type: String,
      required:true,
      trim: true
        },
        items:[ItemSchema],
        CreatedAt: {
          type: Date,
          default: Date.now
        },
        updatedAt: Date
  });
  

  
// Override the transform function of the schema to delete the password before it returns the object
if (!OrderSchema.options.toObject) {
    OrderSchema.options.toObject = {};
  }
  OrderSchema.options.toObject.transform = (document, transformedDocument) => {
    delete transformedDocument.password;
    return transformedDocument;
  };
  
  mongoose.model('Order', OrderSchema);
  //mongoose.model('items', ItemSchema);
