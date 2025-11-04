CREATE TYPE user_role AS ENUM ('student_staff', 'admin');
CREATE TYPE item_status AS ENUM ('lost', 'found', 'claimed', 'archived');
CREATE TYPE claim_status AS ENUM ('pending', 'approved', 'rejected');

-- Users and Roles
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_role user_role NOT NULL DEFAULT 'student_staff',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Static lookup tables for categories and locations
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- Core table for lost and found items
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status item_status NOT NULL,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    location_id INTEGER NOT NULL REFERENCES locations(id),
    reported_by_id INTEGER NOT NULL REFERENCES users(id),
    -- The user who found/claimed the item
    handler_id INTEGER REFERENCES users(id),
    reported_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    event_date DATE NOT NULL,
    item_image_url VARCHAR(255)
);

-- Table for managing claims on found items
CREATE TABLE claims (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    claimant_id INTEGER NOT NULL REFERENCES users(id),
    description TEXT NOT NULL,
    status claim_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    resolved_at TIMESTAMPTZ,
    resolved_by_id INTEGER REFERENCES users(id), -- Admin who resolved it
    UNIQUE (item_id, claimant_id) -- A user can only claim an item once
);

-- Indexes for performance
CREATE INDEX idx_items_status ON items(status);
CREATE INDEX idx_items_category_id ON items(category_id);
CREATE INDEX idx_items_location_id ON items(location_id);
CREATE INDEX idx_claims_status ON claims(status);