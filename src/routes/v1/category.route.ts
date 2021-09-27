import express from "express";
import validate from "../../middlewares/validate";
import authController from "../../controller/auth.controller";
import authValidation from "../../validations/auth.validation";
import categoryValidation from "../../validations/category.validation";
import categoryController from "../../controller/category.controller";

const router = express.Router();

router.get("/", categoryController.findAll);
router.post("", validate(categoryValidation.create), categoryController.create);
router.patch(
  "/:category_id",
  validate(categoryValidation.update),
  categoryController.update
);
router.get(
  "/:category_id",
  validate(categoryValidation.findOne),
  categoryController.findOne
);
export default router;
