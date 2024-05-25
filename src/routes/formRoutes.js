const express = require("express");
const {
  createForm,
  fillData,
  getAllData,
} = require("../controllers/formController");

const {
  validateCreateForm,
  validateFillData,
} = require("../middlewares/validateRequest");


const router = express.Router();

router.post("/form", validateCreateForm, createForm);
router.post("/fill_data", validateFillData, fillData);
router.get("/fill_data", getAllData);

module.exports = router;
