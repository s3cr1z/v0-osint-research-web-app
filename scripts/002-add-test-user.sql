-- Insert test user for internal development
-- Note: This uses a fixed UUID for testing purposes
INSERT INTO user_profiles (id, email, display_name)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000'::uuid,
  'test@internal.local',
  'Test User'
)
ON CONFLICT (id) DO NOTHING;

-- Initialize test user credits
INSERT INTO user_credits (user_id, balance, plan)
VALUES (
  '550e8400-e29b-41d4-a716-446655440000'::uuid,
  1000.00,
  'free'
)
ON CONFLICT (user_id) DO NOTHING;
