import { Router } from "express";
import {
    signup_part1,
    signup_part2,
    Login
} from "../controllers/user.controller.js"

import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/next").post(signup_part1)
router.route("/next/signup").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
    ]),
    signup_part2
)

router.route("/Login").post(Login);





export default router