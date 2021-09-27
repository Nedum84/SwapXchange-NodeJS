import express from "express";
import validate from "../../middlewares/validate";
import faqsValidation from "../../validations/faqs.validation";
import faqsController from "../../controller/faqs.controller";

const router = express.Router();

router.get("/all", faqsController.findAll);
router.post("", validate(faqsValidation.create), faqsController.create);
router.patch(
  "/:faq_id",
  validate(faqsValidation.update),
  faqsController.update
);
router.get(
  "/:faq_id",
  validate(faqsValidation.findOne),
  faqsController.findOne
);
export default router;
