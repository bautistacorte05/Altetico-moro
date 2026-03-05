CREATE OR REPLACE FUNCTION increment_membership_count()
RETURNS integer
LANGUAGE sql
AS $$
  UPDATE membership_stats
  SET active_count = active_count + 1
  WHERE id = 1
  RETURNING active_count;
$$;
