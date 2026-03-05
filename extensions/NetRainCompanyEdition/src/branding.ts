export interface BrandingConfig {
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export const defaultBranding: BrandingConfig = {
  logoUrl: "/netrain/logo.png",
  primaryColor: "#1E88E5",
  secondaryColor: "#FFFFFF",
};
