import { Router } from "express";
import { requireAdmin } from "../middleware/auth.js";
import { uploadImage } from "../middleware/upload.js";
import {
  handleCreateCompany,
  handleDeleteCompany,
  handleListCompanies,
  handleUpdateCompany,
} from "../handlers/companies.handler.js";

export const companiesRouter: Router = Router();

// Pública: la consume el carrusel de logos del sitio.
companiesRouter.get("/companies", (req, res, next) => {
  handleListCompanies(req, res).catch(next);
});

companiesRouter.post("/admin/companies", requireAdmin, uploadImage, (req, res, next) => {
  handleCreateCompany(req, res).catch(next);
});

companiesRouter.put("/admin/companies/:id", requireAdmin, uploadImage, (req, res, next) => {
  handleUpdateCompany(req, res).catch(next);
});

companiesRouter.delete("/admin/companies/:id", requireAdmin, (req, res, next) => {
  handleDeleteCompany(req, res).catch(next);
});
