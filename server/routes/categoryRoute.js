import express from "express";
import { requireSignin, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  updateCategoryController,
  getCategoriesController,
  singleCategoriesController,
  deleteCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post(
  "/create-category",
  // requireSignin,
  // isAdmin,
  createCategoryController
);

router.put(
  "/update-category/:id",
  // requireSignin,
  // isAdmin,
  updateCategoryController
);

router.get("/get-category", getCategoriesController);

router.get('/single-category/:slug', singleCategoriesController);

router.delete('/delete-category/:id',deleteCategoryController)

export default router;
