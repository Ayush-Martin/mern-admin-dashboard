import { Router } from "express";
import upload from "../configs/multerConfig.js";
import { updateProfile } from "../controllers/profileController.js";
const router = Router();

router.put("/", upload.single(""), updateProfile);

export default router;
