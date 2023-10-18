import 'dotenv/config';

import type { Config } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing');
}

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
  breakpoints: true,
  // Enabling breakpoints will ensure that your generated migration file won’t execute multiple DDL statements in one transaction,
  // which isn’t supported by all database drivers.
} satisfies Config;
