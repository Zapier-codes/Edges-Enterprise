const { Pool } = require('pg')

// Supabase session pooler (port 5432): IPv4-reachable from Vercel's serverless
// functions (the direct DB host is IPv6-only), and unlike the 6543 transaction
// pooler, session mode supports prepared statements, which the `pg` driver uses.
// DATABASE_URL should look like:
// postgresql://postgres.xmtrpirnditotpyhqiwk:<password>@aws-0-eu-central-1.pooler.supabase.com:5432/postgres
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: Number(process.env.DB_POOL_MAX) || 10,
    idleTimeoutMillis: 30000,
})

pool.on('error', (err) => {
    // fired on idle clients that error in the background, not from a query call site
    console.error('Unexpected Postgres pool error:', err.message)
})

module.exports = async function connectDB() {
    try {
        const client = await pool.connect()
        const { rows } = await client.query('select now()')
        client.release()
        console.log('Supabase (session pooler) connected at ' + rows[0].now)
    } catch (error) {
        if (process.env.NODE_ENV === 'development')
            console.log(error);
        else
            console.log('Database connection failed. Exiting!');
        process.exit(1)
    }
}

module.exports.pool = pool

