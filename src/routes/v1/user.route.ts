import express from "express";
import userController from "../../controller/user.controller";
import { requireAuth } from "../../middlewares/auth.middleware";
import validate from "../../middlewares/validate";
import userValidation from "../../validations/user.validation";

const router = express.Router();

router.patch(
  "/me",
  validate(userValidation.updateUser),
  userController.updateUser
);
router.patch(
  "/address",
  validate(userValidation.updateAddress),
  userController.updateUserAddress
);
router.get("/me", userController.findMe);
router.get(
  "/user/:user_id",
  validate(userValidation.getUser),
  userController.findOne
);
export default router;
