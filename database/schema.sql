----==== SYSTEM ====----

-- For Access Restriction
CREATE TABLE IF NOT EXISTS user_types (
    id SERIAL PRIMARY KEY,
    type_name TEXT NOT NULL
);

-- For Login on the system
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    type INTEGER NOT NULL REFERENCES user_types(id),
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    active BOOLEAN NOT NULL DEFAULT true
);

----==== MEMBERSHIP ====----

-- Customers and parents of young members (consider parents memebers)
CREATE TABLE IF NOT EXISTS members (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    middle_names TEXT,
    last_name TEXT,
    nickname TEXT,
    date_of_birth TIMESTAMP,
    contact_number TEXT,
    alt_number TEXT,
    email_address TEXT,
    contact_by_email BOOLEAN
);

-- References between customers and their contacts such as parents, guardians
CREATE TABLE IF NOT EXISTS member_contacts (
    member_id INTEGER NOT NULL REFERENCES members(id),
    contact_id INTEGER NOT NULL REFERENCES members(id),
    contact_reference TEXT,
    PRIMARY KEY(member_id, contact_id)
);

----==== PAYMENTS ====----

-- Methods of payment such as cash or card
CREATE TABLE IF NOT EXISTS payment_methods (
    id SERIAL PRIMARY KEY,
    type_name TEXT NOT NULL
);

-- Purchases made by members
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    member_id INTEGER REFERENCES members(id),
    method_id INTEGER NOT NULL REFERENCES payment_methods(id),
    amount INTEGER NOT NULL,
    payment_date TIMESTAMP NOT NULL DEFAULT now()
);

----==== PRODUCTS ====----

-- Items for sale available for customers
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    available BOOLEAN NOT NULL DEFAULT true
);

----==== LESSONS ====----

-- Types of lessons held at the gym such as yoga or boxing
CREATE TABLE IF NOT EXISTS lesson_types (
    id SERIAL PRIMARY KEY,
    type_name TEXT NOT NULL
);

-- Types of purchase options for lessons such as yoga (single) or boxing (monthly)
CREATE TABLE IF NOT EXISTS lesson_purchase_types (
    id SERIAL PRIMARY KEY,
    purchase_type_name TEXT NOT NULL
);

-- Pricing for lessons based on purchase type and lesson type (Kickboxing single / Boxing Monthly (Singles))
CREATE TABLE IF NOT EXISTS lesson_pricing (
    lesson_type_id INTEGER NOT NULL,
    lesson_purchase_type_id INTEGER NOT NULL,
    price INTEGER NOT NULL,
    PRIMARY KEY(lesson_type_id, lesson_purchase_type_id)
);

-- Timetabled lessons held at the gym
CREATE TABLE IF NOT EXISTS lessons (
    id SERIAL PRIMARY KEY,
    type INTEGER NOT NULL REFERENCES lesson_types(id),
    lesson_date DATE NOT NULL DEFAULT CURRENT_DATE,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    cancelled BOOLEAN NOT NULL DEFAULT false
);

----==== PURCHASING AND PAYMENTS ====----

-- Purchases of products
CREATE TABLE IF NOT EXISTS product_purchases (
    product_id INTEGER NOT NULL REFERENCES products(id),
    payment_id INTEGER NOT NULL REFERENCES payments(id),
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL,
    voided BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY(product_id, payment_id)
);

-- Purchase of lessons (single or bulk) based on purchase type
CREATE TABLE IF NOT EXISTS lesson_purchases (
    id SERIAL PRIMARY KEY,
    memeber_id INTEGER NOT NULL REFERENCES members(id),
    lesson_type_id INTEGER NOT NULL REFERENCES lesson_types(id),
    purchase_type_id INTEGER NOT NULL REFERENCES lesson_purchase_types(id),
    price INTEGER NOT NULL,
    voided BOOLEAN NOT NULL DEFAULT false,
    payment_id INTEGER REFERENCES payments(id)
);


----==== ATTENDANCE ====----

-- Internally tracked puchased tokens for bulk lesson purchases
CREATE TABLE IF NOT EXISTS tokens (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER NOT NULL REFERENCES members(id),
    lesson_type_id INTEGER NOT NULL REFERENCES lesson_types(id),
    lesson_purchase_id INTEGER NOT NULL REFERENCES lesson_purchases(id),
    activation_date DATE NOT NULL,
    expiration_date DATE,
    used BOOLEAN NOT NULL DEFAULT false
);

-- Track member attendance for lessons 
CREATE TABLE IF NOT EXISTS attendees (
    lesson_id INTEGER NOT NULL REFERENCES lessons(id),
    member_id INTEGER NOT NULL REFERENCES members(id),
    token_id INTEGER REFERENCES tokens(id),
    PRIMARY KEY(lesson_id, member_id)
);

--==== VIEWS ====--

-- Lesson Pricing List
CREATE OR REPLACE VIEW lesson_pricing_overview AS
SELECT lesson_types.type_name AS lesson_type, 
    lesson_purchase_types.purchase_type_name AS purchase_type, 
    lesson_pricing.price AS price
FROM lesson_pricing
LEFT JOIN lesson_types
ON lesson_pricing.lesson_type_id = lesson_types.id
LEFT JOIN lesson_purchase_types
ON lesson_pricing.lesson_purchase_type_id = lesson_purchase_types.id;
