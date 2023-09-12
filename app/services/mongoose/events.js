const Events = require("../../api/v1/events/model");
const { BadRequestError, NotFoundError } = require("../../errors");
const { checkingCategories } = require("./categories");
const { checkingImages } = require("./images");
const { checkingTalents } = require("./talents");

const getAllEvents = async (req) => {
  const { keywords, category, talent } = req.query;
  let condition = {};

  if (keywords) {
    condition = { ...condition, title: { $regex: keywords, $options: "i" } };
  }

  if (category) {
    condition = { ...condition, category: category };
  }

  if (talent) {
    condition = { ...condition, talent: talent };
  }

  const result = await Events.find(condition)
    .populate({ path: "image", select: "_id name" })
    .populate({
      path: "category",
      select: "_id name",
    })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id name" },
    });

  return result;
};

const createEvents = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    keyPoint,
    venueName,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  await checkingImages(image);
  await checkingCategories(category);
  await checkingTalents(talent);

  const check = await Events.findOne({ title });

  if (check) throw new BadRequestError("Judul Event sudah terdaftar");

  const result = await Events.create({
    title,
    date,
    about,
    tagline,
    keyPoint,
    venueName,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  });

  return result;
};

const getOneEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findById(id)
    .populate({
      path: "image",
      select: "_id name",
    })
    .populate({ path: "category", select: "_id name" })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id name" },
    });

  if (!result) throw new NotFoundError(`Tidak ada event dengan id: ${id}`);

  return result;
};

const updateEvents = async (req) => {
  const { id } = req.params;
  const {
    title,
    date,
    about,
    tagline,
    keyPoint,
    venueName,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  await checkingImages(image);
  await checkingCategories(category);
  await checkingTalents(talent);

  const checkEvent = await Events.findById(id);

  if (!checkEvent) throw new NotFoundError(`Tidak ada event dengan Id: ${id}`);

  const checkEventTitle = await Events.findOne({ title, _id: { $ne: id } });

  if (checkEventTitle) throw new BadRequestError("Judul Event sudah terdaftar");

  const result = await Events.findByIdAndUpdate(
    { _id: id },
    {
      title,
      date,
      about,
      tagline,
      keyPoint,
      venueName,
      statusEvent,
      tickets,
      image,
      category,
      talent,
    },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteEvents = async (req) => {
  const { id } = req.params;

  const result = await Events.findByIdAndRemove(id);

  if (!result) throw new NotFoundError(`Tidak ada event dengan Id: ${id}`);

  return result;
};

module.exports = {
  getAllEvents,
  createEvents,
  getOneEvents,
  updateEvents,
  deleteEvents,
};
