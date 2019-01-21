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
var merchantSchema = mongoose.Schema({
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
  merchantEmail: {
    type: String,
    required: true,
    trim: true
  } ,
  MyItems: [ItemSchema],
  cart:[ItemSchema],
  CreatedAt: {
    type: Date,
    default: Date.now
  },
  ProfilePicture: {
    type: String,
    default: 'https://openclipart.org/image/2400px/svg_to_png/211821/matt-icons_preferences-desktop-personal.png'
  },
  updatedAt: Date
});

// Override the transform function of the schema to delete the password before it returns the object
if (!merchantSchema.options.toObject) {
  merchantSchema.options.toObject = {};
}
merchantSchema.options.toObject.transform = (document, transformedDocument) => {
  delete transformedDocument.password;
  return transformedDocument;
};

mongoose.model('Merchant', merchantSchema);
mongoose.model('items', ItemSchema);


