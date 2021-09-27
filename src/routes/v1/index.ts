import express from "express";
import authRoute from "./auth.route";
import agoraRoute from "./agora.route";
import categoryRoute from "./category.route";
import coinsRoute from "./coins.route";
import faqsRoute from "./faqs.route";
import feedbackRoute from "./feedback.route";
import productChatsRoute from "./product.chats.route";
import productImageRoute from "./product.image.route";
import productRoute from "./product.route";
import productViewsRoute from "./product.views.route";
import reportedProductsRoute from "./reported.products.route";
import savedProductRoute from "./saved.products.route";
import subcategoryRoute from "./subcategory.route";
import userRoute from "./user.route";
import { requireAuth } from "../../middlewares/auth.middleware";
import appSettingsRoute from "./app.settings.route";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/appsettings", appSettingsRoute);

router.use(requireAuth);

router.use("/users", userRoute);
router.use("/agora", agoraRoute);
router.use("/category", categoryRoute);
router.use("/subcategory", subcategoryRoute);
router.use("/productchats", productChatsRoute);
router.use("/productimage", productImageRoute);
router.use("/coins", coinsRoute);
router.use("/saved", savedProductRoute);
router.use("/productviews", productViewsRoute);
router.use("/faqs", faqsRoute);
router.use("/feedback", feedbackRoute);
router.use("/reportedproducts", reportedProductsRoute);
router.use("/products", productRoute);

export default router;
