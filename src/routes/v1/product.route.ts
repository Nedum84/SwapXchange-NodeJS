import express from "express";
import validate from "../../middlewares/validate";
import productValidation from "../../validations/product.validation";
import productController from "../../controller/product.controller";

const router = express.Router();

router.post("", validate(productValidation.create), productController.create);
router.patch(
  "/:product_id",
  validate(productValidation.update),
  productController.update
);
//---> offset/limit  eg all/1/21
router.get("/", validate(productValidation.findAll), productController.findAll);
//---> search suggestions
router.get(
  "/search/suggest",
  validate(productValidation.findSearchSuggestions),
  productController.findSearchSuggestions
);
router.get(
  "/search",
  validate(productValidation.findBySearch),
  productController.findBySearch
);
router.get(
  "/category/:category",
  validate(productValidation.findByCategory),
  productController.findByCategory
);
router.get(
  "/subcategory/:subcategory",
  validate(productValidation.findBySubCategory),
  productController.findBySubCategory
);
router.get(
  "/me",
  validate(productValidation.findMyProducts),
  productController.findMyProducts
);
router.get(
  "/user/:user_id",
  validate(productValidation.findUserProducts),
  productController.findUserProducts
);
router.get(
  "/exchange/:product_id",
  validate(productValidation.findExchangeOptions),
  productController.findExchangeOptions
);
router.get(
  "/:product_id",
  validate(productValidation.findOne),
  productController.findOne
);
router.get(
  "/nearbyusers/:product_id",
  validate(productValidation.findNearUsers),
  productController.findNearUsers
);
export default router;
