const { pool } = require('../config/database');

const initTables = async () => {
  const client = await pool.connect();
  try {
    console.log('✅ Connected to PostgreSQL');

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'free',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255) NOT NULL,
        total_pages INTEGER,
        status VARCHAR(20) DEFAULT 'reading',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS quotes (
        id SERIAL PRIMARY KEY,
        book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        page_number INTEGER,
        tags TEXT[] DEFAULT '{}',
        is_favorite BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS subscriptions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        plan VARCHAR(20) DEFAULT 'free',
        status VARCHAR(20) DEFAULT 'active',
        stripe_subscription_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Reading Progress Table
      CREATE TABLE IF NOT EXISTS reading_progress (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
        pages_read INTEGER DEFAULT 0,
        reading_date DATE DEFAULT CURRENT_DATE,
        minutes_spent INTEGER DEFAULT 0,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, book_id, reading_date)
      );

      -- Reading Goals Table
      CREATE TABLE IF NOT EXISTS reading_goals (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        goal_type VARCHAR(20) NOT NULL,
        target_value INTEGER NOT NULL,
        target_period VARCHAR(20) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

       -- Reading Streaks Table (FIXED - added UNIQUE constraint)
      CREATE TABLE IF NOT EXISTS reading_streaks (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        current_streak INTEGER DEFAULT 0,
        longest_streak INTEGER DEFAULT 0,
        last_read_date DATE,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id)
      );

      CREATE INDEX IF NOT EXISTS idx_quotes_user_id ON quotes(user_id);
      CREATE INDEX IF NOT EXISTS idx_quotes_book_id ON quotes(book_id);
      CREATE INDEX IF NOT EXISTS idx_reading_progress_user_date ON reading_progress(user_id, reading_date);
      CREATE INDEX IF NOT EXISTS idx_reading_goals_user ON reading_goals(user_id);
    `);

    console.log('✅ Database tables initialized');
  } catch (err) {
    console.error('❌ Tables initialization failed:', err);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = { initTables };