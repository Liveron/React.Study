import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://hwwvyaelnvopcxnhietw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3d3Z5YWVsbnZvcGN4bmhpZXR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEwNDA1ODAsImV4cCI6MjAzNjYxNjU4MH0.6nkOKa_cklNHKIrVYlpiB11pK8GeX78EGoom4W-mwUs";
const supabase = createClient(supabaseUrl, supabaseKey!);

export default supabase;
