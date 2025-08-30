-- +goose Up
-- +goose StatementBegin
-- Drop existing profiles table if it exists and recreate with proper schema
DROP TABLE IF EXISTS profiles;

-- Create profiles table with proper schema
CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL UNIQUE,
    display_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    prefecture VARCHAR(100),
    city VARCHAR(100),
    organization VARCHAR(255),
    role VARCHAR(100),
    activity_years INTEGER,
    bio TEXT,
    avatar_url VARCHAR(500),
    interests JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on user_id for better performance
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS profiles;
-- +goose StatementEnd