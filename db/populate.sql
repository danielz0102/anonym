INSERT INTO
  users(
    first_name,
    last_name,
    username,
    password,
    vip,
    admin
  )
VALUES
  (
    'John',
    'Doe',
    'johndoe',
    '$2a$10$2bQ1z5e8a5f8c9d8e7f6e8a5f8c9d8e7f6e8a5f8c9d8e7f6e8a5f8c9d8e7',
    false,
    false
  ),
  (
    'Jane',
    'Smith',
    'janesmith',
    '$2a$10$abcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdefabcdef',
    true,
    false
  ),
  (
    'Alice',
    'Johnson',
    'alicej',
    '$2a$10$111111111111111111111111111111111111111111111111111111111111',
    false,
    false
  ),
  (
    'Bob',
    'Williams',
    'bobw',
    '$2a$10$222222222222222222222222222222222222222222222222222222222222',
    false,
    false
  ),
  (
    'Charlie',
    'Brown',
    'charlieb',
    '$2a$10$333333333333333333333333333333333333333333333333333333333333',
    false,
    false
  ),
  (
    'Diana',
    'Evans',
    'dianae',
    '$2a$10$444444444444444444444444444444444444444444444444444444444444',
    true,
    false
  ),
  (
    'Eve',
    'Miller',
    'evem',
    '$2a$10$555555555555555555555555555555555555555555555555555555555555',
    false,
    false
  ),
  (
    'Frank',
    'Moore',
    'frankm',
    '$2a$10$666666666666666666666666666666666666666666666666666666666666',
    false,
    false
  ),
  (
    'Grace',
    'Taylor',
    'gracet',
    '$2a$10$777777777777777777777777777777777777777777777777777777777777',
    false,
    false
  ),
  (
    'Henry',
    'Anderson',
    'henrya',
    '$2a$10$888888888888888888888888888888888888888888888888888888888888',
    false,
    false
  );

INSERT INTO
  messages(user_id, title, content)
VALUES
  (1, 'Welcome', 'Hello, this is John!'),
  (2, 'Greetings', 'Jane here, nice to meet you all.'),
  (3, 'Check-in', 'Alice checking in.'),
  (4, 'Hello', 'Bob says hi!'),
  (5, 'Present', 'Charlie is present.'),
  (6, 'Report', 'Diana reporting.'),
  (7, 'Join', 'Eve has joined the chat.'),
  (8, 'Online', 'Frank is online.'),
  (9, 'Hello', 'Grace says hello.'),
  (10, 'Here', 'Henry is here.');
