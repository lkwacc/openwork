export function initWeaviateClient(_url: string, _apiKey?: string) {
  if (!_url || _url.includes("placeholder")) {
    console.warn("WEAVIATE_URL is a placeholder. Replace with a real Weaviate Cloud URL before production.");
  }
  return null;
}

export function writeEmbedding(_tenantId: string, _embedding: number[], _payload?: any) {
  return true;
}
