import { Router } from "express";
import {
    signup_part1
} from "../controllers/user.controller.js"

const router = Router();

router.route("/next").post(signup_part1)





export default router