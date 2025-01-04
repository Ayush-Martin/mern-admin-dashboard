import { Router } from "express";
const router = Router();
import upload from "../configs/multerConfig.js";

//controllers
import {
  addUser,
  blockUnblockUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/adminController.js";

//middlewares
import { checkAdminAuthenticated } from "../Middlewares/adminAuth.js";

//setting up middleware for authentication and authorization
router.use(checkAdminAuthenticated);

//dashboard
router.route("/").get(getUsers).post(addUser);

router
  .route("/:id")
  .get(getUser) //getting a user data
  .put(upload.single("profileImage"), updateUser) //updated a user data
  .patch(blockUnblockUser) //change blocked status of user
  .delete(deleteUser); //deleting a user

export default router;
