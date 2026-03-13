-- ============================================================
-- Seed: Migrate existing mockdata.json into Postgres tables
-- ============================================================

-- ------------------------------------------------------------
-- 1. CUSTOMERS (12 records)
-- ------------------------------------------------------------
insert into customers (id, name, avatar, email, phone, location, total_orders, total_spent, status, join_date) values
  ('a1000001-0000-0000-0000-000000000001', 'Joe Martin',   'https://ui-avatars.com/api/?name=Joe+Martin&background=7C3AED&color=fff',   'joe.martin@email.com',  '821 456 269', '132, My Street BG',   12, 458.50,  'Active',   '2024-01-15'),
  ('a1000001-0000-0000-0000-000000000002', 'Peterson',     'https://ui-avatars.com/api/?name=Peterson&background=10B981&color=fff',     'peterson@email.com',    '821 456 264', '8, My Street, Lagos', 8,  312.00,  'Active',   '2024-02-20'),
  ('a1000001-0000-0000-0000-000000000003', 'Shaleena',     'https://ui-avatars.com/api/?name=Shaleena&background=F59E0B&color=fff',     'shaleena@email.com',    '821 456 267', '33 3rd Ave, NY',      5,  189.75,  'Active',   '2024-03-10'),
  ('a1000001-0000-0000-0000-000000000004', 'Patrik',       'https://ui-avatars.com/api/?name=Patrik&background=EF4444&color=fff',       'patrik@email.com',      '821 456 265', '400 Broom St, NY',    2,  67.30,   'Inactive', '2024-04-05'),
  ('a1000001-0000-0000-0000-000000000005', 'Angeline',     'https://ui-avatars.com/api/?name=Angeline&background=3B82F6&color=fff',     'angeline@email.com',    '821 456 266', '25 U Square, NY',     15, 623.40,  'Active',   '2024-01-02'),
  ('a1000001-0000-0000-0000-000000000006', 'Denver',       'https://ui-avatars.com/api/?name=Denver&background=8B5CF6&color=fff',       'denver@email.com',      '821 456 261', '28 U Square, NY',     7,  284.90,  'Active',   '2024-02-14'),
  ('a1000001-0000-0000-0000-000000000007', 'Jamison',      'https://ui-avatars.com/api/?name=Jamison&background=EC4899&color=fff',      'jamison@email.com',     '821 456 261', '22 Seal Street, NY',  10, 415.60,  'Active',   '2023-12-28'),
  ('a1000001-0000-0000-0000-000000000008', 'Angeline M.',  'https://ui-avatars.com/api/?name=Angeline+M&background=14B8A6&color=fff',  'angeline.m@email.com',  '821 456 270', '50 Park Ave, NY',     1,  24.99,   'New',      '2024-05-01'),
  ('a1000001-0000-0000-0000-000000000009', 'Marcus Lee',   'https://ui-avatars.com/api/?name=Marcus+Lee&background=7C3AED&color=fff',   'marcus.lee@email.com',  '821 456 272', '15 Broadway, NY',     20, 842.10,  'Active',   '2023-11-12'),
  ('a1000001-0000-0000-0000-000000000010', 'Sarah Kim',    'https://ui-avatars.com/api/?name=Sarah+Kim&background=F59E0B&color=fff',    'sarah.kim@email.com',   '821 456 275', '88 5th Ave, NY',      0,  0.00,    'Inactive', '2024-04-22'),
  ('a1000001-0000-0000-0000-000000000011', 'Raj Patel',    'https://ui-avatars.com/api/?name=Raj+Patel&background=10B981&color=fff',    'raj.patel@email.com',   '821 456 278', '42 Elm St, NY',       3,  98.50,   'New',      '2024-05-10'),
  ('a1000001-0000-0000-0000-000000000012', 'Emily Chen',   'https://ui-avatars.com/api/?name=Emily+Chen&background=EC4899&color=fff',   'emily.chen@email.com',  '821 456 280', '77 Hudson St, NY',    9,  367.25,  'Active',   '2024-01-30');

-- ------------------------------------------------------------
-- 2. ORDERS (9 records)
-- ------------------------------------------------------------
insert into orders (order_code, customer_id, payment, location, status, contact) values
  ('#45671', 'a1000001-0000-0000-0000-000000000001', 'Online',            '132, My Street BG',   'Delivered',   '821 456 269'),
  ('#45672', 'a1000001-0000-0000-0000-000000000002', 'Online',            '8, My Street, Lagos', 'Delivered',   '821 456 264'),
  ('#45673', 'a1000001-0000-0000-0000-000000000003', 'Cash on delivery',  '33 3rd Ave, NY',      'On Delivery', '821 456 267'),
  ('#45674', 'a1000001-0000-0000-0000-000000000004', 'Online',            '400 Broom St, NY',    'Cancelled',   '821 456 265'),
  ('#45675', 'a1000001-0000-0000-0000-000000000005', 'Cash on delivery',  '25 U Square, NY',     'On Delivery', '821 456 266'),
  ('#45676', 'a1000001-0000-0000-0000-000000000006', 'Online',            '28 U Square, NY',     'Delivered',   '821 456 261'),
  ('#45677', 'a1000001-0000-0000-0000-000000000007', 'Online',            '22 Seal Street, NY',  'Delivered',   '821 456 261'),
  ('#45678', 'a1000001-0000-0000-0000-000000000005', 'Cash on delivery',  '25 U Square, NY',     'On Delivery', '821 456 266'),
  ('#45679', 'a1000001-0000-0000-0000-000000000004', 'Online',            '400 Broom St, NY',    'Cancelled',   '821 456 265');

-- ------------------------------------------------------------
-- 3. STAT CARDS (5 records)
-- ------------------------------------------------------------
insert into stat_cards (stat_key, label, value, icon, trend, trend_up, sort_order) values
  ('total-orders',    'Total Orders',    '75',   'ShoppingBag', '+12%', true,  1),
  ('total-delivered', 'Total Delivered', '70',   'CheckCircle', '+8%',  true,  2),
  ('total-cancelled', 'Total Cancelled', '05',   'XCircle',     '-2%',  false, 3),
  ('total-revenue',   'Total Revenue',   '$12k', 'DollarSign',  '+15%', true,  4),
  ('total-pending',   'Total Pending',   '12',   'Clock',       '+3%',  true,  5);

-- ------------------------------------------------------------
-- 4. ORDER SUMMARY (3 records)
-- ------------------------------------------------------------
insert into order_summary (label, value, total, color, sort_order) values
  ('On Delivery', 30, 75, '#7C3AED', 1),
  ('Delivered',   35, 75, '#10B981', 2),
  ('Cancelled',    5, 75, '#EF4444', 3);

-- ------------------------------------------------------------
-- 5. OVERVIEW SLICES (3 records)
-- ------------------------------------------------------------
insert into overview_slices (name, value, color, sort_order) values
  ('On Delivery', 30, '#7C3AED', 1),
  ('Delivered',   35, '#10B981', 2),
  ('Cancelled',    5, '#EF4444', 3);

-- ------------------------------------------------------------
-- 6. TOP SELLING ITEMS (3 records)
-- ------------------------------------------------------------
insert into top_selling_items (name, price, image, sort_order) values
  ('Chicken Burger', '$12.99', '🍔', 1),
  ('Veggie Pizza',   '$14.50', '🍕', 2),
  ('Caesar Salad',   '$8.99',  '🥗', 3);

-- ------------------------------------------------------------
-- 7. CUSTOMER MAP (7 records)
-- ------------------------------------------------------------
insert into customer_map (day, this_week, last_week, sort_order) values
  ('Mon', 40, 30, 1),
  ('Tue', 35, 45, 2),
  ('Wed', 50, 35, 3),
  ('Thu', 45, 40, 4),
  ('Fri', 60, 50, 5),
  ('Sat', 55, 45, 6),
  ('Sun', 70, 55, 7);

-- ------------------------------------------------------------
-- 8. REVENUE (12 records)
-- ------------------------------------------------------------
insert into revenue (month, revenue, sort_order) values
  ('Jan',  5000,  1),
  ('Feb',  7500,  2),
  ('Mar',  6000,  3),
  ('Apr',  8000,  4),
  ('May',  9500,  5),
  ('Jun', 11000,  6),
  ('Jul', 10000,  7),
  ('Aug', 12000,  8),
  ('Sep', 11500,  9),
  ('Oct', 13000, 10),
  ('Nov', 14000, 11),
  ('Dec', 15000, 12);

-- ------------------------------------------------------------
-- 9. CHAT PROFILES (8 records)
-- ------------------------------------------------------------
insert into chat_profiles (customer_id, online, last_message, last_message_at, unread_count) values
  ('a1000001-0000-0000-0000-000000000001', true,  'I''ll check on it right away',        now() - interval '2 minutes',  2),
  ('a1000001-0000-0000-0000-000000000002', true,  'Thanks for the update!',               now() - interval '15 minutes', 0),
  ('a1000001-0000-0000-0000-000000000003', false, 'When will my order arrive?',           now() - interval '1 hour',     0),
  ('a1000001-0000-0000-0000-000000000004', false, 'Please cancel my order',               now() - interval '2 hours',    0),
  ('a1000001-0000-0000-0000-000000000005', true,  'That''s great, thank you!',            now() - interval '3 hours',    0),
  ('a1000001-0000-0000-0000-000000000006', false, 'Can I change my delivery address?',    now() - interval '5 hours',    0),
  ('a1000001-0000-0000-0000-000000000007', false, 'Order received, thanks!',              now() - interval '1 day',      0),
  ('a1000001-0000-0000-0000-000000000008', false, 'How do I track my delivery?',          now() - interval '1 day',      0);

-- ------------------------------------------------------------
-- 10. CHAT MESSAGES (all conversations)
-- ------------------------------------------------------------

-- Joe Martin conversation
insert into chat_messages (conversation_id, sender_id, body, is_own, sent_at) values
  ('a1000001-0000-0000-0000-000000000001', 'joe-martin', 'Hi, I placed an order about 30 minutes ago but I noticed that the side salad is missing from my order.', false, now() - interval '9 minutes'),
  ('a1000001-0000-0000-0000-000000000001', 'admin',      'Hello Joe! I''m sorry about that. Let me check your order details right away.', true, now() - interval '7 minutes'),
  ('a1000001-0000-0000-0000-000000000001', 'joe-martin', 'Sure, my order number is #45671.', false, now() - interval '6 minutes'),
  ('a1000001-0000-0000-0000-000000000001', 'admin',      'I can see your order. You''re right, the side salad was missed. I''ll have it sent out to you immediately with a complimentary drink for the inconvenience.', true, now() - interval '4 minutes'),
  ('a1000001-0000-0000-0000-000000000001', 'joe-martin', 'That''s really kind of you, thank you so much!', false, now() - interval '3 minutes'),
  ('a1000001-0000-0000-0000-000000000001', 'admin',      'You''re welcome! The salad should arrive within 15 minutes. Is there anything else I can help with?', true, now() - interval '2 minutes 30 seconds'),
  ('a1000001-0000-0000-0000-000000000001', 'joe-martin', 'No, that''s all. Thanks again!', false, now() - interval '2 minutes 15 seconds'),
  ('a1000001-0000-0000-0000-000000000001', 'admin',      'I''ll check on it right away. Have a great day, Joe! 😊', true, now() - interval '2 minutes');

-- Peterson conversation
insert into chat_messages (conversation_id, sender_id, body, is_own, sent_at) values
  ('a1000001-0000-0000-0000-000000000002', 'peterson', 'Hey, just wanted to confirm my order was delivered to the right address.', false, now() - interval '18 minutes'),
  ('a1000001-0000-0000-0000-000000000002', 'admin',    'Hi Peterson! Yes, your order #45672 was delivered to 8, My Street, Lagos. Can you confirm?', true, now() - interval '16 minutes'),
  ('a1000001-0000-0000-0000-000000000002', 'peterson', 'Yes, got it. Thanks for the update!', false, now() - interval '15 minutes');

-- Shaleena conversation
insert into chat_messages (conversation_id, sender_id, body, is_own, sent_at) values
  ('a1000001-0000-0000-0000-000000000003', 'shaleena', 'Hello, when will my order arrive? It''s been a while.', false, now() - interval '1 hour 10 minutes'),
  ('a1000001-0000-0000-0000-000000000003', 'admin',    'Hi Shaleena! Let me check on your order #45673. It''s currently on the way to you.', true, now() - interval '1 hour 5 minutes'),
  ('a1000001-0000-0000-0000-000000000003', 'shaleena', 'When will my order arrive?', false, now() - interval '1 hour');

-- Patrik conversation
insert into chat_messages (conversation_id, sender_id, body, is_own, sent_at) values
  ('a1000001-0000-0000-0000-000000000004', 'patrik', 'I''d like to cancel my order #45674 please.', false, now() - interval '2 hours 30 minutes'),
  ('a1000001-0000-0000-0000-000000000004', 'admin',  'Hi Patrik, I''m sorry to hear that. May I know the reason for cancellation?', true, now() - interval '2 hours 28 minutes'),
  ('a1000001-0000-0000-0000-000000000004', 'patrik', 'Please cancel my order', false, now() - interval '2 hours');

-- Angeline conversation
insert into chat_messages (conversation_id, sender_id, body, is_own, sent_at) values
  ('a1000001-0000-0000-0000-000000000005', 'angeline', 'Is my order on the way?', false, now() - interval '3 hours 7 minutes'),
  ('a1000001-0000-0000-0000-000000000005', 'admin',    'Yes Angeline! Your order is currently being delivered. ETA is about 20 minutes.', true, now() - interval '3 hours 2 minutes'),
  ('a1000001-0000-0000-0000-000000000005', 'angeline', 'That''s great, thank you!', false, now() - interval '3 hours');

-- Denver conversation
insert into chat_messages (conversation_id, sender_id, body, is_own, sent_at) values
  ('a1000001-0000-0000-0000-000000000006', 'denver', 'Hi, can I change my delivery address?', false, now() - interval '5 hours 5 minutes'),
  ('a1000001-0000-0000-0000-000000000006', 'admin',  'Hi Denver! Let me check if the order has been dispatched yet.', true, now() - interval '5 hours');

-- Jamison conversation
insert into chat_messages (conversation_id, sender_id, body, is_own, sent_at) values
  ('a1000001-0000-0000-0000-000000000007', 'jamison', 'Order received, thanks!', false, now() - interval '1 day 2 hours'),
  ('a1000001-0000-0000-0000-000000000007', 'admin',   'Glad to hear it, Jamison! Enjoy your meal!', true, now() - interval '1 day');

-- Angeline M. conversation
insert into chat_messages (conversation_id, sender_id, body, is_own, sent_at) values
  ('a1000001-0000-0000-0000-000000000008', 'angeline2', 'How do I track my delivery?', false, now() - interval '1 day 3 hours'),
  ('a1000001-0000-0000-0000-000000000008', 'admin',     'You can track your delivery in the app under ''My Orders''. You''ll see a live map with your driver''s location.', true, now() - interval '1 day');
