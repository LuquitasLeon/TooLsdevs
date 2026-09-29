import { Router } from "express";
import { requireAdmin } from "../middleware/auth.js";
import { uploadImage } from "../middleware/upload.js";
import {
  handleCreateTeamMember,
  handleDeleteTeamMember,
  handleListTeam,
  handleUpdateTeamMember,
} from "../handlers/team.handler.js";

export const teamRouter: Router = Router();

// Pública: la consume la sección de fundadores del sitio.
teamRouter.get("/team", (req, res, next) => {
  handleListTeam(req, res).catch(next);
});

teamRouter.post("/admin/team", requireAdmin, uploadImage, (req, res, next) => {
  handleCreateTeamMember(req, res).catch(next);
});

teamRouter.put("/admin/team/:id", requireAdmin, uploadImage, (req, res, next) => {
  handleUpdateTeamMember(req, res).catch(next);
});

teamRouter.delete("/admin/team/:id", requireAdmin, (req, res, next) => {
  handleDeleteTeamMember(req, res).catch(next);
});
