import { Router } from "express";
const router = Router();
import upload from "../configs/multerConfig.js";

//controllers
import { updateProfile } from "../controllers/profileController.js";

//middlewares
import { checkUserAuthenticated } from "../Middlewares/userAuth.js";

//setting up middleware for authentication
router.use(checkUserAuthenticated);

//route to update user profile
router.put("/", upload.single("profileImage"), updateProfile);

export default router;
