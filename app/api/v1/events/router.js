const express = require("express");
const router = express();
const { index, find, create, update, remove } = require("./controller");

router.get("/events", index);
router.get("/events/:id", find);
router.post("/events", create);
router.put("/events/:id", update);
router.delete("/events/:id", remove);

module.exports = router;
