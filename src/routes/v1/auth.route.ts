import express from "express";
import validate from "../../middlewares/validate";
import authController from "../../controller/auth.controller";
import authValidation from "../../validations/auth.validation";

const router = express.Router();

router.post("", validate(authValidation.register), authController.register);
router.post(
  "/refreshtoken",
  validate(authValidation.refreshToken),
  authController.refreshToken
);
export default router;
