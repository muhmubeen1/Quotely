const app = require('./src/app');
const { testConnection } = require('./src/config/database');
const { initTables } = require('./src/models/initDB');

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        // Connect to database
        await testConnection();

        // Create tables
        await initTables();

        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

start();