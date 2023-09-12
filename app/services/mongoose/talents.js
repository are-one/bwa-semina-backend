const Talents = require("../../api/v1/talents/model");
const { checkingImages } = require("./images");
const { BadRequestError, NotFoundError } = require("../../errors");

const getAllTalents = async (req) => {
  const { keywords } = req.query;

  let condition = {};

  if (keywords) {
    condition = { ...condition, name: { $regex: keywords, $options: "i" } };
  }

  const result = await Talents.find(condition)
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name image role");

  return result;
};

const createTalents = async (req) => {
  const { name, role, image } = req.body;

  // cari image dengan field image
  await checkingImages(image);

  const check = await Talents.findOne({ name });

  if (check) throw new BadRequestError("Pembicara sudah terdaftar");

  const result = await Talents.create({ name, image, role });

  return result;
};

const getOneTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({ _id: id })
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name image role");

  if (!result) throw new NotFoundError(`Tidak ada pembicara dengan Id : ${id}`);

  return result;
};

const updateTalents = async (req) => {
  const { id } = req.params;
  const { name, role, image } = req.body;

  await checkingImages(image);

  const checkTalent = await Talents.findById(id);

  if (!checkTalent)
    throw new NotFoundError(`Tidak ada pembicara dengan Id : ${id}`);

  const checkTalentName = await Talents.findOne({
    name,
    _id: { $ne: id },
  });

  if (checkTalentName) throw new BadRequestError("Pembicara sudah terdaftar");

  const result = await Talents.findByIdAndUpdate(
    { _id: id },
    { name, image, role },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteTalents = async (req) => {
  const { id } = req.params;

  const result = await Talents.findByIdAndRemove(id);

  if (!result) throw new NotFoundError(`Tidak ada pembicara dengan Id : ${id}`);

  return result;
};

const checkingTalents = async (id) => {
  const result = await Talents.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada pembicara dengan Id : ${id}`);

  return result;
};

module.exports = {
  getAllTalents,
  createTalents,
  getOneTalents,
  updateTalents,
  deleteTalents,
  checkingTalents,
};
