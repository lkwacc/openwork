import fs from 'fs';
import path from 'path';

const dataDir = path.resolve(__dirname, "../../data/tenants");

export async function ensureTenantStoreDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

export async function ensureTenantSchema(_tenantId: string) {
  return true;
}
