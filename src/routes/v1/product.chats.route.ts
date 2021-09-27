import express from "express";
import validate from "../../middlewares/validate";
import productChatsValidation from "../../validations/product.chats.validation";
import productChatsController from "../../controller/product.chats.controller";

const router = express.Router();

router.get("/all", productChatsController.findAll);
router.post(
  "",
  validate(productChatsValidation.create),
  productChatsController.create
);
router.patch(
  "/:product_chat_id",
  validate(productChatsValidation.update),
  productChatsController.update
);
router.get(
  "/user/:second_user_id",
  validate(productChatsValidation.findLatestForTwoUsers),
  productChatsController.findLatestForTwoUsers
);
router.get(
  "/:product_chat_id",
  validate(productChatsValidation.findOne),
  productChatsController.findOne
);
export default router;
