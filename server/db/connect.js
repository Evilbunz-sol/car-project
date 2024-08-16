const { createClient } = require('@supabase/supabase-js');

const connectSupabase = () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_API_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and API key must be provided in environment variables');
  }
  
  return createClient(supabaseUrl, supabaseKey);
};

module.exports = connectSupabase;

