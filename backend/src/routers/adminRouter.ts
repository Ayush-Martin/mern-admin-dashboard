import { Router } from "express";
import {
  addUser,
  blockUnblockUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/adminController.js";
import upload from "../configs/multerConfig.js";
const router = Router();

router.route("/").get(getUsers).post(addUser);

router
  .route("/:id")
  .get(getUser)
  .put(upload.single("profileImage"), updateUser)
  .patch(blockUnblockUser)
  .delete(deleteUser)

export default router;
