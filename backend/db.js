// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Optional: test connection when file is run directly
if (require.main === module) {
    (async () => {
        try {
            const res = await pool.query('SELECT NOW()');
            console.log('✅ Database connected:', res.rows[0]);
        } catch (err) {
            console.error('❌ Database error:', err);
        }
    })();
}

module.exports = pool;
