-- Seed database and update dependencies once initialisation complete

-- Add default user types
INSERT INTO user_types (
    name
) VALUES (
    'admin'
), (
    'manager'
), (
    'receptionist'
);

-- Add default methods of payment
INSERT INTO payment_methods (
    name
) VALUES (
    'Cash'
), (
    'Card'
);

-- Add default lesson types
INSERT INTO lesson_types (
    name
) VALUES (
    'Boxing (Kids)'
), (
    'Boxing (Adults)'
), (
    'Kickboxing (Kids)'
), (
    'Kickboxing (Adults)'
), (
    'Yoga'
);


INSERT INTO lesson_purchase_types (
    name,
    duration_days,
    weeks,
    multiplier
) VALUES (
    -- should make 1 weekly token for 1 week
    'Single',
    7,
    1,
    1
), (
    -- should make 1 weekly token every week for 4 weeks
    'Monthly (Single)',
    7,
    4,
    1
), (
    -- should make 2 weekly token every week for 4 weeks
    'Monthly (Double)',
    7,
    4,
    2
), (
    'Monthly (Triple)',
    7,
    4,
    3
), (
    'Monthly (Unlimited)',
    7,
    4,
    7
);


INSERT INTO lesson_pricing (
    lesson_type_id,
    lesson_purchase_type_id,
    price
) VALUES (
    (SELECT id FROM lesson_types WHERE name = 'Boxing (Kids)'),
    (SELECT id FROM lesson_purchase_types WHERE name = 'Single'),
    500
), (
    (SELECT id FROM lesson_types WHERE name = 'Boxing (Kids)'),
    (SELECT id FROM lesson_purchase_types WHERE name = 'Monthly (Single)'),
    1800
),(
    (SELECT id FROM lesson_types WHERE name = 'Boxing (Adults)'),
    (SELECT id FROM lesson_purchase_types WHERE name = 'Single'),
    600
), (
    (SELECT id FROM lesson_types WHERE name = 'Boxing (Adults)'),
    (SELECT id FROM lesson_purchase_types WHERE name = 'Monthly (Single)'),
    2200
), (
    (SELECT id FROM lesson_types WHERE name = 'Boxing (Adults)'),
    (SELECT id FROM lesson_purchase_types WHERE name = 'Monthly (Double)'),
    4000
),(
    (SELECT id FROM lesson_types WHERE name = 'Kickboxing (Kids)'),
    (SELECT id FROM lesson_purchase_types WHERE name = 'Single'),
    500
), (
    (SELECT id FROM lesson_types WHERE name = 'Kickboxing (Kids)'),
    (SELECT id FROM lesson_purchase_types WHERE name = 'Monthly (Single)'),
    1800
), (
    (SELECT id FROM lesson_types WHERE name = 'Kickboxing (Kids)'),
    (SELECT id FROM lesson_purchase_types WHERE name = 'Monthly (Double)'),
    3600
),(
    (SELECT id FROM lesson_types WHERE name = 'Kickboxing (Adults)'),
    (SELECT id FROM lesson_purchase_types WHERE name = 'Single'),
    600
), (
    (SELECT id FROM lesson_types WHERE name = 'Kickboxing (Adults)'),
    (SELECT id FROM lesson_purchase_types WHERE name = 'Monthly (Single)'),
    2200
), (
    (SELECT id FROM lesson_types WHERE name = 'Kickboxing (Adults)'),
    (SELECT id FROM lesson_purchase_types WHERE name = 'Monthly (Double)'),
    4000
), (
    (SELECT id FROM lesson_types WHERE name = 'Kickboxing (Adults)'),
    (SELECT id FROM lesson_purchase_types WHERE name = 'Monthly (Triple)'),
    5500
),(
    (SELECT id FROM lesson_types WHERE name = 'Kickboxing (Adults)'),
    (SELECT id FROM lesson_purchase_types WHERE name = 'Monthly (Unlimited)'),
    6000
),(
    (SELECT id FROM lesson_types WHERE name = 'Yoga'),
    (SELECT id FROM lesson_purchase_types WHERE name = 'Single'),
    700
);

-- Create default admin account for initial setup
INSERT INTO users (
    username,
    password,
    type
) VALUES (
    'admin', 
    '$2b$05$TjDOIoPwtKz.Nc21nUyld.e6rV9lWFLknRdyTY0993qlsvnsGbiHa', 
    (SELECT id FROM user_types WHERE name = 'admin' LIMIT 1)
);

-- Add genesis admin account created by itself
-- The constraint will be checked immediately, 
--   so the table data must satisfy the constraint before it can be added.
UPDATE users
SET created_by = (SELECT id from users WHERE username = 'admin' LIMIT 1)
WHERE username = 'admin';

-- Add not null to require creation user for new account
ALTER TABLE users ALTER COLUMN created_by SET NOT NULL;


INSERT INTO users (
    username,
    password,
    type,
    created_by
) VALUES (
    'dan', 
    '$2b$05$nbIHnnSx4WkD48SNo/ZfEePiylwK57gHW.NjEaLJ8mPrwiZmO6U3m', 
    (SELECT id FROM user_types WHERE name = 'manager' LIMIT 1),
    (SELECT id from users WHERE username = 'admin' LIMIT 1)
);


INSERT INTO members (
    first_name,
    last_name,
    contact_number,
    email_address,
    grade,
    licensed,
    outstanding,
    primary_contact,
    primary_contact_number,
    contact_by_email
) VALUES (
    'Jazer',
    'Barclay',
    '07759228812',
    'jazerbarclay@hotmail.com',
    'Red',
    false,
    '0',
    'John',
    '07759228812',
    true
), (
    'Sophie',
    'Ryan',
    '07761044488',
    'sophieryan6996@gmail.com',
    'Yellow',
    true,
    '0',
    'David',
    '07759228812',
    true
);


INSERT INTO products (
    name,
    price
) VALUES (
    'T-Shirt',
    1500
),(
    'Vest',
    1500
),(
    'Trousers',
    1500
),(
    'Shorts',
    1500
),(
    'Hoodie (Child)',
    2500
),(
    'Hoodie (Adult)',
    3000
),(
    'Onsie (Child)',
    3000
),(
    'Onsie (Adult',
    3500
),(
    'Snap Back',
    1750
),(
    'Beanie',
    1500
),(
    'Boxing Gloves',
    2000
),(
    'Leg Pads (Foam)',
    1500
),(
    'Leg Pads (Competition)',
    1599
),(
    'Foot Guards',
    1500
),(
    'Gum Shield',
    250
),(
    'Hand Wraps',
    500
),(
    'Head Guard',
    2500
);


INSERT INTO lessons (
    type_id,
    date,
    start_time,
    end_time
) VALUES (
    (SELECT id FROM lesson_types WHERE name = 'Kickboxing (Adults)' LIMIT 1),
    CURRENT_DATE,
    (SELECT CURRENT_DATE + interval '10 hours'),
    (SELECT CURRENT_DATE + interval '12 hours')
),(
    (SELECT id FROM lesson_types WHERE name = 'Kickboxing (Kids)' LIMIT 1),
    CURRENT_DATE,
    (SELECT CURRENT_DATE + interval '12 hours'),
    (SELECT CURRENT_DATE + interval '15 hours')
);


INSERT INTO payments (
    member_id,
    method_id,
    total
) VALUES (
    (SELECT id FROM members WHERE first_name = 'Jazer' LIMIT 1),
    (SELECT id FROM payment_methods WHERE name = 'Cash' LIMIT 1),
    3000
), (
    (SELECT id FROM members WHERE first_name = 'Jazer' LIMIT 1),
    (SELECT id FROM payment_methods WHERE name = 'Cash' LIMIT 1),
    500
), (
    (SELECT id FROM members WHERE first_name = 'Jazer' LIMIT 1),
    (SELECT id FROM payment_methods WHERE name = 'Cash' LIMIT 1),
    400
), (
    (SELECT id FROM members WHERE first_name = 'Jazer' LIMIT 1),
    (SELECT id FROM payment_methods WHERE name = 'Cash' LIMIT 1),
    300
), (
    (SELECT id FROM members WHERE first_name = 'Jazer' LIMIT 1),
    (SELECT id FROM payment_methods WHERE name = 'Cash' LIMIT 1),
    200
);

INSERT INTO lesson_purchases (
    member_id,
    lesson_type_id,
    purchase_type_id,
    price,
    payment_id
) VALUES (
    (SELECT id FROM members WHERE first_name = 'Jazer' LIMIT 1),
    (SELECT id FROM lesson_types WHERE name = 'Kickboxing (Kids)' LIMIT 1),
    (SELECT id FROM lesson_purchase_types WHERE name = 'Single' LIMIT 1),
    500,
    (SELECT id FROM payments WHERE total = 500 LIMIT 1)
);


INSERT INTO product_purchases (
    product_id,
    payment_id,
    quantity,
    price
) VALUES (
    (SELECT id FROM products WHERE name = 'T-Shirt' LIMIT 1),
    (SELECT id FROM payments WHERE total = 3000 LIMIT 1),
    1,
    1500
), (
    (SELECT id FROM products WHERE name = 'Trousers' LIMIT 1),
    (SELECT id FROM payments WHERE total = 3000 LIMIT 1),
    1,
    1500
);

INSERT INTO tokens (
    member_id,
    lesson_type_id,
    lesson_purchase_id
) VALUES (
    (SELECT id FROM members WHERE first_name = 'Jazer' LIMIT 1),
    (SELECT id FROM lesson_types WHERE name = 'Kickboxing (Kids)' LIMIT 1),
    (SELECT id FROM lesson_purchase_types WHERE name = 'Single' LIMIT 1)
);

INSERT INTO attendees (
    lesson_id,
    member_id,
    token_id
) VALUES (
    (SELECT id FROM lessons WHERE id = 1 LIMIT 1),
    (SELECT id FROM members WHERE first_name = 'Jazer' LIMIT 1),
    (SELECT id FROM tokens WHERE member_id = 1 LIMIT 1)
);