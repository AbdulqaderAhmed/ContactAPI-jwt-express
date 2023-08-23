import express from "express";
import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  updateContact,
} from "../controllers/contactsController.js";
import { validateToken } from "../middleware/validateToken.js";

const router = express.Router();

router.route("/", validateToken).get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

export default router;
