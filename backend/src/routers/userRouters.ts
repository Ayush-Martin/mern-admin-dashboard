import { Router } from "express";
import { Request, Response } from "express";
import { checkUserAuthenticated } from "../Middlewares/userAuth.js";
const router = Router();

router.get("/", checkUserAuthenticated, (req: Request, res: Response) => {
  res.json({ success: true, message: "you are in home" });
});

export default router;
