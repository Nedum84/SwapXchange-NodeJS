import express from "express";
import validate from "../../middlewares/validate";
import productViewsValidation from "../../validations/product.views.validation";
import productViewsController from "../../controller/product.views.controller";

const router = express.Router();

router.get(
  "/:product_id",
  validate(productViewsValidation.findAll),
  productViewsController.findAll
);
router.post(
  "",
  validate(productViewsValidation.create),
  productViewsController.create
);
export default router;
