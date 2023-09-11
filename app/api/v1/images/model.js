const { model, Schema } = require("mongoose");

const imageSchema = Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Image", imageSchema);
