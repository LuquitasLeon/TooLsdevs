import { Router } from "express";
import { requireAdmin } from "../middleware/auth.js";
import { adminLoginRateLimit } from "../middleware/rateLimit.js";
import { handleAdminLogin, handleAdminLogout, handleAdminMe } from "../handlers/auth.handler.js";

export const authRouter: Router = Router();

authRouter.post("/admin/login", adminLoginRateLimit, (req, res, next) => {
  handleAdminLogin(req, res).catch(next);
});

authRouter.post("/admin/logout", handleAdminLogout);

authRouter.get("/admin/me", requireAdmin, handleAdminMe);
