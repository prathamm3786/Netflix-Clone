import express from "express";
import { login, logOut, signUp , authCheck} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logOut);
router.get("/check", protectRoute ,authCheck);


export default router;
