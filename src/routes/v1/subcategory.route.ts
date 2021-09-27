import express from "express";
import validate from "../../middlewares/validate";
import subcategoryValidation from "../../validations/subcategory.validation";
import subcategoryController from "../../controller/subcategory.controller";

const router = express.Router();

router.get("/all", subcategoryController.findAll);
router.post(
  "",
  validate(subcategoryValidation.create),
  subcategoryController.create
);
router.patch(
  "/:sub_category_id",
  validate(subcategoryValidation.update),
  subcategoryController.update
);
router.get(
  "/:sub_category_id",
  validate(subcategoryValidation.findOne),
  subcategoryController.findOne
);
router.get(
  "/category/:category_id",
  validate(subcategoryValidation.findByCategoryId),
  subcategoryController.findByCategoryId
);
export default router;
