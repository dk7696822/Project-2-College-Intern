const InternModel = require("../Models/internModel");
const CollegeModel = require("../Models/collegeModel");
exports.interns = async (req, res) => {
  try {
    if (!req.body.collegeName || req.body.collegeName.trim().length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter the college name" });
    }
    const college = await CollegeModel.findOne({ name: req.body.collegeName });
    const collegeID = college._id;
    req.body.collegeId = collegeID;
    const interns = await InternModel.create(req.body);
    return res.status(201).send({
      status: true,
      message: "Intern Created Successfully",
      data: interns,
    });
  } catch (err) {
    if (err.name == "ValidationError") {
      return res.status(400).send(err.message);
    }
    if (err.code == 11000) {
      console.log(err);
      return res.status(400).send({
        status: false,
        msg: `Duplicate value provided at ${Object.keys(
          err.keyValue
        )}: ${Object.values(err.keyValue)}`,
      });
    }
    return res.status(500).send({ status: false, msg: err.message });
  }
};

exports.getInterns = async (req, res) => {
  try {
    const college = await CollegeModel.findOne({ name: req.query.collegeName });
    if (!college) {
      return res
        .status(400)
        .send({ status: false, msg: "No college found with this name" });
    }
    const collegeId = college._id;
    const intern = await InternModel.find({ collegeId: collegeId });
    if (intern.length == 0) {
      return res.status(200).send({
        status: false,
        msg: "No interns found who have applied for internship in this college",
      });
    }
    return res.status(200).send({
      data: {
        name: college.name,
        fullName: college.fullName,
        logoLink: college.logoLink,
        interns: intern,
      },
    });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};
