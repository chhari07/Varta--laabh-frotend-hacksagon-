import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rqrjfczccdsreqtttqhv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcmpmY3pjY2RzcmVxdHR0cWh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMDg5MzAsImV4cCI6MjA2MzY4NDkzMH0.tMsbY_zntvAzIIonhAvtpW9FgaflEBfvTH9PdGknbvI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, // or false to avoid localStorage sharing
        detectSessionInUrl: true,
    storageKey: "supabase.auth.token" // Optional: custom key to avoid collision
  }
});
