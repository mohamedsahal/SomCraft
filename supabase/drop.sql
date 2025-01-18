-- Drop policies
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Users can update own non-sensitive data" ON users;
DROP POLICY IF EXISTS "Super admins can update all user data" ON users;
DROP POLICY IF EXISTS "Anyone can view published courses" ON courses;
DROP POLICY IF EXISTS "Instructors can manage own courses" ON courses;
DROP POLICY IF EXISTS "Students can view enrolled content" ON course_sections;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON users;

-- Drop triggers
DROP TRIGGER IF EXISTS sync_user_metadata ON auth.users;
DROP TRIGGER IF EXISTS enforce_user_defaults ON users;
DROP TRIGGER IF EXISTS enforce_role_changes ON users;
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP TRIGGER IF EXISTS update_courses_updated_at ON courses;
DROP TRIGGER IF EXISTS update_course_sections_updated_at ON course_sections;
DROP TRIGGER IF EXISTS update_course_lessons_updated_at ON course_lessons;
DROP TRIGGER IF EXISTS update_lesson_progress_updated_at ON lesson_progress;

-- Drop functions
DROP FUNCTION IF EXISTS public.sync_user_metadata();
DROP FUNCTION IF EXISTS enforce_user_defaults();
DROP FUNCTION IF EXISTS check_role_change();
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Drop tables in correct order (respecting foreign key constraints)
DROP TABLE IF EXISTS lesson_progress CASCADE;
DROP TABLE IF EXISTS enrollments CASCADE;
DROP TABLE IF EXISTS course_lessons CASCADE;
DROP TABLE IF EXISTS course_sections CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop custom types
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS course_level CASCADE;
DROP TYPE IF EXISTS course_status CASCADE; 