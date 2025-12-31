
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uhaqutplfyegwrycaspi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVoYXF1dHBsZnllZ3dyeWNhc3BpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxODAzNzAsImV4cCI6MjA4Mjc1NjM3MH0.FuElz4baDTDsC7QZ17-MuO3dy1mESk5z8jwZcaWUEcw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
