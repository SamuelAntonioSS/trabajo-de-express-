import expres from "express";

const router = expres.Router();

router.route("/requestCode").post();
router.route("/verifyCode").post();
router.route("/newPassword").post();

export default router;
