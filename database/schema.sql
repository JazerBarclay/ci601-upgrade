----==== SYSTEM ====----

-- For Access Restriction
CREATE TABLE IF NOT EXISTS user_types (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
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

----==== MEMBERS ====----

-- Customers and parents of young members (consider parents members)
CREATE TABLE IF NOT EXISTS members (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    contact_number TEXT,
    email_address TEXT,
    grade TEXT,
    licensed BOOLEAN,
    outstanding TEXT,
    contact_by_email BOOLEAN NOT NULL DEFAULT false,
    primary_contact TEXT,
    primary_contact_number TEXT,
    secondary_contact TEXT,
    secondary_contact_number TEXT,
    notes TEXT,
    signup_date DATE NOT NULL DEFAULT now()
);

CREATE OR REPLACE VIEW members_view AS
SELECT 
    id,
    CONCAT(last_name, ', ', first_name) AS display_name,
    first_name,
    last_name,
    contact_number,
    email_address,
    grade,
    licensed,
    outstanding,
    contact_by_email,
    primary_contact,
    primary_contact_number,
    secondary_contact,
    secondary_contact_number,
    notes
FROM members
ORDER BY last_name;

----==== PAYMENTS ====----

-- Methods of payment such as cash or card
CREATE TABLE IF NOT EXISTS payment_methods (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

-- View payment methods
CREATE OR REPLACE VIEW payment_methods_view AS
SELECT
    id,
    name
FROM payment_methods;


-- Purchases made by members
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    member_id INTEGER REFERENCES members(id),
    method_id INTEGER NOT NULL REFERENCES payment_methods(id),
    total INTEGER NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT now()
);

-- Payments view including all names and display text
CREATE OR REPLACE VIEW payments_view AS
SELECT 
    p.id,
    CONCAT(
        SUBSTRING(m.first_name, 1, 1), '.', m.last_name, 
        ' - £', 
        (round(p.total / 100::numeric, 2))) 
        AS display_text,
    member_id,
    CONCAT(m.first_name, ' ', m.last_name) AS member_name,
    method_id,
    pm.name AS method_name,
    p.total,
    p.date
FROM payments AS p
LEFT JOIN members AS m
ON p.member_id = m.id
LEFT JOIN payment_methods AS pm
ON p.method_id = pm.id
ORDER BY p.date DESC;

----==== PRODUCTS ====----

-- Items for sale available for customers
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    available BOOLEAN NOT NULL DEFAULT true
);

CREATE OR REPLACE VIEW products_view AS
SELECT
    id,
    name,
    price
FROM products
WHERE available = true;

----==== LESSONS ====----

-- Types of lessons held at the gym such as yoga or boxing
CREATE TABLE IF NOT EXISTS lesson_types (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE OR REPLACE VIEW lesson_types_view AS
SELECT
    id, 
    name
FROM lesson_types;

-- Types of purchase options for lessons such as yoga (single) or boxing (monthly)
CREATE TABLE IF NOT EXISTS lesson_purchase_types (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    duration_days INTEGER NOT NULL,
    weeks INTEGER NOT NULL DEFAULT 1,
    multiplier INTEGER NOT NULL DEFAULT 1
);

CREATE OR REPLACE VIEW lesson_purchase_types_view AS
SELECT
    id,
    name,
    duration_days,
    weeks,
    multiplier
FROM lesson_purchase_types;

-- Pricing for lessons based on purchase type and lesson type (Kickboxing single / Boxing Monthly (Singles))
CREATE TABLE IF NOT EXISTS lesson_pricing (
    id SERIAL,
    lesson_type_id INTEGER NOT NULL,
    lesson_purchase_type_id INTEGER NOT NULL,
    price INTEGER NOT NULL,
    PRIMARY KEY(lesson_type_id, lesson_purchase_type_id)
);


CREATE OR REPLACE VIEW lesson_pricing_view AS
SELECT
    lp.id,
    CONCAT(lt.name, ' - ', lpt.name) AS display_text,
    lp.lesson_type_id,
    lt.name AS lesson_type_name,
    lp.lesson_purchase_type_id,
    lpt.name AS purchase_type_name, 
    lp.price AS price
FROM lesson_pricing AS lp
LEFT JOIN lesson_types AS lt
ON lp.lesson_type_id = lt.id
LEFT JOIN lesson_purchase_types AS lpt
ON lp.lesson_purchase_type_id = lpt.id;


-- Timetabled lessons held at the gym
CREATE TABLE IF NOT EXISTS lessons (
    id SERIAL PRIMARY KEY,
    type_id INTEGER NOT NULL REFERENCES lesson_types(id),
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    cancelled BOOLEAN NOT NULL DEFAULT false
);

CREATE OR REPLACE VIEW lessons_view AS
SELECT
    l.id,
    CONCAT( l.date, ' @ ', SUBSTRING(CAST(l.start_time AS TEXT), 1, 5), ' - ', lt.name) AS display_text,
    l.type_id,
    lt.name,
    l.date,
    SUBSTRING(CAST(l.start_time AS TEXT), 1, 5) AS start_time,
    SUBSTRING(CAST(l.end_time AS TEXT), 1, 5) AS end_time,
    l.cancelled
FROM lessons AS l
LEFT JOIN lesson_types as lt
ON l.type_id = lt.id
ORDER BY l.date DESC, l.start_time DESC;


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

-- TODO: Add product purchase part

-- Purchase of lessons (single or bulk) based on purchase type
CREATE TABLE IF NOT EXISTS lesson_purchases (
    id SERIAL PRIMARY KEY,
    member_id INTEGER NOT NULL REFERENCES members(id),
    lesson_type_id INTEGER NOT NULL REFERENCES lesson_types(id),
    purchase_type_id INTEGER NOT NULL REFERENCES lesson_purchase_types(id),
    price INTEGER NOT NULL,
    voided BOOLEAN NOT NULL DEFAULT false,
    payment_id INTEGER REFERENCES payments(id)
);


CREATE OR REPLACE VIEW lesson_purchases_view AS
SELECT
    lp.id,
    CONCAT(
        lt.name,
        ' - ', 
        SUBSTRING(m.first_name, 1, 1), 
        '.', 
        m.last_name, 
        ' - £', 
        (round(p.total / 100::numeric, 2))
    )
    AS display_text,
    lp.member_id,
    CONCAT(m.first_name, ' ', m.last_name) AS member_name,
    lp.lesson_type_id,
    lt.name AS lesson_type_name,
    lp.purchase_type_id,
    lpt.name AS purchase_type_name,
    lpr.price AS calculated_price,
    lp.price AS purchase_price,
    lp.voided,
    lp.payment_id,
    p.total AS payment_total
FROM lesson_purchases AS lp
LEFT JOIN members AS m
ON lp.member_id = m.id
LEFT JOIN lesson_types AS lt
ON lp.lesson_type_id = lt.id
LEFT JOIN lesson_purchase_types AS lpt
ON lp.purchase_type_id = lpt.id
LEFT JOIN payments as p
ON lp.payment_id = p.id
LEFT JOIN lesson_pricing AS lpr
ON lp.lesson_type_id = lpr.lesson_type_id
AND lp.purchase_type_id = lpr.lesson_purchase_type_id;


----==== ATTENDANCE ====----

-- Internally tracked puchased tokens for bulk lesson purchases
CREATE TABLE IF NOT EXISTS tokens (
    id SERIAL PRIMARY KEY,
    member_id INTEGER NOT NULL REFERENCES members(id),
    lesson_type_id INTEGER REFERENCES lesson_types(id),
    lesson_purchase_id INTEGER REFERENCES lesson_purchases(id),
    activation_date DATE NOT NULL DEFAULT now(),
    expiration_date DATE,
    used BOOLEAN NOT NULL DEFAULT false
);

CREATE OR REPLACE VIEW tokens_view AS
SELECT 
    t.id,
    CONCAT('TK', t.id, ': ', SUBSTRING(m.first_name, 1, 1), '.', SUBSTRING(m.last_name, 1, 1), ' - ', lt.name) AS display_text,
    t.member_id,
    CONCAT(m.first_name, ' ', m.last_name) AS member_name,
    t.lesson_type_id,
    lt.name AS lesson_name,
    t.lesson_purchase_id,
    activation_date,
    expiration_date,
    used
FROM tokens AS t
LEFT JOIN members AS m
ON t.member_id = m.id
LEFT JOIN lesson_types AS lt
ON t.lesson_type_id = lt.id
ORDER BY activation_date ASC, t.id ASC;

CREATE OR REPLACE VIEW tokens_active_view AS
SELECT * FROM tokens_view
WHERE used = false;

-- Track member attendance for lessons 
CREATE TABLE IF NOT EXISTS attendees (
    id SERIAL,
    lesson_id INTEGER NOT NULL REFERENCES lessons(id),
    member_id INTEGER NOT NULL REFERENCES members(id),
    token_id INTEGER REFERENCES tokens(id),
    attendance_date TIMESTAMP NOT NULL DEFAULT now(),
    PRIMARY KEY(lesson_id, member_id)
);


CREATE OR REPLACE VIEW attendees_view AS
SELECT
    a.id,
    a.lesson_id,
    lv.display_text AS lesson_title,
    a.member_id,
    CONCAT(m.first_name, ' ', m.last_name) AS member_name,
    a.token_id,
    a.attendance_date
FROM attendees AS a
LEFT JOIN lessons_view as lv
ON a.lesson_id = lv.id
LEFT JOIN members as m
ON a.member_id = m.id;
