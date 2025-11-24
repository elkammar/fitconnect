-- FitConnect Database Schema for Supabase
-- Copy and paste this entire file into Supabase SQL Editor
-- Run in the order presented to ensure proper foreign key references

-- ============================================================================
-- 1. USERS PROFILE TABLE
-- ============================================================================
-- Extends auth.users with additional profile information

CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  profile_image_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'studio_owner', 'instructor', 'admin')),
  member_since TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

COMMENT ON TABLE public.users IS 'User profiles extending Supabase auth.users';

-- ============================================================================
-- 2. STUDIOS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.studios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  image_url TEXT,
  type TEXT[] DEFAULT ARRAY['Fitness'], -- Array of studio types (Yoga, Pilates, etc.)
  rating DECIMAL(3,2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  amenities TEXT[], -- Array of amenities (Parking, Showers, etc.)
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_studios_owner ON public.studios(owner_id);
CREATE INDEX IF NOT EXISTS idx_studios_location ON public.studios(location);
CREATE INDEX IF NOT EXISTS idx_studios_active ON public.studios(is_active);
CREATE INDEX IF NOT EXISTS idx_studios_rating ON public.studios(rating);

COMMENT ON TABLE public.studios IS 'Fitness studios offering classes';

-- ============================================================================
-- 3. INSTRUCTORS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  studio_id UUID REFERENCES public.studios(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  specialties TEXT[], -- Array of specialties (Yoga, HIIT, etc.)
  certifications TEXT[], -- Array of certifications
  years_experience INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
  review_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_instructors_studio ON public.instructors(studio_id);
CREATE INDEX IF NOT EXISTS idx_instructors_user ON public.instructors(user_id);
CREATE INDEX IF NOT EXISTS idx_instructors_active ON public.instructors(is_active);

COMMENT ON TABLE public.instructors IS 'Fitness instructors teaching classes';

-- ============================================================================
-- 4. CLASSES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES public.studios(id) ON DELETE CASCADE,
  instructor_id UUID REFERENCES public.instructors(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- Yoga, Pilates, Cycling, etc.
  difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  duration INTEGER NOT NULL, -- Duration in minutes
  date DATE NOT NULL,
  time TIME NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  current_capacity INTEGER DEFAULT 0 CHECK (current_capacity >= 0),
  max_capacity INTEGER NOT NULL CHECK (max_capacity > 0),
  image_url TEXT,
  location TEXT, -- Room/area within studio
  equipment_needed TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ensure current capacity doesn't exceed max
  CONSTRAINT capacity_check CHECK (current_capacity <= max_capacity)
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_classes_studio ON public.classes(studio_id);
CREATE INDEX IF NOT EXISTS idx_classes_instructor ON public.classes(instructor_id);
CREATE INDEX IF NOT EXISTS idx_classes_date ON public.classes(date);
CREATE INDEX IF NOT EXISTS idx_classes_type ON public.classes(type);
CREATE INDEX IF NOT EXISTS idx_classes_difficulty ON public.classes(difficulty);
CREATE INDEX IF NOT EXISTS idx_classes_active ON public.classes(is_active);
CREATE INDEX IF NOT EXISTS idx_classes_date_time ON public.classes(date, time);

COMMENT ON TABLE public.classes IS 'Fitness classes offered by studios';

-- ============================================================================
-- 5. BOOKINGS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
  booking_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'waitlist', 'completed', 'no_show')),
  amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'refunded', 'failed')),
  payment_method TEXT,
  reference_code TEXT UNIQUE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Prevent duplicate active bookings for the same user and class
  CONSTRAINT unique_active_booking UNIQUE (user_id, class_id, status)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bookings_user ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_class ON public.bookings(class_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON public.bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON public.bookings(reference_code);

COMMENT ON TABLE public.bookings IS 'User bookings for fitness classes';

-- ============================================================================
-- 6. FAVORITES TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  favoritable_type TEXT NOT NULL CHECK (favoritable_type IN ('studio', 'class', 'instructor')),
  favoritable_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Prevent duplicate favorites
  CONSTRAINT unique_favorite UNIQUE (user_id, favoritable_type, favoritable_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_type ON public.favorites(favoritable_type);
CREATE INDEX IF NOT EXISTS idx_favorites_composite ON public.favorites(user_id, favoritable_type);

COMMENT ON TABLE public.favorites IS 'User favorites for studios, classes, and instructors';

-- ============================================================================
-- 7. REVIEWS TABLE (Optional - for future enhancement)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  reviewable_type TEXT NOT NULL CHECK (reviewable_type IN ('studio', 'class', 'instructor')),
  reviewable_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  is_verified BOOLEAN DEFAULT false, -- Verified if user attended the class
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- One review per user per item
  CONSTRAINT unique_review UNIQUE (user_id, reviewable_type, reviewable_id)
);

CREATE INDEX IF NOT EXISTS idx_reviews_user ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_type ON public.reviews(reviewable_type);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);

COMMENT ON TABLE public.reviews IS 'User reviews for studios, classes, and instructors';

-- ============================================================================
-- 8. TRIGGERS FOR UPDATED_AT TIMESTAMPS
-- ============================================================================

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at column
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_studios_updated_at BEFORE UPDATE ON public.studios
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_instructors_updated_at BEFORE UPDATE ON public.instructors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON public.classes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- 9. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.studios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- USERS POLICIES
-- ============================================================================

-- Users can read all profiles
CREATE POLICY "Users can view all profiles"
  ON public.users
  FOR SELECT
  USING (true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

-- Users can insert their own profile (on signup)
CREATE POLICY "Users can insert own profile"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================================================
-- STUDIOS POLICIES
-- ============================================================================

-- Anyone can view active studios
CREATE POLICY "Anyone can view active studios"
  ON public.studios
  FOR SELECT
  USING (is_active = true OR owner_id = auth.uid());

-- Studio owners can insert their own studios
CREATE POLICY "Studio owners can insert studios"
  ON public.studios
  FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

-- Studio owners can update their own studios
CREATE POLICY "Studio owners can update own studios"
  ON public.studios
  FOR UPDATE
  USING (auth.uid() = owner_id);

-- Studio owners can delete their own studios
CREATE POLICY "Studio owners can delete own studios"
  ON public.studios
  FOR DELETE
  USING (auth.uid() = owner_id);

-- ============================================================================
-- INSTRUCTORS POLICIES
-- ============================================================================

-- Anyone can view active instructors
CREATE POLICY "Anyone can view active instructors"
  ON public.instructors
  FOR SELECT
  USING (
    is_active = true
    OR user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.studios
      WHERE id = instructors.studio_id
      AND owner_id = auth.uid()
    )
  );

-- Studio owners can insert instructors for their studios
CREATE POLICY "Studio owners can add instructors"
  ON public.instructors
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.studios
      WHERE id = studio_id
      AND owner_id = auth.uid()
    )
  );

-- Studio owners can update their instructors
CREATE POLICY "Studio owners can update instructors"
  ON public.instructors
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.studios
      WHERE id = instructors.studio_id
      AND owner_id = auth.uid()
    )
  );

-- Studio owners can delete their instructors
CREATE POLICY "Studio owners can delete instructors"
  ON public.instructors
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.studios
      WHERE id = instructors.studio_id
      AND owner_id = auth.uid()
    )
  );

-- ============================================================================
-- CLASSES POLICIES
-- ============================================================================

-- Anyone can view active classes
CREATE POLICY "Anyone can view active classes"
  ON public.classes
  FOR SELECT
  USING (
    is_active = true
    OR EXISTS (
      SELECT 1 FROM public.studios
      WHERE id = classes.studio_id
      AND owner_id = auth.uid()
    )
  );

-- Studio owners can insert classes for their studios
CREATE POLICY "Studio owners can create classes"
  ON public.classes
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.studios
      WHERE id = studio_id
      AND owner_id = auth.uid()
    )
  );

-- Studio owners can update their classes
CREATE POLICY "Studio owners can update classes"
  ON public.classes
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.studios
      WHERE id = classes.studio_id
      AND owner_id = auth.uid()
    )
  );

-- Studio owners can delete their classes
CREATE POLICY "Studio owners can delete classes"
  ON public.classes
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.studios
      WHERE id = classes.studio_id
      AND owner_id = auth.uid()
    )
  );

-- ============================================================================
-- BOOKINGS POLICIES
-- ============================================================================

-- Users can view their own bookings
CREATE POLICY "Users can view own bookings"
  ON public.bookings
  FOR SELECT
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM public.classes c
      JOIN public.studios s ON c.studio_id = s.id
      WHERE c.id = bookings.class_id
      AND s.owner_id = auth.uid()
    )
  );

-- Users can create their own bookings
CREATE POLICY "Users can create bookings"
  ON public.bookings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own bookings (e.g., cancel)
CREATE POLICY "Users can update own bookings"
  ON public.bookings
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own bookings
CREATE POLICY "Users can delete own bookings"
  ON public.bookings
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- FAVORITES POLICIES
-- ============================================================================

-- Users can view their own favorites
CREATE POLICY "Users can view own favorites"
  ON public.favorites
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own favorites
CREATE POLICY "Users can create favorites"
  ON public.favorites
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own favorites
CREATE POLICY "Users can delete favorites"
  ON public.favorites
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- REVIEWS POLICIES
-- ============================================================================

-- Anyone can view reviews
CREATE POLICY "Anyone can view reviews"
  ON public.reviews
  FOR SELECT
  USING (true);

-- Users can create their own reviews
CREATE POLICY "Users can create reviews"
  ON public.reviews
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews"
  ON public.reviews
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews"
  ON public.reviews
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 10. HELPER FUNCTIONS
-- ============================================================================

-- Function to generate unique reference code for bookings
CREATE OR REPLACE FUNCTION public.generate_booking_reference()
RETURNS TEXT AS $$
DECLARE
  ref_code TEXT;
  exists_flag BOOLEAN;
BEGIN
  LOOP
    -- Generate a random 9-character alphanumeric code with 'FC' prefix
    ref_code := 'FC' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 9));

    -- Check if it already exists
    SELECT EXISTS(SELECT 1 FROM public.bookings WHERE reference_code = ref_code) INTO exists_flag;

    -- Exit loop if unique
    EXIT WHEN NOT exists_flag;
  END LOOP;

  RETURN ref_code;
END;
$$ LANGUAGE plpgsql;

-- Function to update class capacity when booking is created
CREATE OR REPLACE FUNCTION public.update_class_capacity()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'confirmed' THEN
    -- Increment capacity
    UPDATE public.classes
    SET current_capacity = current_capacity + 1
    WHERE id = NEW.class_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.status = 'confirmed' AND NEW.status = 'cancelled' THEN
    -- Decrement capacity
    UPDATE public.classes
    SET current_capacity = GREATEST(current_capacity - 1, 0)
    WHERE id = NEW.class_id;
  ELSIF TG_OP = 'DELETE' AND OLD.status = 'confirmed' THEN
    -- Decrement capacity on delete
    UPDATE public.classes
    SET current_capacity = GREATEST(current_capacity - 1, 0)
    WHERE id = OLD.class_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply capacity update trigger to bookings
CREATE TRIGGER update_class_capacity_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.update_class_capacity();

-- ============================================================================
-- 11. SEED DATA (Optional - for testing)
-- ============================================================================

-- You can uncomment and modify this section to add seed data
/*
-- Insert test users (requires auth.users to be set up first)
INSERT INTO public.users (id, full_name, email, role) VALUES
  ('user-uuid-1', 'Alex Morgan', 'alex@example.com', 'user'),
  ('user-uuid-2', 'Studio Owner', 'studio@example.com', 'studio_owner');

-- Insert test studios
INSERT INTO public.studios (owner_id, name, location, description) VALUES
  ('user-uuid-2', 'ZenFlow Yoga Studio', 'Downtown, Chicago', 'Premium yoga and wellness center');
*/

-- ============================================================================
-- SCHEMA COMPLETE
-- ============================================================================

-- Grant necessary permissions (Supabase usually handles this automatically)
-- GRANT USAGE ON SCHEMA public TO authenticated;
-- GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
-- GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

COMMENT ON SCHEMA public IS 'FitConnect database schema - Fitness class booking platform';
