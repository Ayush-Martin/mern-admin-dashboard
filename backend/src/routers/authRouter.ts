import { Router } from "express";
import {
  signup,
  signin,
  refresh,
  signout,
} from "../controllers/authController.js";
import { refreshTokenValidator } from "../Middlewares/refreshTokenValidator.js";
const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);

router.get("/refresh", refreshTokenValidator, refresh);
router.get("/signout", signout);

export default router;
