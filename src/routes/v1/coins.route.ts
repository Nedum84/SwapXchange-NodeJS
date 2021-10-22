import express from "express";
import validate from "../../middlewares/validate";
import coinsValidation from "../../validations/coins.validation";
import coinsController from "../../controller/coins.controller";

const router = express.Router();

router.post("", validate(coinsValidation.create), coinsController.create);
router.post(
  "/:user_id",
  validate(coinsValidation.createForUser),
  coinsController.createForUser
);
router.get("/me", coinsController.getBalance);
router.get(
  "/:user_id", //?=> limit, offset
  validate(coinsValidation.findAllByUserId),
  coinsController.findAllByUserId
);
export default router;
