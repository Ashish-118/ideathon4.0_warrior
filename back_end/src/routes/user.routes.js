import { Router } from "express";
import {
    signup_part1,
    signup_part2,
    Login,
    pyqUploader,
    pyq_filter,
    refreshAccessToken,
    logoutUser,
    DeletePyq,
    getPyq,
    getBook,
    uploadBook,
    getPyqForHome,
    getBookForHome,
    fileUpload,
    fileAttachment,
    book_filter,
    uploadAttachments
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

router.route("/pyq/Uploader").post(
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

router.route("/pyq/filter").post(pyq_filter)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/logout").post(verifyJWT, logoutUser);

router.delete("/pyq/:pyqId", DeletePyq)

router.route("/pyq").post(verifyJWT, getPyq)
router.route("/pyqForHome").post(getPyqForHome)
router.route("/BookForHome").post(getBookForHome)

router.route('/book').post(verifyJWT, getBook)
router.route('/book/upload').post(verifyJWT, upload.single('bookPdf'), uploadBook)

router.route("/fileUpload").post(

    upload.array("fileLink", 10),

    fileUpload
);

router.route("/book/filter").post(book_filter)
router.route("/fileAttachment/:bookId").post(fileAttachment)


router.route("/uploadAttachment").post(
    upload.array("fileLink", 100),
    uploadAttachments
)
export default router