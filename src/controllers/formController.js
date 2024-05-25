const { v4: uuidv4 } = require("uuid");
const Form = require("../models/form");
const Submission = require("../models/submission");
const logger = require("../utils/logger");

exports.createForm = async (req, res) => {
  try {
    const { title, name, email, phoneNumber, isGraduate } = req.body;
    const newForm = await Form.create({
      uniqueId: uuidv4(),
      title,
      name,
      email,
      phoneNumber,
      isGraduate,
    });
    res.status(201).json(newForm);
  } catch (error) {
    logger.error(error.message);
    res.status(400).json({ error: error.message });
  }
};

exports.fillData = async (req, res) => {
  try {
    const { uniqueId, name, email, phoneNumber, isGraduate } = req.body;
    const form = await Form.findOne({ where: { uniqueId } });
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    const newSubmission = await Submission.create({
      uniqueId,
      name,
      email,
      phoneNumber,
      isGraduate,
    });
    res.status(201).json(newSubmission);
  } catch (error) {
    logger.error(error.message);
    res.status(400).json({ error: error.message });
  }
};

exports.getAllData = async (req, res) => {
  try {
    const { form_title } = req.query;
    const form = await Form.findOne({ where: { title: form_title } });
    console.log(form);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    const pageSize = 10; // Number of submissions per page
    const page = req.query.page || 1; // Current page, default is 1
    const offset = (page - 1) * pageSize;

    const submissions = await Submission.findAndCountAll({
      where: { uniqueId: form.uniqueId },
      attributes: ["name", "email", "phoneNumber", "isGraduate"], // Select specific fields
      limit: pageSize,
      offset: offset,
    });

    const totalPages = Math.ceil(submissions.count / pageSize);

    res.status(200).json({
      currentPage: page,
      totalPages: totalPages,
      submissions: submissions.rows,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(400).json({ error: error.message });
  }
};
