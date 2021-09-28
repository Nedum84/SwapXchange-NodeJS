import express from "express";
import validate from "../../middlewares/validate";
import feedbackValidation from "../../validations/feedback.validation";
import feedbackController from "../../controller/feedback.controller";

const router = express.Router();

router.get(
  "/all",
  validate(feedbackValidation.findAll),
  feedbackController.findAll
);
router.post("", validate(feedbackValidation.create), feedbackController.create);
router.patch(
  "/:feedback_id",
  validate(feedbackValidation.update),
  feedbackController.update
);
router.get(
  "/:feedback_id",
  validate(feedbackValidation.findOne),
  feedbackController.findOne
);
export default router;
