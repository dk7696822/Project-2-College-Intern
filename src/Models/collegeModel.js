const mongoose = require("mongoose");
const validator = require("validator");
const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide college name"],
      unique: true,
      validate: {
        validator: function (val) {
          return val.trim().length != 0;
        },
        message: "Please do not leave the field empty",
      },
    },
    fullName: {
      type: String,
      required: [true, "Please provide college Full Name"],
      validate: {
        validator: function (val) {
          return val.trim().length != 0;
        },
        message: "Please do not leave the field empty",
      },
    },
    logoLink: {
      type: String,
      required: [true, "Please provide Logo Link"],
      validate: [validator.isURL, "Please provide a valid URL"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("college", collegeSchema);
