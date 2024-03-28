import express from "express";
import Product from "../models/productModel.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getSingleProductController,
  ProductPhotoController,
  deleteProductController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController
} from "../controllers/productController.js";
import formidable from "express-formidable";

const router = express.Router();

router.post(
  "/create-product",
  // requireSignin,
  // isAdmin,
  formidable(),
  createProductController
);

router.get("/get-product", getProductController);

router.get("/get-product/:slug", getSingleProductController);

router.get("/product-photo/:_id", ProductPhotoController);

router.delete("/delete-product/:id", deleteProductController);

router.put(
    "/update-product/:id",
    // requireSignin,
    // isAdmin,
    formidable(),
    updateProductController
  );

router.post('/products-filter',productFiltersController);


router.get('/product-count',productCountController);

router.get('/product-list/:page',productListController);

export default router;
