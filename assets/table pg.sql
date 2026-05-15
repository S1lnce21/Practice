CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS dogs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    breed VARCHAR(100),
    weight DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_dogs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS feedings (
    id SERIAL PRIMARY KEY,
    dog_id INTEGER NOT NULL,
    time TIMESTAMP NOT NULL,
    type VARCHAR(50) CHECK (type IN ('сухой', 'влажный', 'натуральный')),
    amount DECIMAL(6,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_feedings_dog FOREIGN KEY (dog_id) REFERENCES dogs(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS walks (
    id SERIAL PRIMARY KEY,
    dog_id INTEGER NOT NULL,
    start_time TIMESTAMP NOT NULL,
    duration INTEGER,
    stool_type VARCHAR(20) CHECK (stool_type IN ('normal', 'loose', 'constipation')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_walks_dog FOREIGN KEY (dog_id) REFERENCES dogs(id) ON DELETE CASCADE
);