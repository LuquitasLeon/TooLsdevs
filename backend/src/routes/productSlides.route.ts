import { Router } from "express";
import { requireAdmin } from "../middleware/auth.js";
import { uploadImage } from "../middleware/upload.js";
import {
  handleCreateProductSlide,
  handleDeleteProductSlide,
  handleListProductSlides,
  handleUpdateProductSlide,
} from "../handlers/productSlides.handler.js";

export const productSlidesRouter: Router = Router();

// Pública: la consume el carrusel del producto propio en Proyectos.
productSlidesRouter.get("/product-slides", (req, res, next) => {
  handleListProductSlides(req, res).catch(next);
});

productSlidesRouter.post("/admin/product-slides", requireAdmin, uploadImage, (req, res, next) => {
  handleCreateProductSlide(req, res).catch(next);
});

productSlidesRouter.put("/admin/product-slides/:id", requireAdmin, uploadImage, (req, res, next) => {
  handleUpdateProductSlide(req, res).catch(next);
});

productSlidesRouter.delete("/admin/product-slides/:id", requireAdmin, (req, res, next) => {
  handleDeleteProductSlide(req, res).catch(next);
});
