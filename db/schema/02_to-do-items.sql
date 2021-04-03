-- Drop and recreate To Do Items table

DROP TABLE IF EXISTS to-do-items CASCADE;
CREATE TABLE widgets (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(225) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(32) NOT NULL,
  deleted BOOLEAN DEFAULT FALSE
);
