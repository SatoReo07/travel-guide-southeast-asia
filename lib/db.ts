import { Pool } from 'pg';
import { countries as seedData, type Country } from './countries';

declare global {
  // HMR でプールが重複生成されないようにグローバルに保持
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

function getPool(): Pool {
  if (!global._pgPool) {
    const ssl = process.env.DB_SSL === 'true'
      ? { rejectUnauthorized: false }
      : undefined;

    global._pgPool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'travel_guide',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      ssl,
    });
  }
  return global._pgPool;
}

export async function initializeDatabase(): Promise<void> {
  const pool = getPool();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS countries (
      slug        TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      capital     TEXT NOT NULL,
      flag        TEXT NOT NULL,
      description TEXT NOT NULL,
      spots       JSONB NOT NULL,
      best_season TEXT NOT NULL
    )
  `);

  const { rowCount } = await pool.query('SELECT 1 FROM countries LIMIT 1');
  if (rowCount === 0) {
    for (const c of seedData) {
      await pool.query(
        `INSERT INTO countries (slug, name, capital, flag, description, spots, best_season)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (slug) DO NOTHING`,
        [c.slug, c.name, c.capital, c.flag, c.description, JSON.stringify(c.spots), c.bestSeason]
      );
    }
    console.log('[DB] Seeded 10 countries');
  }
}

export async function getCountries(): Promise<Country[]> {
  const { rows } = await getPool().query<Country>(
    `SELECT slug, name, capital, flag, description, spots,
            best_season AS "bestSeason"
     FROM countries ORDER BY name`
  );
  return rows;
}

export async function getCountryBySlug(slug: string): Promise<Country | null> {
  const { rows } = await getPool().query<Country>(
    `SELECT slug, name, capital, flag, description, spots,
            best_season AS "bestSeason"
     FROM countries WHERE slug = $1`,
    [slug]
  );
  return rows[0] ?? null;
}
