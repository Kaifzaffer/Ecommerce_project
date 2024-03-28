import express from "express";
import { registerController,loginController, testController } from "../controllers/authController.js";
import {requireSignin,isAdmin} from "../middlewares/authMiddleware.js"



const router = express.Router();

// USER REGISTER ROUTE || POST METHOD

router.post('/register', registerController);

// USER LOGIN ROUTE || POST METHOD

router.post('/login', loginController);

// test route

router.get('/test', requireSignin,isAdmin,testController);


router.get("/user-auth", requireSignin, (req, res) => {
    res.status(200).send({ ok: true });
});

router.get("/admin-auth", requireSignin,isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

export default router;
