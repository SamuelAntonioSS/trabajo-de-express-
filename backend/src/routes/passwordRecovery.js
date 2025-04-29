import expres from "express";
import passwordRecoveryController from "../controllers/passwordRecoveryController.js";

const router = expres.Router();

router.route("/requestCode").post(passwordRecoveryController.requestCode);
router.route("/verifyCode").post(passwordRecoveryController.verifyCode);
router.route("/newPassword").post(passwordRecoveryController.newPassword);

export default router;
