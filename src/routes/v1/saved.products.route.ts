import express from "express";
import validate from "../../middlewares/validate";
import savedProductsValidation from "../../validations/saved.products.validation";
import savedProductsController from "../../controller/saved.products.controller";

const router = express.Router();

router.get(
  "/", //?=offset,limit
  validate(savedProductsValidation.findAllForUser),
  savedProductsController.findAllForUser
);
router.get(
  "/:product_id",
  validate(savedProductsValidation.checkSaved),
  savedProductsController.checkSaved
);
router.post(
  "",
  validate(savedProductsValidation.create),
  savedProductsController.create
);
router.delete(
  "/:product_id",
  validate(savedProductsValidation.removeSaved),
  savedProductsController.removeSaved
);
export default router;
