import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js"; // make sure spelling matches exactly

import { upload } from "../midddewares/multer.middleware.js";
const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name:"avatar"
            ,maxcount:1
        },
        {
            name:"coverImage",
            maxcount:1
        }
    ]),
    registerUser);

export default router;
