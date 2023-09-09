const express = require("express");
const router = express.Router();
const {
  getContacts,
  CreateContact,
  getContact,
  UpdateContact,
  DeleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken)
router.route("/").get(getContacts).post(CreateContact);

router.route("/:id").get(getContact).put(UpdateContact).delete(DeleteContact);

module.exports = router;
