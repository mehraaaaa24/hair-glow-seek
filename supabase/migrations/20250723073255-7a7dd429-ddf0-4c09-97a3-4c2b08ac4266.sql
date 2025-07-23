-- Create enum for user types
CREATE TYPE user_type AS ENUM ('customer', 'expert');

-- Create enum for specializations
CREATE TYPE specialization_type AS ENUM ('trichologist', 'dermatologist', 'surgeon', 'hair_stylist');

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  user_type user_type NOT NULL,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customer_profiles table for customer-specific data
CREATE TABLE public.customer_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  looking_for TEXT, -- Hair fall, PRP, Styling, etc.
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create expert_profiles table for expert-specific data
CREATE TABLE public.expert_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  specialization specialization_type NOT NULL,
  clinic_name TEXT NOT NULL,
  city TEXT NOT NULL,
  years_experience INTEGER NOT NULL,
  treatments_offered TEXT[], -- Array of treatment types
  starting_price_inr INTEGER NOT NULL,
  license_url TEXT, -- URL for uploaded license
  is_verified BOOLEAN NOT NULL DEFAULT false,
  profile_views INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for customer_profiles
CREATE POLICY "Users can view their own customer profile" 
ON public.customer_profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = customer_profiles.profile_id 
    AND profiles.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create their own customer profile" 
ON public.customer_profiles 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = customer_profiles.profile_id 
    AND profiles.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own customer profile" 
ON public.customer_profiles 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = customer_profiles.profile_id 
    AND profiles.user_id = auth.uid()
  )
);

-- Create policies for expert_profiles
CREATE POLICY "Everyone can view verified expert profiles" 
ON public.expert_profiles 
FOR SELECT 
USING (is_verified = true);

CREATE POLICY "Users can view their own expert profile" 
ON public.expert_profiles 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = expert_profiles.profile_id 
    AND profiles.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create their own expert profile" 
ON public.expert_profiles 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = expert_profiles.profile_id 
    AND profiles.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own expert profile" 
ON public.expert_profiles 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.id = expert_profiles.profile_id 
    AND profiles.user_id = auth.uid()
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_customer_profiles_updated_at
  BEFORE UPDATE ON public.customer_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_expert_profiles_updated_at
  BEFORE UPDATE ON public.expert_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();