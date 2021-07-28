import { Pool } from 'pg';

const pool = new Pool ({
    max: 20,
    connectionString: "postgres://postgres:postgres@127.0.0.1:5432/postgres",
    idleTimeoutMillis: 30000
});

export default pool;