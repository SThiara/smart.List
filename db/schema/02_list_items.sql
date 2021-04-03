-- Drop and recreate List Items table

DROP TABLE IF EXISTS list_items CASCADE;
CREATE TABLE list_items (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(225) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(32) NOT NULL,
  deleted BOOLEAN DEFAULT FALSE
);
