import express from "express"
import { getAllUser, register } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const router  = express.Router();

router.route("/register").post(upload.fields([
    { name: "aadhaarphoto", maxCount: 1 },
    { name: "panphoto", maxCount: 1 },
    { name: "bankphoto", maxCount: 1 },
  ]),register);
router.route("/getalluser").get(getAllUser);

export default router;
