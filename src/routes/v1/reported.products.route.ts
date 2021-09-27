import express from "express";
import validate from "../../middlewares/validate";
import reportedProductsValidation from "../../validations/reported.products.validation";
import reportedProductsController from "../../controller/reported.products.controller";

const router = express.Router();

router.get(
  "/all/:status",
  validate(reportedProductsValidation.findAll),
  reportedProductsController.findAll
);
router.get(
  "/:product_id/:status",
  validate(reportedProductsValidation.findByProductId),
  reportedProductsController.findByProductId
);
router.post(
  "",
  validate(reportedProductsValidation.create),
  reportedProductsController.create
);
router.patch(
  "/:reported_id",
  validate(reportedProductsValidation.update),
  reportedProductsController.update
);
router.get(
  "/:reported_id",
  validate(reportedProductsValidation.findOne),
  reportedProductsController.findOne
);
export default router;
