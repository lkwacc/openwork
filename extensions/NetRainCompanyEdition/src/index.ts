import express from "express";
import path from "path";
import { onboardTenant, getBranding } from "./tenant";
import { onboardTenant, getBranding } from "./tenant";
import { BrandingConfig } from "./branding";
import dotenv from "dotenv";
import { setupDemoRoutes } from "./demo";

dotenv.config();

export interface EditionConfig {
  weaviateCloudUrl?: string;
  weaviateApiKey?: string;
}

export function initEdition(app: any, config?: EditionConfig) {
  const router = express.Router();

  router.post("/onboard", async (req: any, res: any) => {
    const { tenantId, name, branding } = req.body;
    try {
      const t = await onboardTenant(tenantId, name, branding as BrandingConfig);
      res.json({ ok: true, tenant: t });
    } catch (e: any) {
      res.status(500).json({ ok: false, error: e?.message ?? String(e) });
    }
  });

  router.get("/branding/:tenantId", async (req: any, res: any) => {
    const tenantId = req.params.tenantId;
    const branding = await getBranding(tenantId);
    res.json({ branding });
  });

  app.use("/netrain", router);
  app.use("/netrain", express.static(path.join(__dirname, "src")));
  setupDemoRoutes(app);
  setupDemoRoutes(app);
}

export default { initEdition };
