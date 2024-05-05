import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  testFunction,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/").get(getUser).put(updateUser).delete(deleteUser);
router.route("/auth").post(testFunction);

export default router;
