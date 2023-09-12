const Categories = require("../../api/v1/categories/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllCategories = async () => {
  const result = await Categories.find({}).select("_id name");

  return result;
};

const createCategories = async (req) => {
  const { name } = req.body;
  const check = await Categories.findOne({ name });

  if (check) throw new BadRequestError("Kategori nama duplikat");

  const result = await Categories.create({ name });

  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan Id : ${id}`);

  return result;
};

const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const checkCategory = await Categories.findById(id);

  if (!checkCategory)
    throw new NotFoundError(`Tidak ada kategori dengan Id: ${id}`);

  const checkName = await Categories.findOne({
    name,
    _id: { $ne: id },
  });

  if (checkName) throw new BadRequestError("Kategori nama duplikat");

  const result = await Categories.findByIdAndUpdate(
    { _id: id },
    { name },
    { runValidators: true, new: true }
  );

  return result;
};

const deleteCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.findByIdAndRemove(id);

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan Id: ${id}`);

  return result;
};

const checkingCategories = async (id) => {
  const result = await Categories.findById(id);

  if (!result) throw new NotFoundError(`Tidak ada kategori dengan Id: ${id}`);

  return result;
};

module.exports = {
  getAllCategories,
  createCategories,
  getOneCategories,
  updateCategories,
  deleteCategories,
  checkingCategories,
};
