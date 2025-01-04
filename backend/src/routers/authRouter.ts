import { Router } from "express";
const router = Router();

//controllers
import {
  signup,
  signin,
  refresh,
  signout,
} from "../controllers/authController.js";

//middlewares
import { refreshTokenValidator } from "../Middlewares/refreshTokenValidator.js";

router.post("/signup", signup); //login user
router.post("/signin", signin); //register user

router.get("/refresh", refreshTokenValidator, refresh); //route to handle refresh token
router.get("/signout", signout); //logout user

export default router;
