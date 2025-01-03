import { Router } from "express";
import upload from "../configs/multerConfig.js";
import { updateProfile } from "../controllers/profileController.js";
import { checkUserAuthenticated } from "../Middlewares/userAuth.js";
const router = Router();

router.put(
  "/",
  upload.single("profileImage"),
  checkUserAuthenticated,
  updateProfile
);

export default router;
