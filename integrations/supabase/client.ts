
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://ugqdmysezwjwwzmjsabv.supabase.co';
export const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVncWRteXNlendqd3d6bWpzYWJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNjYxOTcsImV4cCI6MjA2Mjc0MjE5N30.c4XCirVjJr5MjEt-FlWGcAcb1AiAJDuowQlbh8JLP88';

export const supabase = createClient(supabaseUrl, supabaseKey);
