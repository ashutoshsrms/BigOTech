const { v4: uuidv4 } = require("uuid");
const Form = require("../models/form");
const Submission = require("../models/submission");
const logger = require("../utils/logger");
const { Op } = require("sequelize");

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
    res.status(400).json({ error: "Failed to create form" });
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
    const forms = await Form.findAll({ where: { title: form_title } });

    if (!forms || forms.length === 0) {
      return res.status(404).json({ error: "Form not found" });
    }

    const uniqueIds = forms.map((form) => form.uniqueId);

    const pageSize = 10;
    const page = parseInt(req.query.page, 10) || 1;
    const offset = (page - 1) * pageSize;

    const submissions = await Submission.findAndCountAll({
      where: { uniqueId: { [Op.in]: uniqueIds } },
      attributes: ["uniqueId", "name", "email", "phoneNumber", "isGraduate"],
      limit: pageSize,
      offset: offset,
    });

    const totalPages = Math.ceil(submissions.count / pageSize);

    // Group submissions by form name or uniqueId
    const groupedSubmissions = forms.reduce((acc, form) => {
      const formName = form.name || form.uniqueId;
      acc[formName] = submissions.rows.filter(
        (sub) => sub.uniqueId === form.uniqueId
      );
      return acc;
    }, {});

    res.status(200).json({
      currentPage: page,
      totalPages: totalPages,
      submissions: groupedSubmissions,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(400).json({ error: error.message });
  }
};



