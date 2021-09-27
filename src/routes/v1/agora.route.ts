import express from "express";
import agoraController from "../../controller/agora.controller";

const router = express.Router();

router.post("/generatetoken", agoraController.create);
export default router;
