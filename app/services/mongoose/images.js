const Images = require("../../api/v1/images/model");
const { NotFoundError } = require("../../errors");

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

const checkingImages = async (id) => {
  const result = await Images.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada gambar dengan Id : ${id}`);

  return result;
};

module.exports = { createImage, generateUrlImages, checkingImages };
