-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  role text check (role in ('admin', 'socio')) default 'socio',
  avatar_url text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create players table
create table public.players (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  jersey_number integer not null,
  position text not null,
  photo_url text,
  goals integer default 0,
  matches_played integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create matches table
create table public.matches (
  id uuid default uuid_generate_v4() primary key,
  opponent_name text not null,
  date timestamp with time zone not null,
  location text not null,
  result text, -- null means future match
  tournament text default 'Torneo El Campito',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create training_schedule table
create table public.training_schedule (
  id uuid default uuid_generate_v4() primary key,
  day_of_week text not null,
  start_time time not null,
  end_time time not null,
  location text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create membership_stats table
create table public.membership_stats (
  id uuid default uuid_generate_v4() primary key,
  active_count integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create social_links table
create table public.social_links (
  id uuid default uuid_generate_v4() primary key,
  platform text not null,
  url text not null,
  icon text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.players enable row level security;
alter table public.matches enable row level security;
alter table public.training_schedule enable row level security;
alter table public.membership_stats enable row level security;
alter table public.social_links enable row level security;

-- Policies

-- Profiles: Users can read their own profile. Admins can read all.
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Players: Public read, Admin write
create policy "Players are viewable by everyone." on public.players
  for select using (true);

create policy "Admins can insert/update/delete players." on public.players
  for all using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- Matches: Public read, Admin write
create policy "Matches are viewable by everyone." on public.matches
  for select using (true);

create policy "Admins can manage matches." on public.matches
  for all using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- Training Schedule: Public read, Admin write
create policy "Schedule is viewable by everyone." on public.training_schedule
  for select using (true);

create policy "Admins can manage schedule." on public.training_schedule
  for all using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- Membership Stats: Public read, Admin update
create policy "Stats are viewable by everyone." on public.membership_stats
  for select using (true);

create policy "Admins can update stats." on public.membership_stats
  for update using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- Functions
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'socio');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Seed Data (Optional, for initial testing)
insert into public.membership_stats (active_count) values (150);

insert into public.training_schedule (day_of_week, start_time, end_time, location) values
('Martes', '20:00', '22:00', 'Predio Central'),
('Jueves', '20:00', '22:00', 'Predio Central');

-- Players seed (mock)
insert into public.players (name, jersey_number, position, photo_url) values
('Juan Pérez', 10, 'Delantero', 'player1.jpg'),
('Carlos Gómez', 1, 'Portero', 'player2.jpg'),
('Luis Rodríguez', 5, 'Defensa', 'player3.jpg'),
('Matías Fernández', 8, 'Mediocampista', 'player4.jpg'),
('Pedro López', 9, 'Delantero', 'player5.jpg');
