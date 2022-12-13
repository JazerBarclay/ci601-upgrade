-- Seed database and update dependencies once initialisation complete

-- Add default user types
INSERT INTO user_types (
    type_name
) VALUES (
    'admin'
), (
    'manager'
), (
    'receptionist'
);

-- Add default methods of payment
INSERT INTO payment_methods (
    type_name
) VALUES (
    'Cash'
), (
    'Card'
);

-- Add default lesson types
INSERT INTO lesson_types (
    type_name
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
    purchase_type_name
) VALUES (
    'Single'
), (
    'Monthly (Single)'
), (
    'Monthly (Double)'
), (
    'Monthly (Triple)'
), (
    'Monthly (Unlimited)'
);


INSERT INTO lesson_pricing (
    lesson_type_id,
    lesson_purchase_type_id,
    price
) VALUES (
    (SELECT id FROM lesson_types WHERE type_name = 'Boxing (Kids)'),
    (SELECT id FROM lesson_purchase_types WHERE purchase_type_name = 'Single'),
    500
), (
    (SELECT id FROM lesson_types WHERE type_name = 'Boxing (Kids)'),
    (SELECT id FROM lesson_purchase_types WHERE purchase_type_name = 'Monthly (Single)'),
    1800
),(
    (SELECT id FROM lesson_types WHERE type_name = 'Boxing (Adults)'),
    (SELECT id FROM lesson_purchase_types WHERE purchase_type_name = 'Single'),
    600
), (
    (SELECT id FROM lesson_types WHERE type_name = 'Boxing (Adults)'),
    (SELECT id FROM lesson_purchase_types WHERE purchase_type_name = 'Monthly (Single)'),
    2200
), (
    (SELECT id FROM lesson_types WHERE type_name = 'Boxing (Adults)'),
    (SELECT id FROM lesson_purchase_types WHERE purchase_type_name = 'Monthly (Double)'),
    4000
),(
    (SELECT id FROM lesson_types WHERE type_name = 'Kickboxing (Kids)'),
    (SELECT id FROM lesson_purchase_types WHERE purchase_type_name = 'Single'),
    500
), (
    (SELECT id FROM lesson_types WHERE type_name = 'Kickboxing (Kids)'),
    (SELECT id FROM lesson_purchase_types WHERE purchase_type_name = 'Monthly (Single)'),
    1800
), (
    (SELECT id FROM lesson_types WHERE type_name = 'Kickboxing (Kids)'),
    (SELECT id FROM lesson_purchase_types WHERE purchase_type_name = 'Monthly (Double)'),
    3600
),(
    (SELECT id FROM lesson_types WHERE type_name = 'Kickboxing (Adults)'),
    (SELECT id FROM lesson_purchase_types WHERE purchase_type_name = 'Single'),
    600
), (
    (SELECT id FROM lesson_types WHERE type_name = 'Kickboxing (Adults)'),
    (SELECT id FROM lesson_purchase_types WHERE purchase_type_name = 'Monthly (Single)'),
    2200
), (
    (SELECT id FROM lesson_types WHERE type_name = 'Kickboxing (Adults)'),
    (SELECT id FROM lesson_purchase_types WHERE purchase_type_name = 'Monthly (Double)'),
    4000
), (
    (SELECT id FROM lesson_types WHERE type_name = 'Kickboxing (Adults)'),
    (SELECT id FROM lesson_purchase_types WHERE purchase_type_name = 'Monthly (Triple)'),
    5500
),(
    (SELECT id FROM lesson_types WHERE type_name = 'Kickboxing (Adults)'),
    (SELECT id FROM lesson_purchase_types WHERE purchase_type_name = 'Monthly (Unlimited)'),
    6000
),(
    (SELECT id FROM lesson_types WHERE type_name = 'Yoga'),
    (SELECT id FROM lesson_purchase_types WHERE purchase_type_name = 'Single'),
    700
);

-- Create default admin account for initial setup
INSERT INTO users (
    username,
    password,
    type
) VALUES (
    'admin', 
    'password', 
    (SELECT id FROM user_types WHERE type_name = 'admin' LIMIT 1)
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
    'a1b2c3', 
    (SELECT id FROM user_types WHERE type_name = 'manager' LIMIT 1),
    (SELECT id from users WHERE username = 'admin' LIMIT 1)
);


INSERT INTO members (
    first_name,
    middle_names,
    last_name,
    nickname,
    contact_number,
    email_address
) VALUES (
    'Jazer',
    'John',
    'Barclay',
    'Jazz',
    '07759228812',
    'jazerbarclay@hotmail.com'
), (
    'Sophie',
    'Leanne',
    'Ryan',
    'Soph',
    '07761044488',
    'sophieryan6996@gmail.com'
);


INSERT INTO member_contacts (
    member_id,
    contact_id,
    contact_reference
) VALUES (
    (SELECT id FROM members WHERE first_name = 'Jazer' LIMIT 1),
    (SELECT id FROM members WHERE first_name = 'Sophie' LIMIT 1),
    'Girlfriend'
),(
    (SELECT id FROM members WHERE first_name = 'Sophie' LIMIT 1),
    (SELECT id FROM members WHERE first_name = 'Jazer' LIMIT 1),
    'Boyfriend'
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
    type,
    lesson_date,
    start_time,
    end_time
) VALUES (
    (SELECT id FROM lesson_types WHERE type_name = 'Kickboxing (Adults)' LIMIT 1),
    CURRENT_DATE,
    (SELECT now() + interval '2 hours'),
    (SELECT now() + interval '3 hours')
);


INSERT INTO payments (
    member_id,
    method_id,
    amount
) VALUES (
    (SELECT id FROM members WHERE first_name = 'Jazer' LIMIT 1),
    (SELECT id FROM payment_methods WHERE type_name = 'Cash' LIMIT 1),
    3000
), (
    (SELECT id FROM members WHERE first_name = 'Jazer' LIMIT 1),
    (SELECT id FROM payment_methods WHERE type_name = 'Cash' LIMIT 1),
    0
);


INSERT INTO product_purchases (
    product_id,
    payment_id,
    quantity,
    price
) VALUES (
    (SELECT id FROM products WHERE name = 'T-Shirt' LIMIT 1),
    (SELECT id FROM payments WHERE amount = 3000 LIMIT 1),
    1,
    1500
), (
    (SELECT id FROM products WHERE name = 'Trousers' LIMIT 1),
    (SELECT id FROM payments WHERE amount = 3000 LIMIT 1),
    1,
    1500
);

