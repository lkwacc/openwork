export function loadExtensions(app: any) {
  try {
    const mod = require('./extensions/NetRainCompanyEdition/src/index');
    if (mod && typeof mod.initEdition === 'function') {
      mod.initEdition(app);
      console.log('[NetRainCompanyEdition] extension loaded and initialized.')
    }
  } catch (e: any) {
    console.warn('[NetRainCompanyEdition] failed to load extension:', e?.message || e);
  }
}
