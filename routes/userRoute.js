import express from "express";
import { getUser, login, register } from "../controllers/authsController.js";
import { validateToken } from "../middleware/validateToken.js";

const auth = express.Router();

auth.post("/login", login);
auth.post("/register", register);
auth.get("/user", validateToken, getUser);

export default auth;
