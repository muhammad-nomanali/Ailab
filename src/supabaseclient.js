// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ztljczjpjejtkfycviqh.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0bGpjempwamVqdGtmeWN2aXFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA4NzgzMDgsImV4cCI6MjA3NjQ1NDMwOH0.yxXtk067bg1S8IGifMDB368Fvw2A9J6cV7-TB73cHII";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
