import express from "express";
import * as authMiddleware from "../../middleware/auth/index.js";
import * as paymentController from "../../controllers/payment/index.js";

const { auth, isAdmin } = authMiddleware;
const { createPaymentOrder, verifyPayment, handleWebhook } = paymentController;
const router = express.Router();

router.post(
    "/create_order/:bookingId", 
    auth, 
    createPaymentOrder
);
router.post(
    "/verify", 
    auth, 
    verifyPayment
);

router.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    handleWebhook,
);

export default router;
