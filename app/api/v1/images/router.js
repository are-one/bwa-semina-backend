const express = require("express");
const router = express();
const { create } = require("./controller");

const uploadMiddleware = require("../../../middlewares/multer");

router.post("/images", uploadMiddleware.single("avatar"), create);

module.exports = router;
