const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dvrse9tho',
  api_key: '335138245146994',
  api_secret: '2nhHCF2MWOWx5nUL_Si-RKVeJ5M'
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
  params: {
    folder: 'avatar_users'
  }
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
