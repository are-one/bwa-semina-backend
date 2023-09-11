const Images = require("../../api/v1/images/model");

// Cara 1. Simpan url kedalam database
const createImage = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : "uploads/avatar/default.jpg",
  });

  return result;
};

// Cara 2.
const generateUrlImages = async (req) => {
  const result = `uploads/${req.file.filename}`;

  return result;
};

module.exports = { createImage, generateUrlImages };
