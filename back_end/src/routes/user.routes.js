import { Router } from "express";
import {
    signup_part1,
    signup_part2,
    Login,
    pyqUploader,
    pyq_filter,
    refreshAccessToken
} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
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
router.route("/pyqUploader").post(
    upload.fields([
        {
            name: "paperPdf",
            maxCount: 1
        },
        {
            name: "solutionPdf",
            maxCount: 1
        },
        {
            name: "solutionVideo",
            maxCount: 1
        },
    ]),
    verifyJWT, pyqUploader
);

router.route("/filter").post(verifyJWT, pyq_filter)

router.route("/refresh-token").post(refreshAccessToken)





export default router