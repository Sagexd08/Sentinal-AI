-- Schema for Sentinal AI Supabase database

-- Enable RLS (Row Level Security)
alter table auth.users enable row level security;

-- Create flagged_content table
create table public.flagged_content (
  id uuid default uuid_generate_v4() primary key,
  content text not null,
  content_type text not null default 'text',
  source text not null default 'user',
  reason text,
  metadata jsonb,
  user_id uuid references auth.users(id),
  ai_analysis jsonb,
  status text not null default 'pending',
  moderator_id uuid references auth.users(id),
  moderator_notes text,
  created_at timestamp with time zone default now(),
  moderated_at timestamp with time zone
);

-- Create user_feedback table
create table public.user_feedback (
  id uuid default uuid_generate_v4() primary key,
  content text not null,
  feedback_type text not null default 'general',
  rating integer,
  metadata jsonb,
  user_id uuid references auth.users(id),
  created_at timestamp with time zone default now()
);

-- Create RLS policies for flagged_content
create policy "Users can view their own flagged content"
  on public.flagged_content for select
  using (auth.uid() = user_id);

create policy "Moderators can view all flagged content"
  on public.flagged_content for select
  using (auth.jwt() ->> 'role' = 'moderator');

create policy "Moderators can update flagged content"
  on public.flagged_content for update
  using (auth.jwt() ->> 'role' = 'moderator');

create policy "Users can create flagged content"
  on public.flagged_content for insert
  with check (auth.uid() = user_id);

-- Create RLS policies for user_feedback
create policy "Users can view their own feedback"
  on public.user_feedback for select
  using (auth.uid() = user_id);

create policy "Admins can view all feedback"
  on public.user_feedback for select
  using (auth.jwt() ->> 'role' = 'admin');

create policy "Users can create feedback"
  on public.user_feedback for insert
  with check (auth.uid() = user_id);

-- Create indexes for better performance
create index idx_flagged_content_status on public.flagged_content(status);
create index idx_flagged_content_user_id on public.flagged_content(user_id);
create index idx_user_feedback_type on public.user_feedback(feedback_type);
create index idx_user_feedback_user_id on public.user_feedback(user_id);

-- Enable realtime for these tables
alter publication supabase_realtime add table public.flagged_content;
alter publication supabase_realtime add table public.user_feedback;
