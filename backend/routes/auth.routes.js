import express from "express"
import { login, logOut, signUp } from "../controllers/auth.controller.js"

const router = express.Router()

router.get("/signup",signUp)
router.get("/login",login)
router.get("/logout",logOut)

export default router