const collegeModel = require("../Models/collegeModel.js");

//********************************** Createing College ************************************************** */

const createCollege = async function (req, res) {
  try {
    // if (
    //   req.body.name.trim().length == 0 ||
    //   req.body.fullName.trim().length == 0
    // ) {
    //   return res
    //     .status(400)
    //     .send({ status: false, msg: "Please do not leave the field empty" });
    // }

    let data = req.body;
    if (Object.keys(data).length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "request body is Empty" });
    const savedData = await collegeModel.create(data);
    return res.status(201).send({ status: true, msg: savedData });
  } catch (error) {
    if (error.name == "ValidationError") {
      return res.status(400).send({ status: false, msg: error.message });
    }
    if (error.code == 11000) {
      return res.status(400).send({
        status: false,

        msg: `Duplicate value provided at ${Object.keys(
          error.keyValue
        )}: ${Object.values(error.keyValue)}`,
      });
    }
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports.createCollege = createCollege;
