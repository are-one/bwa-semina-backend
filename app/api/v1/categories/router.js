const express = require("express");
const router = express();
const { create, index, find, update, remove } = require("./controller");

router.get("/categories", index);
router.post("/categories", create);
router.get("/categories/:id", find);
router.put("/categories/:id", update);
router.delete("/categories/:id", remove);

module.exports = router;
