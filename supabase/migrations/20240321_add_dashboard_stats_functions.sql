-- Create function to get enrollment statistics
create or replace function get_enrollment_stats()
returns table (
  total_count bigint,
  completed_count bigint
) as $$
begin
  return query
  select 
    count(*)::bigint as total_count,
    count(case when completed_at is not null then 1 end)::bigint as completed_count
  from enrollments;
end;
$$ language plpgsql security definer;

-- Create function to get total revenue
create or replace function get_total_revenue()
returns table (
  total_revenue numeric
) as $$
begin
  return query
  select coalesce(sum(c.price), 0) as total_revenue
  from enrollments e
  join courses c on c.id = e.course_id;
end;
$$ language plpgsql security definer; 