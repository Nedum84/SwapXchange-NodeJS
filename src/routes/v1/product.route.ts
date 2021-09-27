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
router.get(
  "/all/:offset/:limit",
  validate(productValidation.findAll),
  productController.findAll
);
//---> search suggestions
router.get(
  "/search/suggest/:search_query",
  validate(productValidation.findSearchSuggestions),
  productController.findSearchSuggestions
);
router.get(
  "/search/:search_query/:filters/:offset/:limit",
  validate(productValidation.findBySearch),
  productController.findBySearch
);
router.get(
  "/category/:category/:offset/:limit",
  validate(productValidation.findByCategory),
  productController.findByCategory
);
router.get(
  "/subcategory/:subcategory/:filters/:offset/:limit",
  validate(productValidation.findBySubCategory),
  productController.findBySubCategory
);
router.get(
  "/me/:offset/:limit",
  validate(productValidation.findMyProducts),
  productController.findMyProducts
);
router.get(
  "/user/:user_id/:filter/:offset/:limit",
  validate(productValidation.findUserProducts),
  productController.findUserProducts
);
router.get(
  "/exchange/:product_id/:offset/:limit",
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
