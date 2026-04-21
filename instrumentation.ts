export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      const { initializeDatabase } = await import('./lib/db');
      await initializeDatabase();
      console.log('[DB] Connected and initialized');
    } catch (err) {
      console.error('[DB] Initialization failed (app continues with fallback):', err);
    }
  }
}
