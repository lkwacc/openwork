import fs from "fs";
import path from "path";
import { BrandingConfig, defaultBranding } from "./branding";

const tenantsDir = path.resolve(__dirname, "../../data/tenants");

async function ensureDir() {
  if (!fs.existsSync(tenantsDir)) {
    fs.mkdirSync(tenantsDir, { recursive: true });
  }
}

export async function onboardTenant(tenantId: string, name: string, branding?: BrandingConfig) {
  await ensureDir();
  const payload = {
    tenantId,
    name,
    branding: branding ?? defaultBranding,
    createdAt: new Date().toISOString(),
  };
  const file = path.join(tenantsDir, `${tenantId}.json`);
  fs.writeFileSync(file, JSON.stringify(payload, null, 2));
  return payload;
}

export async function getBranding(tenantId: string): Promise<BrandingConfig> {
  const file = path.join(tenantsDir, `${tenantId}.json`);
  if (fs.existsSync(file)) {
    const json = JSON.parse(fs.readFileSync(file, "utf8"));
    return json.branding ?? defaultBranding;
  }
  return defaultBranding;
}
